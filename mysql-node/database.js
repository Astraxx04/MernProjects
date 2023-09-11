const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const getNotes = async() => {
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
};

const getNote = async(id) => {
    const [rows] = await pool.query(`
        SELECT * 
        FROM notes
        WHERE id = ?
    `, [id]);
    return rows[0];
};

const createNote = async(title, contents) => {
    const [result] = await pool.query(`
        INSERT INTO notes(title, contents)
        VALUES(?, ?)
    `, [title, contents]);
    const id = result.insertId;
    return getNote(id);
};

module.exports = {
    getNote,
    getNotes,
    createNote
};