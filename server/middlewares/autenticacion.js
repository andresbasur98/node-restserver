
const jwt = require('jsonwebtoken');


//============================
// Verificar Token
//============================

// next continua la ejecución 
let verificaToken = (req, res, next) => {

    // Podemos obtener los headers ( en el que estamos enviando el token)
    let token = req.get('token');

    // Entendemos decoded como la información decodificada (payload)
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({  //401 status no autorizado
                ok: false,
                err: {
                    message: 'token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next(); //Hay que ejecutarlo al final
    });

};


//============================
// Verificar AdminRole
//============================

let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role == 'ADMIN_ROLE') {
        next();
        return;
    }

    if (usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Necesita ser administrador'
            }
        });
    }

}
    //============================
    // Verificar token para imagen

   //============================
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token; // Obtener token por el url

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({  //401 status no autorizado
                ok: false,
                err: {
                    message: 'token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next(); //Hay que ejecutarlo al final
    });
}




module.exports = {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenImg
}