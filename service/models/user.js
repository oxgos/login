const query = require('../../utils/connection')

const insertData = function(table, values) {
  let _sql = 'INSERT INTO ?? SET ?'
  return query(_sql, [table, values])
}

const findDataByAccount = function(account) {
  let _sql = 'select * from user_t where account = ?'
  return query(_sql, [account])
}

module.exports = {
  query,
  insertData,
  findDataByAccount
}