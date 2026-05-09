# 🔧 Troubleshooting Guide - Ani.AMC

## Common Errors & Solutions

### ❌ Error: "Backend server not running"

**Symptoms:**
- Network errors in console
- Error messages saying "Backend server not running"
- No stock/IPO/news data loading

**Solution:**
```bash
# Start the backend server
pnpm server:watch

# Or start everything together
pnpm dev:full
```

**Why this happens:**
The frontend tries to fetch data from `http://localhost:3001/api`, but the backend Express server isn't running.

---

### ❌ Error: "Port 3001 already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
```bash
# Find what's using port 3001
lsof -i :3001

# Kill the process (replace <PID> with actual process ID)
kill -9 <PID>

# Then restart
pnpm server:watch
```

**Alternative ports:**
Edit `.env` to use a different port:
```env
PORT=3002
```

Then update `.env.local`:
```env
VITE_API_URL=http://localhost:3002/api
```

---

### ⚠️ Warning: "Encountered two children with the same key"

**Symptoms:**
React warning about duplicate keys in charts

**Solution:**
This is fixed in the latest version. If you still see it:

1. Make sure your data has unique identifiers
2. Charts should use unique keys based on data IDs
3. Update to latest code

**Example fix:**
```tsx
// Before
data.map((item, index) => <Component key={index} />)

// After
data.map((item) => <Component key={item.id} />)
```

---

### 🌐 Error: "CORS policy blocked"

**Symptoms:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Make sure backend is running
2. Check `.env` has correct frontend URL:
```env
FRONTEND_URL=http://localhost:5173
```

3. Restart backend after changing `.env`

---

### 📦 Error: "Module not found"

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install
```

---

### 🔴 Error: "NSE API not working"

**Symptoms:**
- Empty stock data
- Timeout errors
- "Failed to fetch stocks"

**Solution:**
1. **Check internet connection** - NSE API requires internet
2. **Wait and retry** - NSE might be rate limiting
3. **Use fallback data** - App automatically uses mock data

**NSE Trading Hours:**
- Market is open: 9:15 AM - 3:30 PM IST (Mon-Fri)
- Data availability: 24/7, but most active during market hours

---

### 📰 Error: "News not loading"

**Symptoms:**
- Empty news feed
- Timeout errors

**Solution:**
1. Check internet connection
2. MoneyControl might be blocking scraping
3. App uses fallback news automatically

**Note:** Web scraping can be unreliable. The app has built-in fallback data.

---

### 💾 Error: "Database error" or "Cannot connect to database"

**Symptoms:**
Database connection errors

**Solution:**
This app **doesn't use a database** (yet). All data comes from:
- NSE India API (stocks)
- Web scraping (IPOs, news)

To add a database:
1. Install PostgreSQL/MongoDB
2. Add database connection code
3. See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for guides

---

### 🎨 Error: Styling broken or "Class not found"

**Symptoms:**
- No styling applied
- Tailwind classes not working

**Solution:**
```bash
# Tailwind v4 should auto-compile
# If issues persist, restart Vite
# Press 'r' in terminal or restart dev server
```

---

### 🔄 Error: "Hot reload not working"

**Symptoms:**
- Changes not appearing
- Need to manually refresh browser

**Solution:**
```bash
# Stop all servers
# Ctrl+C in all terminals

# Clear cache
rm -rf node_modules/.vite
rm -rf dist

# Restart
pnpm dev:full
```

---

### 🚀 Production Build Errors

**Symptoms:**
```
Error during build:
RollupError: ...
```

**Solution:**
```bash
# Make sure all dependencies are installed
pnpm install

# Build with verbose output
pnpm build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## Performance Issues

### Slow API Responses

**Issue:** Stock data taking too long to load

**Solution:**
1. NSE API can be slow during market hours
2. Implement caching in backend
3. Add Redis for faster responses

