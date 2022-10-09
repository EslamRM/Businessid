<template>
  <div>
    <div class="pg-cnt-bx">
      <div class="blackSkin" v-if="isLoaded">
        <div>
          <div class="embed-responsive">
            <VideoPlayer :video="detailVideo[0]"> </VideoPlayer>
          </div>
        </div>
      </div>
      <div v-else class="loader">
        <div class="circle-loader" v-if="showVideoLoader"></div>
      </div>
      <div class="container padding_mob">
        <div class="section-wrap">
          <div class="Info-sec" v-if="isLoaded">
            <div class="video-info-wrap">
              <h3 class="video-title">{{ detailVideo[0]["title"] }}</h3>
              <div>
                <!-- Count <p>{{ detailVideo[0].views }}</p> -->
                <!-- <span>.</span> -->
                <span class="dateOf"
                  >{{ agoDate(detailVideo[0].created_at) }}
                </span>
              </div>
            </div>

            <div class="video-info-wrap">
              <div class="video-primary-info">
                <div class="photo-page-mini-profile">
                  <div class="holder" v-if="detailVideo[0].user.logo != ''">
                    <img :src="detailVideo[0].user.logo" />
                  </div>
                  <div class="profile-bg" v-else>
                    <span class="text">{{
                      getFirstChar(detailVideo[0].user.trade_name_en)
                    }}</span>
                  </div>
                  <router-link
                    v-if="user_id && user_id == detailVideo[0].user.id"
                    :to="
                      /profile/ +
                        getSlug(detailVideo[0].user.trade_name_en) +
                        '/' +
                        detailVideo[0].user.id
                    "
                  >
                    <h3>{{ detailVideo[0].user.trade_name_en }}</h3>
                  </router-link>
                  <router-link
                    v-else
                    :to="
                      /profiletimeline/ +
                        getSlug(detailVideo[0].user.trade_name_en) +
                        '/' +
                        detailVideo[0].user.id
                    "
                  >
                    <h3>{{ detailVideo[0].user.trade_name_en }}</h3>
                  </router-link>
                  <div class="follow-btn-holder">
                    <Follow
                      :id="detailVideo[0].userid"
                      :follow="detailVideo[0].isfollow"
                    >
                    </Follow>
                  </div>
                </div>
              </div>
              <div class="top-level-buttons">
                <likeShare
                  :likes="detailVideo[0].total_like"
                  :isliked="!!detailVideo[0].islike"
                  :id="detailVideo[0].pk_post_id"
                  :views="detailVideo[0].views"
                  :follow="detailVideo[0].isfollow"
                  :total_comments="detailVideo[0].total_comments"
                >
                </likeShare>
              </div>
            </div>

            <div class="video-comment-wrap">
              <comment :comments="detailVideo[0]"></comment>
            </div>
          </div>

          <div
            class="video-player"
            v-infinite-scroll="LoadRelatedVideo"
            :infinite-scroll-listen-for-event="true"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="1500"
          >
            <div class="video-inner">
              <div class="more-title">More like this</div>
              <div class="shots-wrap">
                <div
                  class="shot-box"
                  v-for="(video, index) in LoadRelatedVideos"
                  :key="index"
                >
                  <div @click="choose(video)">
                    <video
                      :poster="video.poster"
                      class="right-more-video"
                      preload="false"
                    />
                    <div class="play-wrap">
                      <span class="play-iconn"
                        ><i class="material-icons">play_arrow</i></span
                      >
                    </div>
                  </div>
                  <div class="shot-boxwrap">
                    <div class="author">
                      <img class="image" :src="video.usericon" />
                      <h3 v-if="video.username.length < 16">
                        {{ video.username }}
                      </h3>
                      <h3
                        @click.prevent="expandName($event)"
                        v-else
                        :class="display"
                      >
                        {{ video.username.substring(0, 16) + "..." }}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import likeShare from "./likeshare";
import Follow from "./follow";

import comment from "./comment";
import PlayVideo from "./VideoPlay";
import { mapState } from "vuex";
import moment from "moment";
import { VclFacebook, VclInstagram } from "vue-content-loading";
import VideoPlayer from "../../../components/VideoPlayer";

