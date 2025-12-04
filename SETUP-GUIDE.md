# Koda Landing Page - Setup Guide

## 🚀 Quick Start

### 1. Start the Landing Page Server

```bash
cd /Users/alvarocamasmie/Downloads/landing
node server.js
```

Your landing page will be available at: **http://localhost:8080**

---

## 🌐 Connect to Ngrok

### Prerequisites
- Install ngrok: https://ngrok.com/download
- You already have your domain tokens configured

### Option A: Using the Shell Script (Recommended)

```bash
cd /Users/alvarocamasmie/Downloads/landing
chmod +x start-ngrok.sh
./start-ngrok.sh
```

### Option B: Manual Setup

**Start Frontend Tunnel:**
```bash
ngrok http 8080 --domain=landingfrontend.ngrok.app --authtoken=rd_353neA18cQ9TrKPIhCpXCLlLVBO
```

**Start Backend Tunnel (if needed):**
```bash
ngrok http 3001 --domain=landingbackend.ngrok.app --authtoken=rd_353nRATqpfXccRTZfpj61SVufua
```

### Your Ngrok URLs:
- **Frontend**: https://landingfrontend.ngrok.app
- **Backend**: https://landingbackend.ngrok.app

---

## 📦 GitHub Repository Setup

Based on your screenshot, you're already connected to the **koda-Landing** repository on GitHub Desktop.

### Push Changes to GitHub

1. **Make sure all changes are committed** (your screenshot shows "0 changed files")

2. **Push to GitHub:**
   ```bash
   cd /Users/alvarocamasmie/Downloads/landing
   git push origin main
   ```

3. **Or use GitHub Desktop:**
   - Click "Push origin" button in the top right
   - Or use: `⌘ + P` (Cmd + P)

### Clone/Pull Latest Changes

```bash
# Pull latest changes
git pull origin main

# Or use GitHub Desktop: Repository → Pull (⌘ + Shift + P)
```

### View Repository on GitHub

According to your GitHub Desktop, the repository should be at:
```
https://github.com/[your-username]/koda-Landing
```

---

## 🔄 Complete Workflow

### 1. Start Everything:

```bash
# Terminal 1: Start Landing Page
cd /Users/alvarocamasmie/Downloads/landing
node server.js

# Terminal 2: Start Ngrok
cd /Users/alvarocamasmie/Downloads/landing
./start-ngrok.sh
```

### 2. Access Your Site:

- **Local**: http://localhost:8080
- **Public**: https://landingfrontend.ngrok.app

### 3. Make Changes & Commit:

Using GitHub Desktop (as shown in your screenshot):
1. Make your code changes
2. Changes will appear in the "Changes" tab
3. Write a commit message in "Summary (required)"
4. Click "Commit to main"
5. Click "Push origin"

Or via command line:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 📁 Project Structure

```
/Users/alvarocamasmie/Downloads/landing/
├── index.html              # Main landing page
├── index.css               # Main styles
├── about.html              # About page
├── contact.html            # Contact page
├── server.js               # Local development server
├── start-ngrok.sh          # Ngrok startup script
├── language-switcher.js    # Multi-language support
├── mobile-menu.js          # Mobile navigation
├── assets/                 # Images, icons, fonts
│   ├── images/
│   └── icons/
└── koda-webapp/            # Main web application
    ├── backend/
    └── frontend/
```

---

## 🛠 Troubleshooting

### Ngrok Issues

If ngrok fails:
1. Check if ngrok is installed: `which ngrok`
2. Verify your auth tokens are correct
3. Ensure ports 8080 and 3001 are not in use

### Server Issues

If the server won't start:
1. Make sure Node.js is installed: `node --version`
2. Check if port 8080 is available: `lsof -i :8080`
3. Kill any process using the port: `kill -9 [PID]`

### GitHub Issues

If you can't push to GitHub:
1. Verify you're on the correct branch: `git branch`
2. Check remote: `git remote -v`
3. Ensure you're authenticated with GitHub

---

## 📝 Notes

- The landing page is a static site (HTML/CSS/JS)
- No build step required - just serve the files
- Ngrok provides public URLs for testing
- GitHub Desktop makes commits easier with a visual interface

---

## 🔗 Useful Links

- **Ngrok Dashboard**: https://dashboard.ngrok.com
- **GitHub Repository**: Check GitHub Desktop for your repo URL
- **Local Server**: http://localhost:8080

---

Need help? Check the files:
- `server.js` - Server configuration
- `start-ngrok.sh` - Ngrok configuration
- This guide: `SETUP-GUIDE.md`
