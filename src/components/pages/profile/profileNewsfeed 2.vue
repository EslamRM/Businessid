<template>
  <div>
    <div class="pg-cnt-bx col-sm-12 p-0">
      <div class="news-fd-bx mrg-t-10 col-sm-12 p-0">
        <div>
          <div class="flex-bx-tp-1 col-sm-12 p-0">
            <div class="nf-lft-bx">
              <div v-sticky sticky-offset="offset" sticky-side="top">
                <ProfileTilesFeed />
              </div>
            </div>
            <div
              class="nf-ctr-bx news-wrapper col-sm-12 p-0"
              v-infinite-scroll="loadMore"
              infinite-scroll-disabled="busy"
              infinite-scroll-distance="1500"
            >
              <div class="bx-wrp-cntr-1 col-sm-12">
                <postItem
                  v-for="feed in profileFeed"
                  :key="feed.pk_post_id"
                  :feed="feed"
                ></postItem>
              </div>
              <!-- <div v-else class="bx-wrp-cntr-1">
                   <vcl-instagram></vcl-instagram>
                </div> -->
            </div>
            <div class="loader">
              <div class="circle-loader" v-if="showLoader"></div>
            </div>
            <div class="nf-rgt-bx prifileRightWrap">
              <div v-sticky sticky-offset="offset" sticky-side="top">
                <rightContent></rightContent>
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
import ProfileTilesFeed from "../profile/ProfileLeftFeed";
import leftContent from "../newsfeed/newfeedLeft";
import postItem from "../newsfeed/postItem";
import centerContent from "../newsfeed/newsfeedCenter";
import rightContent from "../newsfeed/newsfeedRight";
import Sticky from "vue-sticky-directive";
import allPost from "../newsfeed/allPosts";
import createPost from "../newsfeed/createPost";
import { VclFacebook, VclInstagram } from "vue-content-loading";
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
    VclInstagram
  },
  directives: {
    Sticky
  },
  data() {
    return {
      busy: false,
      showLoader: false,
      page: 0,
      isLoaded: false
    };
  },
  computed: {
    profileFeed() {
      return this.$store.getters.getProfileFeed;
    },

    profileId() {
      return this.$route.params.id;
    },
    profileName() {
      return this.$route.params.name;
    }
  },
  created() {
    const token = JSON.parse(localStorage.getItem("access_token")) || null;
    if (token != null) {
      console.log(token);
    }
    console.log(token);
    this.loadMore();
  },
  methods: {
    loadMore() {
      this.page++;
      this.showLoader = true;
      this.busy = true;
      const data = { page: this.page };
      this.$store
        .dispatch("profile_feed", data)
        .then(response => {
          this.showLoader = false;
          if (response.posts) {
            this.showLoader = false;
            this.busy = false;
          }
        })

        .catch(error => {
          this.showLoader = false;
          this.busy = false;
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

.txt-stl-1 {
  font-size: 15px;
  font-weight: 500;
  padding-left: 5px;
  color: #444;
}
.icn-st-1 {
  font-size: 21px;
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
  color: rgba(0, 0, 0, 0.6);
}
.bx-tp-123 {
  padding-top: 11px;
}
.grd-bx-1 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
  grid-gap: 7px;
}
.grd-bx-itm {
  display: block;
  position: relative;
  width: 100%;
}

.grd-bx-itm .holder {
  position: relative;
  flex: 75px;
  max-width: 75px;
  min-height: 75px;
  width: 100%;
  height: 100%;
}
.grd-img-1 {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: cover;
  border-radius: 3px;
}
.bx-wrp-cntr-1 {
  padding-left: 25px;
  padding-right: 25px;
  margin-top: -8px;
}
table tr {
  margin-bottom: 0.33em;
  display: block;
}
.play-iconIn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 300ms;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12.5px;
  margin-left: -12.5px;
}
.video-btn-1 {
  color: #fff !important;
  font-size: 21px;
}
.grd-itm-lnk {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
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
</style>
