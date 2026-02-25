# 🔒 Security Cheat Sheet - Quick Reference

> Print ini dan tempel di dinding! ⭐

## 🚀 Daily Check (2 menit)

```bash
# 1. SSH ke server
ssh root@185.232.84.146

# 2. Cek container running
su - neurox -c 'podman ps'
# ✅ Harus ada: neurox-app dengan status "Up"

# 3. Cek log (30 baris terakhir)
su - neurox -c 'podman logs --tail 30 neurox-app'
# ✅ Harus ada: "✓ Ready in Xms"
# ❌ BAHAYA jika ada: wget, bot, miner, error

# 4. Test website
curl -I https://neurox.ae
# ✅ Harus: HTTP/2 200
```

---

## 🚨 Emergency Commands

### Website Down?
```bash
# Restart container
su - neurox -c 'podman restart neurox-app'

# Cek status
su - neurox -c 'podman ps'
su - neurox -c 'podman logs --tail 20 neurox-app'
```

### Container Terinfeksi Malware?
```bash
# STOP & HAPUS container lama
su - neurox -c 'podman stop neurox-app'
su - neurox -c 'podman rm neurox-app'
su - neurox -c 'podman rmi ghcr.io/anaknegeri/neurox:latest'

# DEPLOY clean container
su - neurox -c 'podman run -d --name neurox-app -p 3000:3000 neurox-secure:latest'

# VERIFY
su - neurox -c 'podman logs --tail 20 neurox-app'
```

### Caddy Down?
```bash
# Restart Caddy
systemctl restart caddy

# Cek status
systemctl status caddy
curl -I http://localhost
```

---

## 🔍 Weekly Check (10 menit)

```bash
# 1. Cek versi Next.js (harus 16.0.10+)
su - neurox -c 'podman exec neurox-app node -e "console.log(require(\"/app/node_modules/next/package.json\").version)"'

# 2. Cek failed login (brute force)
lastb | head -20
# ✅ Normal: beberapa failed login
# ❌ BAHAYA: ratusan dari IP yang sama

# 3. Cek process mencurigakan
ps aux | grep -E 'bot|miner|xmr|crypto' | grep -v grep
# ✅ Harus: kosong (no output)

# 4. Cek file di /tmp
find /tmp -type f -name '*bot*' -o -name '*.sh'
# ✅ Harus: kosong

# 5. Cek disk space
df -h
# ✅ Harus: < 80% usage

# 6. Cek Fail2ban (SSH protection)
fail2ban-client status sshd
# ✅ Check: Currently banned, Total banned
```

---

## ⚠️ Tanda Bahaya

| Gejala | Level | Action |
|--------|-------|--------|
| Log ada "wget", "bot", "chmod 777" | 🔴 HIGH | Deploy clean container ASAP |
| CPU 100% terus | 🔴 HIGH | Cek process, kill jika perlu |
| Website down > 10 menit | 🔴 HIGH | Restart container |
| Ratusan failed SSH login | 🟡 MEDIUM | Check Fail2ban status |
| Disk 90%+ full | 🟡 MEDIUM | Clean logs, old images |
| Website lambat | 🟢 LOW | Cek resources, optimize |

---

## 📋 Monthly Tasks

```bash
# 1. Backup container
su - neurox -c 'podman save neurox-app > /tmp/backup-$(date +%Y%m%d).tar'
scp root@185.232.84.146:/tmp/backup-*.tar ./backups/

# 2. Update sistem
dnf check-update
dnf update -y

# 3. Review login history
last -50

# 4. Check Fail2ban status
fail2ban-client status sshd
```

---

## 🔐 Security Versions

| Software | Current | Minimum Safe |
|----------|---------|--------------|
| Next.js | 16.0.10 | 16.0.10+ |
| Node | 20-alpine | 20+ |
| Caddy | Latest | 2.7+ |
| AlmaLinux | 10 | 9+ |

---

## 📞 When to Call for Help

### 🚨 EMERGENCY (Call NOW)
- Website hacked/defaced
- Ransomware detected
- Data loss/encrypted
- Root access lost

### ⚠️ URGENT (Today)
- Malware in host (not container)
- Can't remove malicious cron
- Unknown user in system
- SSH keys changed

### 💡 NORMAL (This week)
- Performance issues
- Want security audit
- Setup monitoring
- General questions

---

## 🎯 Quick Troubleshooting

```
Problem: Website tidak bisa diakses
├─ 1. Ping server → Timeout?
│  └─ Yes: Server down, contact hosting
│  └─ No: Lanjut ke #2
│
├─ 2. Check Caddy → systemctl status caddy
│  └─ Down: systemctl restart caddy
│  └─ Up: Lanjut ke #3
│
├─ 3. Check Container → podman ps
│  └─ Not running: podman restart neurox-app
│  └─ Running: Lanjut ke #4
│
└─ 4. Check Logs → podman logs neurox-app
   └─ Error: Fix error atau deploy clean
   └─ No error: Check DNS/Cloudflare
```

---

## 🔗 Important Links

- **Docs:** `SECURITY.md` (full guide)
- **Fail2ban:** `FAIL2BAN.md` (SSH protection)
- **GitHub:** https://github.com/anaknegeri/neurox
- **Website:** https://neurox.ae
- **OnIdel:** https://onidel.com (hosting control panel)
- **Next.js Security:** https://nextjs.org/blog

---

## 💡 Remember

1. ✅ **Docker/Podman melindungi** dari malware di container
2. ✅ **Restart container** adalah solusi 90% masalah
3. ✅ **Backup rutin** adalah penyelamat hidup
4. ✅ **Update cepat** saat ada security patch
5. ❌ **Jangan panic** - ikuti checklist ini!

---

**Last Updated:** 2025-12-18
**Version:** 1.0.0

🛡️ Stay Safe! 🔒