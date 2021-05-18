<template>
  <div class="test-jwt">
    <button class="btn" @click="getData">发送请求获取数据</button>
    <button class="btn" @click="logoutAccount">登出</button>
    <div class="display">
      {{ dialogs }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
const testModule = namespace('test')
const loginModule = namespace('login')

@Component
export default class TestJwt extends Vue {

  @Getter('dialogs') dialogs: any
  // 定义方法类型
  @testModule.Action('getDialogsWithCookie') getDialogsWithCookie!: () => Promise<void>
  @loginModule.Action('logout') logout!: () => Promise<any>

  public async getData() {
    try {
      await this.getDialogsWithCookie()
    } catch(e) {
      console.log(e)
      this['$router'].push({ name: 'SignIn' })
    }
  }

  public async logoutAccount() {
    try {
      const ret = await this.logout()
      this['$router'].push({ name: 'SignIn' })
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>

</style>