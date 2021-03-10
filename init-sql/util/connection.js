const mysql  = require('mysql')
const { config } = require('../../config')

// 创建连接池
const pool   = mysql.createPool({
  connectionLimit : 10,
  host            : config.HOST,
  user            : config.USER,
  password        : config.PASSWORD,
  database        : config.DATABASE
})

// 封闭query
const query = function(sql, value) {
  return new Promise((resolve, reject) => {
    // 池连接
    pool.getConnection(function(err, connection) {
      if (err) reject(err)
     
      // Use the connection
      connection.query(sql, value, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
     
        // Handle error after the release.
        if (error) reject(error)
        
        // Don't use the connection here, it has been returned to the pool.
        resolve(results)
      })
    })
  })
}

module.exports = {
  query
}
