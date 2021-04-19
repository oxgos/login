<template>
  <div class="login">
    <div class="wrapper">
      <input type="text" v-model="account" placeholder="账号" />
      <input type="text" v-model="password" placeholder="密码" />
    </div>
    <div class="footer">
      <button class="submit" @click="login">登陆</button>
      <router-link to="signup">注册</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
const loginModule = namespace('login')

interface loginParam {
  account: string
  password: string
}

@Component
export default class SignIn extends Vue {
  private account = ''
  private password = ''

  // 需要用Component.registerHooks注册后,才能使用
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log('beforeRouteEnter')
    next()
  }

  // 定义方法类型
  @loginModule.Action('signIn') signIn!: (arg: loginParam) => Promise<void>

  async login() {
    try {
      await this.signIn({ account: this.account, password: this.password })
      console.log('登陆成功')
      this['$router'].push({ name: 'TestJwt' })
    } catch (e) {
      console.log('登陆失败' + e)
    }
  }
}
</script>
