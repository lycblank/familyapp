<style lang="less">
    .login-page {
        .register-text {
           text-align: right;  
        } 
    }
</style>

<template>
  <f7-page login-screen class="login-page">
    <f7-navbar :title="随记" sliding></f7-navbar>
      <f7-login-screen-title>随记</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>用户名:</f7-label>
        <f7-input v-model="username" name="username" type="text" placeholder="example@qq.com"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>密&nbsp;&nbsp;&nbsp;码:</f7-label>
        <f7-input v-model="password" name="password" type="password" placeholder="Password"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button title="登陆" v-on:click="login"></f7-list-button>
      <f7-list-label>
        <f7-link href="/register/"><div class="register-text">没有账号,点击这里</div></f7-link>
      </f7-list-label>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
        successCallback: () => {
          this.$f7.mainView.router.load({pageName: 'main'})
          this.$store.dispatch('getTimeline', {
            successCallback: () => {
              console.log('success timeline')
            },
            failedCallback: () => {
              this.$f7.mainView.router.loadPage('/login/')
            }
          })
        },
        failedCallback: () => {

        }
      })
    }
  }
}
</script>
