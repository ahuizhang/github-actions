<template>
  <div class="login">
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="loginForm"
          status-icon
          :rules="loginRules"
          ref="loginRules"
          label-width="60px"
        >
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="loginForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loginSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form
          :model="registerForm"
          status-icon
          :rules="registerRules"
          ref="registerRules"
          label-width="80px"
        >
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="registerForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="registerForm.checkPass"
            ></el-input>
          </el-form-item>
          <el-form-item label="昵名" prop="realName">
            <el-input v-model="registerForm.realName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%" @click="register"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { login, register } from "../utlis/api";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "login",
      registerForm: {
        mobile: "",
        password: "",
        checkPass: "",
        realName: "",
      },
      loginForm: {
        mobile: "",
        password: "",
      },
      registerRules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        realName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
      loginRules: {
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations(["saveUserInfoToken"]),
    loginSubmit() {
      this.$refs["loginRules"].validate((valid) => {
        if (!valid) return false;
        login(this.loginForm).then((res) => {
          if (res.code === 0 && res.data) {
            this.$message({
              message: "登入成功",
              type: "success",
            });
            this.saveUserInfoToken(res.data);
            this.$router.push("/");
          }
        });
      });
    },
    register() {
      this.$refs["registerRules"].validate((valid) => {
        if (!valid) return false;
        register(this.registerForm).then((res) => {
          console.log(res);
          if (res.code === 0 && res.data) {
            localStorage.setItem("userInfo", res.data);
          }
        });
      });
    },
  },
  computed: {
    ...mapState(["token", "userInfo"]),
  },
};
</script>

<style>
.login {
  margin: 20vh auto;
  width: 300px;
}
</style>
