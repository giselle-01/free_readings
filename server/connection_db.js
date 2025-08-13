import mysql from 'mysql2/promise';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import stream from 'stream';
import csv from 'csv-parser';


const pool = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'MyPassword123*',
    database: 'free_readings'
});

async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Successful connection to the database');
        connection.release();
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

testDbConnection()

