#!/usr/bin/env python3
"""
WynOra Vault - Admin User Creation Script

Usage:
    python create_admin.py --email admin@example.com --password SecurePassword123 --name "Admin User"

Required environment variables:
    - MONGODB_URI: MongoDB connection string
    - DB_NAME: Database name (default: wynora_vault)
"""

import argparse
import asyncio
import os
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

import bcrypt
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')


def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


async def create_admin(email: str, password: str, full_name: str):
    """Create admin user in database"""
    
    # Get MongoDB connection
    mongodb_uri = os.environ.get('MONGODB_URI')
    if not mongodb_uri:
        print("Error: MONGODB_URI environment variable is required")
        sys.exit(1)
    
    db_name = os.environ.get('DB_NAME', 'wynora_vault')
    
    # Connect to MongoDB
    client = AsyncIOMotorClient(mongodb_uri)
    db = client[db_name]
    
    try:
        # Check if admin already exists
        existing = await db.users.find_one({"email": email.lower()})
        if existing:
            print(f"Error: User with email '{email}' already exists")
            sys.exit(1)
        
        # Validate password strength
        if len(password) < 8:
            print("Error: Password must be at least 8 characters long")
            sys.exit(1)
        
        # Create admin user
        user_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc).isoformat()
        
        admin_doc = {
            "id": user_id,
            "email": email.lower(),
            "password": hash_password(password),
            "full_name": full_name,
            "role": "admin",
            "token_number": None,
            "token_status": None,
            "is_blocked": False,
            "created_at": now,
            "updated_at": now
        }
        
        await db.users.insert_one(admin_doc)
        
        print("\n" + "="*50)
        print("✅ Admin user created successfully!")
        print("="*50)
        print(f"Email: {email.lower()}")
        print(f"Name: {full_name}")
        print(f"Role: admin")
        print(f"User ID: {user_id}")
        print("="*50)
        print("\n⚠️  Keep these credentials secure!")
        print("You can now login to the admin panel.\n")
        
    except Exception as e:
        print(f"Error creating admin: {e}")
        sys.exit(1)
    finally:
        client.close()


def main():
    parser = argparse.ArgumentParser(
        description="Create an admin user for WynOra Vault",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Example:
    python create_admin.py --email admin@wynora.com --password SecurePass123! --name "Admin User"

Environment variables required:
    MONGODB_URI - MongoDB connection string
    DB_NAME     - Database name (optional, default: wynora_vault)
        """
    )
    
    parser.add_argument(
        '--email', '-e',
        required=True,
        help='Admin email address'
    )
    parser.add_argument(
        '--password', '-p',
        required=True,
        help='Admin password (min 8 characters)'
    )
    parser.add_argument(
        '--name', '-n',
        required=True,
        help='Admin full name'
    )
    
    args = parser.parse_args()
    
    # Run async function
    asyncio.run(create_admin(args.email, args.password, args.name))


if __name__ == "__main__":
    main()
