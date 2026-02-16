# WynOra Vault - Production Deployment Checklist

## Pre-Deployment

### Code Preparation
- [ ] All changes committed to Git
- [ ] Code pushed to GitHub repository
- [ ] `.env` files NOT committed (in .gitignore)
- [ ] `.env.example` files included for reference

### Accounts Created
- [ ] MongoDB Atlas account
- [ ] Cloudinary account
- [ ] Render account
- [ ] Vercel account

---

## MongoDB Atlas Setup

- [ ] Cluster created (M0 free tier or higher)
- [ ] Database user created with read/write permissions
- [ ] Network access configured (0.0.0.0/0 for Render)
- [ ] Connection string saved securely

**Connection String Format:**
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

---

## Cloudinary Setup

- [ ] Account created
- [ ] API credentials saved:
  - [ ] Cloud Name
  - [ ] API Key
  - [ ] API Secret

---

## Backend Deployment (Render)

### Service Configuration
- [ ] Web Service created
- [ ] Repository connected
- [ ] Root directory set to `backend`
- [ ] Build command: `pip install -r requirements.txt`
- [ ] Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

### Environment Variables Set
- [ ] `MONGODB_URI` - MongoDB connection string
- [ ] `DB_NAME` - `wynora_vault`
- [ ] `JWT_SECRET` - Secure random string (64+ chars)
- [ ] `JWT_EXPIRATION_HOURS` - `1`
- [ ] `CLOUDINARY_CLOUD_NAME` - Your cloud name
- [ ] `CLOUDINARY_API_KEY` - Your API key
- [ ] `CLOUDINARY_SECRET` - Your API secret
- [ ] `FRONTEND_URL` - Vercel URL (update after Vercel deploy)
- [ ] `PRODUCTION` - `true`

### Post-Deploy
- [ ] Service deployed successfully
- [ ] Health check passing: `/api/health`
- [ ] Admin user created via Render Shell

---

## Frontend Deployment (Vercel)

### Project Configuration
- [ ] Project created
- [ ] Repository connected
- [ ] Root directory set to `frontend`
- [ ] Build command: `yarn build`
- [ ] Output directory: `build`

### Environment Variables Set
- [ ] `REACT_APP_BACKEND_URL` - Render backend URL

### Post-Deploy
- [ ] Site deployed successfully
- [ ] Homepage loads correctly
- [ ] Login works with admin credentials

---

## Final Configuration

- [ ] Update Render `FRONTEND_URL` with final Vercel URL
- [ ] Verify CORS working (no errors in browser console)
- [ ] Test file upload to Cloudinary
- [ ] Test admin user management
- [ ] Test user signup/login flow

---

## Security Verification

- [ ] JWT tokens expire after 1 hour
- [ ] Passwords hashed with bcrypt
- [ ] Admin routes protected
- [ ] API docs disabled in production (`/docs` returns 404)
- [ ] CORS restricted to frontend URL only
- [ ] No sensitive data in error messages
- [ ] No default admin credentials in code

---

## Testing Checklist

### Public Pages
- [ ] Homepage loads
- [ ] About page loads
- [ ] How It Works page loads
- [ ] Security page loads
- [ ] Contact page loads
- [ ] Terms page loads
- [ ] Privacy page loads

### Authentication
- [ ] User signup works
- [ ] User login works
- [ ] Admin login works
- [ ] Password reset flow works
- [ ] Logout works

### User Dashboard
- [ ] Dashboard overview loads
- [ ] Add record works
- [ ] File upload works (Cloudinary)
- [ ] Edit record works
- [ ] Delete record works
- [ ] Profile update works
- [ ] Password change works
- [ ] Token status displays

### Admin Panel
- [ ] Admin dashboard loads
- [ ] User list displays
- [ ] Block/unblock user works
- [ ] Delete user works
- [ ] Records list displays
- [ ] Delete record works
- [ ] Assign token works
- [ ] Admin settings work

---

## Post-Launch

### Monitoring
- [ ] Set up Render alerts
- [ ] Set up Vercel analytics
- [ ] Monitor MongoDB Atlas metrics
- [ ] Monitor Cloudinary usage

### Backup Strategy
- [ ] MongoDB Atlas backups enabled
- [ ] Cloudinary backup policy reviewed

### Documentation
- [ ] Admin credentials stored securely
- [ ] Environment variables documented
- [ ] Runbook created for common issues

---

## URLs Reference

| Service | URL |
|---------|-----|
| Frontend | https://your-app.vercel.app |
| Backend API | https://your-api.onrender.com |
| MongoDB Atlas | https://cloud.mongodb.com |
| Cloudinary | https://cloudinary.com/console |
| Render Dashboard | https://dashboard.render.com |
| Vercel Dashboard | https://vercel.com/dashboard |

---

## Emergency Contacts

- MongoDB Atlas Support: support@mongodb.com
- Cloudinary Support: support@cloudinary.com
- Render Support: support@render.com
- Vercel Support: support@vercel.com

---

## Deployment Complete!

Date: _______________
Deployed by: _______________
Version: 1.0.0
