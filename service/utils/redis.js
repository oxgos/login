const Redis = require('koa-redis')
/**
  prefix: 'DATASESS', //redis前缀
  dataPrefix: 'DATAPREFIX',   //redis数据存储前缀
  port: 6379, //端口
  host: '0.0.0.0',    //你的redisIP
  password: 'xxxxxx', //你的redis密码 无密码可以为空
  db: 0,  //默认存储库
  ttl: 60 * 60 * 24, //过期时间
  options: {} //其它配置
  }
*/
const options = {
  port: 6379,
  host: '127.0.0.1'
}
const Store = new Redis(options).client

module.exports = Store
