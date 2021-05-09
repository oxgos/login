const JWT = require('../service/utils/JWT')
const { v1: uuidv1 } = require('uuid')

const secret = uuidv1()
let alg = 'HS256',
  data = {
    userId: '123456',
    userName: 'Gavin_Guo'
  },
  expireTime = 7 * 24 * 60 * 60

test('测试生成token方法', () => {
  const token = JWT.generate({ alg, data, expireTime, secret })
  expect(typeof token).toBe('string')
  expect(token.split('.').length).toBe(3)
})

test('测试生成token方法(不带参数)', () => {
  const token = JWT.generate({ secret })
  expect(typeof token).toBe('string')
  expect(token.split('.').length).toBe(3)
})

describe('测试正常token', () => {
  let egToken = ''

  beforeAll(() => {
    egToken = JWT.generate({ alg, data, expireTime, secret })
  })

  test('测试验证token的方法', () => {
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeTruthy()
  })
  
  test('测试验证token的方法(不带options)', () => {
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeTruthy()
  })
  
  test('测试解析payload的方法', () => {
    const payload = JWT.decodePayload(egToken)
    expect(payload.data).toEqual(data)
  })
  
  test('测试解析payload的方法(不带参数)', () => {
    const payload = JWT.decodePayload()
    expect(payload).toBeUndefined()
  })
})

describe('测试非正常token', () => {
  test('没带".": 测试验证token的方法', () => {
    let egToken = '123'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })

  test('只有一个".": 测试验证token的方法', () => {
    let egToken = '1.asdf'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })

  test('有两个".": 测试验证token的方法', () => {
    let egToken = 'asd.as.df'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })

  test('有三个以上".": 测试验证token的方法', () => {
    let egToken = '1.as.d.f'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })

  test('没带"."且特殊字符: 测试验证token的方法', () => {
    let egToken = '!@^&&^&(@#'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })

  test('只有一个"."且特殊字符: 测试验证token的方法', () => {
    let egToken = '1.&^&(@#'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })

  test('有两个"."且特殊字符: 测试验证token的方法', () => {
    let egToken = '1.&^&(@.#'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })

  test('有三个以上"."且特殊字符: 测试验证token的方法', () => {
    let egToken = '1.&^&.(@.#'
    const bool = JWT.vertify(egToken, secret)
    expect(bool).toBeFalsy()
  })
  
  // test('测试解析payload的方法', () => {
  //   const payload = JWT.decodePayload(egToken)
  //   expect(payload.data).toEqual(data)
  // })
})
