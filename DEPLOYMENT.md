# WynOra Vault - Production Deployment Guide

## Overview

This guide covers deploying WynOra Vault to production using:
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary

---

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Render account (free tier works)
- MongoDB Atlas account (free tier works)
- Cloudinary account (free tier works)

---

## Step 1: MongoDB Atlas Setup

### 1.1 Create MongoDB Atlas Account
1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Sign up or log in
3. Create a new organization (if needed)

### 1.2 Create a Cluster
1. Click **"Build a Database"**
2. Select **"M0 FREE"** tier
3. Choose a cloud provider and region (choose closest to your users)
4. Name your cluster: `wynora-vault`
5. Click **"Create"**

### 1.3 Configure Database Access
1. Go to **Database Access** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username: `wynora_admin`
5. Generate a secure password (save it!)
6. Under **"Database User Privileges"**, select **"Read and write to any database"**
7. Click **"Add User"**

### 1.4 Configure Network Access
1. Go to **Network Access** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **Database** in the left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Select **Driver: Python** and **Version: 3.12 or later**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://wynora_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password

---

## Step 2: Cloudinary Setup

### 2.1 Create Cloudinary Account
1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for free account

### 2.2 Get API Credentials
1. Go to **Dashboard**
2. Note down these values:
   - **Cloud Name**: `your-cloud-name`
   - **API Key**: `123456789012345`
   - **API Secret**: `your-api-secret`

---

## Step 3: Backend Deployment (Render)

### 3.1 Prepare Repository
1. Push your code to GitHub
2. Make sure `/app/backend` folder contains:
   - `server.py`
   - `requirements.txt`
   - `create_admin.py`

### 3.2 Create Render Web Service
1. Go to [https://render.com](https://render.com)
2. Sign up/log in with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure the service:

| Setting | Value |
|---------|-------|
| Name | `wynora-vault-api` |
| Region | Choose closest to users |
| Branch | `main` |
| Root Directory | `backend` |
| Runtime | `Python 3` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `uvicorn server:app --host 0.0.0.0 --port $PORT` |
| Instance Type | `Free` |

### 3.3 Configure Environment Variables
In Render, go to **Environment** tab and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `DB_NAME` | `wynora_vault` |
| `JWT_SECRET` | Generate: `openssl rand -hex 32` |
| `JWT_EXPIRATION_HOURS` | `1` |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_SECRET` | Your Cloudinary API secret |
| `FRONTEND_URL` | `https://your-app.vercel.app` (update after Vercel deploy) |
| `PRODUCTION` | `true` |

### 3.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment to complete
3. Note your backend URL: `https://wynora-vault-api.onrender.com`

### 3.5 Create Admin User
After deployment, use Render Shell:
1. Go to your service → **Shell** tab
2. Run:
   ```bash
   python create_admin.py --email admin@yourdomain.com --password YourSecurePassword123! --name "Admin User"
   ```

---

## Step 4: Frontend Deployment (Vercel)

### 4.1 Prepare Repository
Make sure `/app/frontend` folder contains:
- `package.json`
- `src/` folder
- All React components

### 4.2 Create Vercel Project
1. Go to [https://vercel.com](https://vercel.com)
2. Sign up/log in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository

### 4.3 Configure Build Settings
| Setting | Value |
|---------|-------|
| Framework Preset | `Create React App` |
| Root Directory | `frontend` |
| Build Command | `yarn build` |
| Output Directory | `build` |

### 4.4 Configure Environment Variables
Add this environment variable:

| Key | Value |
|-----|-------|
| `REACT_APP_BACKEND_URL` | `https://wynora-vault-api.onrender.com` |

### 4.5 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Note your frontend URL: `https://wynora-vault.vercel.app`

### 4.6 Update Backend CORS
After getting your Vercel URL:
1. Go back to Render
2. Update `FRONTEND_URL` environment variable to your Vercel URL
3. Render will automatically redeploy

---

## Step 5: Verify Deployment

### 5.1 Test Backend Health
```bash
curl https://wynora-vault-api.onrender.com/api/health
```
Expected response: `{"status":"healthy","database":"connected"}`

### 5.2 Test Frontend
1. Open your Vercel URL in browser
2. You should see the WynOra Vault homepage

### 5.3 Test Admin Login
1. Go to `/login`
2. Login with the admin credentials you created
3. Verify admin dashboard loads

---

## Step 6: Custom Domain (Optional)

### 6.1 Vercel Custom Domain
1. Go to Vercel Project → **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS at your domain registrar

### 6.2 Render Custom Domain
1. Go to Render Service → **Settings** → **Custom Domains**
2. Add your API subdomain (e.g., `api.yourdomain.com`)
3. Configure DNS at your domain registrar

---

## Environment Variables Summary

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=wynora_vault
JWT_SECRET=your-64-character-hex-secret
JWT_EXPIRATION_HOURS=1
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_SECRET=your-cloudinary-secret
FRONTEND_URL=https://your-app.vercel.app
PRODUCTION=true
```

### Frontend (Vercel)
```env
REACT_APP_BACKEND_URL=https://your-backend.onrender.com
```

---

## Security Checklist

- [ ] JWT_SECRET is a random 64-character hex string
- [ ] MongoDB user has limited permissions
- [ ] Cloudinary credentials are kept secret
- [ ] FRONTEND_URL is set to restrict CORS
- [ ] PRODUCTION=true disables debug docs
- [ ] Admin password is at least 8 characters
- [ ] No default credentials in code

---

## Troubleshooting

### Backend not starting
1. Check Render logs for errors
2. Verify all environment variables are set
3. Check MongoDB connection string format

### CORS errors
1. Verify FRONTEND_URL matches your Vercel URL exactly
2. Include protocol (https://)
3. No trailing slash

### File uploads failing
1. Verify Cloudinary credentials
2. Check file size (max 10MB)
3. Check allowed file types (PDF, JPG, PNG)

### Database connection issues
1. Verify MongoDB Atlas network access allows 0.0.0.0/0
2. Check username/password in connection string
3. Verify cluster is running

---

## Maintenance

### Updating the Application
1. Push changes to GitHub
2. Render and Vercel will auto-deploy

### Monitoring
- Render: Built-in logs and metrics
- Vercel: Analytics and logs
- MongoDB Atlas: Performance Advisor

### Backups
- MongoDB Atlas provides automated backups
- Cloudinary maintains file backups

---

## Cost Considerations

| Service | Free Tier Limits |
|---------|------------------|
| Vercel | 100GB bandwidth/month |
| Render | 750 hours/month, sleeps after 15min inactivity |
| MongoDB Atlas | 512MB storage |
| Cloudinary | 25GB storage, 25GB bandwidth |

For production with high traffic, consider upgrading to paid plans.

---

## Support

For issues:
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Render: [render.com/docs](https://render.com/docs)
- MongoDB Atlas: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- Cloudinary: [cloudinary.com/documentation](https://cloudinary.com/documentation)
