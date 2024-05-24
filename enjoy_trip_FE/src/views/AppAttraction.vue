<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron header-level="4">
      <template #header>관광지</template>

      <template #lead>
        내가 원하는 위치의 여러 장소들을 확인할 수 있어요.
      </template>

      <hr class="my-4" />

      <b-button
        class="move-btn float-right"
        pill
        variant="outline"
        @click="movePage"
        >지도로 찾을래</b-button>
    </b-jumbotron>

    <b-row>
      <b-col><attraction-search-bar></attraction-search-bar></b-col>
    </b-row>

    <router-view></router-view>
  </b-container>
</template>

<script>
import AttractionSearchBar from "@/components/attraction/AttractionSearchBar.vue";

export default {
  name: "AppAttraction",
  components: {
    AttractionSearchBar,
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.path == "/attraction/list")
          document.querySelector(".move-btn").innerHTML = "지도로 찾을래";
        else document.querySelector(".move-btn").innerHTML = "목록으로 찾을래";
      },
    },
  },
  mounted() {
    if (this.$route.path == "/attraction/list")
      document.querySelector(".move-btn").innerHTML = "지도로 찾을래";
    else document.querySelector(".move-btn").innerHTML = "목록으로 찾을래";
  },
  methods: {
    movePage() {
      if (this.$route.path == "/attraction/list") {
        this.$router.push({ name: "attractionmap" });
      } else {
        this.$router.push({ name: "attractionlist" });
      }
    },
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
