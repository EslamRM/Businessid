<template>
  <div v-click-outside="hide,hideOptions">
    <div class="comment-holder">
      <div class="" v-if="comment.user != null">
        <!-- <router-link
          :to="userProfileUrl(comment.user.trade_name_en, comment.user.id)"
          class="username"
        >
          <img
            v-if="comment.user.logo"
            :src="comment.user.logo"
            alt="img"
            class="user-img w-50"
          />
          <p v-else>{{ comment.user.trade_name_en }}</p></router-link
        > -->
        <!-- <div class="comment-container">
          <img
            v-if="comment.user.logo"
            :src="comment.user.logo"
            alt="img"
            class="user-img"
          />
          <div class="msg me">
            <span class="partner">{{ comment.user.trade_name_en }}</span
            >{{ comment.comment }}
          </div>
        </div> -->
        <div class="post-hdr-bx">
          <div class="pst-thmb-1">
            <div class="thmb-lnk-1">
              <router-link
                v-if="comment.user"
                :to="
                  /profile/ + getSlug(comment.user.trade_name_en) + '/' + comment.user.id
                "
              >
                <div class="profile-image-wrapper">
                  <img
                    v-if="comment.user.logo != ''"
                    :src="comment.user.logo"
                    class="thmb-lnk-img-1"
                  />
                  <div v-else class="profile-text">
                    <div class="text">
                      {{ getFirstChar(comment.user.trade_name_en) }}
                    </div>
                  </div>
                </div>
                <md-tooltip md-direction="bottom"
                  >Visit {{ comment.user.trade_name_en }} Profile</md-tooltip
                >
              </router-link>
            </div>
          </div>
          <div class="post-owner-desc">
            <div class="header-post">
              <div class="profile-name">
                <router-link
                  class="mb-2"
                  v-if="comment.user"
                  :to="
                    /profile/ +
                    getSlug(comment.user.trade_name_en) +
                    '/' +
                    comment.user.id
                  "
                >
                  <span class="partner">{{
                    comment.user.trade_name_en
                  }}</span></router-link
                >{{ comment.comment }}
              </div>
              <span class="pst-time-bx">{{ comment.created_at }}</span>
              <div class="action mt-1">
                <transition name="slide">
                  <div>
                    <a @click="reply(comment.pk_comment_id)"> Reply </a>
                    <div class="dropdown">
                      <a
                        class="dropbtn"
                        v-if="
                          user_id === feed.posted_id && feed.posted_id != comment.user.id
                        "
                        @click="
                          reportComment(comment.pk_comment_id),
                            block(comment.pk_comment_id)
                        "
                      >
                        Block
                      </a>
                      <div class="dropdown-content" v-if="show">
                        <a href="#">Block {{ comment.user.trade_name_en }}</a>
                        <a href="#">Block Comment</a>
                      </div>
                    </div>
                    <a
                      v-if="user_id == feed.posted_id || user_id == comment.user.id"
                      @click="deleteComment(comment.pk_comment_id, index)"
                    >
                      Delete</a
                    >
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
        <!-- <span
          class="comment-txt photo-page-mini-profile"
          v-if="comment.comment.length <= 150"
          v-html="checkIsUrl(comment.comment)"
        ></span>
        <span v-else>
          <span
            :class="'comment-txt' + ' ' + display"
            v-html="checkIsUrlWithSubstring(comment.comment)"
          >
          </span> -->
        <!-- <a :class="'readmore' + ' ' + display" @click="seeMore()"> more </a> -->
        <!-- </span> -->
        <!-- <span
          class="comment-txt"
          v-if="expandReadmore"
          v-html="checkIsUrl(comment.comment)"
        ></span> -->

        <!-- <div
        class="delete-comment"
        v-if="
          user_id &&
            dashboard_access &&
            dashboard_access.some(
              el => el.type === 'social' && el.access === '1'
            )
        "
      >
        <div
          class="comment-options"
          v-if="user_id == comment.user.id"
          @click="deleteComment(comment.pk_comment_id, index)"
        >
          <i class="material-icons"> delete_forever </i>
        </div>
      </div> -->
        <!-- <div class="delete-comment feed-comment">
        <span class="material-icons comment-options">
          more_horiz
        </span>
      </div> -->
      </div>
      <!-- Reply Section -->
      <div class="pst-thmb-1 reply" v-if="comment_id === comment.pk_comment_id">
        <div class="thmb-lnk-1">
          <router-link
            v-if="user"
            :to="/profile/ + getSlug(user.trade_name_en) + '/' + user.id"
          >
            <div class="profile-image-wrapper">
              <img v-if="user.logo != ''" :src="user.logo" class="thmb-lnk-img-1" />
              <div v-else class="profile-text">
                <div class="text">
                  {{ getFirstChar(user.trade_name_en) }}
                </div>
              </div>
            </div>
            <md-tooltip md-direction="bottom"
              >Visit {{ user.trade_name_en }} Profile</md-tooltip
            >
          </router-link>
        </div>
        <input
          :disabled="
            dashboard_access &&
            dashboard_access.some((el) => el.type === 'social' && el.access === '0')
          "
          type="text"
          v-on:keyup.enter="onEnter(postid)"
          v-model="txtComment"
          placeholder="Reply"
          class="big-data post-comment-bx"
        />
      </div>
      <!-- End Reply Section-->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ClickOutside from "vue-click-outside";
