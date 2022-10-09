<template>
  <div>
    <div class="pg-cnt-bx ifTimeline">
      <div class="news-fd-bx mrg-t-10">
        <div sticky-container>
          <div class="flex-bx-tp-1">
            <div class="nf-lft-bx">
              <div v-sticky sticky-offset="offset" sticky-side="top">
                <ProfileTilesFeed />
              </div>
            </div>
            <div
              class="nf-ctr-bx news-wrapper"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="1500"
              :infinite-scroll-listen-for-event="true"
              infinite-scroll-immediate-check="false"
            >
              <div
                v-if="
                  userData &&
                    dashboard_access &&
                    dashboard_access.some(
                      el => el.type === 'social' && el.access === '1'
                    )
                "
              >
                <createPost
                  class="bx-wrp-cntr-1 col-sm-12"
                  v-if="userData.userid == profileId"
                >
                </createPost>
              </div>
              <div
                v-if="isLoaded && initialProfile"
                class="bx-wrp-cntr-1 col-sm-12"
              >
                <postItem
                  :model="'Timeline'"
                  v-for="feed in profileTimeline"
                  :key="feed.pk_post_id"
                  :feed="feed"
                ></postItem>
              </div>
              <div v-else class="bx-wrp-cntr-1 col-sm-12 p-0">
                <vcl-instagram></vcl-instagram>
              </div>
            </div>
            <content-loader
              v-if="showLoader"
              :width="400"
              :height="460"
              :speed="2"
              primaryColor="#f3f3f3"
              secondaryColor="#ecebeb"
            >
              <circle cx="31" cy="31" r="15" />
              <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
              <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
              <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
            </content-loader>
            <div class="nf-rgt-bx">
              <div v-sticky sticky-offset="offset" sticky-side="top">
                <div class="rightWrap">
                  <rightContent></rightContent>
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
import { mapState } from "vuex";
import leftContent from "../newsfeed/newfeedLeft";
import postItem from "../newsfeed/postItem";
import centerContent from "../newsfeed/newsfeedCenter";
import rightContent from "../newsfeed/newsfeedRight";
import Sticky from "vue-sticky-directive";
import allPost from "../newsfeed/allPosts";
import createPost from "../newsfeed/createPost";
import { VclFacebook, VclInstagram } from "vue-content-loading";
import { ContentLoader } from "vue-content-loader";
import ProfileTilesFeed from "../profile/ProfileLeftFeed";

export default {
  props: ["myid", "myname"],
  components: {
    ProfileTilesFeed,
    leftContent,
    centerContent,
    rightContent,
    createPost,
    allPost,
    postItem,
    VclInstagram,
    ContentLoader
  },
  directives: {
    Sticky
  },
  data() {
    return {
      busy: false,
      showLoader: true,
      initialProfile: true,
      page: 0,
      isLoaded: false
    };
  },
  computed: {
    // profileTimeline() {
    //   return this.$store.getters.getProfileTimeline;
    // },
    ...mapState({
      profileTimeline: state => state.newsFeed.profileTimeline,
      dashboard_access: state => state.profile.dashboard_access,
      userData: state => state.user.profile.profile
    }),
    profileId() {
      return this.$route.params.id;
    },
    profileName() {
      return this.$route.params.name;
    }
  },
  created() {
    this.loadMore();
    this.$emit("handleBannerEmit", false);

    const profile_id = this.$route.params.id;
    this.$store
      .dispatch("profile_info", profile_id)
      .then(response => {
        this.$emit("handleBannerEmit", true);
      })
      .catch(error => console.log(error));
  },
  mounted() {},
  methods: {
    loadMore() {
      this.page++;
      this.showLoader = true;
      this.busy = true;
      const data = { page: this.page, profileid: this.$route.params.id };
      this.$store
        .dispatch("profile_timeline", data)
        .then(response => {
          this.showLoader = false;
          this.isLoaded = true;
          if (response.success) {
            this.busy = false;
          } else {
            this.showLoader = false;
            this.isLoaded = true;
          }
        })

        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    }
  }
};
</script>
<style scoped>
.nf-rgt-bx {
  width: 300px;
}
.nf-lft-bx {
  width: 300px;
  transition: all 0.3s ease-in;
}
.loader {
  position: relative;
  right: 25%;
}
.news-fd-bx {
  position: relative;
}
.circle-loader {
  position: absolute;
  bottom: 0;
  left: 54%;

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
.bx-tp-desc-1 {
  padding: 8px;
  background: #fff;
  border: 1px solid #efefef;
  margin-bottom: 8px;
  background: #fff;
  padding: 14px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.bx-tp-desc-hd-1 {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #efefef;
}
.txt-stl-1 {
  font-size: 15px;
  font-weight: 500;
  padding-left: 5px;
  color: #444;
}
.icn-st-1 {
  font-size: 20px;
  color: #213a63;
}
.done-mark {
  color: #ff5722;
  font-size: 16px;
  padding-right: 5px;
}
.span-st-1 {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
}
.span-st-2 {
  padding-left: 5px;
  color: rgba(0, 0, 0, 0.6);
}
table tr {
  margin-bottom: 0.33em;
  display: block;
}
.bx-tp-123 {
  padding-top: 8px;
}
.grd-bx-itm {
  display: inline-block;
  width: 32.44%;
  padding-right: 2px;
  margin-bottom: 5px;
  position: relative;
}
.grd-img-1 {
  height: 75px !important;
  width: 100%;
}
.video-btn-1 {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #fff !important;
  font-size: 16px;
}
.bx-wrp-cntr-1 {
  padding-left: 25px;
  padding-right: 35px;
}
.top-sticky .leftWrap,
.top-sticky .rightWrap {
  padding-top: 8.6em !important;
}
.leftWrap,
.rightWrap {
  transition: all 0.3s ease-in;
}

@media screen and (max-width: 768px) {
  .nf-lft-bx,
  .nf-rgt-bx {
    display: none;
  }
  .bx-wrp-cntr-1 {
    padding-left: 0px;
    padding-right: 0px;
  }
}
@media screen and (max-width: 600px) {
  .nf-ctr-bx {
    max-width: 100%;
    padding-right: 0px !important;
  }
}
</style>
