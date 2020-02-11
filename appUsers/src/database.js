const mysql = require('mysql'); // Requerimos la dependencia de mysql.s

// Le pasamos los parametros correspondientes para la conexion con la db.
const mysqlConect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurante'
});

// Validamos el resultado de la conexion.
mysqlConect.connect(err => {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('conectados');
    }
});

// Exportamos la constante de la conexion.
module.exports = mysqlConect;