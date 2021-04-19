<template>
  <div class="test-jwt">
    <button class="btn" @click="getData">发送请求获取数据</button>
    <div class="display">
      {{ dialogs }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
const testModule = namespace('test')

@Component
export default class TestJwt extends Vue {

  @Getter('dialogs') dialogs: any
  // 定义方法类型
  @testModule.Action('getDialogs') getDialogs!: () => Promise<void>

  public async getData() {
    try {
      await this.getDialogs()
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style lang="less" scoped>

</style>