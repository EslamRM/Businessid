<template>
  <div>
    <div
      class="sldr-bx-wrp-1 feedImageContainer"
      v-if="feed.post_type == 'post' && feed.files.length"
    >
      <div class="imageLink">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="file in feed.files" :key="file.pk_post_file_id">
            <div class="attrImgWrapper">
              <img
                v-if="file.type == 'image'"
                :src="file.file"
                alt=""
                class="feedImageView"
              />

              <VideoPlayer v-else-if="file.type == 'video'" :video="file">
              </VideoPlayer>
            </div>
          </swiper-slide>
          <div
            v-if="feed.files.length > 1"
            class="swiper-pagination"
            slot="pagination"
          ></div>
          <div
            v-if="feed.files.length > 1"
            class="swiper-button-prev"
            slot="button-prev"
          ></div>
          <div
            v-if="feed.files.length > 1"
            class="swiper-button-next"
            slot="button-next"
          ></div>
        </swiper>
        <!-- -------------------------------------------- -->
        <!-- Old Slider - Kept for Backup Purpose -->
        <!-- -------------------------------------------- -->
        <!-- <carousel
          :mouseDrag="false"
          :touchDrag="false"
          :autoplayHoverPause="false"
          :mouse-drag="false"
          :adjustableHeight="true"
          :perPage="1"
          :paginationSize="8"
          paginationActiveColor="#213a63"
          paginationColor="#e4e4e4"
          easing="linear"
          :loop="true"
          :navigationEnabled="true"
          navigationNextLabel="<i class='material-icons btn-nav-1'>keyboard_arrow_right</i>"
          navigationPrevLabel="<i class='material-icons btn-nav-1'>keyboard_arrow_left</i>"
        >
          <slide v-for="file in feed.files" :key="file.pk_post_file_id">
            <div class="attrImgWrapper">
              <img
                v-if="file.type == 'image'"
                :src="file.file"
                alt=""
                class="feedImageView"
              />

              <VideoPlayer v-else-if="file.type == 'video'" :video="file">
              </VideoPlayer>
            </div>
          </slide>
        </carousel> -->
      </div>
    </div>
    <div v-else-if="feed.post_type == 'youtube'">
      <iframe width="100%" height="270px" :src="feed.link"></iframe>
    </div>

    <div v-else-if="feed.post_type == 'checkin' && feed.files.length">
      <swiper ref="mySwiper" :options="swiperOptions">
        <swiper-slide v-for="file in feed.files" :key="file.pk_post_file_id">
          <img
            v-if="file.type == 'image'"
            :src="file.file"
            alt=""
            style="width: 100%; height: 100%; object-fit: cover"
          />

          <VideoPlayer v-else-if="file.type == 'video'" :video="file">
          </VideoPlayer>
        </swiper-slide>
        <div
          v-if="feed.files.length > 1"
          class="swiper-pagination"
          slot="pagination"
        ></div>
        <div
          v-if="feed.files.length > 1"
          class="swiper-button-prev"
          slot="button-prev"
        ></div>
        <div
          v-if="feed.files.length > 1"
          class="swiper-button-next"
          slot="button-next"
        ></div>
      </swiper>
      
      <!-- -------------------------------------------- -->
      <!-- Old Slider - Kept for Backup Purpose -->
      <!-- -------------------------------------------- -->
      <!-- <carousel
        :adjustableHeight="true"
        :autoplayHoverPause="false"
        :mouseDrag="false"
        :touchDrag="false"
        :mouse-drag="false"
        :perPage="1"
        :paginationSize="8"
        paginationActiveColor="#213a63"
        paginationColor="#e4e4e4"
        easing="linear"
        :loop="true"
        :navigationEnabled="true"
        navigationNextLabel="<i class='material-icons btn-nav-1'>keyboard_arrow_right</i>"
        navigationPrevLabel="<i class='material-icons btn-nav-1'>keyboard_arrow_left</i>"
      >
        <slide v-for="file in feed.files" :key="file.pk_post_file_id">
          <img
            v-if="file.type == 'image'"
            :src="file.file"
            alt=""
            style="width: 100%; height: 100%; object-fit: cover"
          />

          <VideoPlayer v-else-if="file.type == 'video'" :video="file">
          </VideoPlayer>
        </slide>
      </carousel> -->
    </div>
    <div v-else-if="feed.post_type == 'checkin' && !feed.files.length">
      <GmapMap
        :center="center(feed)"
        :zoom="12"
        style="width: 100%; height: 400px"
      >
        <GmapMarker :position="center(feed)" />
      </GmapMap>
    </div>
    <div v-else-if="feed.post_type == 'link'">
      <a :href="feed.link" target="_blank">
        <div class="lnk-preview">
          <div class="card">
            <div class="img-wrapper-prev-url">
              <img
                v-if="prev && prev.image"
                class="card-img-top"
                :src="prev.image"
                :alt="prev.title"
              />
              <a v-else href="url">{{ prev.url }}</a>
            </div>
            <div class="card-block">
              <p class="prev-text">{{ prev.title }}</p>
              <h4
                class="card-title"
                v-if="prev.description != null && prev.description.length > 160"
              >
                {{ prev.description.substring(0, 150) + "..." }}
              </h4>
              <h4 class="card-title" v-else>
                {{ prev.description }}
              </h4>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div
      class="post"
      :style="{ backgroundColor: randomColor() }"
      v-else-if="feed.post_type == 'post' && !feed.files.length"
    >
      <span>{{ feed.title }}</span>
    </div>
  </div>
