var knex = require('knex')({
   client: 'mysql',
   connection: { 
        host: '127.0.0.1',
        port: '3306',
        user: 'root3',
        password: 'root3',
        database: 'wd4'
    }
});




module.exports = knex;
