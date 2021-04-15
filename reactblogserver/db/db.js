const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vuexms'
})
connection.connect((error)=>{
   if(error){
       console.log(error);
   }else{
       console.log('connect mysql success')
   }
});
module.exports = connection;