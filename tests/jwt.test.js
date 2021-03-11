const { vertify } = require('../service/utils/JWT')
const JWT = require('../service/utils/JWT')
let egToken = '',
  alg = 'HS256',
  data = {
    userId: '123456',
    userName: 'Gavin_Guo'
  },
  expireTime = 7 * 24 * 60 * 60

beforeAll(() => {
  // 生成测试token
  egToken = JWT.generate({ alg, data, expireTime })
  console.log('egToken: ' + egToken)
})

test('测试生成token方法', () => {
  const token = JWT.generate({ alg, data, expireTime })
  expect(typeof token).toBe('string')
  expect(token.split('.').length).toBe(3)
})

test('测试生成token方法(不带参数)', () => {
  const token = JWT.generate()
  expect(typeof token).toBe('string')
  expect(token.split('.').length).toBe(3)
})

test('测试验证token的方法', () => {
  const bool = JWT.vertify(egToken, { alg })
  expect(bool).toBe(true)
})

test('测试验证token的方法(不带options)', () => {
  const bool = JWT.vertify(egToken)
  expect(bool).toBe(true)
})

test('测试解析payload的方法', () => {
  const payload = JWT.decodePayload(egToken)
  expect(payload.data).toEqual(data)
})

test('测试解析payload的方法(不带参数)', () => {
  const payload = JWT.decodePayload()
  expect(payload).toBeUndefined()
})