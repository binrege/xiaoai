<template>
  <div class="app">
    <div class="wrap">
      <div class="loginItem">
        <div :class="{sel:ids===1}" @click="changeBar(1)">登录</div>
        <div :class="{sel:ids===2}" @click="changeBar(2)">注册</div>
      </div>
      <!-- 登录 -->
      <div v-if="ids===1" class="login">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码:" prop="codevalid">
            <div class="valicode">
              <div>
                <el-input v-model="ruleForm.codevalid"></el-input>
              </div>

              <div class="codes" @click="refreshcode()" v-html="codeStr"></div>
            </div>
          </el-form-item>
          <el-form-item>
            <div class="btn">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>

              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 注册 -->
      <div v-else class="register">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <div class="btn">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    //判断验证码是否正确
    var checkCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else {
        //判断验证码是否正确

        callback();
      }
    };
    //验证密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }

        callback();
      }
    };
    //验证用户名
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.username.match(/^[a-zA-Z0-9_-]{4,16}$/)) {
          callback();
        } else {
          callback(
            new Error("用户名只能由4-16位(字母，数字，下划线，减号)组成")
          );
        }
      }
    };
    //确认密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ids: 1,
      codeStr: null,
      ruleForm: {
        username: "",
        pass: "",
        checkPass: "",
        codevalid: ""
      },
      //验证规则
      rules: {
        pass: [
          { validator: validatePass, trigger: "blur" },
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        username: [
          { validator: validatePass1, trigger: "blur" },
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        codevalid: [
          { validator: checkCode, trigger: "blur" },
          { required: true, message: "验证码能为空", trigger: "blur" }
        ]
      }
    };
  },
  props: {},
  components: {},
  methods: {
    changeBar(val) {
      this.ids = val;
      this.$refs["ruleForm"].resetFields();
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        // console.log(valid);
        if (valid) {
          if (this.ids === 1) {
            //登录
            this.loginReq(
              this.ruleForm.username,
              this.ruleForm.pass,
              this.ruleForm.codevalid
            );
          } else {
            //注册
            this.registerReq(this.ruleForm.username, this.ruleForm.pass);
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getcode() {
      //请求验证码
      this.$axios
        .req("captcha")
        .then(res => {
          this.codeStr = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //刷新验证码
    refreshcode() {
      this.getcode();
    },
    // 登录请求
    loginReq(username, pwd, codes) {
      this.$axios
        .req("user/login", {
          username: username,
          password: pwd,
          code: codes
        })
        .then(res => {//请求成功
          if (res.code === 200) {
            let users = {
              username: this.ruleForm.username,
              password: this.ruleForm.pass
            };
            localStorage.setItem("users", JSON.stringify(users));
            this.$router.push("/");
            this.$message({
              type: "success",
              message: "登录成功"
            });
          } else if (res.code === 500) {
            this.$message({
              type: "warning",
              message: "用户不存在"
            });
            
          } else {
            this.$message({
              type: "error",
              message: "验证码错误"
            });
          }
          // console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 注册请求
    registerReq(username, pwd) {
      this.$axios
        .req("user/register", {
          username: username,
          password: pwd
        })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "注册成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: "用户已存在"
            });
            this.$refs["ruleForm"].resetFields();
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getcode();
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.app {
  font-size: 20px;
  display: flex;
  height: 794px;
  background: url("../assets/images/88392eb9c9c026c58bfd2ad9bbbda9e0.jpg")
    no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
}
.wrap {
  width: 576px;
  height: 600px;
  border: 1px rgba(192, 176, 176, 0.5) solid;
  background: rgba(192, 176, 176, 0.5);
}
.loginItem {
  height: 80px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
}
.loginItem>div{
  cursor: pointer;
}
.el-input {
  width: 300px;
}
.login,
.register {
  padding: 20px 0;
  background: white;
}
.register {
  .el-input {
    width: 352px;
  }
}
.btn {
  width: 303px;
  display: flex;
  justify-content: space-around;
}
.valicode {
  display: flex;
  position: relative;
}
.sel {
  color: rgb(235, 101, 12);
}
.codes {
  position: absolute;
  right: 28px;
  top: -14px;
}
</style>