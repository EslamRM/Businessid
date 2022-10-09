<template>
  <div>
    <div class="post-hdr-bx" v-click-outside="hide">
      <div class="pst-thmb-1">
        <div class="thmb-lnk-1">
          <router-link
            v-if="feed.user"
            :to="
              /profile/ + getSlug(feed.user.trade_name_en) + '/' + feed.user.id
            "
          >
            <div class="profile-image-wrapper">
              <img
                v-if="feed.user.logo != ''"
                :src="feed.user.logo"
                class="thmb-lnk-img-1"
              />
              <div v-else class="profile-text">
                <div class="text">
                  {{ getFirstChar(feed.user.trade_name_en) }}
                </div>
              </div>
            </div>
            <md-tooltip md-direction="bottom"
              >Visit {{ feed.user.trade_name_en }} Profile</md-tooltip
            >
          </router-link>
        </div>
      </div>
      <div class="post-owner-desc">
        <div class="header-post">
          <div class="profile-name">
            <!-- <router-link
              v-if="retrievedTokenDetail==null"
               :to="/profiletimeline/ + getSlug(feed.user.trade_name_en)  + '/' + feed.user.id">
              <span v-if="feed.isShared">
                {{ feed.user.trade_name_en }}
                <span class="shared">shared</span>
                {{ feed.shareduser.trade_name_en }}
                <span class="shared">Post</span>
              </span>
              <span v-else-if="feed.post_type == 'checkin'">
                {{ feed.user.trade_name_en }}
                <span class="shared" v-if="feed.location.city != ''"
                  >checked in
                </span>
                {{ feed.location.city }}
              </span>
              <span v-else>
                {{ feed.user.trade_name_en }}
              </span>
              <span class="pst-time-bx"> {{ feed.created_at }} ago</span>
            </router-link> -->

            <router-link
              v-if="user_id && user_id == feed.user.id"
              :to="
                /profile/ +
                  getSlug(feed.user.trade_name_en) +
                  '/' +
                  feed.user.id
              "
            >
              <span v-if="feed.isShared">
                {{
                  feed.user.trade_name_en.length > 8
                    ? `${feed.user.trade_name_en.substring(0, 8).trim()}..`
                    : feed.user.trade_name_en
                }}
                <span class="shared">shared</span>
                {{
                  feed.shareduser.trade_name_en.length > 8
                    ? `${feed.shareduser.trade_name_en
                        .substring(0, 8)
                        .trim()}..`
                    : feed.shareduser.trade_name_en
                }}
                <span class="shared">Post</span>
              </span>
              <span v-else-if="feed.post_type == 'checkin'">
                {{ feed.user.trade_name_en }}
                <span class="shared" v-if="feed.location.city != ''"
                  >checked in
                </span>
                {{ feed.location.city }}
              </span>
              <span v-else>
                {{ feed.user.trade_name_en }}
              </span>
              <span class="pst-time-bx"> {{ feed.created_at }} ago</span>
            </router-link>

            <router-link
              v-else
              :to="
                /profiletimeline/ +
                  getSlug(feed.user.trade_name_en) +
                  '/' +
                  feed.user.id
              "
            >
              <span v-if="feed.isShared">
                {{
                  feed.user.trade_name_en.length > 8
                    ? `${feed.user.trade_name_en.substring(0, 8).trim()}..`
                    : feed.user.trade_name_en
                }}
                <span class="shared">shared</span>
                {{
                  feed.shareduser.trade_name_en.length > 8
                    ? `${feed.shareduser.trade_name_en
                        .substring(0, 8)
                        .trim()}..`
                    : feed.shareduser.trade_name_en
                }}
                <span class="shared">Post</span>
              </span>
              <span v-else-if="feed.post_type == 'checkin'">
                {{ feed.user.trade_name_en }}
                <span class="shared" v-if="feed.location.city != ''"
                  >checked in
                </span>
                {{ feed.location.city }}
              </span>
              <span v-else>
                {{ feed.user.trade_name_en }}
              </span>
              <span class="pst-time-bx"> {{ feed.created_at }} ago</span>
            </router-link>
          </div>
          <div class="post-owner-desc-1">
            {{ feed.user.user_type | capitalize }}
          </div>
        </div>

        <div class="popoverWrap">
          <md-button class="md-icon-button" @click="isShow = !isShow">
            <i class="material-icons more-opt-btn">more_vert</i>
          </md-button>
        </div>
        <div class="popOver">
          <transition name="slide">
            <ul class="child" v-if="isShow">
              <li><a href="">Share</a></li>
              <li @click="copy_link(feed.pk_post_id)">
                <a>Copy link </a>
              </li>
              <li @click="reportPost(feed.pk_post_id)"><span>Report</span></li>

              <li
                v-if="user_id && user_id == feed.posted_id"
                @click="deletePost(feed.pk_post_id)"
              >
                <a>Delete</a>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>

    <!------- <div
      v-if="feed.post_type == 'post' && feed.files.length > 0"
      class="post-title"
    >
      <div v-if="feed.title != null">
        <span v-if="feed.title.length < 300">{{ feed.title }}</span>
        <span :class="display" v-else>
          {{ feed.title.substring(0, 300) + "..." }}
          <a class="readmore" @click="seeMore()"> See More </a></span
        >
        <span v-if="expandReadmore">{{ feed.title }}</span>
      </div>
    </div>------>

    <div v-if="feed.post_type == 'checkin'" class="post-title">
      <div v-if="feed.title != null">
        <span v-if="feed.title.length < 300">{{ feed.title }}</span>
        <span :class="display" v-else>
          {{ feed.title.substring(0, 300) + "..." }}
          <a class="readmore" @click="seeMore()"> See More </a></span
        >
        <span v-if="expandReadmore">{{ feed.title }}</span>
      </div>
    </div>

    <!-----  <div v-if="feed.post_type == 'link'" class="post-title">
      <span v-if="feed.title.length < 300">{{ feed.title }}</span>
      <span :class="display" v-else>
        {{ feed.title.substring(0, 300) + "..." }}
        <a class="readmore" @click="seeMore()"> See More </a></span
      >
      <span v-if="expandReadmore">{{ feed.title }}</span>
    </div>----->

    <vue-confirm-dialog></vue-confirm-dialog>
    <!-- <md-dialog :md-active.sync="showDialog">Modal_Contents_Comes_Here</md-dialog> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import ClickOutside from "vue-click-outside";
