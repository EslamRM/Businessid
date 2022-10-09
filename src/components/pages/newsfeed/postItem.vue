<template>
  <div v-if="feed.title != '' || feed.link != null || feed.files.length >= 1">
    <div class="post-item-box">
      <postHeader :feed="feed" :model="model"></postHeader>
      <div class="post-content-bx">
        <div class="relative">
          <sliderBox :feed="feed"></sliderBox>
        </div>
      </div>
      <div class="post-reaction-box">
        <reactionBox :feed="feed"></reactionBox>
      </div>
    </div>
  </div>
</template>
<script>
import sliderBox from "./sliderBox";
import reactionBox from "./reactionBox";
import postHeader from "./postHeader";

export default {
  components: {
    sliderBox,
    reactionBox,
    postHeader
  },
  props: ["feed", "model"],
  data() {
    return {
      color: "red"
    };
  },
  methods: {
    randomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
  // handleRectionEmit()
  // {
  //   console.log("emit post item")
  // }
};
</script>

<style scoped>
.post-item-box {
  background: #fff;
  /* border: 1px solid #e4e4e4; */
  border-radius: 3px;
  margin-top: 10px;
  background: #fff;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
}
.post-content-bx {
  color: #fff;
  text-align: center;
  font-weight: 483px;
}
.relative {
  position: relative;
}

@media screen and (max-width: 1000px) {
  .post-item-box {
    margin-top: 20px;
  }

  .post-item-box {
    border-radius: 0px;
  }
}

@media screen and (max-width: 600px) {
  .post-item-box {
    margin-top: 10px;
  }

  .post-item-box {
    border-radius: 0px;
  }
}
</style>
