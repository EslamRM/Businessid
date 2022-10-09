<template>
  <div>
    <div class="pg-cnt-bx pagetopPadd">
      <div class="news-fd-bx">
        <div class="container container-newsfeed">
          <div class="flex-bx-tp-1" sticky-container>
            <div class="nf-lft-bx">
              <div v-sticky sticky-offset="offset" sticky-side="top">
                <leftContent></leftContent>
              </div>
            </div>
            <div
              class="nf-ctr-bx news-wrapper col-sm-12 col-md-12"
              v-infinite-scroll="loadMore"
              :infinite-scroll-disabled="busy"
              infinite-scroll-distance="1500"
            >
              <centerContent :loading="showLoader"></centerContent>
              <center>
                <h2 class="allPostsLoaded" v-if="!showLoader && busy">
                  All Posts are Loaded.
                </h2>
              </center>
            </div>

            <div class="nf-rgt-bx">
              <!-- <div v-sticky sticky-offset="offset" sticky-side="top"> -->
              <div>
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
import leftContent from "./newfeedLeft";
import centerContent from "./newsfeedCenter";
import rightContent from "./newsfeedRight";
import Sticky from "vue-sticky-directive";
import { mapState } from "vuex";

export default {
  data() {
    return {
      page: 0,
      busy: false,
      showLoader: true,
    };
  },
  components: {
    leftContent,
    centerContent,
    rightContent,
  },
  directives: {
    Sticky,
  },
  watch: {
    $route(to, from) {
      console.log("object");
    },
  },
  computed: {
    //  News(){
    //   console.log("computed")
    //   return this.$store.getters.getNewsFeed;
    //   console.log("computed")
    //   console.log(this.$store.getters.getNewsFeed)
    // },
  },
  updated() {
    console.log(this.$route);
    console.log("switched_user_id", localStorage.getItem("switched_user_id"));
  },

  methods: {
    loadMore() {
      if (this.busy) return;
      this.page++;
      this.showLoader = true;
      this.busy = true;
      this.$store
        .dispatch("LoadPosts", this.page)
        .then((response) => {
          if (response.success) {
            this.showLoader = false;
            this.busy = false;
            return;
          }
          this.showLoader = false;
          this.busy = true;
        })

        .catch((error) => {
          this.busy = false;
          this.showLoader = false;
        });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.news-wrapper {
  padding-bottom: 40px;
  margin-bottom: 30px;
  min-width: 300px;
}
.container-newsfeed {
  width: 1121px;
}
.nf-lft-bx {
  width: 200px;
  z-index: 2;
}
.nf-rgt-bx {
  width: 301px;
  z-index: 2;
}

.news-fd-bx {
  position: relative;
}
.loader {
  position: relative;
  right: 0;
}

.circle-loader {
  position: absolute;
  bottom: 0;
  left: 45%;
  top: 30px;
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
@media screen and (max-width: 1000px) {
  .container-newsfeed {
    width: 100%;
    padding: 0px;
    margin-top: 15px;
    max-width: 100%;
  }

  .nf-lft-bx,
  .nf-rgt-bx {
    display: none;
  }

  .news-wrapper {
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 768px) {
  .container-newsfeed {
    margin-top: 10px;
  }
}

@media screen and (max-width: 600px) {
  .container-newsfeed {
    width: 100%;
    padding-left: 0px;
    padding-right: 0px;
    margin-top: 0px;
  }
  .post-item-box {
    margin-top: 15px;
  }
}

@media screen and (max-width: 300px) {
  .news-wrapper {
    min-width: 250px;
  }

  .container-newsfeed {
    width: 88%;
    padding-left: 0px;
    padding-right: 0px;
    margin-top: 0px;
    overflow: none;
    margin-right: 40px;
  }
}

.allPostsLoaded {
  margin-top: 24px;
  font-weight: lighter;
  color: #969695;
}
</style>
