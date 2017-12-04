import mysql from 'mysql';
import config from '../config';

const connection = mysql.createConnection(config.mysql);
 
connection.connect();

// var post  = {test: 'Hello MySQL'};
// var query = connection.query('INSERT INTO `test_table` SET ?', post, function (error, results, fields) {
//   if (error) {
//     console.log(error);
//     return;
//   }

//   connection.query('SELECT * from `test_table`', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results);
//   });
//   // Neat!
// });

export default connection;