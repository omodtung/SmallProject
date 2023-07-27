import mysql from 'mysql2/promise'
// create the connection to database 
console.log("creating connection pool...");

// const connection = mysql.createConnection(
//     {
//         host :'localhost',
//         user :'root',
//         database:'nodejsbasic'
//     }
// );
///////////////////////////////////////
const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        database:'nodejsbasic',
    }
)
export default pool ;
