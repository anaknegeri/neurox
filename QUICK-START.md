# 🚀 Quick Start - Deploy dengan GitHub Actions

> Deploy website Anda dalam 5 menit!

## ✅ Prerequisites Checklist

- [ ] Punya akun GitHub
- [ ] Punya VPS/server dengan SSH access
- [ ] Domain sudah pointing ke server (via Cloudflare)
- [ ] Server sudah install Podman & Caddy

## 📝 Step-by-Step

### 1️⃣ Fork/Clone Repository (1 menit)

```bash
# Clone repository
git clone https://github.com/anaknegeri/neurox.git
cd neurox

# Atau fork di GitHub, lalu clone
```

### 2️⃣ Setup GitHub Secrets (2 menit)

**Go to:** Repository → Settings → Secrets and variables → Actions → New repository secret

Tambahkan 4 secrets ini:

| Secret Name | Value | Example |
|-------------|-------|---------|
| `SERVER_HOST` | IP server Anda | `185.232.84.146` |
| `SERVER_USER` | User SSH (gunakan `root`) | `root` |
| `SSH_PRIVATE_KEY` | Isi file `~/.ssh/id_rsa` | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `SERVER_PORT` | Port SSH (optional) | `22` |

**Cara get SSH Private Key:**
```bash
# Di komputer lokal
cat ~/.ssh/id_rsa
# Copy seluruh isinya, dari -----BEGIN sampai -----END
```

### 3️⃣ Push ke Main Branch (2 detik)

```bash
# Make a small change (optional)
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

**🎉 DONE!** GitHub Actions akan otomatis:
1. Build Docker image (2 menit)
2. Push ke GitHub Container Registry (30 detik)
3. Deploy ke server (30 detik)

## 📺 Monitor Deployment

### Option 1: GitHub Web
1. Go to: https://github.com/YOUR_USERNAME/neurox/actions
2. Click workflow yang sedang running
3. Lihat logs real-time

### Option 2: Command Line
```bash
# Install GitHub CLI (optional)
brew install gh

# Login
gh auth login

# Watch workflow
gh run watch
```

### Option 3: SSH ke Server
```bash
ssh root@YOUR_SERVER_IP
su - neurox -s /bin/bash -c 'podman logs -f neurox-app'
```

## ✅ Verify Deployment

```bash
# Test dari browser
https://YOUR_DOMAIN.com

# Atau curl
curl -I https://YOUR_DOMAIN.com

# Expected:
# HTTP/2 200
# ✅ Website loaded!
```

## 🎯 Daily Workflow

Setelah initial setup, deploy process sangat simple:

```bash
# 1. Make changes
code src/app/page.tsx

# 2. Commit & push
git add .
git commit -m "Update homepage"
git push

# 3. Wait 3 minutes
# 4. Check https://YOUR_DOMAIN.com
# ✅ Changes deployed!
```

## 🔧 Troubleshooting

### Deployment Failed?

**Check GitHub Actions logs:**
1. Go to: https://github.com/YOUR_USERNAME/neurox/actions
2. Click failed workflow (red ❌)
3. Expand failed step
4. Read error message

**Common Issues:**

| Error | Solution |
|-------|----------|
| `Permission denied (publickey)` | ❌ Check `SSH_PRIVATE_KEY` secret |
| `ssh: connect to host port 22: Connection refused` | ❌ Check `SERVER_HOST` dan `SERVER_PORT` |
| `Error response from daemon: pull access denied` | ❌ Make image public di GitHub Packages |
| `Container failed to start` | ❌ Check server logs: `podman logs neurox-app` |

### Website Shows 502?

```bash
# SSH to server
ssh root@YOUR_SERVER_IP

# Check container
su - neurox -s /bin/bash -c 'podman ps -a'

# If Exited, restart
su - neurox -s /bin/bash -c 'podman start neurox-app'

# Check logs
su - neurox -s /bin/bash -c 'podman logs --tail 20 neurox-app'
```

### Re-run Deployment

**Option 1: Push empty commit**
```bash
git commit --allow-empty -m "Redeploy"
git push
```

**Option 2: Re-run via GitHub**
1. Go to: https://github.com/YOUR_USERNAME/neurox/actions
2. Click failed workflow
3. Click "Re-run all jobs"

## 📚 Next Steps

- ✅ Read [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- ✅ Read [SECURITY.md](SECURITY.md) - Security best practices
- ✅ Print [SECURITY-CHEATSHEET.md](SECURITY-CHEATSHEET.md) - Daily checks

## 🆘 Need Help?

1. **Check logs:**
   - GitHub Actions: https://github.com/YOUR_USERNAME/neurox/actions
   - Server: `ssh root@SERVER_IP` → `podman logs neurox-app`

2. **Read docs:**
   - [DEPLOYMENT.md](DEPLOYMENT.md) - Troubleshooting lengkap
   - [SECURITY.md](SECURITY.md) - Security issues

3. **GitHub Issues:**
   - https://github.com/anaknegeri/neurox/issues

## 🎉 Success Checklist

After first deployment, verify:

- [ ] ✅ GitHub Actions workflow completed (green ✓)
- [ ] ✅ Image pushed to ghcr.io
- [ ] ✅ Container running on server (`podman ps`)
- [ ] ✅ Website accessible (https://YOUR_DOMAIN.com)
- [ ] ✅ Next.js version 16.0.10+ (`podman exec neurox-app node -e "console.log(require('/app/node_modules/next/package.json').version)"`)

**Congratulations! 🎊 Your website is now auto-deployed with GitHub Actions!**

---

**Pro Tips:**

💡 **Enable branch protection** - Settings → Branches → Add rule → Require status checks

💡 **Setup staging** - Create `develop` branch untuk testing sebelum production

💡 **Monitor uptime** - Setup monitoring di https://uptimerobot.com (free)

💡 **Backup regularly** - Run `podman save neurox-app > backup.tar` weekly

Happy deploying! 🚀