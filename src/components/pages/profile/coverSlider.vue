<template>
  <div v-if="profile.banners.length">
    <div class="cover-slider forProfile">
      <carousel
        :perPage="1"
        :autoplay="false"
        :autoplayHoverPause="true"
        :paginationEnabled="false"
        easing="linear"
        :loop="true"
        :navigationEnabled="true"
        navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
        navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
        :speed="750"
        :interval="1000"
        :autoplayTimeout="7000"
      >
        <slide v-for="banner in profile.banners" :key="banner.id">
          <img :src="banner.file" alt />
        </slide>
      </carousel>
    </div>
  </div>
  <div v-else>
    <div class="cover-slider">
      <carousel
        class="myclsass"
        :perPage="1"
        :autoplay="false"
        :autoplayHoverPause="true"
        :paginationEnabled="false"
        easing="linear"
        :loop="true"
        :navigationEnabled="true"
        navigationNextLabel="<i class='material-icons'>navigate_next</i>"
        navigationPrevLabel="<i class='material-icons'>navigate_before</i>"
      >
        <slide>
          <div class="bannerHolder">
            <img src="../../../assets/images/banner_default.jpg" />
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { Carousel, Slide } from "vue-carousel";
export default {
  components: {
    Carousel,
    Slide
  },
  props: ["profile"],
  data () {
    return {};
  },
  computed: {
    ...mapState({

      LoggedUser: state => state.user.profile
    })
  },
  //    watch: {
  //   'profile' : function(newVal,oldVal) {

  //     console.log("watcher header")
  //      if(oldVal!=undefined )
  //     {
  //       if(oldVal.userid!=newVal.userid)
  //       {
  //         this.dataIsLoaded=true
  //       }
  //        this.dataIsLoaded=true
  //     }else{
  //       this.dataIsLoaded=true
  //     }
  //   }
  // },
  created () { }
};
</script>
<style scoped>
.ct-profile-cover {
  margin: -1px -1px 0;
  display: block;
}
.cover {
  display: block;
  position: relative;
}
.cover-slider {
  /* display: block;
  position: relative;
  height: 315px;
  overflow: hidden;
  text-decoration: none; */
  position: relative;
  width: 100%;
  padding-bottom: 29%;
}
.VueCarousel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
.VueCarousel-slide {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  height: 351px;
}
.cover-slider img {
  image-rendering: optimizeQuality;
  min-width: 100%;
  position: relative;
  width: 100%;
}
.bannerHolder {
  width: 100%;
  height: 100vh;
  position: relative;
}
.fitIt {
  position: absolute;
  left: 0;
  top: 0px;
  width: 100%;
  border: 0;
}

@media screen and (max-width: 600px) {
  .cover-slider {
    padding-bottom: 40%;
  }

/* .cover-slider img {
    height: 185px !important;

} */

}

@media screen and (max-width: 300px) {
  .cover-slider {
    padding-bottom: 45%;
  }


}
</style>
