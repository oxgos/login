const { getAllData } = require('../models/dialog')

module.exports = {
  // 获取dialog数据
  async getDialogs(ctx, next) {
    let result
    try {
      result = await getAllData()
    } catch (e) {
      result = e
    }

    ctx.__result__ = result
    next()
  },
}