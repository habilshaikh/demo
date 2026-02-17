from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from jose import jwt
import bcrypt
import cloudinary
import cloudinary.uploader

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# ==================== CONFIGURATION ====================

# MongoDB Configuration
MONGODB_URI = os.environ.get('MONGODB_URI')
if not MONGODB_URI:
    raise ValueError("MONGODB_URI environment variable is required")

DB_NAME = os.environ.get('DB_NAME', 'wynora_vault')

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET')
if not JWT_SECRET:
    raise ValueError("JWT_SECRET environment variable is required")

JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = int(os.environ.get('JWT_EXPIRATION_HOURS', '1'))

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME = os.environ.get('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.environ.get('CLOUDINARY_API_KEY')
CLOUDINARY_SECRET = os.environ.get('CLOUDINARY_SECRET')

if CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_KEY and CLOUDINARY_SECRET:
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_SECRET,
        secure=True
    )
    CLOUDINARY_ENABLED = True
else:
    CLOUDINARY_ENABLED = False
    logging.warning("Cloudinary not configured - file uploads will be disabled")

# CORS Configuration
FRONTEND_URL = os.environ.get('FRONTEND_URL', '*')

# File upload configuration
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_EXTENSIONS = {'.pdf', '.jpg', '.jpeg', '.png'}
ALLOWED_CONTENT_TYPES = {'application/pdf', 'image/jpeg', 'image/jpg', 'image/png'}

# Production mode
PRODUCTION = os.environ.get('PRODUCTION', 'false').lower() == 'true'

# ==================== LOGGING ====================

log_level = logging.WARNING if PRODUCTION else logging.INFO
logging.basicConfig(
    level=log_level,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== DATABASE ====================

client = AsyncIOMotorClient(MONGODB_URI)
db = client[DB_NAME]

# ==================== APP SETUP ====================

app = FastAPI(
    title="WynOra Vault API",
    version="1.0.0",
    docs_url=None if PRODUCTION else "/docs",
    redoc_url=None if PRODUCTION else "/redoc"
)

# Create routers
api_router = APIRouter(prefix="/api")
auth_router = APIRouter(prefix="/auth", tags=["Authentication"])
users_router = APIRouter(prefix="/users", tags=["Users"])
vault_router = APIRouter(prefix="/vault", tags=["Vault"])
admin_router = APIRouter(prefix="/admin", tags=["Admin"])

# Security
security = HTTPBearer()

# ==================== MODELS ====================

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    email: str
    full_name: str
    role: str
    token_number: Optional[str] = None
    token_status: Optional[str] = None
    is_blocked: bool = False
    created_at: str

class UserProfile(BaseModel):
    full_name: str
    email: EmailStr

class PasswordChange(BaseModel):
    current_password: str
    new_password: str

class ForgotPassword(BaseModel):
    email: EmailStr

class ResetPassword(BaseModel):
    email: EmailStr
    reset_code: str
    new_password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class VaultRecordResponse(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    user_id: str
    category: str
    title: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    file_name: Optional[str] = None
    file_size: Optional[int] = None
    file_type: Optional[str] = None
    file_public_id: Optional[str] = None
    created_at: str
    updated_at: str

class AdminUserUpdate(BaseModel):
    is_blocked: Optional[bool] = None
    token_number: Optional[str] = None
    token_status: Optional[str] = None

class DashboardStats(BaseModel):
    total_users: int
    total_records: int
    active_tokens: int
    pending_tokens: int

# ==================== HELPER FUNCTIONS ====================

def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str, role: str) -> str:
    """Create JWT token with expiration"""
    payload = {
        "sub": user_id,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    """Decode and validate JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current authenticated user"""
    token = credentials.credentials
    payload = decode_token(token)
    user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    if user.get("is_blocked"):
        raise HTTPException(status_code=403, detail="Account is blocked")
    return user

async def get_admin_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """Get current admin user - role-based access control"""
    user = await get_current_user(credentials)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

def validate_file(file: UploadFile) -> None:
    """Validate uploaded file"""
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, 
            detail=f"File type not allowed. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )

async def upload_to_cloudinary(file: UploadFile, folder: str = "wynora_vault") -> dict:
    """Upload file to Cloudinary"""
    if not CLOUDINARY_ENABLED:
        raise HTTPException(status_code=503, detail="File storage not configured")
    
    try:
        content = await file.read()
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=400, detail="File size exceeds 10MB limit")
        
        # Determine resource type
        ext = Path(file.filename).suffix.lower()
        resource_type = "raw" if ext == ".pdf" else "image"
        
        # Upload to Cloudinary
        result = cloudinary.uploader.upload(
            content,
            folder=folder,
            resource_type=resource_type,
            public_id=f"{uuid.uuid4()}",
            overwrite=True
        )
        
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "size": len(content),
            "type": file.content_type
        }
    except cloudinary.exceptions.Error as e:
        logger.error(f"Cloudinary upload error: {e}")
        raise HTTPException(status_code=500, detail="File upload failed")

