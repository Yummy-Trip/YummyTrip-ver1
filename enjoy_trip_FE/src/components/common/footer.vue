<template>
  <div id="app" class="flex-container">
    <!-- Other content -->
    <div class="content">
      <!-- Your main content goes here -->
    </div>

    <!-- Footer -->
    <mdb-footer class="font-small pt-4 mt-4 shadow mdb-footer">
      <mdb-container>
        <mdb-row>
          <mdb-col md="6">
            <img
              src="@/assets/img/logo_keyColor.png"
              alt="로고"
              style="width: 300px"
            />
          </mdb-col>
          <mdb-col md="6">
            <p>
              상호명 (주)야미트립 | 대표 SSAFY 11기 서울 15반 이용재, 박소미 <br>
              주소 서울특별시 강남구 테헤란로 212, 멀티캠퍼스 역삼 (역삼동) <br>
              Copyright 2024. 이용재, 박소미 All Rights Reserved.
            </p>
          </mdb-col>
        </mdb-row>
      </mdb-container>
    </mdb-footer>
  </div>
</template>

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "FooterPage",
  components: { mdbFooter, mdbContainer, mdbRow, mdbCol },
};
</script>

<style scoped>
p {
  color: #666666;
}

html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 44.3vh;
}

.content {
  flex: 1;
}

.mdb-footer {
  width: 100%;
  background-color: #FFFBE5;
}
</style>
