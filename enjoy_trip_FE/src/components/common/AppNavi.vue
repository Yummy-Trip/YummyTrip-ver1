<template>
  <div>
    <b-navbar toggleable="lg" type="white" variant="white">
      <b-container>
        <b-navbar-brand @click="tog('/')">
          <img
            src="@/assets/img/마루와 로고.png"
            alt="로고"
            style="width: 350px; cursor: pointer"
          />
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <div class="collapse navbar-collapse justify-content-end">
            <b-navbar-nav class="mr-1" v-if="userInfo == null">
              <b-nav-item @click="tog('/SignIn')"> 로그인 </b-nav-item>
              <b-nav-text>|</b-nav-text>
              <!-- <b-nav-text</b-nav-text> -->
              <b-nav-item @click="tog('/SignUp')"> 회원가입 </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="mr-1" v-else>
              <b-nav-item class="user">
                <span><b>{{ userInfo.userName }}</b></span
                >님 반갑습니다.
              </b-nav-item>
              <b-nav-item @click="initSection('/mypage')">
                마이페이지
              </b-nav-item>
              <b-nav-text>|</b-nav-text>
              <b-nav-item @click="logout"> 로그아웃 </b-nav-item>
            </b-navbar-nav>
          </div>
        </b-collapse>
      </b-container>
    </b-navbar>
    <navi-side class="zidx"></navi-side>
  </div>
</template>

<script>
import NaviSide from "@/components/common/NaviSide.vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "AppNavi",
  computed: {
    ...mapState("userStore", ["userInfo"]),
    ...mapGetters("sideNavStore", ["getPath"]),
    ...mapMutations("sideNavStore", ["SET_PATH"]),
    changeTab() {
      return this.getPath;
    },
  },

  methods: {
    ...mapActions("userStore", ["userLogout"]),
    ...mapActions("myPageStore", ["setCurSection"]),
    ...mapActions("sideNavStore", ["changePath"]),
    async logout() {
      alert('로그아웃 했어 😙');
      await this.userLogout();
      this.$router.push("/");
      this.changePath("/");
    },
    initSection(link) {
      this.setCurSection("my-info");
      this.$router.push(link);
      this.changePath(link);
    },
    tog(link) {
      this.$router.push(link);
      this.changePath(link);
    },
  },
  components: {
    NaviSide,
  },
};
</script>



<style>
.nav-item .nav-link,
.navbar-text {
  color: black;
}

.nav-item .nav-link:visited {
  color: rgb(0, 0, 0);
}

.nav-item.user .nav-link {
  cursor: initial;
  font-weight: 400;
}

.zidx {
  z-index: 100;
  background-color: white;
}

body {
  -ms-overflow-style: none;
}
::-webkit-scrollbar {
  display: none;
}
</style>
