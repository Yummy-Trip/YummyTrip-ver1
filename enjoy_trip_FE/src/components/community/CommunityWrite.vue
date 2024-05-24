<template>
  <div>
    <h1>게시물 작성</h1>
    <form @submit.prevent="submitContent">
      <div>
        <label for="title">제목:</label>
        <input type="text" id="title" v-model="title" required />
      </div>
      <div>
        <label for="content">내용:</label>
        <textarea id="content" v-model="content" required></textarea>
      </div>
      <button type="submit">작성</button>
    </form>
  </div>
</template>

<script>
import { content } from "../../api/community.js"; // 실제 경로로 수정해주세요.
import {  mapState } from "vuex";
export default {
  name: "CommunityBoardWrite",
  data() {
    return {
      title: "",
      content: "",
      postData: ({}),
    };
  },

  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  methods: {
    async submitContent() {
      const postData = {
        title: this.title,
        content: this.content,
        userId: this.userInfo.userId,
      };

      try {
        const response = await content(postData);
        console.log("게시물이 성공적으로 작성되었습니다:", response);
        this.$router.push({ name: 'CommunityList' }); // 'CommunityList'는 실제 라우트 이름으로 변경하세요.
        // 필요 시 작성 후 리스트 페이지로 이동 등 추가 처리
        return response;
      } catch (error) {
        console.error("게시물 작성 중 에러 발생:", error);
        throw error;
      }
    },
  },
}
</script>

<style>

</style>
