<template>
  <div
    class="md-layout md-alignment-center-center section"
    v-if="
      (post && post[0].files.length) ||
        (post && post[0].title != null) ||
        (post && post[0].link != null)
    "
  >
    <div
      class="md-layout-item md-xsmall-size-100 md-small-size-70 md-size-40 post-item-box"
    >
      <postHeader :feed="post[0]"></postHeader>
      <div class="post-content-bx">
        <sliderBox :feed="post[0]"></sliderBox>
      </div>
      <div class="post-reaction-box">
        <reactionBox :feed="post[0]"></reactionBox>
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
  },
  computed: {
    post() {
      return this.$store.getters.getsignlePost;
    }
  },
  created() {
    const id = this.$route.params.id;
    this.$store
      .dispatch("getPost", id)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }
};
</script>
<style scoped>
.section {
  margin: 15px;
}
.post-item-box {
  background: #fff;
  border: 1px solid #e4e4e4;
  border-radius: 3px;
  margin-top: 10px;
  background: #fff;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding-bottom: 10px;
}
.post-content-bx {
  color: #fff;
  text-align: center;
  font-weight: 483px;
}
.container {
  width: 600px;
  margin: 0px auto;
}
</style>
