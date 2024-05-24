<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron header-level="4">
      <template #header>자유게시판</template>

      <template #lead>
        서로의 여행 이야기를 공유할 수 있습니다.
      </template>

      <hr class="my-4" />

      <b-button
        class="move-btn float-right"
        pill
        variant="outline"
        @click="movePage"
      >게시판 글쓰기</b-button>
    </b-jumbotron>

    <router-view></router-view>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "CommunityVue",
  created() {
    this.getContentList(); // getContentList 메소드 호출
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  watch: {
    $route: {
      handler() {
        this.updateButton();
      },
    },
    userInfo: {
      handler() {
        this.updateButton();
      },
    },
  },
  mounted() {
    this.updateButton();
  },
  methods: {
    ...mapActions("community", ["getContentList"]),
    movePage() {
      if (this.$route.path == "/community/list") {
        this.$router.push({ name: "communitywrite" });
      } else {
        this.$router.push({ name: "communitylist" });
      }
    },
    updateButton() {
      const moveBtn = document.querySelector(".move-btn");
      if (this.userInfo == null) {
        moveBtn.setAttribute("style", "display:none");
      } else {
        moveBtn.removeAttribute("style");
        if (this.$route.path == "/community/list" || this.$route.path == "/community/list") {
          moveBtn.innerHTML = "게시판 글쓰기";
        } else {
          moveBtn.innerHTML = "목록으로 돌아가기";
        }
      }
    }
  },
};
</script>

<style scoped>
.bv-example-row {
  text-align: left;
}
.btn {
  margin-right: 1rem;
  color: #F4E04E;
  border: 1px solid #F4E04E;
}
.btn:hover {
  color: white;
  background-color: #F4E04E; /* border: 1px solid #007e4b; */
}
p {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
