# Vercel Deployment Guide

This guide will walk you through deploying your React + Vite application to Vercel.

## 📋 Prerequisites

Before deploying, make sure you have:
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)
- Your backend API URL ready

## 🚀 Quick Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Import your project to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repository
   - Vercel will automatically detect it's a Vite project

3. **Configure Environment Variables**
   - In the project settings, go to "Environment Variables"
   - Add the following variable:
     - **Name:** `VITE_API_BASE_URL`
     - **Value:** Your production API URL (e.g., `https://deutschemedizin-collage-backend-production.up.railway.app/api`)
     - **Environment:** Select all (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a URL like `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked about environment variables, add `VITE_API_BASE_URL`

4. **For production deployment**
   ```bash
   vercel --prod
   ```

## ⚙️ Configuration Files

The following files have been created/updated for Vercel deployment:

### `vercel.json`
- Configures build settings
- Sets up SPA routing (all routes redirect to index.html)
- Optimizes asset caching

### `src/components/api/apiClient.tsx`
- Updated to use environment variables
- Falls back to production API in production mode
- Uses `VITE_API_BASE_URL` if set

### `.env.example`
- Template for environment variables
- Documents required variables

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Your backend API base URL | `https://your-api.com/api` |

### How to Set Environment Variables in Vercel

1. Go to your project on Vercel dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Click **Add New**
4. Enter the variable name and value
5. Select which environments to apply it to:
   - **Production**: Live production site
   - **Preview**: Preview deployments (pull requests)
   - **Development**: Local development with `vercel dev`

## 📦 Build Configuration

The project is configured with:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Framework:** Vite
- **Node Version:** >= 20 (as specified in package.json)

## 🔍 Post-Deployment Checklist

After deployment, verify:

- [ ] Your site is accessible at the Vercel URL
- [ ] API calls are working (check browser console)
- [ ] All routes work correctly (SPA routing)
- [ ] Environment variables are set correctly
- [ ] Assets are loading properly
- [ ] No console errors

## 🐛 Troubleshooting

### Build Fails

1. **Check Node version**: Ensure Node >= 20
   - Vercel uses the version specified in `package.json` engines

2. **Check build logs**: 
   - Go to your deployment → "View Build Logs"
   - Look for specific error messages

3. **Common issues**:
   - Missing dependencies: Run `npm install` locally first
   - TypeScript errors: Fix all TypeScript errors before deploying
   - Environment variables: Make sure all required variables are set

### API Calls Not Working

1. **Check CORS**: Ensure your backend allows requests from your Vercel domain
2. **Check API URL**: Verify `VITE_API_BASE_URL` is set correctly
3. **Check Network tab**: Open browser DevTools → Network tab to see failed requests

### Routes Not Working (404 errors)

- The `vercel.json` file includes a rewrite rule to handle SPA routing
- If routes still don't work, check that `vercel.json` is in the root directory

### Environment Variables Not Working

- Remember: Vite environment variables must start with `VITE_`
- After adding/changing environment variables, redeploy your application
- Variables are injected at build time, not runtime

## 🔄 Updating Your Deployment

Every time you push to your main branch, Vercel will automatically:
1. Create a new deployment
2. Run the build command
3. Deploy the new version

You can also manually trigger deployments from the Vercel dashboard.

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Environment Variables in Vercel](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 You're All Set!

Your application is now ready to deploy on Vercel. Follow the steps above to get it live!

