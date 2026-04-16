# Ecopay Algeria — Digital Wallet

Ecopay est un portefeuille numerique complet pour le marche algerien.

## Demo
- Telephone : +213555000001
- Mot de passe : password123

## Stack
- Node.js 20 + Express + PostgreSQL
- JWT Auth + bcrypt + AES-256
- Transferts P2P atomiques
- Paiement factures (Djezzy, Mobilis, Sonelgaz...)
- Recharge CIB / BaridiMob / Dahabia
- QR Code dynamique (expire 5min)
- Frontend HTML/CSS/JS design luxueux

## Installation
```
cd backend && npm install
cp .env.example .env
node config/migrate.js
node config/seed.js
npm run dev
```

Made in Algeria for 45M users
