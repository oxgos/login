const fs = require('fs')
/**
 * @param {String} path 访问的目录路径
 * @param {String} mine 读取的文件后缀
 */
function walkDoc(path, mine) {
  let filesMapList = {}
  const files = fs.readdirSync(path)

  // files.forEach(fileName => {
  for (let [i, fileName] of files.entries()) {
    const fullPath = `${path}/${fileName}`
    const stat = fs.statSync(fullPath)

    if (stat.isFile()) {
      const fileArr = fileName.split('.')
      // 后缀相同
      if (fileArr[1] === mine) {
        filesMapList[fileName] = fullPath
      }
    } else if (stat.isDirectory()) { // 判断是否文件夹，是的话继续递归
      filesMapList = Object.assign({}, filesMapList, walkDoc(fullPath, mine))
    }
  }

  return filesMapList
}

module.exports = {
  walkDoc
}
