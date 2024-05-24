<template>
  <div>
    <b-container class="content-container">
      <h2>{{ userInfo.userName }}</h2>
      <p>이메일: {{ userInfo.userId }}</p>
      <p>가입일자: {{ userInfo.joinDate }}</p>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
};
</script>

<style scoped>
.content-container {
  margin-top: 50px; /* 원하는 만큼의 여백을 설정 */
}
</style>