def delete_from_cloudinary(public_id: str, resource_type: str = "image") -> bool:
    """Delete file from Cloudinary"""
    if not CLOUDINARY_ENABLED or not public_id:
        return False
    
    try:
        cloudinary.uploader.destroy(public_id, resource_type=resource_type)
        return True
    except Exception as e:
        logger.error(f"Cloudinary delete error: {e}")
        return False

# ==================== AUTH ROUTES ====================

@auth_router.post("/signup", response_model=TokenResponse)
async def signup(user_data: UserCreate):
    """Create new user account"""
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email.lower()}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Validate password
    if len(user_data.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    
    # Create user
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    user_doc = {
        "id": user_id,
        "email": user_data.email.lower(),
        "password": hash_password(user_data.password),
        "full_name": user_data.full_name.strip(),
        "role": "user",
        "token_number": None,
        "token_status": None,
        "is_blocked": False,
        "created_at": now,
        "updated_at": now
    }
    
    await db.users.insert_one(user_doc)
    
    # Generate token
    access_token = create_token(user_id, "user")
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user_id,
            email=user_data.email.lower(),
            full_name=user_data.full_name.strip(),
            role="user",
            token_number=None,
            token_status=None,
            is_blocked=False,
            created_at=now
        )
    )

@auth_router.post("/login", response_model=TokenResponse)
async def login(user_data: UserLogin):
    """Login user"""
    user = await db.users.find_one({"email": user_data.email.lower()}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not verify_password(user_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if user.get("is_blocked"):
        raise HTTPException(status_code=403, detail="Account is blocked")
    
    access_token = create_token(user["id"], user["role"])
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            full_name=user["full_name"],
            role=user["role"],
            token_number=user.get("token_number"),
            token_status=user.get("token_status"),
            is_blocked=user.get("is_blocked", False),
            created_at=user["created_at"]
        )
    )