**Quick fix:**
```typescript
// In nseService.ts, add caching
let cachedData = null;
let cacheTime = 0;

export async function getNifty50Stocks() {
  if (Date.now() - cacheTime < 60000 && cachedData) {
    return cachedData;
  }
  // Fetch fresh data...
  cachedData = data;
  cacheTime = Date.now();
  return data;
}
```

### Memory Leaks

**Issue:** App gets slower over time

**Solution:**
- Clear browser cache
- Restart dev server
- Check for unclosed connections in hooks

---

## Development Environment

### VS Code / IDE Issues

**Issue:** TypeScript errors in IDE

**Solution:**
1. Restart TypeScript server: `Cmd/Ctrl + Shift + P` → "Restart TS Server"
2. Install recommended extensions
3. Check `tsconfig.json` is correct

### ESLint/Prettier Conflicts

**Issue:** Format on save causes issues

**Solution:**
```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

---

## Browser Issues

### Tested Browsers
✅ Chrome 120+  
✅ Firefox 120+  
✅ Safari 17+  
✅ Edge 120+  

### Not Supported
❌ Internet Explorer  
❌ Very old browsers  

### Browser Console Warnings

**Issue:** Warnings about Recharts or Motion

**Solution:**
These are usually safe to ignore. They're from third-party libraries and don't affect functionality.

---

## Quick Diagnostic Commands

```bash
# Check if backend is running
curl http://localhost:3001/api/health

# Check if ports are free
lsof -i :3001  # Backend
lsof -i :5173  # Frontend

# Check Node version (should be 18+)
node --version

# Check pnpm version
pnpm --version

# View backend logs
pnpm server:watch  # Watch logs in terminal

# Test API directly
curl http://localhost:3001/api/stocks | jq
```

---

## Getting Help

### Before Asking for Help

1. ✅ Check this troubleshooting guide
2. ✅ Read error messages carefully
3. ✅ Check console for errors (F12)
4. ✅ Try restarting servers
5. ✅ Try `rm -rf node_modules && pnpm install`

### Where to Get Help

1. **Check Documentation:**
   - [README.md](./README.md) - Overview
   - [QUICK_START.md](./QUICK_START.md) - Getting started
   - [BACKEND_SETUP.md](./BACKEND_SETUP.md) - Backend details
   - [API_GUIDE.md](./API_GUIDE.md) - API documentation

2. **Common Issues:**
   - Backend not running → `pnpm dev:full`
   - Port conflicts → Kill process using the port
   - Module errors → `pnpm install`

3. **Still stuck?**
   - Check browser console (F12)
   - Check terminal for error logs
   - Try running backend and frontend separately

---

## System Requirements

### Minimum
- Node.js 18+
- 4GB RAM
- Modern browser
- Internet connection (for API data)

### Recommended
- Node.js 20+
- 8GB RAM
- SSD storage
- Fast internet

---

## Clean Installation

If all else fails, start fresh:

```bash
# Backup your changes
git stash  # If using git

# Clean everything
rm -rf node_modules
rm -rf dist
rm -rf .vite

# Fresh install
pnpm install

# Start fresh
pnpm dev:full
```

---

## Environment Variables Checklist

### Backend (.env)
```env
✓ PORT=3001
✓ NODE_ENV=development
✓ FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```env
✓ VITE_API_URL=http://localhost:3001/api
```

---

## Still Having Issues?

### Debug Mode

1. **Enable verbose logging:**
```typescript
// In src/services/api.ts
api.interceptors.request.use((config) => {
  console.log('API Request:', config.url);
  return config;
});
```

2. **Check network tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Try action again
   - See which request failed

3. **Backend logs:**
```bash
# Run backend with more logging
NODE_ENV=development pnpm server:watch
```

---

**Remember:** Most issues are solved by:
1. Making sure backend is running (`pnpm dev:full`)
2. Clearing cache and reinstalling (`rm -rf node_modules && pnpm install`)
3. Checking browser console for actual error messages

Happy debugging! 🐛🔍
