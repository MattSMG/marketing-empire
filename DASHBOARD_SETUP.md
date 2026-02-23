# Marketingowe Imperium - Dashboard Setup

## 🚀 Deploy Backend (Railway)

### 1. Przygotuj pliki na Railway:
```
server.js
package.json
```

### 2. Deploy na Railway:
- Połącz repo GitHub z Railway
- Railway auto-wykryje Node.js
- Deployment automatyczny

### 3. Po deploy - skopiuj Railway URL:
```
https://twoja-app.up.railway.app
```

### 4. Zmień API_URL w plikach frontend:

**W `dashboard.html`** (linia ~646):
```javascript
const API_URL = 'https://twoja-app.up.railway.app';
```

**W `index.html`** (linia ~1269):
```javascript
const API_URL = 'https://twoja-app.up.railway.app';
```

---

## 📦 Nowe zależności backend:

**package.json** - dodano `multer`:
```json
"dependencies": {
  "express": "^4.18.2",
  "cors": "^2.8.5",
  "jsonwebtoken": "^9.0.2",
  "multer": "^1.4.5-lts.1"
}
```

---

## 👥 Users

### Demo User (zwykły użytkownik):
- Email: `demo@imperium.pl`
- Hasło: `demo123`
- Dostęp: Grid ebooków + pobieranie

### Admin (pełne uprawnienia):
- Email: `admin@imperium.pl`
- Hasło: `admin123`
- Dostęp: Upload, ukrywanie, usuwanie ebooków

---

## 🎯 Funkcje Dashboard

### Dla wszystkich użytkowników:
- ✅ Przeglądanie ebooków (grid z coverami)
- ✅ Pobieranie PDF
- ✅ Statystyki (licznik produktów)

### Dla admina (dodatkowo):
- ✅ Upload nowych ebooków (PDF + cover PNG/JPG)
- ✅ Ukrywanie/pokazywanie ebooków
- ✅ Usuwanie ebooków
- ✅ Placeholder "Dodaj eBook" w gridzie

---

## 🔗 Endpoints API

### Auth:
- `POST /api/login` - logowanie
- `POST /api/register` - rejestracja
- `GET /api/verify` - weryfikacja tokenu

### Ebooki:
- `GET /api/ebooks` - lista (ukryte widoczne tylko dla admina)
- `POST /api/ebooks/upload` - upload (admin only)
- `DELETE /api/ebooks/:id` - usuń (admin only)
- `PATCH /api/ebooks/:id/hide` - ukryj/pokaż (admin only)
- `GET /api/ebooks/:id/download` - pobierz PDF

---

## 📁 Struktura plików na Railway:

```
/uploads/ebooks/
  1234567890-abc123.pdf      ← PDF
  1234567890-xyz789.png      ← Cover
  9876543210-def456.pdf
  9876543210-uvw111.jpg
```

Pliki dostępne pod:
```
https://twoja-app.up.railway.app/uploads/ebooks/filename.pdf
https://twoja-app.up.railway.app/uploads/ebooks/filename.png
```

---

## 🎨 Stylistyka

Dashboard utrzymuje ciemny motyw jak scroll-demo:
- Dark background: `#06060f`
- Card background: `#0d0d1a`
- Gradient: Pink `#e8287a` → Purple `#8b2fc9`
- Font: DM Sans (body), Bebas Neue (headings)

---

## 🔄 Flow użytkownika

1. **Landing** (`index.html`) → Login/Register
2. **Auth success** → Redirect do `dashboard.html`
3. **Dashboard** → Grid ebooków
4. **Admin** → Widzi placeholder "Dodaj eBook"
5. **Upload modal** → Tytuł + PDF + Cover
6. **Grid refresh** → Nowy ebook widoczny

---

## ⚠️ Uwagi produkcyjne

### Bezpieczeństwo (TODO):
- [ ] Hashuj hasła (bcrypt)
- [ ] Rate limiting na upload
- [ ] Validacja rozmiaru plików (obecnie 50MB limit)
- [ ] Sanitizacja nazw plików

### Storage (TODO):
- [ ] Przejście z Railway filesystem na S3/Cloudflare R2
- [ ] Backup systemu plików
- [ ] CDN dla coverów

### Database (TODO):
- [ ] Migracja z in-memory do PostgreSQL
- [ ] Relacje user → ebooks (kto ma dostęp)
- [ ] Historia downloadów

---

## 🧪 Testowanie local

1. Backend:
```bash
cd backend
npm install
node server.js
# Server: http://localhost:3000
```

2. Frontend (dowolny static server):
```bash
# Python
python -m http.server 8080

# Node http-server
npx http-server -p 8080
```

3. Zmień API_URL w dashboard.html i index.html na:
```javascript
const API_URL = 'http://localhost:3000';
```

---

## 📝 Next Steps

1. Deploy backend na Railway
2. Zaktualizuj API_URL w frontend files
3. Deploy frontend na GitHub Pages
4. Zaloguj się jako admin@imperium.pl
5. Upload pierwszy ebook (PDF + cover)
6. Test jako demo@imperium.pl

---

**Pytania?** Sprawdź logi Railway lub console w przeglądarce (F12).
