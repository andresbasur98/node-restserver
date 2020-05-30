const express = require('express');

const { verificaToken } = require('../middlewares/autenticacion');


let app = express();
let Producto = require('../models/productos');


const bodyParser = require('body-parser');
//Para obtener la información del post

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



// Obtener todos los productos
app.get('/productos', verificaToken,(req, res) =>{
    // Trae todos los productos
    // Populate: usuario categoria
    // Paginado
    let desde = req.query.desde || 0; 
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({disponible: true})
    .skip(desde)
    .limit(limite)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')    
    .exec((err, productos) => {
    if (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }

    res.json({
        ok: true,
        productos
    });
});
});

// Obtener un producto por ID
app.get('/productos/:id',verificaToken, (req, res) =>{
    
    let id = req.params.id;

    Producto.findById(id)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'nombre')
         .exec ((err, productoDB) =>{
             if(err){
                 return res.status(500).json({
                     ok: false,
                     err
                 })
             }

             if(!productoDB){
                return res.status(400).json({
                    ok: false,
                    err:{
                        message: 'Id no válido'
                    }
                })
            }

            res.json({
                ok:true,
                productoDB
            })
         })
})


//Buscar productos
app.get('/productos/buscar/:termino', verificaToken, ( req, res ) =>{

    let termino = req.params.termino;

    //Expresión regular para hacer una busqueda más eficiente para el usuario (la i omite si en mayúscula o minúscula)
    let regex = new RegExp(termino, 'i');

    Producto.find({nombre: regex})
            .populate('categoria', 'nombre')
            .exec((err, productos) => {
                if(err){
                    return res.status(500).json({
                        ok: false,
                        err
                    })
                }

                res.json({
                    ok: true,
                    productos
                })
            })
})



// Crear producto
app.post('/productos', verificaToken, (req, res) =>{
    // grabar el usuario 
    // grabar una categoria del listado

    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre:  body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        })

    })
})

// Actualizar producto
app.put('/productos/:id', verificaToken,(req, res) =>{
    // grabar el usuario 
    // grabar una categoria del listado
    
    let id = req.params.id;
    let body = req.body;

    Producto.findOneAndUpdate(id, body, { new: true, runValidators: true, context: 'query'},(err, productoDB) =>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;



        productoDB.save( (err, productoGuardado) =>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoGuardado
            })
        })


    })

})


// Borrar producto
app.delete('/productos/:id',verificaToken, (req, res) =>{
    // grabar el usuario 
    // grabar una categoria del listado

    let id = req.params.id;
    let cambiaEstado = {
        disponible: false
    };
    Producto.findByIdAndUpdate(id, cambiaEstado, (err,productoDB)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El ID no existe'
                }
            });
        }

        productoDB.save( (err, productoBorrado) =>{
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productoBorrado,
                message: 'Se borro correctamente'
            })
        })

    })

})

module.exports = app;