</template>
<script>
import { Carousel, Slide } from "vue-carousel";
import VideoPlayer from "../../../components/VideoPlayer";
import axios from "axios";

import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";

// import style (<= Swiper 5.x)
import "swiper/css/swiper.css";

export default {
  props: ["feed"],
  components: {
    VideoPlayer,
    Carousel,
    Slide,

    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive,
  },
  data() {
    return {
      prev: "",
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",

          // bulletActiveClass: "gray-bullets",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        autoHeight: true,
        // Some Swiper option/callback...
      },
      icon: {
        url: "https://www.google.dk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        size: { width: 46, height: 46, f: "px", b: "px" },
        scaledSize: { width: 23, height: 23, f: "px", b: "px" },
      },
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
    },

    checkData(data) {
      return data;
      // if(/^<.*?>$/.test(data) && !!$(data)[0])
      // {
      //   return "true";
      // }
      // else{
      //   return "false";
      // }
    },
    checkIsUrl(url) {
      console.log(url);
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(url);
    },
    center(feed) {
      return { lat: feed.location.latitude, lng: feed.location.longitude };
    },
    getPre(link) {
      return new Promise((resolve, reject) => {
        axios
          .post("post-url-preview", {
            url: link,
          })
          .then((response) => {
            resolve(response.data);
            if (response.data.success) this.prev = response.data.result;
            // this.prev = response.data;
            console.log(response.data);
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },
  },
  created() {
    if (this.feed.post_type == "link") {
      this.getPre(this.feed.link);
    }
    //console.log("created slider");
    var resizeEvent = window.document.createEvent("UIEvents");
    resizeEvent.initUIEvent("resize", true, false, window, 0);
    window.dispatchEvent(resizeEvent);
  },

  computed: {
    profileUrl() {
      return this.$store.getters.getProfileUrl;
    },
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },

    // center:function(data){
    //   return {"lat":,"long":}
    // }
  },
};
</script>

<style scoped>
.post {
  width: 100%;
  padding: 15px;
  font-size: 25px;
  line-height: 35px;
}
.VueCarousel-wrapper img {
  object-fit: cover;
}
.img-wrapper-prev-url {
  height: 100%;
  left: 0%;
  width: calc(100%);
}
.card-title {
  color: #d0d0d0;
  font-size: 18px;
  padding-bottom: 10px;
}
.prev-text {
  color: #c5c5c5;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 10px;
  text-transform: uppercase;
}
.card-img-top {
  vertical-align: middle;
  border-style: none;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-radius: 0px;
}
.card-block {
  background-color: #3a3b3c;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding: 10px;
  text-align: left;
}

/* 
Vue Awesome Swiper Navigation CSS
---------------------------------- 
*/

/* Uncomment for Bullet Paginations */

/* .swiper-pagination {
  position: unset;
} */
.swiper-container{
  z-index: 0;
}
.swiper-pagination {
  position: absolute;
  /* background-color: #575757bd; */
  background-color: #ffffffbd;
  color: black;
  width: max-content;
  top: 10px;
  right: 10px;
  bottom: unset;
  left: unset;
  padding: 4px 8px;
  border-radius: 11px;
  font-size: smaller;
}

.swiper-button-prev,
.swiper-button-next {
  --swiper-navigation-size: 21px !important;
  color: #484848;
  background-color: white;
  border-radius: 50%;
  padding: 11px;
}

.swiper-button-prev:after,
.swiper-container-rtl .swiper-button-next:after {
  content: "keyboard_arrow_left";
}

.swiper-button-next:after,
.swiper-container-rtl .swiper-button-prev:after {
  content: "keyboard_arrow_right";
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-family: "Material Icons";
}

/* FitSize for newsfeed Posts
----------------------------
 .feedImageContainer{
 min-height: 357px;
  max-width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

}
.feedImageView{
    object-fit: contain;
    background-size: contain;
  background-repeat: no-repeat;
    min-height: 357px;
    height: 100%;
     width: 100%;
    bottom: 0px;
    left: 0px;
    opacity: 1;
    right: 0px;
    top: 0px;
}
.feedVideoView{
  background-size: cover;
    background-repeat: no-repeat;
    min-height: 352px;
    height: 100%;
    width: 100%;
    bottom: 0px;
    left: 0px;
    opacity: 1;
    position: absolute;
    right: 0px;
    top: 0px;
}
.attrImgWrapper{
 max-width: 100%;
    height: 0;
    padding-bottom: 65%;
    overflow: hidden;
    position: relative;
} */

/*
Second Hacking Way
---------------------
.attrImgWrapper{
 max-width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    position: relative;
}
*/
.feedImageView {
  width: 100%;
  /* height: 100%; */
  user-select: none;
}
.feedVideoView {
  width: 100%;
  height: 100%;
}
.attrImgWrapper {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  align-self: center;
  height: 100%;
}
@media screen and (max-width: 600px) {
  .post {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    line-height: 30px;
  }
}
</style>
