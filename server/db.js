import mysql from 'mysql2'
const db = mysql.createConnection({
    host: 'localhost',
    user:'manohar',
    password:'Manohar@519',
    database:'blog',
    port:'3306'
})
export default db