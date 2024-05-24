<template>
  <div>
    <h1>커뮤니티 게시판</h1>
    <ul>
      <li v-for="item in listData" :key="item.id">
        <router-link :to="{ name: 'CommunityDetail', params: { id: item.communityid } }">
          <h2>{{ item.title }}</h2>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { list } from "../../api/community.js"; // 실제 경로로 수정해주세요.

export default {
  name: "CommunityList",
  data() {
    return {
      listData: [],
    };
  },
  async mounted() {
    await this.fetchListData();
  },
  methods: {
    fetchListData() {
      list(
        (response) => {
          this.listData = response.data;
        },
        (error) => {
          console.error("API 호출 중 에러 발생: ", error);
        }
      );
    },
  },
};
</script>

<style>
</style>
