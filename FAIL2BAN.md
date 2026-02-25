# 🛡️ Fail2ban Configuration & Management

> Lindungi server dari SSH brute force attacks

## 📋 Daftar Isi

1. [Apa itu Fail2ban?](#apa-itu-fail2ban)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Daily Usage](#daily-usage)
5. [Monitoring & Logs](#monitoring--logs)
6. [Troubleshooting](#troubleshooting)
7. [Advanced Configuration](#advanced-configuration)

---

## Apa itu Fail2ban?

**Fail2ban** adalah security tool yang:
- ✅ **Deteksi** - Monitor log files untuk detect failed login attempts
- ✅ **Block** - Auto-ban IP address yang mencoba brute force
- ✅ **Temporary** - Ban bersifat sementara (default 1 hour)
- ✅ **Unban** - Auto-unban setelah ban time habis

### Kenapa Penting?

Tanpa Fail2ban, server Anda akan terus diserang:

```bash
# Failed login attempts TANPA Fail2ban
root     ssh:notty    45.135.232.92    Thu Dec 18 23:59 - 23:59  (00:00)
root     ssh:notty    45.135.232.92    Thu Dec 18 23:59 - 23:59  (00:00)
root     ssh:notty    45.135.232.92    Thu Dec 18 23:59 - 23:59  (00:00)
root     ssh:notty    45.135.232.92    Thu Dec 18 23:59 - 23:59  (00:00)
admin    ssh:notty    45.135.232.92    Thu Dec 18 23:59 - 23:59  (00:00)
admin    ssh:notty    45.135.232.92    Thu Dec 18 23:59 - 23:59  (00:00)
# ... ratusan attempts dari IP yang sama!
```

Dengan Fail2ban:
```bash
# Setelah 3 failed attempts
✅ IP 45.135.232.92 BANNED for 1 hour!
# Attacker tidak bisa login lagi
```

---

## Installation

### Server Neurox (185.232.84.146)

✅ **Already Installed!**

### Server Sakreta (163.61.44.109)

✅ **Already Installed!**

### Install di Server Baru

```bash
# SSH to server
ssh root@YOUR_SERVER_IP

# Install Fail2ban
dnf install -y epel-release
dnf install -y fail2ban

# Enable & start service
systemctl enable fail2ban
systemctl start fail2ban

# Verify
systemctl status fail2ban
```

---

## Configuration

### Basic Configuration (Already Applied)

**File:** `/etc/fail2ban/jail.local`

```bash
[DEFAULT]
# Ban duration (seconds)
bantime = 3600        # 1 hour

# Time window to count failed attempts
findtime = 600        # 10 minutes

# Max failed attempts before ban
maxretry = 3          # 3 attempts

[sshd]
# Enable SSH jail
enabled = true
port = 22
logpath = /var/log/secure
```

**Artinya:**
- Jika ada **3 failed login** dalam **10 menit** → **Ban 1 jam**

### Verify Configuration

```bash
# Check config file
cat /etc/fail2ban/jail.local

# Test configuration
fail2ban-client -t

# Reload after changes
systemctl reload fail2ban
```

---

## Daily Usage

### Check Status

```bash
# Check service
systemctl status fail2ban

# Check all jails
fail2ban-client status

# Check sshd jail specifically
fail2ban-client status sshd
```

**Expected Output:**
```
Status for the jail: sshd
|- Filter
|  |- Currently failed: 2
|  |- Total failed:     156
|  `- File list:        /var/log/secure
`- Actions
   |- Currently banned: 5
   |- Total banned:     23
   `- Banned IP list:   45.135.232.92 80.94.92.164 91.202.233.33 ...
```

### Check Banned IPs

```bash
# List all banned IPs
fail2ban-client get sshd banip

# Or via iptables
iptables -L f2b-sshd -n --line-numbers
```

### Manual Ban/Unban

```bash
# Ban an IP manually
fail2ban-client set sshd banip 1.2.3.4

# Unban an IP
fail2ban-client set sshd unbanip 1.2.3.4

# Unban all IPs
fail2ban-client unban --all
```

### Check if Your IP is Banned (IMPORTANT!)

```bash
# Before doing anything, check if YOUR IP is banned
fail2ban-client status sshd | grep "YOUR_IP"

# If your IP is banned, unban it IMMEDIATELY
fail2ban-client set sshd unbanip YOUR_IP

# Verify
ssh root@SERVER_IP
```

**⚠️ WARNING:** Jangan sampai ban IP sendiri!

---

## Monitoring & Logs

### View Fail2ban Logs

```bash
# Tail logs (real-time)
tail -f /var/log/fail2ban.log

# Last 50 lines
tail -50 /var/log/fail2ban.log

# Search for specific IP
grep "1.2.3.4" /var/log/fail2ban.log

# Search for ban actions
grep "Ban " /var/log/fail2ban.log
```

### View Failed Login Attempts

```bash
# Last 20 failed logins
lastb | head -20

# Count failed attempts per IP
lastb | awk '{print $3}' | sort | uniq -c | sort -rn | head -10

# Failed attempts in last hour
lastb -s -1hour

# Failed attempts today
lastb -s today
```

### Check SSH Logs

```bash
# Failed SSH attempts
grep "Failed password" /var/log/secure | tail -20

# Invalid users trying to login
grep "Invalid user" /var/log/secure | tail -20

# Successful logins (your logins)
grep "Accepted" /var/log/secure | tail -20
```

---

## Troubleshooting

### Fail2ban Not Starting

```bash
# Check status
systemctl status fail2ban

# Check logs
journalctl -u fail2ban -n 50 --no-pager

# Test configuration
fail2ban-client -t

# Common issue: syntax error in config
fail2ban-client -d
```

### Fail2ban Not Banning

**Check 1: Is jail enabled?**
```bash
fail2ban-client status
# Should show: sshd
```

**Check 2: Are there failed attempts?**
```bash
grep "Failed password" /var/log/secure | tail -20
```

**Check 3: Is log path correct?**
```bash
# Check jail config
fail2ban-client get sshd logpath
# Should be: /var/log/secure

# Verify log exists
ls -lh /var/log/secure
```

**Check 4: Restart service**
```bash
systemctl restart fail2ban
sleep 5
fail2ban-client status sshd
```

### Accidentally Banned Your Own IP

**URGENT! Unban yourself:**

```bash
# Option 1: Via another server/VPS
ssh OTHER_SERVER
ssh -J OTHER_SERVER root@YOUR_SERVER

# Unban your IP
fail2ban-client set sshd unbanip YOUR_IP

# Option 2: Via hosting provider console
# Login to OnIdel/hosting control panel
# Use web console/VNC
fail2ban-client set sshd unbanip YOUR_IP

# Option 3: Whitelist your IP permanently (see below)
```

### Whitelist Your IP Permanently

**Edit:** `/etc/fail2ban/jail.local`

```bash
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

# Whitelist IPs (NEVER ban these)
ignoreip = 127.0.0.1/8 ::1
           YOUR_HOME_IP
           YOUR_OFFICE_IP

[sshd]
enabled = true
port = 22
logpath = /var/log/secure
```

**Example:**
```bash
ignoreip = 127.0.0.1/8 ::1
           45.251.5.232
           103.171.31.148
```

**Apply changes:**
```bash
systemctl reload fail2ban
```

### Check Firewall Rules

Fail2ban uses iptables/firewalld:

```bash
# Check iptables
iptables -L f2b-sshd -n --line-numbers

# Check firewalld (if used)
firewall-cmd --list-all

# Flush fail2ban rules (emergency)
iptables -F f2b-sshd
```

---

## Advanced Configuration

### Change Ban Duration

**Edit:** `/etc/fail2ban/jail.local`

```bash
[DEFAULT]
# Ban for 24 hours instead of 1 hour
bantime = 86400

# Ban forever (not recommended!)
bantime = -1

# Progressive ban (ban longer for repeat offenders)
bantime.increment = true
bantime.factor = 2
bantime.maxtime = 604800  # max 1 week
```

**Apply:**
```bash
systemctl reload fail2ban
```

### Multiple Ports SSH

If SSH runs on multiple ports:

```bash
[sshd]
enabled = true
port = 22,2222,2200
logpath = /var/log/secure
```

### Email Notifications

Get email when IP is banned:

**Edit:** `/etc/fail2ban/jail.local`

```bash
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

# Email settings
destemail = admin@neurox.ae
sender = fail2ban@neurox.ae
sendername = Fail2ban
action = %(action_mwl)s

[sshd]
enabled = true
port = 22
logpath = /var/log/secure
```

**Requires:** Mail server configured

### Protect Other Services

**Nginx (if you use it):**

```bash
[nginx-http-auth]
enabled = true
port = http,https
logpath = /var/log/nginx/error.log

[nginx-noscript]
enabled = true
port = http,https
logpath = /var/log/nginx/access.log
```

**Caddy (already using):**

Caddy has built-in DDoS protection, but you can add:

```bash
[caddy-auth]
enabled = false  # Not needed with Cloudflare
```

---

## Statistics & Reports

### Daily Stats

```bash
# Banned IPs today
fail2ban-client status sshd | grep "Total banned"

# Currently banned
fail2ban-client status sshd | grep "Currently banned"

# Failed attempts today
lastb -s today | wc -l
```

### Top Attackers (Last 7 Days)

```bash
# Top 10 attacking IPs
lastb -s -7days | awk '{print $3}' | sort | uniq -c | sort -rn | head -10
```

**Example output:**
```
    145 45.135.232.92
     89 80.94.92.164
     67 91.202.233.33
     45 185.220.101.42
     32 198.143.32.123
```

### Monthly Report

```bash
# Failed attempts this month
lastb -s -30days | wc -l

# Unique IPs attacking
lastb -s -30days | awk '{print $3}' | sort -u | wc -l

# Ban statistics
grep "Ban " /var/log/fail2ban.log | grep "$(date +%Y-%m)" | wc -l
```

---

## Security Best Practices

### ✅ DO:

1. **Whitelist your IPs**
   ```bash
   ignoreip = YOUR_HOME_IP YOUR_OFFICE_IP
   ```

2. **Monitor regularly**
   ```bash
   # Weekly check
   fail2ban-client status sshd
   ```

3. **Keep logs**
   ```bash
   # Backup fail2ban logs monthly
   cp /var/log/fail2ban.log /backup/fail2ban-$(date +%Y%m).log
   ```

4. **Test before deploy**
   ```bash
   fail2ban-client -t
   ```

### ❌ DON'T:

1. **Don't ban forever** - Use temporary bans
2. **Don't set maxretry too low** - You might ban yourself
3. **Don't forget to whitelist** - Add your IPs to ignoreip
4. **Don't disable fail2ban** - Security essential!

---

## Quick Reference Commands

```bash
# Status
systemctl status fail2ban
fail2ban-client status sshd

# View banned IPs
fail2ban-client get sshd banip

# Ban/Unban
fail2ban-client set sshd banip 1.2.3.4
fail2ban-client set sshd unbanip 1.2.3.4

# Logs
tail -f /var/log/fail2ban.log
lastb | head -20

# Reload config
systemctl reload fail2ban

# Test config
fail2ban-client -t
```

---

## Integration dengan SECURITY.md

**Untuk daily checks, lihat:**
- [SECURITY.md](SECURITY.md) - Complete security guide
- [SECURITY-CHEATSHEET.md](SECURITY-CHEATSHEET.md) - Daily/weekly checks

**Fail2ban check sudah termasuk dalam:**
- Security Checklist Harian (Check failed logins)
- Security Checklist Mingguan (Review banned IPs)

---

## 📞 Need Help?

### If you're locked out:

1. **Via hosting provider console** (OnIdel)
2. **Via another server** (SSH jump)
3. **Contact hosting support**

### Common Questions:

**Q: Berapa lama IP di-ban?**
A: Default 1 hour (3600 seconds)

**Q: Apakah ban permanent?**
A: Tidak, ban bersifat temporary

**Q: Bagaimana unban IP?**
A: `fail2ban-client set sshd unbanip IP_ADDRESS`

**Q: Apakah fail2ban mempengaruhi performance?**
A: Tidak, impact minimal (< 0.1% CPU)

**Q: Apakah fail2ban protect dari DDoS?**
A: Tidak, fail2ban hanya protect SSH. Untuk DDoS, gunakan Cloudflare.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-19 | Initial Fail2ban documentation |

---

**Remember:** Fail2ban adalah first line of defense untuk SSH. Jangan disable!

Stay protected! 🛡️🔒