export default {
  components: {
    comment,
    Follow,
    likeShare,
    PlayVideo,
    VclFacebook,
    VclInstagram,
    VideoPlayer
  },
  data() {
    return {
      isLoaded: false,
      showVideoLoader: false,
      IsVideoExist: true,
      Autoplay: true,
      autogrow: null,
      isExpanded: false,
      display: "display-block",
      page: 1,
      relatedPage: 1,
      isLastRequest: false,
      isDisabledLoadVideo: false,
      isLastSimilarVideo: false,
      isDisabledSimilarVideo: false
    };
  },
  watch: {
    "$route.params.id": function() {
      this.relatedPage = 1;
      this.page = 1;
      this.isLastRequest = false;
      this.isDisabledLoadVideo = false;
      this.isLastSimilarVideo = false;
      this.isDisabledSimilarVideo = false;
    }
  },
  methods: {
    loadVideo() {
      const id = this.$route.params.id;
      this.showVideoLoader = true;
      this.$store
        .dispatch("LoadVideo", this.$route.params.id)
        .then(response => {
          this.isLoaded = true;
          this.showVideoLoader = false;
          console.log(this.isLoaded);
        })
        .catch(error => console.log(error));
      // this.$store.dispatch("LoadNextVideo", {
      //   post_file_id: this.$route.params.id,
      //   page: 1
      // });
      this.$store.dispatch("LoadRelatedVideo", {
        post_file_id: this.$route.params.id,
        page: 1
      });
    },
    noImageHandler(event) {
      console.log(event);
    },
    choose(video) {
      this.showVideoLoader = true;
      console.log(this.isLoaded);
      this.$router.push({
        name: "VideoDetail",
        params: { id: video.pk_post_file_id }
      });
      this.loadVideo();
    },
    LoadNextVideo() {
      if (this.isLastRequest == false) {
        this.page++;

        this.$store
          .dispatch("LoadNextVideo", {
            post_file_id: this.$route.params.id,
            page: this.page
          })
          .then(response => {})
          .catch(error => {
            this.isLastRequest = true;
            this.isDisabledLoadVideo = true;
          });
      }
    },
    LoadRelatedVideo() {
      if (this.isLastSimilarVideo == false) {
        this.relatedPage++;
        this.$store
          .dispatch("LoadRelatedVideo", {
            post_file_id: this.$route.params.id,
            page: this.relatedPage
          })
          .then(response => {})
          .catch(error => {
            this.isLastSimilarVideo = true;
            this.isDisabledSimilarVideo = true;
          });
      }
    },
    slugify(text, ampersand = "and") {
      const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
      const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
      const p = new RegExp(a.split("").join("|"), "g");
      return text
        .toString()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
  },
  computed: {
    getFirstChar() {
      return name => name.charAt(0);
    },
    agoDate() {
      return date => moment(date).format("MMM D, Y");
    },
    getSlug() {
      return name => this.slugify(name);
    },
    ...mapState({
      postFileUrl: state => state.ctshot.postFileUrl,
      advFileUrl: state => state.ctshot.advFileUrl,
      videoPosterPath: state => state.ctshot.videoPosterPath,
      profileIconUrl: state => state.ctshot.profileIconUrl,

      user_id: state => state.user.user_id
    }),
    videoElement() {
      const dd = this.$refs;
      console.log(dd);
    },
    detailVideo() {
      return this.$store.getters.getDetailVideo;
    },
    LoadNextVideos() {
      return this.$store.getters.getNextVideo;
    },
    LoadRelatedVideos() {
      return this.$store.getters.geRelatedVideo;
    }
  },

  created() {
    this.loadVideo();
  }
};
</script>
<style scoped>
.blackSkin {
  background-color: #000;
  /* display: flex; */
  justify-content: center;
}
.section-wrap {
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
}
.Info-sec {
  max-width: 836px;
  width: 100%;
  margin: 0 auto;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.dateOf {
  font-size: 14px;
  color: #888;
}
.right-sec {
  max-width: 33.3333%;
  flex: 1 1 33.3333%;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.shot-box {
  cursor: pointer;
}
.follow-btn-holder {
  margin-left: 12px;
}
.shots-wrap .shot-box .fill {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.mansory-grd-bx {
  margin-top: 15px;
}

.video-title {
  padding: 20px 0px;
  font-size: 21px;
}
.photo-page-mini-profile {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-right: 20px;
}
.profile-bg {
  margin-right: 10px;
  width: 100%;
  max-width: 33px !important;
  height: 33px !important;
  border-radius: 50% !important;
  background-color: #f47320;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-bg .text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.photo-page-mini-profile h3 {
  font-weight: 600;
}
.holder {
  margin-right: 10px;
  width: 100%;
  max-width: 47px;
  max-height: 47px;
  min-width: 47px;
  min-height: 47px;
  position: relative;
}
.holder img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
}
.holder-minitext {
  max-width: 170px;
}
.thumbnail {
  position: relative;
  display: flex;
  display: -ms-flexbox;
  align-items: center;
  margin-bottom: 0.4em;
  cursor: pointer;
}
.thumbnail:last-child {
  margin-bottom: 0em;
}
.thumbnail img {
  margin-right: 9px;
  height: 94px;
  width: 168px;
  object-fit: cover;
}
.autoplay-render {
  margin-bottom: 2em;
}
.d-flex {
  display: flex;
}
.more-title {
  font-size: 21px;
  font-weight: 600;
  height: 77px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.button-wrapper {
  text-align: center;
}
.justify-content-between {
  justify-content: space-between;
}
.align-self-center {
  -ms-flex-item-align: center;
  align-self: center;
}
.video-list {
  padding: 0px 5px 0px 0px;
}
.thumbnail-info {
  max-width: 200px;
}
.md-switch {
  margin: 0;
}

.thumbnail h3 {
  font-size: 14px;
  font-weight: 600;
}
p.creator {
  color: #777;
  font-size: 11px;
}
.thumbnail-views {
  color: #777;
  font-size: 11px;
}
.video-player {
  display: block;
  margin-top: 2em;
}
.video-inner {
  width: 100%;
  flex: 1;
}
.embed-responsive {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  overflow: hidden;
  -webkit-box-flex: 0;
  -ms-flex: 1;
  flex: 1;
}
.loader {
  position: relative;
  right: 25%;
  height: 60px;
}
.embed-responsive-item {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: cover;
}
.video-info-wrap {
  width: 100%;
  height: auto;
}
.video-primary-info {
  align-self: center;
  display: flex;
  justify-content: space-between;
  padding-top: 1.1em;
  border-bottom: 1px solid #eee;
  padding-bottom: 1em;
}
.video-primary-info h3 {
  font-size: 14px;
}
.rightside {
  left: 11%;
  top: 23%;
  margin: 0px;
}
.load-more {
  height: 35px;
  font-size: 12px;
}
.circle-loader {
  position: absolute;
  bottom: 0;
  right: 20%;

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

@media screen and (max-width: 768px) {
  .video-title {
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;
    padding: 15px 0px;
  }

  .dateOf {
    font-size: 13px;
    color: #888;
  }

  .video-primary-info h3 {
    font-size: 14px;
    font-weight: 400;
  }

  .more-title {
    font-size: 20px;
    font-weight: 500;
  }
}

@media screen and (max-width: 600px) {
  .shots-wrap {
    width: 100%;
    grid-auto-rows: 219px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 1.3em;
  }

  .more-title {
    height: 60px;
  }

  .image-holder {
    margin-top: 8px;
    margin-bottom: 6px;
  }
  .close-image {
    top: -28px;
  }

  .more-title {
    height: 35px;
    font-size: 16px;
    margin-top: 0px;
  }

  .photo-page-mini-profile {
    padding-bottom: 0.4em;
  }

  .padding_mob {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }

  .video-title {
    font-size: 12px;
    line-height: 19px;
    font-weight: 400;
    padding: 10px 0px;
  }
  .dateOf {
    font-size: 12px;
  }

  .video-primary-info h3 {
    font-size: 12px;
    font-weight: 400;
  }
}

@media screen and (max-width: 320px) {
  .shots-wrap {
    width: 100%;
    grid-auto-rows: 219px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
    margin-top: 1em;
  }

  .shots-wrap .shot-box {
    border-radius: 0px !important;
  }

  .close-image {
    top: -27px;
    right: 10px;
    left: unset;
  }
  .Info-sec {
    padding-right: 10px;
    padding-left: 10px;
  }
  .padding_mob {
    padding-left: 0px !important;
    padding-right: 40px !important;
  }
}
</style>