@auth_router.post("/forgot-password")
async def forgot_password(data: ForgotPassword):
    """Request password reset"""
    user = await db.users.find_one({"email": data.email.lower()}, {"_id": 0})
    
    # Always return success to prevent email enumeration
    response = {"message": "If the email exists, a reset code has been sent"}
    
    if not user:
        return response
    
    # Generate reset code
    reset_code = str(uuid.uuid4())[:8].upper()
    await db.password_resets.update_one(
        {"email": data.email.lower()},
        {"$set": {
            "email": data.email.lower(),
            "code": reset_code,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "expires_at": (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()
        }},
        upsert=True
    )
    
    # In production, send email here
    # For now, include code in response (remove in production with email service)
    if not PRODUCTION:
        response["reset_code"] = reset_code
    
    return response

@auth_router.post("/reset-password")
async def reset_password(data: ResetPassword):
    """Reset password with code"""
    reset_doc = await db.password_resets.find_one(
        {"email": data.email.lower(), "code": data.reset_code.upper()}, 
        {"_id": 0}
    )
    if not reset_doc:
        raise HTTPException(status_code=400, detail="Invalid or expired reset code")
    
    # Check expiration
    expires_at = datetime.fromisoformat(reset_doc["expires_at"])
    if datetime.now(timezone.utc) > expires_at:
        raise HTTPException(status_code=400, detail="Reset code has expired")
    
    # Validate new password
    if len(data.new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    
    # Update password
    await db.users.update_one(
        {"email": data.email.lower()},
        {"$set": {"password": hash_password(data.new_password)}}
    )
    
    # Delete reset code
    await db.password_resets.delete_one({"email": data.email.lower()})
    
    return {"message": "Password reset successfully"}

# ==================== USER ROUTES ====================

@users_router.get("/me", response_model=UserResponse)
async def get_me(user: dict = Depends(get_current_user)):
    """Get current user profile"""
    return UserResponse(
        id=user["id"],
        email=user["email"],
        full_name=user["full_name"],
        role=user["role"],
        token_number=user.get("token_number"),
        token_status=user.get("token_status"),
        is_blocked=user.get("is_blocked", False),
        created_at=user["created_at"]
    )

@users_router.put("/me", response_model=UserResponse)
async def update_profile(profile: UserProfile, user: dict = Depends(get_current_user)):
    """Update user profile"""
    # Check if email is taken by another user
    if profile.email.lower() != user["email"]:
        existing = await db.users.find_one(
            {"email": profile.email.lower(), "id": {"$ne": user["id"]}}, 
            {"_id": 0}
        )
        if existing:
            raise HTTPException(status_code=400, detail="Email already in use")
    
    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {
            "email": profile.email.lower(),
            "full_name": profile.full_name.strip(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    updated = await db.users.find_one({"id": user["id"]}, {"_id": 0})
    return UserResponse(
        id=updated["id"],
        email=updated["email"],
        full_name=updated["full_name"],
        role=updated["role"],
        token_number=updated.get("token_number"),
        token_status=updated.get("token_status"),
        is_blocked=updated.get("is_blocked", False),
        created_at=updated["created_at"]
    )

@users_router.put("/me/password")
async def change_password(data: PasswordChange, user: dict = Depends(get_current_user)):
    """Change user password"""
    if not verify_password(data.current_password, user["password"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    if len(data.new_password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    
    await db.users.update_one(
        {"id": user["id"]},
        {"$set": {
            "password": hash_password(data.new_password),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    return {"message": "Password changed successfully"}

# ==================== VAULT ROUTES ====================

@vault_router.get("/records", response_model=List[VaultRecordResponse])
async def get_records(user: dict = Depends(get_current_user)):
    """Get all user records"""
    records = await db.vault_records.find({"user_id": user["id"]}, {"_id": 0}).to_list(1000)
    return [VaultRecordResponse(**r) for r in records]

@vault_router.get("/records/{record_id}", response_model=VaultRecordResponse)
async def get_record(record_id: str, user: dict = Depends(get_current_user)):
    """Get single record"""
    record = await db.vault_records.find_one({"id": record_id, "user_id": user["id"]}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return VaultRecordResponse(**record)

@vault_router.post("/records", response_model=VaultRecordResponse, status_code=201)
async def create_record(
    category: str = Form(...),
    title: str = Form(...),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    user: dict = Depends(get_current_user)
):
    """Create new vault record"""
    record_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    
    file_data = {}
    
    if file and file.filename:
        validate_file(file)
        upload_result = await upload_to_cloudinary(file, f"wynora_vault/{user['id']}")
        file_data = {
            "file_url": upload_result["url"],
            "file_name": file.filename,
            "file_size": upload_result["size"],
            "file_type": upload_result["type"],
            "file_public_id": upload_result["public_id"]
        }
    
    record_doc = {
        "id": record_id,
        "user_id": user["id"],
        "category": category,
        "title": title.strip(),
        "description": description.strip() if description else None,
        "file_url": file_data.get("file_url"),
        "file_name": file_data.get("file_name"),
        "file_size": file_data.get("file_size"),
        "file_type": file_data.get("file_type"),
        "file_public_id": file_data.get("file_public_id"),
        "created_at": now,
        "updated_at": now
    }
    
    await db.vault_records.insert_one(record_doc)
    return VaultRecordResponse(**record_doc)

@vault_router.put("/records/{record_id}", response_model=VaultRecordResponse)
async def update_record(
    record_id: str,
    category: Optional[str] = Form(None),
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    user: dict = Depends(get_current_user)
):
    """Update vault record"""
    record = await db.vault_records.find_one({"id": record_id, "user_id": user["id"]}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    update_data = {"updated_at": datetime.now(timezone.utc).isoformat()}
    
    if category is not None:
        update_data["category"] = category
    if title is not None:
        update_data["title"] = title.strip()
    if description is not None:
        update_data["description"] = description.strip() if description else None
    
    if file and file.filename:
        # Delete old file from Cloudinary
        if record.get("file_public_id"):
            resource_type = "raw" if record.get("file_type") == "application/pdf" else "image"
            delete_from_cloudinary(record["file_public_id"], resource_type)
        
        validate_file(file)
        upload_result = await upload_to_cloudinary(file, f"wynora_vault/{user['id']}")
        update_data.update({
            "file_url": upload_result["url"],
            "file_name": file.filename,
            "file_size": upload_result["size"],
            "file_type": upload_result["type"],
            "file_public_id": upload_result["public_id"]
        })
    
    await db.vault_records.update_one({"id": record_id}, {"$set": update_data})
    
    updated = await db.vault_records.find_one({"id": record_id}, {"_id": 0})
    return VaultRecordResponse(**updated)

@vault_router.delete("/records/{record_id}")
async def delete_record(record_id: str, user: dict = Depends(get_current_user)):
    """Delete vault record"""
    record = await db.vault_records.find_one({"id": record_id, "user_id": user["id"]}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    # Delete file from Cloudinary
    if record.get("file_public_id"):
        resource_type = "raw" if record.get("file_type") == "application/pdf" else "image"
        delete_from_cloudinary(record["file_public_id"], resource_type)
    
    await db.vault_records.delete_one({"id": record_id})
    return {"message": "Record deleted successfully"}

@vault_router.get("/stats")
async def get_user_stats(user: dict = Depends(get_current_user)):
    """Get user vault statistics"""
    records = await db.vault_records.find({"user_id": user["id"]}, {"_id": 0}).to_list(1000)
    
    categories = {}
    for r in records:
        cat = r.get("category", "Unknown")
        categories[cat] = categories.get(cat, 0) + 1
    
    return {
        "total_records": len(records),
        "categories": categories
    }

# ==================== ADMIN ROUTES ====================

@admin_router.get("/stats", response_model=DashboardStats)
async def get_admin_stats(admin: dict = Depends(get_admin_user)):
    """Get admin dashboard statistics"""
    total_users = await db.users.count_documents({"role": "user"})
    total_records = await db.vault_records.count_documents({})
    active_tokens = await db.users.count_documents({"token_status": "active"})
    pending_tokens = await db.users.count_documents({"token_status": "pending"})
    
    return DashboardStats(
        total_users=total_users,
        total_records=total_records,
        active_tokens=active_tokens,
        pending_tokens=pending_tokens
    )

@admin_router.get("/users", response_model=List[UserResponse])
async def get_all_users(admin: dict = Depends(get_admin_user)):
    """Get all users (admin only)"""
    users = await db.users.find({"role": "user"}, {"_id": 0, "password": 0}).to_list(1000)
    return [UserResponse(**u) for u in users]

@admin_router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, admin: dict = Depends(get_admin_user)):
    """Get user by ID (admin only)"""
    user = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(**user)

@admin_router.put("/users/{user_id}", response_model=UserResponse)
async def update_user(user_id: str, data: AdminUserUpdate, admin: dict = Depends(get_admin_user)):
    """Update user (admin only)"""
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    update_data = {"updated_at": datetime.now(timezone.utc).isoformat()}
    
    if data.is_blocked is not None:
        update_data["is_blocked"] = data.is_blocked
    if data.token_number is not None:
        update_data["token_number"] = data.token_number
    if data.token_status is not None:
        update_data["token_status"] = data.token_status
    
    await db.users.update_one({"id": user_id}, {"$set": update_data})
    
    updated = await db.users.find_one({"id": user_id}, {"_id": 0, "password": 0})
    return UserResponse(**updated)

@admin_router.delete("/users/{user_id}")
async def delete_user(user_id: str, admin: dict = Depends(get_admin_user)):
    """Delete user and their records (admin only)"""
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Delete user's files from Cloudinary
    records = await db.vault_records.find({"user_id": user_id}, {"_id": 0}).to_list(1000)
    for r in records:
        if r.get("file_public_id"):
            resource_type = "raw" if r.get("file_type") == "application/pdf" else "image"
            delete_from_cloudinary(r["file_public_id"], resource_type)
    
    await db.vault_records.delete_many({"user_id": user_id})
    await db.users.delete_one({"id": user_id})
    
    return {"message": "User deleted successfully"}

@admin_router.get("/records", response_model=List[VaultRecordResponse])
async def get_all_records(admin: dict = Depends(get_admin_user)):
    """Get all records (admin only)"""
    records = await db.vault_records.find({}, {"_id": 0}).to_list(1000)
    return [VaultRecordResponse(**r) for r in records]

@admin_router.delete("/records/{record_id}")
async def admin_delete_record(record_id: str, admin: dict = Depends(get_admin_user)):
    """Delete any record (admin only)"""
    record = await db.vault_records.find_one({"id": record_id}, {"_id": 0})
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    # Delete file from Cloudinary
    if record.get("file_public_id"):
        resource_type = "raw" if record.get("file_type") == "application/pdf" else "image"
        delete_from_cloudinary(record["file_public_id"], resource_type)
    
    await db.vault_records.delete_one({"id": record_id})
    return {"message": "Record deleted successfully"}

# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    """API root endpoint"""
    return {"message": "WynOra Vault API", "version": "1.0.0", "status": "healthy"}

@api_router.get("/health")
async def health():
    """Health check endpoint"""
    try:
        # Test database connection
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception:
        raise HTTPException(status_code=503, detail="Database connection failed")

# ==================== INCLUDE ROUTERS ====================

api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(vault_router)
api_router.include_router(admin_router)

app.include_router(api_router)

# ==================== CORS MIDDLEWARE ====================

# Configure CORS - restrict to frontend URL in production
allowed_origins = ["*"] if FRONTEND_URL == "*" else [FRONTEND_URL]

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=allowed_origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# ==================== STARTUP/SHUTDOWN ====================

@app.on_event("startup")
async def startup():
    """Application startup"""
    logger.info("WynOra Vault API starting...")
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id", unique=True)
    await db.vault_records.create_index("user_id")
    await db.vault_records.create_index("id", unique=True)
    logger.info("WynOra Vault API started successfully")

@app.on_event("shutdown")
async def shutdown():
    """Application shutdown"""
    client.close()
    logger.info("WynOra Vault API shutdown complete")