export default {
  props: ["feed", "model"],

  data() {
    return {
      isShow: false,
      showDialog: false,
      display: "display-block",
      expandReadmore: false
    };
  },
  directives: {
    ClickOutside
  },
  filters: {
    capitalize(value) {
      if (!value) return;
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },

  methods: {
    copy_link(id) {
      var copyLink = window.location.href + "/post/" + id;
      this.isShow = false;

      this.$copyText(copyLink).then(() => {
        this.$swal({
          position: "center",
          icon: "success",
          title: "Link copied successfully",
          showConfirmButton: false,
          timer: 1500
        });
      });
    },
    reportPost(id) {
      this.isShow = false;
      this.$swal({
        title: "Report Post",
        text: "Are you sure? you want to report this post?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Report the post!"
      }).then(result => {
        // <--
        if (result.value) {
          const data = {
            type: "post",
            reference_id: id,
            report: "Spam"
          };
          this.$store.dispatch("reportPost", data);
          this.showCommentOption = false;
        }
      });
    },
    hide() {
      this.isShow = false;
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
    profileHandler(name, id) {
      if (name !== "" && id !== "") {
        localStorage.setItem("profile_user_id", id);
        localStorage.setItem("profile_user_name", name);
        this.$router.push({ path: "/profile/" + this.slugify(name) });
      } else {
        alert("something went wrong");
      }
    },
    popLstOpen() {
      // this.showDialog = true;
    },
    seeMore() {
      this.expandReadmore = !this.expandReadmore;
      this.display = "display-none";
      if (this.expandReadmore) {
        this.display = "display-none";
      } else {
        this.display = "display-block";
      }
    },
    //onclick readmore new feed title

    deletePost(id) {
      this.$swal({
        title: "Delete Post",
        text: "Are you sure? you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!"
      }).then(result => {
        // <--
        if (result.value) {
          const data = {
            model: this.model,
            postid: id
          };
          this.$store
            .dispatch("DeletePost", data)
            .then(response => console.log(response))
            .catch(error => console.log(error));
        }
      });
    }
  },
  computed: {
    getFirstChar() {
      return name => name.charAt(0);
    },
    ...mapState({
      user_id: state => state.user.user_id
    }),
    profileUrl() {
      return this.$store.getters.getProfileUrl;
    },
    profileIconUrl() {
      return this.$store.getters.getProfileIconUrl;
    },
    getshare() {
      return this.$store.getters.getShared;
    },
    getSlug() {
      return name => this.slugify(name);
    }
  }
};
</script>
<style scoped>
.post-link {
  color: #4599ff;
}
.profile-text {
  background-color: #ff5722;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-text .text {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.post-title {
  padding: 0 10px;
  margin-bottom: 10px;
}
.readmore {
  cursor: pointer;
}
.post-hdr-bx {
  position: relative;
  flex-shrink: 0;
  margin: 0;
  display: flex;
  /* border-bottom: 1px solid #efefef; */
  height: auto;
  padding: 16px 10px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
}
.profile-name {
  text-transform: capitalize;
  line-height: 1.2;
}
.shared {
  color: #333332;
  font-weight: 600;
}
.display-block {
  display: block;
}
.display-none {
  display: none !important;
}
.header-post {
  width: 400px;
}
.pst-thmb-1 {
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: none;
  -ms-flex: none;
  flex: none;
}
.md-list-item:hover {
  cursor: pointer;
  background-color: rgb(245, 248, 250);
}
.thmb-lnk-1 {
  cursor: pointer;
  background-color: #fafafa;
  border: 2px solid #fff;
  box-shadow: inset 0 1.5px 3px 0 rgba(0, 0, 0, 0.15),
    0 1.5px 3px 0 rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  overflow: hidden;
  position: relative;
}
.thmb-lnk-img-1 {
  height: 100%;
  width: 100%;
}
.pst-time-bx {
  color: #999;
  font-size: 10px;
  margin-left: 7px;
  margin-top: -20px;
}
.post-owner-desc {
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  margin-left: 12px;
  overflow: hidden;
  margin-left: 10px;
}
.post-owner-desc-1 {
  color: #999;
  font-size: 11px;
  line-height: 1.3;
}
.post-owner-link {
  color: #191919 !important;
  font-weight: 500;
  line-height: 1;
  font-size: 13px;
}
.more-opt-btn {
  font-size: 21px;
  display: flex;
}
.profile-image-wrapper {
  height: 30px;
  width: 30px;
}
.md-menu-content-bottom-start {
  left: 666px !important;
  max-width: 210px;
  min-width: 210px;
  /* min-height: 304px; */
  height: auto;
}
.md-menu-content-bottom-start ul {
  cursor: pointer;
}

ul {
  cursor: pointer;
}

.slide-enter-active {
  -moz-transition-duration: 0.1s;
  -webkit-transition-duration: 0.1s;
  -o-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}
.slide-leave-active {
  /* transition-duration: 0.3s;
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1); */
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.popOver {
  position: absolute;
  width: 100%;
  right: 15px;
  top: 52px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-basis: auto;
  flex-direction: column;

  min-width: 210px;
  max-width: 210px;
  z-index: 1;
}
.popOver ul {
  border-radius: 5px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.popOver ul li {
  transition: all ease-in-out 0.2s;
  padding: 13px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: 100%;
  transition: all ease-in-out 0.3s;
  background-color: #fff;
}
.popOver ul li a,
span {
  color: #191919;
}
.popOver ul li:hover {
  background-color: rgba(230, 236, 240, 0.88);
}
.popoverWrap {
  position: absolute;
  right: 5px;
  top: 0;
  display: flex;
  align-items: center;
  height: 100%;
}
.popoverWrap button {
  width: 32px;
  height: 32px;
  min-width: 32px;
  display: inline-flex;
  align-items: center;
}

@media screen and (max-width: 600px) {
  .post-hdr-bx {
    padding: 10px 10px;
  }
}

@media screen and (max-width: 320px) {
  .profile-name {
    font-size: 12px;
  }

  .post-title {
    font-size: 12px;
  }
}
</style>
