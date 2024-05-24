<template>
  <b-container>
    <b-row>
      <b-col sm="3">
        <b-list-group ref="selectors" class="menu">
          <b-list-group-item
            @click="changeSide('my-info')"
            id="my-info"
            class="my-btn"
          >
            내 정보
          </b-list-group-item>
          <b-list-group-item
            @click="changeSide('modify-info')"
            id="modify-info"
          >
            개인정보 수정
          </b-list-group-item>
          <b-list-group-item
            @click="changeSide('delete-user')"
            id="delete-user"
          >
            회원 탈퇴
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col sm="9">
        <my-page-content></my-page-content>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import MyPageContent from "@/components/mypage/MyPageContent.vue";
import { mapActions, mapGetters } from "vuex";

const myPageStore = "myPageStore";

export default {
  components: { MyPageContent },
  computed: {
    ...mapGetters(myPageStore, ["getSection"]),
    changeNav: function () {
      return this.getSection;
      // console.log(curSection);
    },
  },
  methods: {
    ...mapActions(myPageStore, ["setCurSection"]),
    changeSide(mode) {
      this.setCurSection(mode);
    },
  },
  watch: {
    changeNav(value) {
      for (const item of this.$refs.selectors.children) {
        if (item.id == value) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      }
    },
  },
  mounted() {
    for (const item of this.$refs.selectors.children) {
      if (item.id == this.getSection) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  },
};
</script>

<style scoped>
.container {
  position: relative;
  top: 50px;
}
.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  color: #F4E04E;
}

.list-group-item.active {
  background-color: #F4E04E;
  border: 1px solid #009258;
  font-weight: 700;
}

.list-group-item.active:hover {
  color: white;
}

.menu {
  margin-top: 30px; /* 원하는 만큼의 여백을 설정 */
}
</style>