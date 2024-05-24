<template>
  <!-- <div>
    <div>
      <b-form-input type="password"></b-form-input>
      <b-button>Button</b-button>
    </div>
  </div> -->

  <div class="content-container">
    회원탈퇴를 하려면 비밀번호를 입력해주세요.
    <b-container>
      <b-form-group class="auth-input">
        <b-form-input
          type="password"
          v-model="pwd"
          style="display: inline"
        ></b-form-input>
        <b-button @click="auth" class="auth-btn">확인</b-button>
      </b-form-group>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import http from "@/api/http";
import router from "@/router";

export default {
  data() {
    return {
      pwd: "",
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    ...mapActions("userStore", ["userLogout"]),
    auth() {
      if (this.pwd == this.userInfo.userPwd) {
        if (confirm("정말 탈퇴할거야..? 😢")) {
          http
            .delete("/user/delete", { data: this.userInfo })
            .then(({ status }) => {
              if (status == 200) router.push("/");
              this.userLogout(this.userInfo.userId);
            });
            alert("다음에도 생각나면 들러줘 🤧");
        }
      } else alert("비밀번호가 다른 것 같은데?");
    },
  },
};
</script>

<style scoped>
.auth-input {
  width: 500px;
  margin: auto;
  /* border: 2px solid red; */
}

.auth-input input {
  margin-top: 10px;
  width: 300px;
  margin-right: 30px;
}

.auth-btn {
  background-color: white;
  color: black;
  border: 1px solid #F4E04E;
}

.auth-btn:hover,
.auth-btn:active,
.auth-btn:focus {
  background-color: #F4E04E !important;
}

.content-container {
  margin-top: 50px; /* 원하는 만큼의 여백을 설정 */
}
</style>
