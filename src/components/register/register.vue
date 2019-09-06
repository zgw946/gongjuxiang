
<template>
  <div>
    <el-main class="mins">
      <el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
        <h3 class="login-text">手机注册</h3>
        <el-form-item prop="tel">
          <el-input type="text" v-model.number="ReginForm.tel" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="password1">
          <el-input type="password" v-model="ReginForm.password1" placeholder="设置6至20位登录密码"></el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input type="password" v-model="ReginForm.password2" placeholder="请再次输入登录密码"></el-input>
        </el-form-item>
        <!-- <div>
          <input class="auth_input" type="text" v-model="verification" placeholder="输入验证码" />
           <span v-show="!sendAuthCode" class="auth_text cla">
            <span class="auth_text_blue ">验证码已发送({{auth_time}})</span>
          </span>
          <el-button  class="auth_text auth_text_blue" @click="getAuthCode" type="primary" round>获取验证码</el-button>
          <span  class="auth_text auth_text_blue" @click="getAuthCode">获取验证码</span>
        </div> -->
        <el-form-item prop="verification" >
          <el-input v-model="verification" placeholder="输入验证码" class="auth_item"></el-input>
          <el-button v-show="sendAuthCode" type="primary" round class="auth_item_button_send" @click="getAuthCode">发送验证码</el-button>
          <el-button v-show="!sendAuthCode" round class="auth_item_button_success">验证码已发送({{auth_time}})</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="submitBtn"
            round
            @click.prevent="submit"
            :loading="logining"
          >注册</el-button>
          <hr />
            <!-- <span class="to" @click="tologin"></span> -->
             <!-- <el-button @click="tologin" type="primary">登录</el-button> -->
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    let confirmpasswordCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("密码是必须的"));
      } else {
        return callback();
      }
    };
    let telCheck = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入号码"));
      } else if (!Number.isInteger(value)) {
        return callback(new Error("电话号码必须是数字"));
      } else if (value.toString().length !== 11) {
        return callback(new Error("电话号码必须是11位数字"));
      } else {
        callback();
      }
    };
    return {
      ReginForm: {
        password: "",
        tel: ""
      },
      logining: false,
      sendAuthCode: true,
      /*布尔值，通过v-show控制显示‘获取按钮’还是‘倒计时’ */
      auth_time: 0,
      /*倒计时 计数器*/
      verification: "", //绑定输入验证码框框
      rule: {
        password: [
          {
            required: true,
            message: "请输入密码！",
            trigger: "blur"
          }
        ],
        password1: [
          {
            required: true,
            message: "请设置6至20位登录密码！",
            trigger: "blur"
          }
        ],
        password2: [
          {
            required: true,
            message: "请确认登录密码！",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            validator: telCheck,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    //   验证码
    getAuthCode: function() {
      const verification = this.ReginForm.tel;
      this.$http.post('/auth/sendMobileCode',{
        mobile: verification
      }).then( res => {
        console.log( res );
      })
      this.sendAuthCode = false;
      //设置倒计时秒
      this.auth_time = (60);
      var auth_timetimer = setInterval(() => {
        this.auth_time--;
        if (this.auth_time <= 0) {
          this.sendAuthCode = true;
          clearInterval(auth_timetimer);
        }
      }, 1000);
    },
    // 封装注册发送请求方法
    thisAjax() {
      const passwordData = this.ReginForm.password;
      const phoneData = this.ReginForm.tel;
      const mCodeData = this.verification;

      //   手机注册
      //emulateJSON:true设置后post可跨域

      const url = " 填接口";
      this.$http
        .post(
          url,
          {
            填传入的参数
          },
          {
            emulateJSON: true
          }
        )
        .then(
          function(response) {
            //登录后跳转的页面
            this.$router.push("/");
          },
          function(error) {
            alert("请求失败", error);
          }
        );
    },
    // ...
    submit() {
      this.$refs.ReginForm.validate(valid => {
        if (valid) {
          this.logining = true;
          this.thisAjax();
          console.log("开始写入后台数据！");
        } else {
          console.log("submit err");
        }
      });
    },
    reset() {
      this.$refs.ReginForm.resetFields();
    },
    tologin() {
      //已经注册过跳转到登入界面
      this.$router.push("/phoneLogin");
    }
  }
};
</script>
<style scoped>
.regform {
  margin: 70px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 10px #b4bccc;
  padding: 30px 30px 0 30px;
  border-radius: 25px;
}

.submitBtn {
  width: 100%;
}

.to {
  color: #fa5555;
  cursor: pointer;
}

.auth_input {
  width: 160px;
  height: 38px;
  margin-bottom: 20px;
  border: 1px solid #dcdfe6;

  /* color:red; */
  padding-left: 10px;
  /* border-radius: 8%; */
}

.regform[data-v-92def6b0] {
  width: 370px;
  min-height: 440px;
}

.login-text {
  text-align: center;
  margin-bottom: 20px;
}
.auth_item{
  width: 60%;
}
.auth_item_button_success{
  width: 35%;
  font-size: 12px;
  padding: 12px 0;
}
.auth_item_button_send{
  width: 38%;
  font-size: 12px;
  padding: 12px 0;
}
</style>