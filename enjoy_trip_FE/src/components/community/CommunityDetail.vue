<template>
  <div>
    <h1>게시물 상세 정보</h1>
    <div v-if="detailData">
      <h2>{{ detailData.title }}</h2>
      <p>{{ detailData.content }}</p>
    </div>
  </div>
</template>

<script>
// API 호출을 담당하는 함수를 import 합니다.
import { view } from "../../api/community.js"; // 실제 경로로 수정해주세요.

export default {
  name: "CommunityDetail",
  data() {
    return {
      detailData: null,
    };
  },
  async mounted() {
  const planId = this.$route.params.planId; // "id"로 변경해야 합니다. 라우트 매개변수 이름이 "planId"인지 확인해주세요.
    console.log(planId);
    await this.fetchDetailData(planId);
},
  methods: {
    async fetchDetailData(planId) {
      try {
        // `view` 함수는 planId를 인자로 받아 해당 게시물의 상세 정보를 가져오는 API 함수입니다.
        const response = await view(planId);
        this.detailData = response.data;
      } catch (error) {
        console.error("API 호출 중 에러 발생: ", error);
      }
    },
  },
};
</script>

<style>
/* 스타일 정의 */
</style>
