<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!--<p class="login-tip">输入任意用户名和密码即可</p>-->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from '_c/login-form'
  import { mapActions } from 'vuex'
  import Cookies from 'js-cookie'
  import $qs from 'qs';
  export default {
    components: {
      LoginForm
    },
    methods: {
      ...mapActions([
        'handleLogin',
        'getUserInfo'
      ]),
      handleSubmit ({ userName, password }) {
        // console.log('0000')
        this.handleLogin({ userName, password }).then(res => {
          this.getUserInfo().then(res => {
            this.$axios({
              method: 'post',
              url: 'admin/index/checkLogin',
              data: this.$qs.stringify({
                username: 'admin',
                password: 'admin'
              })
            }).then(res => {
              // console.log(res)
              // console.log(res.data.code)
              // console.log(Cookies)
              if(res.data.code === 200){
                Cookies.set('token',"admin")
                const jwt = res.data.jwt
                localStorage.setItem('jwt', jwt)
                this.$router.push({
                      path:'/mapPage',

                })
              }
              // if (res.data.code === 200) {
              //   // this.$Message.success(res.data.msg);
              //   const username = this.form.userName
              //   const password = this.form.password
              //   Cookies.set('username', this.form.userName);
              //   Cookies.set('password', this.form.password);
              //   const jwt = res.data.jwt
              //   console.log(username,'用户')
              //   console.log(password,'密码')
              //   localStorage.setItem('jwt', jwt)
              //   // if (this.form.userName === this.form.userName) {
              //   //   Cookies.set('access', 0);
              //   // } else {
              //   //   Cookies.set('access', 1);
              //   // }
              //   this.$router.push({
              //     // path:'/mapPage',
              //      path:'http://www.baidu.com/',
              //
              //   })
              // } else if (res.data.code === 400) {
              //   // this.$Message.error(res.data.msg);
              // }




              // const jwt = res.data.jwt
              // this.$router.push({
              //   path:'/mapPage',
              // })
              // localStorage.setItem('jwt', jwt)
              // console.log(localStorage.getItem('jwt'))
            }).catch(res => {
              // console.log(res)
              this.$Message.error('请求超时,请稍后再试...');
            });
          })
        })


      }
    }
  }
</script>

<style>

</style>









