# NANDI TRANSPORTERS - Remote Access Setup

## Option 1: Port Forwarding (Recommended - No Extra Software)

### Steps:
1. **Find your public IP address**: Visit https://whatismyipaddress.com/
2. **Access your router settings**:
   - Common router IPs: 192.168.1.1, 192.168.0.1, 10.0.0.1
   - Username/Password: Often admin/admin or admin/password
3. **Set up port forwarding**:
   - Forward external port 3000 to your computer's local IP (shown in start.bat)
   - Protocol: TCP
4. **Access from anywhere**: http://YOUR_PUBLIC_IP:3000

### Security Note:
- This exposes your app to the internet
- Consider adding authentication if using in production

## Option 2: Free Hosting (Cloud Deployment)

Deploy to a free platform like:
- **Railway**: https://railway.app/
- **Render**: https://render.com/
- **Heroku**: https://heroku.com/

## Option 3: VPN

Use a VPN service to connect your devices to your home network.

## Current Status
- App runs on: http://localhost:3000
- LAN access: http://192.168.x.x:3000 (same WiFi)
- Remote access: Requires port forwarding or tunneling