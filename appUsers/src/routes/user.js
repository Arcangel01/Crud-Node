const express = require('express');
const router = express.Router();

// Instanciamos la conexion.
const mysqlConnect = require('../database');

// Creamos una ruta para listar
router.get('/user', (req, res) => {
    mysqlConnect.query('SELECT * FROM mesero', (err, rows, fields) => {
        if(!err) {
            res.json({"status": 200, "error": null, "response": rows});
            //res.send(JSON.stringify({"status": 200, "error": null, "response": rows}));
        } else {
            //console.log(err);
            res.json({"status": 500, "error": err, "response": null});
            //Hay un error a la hora de conectarse a la BBDD
        }
    });
});

// Creamos la ruta para consultar por id
router.get('/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('SELECT * FROM mesero WHERE idMesero = ?', [id], (err, rows, fields) => {
        if(!err) {
            //res.json(rows[0]);
            res.json({"status": 200, "error": null, "response": rows[0]});
        } else {
           // console.log(err);
            res.json({"status": 500, "error": err, "response": null});
        }
    })
});

// Creamos ruta para insertar
router.post('/user', (req, res) => {
    const { id, nombre, apellido, edad } = req.body;
    mysqlConnect.query(`INSERT INTO mesero
    VALUES(?, ?, ?, ?)`, [id, nombre, apellido, edad], (err, rows, fields) => {
        if (!err) {
            res.json({"status": 201, "error": null, "response": `Usuario agregado`});
            //res.status(201).send(`Usuario agregado`);
        } else {
            console.log(err);
            res.json({"status": 500, "error": err, "response": null});
        }
    });
});

// Creamos ruta para modificar
router.put('/user/:id', (req, res) => {
    //const { nombre, apellido, edad } = req.body;
    const { id } = req.params;
    mysqlConnect.query(`UPDATE mesero
    SET ? WHERE idMesero = ?`, [req.body, id], (err, rows, fields) => {
        if (!err) {
            res.json({"status": 201, "error": null, "response": `Usuario modificado`});
            //res.status(201).send(`Usuario modificado`);
        } else {
           // console.log(err);
            res.json({"status": 500, "error": err, "response": null});
        }
    });
});

// Ruta para eliminar
router.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('DELETE FROM mesero WHERE idMesero = ?', [id], (err, rows, fields) => {
        if (!err) {
            res.json({"status": 200, "error": null, "response": `Usuario eliminado`});
        } else {
            //console.log(err);
            res.json({"status": 500, "error": err, "response": null});
        }
    });
});


module.exports = router;