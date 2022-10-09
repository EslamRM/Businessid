<template>
  <div class="btn-reaction">
    <!-- <div v-if="isShared">
            <i class="material-icons reaction-icn-1" >label_off</i>
            <md-tooltip md-direction="top">Share</md-tooltip>
            <i class="fa fa-globe"></i>
        </div> -->

    <div>
      <i
        v-if="
          dashboard_access &&
            dashboard_access.some(
              el => el.type === 'social' && el.access === '1'
            )
        "
        class="material-icons reaction-icn-1"
        @click="showDialog = true"
        >launch</i
      >
      <i v-else class="material-icons disabled-icon">launch</i>
      <md-tooltip md-direction="top">Share</md-tooltip>
      <i class="fa fa-globe"></i>
    </div>

    <div class="reaction-count">{{ total_share }}</div>
    <md-dialog :md-active.sync="showDialog" class="wrap-all">
      <md-dialog-title
        >Share Post
        <div class="close-icon">
          <i class="material-icons" @click="showDialog = false"> close </i>
        </div>
      </md-dialog-title>

      <div class="dialog-wrapper">
        <md-field class="user-txt">
          <md-textarea
            v-model="title"
            placeholder="Say something about this... "
            md-autogrow
            class="share-txt"
          ></md-textarea>
        </md-field>
        <div>
          <div
            class="sldr-bx-wrp-1 feedImageContainer"
            v-if="feed.post_type == 'post' && feed.files.length"
          >
            <div class="imageLink">
              <carousel
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
              </carousel>
            </div>
          </div>
          <div v-else-if="feed.post_type == 'youtube'">
            <iframe width="100%" height="270px" :src="feed.link"></iframe>
          </div>
          <div v-else-if="feed.post_type == 'checkin' && feed.files.length">
            <carousel
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
                  style="width:100%;height:100%;object-fit:cover"
                />

                <VideoPlayer v-else-if="file.type == 'video'" :video="file">
                </VideoPlayer>
              </slide>
            </carousel>
          </div>
          <div v-else-if="feed.post_type == 'checkin' && !feed.files.length">
            <GmapMap
              :center="center(feed)"
              :zoom="12"
              style="width:100%;height: 400px;"
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
                      v-if="
                        prev.description != null &&
                          prev.description.length > 160
                      "
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
          <div class="sldr-bx-wrap-1 post" v-else>
            {{ feed.title }}
          </div>
        </div>
        <div class="social-share">
          <div class="social-share-wrapper">
            <div class="social-icons">
              <ShareNetwork
                @close="closeEvent"
                network="facebook"
                :url="link"
                :title="feed.title != null ? feed.title : ''"
              >
                <div class="image-holder">
                  <span>
                    <img src="@/assets/images/facebook_share.png" />
                  </span>
                </div>

                <span>
                  facebook
                </span>
              </ShareNetwork>
            </div>
            <div class="social-icons">
              <ShareNetwork
                @close="closeEvent"
                network="twitter"
                :url="link"
                :title="feed.title != null ? feed.title : ''"
              >
                <div class="image-holder">
                  <span>
                    <img src="@/assets/images/twitter_share.png" />
                  </span>
                </div>

                <span>
                  twitter
                </span>
              </ShareNetwork>
            </div>
            <div class="social-icons">
              <ShareNetwork
                @close="closeEvent"
                network="linkedin"
                :url="link"
                :title="feed.title != null ? feed.title : ''"
              >
                <div class="image-holder">
                  <span>
                    <img src="@/assets/images/linkedin_share.png" />
                  </span>
                </div>

                <span>
                  linkedin
                </span>
              </ShareNetwork>
            </div>
            <div class="social-icons">
              <ShareNetwork
                @close="closeEvent"
                network="whatsapp"
                :url="link"
                :title="feed.title != null ? feed.title : ''"
              >
                <div class="image-holder">
                  <span>
                    <img src="@/assets/images/whatsapp.png" />
                  </span>
                </div>

                <span>
                  Whatsapp
                </span>
              </ShareNetwork>
            </div>
            <!-- <div class="social-icons">
              <div class="image-holder">
                <img src="@/assets/images/pinterest.png" />
              </div>
              pintrest
            </div> -->
          </div>
        </div>
      </div>

      <md-dialog-actions>
        <md-button
          class="md-raised md-primary dialog-share-btn"
          @click="share(feed)"
          >Post</md-button
        >
        <md-button
          class="md-raised dialog-share-btn"
          @click="showDialog = false"
          >Cancel</md-button
        >
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import VideoPlayer from "../../../components/VideoPlayer";
import axios from "axios";

