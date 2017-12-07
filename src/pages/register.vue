<template>
  <f7-page register-screen class="register-page">
    <f7-navbar :title="随记注册" :back-link="$t('app.back')" sliding></f7-navbar>
    <f7-list form>
      <f7-list-item>
        <f7-label>昵&nbsp;&nbsp;&nbsp;&nbsp;称:</f7-label>
        <f7-input v-model="nickname" name="nickname" type="text" placeholder="nickname"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>密&nbsp;&nbsp;码:</f7-label>
        <f7-input v-model="password" name="password" type="password" placeholder="Password"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>确认密码:</f7-label>
        <f7-input v-model="surepwd" name="surepwd" type="password" placeholder="Sure Password"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>邮&nbsp;&nbsp;箱:</f7-label>
        <f7-input v-model="mail" name="mail" type="text" placeholder="exmple@qq.com"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button title="注册" v-on:click="register"></f7-list-button>
      <f7-list-label>
      </f7-list-label>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      password: '',
      mail:'',
      surepwd:''
    }
  },
  methods: {
    register() {
      var self = this
      console.log(this)
      this.$store.dispatch('register', {
        nickname: this.nickname,
        password: this.password,
        mail: this.mail,
        callback: function() {
          self.$router.reloadPage('/login/')
        }
      })
    }
  }
}
</script>
