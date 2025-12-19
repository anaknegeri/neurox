# NeuroX Deployment

Simple deployment menggunakan Podman, Caddy, dan GitHub Actions dengan Cloudflare Proxy (SSL).

## 📋 Quick Setup

### 1. Server Setup

```bash
cd deployment

# Install Podman
ansible-playbook -i inventory.ini podman.yml

# Install Caddy (HTTP only)
ansible-playbook -i inventory.ini caddy.yml
```

### 2. DNS Setup (Cloudflare)

**Mode**: **Proxied** (orange cloud) - Cloudflare handles SSL

```
Type: A
Name: @ (neurox.ae)
Content: YOUR_SERVER_IP
Proxy: Proxied ← Orange cloud!
```

**Why Cloudflare Proxy?**
- ✅ Cloudflare handles SSL/TLS automatically
- ✅ DDoS protection
- ✅ CDN & caching
- ✅ No need to manage SSL certificates on server

### 3. GitHub Secrets

Settings → Secrets → Actions:

- `SERVER_HOST` - Server IP
- `SERVER_USER` - root
- `SSH_PRIVATE_KEY` - SSH private key content
- `SERVER_PORT` - SSH port (optional, default 22)

**Note**: No Docker or GitHub tokens needed! Uses GitHub Container Registry (ghcr.io) with automatic `GITHUB_TOKEN`

### 4. Deploy

```bash
git push origin main
```

GitHub Actions akan otomatis build dan deploy.

## 🚀 Auto Deploy dengan GitHub Actions

### Cara Kerja

1. **Push ke main branch** → Auto trigger GitHub Actions
2. **Build** → Docker image di-build
3. **Push** → Image di-push ke ghcr.io
4. **Deploy** → SSH ke server, pull image, restart container
5. **Done** → Website otomatis update!

### Workflow Features

✅ **Auto-restart** - Container restart otomatis jika crash
✅ **Security patched** - Always use latest Next.js 16.0.10
✅ **Image cleanup** - Auto hapus old images
✅ **Version check** - Verify Next.js version after deploy
✅ **Run as neurox user** - Non-root for security

### Deploy Steps

```bash
# 1. Make changes locally
git add .
git commit -m "Your changes"
git push origin main

# 2. Wait for GitHub Actions (2-3 minutes)
# Check: https://github.com/anaknegeri/neurox/actions

# 3. Verify deployment
curl https://neurox.ae
```

### Monitor Deployment

**GitHub Actions:**
- Go to: https://github.com/anaknegeri/neurox/actions
- Click latest workflow run
- See build & deploy logs in real-time

**SSH ke server:**
```bash
ssh root@185.232.84.146
su - neurox -s /bin/bash -c 'podman logs -f neurox-app'
```

## 🔧 Manual Deploy (Jika GitHub Actions Down)

```bash
ssh root@185.232.84.146

# Run as neurox user
su - neurox -s /bin/bash << 'EOF'
  # Login to GitHub Container Registry
  echo "YOUR_GITHUB_TOKEN" | podman login ghcr.io -u YOUR_USERNAME --password-stdin

  # Pull latest image
  podman pull ghcr.io/anaknegeri/neurox:latest

  # Stop and remove old container
  podman stop neurox-app || true
  podman rm neurox-app || true

  # Deploy new container with auto-restart
  podman run -d \
    --name neurox-app \
    --restart=always \
    -p 3000:3000 \
    -e NODE_ENV=production \
    -e PORT=3000 \
    -e HOSTNAME=0.0.0.0 \
    ghcr.io/anaknegeri/neurox:latest

  # Verify
  podman ps
  podman logs --tail 20 neurox-app

  # Check Next.js version
  podman exec neurox-app node -e "console.log(require('/app/node_modules/next/package.json').version)"
EOF
```

## ✅ Verify Deployment

```bash
ssh root@185.232.84.146

# Run as neurox user
su - neurox -s /bin/bash

# Check container running
podman ps
# Should show: neurox-app with status "Up"

# Check logs (should show "✓ Ready in Xms")
podman logs --tail 30 neurox-app

# Check Next.js version (must be 16.0.10+)
podman exec neurox-app node -e "console.log(require('/app/node_modules/next/package.json').version)"

# Check auto-restart enabled
podman inspect neurox-app | grep -A 2 RestartPolicy

# Exit neurox user
exit

# Check Caddy (HTTP only)
systemctl status caddy

# Test from server
curl -I http://localhost

# Test domain (HTTPS via Cloudflare)
curl -I https://neurox.ae
```

### Expected Output:

**Container logs:**
```
✓ Starting...
✓ Ready in 135ms
```

**Next.js version:**
```
16.0.10
```

**Website:**
```
HTTP/2 200
```

## 🐛 Troubleshooting

### Container not running

