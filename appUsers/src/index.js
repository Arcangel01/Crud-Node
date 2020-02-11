const express = require('express'); // Requerimos de express 
const app = express(); // Lo almacenamos en una constante para utilizar las rutas

// Config
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// configurar cabeceras http
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes
app.use(require('./routes/user'));

// Hacemos uso de express para iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Server en el puerto 3000');
});