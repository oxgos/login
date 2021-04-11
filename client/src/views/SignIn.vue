<template>
  <div class="login">
    <div class="wrapper">
      <input type="text" v-model="account" placeholder="账号">
      <input type="text" v-model="password" placeholder="密码">
    </div>
    <div class="footer">
      <button class="submit" @click="login">登陆</button>
      <router-link to="signup">注册</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import UserDao from '@/api/user'
import { encodeWithRsa } from '@/utils/gobalUtil'

const RES_OK = 1

@Component
export default class SignIn extends Vue {
  private account = ''
  private password = ''
  private userDao = new UserDao()

  public login() {
    const encryptedB64 = encodeWithRsa(this.password, (window as any).__publickKey__)
    this.userDao.signin(this.account, encryptedB64)
      .then((res: any) => {
        if (res.code === RES_OK) {
          console.log(res)
        }
      })
      .catch((e: any) => {
        console.log(e)
      })
  }
}
</script>
