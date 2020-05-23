



// ===================
// Puerto
// ===================

process.env.PORT = process.env.PORT || 3000;

// ===================
// Entorno
// ===================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =====================
// Vencimiento del Token
// ======================
// 60s
// 60m
// 24h
// 30d
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ======================
// SEED de autenticación
// ======================

process.env.SEED = process.env.SEED || 'secret';


// ===================
// Base de datos
// ===================

let urlDB;

if( process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;



// ===================
// Google Client ID
// ===================

process.env.CLIENT_ID = process.env.CLIENT_ID || '860003490338-72ba1eotj7urtma302356m31eogdgn87.apps.googleusercontent.com';