```bash
ssh root@185.232.84.146
su - neurox -s /bin/bash

# Check status
podman ps -a

# If Exited, check logs
podman logs neurox-app

# Restart
podman start neurox-app

# If still failing, redeploy
podman stop neurox-app
podman rm neurox-app
podman run -d --name neurox-app --restart=always -p 3000:3000 localhost/neurox-secure:latest
```

### GitHub Actions Failed

**Check logs:**
- Go to: https://github.com/anaknegeri/neurox/actions
- Click failed workflow
- Check which step failed

**Common issues:**

1. **Build failed** → Check Dockerfile or Next.js build errors
2. **SSH failed** → Verify secrets: SERVER_HOST, SSH_PRIVATE_KEY
3. **Deploy failed** → Check server logs

**Re-run deployment:**
- GitHub Actions → Failed workflow → Re-run all jobs

### Website Error 502

```bash
# 1. Check container
ssh root@185.232.84.146
su - neurox -s /bin/bash -c 'podman ps -a'

# 2. If Exited, restart
su - neurox -s /bin/bash -c 'podman start neurox-app'

# 3. Check logs for errors
su - neurox -s /bin/bash -c 'podman logs --tail 50 neurox-app'

# 4. If error "Failed to find Server Action", redeploy clean image
su - neurox -s /bin/bash -c 'podman stop neurox-app && podman rm neurox-app && podman run -d --name neurox-app --restart=always -p 3000:3000 localhost/neurox-secure:latest'
```

### Caddy Error

```bash
# Check status
systemctl status caddy

# Check logs
journalctl -u caddy -n 100 --no-pager

# Restart
systemctl restart caddy

# Validate config
caddy validate --config /etc/caddy/Caddyfile
```

### Domain Not Accessible

```bash
# 1. Check DNS
dig neurox.ae +short
# Should return Cloudflare IPs (not your server IP)

# 2. Verify Cloudflare proxy ON (orange cloud)
# Go to Cloudflare dashboard

# 3. Check if server port 80 accessible
curl -I http://185.232.84.146

# 4. Check Caddy
systemctl status caddy

# 5. Check container
su - neurox -s /bin/bash -c 'podman ps'
```

### Can't Pull Image

```bash
# Option 1: Make image public (easier)
# GitHub → Packages → neurox → Settings → Change visibility → Public

# Option 2: Keep private (more secure)
# Workflow already handles this - passes GITHUB_TOKEN automatically

# Manual login (if needed)
echo "YOUR_GITHUB_TOKEN" | podman login ghcr.io -u YOUR_USERNAME --password-stdin
```

### Container Keeps Stopping

```bash
# Check restart policy
su - neurox -s /bin/bash -c 'podman inspect neurox-app | grep -A 2 RestartPolicy'

# Should show: "MaximumRetryCount": 0, "Name": "always"

# If not, recreate with restart=always
su - neurox -s /bin/bash -c 'podman stop neurox-app && podman rm neurox-app && podman run -d --name neurox-app --restart=always -p 3000:3000 ghcr.io/anaknegeri/neurox:latest'
```

**See [SECURITY.md](SECURITY.md) for complete security troubleshooting guide.**

## 📊 Architecture

```
Internet (HTTPS)
    ↓
Cloudflare (SSL/TLS + Proxy + DDoS)
    ↓
Server (HTTP only - port 80)
    ↓
Caddy (Reverse Proxy)
    ↓
Podman Network
    ↓
NeuroX Container (port 3000)
```

**Container Registry Flow:**
```
GitHub Actions
    ↓
Build Docker Image
    ↓
Push to ghcr.io/YOUR_USERNAME/neurox:latest
    ↓
Server pulls from ghcr.io (using GITHUB_TOKEN from workflow)
    ↓
Deploy Container
```

**Note**:
- Cloudflare handles HTTPS/SSL (orange cloud)
- Server only needs port 80 open
- Caddy receives HTTP traffic from Cloudflare
- No SSL certificate management needed
- Uses GitHub Container Registry (ghcr.io) - free & integrated
- `GITHUB_TOKEN` automatically passed from workflow to server

## 🎯 GitHub Container Registry

### Why ghcr.io?

- ✅ **Free unlimited** for public repos
- ✅ **Integrated** with GitHub - no external accounts
- ✅ **Automatic** - uses `GITHUB_TOKEN` (no extra setup)
- ✅ **Fast** - within GitHub ecosystem
- ✅ **Secure** - proper permissions

### Image Visibility

**Private (Default)**
- Image automatically private after first push
- Workflow passes `GITHUB_TOKEN` to server for pull
- No additional setup needed!

**Public (Optional)**
- Make public: GitHub → Packages → neurox → Settings → Change visibility → Public
- Anyone can pull without authentication

Either way works - workflow is configured for both! 🚀

See [deployment/README.md](deployment/README.md) for details.