import comments from "./comments.vue";

export default {
  props: ["comment", "index", "postid", "feed"],
  data() {
    return {
      display: "",
      comment_id: "",
      show: false,
      block_id: "",
      showCommentOption: false,

      expandReadmore: false,
    };
  },
  components: {
    comments,
  },
  directives: {
    ClickOutside,
  },
  computed: {
    ...mapState({
      dashboard_access: (state) => state.profile.dashboard_access,
      user: (state) => state.user.profile.profile,
      user_id: (state) => state.user.user_id,
    }),
    getSlug() {
      return (name) => this.slugify(name);
    },
    getFirstChar() {
      return (name) => name.charAt(0);
    },
  },
  created() {
    console.log(
      this.user_id === this.feed.posted_id || this.user_id === this.comment.fk_user_id
    );
  },
  methods: {
    block(id) {
      this.block_id = id;
      this.show = !this.show;
    },
    reply(id) {
      this.comment_id = id;
    },
    reportComment(id) {
      const data = {
        type: "comment",
        reference_id: id,
        report: "Spam",
      };
      this.$store.dispatch("reportPost", data);
      this.showCommentOption = false;
    },
    hide() {
      this.showCommentOption = false;
    },
    hideOptions(){
      if (this.show) {
        this.show = false;
      }
    },
    deleteComment(id) {
      this.$swal({
        title: "Delete  comment",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!",
      }).then((result) => {
        // <--
        if (result.value) {
          this.$emit("deleteComment", id, this.index);
        }
      });
      // this.iscommentOption=true;
    },
    checkIsUrl(textToCheck) {
      const URLMatcher = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

      return textToCheck.replace(
        URLMatcher,
        (match) => `<a class="coment-url" target="_blank" href="${match}">${match}</a>`
      );
    },
    checkIsUrlWithSubstring(textToCheck) {
      const URLMatcher = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
      var text = textToCheck.replace(
        URLMatcher,
        (match) => `<a class="coment-url" target="_blank" href="${match}">${match}</a>`
      );

      return text.substring(0, 150) + "...";
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
    userProfileUrl(name, id) {
      return `/profile/${this.slugify(name)}/${id}`;
    },
    slugify(text, ampersand = "and") {
      const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
      const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
      const p = new RegExp(a.split("").join("|"), "g");
      return text
        .toString()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(p, (c) => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
  },
};
</script>

<style scoped>
/* new */
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: block;
  position: absolute;
  border-radius: 10px;
  background-color: #f9f9f9;
  width: max-content;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown-content a {
  color: black;
  padding: 5px 16px;
  text-decoration: none;
  display: block;
}
.dropdown-content a:first-child {
  padding-top: 14px;
}
.dropdown-content a:last-child {
  padding-bottom: 14px;
}
.action a {
  color: lightslategrey;
  margin-right: 5px;
  margin-top: 3px;
  font-size: 11px;
  cursor: pointer;
}
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
  display: grid;
  color: darkslateblue;
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
  margin-top: -25px;
}
.reply {
  width: 70%;
  display: flex;
  margin-left: 10%;
  margin-top: -12px;
}
.reply .profile-image-wrapper {
  height: 25px;
  width: 25px;
}
.md-list-item:hover {
  cursor: pointer;
  background-color: rgb(245, 248, 250);
}
.thmb-lnk-1 {
  cursor: pointer;
  background-color: #fafafa;
  border: 2px solid #fff;
  box-shadow: inset 0 1.5px 3px 0 rgba(0, 0, 0, 0.15), 0 1.5px 3px 0 rgba(0, 0, 0, 0.15);
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
  color: lightslategrey;
  font-size: 9px;
  margin-left: 7px;
  margin-top: -20px;
  float: right;
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
  overflow: visible;
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
@media screen and (max-width: 500px) {
  .post-hdr-bx {
    display: -webkit-box;
  }
  .pst-time-bx {
    margin-top: 10px;
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
/* end */
.user-img {
  width: 8%;
  border-radius: 50%;
  box-shadow: inset 0 1.5px 3px 0 rgb(0 0 0 / 15%), 0 1.5px 3px 0 rgb(0 0 0 / 15%);
  margin-top: -25px;
}
.comment-container {
  position: relative;
  list-style: none;
  display: block;
  margin-top: 1.5rem;
  margin: 1rem 0;
  transition: 0.5s all;
}
.comment-container:after {
  display: table;
  content: "";
  clear: both;
}
.msg.me {
  background-color: #fff;
  color: lightslategrey;
  border-bottom-left-radius: 0.125rem;
}
.msg {
  max-width: 100%;
  display: inline-block;
  padding: 1.5rem;
  line-height: 1rem;
  min-height: 2rem;
  font-size: 1.2rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  word-break: break-all;
  text-transform: capitalize;
}
.msg.me > span {
  left: 0;
}
.profile-name span.partner {
  font-weight: bold;
  color: lightslategrey;
  font-size: 1rem;
  top: -3px;
  left: 55px;
  margin-top: 0rem;
  margin-bottom: 5px;
  width: max-content;
}
.msg > span.time {
  color: #cfd8dc;
  font-size: 0.5rem;
  bottom: -0.35rem;
}
.msg > span {
  font-weight: 500;
  position: absolute;
}
.username .user-img {
  width: 50%;
  border-radius: 50%;
}
.popOver {
  position: absolute;
  width: 100%;
  right: 15px;
  top: 25px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  flex-basis: auto;
  flex-direction: column;

  min-width: 210px;
  max-width: 210px;
  z-index: 10;
}
.popOver ul {
  border-radius: 5px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14),
    0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.popOver ul li {
  transition: all ease-in-out 0.2s;
  padding: 13px;
  display: flex;
  flex-direction: row;
  width: 100%;
  cursor: pointer;
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
.comment-holder {
  align-items: center;
  position: relative;
  margin-top: 10px;
}
.comment-wrapper {
  visibility: hidden;
}
.comment-holder:hover .comment-wrapper {
  background-color: #4a4a4a0d;
  visibility: visible;
  height: 30px;
  cursor: pointer;
  border-radius: 50px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0px;
  margin-left: 6px;
}
/* .photo-page-mini-profile:hover .comment-options {
  display: inline-block;
  vertical-align: center;
  align-content: center;
  align-items: center;
}
span.material-icons.comment-options {
  display: inline-block;
  vertical-align: middle;
} */
.delete-comment.feed-comment {
  display: none;
}
/* span.material-icons.fe {
  display: inline-block;
} */

.readmore {
  cursor: pointer;
}
.post-comment-bx {
  display: block;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 20px;
  outline: none !important;
  font-weight: 500;
  padding: 5px 10px;
  font-size: 13px;
}
.add-comment-box button.md-button {
  height: 22px !important;
  font-size: 12px;
  top: 8px;
  right: 9px;
  min-width: 55px;
}
.display-block {
  display: block;
  line-height: 20px;
}

.display-none {
  display: none !important;
  line-height: 20px;
}
.comment-txt {
  padding-left: 5px;
  font-size: 12px;
  font-weight: 300;
  color: #65676b;
  position: relative;
  line-height: 20px;
}
.delete-comment {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  transition: all ease-in-out 0.33s;
}
.comment-options i {
  position: absolute;
  right: 0px;
  top: -2.5px;
  transition: all ease-in-out 0.33s;
}
.add-comment-box {
  border-top: 1px solid #e4e4e4;
  position: relative;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.comment-box-lst {
  padding: 13px 13px;
}
.created-comment {
  position: relative;
}
.comment-time {
  color: lightslategrey;
  font-size: 8px;
  padding-bottom: -5px;
  position: absolute;
  bottom: 2px;
  right: 0;
}
.md-dialog-container {
  width: 400px;
}
.md-dialog {
  width: 400px;
}
span.material-icons.feed-comment {
  padding-left: 10px;
  cursor: pointer;
}
.photo-page-mini-profile {
  display: inline-block;
  max-width: 92%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-decoration: none;
  /* background-color: rgba(230, 236, 240, 0.55); */
  background-color: #f9f9f9;
  padding: 10px;
  /* border-radius: 0px 19px 19px 19px; */
  border-radius: 19px;
  padding-right: 13px;
  vertical-align: middle;
  margin-bottom: 4px;

  padding-left: 13px;
  margin-bottom: 4px;
  margin-top: 4px;
}
.photo-page-mini-profile h3 {
  font-size: 14px;
  font-weight: 500;
}
.comment-options {
  padding-left: 10px;
}
.comment-options i {
  font-size: 19px;
  /* border: 1px solid #fe5722;
    border-radius: 50%; */
  color: #fe5722;
  cursor: pointer;
}
.holder {
  margin-right: 10px;
  max-width: 32px;
  max-height: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
}
.holder img {
  border-radius: 50%;
}
.comment-owner {
  font-weight: 500;
  color: #050505 !important;
}
.lst-comments-itm {
  padding-bottom: 0px;
  font-size: 13px;
  margin-bottom: 0px;

  padding-top: 9px;
}
.username {
  font-size: 12px;
  text-transform: capitalize;
  color: #050505 !important;
  font-weight: 600;
}

input[type="text"].big-data::-webkit-input-placeholder {
  font-size: 12px;
  font-weight: 300;
}

@media screen and (max-width: 768px) {
  .view-more-comments a {
    padding-top: 3px;
  }
}

@media screen and (max-width: 600px) {
  .view-more-comments a {
    margin-top: 10px;
    margin-bottom: -3px;
  }

  .view-more-comments a {
    padding-top: 2px;
  }

  .photo-page-mini-profile {
    max-width: 88%;
    padding: 10px;
    padding-right: 10px;
    margin-bottom: 4px;
    padding-left: 10px;
    margin-bottom: 3px;
    margin-top: 3px;
  }

  .comment-holder:hover .comment-wrapper {
    height: 30px;

    border-radius: 100px;
    width: 30px;
  }
}

@media screen and (max-width: 300px) {
  .photo-page-mini-profile {
    max-width: 85%;
  }
}
</style>
