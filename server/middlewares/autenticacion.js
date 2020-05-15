
const jwt = require('jsonwebtoken');


//============================
// Verificar Token
//============================

 
let verificaToken = (req, res, next) =>{

    // Podemos obtener los headers
    let token = req.get('token');

    jwt.verify( token, process.env.SEED, (err, decoded) =>{
        if( err ){
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });

};


//============================
// Verificar AdminRole
//============================

let verificaAdmin_Role = (req, res, next)=>{
    
    let usuario = req.usuario;

    if( usuario.role == 'ADMIN_ROLE'){
        next();
        return;
    }

    if(usuario.role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Necesita ser administrador'
            }
        });
    }

}


module.exports = {
    verificaToken,
    verificaAdmin_Role
}