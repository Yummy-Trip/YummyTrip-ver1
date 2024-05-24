<template>
  <div class="randCon">
    <div class="anime" ref="pop">
      <b-card
        overlay
        :img-src="`${attraction.firstImage}`"
        img-alt="Card Image"
        class="randCard animate__animated animate__faster"
        ref="card"
      >
        <div class="gray">
          <div class="suggestion">
            여긴 어때? 마루가 골라봤어
            <b-button variant="success" @click="anotherAttraction" class="btn">
              다른 곳도 볼래
            </b-button>
          </div>
          <p class="title">{{ attraction.title }}</p>
          <p class="addr">{{ attraction.addr1 }} {{ attraction.addr2 }}</p>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";
import "animate.css";
// import axios from 'axios';
// import { xml2js } from 'xml-js';

export default {
  name: "RandomAttraction",
  
  data() {
    return {
      attraction: {
        title: "",
        addr1: "",
        addr2: "",
        contentTypeName: "",
        firstImage: require("@/assets/img/내가 이미지 가져올게.gif")
      },
    };
  },
  methods: {
    async anotherAttraction() {
      this.newRandAttraction();

      //console.log(this.$refs.card.classList)
      // 이거 어떻게 넣어
      // background-image = url("../../assets/img/마루가 찾아올게.gif");
      this.attraction.firstImage = require("@/assets/img/내가 이미지 가져올게.gif")

      let sido;
      let gugun;

      await http
        .get("/attraction/sido")
        .then((data) => data.data)
        .then(
          (list) =>
            (sido =
              list[Math.floor(Math.random() * (list.length - 0) + 0)].areaCode)
      );
        
      await http
        .get(`/attraction/sido/${sido}`)
        .then((data) => data.data)
        .then(
          (list) =>
            (gugun =
              list[Math.floor(Math.random() * (list.length - 0) + 0)]
                .sigunguCode)
      );
        
      await http
        .get(`/attraction/randlist?areaCode=${sido}&gunguCode=${gugun}`)
        .then((data) => data.data)
        .then(
          (list) =>
            (this.attraction =
              list[Math.floor(Math.random() * (list.length - 0) + 0)])
      );
      // this.attraction.firstImage = require("@/assets/img/사진이 없나봐.png")
      // this.attraction.firstImage = ''
      this.attraction.firstImage = this.attraction.firstImage ? this.attraction.firstImage : require('@/assets/img/사진이 없나봐.png');
      console.log('this.attraction.firstImage : ', this.attraction.firstImage)
      // 이미지가 로드되었는지 확인

        
      // // API 요청 solution; 이미지 렌더링이 느려서 보류...
      // axios.get('https://apis.data.go.kr/B551011/KorService1/areaBasedList1', {
      //   params: {
      //     numOfRows: 200,
      //     MobileOS: 'WIN',
      //     MobileApp: 'YummyTrip',
      //     serviceKey: '41ieiBlbJsECjBHlFV9ftbCernoqMMKpsbPZKI97vzbRGXamybDPqAPqIvoXuQziBNaIrdWk7X8h9BW5f2PZgg=='
      //   }
      // })
      // .then(response => {
      //   const xmlData = response.data;
      //   const jsonData = xml2js(xmlData, { compact: true });

      //   const items = jsonData.response.body.items.item;
      //   const randomIndex = Math.floor(Math.random() * items.length);
      //   const randomItem = items[randomIndex];

      //   console.log('randomItem : ', randomItem)
      //   console.log('img : ', randomItem.firstimage)
      //   this.attraction.title = randomItem.title._text;
      //   this.attraction.addr1 = randomItem.addr1._text;
      //   this.attraction.addr2 = randomItem.addr2._text;
      //   this.attraction.firstImage = randomItem.firstimage && randomItem.firstimage._text ? randomItem.firstimage._text : require('@/assets/img/사진이 없나봐.png');
      // })
      // .catch(error => {
      //   console.error('Error fetching data:', error);
      // });
    },
    newRandAttraction() {
      let cardStyle = this.$refs.card.classList;
      cardStyle.remove("animate__fadeInRightBig");
      cardStyle.add("animate__fadeOutLeftBig");
      setTimeout(() => {
        cardStyle.remove("animate__fadeOutLeftBig");
        cardStyle.add("animate__fadeInRightBig");
      }, 1000);
    },
  },
  async mounted() {
    this.anotherAttraction();
  },
};

</script>

<style scoped>
.flex-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#info {
  text-align: left;
}

.desc {
  font-size: 1.2em;
}

.card-footer {
  display: flex;
  justify-content: space-around;
  position: fiexd;
  bottom: 0;
}

.card-box-cus {
  position: relative;
  width: 800px;
  height: 400px;
  padding-top: 8px;
}

.randCard {
  width: 100%;
  height: 880px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}

.gray {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.527);
  color: white;
}

.zidx {
  z-index: 5;
}

.randCardBg {
  margin: 0;
}

.btn,
.btn:focus {
  margin-left: 10px;
  background-color: rgba(255, 255, 255, 0);
  color: white;
  border: 1px solid #F4E04E;
}

.btn:hover,
.btn:active {
  background-color: #F4E04E;
  border: 1px solid #F4E04E;
}
.btn:focus {
  box-shadow: none;
}

.title {
  text-align: start;
  font-size: 80px;
  margin-left: 220px;
  margin-top: 80px;
}

.addr {
  text-align: start;
  font-size: 40px;
  margin-left: 230px;
}

.anime {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 880px;
  background-image: url("../../assets/img/마루가 찾아올게.gif");
}

.poplogo {
  position: absolute;
  width: 400px;
  top: calc(50% - 150px);
  left: calc(50% - 200px);
}

.suggestion {
  text-align: start;
  font-size: 20px;
  margin-left: 230px;
  margin-top: 80px;
}
</style>
