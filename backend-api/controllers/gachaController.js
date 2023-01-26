const mariadb = require("mariadb")
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

exports.getAll = async (req, res)=>{
    let connection
    try {
        connection = await pool.getConnection()
        const rows = await connection.query("SELECT * FROM customers")
        console.log(rows)
        res.send(rows)
    } catch (error) {
        throw error
    } finally {
        if (connection) return connection.end()
    }
}