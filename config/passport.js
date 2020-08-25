const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//referencia al modelo donde vamos a autentificar
const Usuarios = require('../models/Usuarios');

//local strategy -login con credenciales propios (usuario y password)
passport.use(
    new LocalStrategy(
        // por default passport espera un usuario y password
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async(email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: {
                        email,
                        activo: 1
                    }
                });
                //El usuario exite, pero el password es incorrecto
                if (!usuario.verificarPassword(password)) {
                    return done(null, false, {
                        message: 'El Password es Incorrecto'
                    })
                }
                //El email exite, y el password es correcto
                return done(null, usuario);
            } catch (error) {
                //Ese usuario no existe
                return done(null, false, {
                    message: 'Esa cuenta no exite'
                })
            }
        }
    )
);

//serealizar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});

//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

//exportar
module.exports = passport;