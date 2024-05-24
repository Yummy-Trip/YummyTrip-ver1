<template>
  <div>
    <!-- 회원가입 -->
    <b-container v-if="user">
      <div class="signform shadow-lg p-3 mb-5 bg-white rounded">
        <img src="../../assets/img/회원가입.png" alt="" width="80%" />
        <h4>회원가입</h4>
        
        <!-- 이메일 -->
        <b-form-group
          label="이메일"
          label-cols-sm="3"
          valid-feedback=""
          :state="checkEmail"
          :invalid-feedback="invalidEmail"
          style="text-align: left"
        >
          <b-form-input
            type="email"
            v-model="user.userId"
            :state="checkEmail"
            debounce="100"
            trim
          ></b-form-input>
        </b-form-group>

        <!-- 닉네임 -->
        <b-form-group
          label="닉네임"
          label-cols-sm="3"
          valid-feedback=""
          :state="checkName"
          :invalid-feedback="invalidName"
          style="text-align: left"
        >
          <b-form-input
            type="text"
            v-model="user.userName"
            :state="checkName"
            debounce="100"
            trim
          ></b-form-input>
        </b-form-group>

        <!-- 비밀번호 유효성 검사 -->
        <b-form-group
          label="비밀번호"
          label-cols-sm="3"
          :state="checkPwd"
          invalid-feedback="특수문자($,@,$,!,%,*,#,?,&)와 문자를 포함한 6~16글자여야 합니다."
          style="text-align: left"
        >
          <b-form-input
            type="password"
            v-model="user.userPwd"
            :state="checkPwd"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="비밀번호 확인"
          label-cols-sm="3"
          :state="dblcheckPwd"
          invalid-feedback="비밀번호가 같지 않습니다."
          style="text-align: left"
        >
          <b-form-input
            type="password"
            v-model="isPwd"
            :state="dblcheckPwd"
          ></b-form-input>
        </b-form-group>

        <button
          class="btn mb-3 mt-3"
          variant="primary"
          @click="signup"
          :disabled="availableSignup"
        >
          회원가입
        </button>
      </div>
    </b-container>
  </div>
</template>

<script>
import http from "@/api/http";
// /^\w*@\w*\.[a-zA-Z]{2,3}$/

export default {
  name: "SignUp",
  data() {
    return {
      user: {
        userId: "",
        userName: "",
        userPwd: "",
        joinDate: null,
      },
      isUser: 0,
      isName: 0,
      isPwd: "",
    };
  },
  computed: {
    checkEmail() {
      if (this.isUser == 0 && this.user.userId == "") return null;
      if (/^\w*@\w*\.[a-zA-Z]{2,3}$/.test(this.user.userId)) {
        this.checkEmailOnServer();
        if (this.isUser == 1) return false;
        return true;
      } else return false;
    },
    invalidEmail() {
      if (this.isUser == 1) return "사용할 수 없는 이메일입니다.";
      return "이메일을 입력 해주세요.";
    },
    checkName() {
      if (this.isName == 0 && this.user.userName == "") return null;
      if (this.user.userName.length >= 2 && this.user.userName.length <= 6) {
        this.checkNameOnServer();
        if (this.isName == 1) return false;
        return true;
      } else return false;
    },
    invalidName() {
      if (this.isName == 1) return "사용할 수 없는 닉네임입니다.";
      return "닉네임은 2자 이상 6자 이하여야합니다.";
    },
    checkPwd() {
      if (this.user.userPwd == "") return null;
      if (
        /^(?=.*[A-Za-z])(?=.*[$@$!%*#?&])[A-Za-z\d$@!%*#?&]{6,16}$/.test(
          this.user.userPwd
        )
      ) {
        return true;
      } else return false;
    },
    dblcheckPwd() {
      if (this.isPwd == "") return null;
      if (this.user.userPwd == this.isPwd) return true;
      return false;
    },
    availableSignup() {
      if (
        this.user.userId != "" &&
        this.user.userPwd != "" &&
        this.user.userName != "" &&
        this.isUser == 0 &&
        this.isName == 0 &&
        this.isPwd == this.user.userPwd
      )
        return false;
      return true;
    },
  },
  methods: {
    // 이메일 중복체크
    checkEmailOnServer() {
      http
        .post("user/idcheck", this.user)
        .then((data) => (this.isUser = data.data));
    },
    // 닉네임 중복체크
    checkNameOnServer() {
      http
        .post("user/namecheck", this.user)
        .then((data) => (this.isName = data.data));
    },
    signup() {
      http.post("/user/regist", this.user).then((data) => {
        if (data.status == 200) {
          alert("야호! 야미트립에 온걸 환영해 👏🏼");
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

<style scoped>
.signform {
  width: 600px;
  border: 1px solid rgba(0, 0, 0, 0.068);
  margin: 50px auto;
  height: 600px;
  padding: 30px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  /* justify-content: space-around; */
  /* box-shadow: ; */
}

.signform img {
  margin: 0 auto;
  transform: translate(0, 10px);
}

.signform * {
  justify-content: center;
  /* margin: auto; */
}

.signform img {
  width: 200px;
}
.form-group {
  /* background-color: red; */
  width: 400px;
  margin: 0 auto;
  transform: translateY(-5px);
  justify-content: center;
}

.btn {
  background-color: white;
  width: 300px;
  margin: 0 auto;
  transform: translateY(-10px);
  color: black;
  /* font-weight: 700; */
  border: 1px solid #F4E04E;
}

.btn:hover,
.btn:active,
.btn:visited,
.btn:focus {
  background-color: #F4E04E;
  color: white;
  border: 1px solid #008550;
}

.findPwd {
  /* display: block;
  transform: translateY(-4px); */
  cursor: pointer;
  /* background-color: red; */
}

.findPwd:hover {
  font-weight: 700;
  /* color: #F4E04E; */
}
</style>
