# NeuroX

Next.js application with automated deployment using Podman, Caddy, and Cloudflare.

## 🚀 Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Deployment

### Setup (First Time)

1. **Configure server** - Edit `deployment/inventory.ini`:
```ini
[neurox]
neurox_server ansible_host=YOUR_SERVER_IP ansible_user=root

[neurox:vars]
app_domain=neurox.ae
app_port=3000
```

2. **Setup DNS** - Cloudflare **Proxied mode** (orange cloud):
```
Type: A
Name: @
Content: YOUR_SERVER_IP
Proxy: Proxied (orange cloud) ← Cloudflare handles SSL
```

3. **Setup GitHub Secrets**:
- `SERVER_HOST` - Server IP
- `SERVER_USER` - SSH user
- `SSH_PRIVATE_KEY` - SSH private key
- `SERVER_PORT` - SSH port (optional, default 22)

**Note**: No Docker or GitHub tokens needed! Uses GitHub Container Registry (ghcr.io) with automatic `GITHUB_TOKEN`

4. **Install infrastructure**:
```bash
cd deployment
ansible-playbook -i inventory.ini podman.yml
ansible-playbook -i inventory.ini caddy.yml
```

### Deploy

Push to `main` branch - GitHub Actions will auto deploy.

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

## 🏗️ Architecture

- **GitHub Container Registry (ghcr.io)**: Docker image storage (free, automatic)
- **Cloudflare**: SSL/TLS + DDoS protection + CDN
- **Caddy**: HTTP reverse proxy (no SSL needed)
- **Podman**: Container runtime
- **GitHub Actions**: CI/CD automation