import { mapState } from "vuex";
import VueTextareaAutosize from "vue-textarea-autosize";
export default {
  name: "share",
  props: ["shared", "id", "totalshare", "feed"],
  components: {
    Carousel,
    Slide,
    VideoPlayer
  },
  data() {
    return {
      prev: "",
      open: false,
      isShared: false,
      total_share: 0,
      showDialog: false,
      title: ""
    };
  },
  computed: {
    link() {
      return window.location.href + "/post/" + this.feed.pk_post_id;
    },
    ...mapState({
      dashboard_access: state => state.profile.dashboard_access
    })
  },
  methods: {
    center(feed) {
      return { lat: feed.location.latitude, lng: feed.location.longitude };
    },
    getPre(link) {
      return new Promise((resolve, reject) => {
        axios
          .post("post-url-preview", {
            url: link
          })
          .then(response => {
            resolve(response.data);
            if (response.data.success) this.prev = response.data.result;
            // this.prev = response.data;
            console.log(response.data);
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    closeEvent() {
      this.showDialog = false;
    },
    share(feed) {
      console.log(feed.pk_post_id);

      const data = {
        postid: feed.pk_post_id,
        title: this.title,
        privacy: "public"
      };

      this.$store
        .dispatch("sharePost", data)
        .then(response => {
          this.showDialog = false;
          window.scrollTo(0, 0);
          // if(response.data.success==false){
          //     this.isShared = false;
          // }
        })
        .catch(error => console.log(error));
      this.isShared = false;
    }
  },
  created() {
    this.isShared = this.shared;
    this.total_share = this.totalshare;
    if (this.feed.post_type == "link") {
      this.getPre(this.feed.link);
    }
  }
};
</script>
<style scoped>
.wrap-all {
  border-radius: 6px;
  /* width: 515px; */
  max-width: 100%;
  z-index: 99999;
}

.md-field .md-textarea.share-txt::-webkit-input-placeholder {
  font-size: 13px;
  font-weight: 400;
}
.md-field.md-theme-default.md-focused .md-textarea {
  color: #1a1a1a;
  -webkit-text-fill-color: #1a1a1a;
}
.dialog-wrapper {
  padding: 0px 20px 20px 20px;
}
.share-network-facebook,
.share-network-twitter,
.share-network-linkedin,
.share-network-whatsapp {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.user-txt:after,
.user-txt:before {
  display: none;
}
.bookmark-wrapper {
  /* padding-right: 10px; */
}
.media-holder {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
}
.media-holder .VueCarousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-height: 200px;
}
.arrow-image-toggle {
  font-size: 12px;
}
.toggle-image-height {
  display: block;
  top: 5px;
  font-size: 14px;
  height: 32px;
  left: 0;
  margin: 0;
  position: absolute;
  right: 0;
  text-align: center;
  z-index: 100;
}
.close-icon {
  float: right;
  cursor: pointer;
}
.toggle-image-height a {
  font-size: 13px;

  background-color: #f2f2f2;
  border-radius: 16px;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0), 0 2px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: table;
  height: 28px;
  line-height: 28px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  text-align: center;
  z-index: 100;
}
.btn-bookmark {
  margin-top: 4px;
  cursor: pointer;
}

.btn-reaction {
  position: relative;
  padding-right: 4px;
  display: inline-flex;
  align-items: center;
}
.create-post {
  z-index: 0;
}
.social-share-wrapper {
  display: flex;
  justify-content: space-around;
}
.reaction-icn-1 {
  font-size: 19px;
  padding-right: 7px;
  cursor: pointer;
}
.disabled-icon {
  color: grey;
  cursor: not-allowed;
  font-size: 19px;
  padding-right: 7px;
}
.md-title {
  font-size: 15px;
}
.reaction-count {
  text-align: center;
  font-size: 11px;
}
.sldr-bx-wrp-1 {
  height: auto;
}
.VueCarousel {
  height: 100%;
}
.social-share {
  padding: 15px 0;
}
.md-dialog-title {
  padding: 15px 15px 2px 15px;
  margin-bottom: 0px;
}
.image-holder {
  background-color: #f5f5f5;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin-bottom: 7px;
  position: relative;
  margin: 0px auto;
  margin-right: 6px;
}
.image-holder:hover {
  box-shadow: 0px 0 5px gainsboro;
}
.image-holder img {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 20px;
}
.md-field {
  margin: 4px 0 25px;
}
.social-icons {
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}
.dialog-share-btn {
  height: 25px;
}
</style>
