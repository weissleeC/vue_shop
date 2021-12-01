<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatra_box">
        <img src="../assets/logo.png" alt="头像" />
      </div>
      <!-- 登陆表单 -->
      <div class="login_form">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
              show-password
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item class="login_btns">
            <el-button type="primary" @click="login">登陆</el-button>
            <el-button type="info" @click="resetLoginForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表单默认数据
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 表单验证
      loginFormRules: {
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入登陆密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    // 登陆验证
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200)
          return this.$message.error(`${res.meta.msg}`)
        this.$message.success(`登陆成功`)
        window, sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  position: relative;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatra_box {
    height: 120px;
    width: 120px;
    font-size: 0;
    border: 1px solid #eee;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 10px;
    margin: -50px auto 0 auto;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  width: 70%;
  margin: 30px auto 0 auto;
}
.login_btns {
  display: flex;
  justify-content: flex-end;
}
</style>
