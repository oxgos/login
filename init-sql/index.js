const path = require('path')
const fs = require('fs')
const { walkDoc } = require('./walk-doc')
const query = require('../utils/connection')

const execSql = async () => {
  const MINE = 'sql'
  const filesMapList = walkDoc(path.resolve(`${__dirname}/sql/`), MINE)
  for (let key in filesMapList) {
    // 读取文件encodeing一定要utf8,否则中文会乱码
    const content = fs.readFileSync(filesMapList[key], 'utf8')
    const shellList = content.split(';').filter(_ => _)
    for (let [i, sql] of shellList.entries()) {
      if (sql.trim()) {
        try {
          let result = await query(sql, null)
          console.log(result)
        } catch(e) {
          console.error(e)
        }
      }
    }
  }
  console.log('所有sql已经执行完成')
  console.log('请按crtl + c退出')
}

execSql()