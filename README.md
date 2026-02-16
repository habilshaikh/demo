# WynOra Vault

A premium secure digital vault platform for storing personal financial and legal information.

![WynOra Vault](https://customer-assets.emergentagent.com/job_wynora-mvp/artifacts/hishwevx_WynOra_Logo.jpg)

## Features

### For Users
- **Secure Document Storage**: Store bank accounts, insurance, legal documents, financial assets, property records, and digital assets
- **File Uploads**: Upload PDF, JPG, PNG files (max 10MB) securely to Cloudinary
- **Categorized Organization**: Organize documents by category for easy access
- **Token Verification**: Get verified with unique tokens assigned by admins

### For Admins
- **User Management**: View, block, and delete users
- **Record Management**: View and manage all vault records
- **Token Assignment**: Assign verification tokens to users
- **Dashboard Analytics**: View platform statistics

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Framer Motion, Shadcn/UI
- **Backend**: FastAPI (Python)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary
- **Authentication**: JWT with bcrypt password hashing

## Project Structure

```
/app
├── backend/
│   ├── server.py           # Main FastAPI application
│   ├── create_admin.py     # Admin creation script
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # Auth context
│   │   └── lib/            # API utilities
│   ├── package.json        # Node dependencies
│   └── .env.example        # Environment variables template
├── DEPLOYMENT.md           # Production deployment guide
└── README.md               # This file
```

## Local Development

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for file uploads)

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Run development server
uvicorn server:app --reload --port 8001
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Copy environment file
cp .env.example .env

# Edit .env with backend URL
nano .env

# Run development server
yarn start
```

### Create Admin User

```bash
cd backend
python create_admin.py --email admin@example.com --password SecurePass123! --name "Admin User"
```

## Environment Variables

### Backend (.env)
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017
DB_NAME=wynora_vault

# JWT
JWT_SECRET=your-super-secure-secret-key
JWT_EXPIRATION_HOURS=1

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret

# CORS
FRONTEND_URL=http://localhost:3000

# Production Mode
PRODUCTION=false
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password |

### User
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user |
| PUT | `/api/users/me` | Update profile |
| PUT | `/api/users/me/password` | Change password |

### Vault
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vault/records` | Get all records |
| GET | `/api/vault/records/:id` | Get single record |
| POST | `/api/vault/records` | Create record |
| PUT | `/api/vault/records/:id` | Update record |
| DELETE | `/api/vault/records/:id` | Delete record |
| GET | `/api/vault/stats` | Get vault stats |

### Admin (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/stats` | Get dashboard stats |
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/users/:id` | Update user |
| DELETE | `/api/admin/users/:id` | Delete user |
| GET | `/api/admin/records` | Get all records |
| DELETE | `/api/admin/records/:id` | Delete record |

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete production deployment instructions.

**Quick Overview:**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas
- Files → Cloudinary

## Security Features

- **Password Hashing**: bcrypt with salt
- **JWT Tokens**: 1-hour expiration (configurable)
- **Role-Based Access**: Admin routes protected
- **CORS Restriction**: Restricted to frontend URL in production
- **Input Validation**: All inputs validated
- **No Debug Logs**: Disabled in production mode

## Theme Customization

### Colors
Located in `/frontend/src/index.css`:
```css
/* Primary colors */
--primary: 217 91% 60%;      /* Blue */
--accent: 217 91% 60%;       /* Electric blue */

/* Cosmic background */
.cosmic-bg { /* Deep space gradients */ }
.cosmic-text-gradient { /* Blue to violet gradient */ }
```

### Fonts
- Headings: Outfit
- Body: Inter
- Mono: JetBrains Mono

## Legal Compliance

The platform includes Indian law-compliant pages:
- Terms & Conditions (IT Act, 2000 compliant)
- Privacy Policy (Data protection principles)

## License

Proprietary - All rights reserved.

## Support

- Email: support@wynora.com
- Phone: +91 XXXXX XXXXX
