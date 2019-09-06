<template>
  <div>
      <div class="grid-content bg-purple">
        <el-row class="karow">
          <el-button type="primary" @click="showopen">登录/注册</el-button>
          <!-- 登录弹窗 -->
          <el-col class="dialogs">
            <el-dialog width="26%" :visible.sync="dialogFormVisible">
              <section class="loginContainer">
                <div class="loginInner">
                  <div class="login_header">
                    <div class="login_header_title">
                      <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
                      <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
                    </div>
                  </div>
                  <div class="login_content">
                    <form @submit.prevent="login">
                      <div :class="{on: loginWay}">
                        <section class="login_message">
                          <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" />
                          <button
                            :disabled="!rightPhone"
                            class="get_verification"
                            :class="{right_phone: rightPhone}"
                            @click.prevent="getCode"
                            >{{computeTime>0 ? `已发送(${computeTime}s)` : '获取验证码'}}</button>
                        </section>
                        <section class="login_verification">
                          <input type="tel" maxlength="8" placeholder="验证码" v-model="code" />
                        </section>                     
                      </div>
                      <div :class="{on: !loginWay}">
                        <section>
                          <section class="login_message">
                            <input
                              type="text"
                              maxlength="11"
                              placeholder="手机/邮箱/用户名"
                              v-model="name"
                            />
                          </section>
                          <section class="login_verification">
                            <input
                              type="text"
                              maxlength="8"
                              placeholder="密码"
                              v-if="showPwd"
                              v-model="pwd"
                            />
                            <input
                              type="password"
                              maxlength="8"
                              placeholder="密码"
                              v-else
                              v-model="pwd"
                            />
                          </section>                         
                        </section>
                      </div>
                      <button class="login_submit">登录</button>
                    </form>
                      <el-link :underline="false" class="el_link">记住登录状态</el-link>
                      <el-link type="primary" :underline="false" class="el_link" @click="register">注册新用户</el-link>
                      <el-link type="primary" :underline="false" class="el_link">忘记密码</el-link>
                  </div>
                  <a href="javascript:" class="go_back" @click="$router.back()">
                    <i class="iconfont icon-jiantou2"></i>
                  </a>
                </div>
                <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip" />
              </section>
            </el-dialog>
          </el-col>
        </el-row>
      </div>
  </div>
</template>
<script>
import AlertTip from "../layout/AlertTip/AlertTip"
export default {
  data() {
    return {
      dialogFormVisible: false, // 控制对话框的显示
      formLabelWidth: "20px",
      activeName: "second",
      loginWay: false, // true代表短信登陆, false代表密码
      computeTime: 0, // 计时的时间
      showPwd: false, // 是否显示密码
      phone: "", // 手机号
      code: "", // 短信验证码
      name: "", // 用户名
      pwd: "", // 密码
      // captcha: "", // 图形验证码
      alertText: "", // 提示文本
      alertShow: false // 是否显示警告框
    };
  },
  methods: {
    showopen() {
      // 登录弹窗
      this.dialogFormVisible = true;
    },
    // 注册
    register(){
   this.$router.push({path:"/register"})
    },
    // 异步获取短信验证码
    async getCode() {
      // 如果当前没有计时
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 60;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            // 停止计时
            clearInterval(this.intervalId);
          }
        }, 1000);

        // 发送Axios请求(向指定手机号发送验证码短信)
        const result = await this.$http.post(`auth/sendMobileCode`,{
          mobile: this.phone
        });
        if (result.code === 1) {
          // 显示提示
          this.showAlert(result.msg);
          // 停止计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }
      }
    },

    showAlert(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
    },
    // 异步登陆
    async login() {
      let result;
      // 前台表单验证
      if (this.loginWay) {
        // 短信登陆
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          // 手机号不正确
          this.showAlert("您的手机号码格式不正确");
          return;
        } else if (!/^\d{6}$/.test(code)) {
          // 验证必须是6位数字
          this.showAlert("验证必须是6位数字");
          return;
        }
        // 发送ajax请求短信登陆
        result = await reqSmsLogin(phone, code);
      } else {
        // 密码登陆
        const { name, pwd, captcha } = this;
        if (!this.name) {
          // 用户名必须指定
          this.showAlert("请输入正确用户名");
          return;
        } else if (!this.pwd) {
          // 密码必须指定
          this.showAlert("请输入密码");
          return;
        } 
        // 发送ajax请求密码登陆
        result = await reqPwdLogin({ name, pwd, captcha });
      }

      // 停止计时
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }

      // 根据结果数据处理
      if (result.code === 0) {
        const user = result.data;
        // 将user保存到vuex的state
        this.$store.dispatch("recordUser", user);
        // 去个人中心界面
        this.$router.replace("/profile");
      } else {
        // 显示警告提示
        const msg = result.msg;
        this.showAlert(msg);
      }
    },
    // 关闭警告框
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
  },
   computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    }
  },
  components:{
    AlertTip
  }
};
</script>
<style scoped>
.el-header {
  background-color: #f2f2f2;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}
.el-tabs__nav-wrap::after {
  content: "";
  /* position: absolute; */
  left: 0;
  bottom: 0;
  /* width: 100%; */
  height: 2px;
  background-color: #e4e7ed;
  z-index: 1;
}
/* 登录 */
.loginContainer {
  width: 100%;
  height: 300px;
  background: #fff;
}
.loginInner {
  width: 90%;
  margin: 0 auto;
  /* padding-top: -15px; */
}
.login_header .login_header_title {
  text-align: center;
  padding-top: -4px;
}
.login_header_title a {
  text-decoration: none;
  font-size: 14px;
  color: #333;
  padding-bottom: 4px;
}
.login_header_title a:first-child {
  margin-right: 40px;
}
.login_header_title a.on {
  color: #66b1ff;
  font-weight: bolder;
  border-bottom: 2px solid #66b1ff;
}
.login_content form div {
  display: none;
}
.login_content form div.on {
  height: 100%;
  display: block;
}
.login_content form input {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  padding-left: 10px;
  box-sizing: border-box;
}
.login_content form input:focus {
  border: 1px solid #66b1ff;
}
.login_message {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}
.login_message .get_verification {
  position: absolute;
  top: 65%;
  right: 10px;
  transform: translateY(-50%);
  border: none;
  color: #ccc;
  background: transparent;
  font-size: 14px;
}
.login_message .get_verification.right_phone {
  color: #000;
}
/* .login_hint {
  color: #999;
  margin-top: 12px;
  font-size: 14px;
  line-height: 20px;
}
.login_hint a {
  text-decoration: none;
  color: #02a774;
} */

.login_verification {
  position: relative;
  margin-top: 16px;
  height: 48px;
  font-size: 14px;
  background: #fff;
}
.login_verification .switch_button.on {
  background: #66b1ff;
}
.login_verification .switch_button.off {
  background: #fff;
}

.switch_button .switch_circle.right {
  transform: translateX(30px);
}
.switch_button .switch_text {
  color: #ddd;
  float: right;
}
.login_submit {
  display: block;
  width: 100%;
  height: 42px;
  margin-top: 30px;
  background: #66b1ff;
  border-radius: 4px;
  font-size: 16px;
  line-height: 42px;
  color: #fff;
  text-align: center;
  border: none;
}
.dialogs {
  height: 50px;
}
.el_link{
  height: 20px;
  margin: 10px 17px;
}
</style>