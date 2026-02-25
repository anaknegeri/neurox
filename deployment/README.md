# NeuroX Deployment

Simple deployment menggunakan Podman dan Caddy dengan Cloudflare Proxy.

## 📋 Prerequisites

### Server
- OS: Rocky Linux / AlmaLinux / RHEL / CentOS
- RAM: Min 2GB
- Port: 22 (SSH), 80 (HTTP)

### DNS (Cloudflare)
- Domain registered di Cloudflare
- Proxy mode: **Proxied** (orange cloud)
- Cloudflare handles SSL/TLS

### GitHub
- Repository di GitHub
- Access ke Settings → Secrets

## 🚀 Setup

### 1. Configure Server

Edit `inventory.ini`:

```ini
[neurox]
neurox_server ansible_host=YOUR_SERVER_IP ansible_user=root ansible_ssh_private_key_file=~/.ssh/id_rsa

[neurox:vars]
app_domain=neurox.ae
app_port=3000
```

### 2. Setup DNS (Cloudflare)

```
Type: A
Name: @ (neurox.ae)
Content: YOUR_SERVER_IP
Proxy: Proxied (orange cloud) ← Cloudflare handles SSL
```

### 3. Setup GitHub Secrets

Settings → Secrets → Actions:

- `SERVER_HOST` - Server IP address
- `SERVER_USER` - SSH user (root)
- `SSH_PRIVATE_KEY` - SSH private key content
- `SERVER_PORT` - SSH port (optional, default 22)

**No Docker or GitHub tokens needed!** Uses `GITHUB_TOKEN` automatically.

### 4. Install Infrastructure

```bash
cd deployment

# Install Podman
ansible-playbook -i inventory.ini podman.yml

# Install Caddy (HTTP only)
ansible-playbook -i inventory.ini caddy.yml
```

## 📦 Deployment

### Automatic (GitHub Actions)

```bash
git push origin main
```

Workflow will:
1. Build Docker image
2. Push to `ghcr.io/YOUR_USERNAME/neurox:latest`
3. Deploy to server

### Manual (Optional)

```bash
ssh root@YOUR_SERVER_IP << 'EOF'
  # Login to GHCR
  echo "YOUR_TOKEN" | podman login ghcr.io -u YOUR_USERNAME --password-stdin
  
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
ssh root@YOUR_SERVER_IP

# Check container
podman ps
podman logs neurox-app

# Check Caddy
systemctl status caddy

# Test locally
curl http://localhost:3000

# Test domain (HTTPS via Cloudflare)
curl https://neurox.ae
```

## 🐛 Troubleshooting

### Container not running

```bash
podman ps -a
podman logs neurox-app
podman restart neurox-app
```

### Caddy not running

```bash
systemctl status caddy
journalctl -u caddy -n 100
systemctl restart caddy
```

### Domain not accessible

```bash
# Check DNS
dig neurox.ae

# Check firewall (only port 80 needed)
firewall-cmd --list-all
firewall-cmd --add-service=http --permanent
firewall-cmd --reload

# Verify Cloudflare proxy is ON (orange cloud)
```

### Can't pull image

```bash
# Image is private by default
# Workflow automatically passes GITHUB_TOKEN to server
# Or make image public: GitHub → Packages → neurox → Settings → Change visibility → Public
```

## 📊 Architecture

```
Internet (HTTPS)
    ↓
Cloudflare (SSL/TLS + DDoS + CDN)
    ↓
Server (HTTP only - port 80)
    ↓
Caddy (Reverse Proxy)
    ↓
Podman Network
    ↓
NeuroX Container (port 3000)
```

## 🎯 Key Features

- ✅ **Cloudflare SSL** - No certificate management
- ✅ **GitHub Registry** - Free, unlimited, integrated
- ✅ **Auto Deploy** - Push to main = deploy
- ✅ **No extra tokens** - Uses `GITHUB_TOKEN` automatically
- ✅ **Simple & pragmatic** - Minimal configuration