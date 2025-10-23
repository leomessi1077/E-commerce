# 🚀 Deploy Your Commerce App to Vercel

## Current Status
- ✅ Code pushed to GitHub: `https://github.com/leomessi1077/E-commerce`
- ✅ Frontend is deployed at: `https://e-commerce-a53s.vercel.app`
- ❌ Backend is NOT deployed yet (causing the 405 error)

## 📋 Deployment Steps

### **STEP 1: Deploy Backend First (5 minutes)**

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with your GitHub account

2. **Import Your Repository**
   - Click **"Import"** next to `E-commerce` repository
   - (If you don't see it, click "Import Git Repository" and paste: `https://github.com/leomessi1077/E-commerce`)

3. **Configure Backend Project**
   - **Project Name:** `ecommerce-backend` (or any name you like)
   - **Framework Preset:** Other
   - **Root Directory:** Click **"Edit"** → Select **`backend`** folder
   - Leave "Build and Output Settings" as default

4. **Add Environment Variables** (VERY IMPORTANT!)
   Click "Environment Variables" and add these:

   ```
   Variable Name: MONGODB_URI
   Value: mongodb+srv://Manish:Manish2025@cluster0.bylmk9t.mongodb.net/mainsh?retryWrites=true&w=majority&appName=Cluster0

   Variable Name: JWT_SECRET
   Value: manish_ecommerce_production_secret_key_2024

   Variable Name: JWT_EXPIRE
   Value: 7d

   Variable Name: NODE_ENV
   Value: production

   Variable Name: RAZORPAY_KEY_ID
   Value: rzp_test_YOUR_KEY_HERE

   Variable Name: RAZORPAY_KEY_SECRET
   Value: YOUR_RAZORPAY_SECRET_HERE
   ```

5. **Click "Deploy"** 
   - Wait 2-3 minutes for deployment
   - ✅ **COPY YOUR BACKEND URL!** (e.g., `https://ecommerce-backend-xyz.vercel.app`)

---

### **STEP 2: Update MongoDB Atlas Network Access**

1. **Go to MongoDB Atlas**
   - Visit: https://cloud.mongodb.com/
   - Sign in with your account

2. **Allow Vercel IPs**
   - Click on **"Network Access"** (left sidebar)
   - Click **"Add IP Address"**
   - Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - Click **"Confirm"**

---

### **STEP 3: Update Frontend to Use Backend URL**

1. **Go back to Vercel Dashboard**
   - Find your frontend project: `e-commerce-a53s`
   - Click on it

2. **Go to Settings → Environment Variables**
   - Click **"Add New"**
   - Add this variable:
   ```
   Variable Name: REACT_APP_API_URL
   Value: <YOUR_BACKEND_URL_FROM_STEP_1>
   ```
   Example: `https://ecommerce-backend-xyz.vercel.app`

3. **Redeploy Frontend**
   - Go to **"Deployments"** tab
   - Click the **3 dots** (⋮) on the latest deployment
   - Click **"Redeploy"**
   - Check **"Use existing Build Cache"**
   - Click **"Redeploy"**

---

### **STEP 4: Test Your Live App! 🎉**

1. Visit your frontend URL: `https://e-commerce-a53s.vercel.app`
2. Try to register a new user
3. Browse products
4. Add to cart
5. Place an order

---

## 🔧 Troubleshooting

### Backend Deployment Failed?
- Check if all environment variables are correctly added
- Make sure `backend/vercel.json` exists
- Check deployment logs for errors

### Frontend Still Shows 405 Error?
- Make sure you added `REACT_APP_API_URL` environment variable
- Make sure you redeployed the frontend after adding the variable
- Clear browser cache (Ctrl + Shift + Delete)

### CORS Error?
- Check `backend/server.js` CORS configuration
- Make sure your frontend URL is allowed

### MongoDB Connection Error?
- Verify MongoDB credentials are correct
- Make sure "Allow Access from Anywhere" is enabled in MongoDB Atlas Network Access
- Check if the database name is correct (`mainsh`)

---

## 📝 Quick Checklist

- [ ] Backend deployed to Vercel
- [ ] Backend URL copied
- [ ] MongoDB Atlas network access configured (0.0.0.0/0)
- [ ] Frontend environment variable `REACT_APP_API_URL` added
- [ ] Frontend redeployed
- [ ] Registration works
- [ ] Login works
- [ ] Products load
- [ ] Cart works
- [ ] Checkout works

---

## 🎯 Next Steps After Deployment

1. **Add Real Payment Gateway**
   - Sign up for Razorpay: https://dashboard.razorpay.com/signup
   - Get API keys
   - Update environment variables in Vercel

2. **Custom Domain** (Optional)
   - Go to Vercel Project Settings → Domains
   - Add your custom domain

3. **Monitor Your App**
   - Check Vercel Analytics
   - Monitor MongoDB usage
   - Set up error tracking (Sentry)

---

## 💡 Important Notes

- **Free Tier Limits:**
  - Vercel: 100GB bandwidth/month
  - MongoDB Atlas: 512MB storage
  
- **Environment Variables:**
  - Changes require redeployment to take effect
  - Keep your secrets safe (never commit .env files)

- **Updates:**
  - Push changes to GitHub
  - Vercel will auto-deploy (if auto-deploy is enabled)
  - Or manually redeploy from Vercel dashboard

---

Need help? Check the deployment logs or contact support!

