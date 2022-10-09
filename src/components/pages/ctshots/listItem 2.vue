<template>
  <div>
    <div class="shot-box" v-for="(post, index) in postData" :key="index">
      <AppPhoto v-if="post.type == 'image'" :model="model" :photos="post" />

      <AppVideo v-if="post.type == 'video'" :model="model" :photos="post" />
    </div>
  </div>
</template>
<script>
import AppPhoto from "./appPhoto";
import AppVideo from "./appVideo";
export default {
  props: ["posts","model"],
  components: { AppPhoto, AppVideo },
  data() {
    return {
        postData:[],
    };
  },
  watch: {
      'posts':function(newval,oldVal){
          if(newval)
          {
            //   console.log("post data")
            // console.log(this.postData)
            //   console.log("newval")
            //   console.log(newval)
           
            //     this.postData = newval
          }
      }
  },
  created() {
      this.postData = this.posts
  },

};
</script>
<style scoped>
.masonry-grd {
  column-count: 5;
  column-gap: 12px;
}
.ti-input[data-v-61d92e31] {
  border: none;
}
.masonry-grd-item {
  display: inline-block;
  margin: 0 0 12px;
  width: 100%;
  background: #fff;
  padding: 10px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding-bottom: 10px;
  position: relative;
  transition: 0.5s;
}
.masonry-grd-item:hover {
  cursor: pointer;
  transition: 0.5s;
}
.myclass div:first-child {
  border: none !important;
}
.vue-tags-input {
  max-width: 100%;
  width: 100%;
  border: none;
}

.masonry-grd-item:hover:after {
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s;
  border-radius: 10px;
}
.ti-tag {
  background-color: red !important;
}
.bx-ch-12 {
  display: inline-flex;
}
.shot-box {
  cursor: pointer;
}
.shots-wrap .shot-box .fill {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
.mansory-grd-bx {
  margin-top: 15px;
}
.shots-wrap.video-holder-wrap {
  grid-auto-rows: auto;
}
.loader {
  position: relative;
  padding: 35px 0px;
}
.file_type_wrap {
  display: inline-flex;
  width: 100%;
}
.file_type {
  /* width: 44%;  */
  padding-top: 10px;
  display: inline-flex;
}
.radio-pill {
  display: inline-flex;
  padding: 9px 5px;
}
.radio-pill .md-radio.md-theme-default.md-checked[data-v-e9275114] {
  background: #f7c8b8;
  color: #fff;
}
.radio-pill .md-radio .md-radio-label {
  padding-left: 9px;
}
.radio-pill .md-radio {
  width: auto;
  margin: 7px 7px 7px 0;
  display: inline-flex;
  position: relative;
  padding: 11px 15px;
  border-radius: 32px;
  background-color: rgb(255, 255, 255);
}
.circle-loader {
  position: absolute;
  bottom: 0;
  left: 50%;

  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.bx-tp-12-ch {
  background: #fff;
  padding: 14px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  display: inline-flex;
  width: 100%;
}
.bx-ch-11 {
  width: 100%;
}
.tag-wrap {
  width: 47%;
  display: inline-flex;
  margin-left: 2%;
  align-items: center;
  justify-content: flex-end;
}
.author img {
  border-radius: 50% !important;
}
</style>
