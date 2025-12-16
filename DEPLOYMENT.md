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

## 🔧 Manual Deploy

```bash
ssh root@SERVER_IP << 'EOF'
  # Login to GitHub Container Registry
  echo "YOUR_GITHUB_TOKEN" | podman login ghcr.io -u YOUR_USERNAME --password-stdin
  
  # Pull and deploy
  podman pull ghcr.io/YOUR_USERNAME/neurox:latest
  podman stop neurox-app || true
  podman rm neurox-app || true
  podman run -d \
    --name neurox-app \
    --network neurox_network \
    -p 3000:3000 \
    -e NODE_ENV=production \
    --restart unless-stopped \
    ghcr.io/YOUR_USERNAME/neurox:latest
EOF
```

## ✅ Verify

```bash
ssh root@SERVER_IP

# Check container
podman ps
podman logs neurox-app

# Check Caddy (HTTP only)
systemctl status caddy

# Test domain (HTTPS via Cloudflare)
curl https://neurox.ae
```

## 🐛 Troubleshooting

**Container not running:**
```bash
podman logs neurox-app
podman restart neurox-app
```

**Caddy error:**
```bash
journalctl -u caddy -n 100
systemctl restart caddy
```

**Domain not accessible:**
```bash
# Check DNS
dig neurox.ae

# Verify Cloudflare proxy ON (orange cloud)
# Check firewall (only port 80 needed)
firewall-cmd --list-all
```

**Can't pull image:**
```bash
# Image is automatically pushed as private by default
# Make it public: GitHub → Packages → neurox → Settings → Change visibility → Public
# Or keep private (workflow already passes GITHUB_TOKEN to server)
```

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