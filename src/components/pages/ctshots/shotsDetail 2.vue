<template>
  <div>
    <div class="pg-cnt-bx">
      <div class="container padding_mob">
        <div class="wrap-in" v-if="isLoaded == false">
          <a @click="$router.go(-1)" class="goback">
            <div class="close-image"><md-icon>close</md-icon></div>
          </a>
          <div class="image-container">
            <div class="image-holder">
              <img :src="detailImage[0].file" class="" />
            </div>
            <div class="infoWrap">
              <div class="top-level">
                <div class="photo-page-mini-profile">
                  <div class="holder" v-if="detailImage[0].user.logo != ''">
                    <img :src="detailImage[0].user.logo" />
                  </div>
                  <div class="profile-bg mr-3" v-else>
                    <span class="text">{{
                      getFirstChar(detailImage[0].user.trade_name_en)
                    }}</span>
                  </div>

                  <router-link
                    v-if="user_id && user_id == detailImage[0].user.id"
                    :to="
                      /profile/ +
                        getSlug(detailImage[0].user.trade_name_en) +
                        '/' +
                        detailImage[0].user.id
                    "
                  >
                    <h3>{{ detailImage[0].user.trade_name_en }}</h3>
                  </router-link>
                  <router-link
                    v-else
                    :to="
                      /profiletimeline/ +
                        getSlug(detailImage[0].user.trade_name_en) +
                        '/' +
                        detailImage[0].user.id
                    "
                  >
                    {{ detailImage[0].user.trade_name_en }}
                  </router-link>

                  <div class="follow-btn-holder">
                    <Follow
                      :id="detailImage[0].userid"
                      :follow="detailImage[0].isfollow"
                    >
                    </Follow>
                  </div>
                </div>
                <likeShare
                  :likes="detailImage[0].total_like"
                  :isliked="!!detailImage[0].islike"
                  :id="detailImage[0].pk_post_id"
                  :follow="detailImage[0].isfollow"
                  :views="detailImage[0].views"
                  :total_comments="detailImage[0].total_comments"
                ></likeShare>
              </div>
              <comment :comments="detailImage[0]"></comment>
            </div>
          </div>
        </div>
        <div v-else>
          <Loader style="margin: 50px 0px" />
        </div>
        <div class="more-title">More like this</div>
        <div
          class="shots-wrap"
          v-infinite-scroll="LoadMore"
          :infinite-scroll-listen-for-event="true"
          infinite-scroll-immediate-check="false"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="1500"
        >
          <div
            class="shot-box"
            v-for="(image, index) in RelatedImages"
            :key="index"
          >
            <div @click="chooseImage(image)">
              <v-lazy-image :src="image.file" class="image-fit" />
            </div>
            <div class="shot-boxwrap">
              <div class="author">
                <img
                  class="image"
                  v-if="image.usericon != ''"
                  :src="image.usericon"
                />
                <div class="profile-bg" v-else>
                  <span class="text">{{ getFirstChar(image.username) }}</span>
                </div>
                <h3 v-if="image.username.length < 16">{{ image.username }}</h3>
                <h3 @click.prevent="expandName($event)" v-else :class="display">
                  {{ image.username.substring(0, 16) + "..." }}
                </h3>
                <h3 @click.prevent="expandName($event)" v-if="isExpanded">
                  {{ image.username }}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div class="loader">
          <div class="circle-loader" v-if="showLoader"></div>
        </div>
        <!-- <md-button class="md-raised load-more" @click="LoadMore()"
          >Load more</md-button
        > -->
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import Follow from "./follow";
import likeShare from "./likeshare";
import comment from "./comment";
import { mapState } from "vuex";
import VLazyImage from "v-lazy-image";
import { VclFacebook, VclInstagram } from "vue-content-loading";
import Loader from "../../ctcomponents/RoundedLoader.vue";
export default {
  components: {
    Follow,
    comment,
    likeShare,
    VLazyImage,
    VclFacebook,
    VclInstagram,
    Loader
  },
  data() {
    return {
      showLoader: false,
      isLoaded: false,
      busy: false,
      isExpanded: false,
      display: "display-block",
      isHidden: true,
      page: 1,
      id: this.$route.params.id
    };
  },

  computed: {
    getFirstChar() {
      return name => name.charAt(0);
    },

    ...mapState({
      videoPosterPath: state => state.ctshot.videoPosterPath,
      profileIconUrl: state => state.ctshot.profileIconUrl,

      user_id: state => state.user.user_id
    }),
    detailImage() {
      return this.$store.getters.getDetailImage;
    },
    RelatedImages() {
      return this.$store.getters.getRelatedImage;
    },
    getSlug() {
      return name => this.slugify(name);
    }
  },
  methods: {
    expandName(event) {
      console.log(event);
      this.isExpanded = !this.isExpanded;
      this.display = "display-none";
      if (this.isExpanded) {
        this.display = "display-none";
      } else {
        this.display = "display-block";
      }
    },
    loadImage() {
      this.isLoaded = true;
      const id = this.$route.params.id;
      this.$store
        .dispatch("LoadImage", this.$route.params.id)
        .then(response => {
          this.isLoaded = false;
        })
        .catch(error => {});

      this.$store.dispatch("LoadRelatedImage", {
        post_file_id: this.$route.params.id,
        page: 1
      });
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
    },
    LoadMore() {
      this.busy = true;
      this.showLoader = true;
      this.page++;
      this.$store
        .dispatch("LoadRelatedImage", {
          post_file_id: this.$route.params.id,
          page: this.page
        })
        .then(response => {
          this.showLoader = false;
          this.busy = false;
        })
        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    },
    chooseImage(image) {
      this.$router.push({
        name: "PhotoDetail",
        params: { id: image.pk_post_file_id }
      });
      this.loadImage();
    }
  },
  watch: {
    "$route.params.id": function() {
      this.page = 1;
    },
    detailImage: {
      immediate: true,
      handler(val, oldVal) {
        //  if(val!=oldVal)
        //  {
        //  }
      },
      deep: true
    }
  },
  created() {
    this.loadImage();
  }
};
</script>
<style scoped>
.loader {
  position: relative;
  right: 25%;
  height: 60px;
}
.display-block {
  display: block;
}
.display-none {
  display: none !important;
}
.shot-box {
  cursor: pointer;
}
.follow-btn-holder {
  margin-left: 12px;
}
.infoWrap {
  max-width: 747px;
  width: 100%;
  margin: 0 auto;
  padding-left: 0rem;
  padding-right: 0rem;
  margin-top: 0em;
  clear: left;
}
.shots-wrap .shot-box .fill {
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.shots-wrap .shot-box {
  line-height: 0;
  position: relative;
  width: 100%;
  /* border-radius: 0.5rem; */
  background: #fff;
  padding: 0;
  overflow: hidden;
  border-radius: 7px;
}
.wrap-in {
  /*background-color: #eee;
  padding: 15px;*/
  position: relative;
  margin-top: 3.2em;
}
.image-container {
  width: 100%;
  position: relative;
  box-sizing: border-box;
}
.image-holder {
  width: 100%;
  text-align: center;
}

.profile-bg {
  width: 100%;
  max-width: 36px !important;
  height: 36px !important;
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
.image-holder img {
  width: 500px;
}

.thumbnail {
  /*display: flex;
  flex-wrap: wrap;*/
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(222px, 1fr));
  column-gap: 17px;
  cursor: pointer;
}
.thumbnail .thumbnail-img {
  /*margin: 9px;
  width: 200px;
  height: 200px;*/
  margin-bottom: 1.1em;
}
.thumbnail-img img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.more-title {
  font-size: 21px;
  font-weight: 600;
  height: 77px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.top-level {
  width: 100%;
  margin-top: 2em;
}

.photo-page-mini-profile {
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-bottom: 0.8em;
  border-bottom: 1px solid #eee;
}
.photo-page-mini-profile h3 {
  font-size: 13px;
}
.goback {
  cursor: pointer;
}
.holder {
  margin-right: 10px;
  max-width: 52px;
  max-height: 52px;
  min-width: 52px;
  min-height: 52px;
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
.level-left {
  align-items: center;
  justify-content: flex-start;
}

.level-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
.follw-btn .md-button {
  height: 32.3px;
}
.ml-15 {
  margin-left: 15px;
}
.close-image {
  position: absolute;
  right: 0;
  top: -27px;
}
.close-image .md-icon {
  font-size: 31px !important;
}
.comment-box-wrap {
  width: 100%;
  /*box-shadow: rgb(238, 238, 238) 0px 4px 4px;*/
}
.comment-box {
  display: flex;
  align-items: center;
  margin-bottom: 1.8em;
  width: 35%;
  margin-top: 1.7em;
}
.comment-box .avathar-img {
  width: 40px;
  height: 40px;
  margin-right: 16px;
  border-radius: 50%;
  background-color: transparent;
  overflow: hidden;
}
.comment-box .avathar-img img {
  width: 100%;
  height: 100%;
}
.comment-form {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  position: relative;
}
.comment-form .md-field {
  margin: 0;
}
.comment-form .md-button {
  margin-top: 1em;
  float: right;
  margin-left: auto;
  height: 37px;
  background-color: #ff5722 !important;
}
.comment-content .name {
  font-size: 15px;
  font-weight: 500;
  display: inline-block;
}
.comment-content .name span {
  color: #888;
  font-size: 12px;
  margin-left: 0.4em;
}
.comment-content p {
  color: #333;
  margin-top: 0.3em;
}
.image-fit {
  min-height: 219px;
  max-height: 100%;
  max-width: 100%;
}
.load-more {
  display: block;
  margin: 0 auto;
  height: 37px;
}
/* lazy load image*/
.v-lazy-image {
  filter: blur(10px);
  transition: filter 0.7s;
}

.v-lazy-image-loaded {
  filter: blur(0);
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

.md-icon.md-theme-default.md-icon-font {
  color: rgba(0, 0, 0, 0.33);
  color: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.33));
}

.md-icon.md-theme-default.md-icon-font:hover {
  color: rgba(0, 0, 0, 0.77);
  color: var(--md-theme-default-icon-on-background, rgba(0, 0, 0, 0.77));
}

@media screen and (max-width: 1000px) {
  .profile-bg {
    max-width: 30px !important;
    height: 30px !important;
  }
  .close-image {
    top: -22px;
  }

  .top-level {
    width: 100%;
    margin-top: 0em;
  }
  .image-holder {
    margin-top: 20px;
    float: left;
    margin-bottom: 20px;
  }

  .photo-page-mini-profile {
    border-bottom: 1px solid #dedede;
    padding-bottom: 0.8em;
  }

  .more-title {
    margin-top: -10px;
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
  .infoWrap {
    padding-right: 10px;
    padding-left: 10px;
  }
  .padding_mob {
    padding-left: 0px !important;
    padding-right: 40px !important;
  }

  .holder {
    max-width: 44px;
    max-height: 44px;
    min-width: 44px;
    min-height: 44px;
  }
}
</style>
