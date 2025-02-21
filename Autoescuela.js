const express = require('express'); 
const mysql = require('mysql2'); 
const app = express(); 
app.use(express.json()); 
const puerto = 3000 
const conexion = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', 
    password: 'root', 
    database: 'autoescuela' 
}); 
conexion.connect(function(err) { 
    if(err){ 
        throw err; 
    }else{ 
        console.log('Conexion exitosa !!!'); 
    } 
}); 
/*app.get('/', function(req, res) { 
    res.send('Ruta de servicios'); 
});*/ 
///////////////////////////////////////////////////////TABLA USUARIOS///////////////////////////////////////////////////////
//GET
app.get('/usuarios', function(req, res) {
    conexion.query('SELECT * FROM usuarios', function(err, result) {
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});
//POST
app.post('/usuarios', (req, res) => {
    const { correo, contrasena, id_persona } = req.body;

    // Usamos el procedimiento almacenado que hemos definido previamente
    let sql = 'CALL pinsertar_usuario(?, ?, ?)';
    // Ejecutamos la consulta con los parámetros
    conexion.query(sql, [correo, contrasena, id_persona], (err, result) => {
        if (err) {
            console.log('Error al insertar el usuario', err);
            return res.status(500).json({ error: 'Error al insertar el usuario', details: err });
        } else {
            res.status(201).json({ message: 'Usuario creado con éxito' });
        }
    });
});
///////////////////////////////////////////////////////TABLA PERSONA///////////////////////////////////////////////////////
//GET
app.get('/personas', function(req, res) { 
    conexion.query('SELECT * FROM persona', function(err, result) { 
        if(err){ 
            throw err; 
        }else{ 
            res.send(result); 
        } 
    }); 
});
//POST
app.post('/personas', (req, res) => {
    const { nombre, primer_apellido, segundo_apellido, telefono, ci, fecha_nacimiento, categoria } = req.body;

    let sql = 'CALL pinsertar_persona(?, ?, ?, ?, ?, ?, ?)';

    conexion.query(sql, [nombre, primer_apellido, segundo_apellido, telefono, ci, fecha_nacimiento, categoria], (err, result) => {
        if (err) {
            console.log('Error al insertar la persona', err);
            return res.status(500).json({ error: 'Error al insertar la persona', details: err });
        } else {
            res.status(201).json({ message: 'Persona creada con éxito' });
        }
    });
});
///////////////////////////////////////////////////////TABLA INSCRIPCION///////////////////////////////////////////////////////
//GET
app.get('/inscripciones', function(req, res) {
    conexion.query('SELECT * FROM inscripcion', function(err, result) {
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    });
});
//POST
app.post('/inscripciones', (req, res) => {
    const { id_persona, fecha_inscripcion, observaciones } = req.body;

    let sql = 'CALL pinsertar_inscripcion(?, ?, ?)';

    conexion.query(sql, [id_persona, fecha_inscripcion, observaciones], (err, result) => {
        if (err) {
            console.log('Error al insertar la inscripción', err);
            return res.status(500).json({ error: 'Error al insertar la inscripción', details: err });
        } else {
            res.status(201).json({ message: 'Inscripción creada con éxito' });
        }
    });
});
///////////////////////////////////////////////////////TABLA EVALUACIONES///////////////////////////////////////////////////////
//GET 
app.get('/evaluaciones', function(req, res) { 
    conexion.query('SELECT * FROM evaluaciones', function(err, result) { 
        if(err){ 
            throw err; 
        }else{ 
            res.send(result); 
        } 
    }); 
});
//POST
app.post('/evaluaciones', (req, res) => {
    const { id_inscripcion, id_turno, fecha_evaluacion, resultado } = req.body;

    let sql = 'CALL pinsertar_evaluacion(?, ?, ?, ?)';

    conexion.query(sql, [id_inscripcion, id_turno, fecha_evaluacion, resultado], (err, result) => {
        if (err) {
            console.log('Error al insertar la evaluación', err);
            return res.status(500).json({ error: 'Error al insertar la evaluación', details: err });
        } else {
            res.status(201).json({ message: 'Evaluación creada con éxito' });
        }
    });
});
///////////////////////////////////////////////////////TABLA TURNOS///////////////////////////////////////////////////////
//GET 
app.get('/turnos', function(req, res) { 
    conexion.query('SELECT * FROM turnos', function(err, result) { 
        if(err){ 
            throw err; 
        }else{ 
            res.send(result); 
        } 
    }); 
});
//POST 
app.post('/turnos', (req, res) => {
    const { categoria, tipo_examen, hora_inicio, hora_fin } = req.body;

    let sql = 'CALL pinsertar_turno(?, ?, ?, ?)';

    conexion.query(sql, [categoria, tipo_examen, hora_inicio, hora_fin], (err, result) => {
        if (err) {
            console.log('Error al insertar el turno', err);
            return res.status(500).json({ error: 'Error al insertar el turno', details: err });
        } else {
            res.status(201).json({ message: 'Turno creado con éxito' });
        }
    });
});
//INIZIARLIZAR PUERTO
app.listen(puerto, function () {
    console.log('Servidor OK en puerto: ' + puerto);
});