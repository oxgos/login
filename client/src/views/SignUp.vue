<template>
  <div class="signup">
    <div class="wrapper">
      <input type="text" placeholder="账号" v-model="account">
      <input type="text" placeholder="用户名" v-model="userName">
      <input type="password" placeholder="密码" v-model="password">
      <input type="text" placeholder="确认密码"  v-model="confirmPassword">
    </div>
    <div class="footer">
      <button class="submit" @click="register">注册</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import UserDao from '@/api/user'
import { encodeWithRsa } from '@/utils/gobalUtil'

const RES_OK = 1

@Component
export default class SignUp extends Vue {
  private account = ''
  private userName = ''
  private password = ''
  private confirmPassword = ''
  private userDao = new UserDao()

  public register() {
    if (this.password !== this.confirmPassword) return
    const encryptedB64 = encodeWithRsa(this.password, (window as any).__publickKey__)
    console.log('encryptedB64: ' + encryptedB64)
    this.userDao.signup(this.account, this.userName, encryptedB64)
      .then((res: any) => {
        if (res.code === RES_OK) {
          this['$router'].push('/signIn')
        }
      })
      .catch((e: any) => {
        console.log(e)
      })
  }
}
</script>

<style scoped>
  .wrapper > input {
    display: block;
  }
</style>