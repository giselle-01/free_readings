import mysql from 'mysql2';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import stream from 'stream';
import csv from 'csv-parser';

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'MyPassword123*',
    database: 'lecturas_libres'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting to the database');
        return;
    }
    console.log('connected to the database')
});

app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const bufferStream = stream.Readable;

let results = [];

app.get('/', (req, res) => {
    res.send(`
        <h1>Endpoints</h1>
        <h2>Get</h2>
        <a href="/data">/data</a>
        <h2>Post</h2>
        <a href="/upload" >/upload</a>
    `);
});

app.get("/data", (req, res) => {
    const query = 
        "SELECT loans.id AS id_prestamo, users.name AS nombre_del_usuario, users.identity AS identificacion_del_usuario, users.email AS correo, users.phone AS telefono, books.title AS titulo, books.isbn AS isbn, books.year_publication AS año_de_publicacion, books.author AS autor, loans.loan_date AS fecha_prestamos, loans.return_date AS fecha_devolucion, loans.state AS estado FROM users INNER JOIN loans ON loans.user_identity = users.user_identity INNER JOIN books ON books.isbn = loans.isbn;";
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).json({
                message: "Error",
            });
            return;
        }
        res.status(200).json(result);
    });

});

app.delete("/data/:id", (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM loans WHERE id_loan = ${id}`;

    connection.query(query, (err, result) => {
        if(err) {
            res.status(500).json({message: `${err}`});
            return;
        }
        res.status(200).json(result);
    });
});

app.post("/upload", upload.single("fileCSV"), (req, res) => {
    results = [];

    bufferStream
        .from(req.file.buffer)
        .pipe(csv())
        .on("data", (data) => {
            console.log(results);
            results.push(data);
        })
        .on("end", () => {
            results.forEach((row) => {
                connection.query(
                    "INSERT INTO users(name, identity, phone"
                )
            })
        })
})
