import BaseDao from '@/api/base'

class TestDao extends BaseDao{
  // 获取会话数据
  getDialogData(): Promise<any> {
    return new Promise((resolve, reject) => {
      const url = `/dialog/getDialogs`
      this.axios.get(url)
        .then((res: any) => {
          const result = res.data
          if (result.code === BaseDao.RES_OK) {
            resolve(result.data)
          } else {
            reject(result)
          }
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  }
}

export default TestDao