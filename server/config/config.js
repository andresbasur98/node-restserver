



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
process.env.CADUCIDAD_TOKEN = '48h';

// ======================
// SEED de autenticación
// ======================

process.env.SEED = process.env.SEED || 'secret'; // SEED es una variable de entorno creada en heroku


// ===================
// Base de datos
// ===================

let urlDB;

if( process.env.NODE_ENV == 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = process.env.MONGO_URI; //MONGO_URI es una variable de entorno creada en heroku
}

process.env.URLDB = urlDB;



// ===================
// Google Client ID
// ===================

process.env.CLIENT_ID = process.env.CLIENT_ID || '860003490338-72ba1eotj7urtma302356m31eogdgn87.apps.googleusercontent.com';