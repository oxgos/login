const query = require('../../utils/connection')

const getAllData = function() {
  let _sql = 'select * from dialog_t'
  return query(_sql)
}

module.exports = {
  query,
  getAllData
}