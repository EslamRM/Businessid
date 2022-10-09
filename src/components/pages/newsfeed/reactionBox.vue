<template>
  <div>
    <div class="reaction-bx-wrp">
      <div class="reaction-bx">
        <div class="reaction-top-container">
          <div :class="{ reaction_comment_border: feed.comments.length }">
            <div class="btn-container">
              <Like
                :likes="feed.total_like"
                :isliked="feed.isliked"
                :postid="feed.pk_post_id"
              ></Like>
              <div class="btn-reaction">
                <i
                  :class="{
                    'disabled-icon':
                      dashboard_access &&
                      dashboard_access.some(
                        el => el.type === 'social' && el.access === '0'
                      )
                  }"
                  class="material-icons reaction-icn-1"
                  >chat_bubble_outline</i
                >
                <md-tooltip md-direction="top">Comment</md-tooltip>
                <div class="reaction-count">{{ feed.total_comment }}</div>
              </div>
              <Share
                :shared="feed.isShared"
                :totalshare="feed.total_share"
                :id="feed.pk_post_id"
                :feed="feed"
              />
              <Bookmark
                :favourite="feed.isfavorite"
                :id="feed.pk_post_id"
                :total_share="feed.total_share"
              />
            </div>

            <!-- <div class="like-tag-1">
          <small>  </small>
          <span class="pst-time-bx" v-if="feed.created_at">
            {{feed.created_at}} ago
          </span>
        </div> -->
          </div>
        </div>

        <div
          v-if="feed.post_type == 'post' && feed.files.length > 0"
          class="post-title col-sm-12"
        >
          <div v-if="feed.title != null">
            <span
              v-if="feed.title.length <= 200"
              v-html="checkIsUrl(feed.title)"
            ></span>
            <span :class="display" v-else>
              {{ feed.title.substring(0, 200) + "..." }}
              <a class="readmore" @click="seeMore()"> more </a></span
            >
            <span v-if="expandReadmore" v-html="checkIsUrl(feed.title)"></span>
          </div>
        </div>

        <div v-if="feed.post_type == 'link'" class="post-title col-sm-12">
          <span
            v-if="feed.title.length <= 200"
            v-html="checkIsUrl(feed.title)"
          ></span>
          <span :class="display" v-else>
            {{ feed.title.substring(0, 200) + "..." }}
            <a class="readmore" @click="seeMore()"> more </a></span
          >
          <span v-if="expandReadmore" v-html="checkIsUrl(feed.title)"></span>
        </div>

        <Comments
          :feed="feed"
          :comments="feed.comments"
          :postid="feed.pk_post_id"
          :total_comment="feed.total_comment"
        ></Comments>
      </div>
    </div>
  </div>
</template>
<script>
import Like from "./like";
import Comments from "./comments";
import Bookmark from "./bookmark";
import Share from "./share";
export default {
  props: ["feed"],
  components: { Like, Comments, Bookmark, Share },
  data() {
    return {
      showDialog: true,
      expandReadmore: false,
      display: "display-block"
    };
  },
  methods: {
    checkIsUrl(textToCheck) {
      const URLMatcher = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;

      return textToCheck.replace(
        URLMatcher,
        match =>
          `<a class="coment-url" target="_blank" href="${match}">${match}</a>`
      );
    },
    seeMore() {
      this.expandReadmore = !this.expandReadmore;
      this.display = "display-none";
      if (this.expandReadmore) {
        this.display = "display-none";
      } else {
        this.display = "display-block";
      }
    }
  },
  computed: {
    dashboard_access() {
      return this.$store.state.profile.dashboard_access;
    }
  }
};
</script>
<style scoped>
a.coment-url {
  text-decoration: underline !important;
}
.md-button {
  color: #484848 !important;
  height: 35px;
  min-width: auto;
  padding: 0;
}
.reaction-bx {
  /* padding-top: 8px; */
}
.readmore {
  cursor: pointer;
  font-size: 14px;
}
.left-icon {
  padding: 0 8px;
}
.btn-bookmark {
  float: right;
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
.like-tag-1 {
  padding-left: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #484848;
}
.btn-container {
  display: inline-flex;
  padding: 5px 10px;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;
}
.liked-post-icon {
  color: red;
}
.reaction-top-container {
  /* margin-bottom: 15px; */
}
.reaction_comment_border {
  border-bottom: 1px solid #e4e4e4;
}
.display-block {
  display: block;
}
.display-none {
  display: none !important;
}
.comment-box-lst {
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
}
button.md-button .md-theme-default:focus {
  background: none;
}
.lst-comments-itm {
  padding-bottom: 0px;
  line-height: 1.5;
}
.comment-owner {
  font-weight: 500;
  color: #191919 !important;
}
.comment-txt {
  margin-left: 6px;
}
.add-comment-box {
  border-top: 1px solid #e4e4e4;
  position: relative;
}
.post-comment-bx {
  display: block;
  width: 100%;
  border: none;
  padding: 10px;
  outline: none !important;
  font-weight: 500;
  padding-right: 54px;
}

.btn-reaction {
  position: relative;
  padding-right: 4px;
  display: inline-flex;
  align-items: center;
}
.reaction-count {
  text-align: center;
  font-size: 11px;
}

.post-title {
  color: #0f1419;
  line-height: 19px;
  font-size: 14px;
  font-weight: 400;
  /* color: #050505; */
  padding-top: 12px;
  padding-bottom: 5px;
  padding-left: 12px;
  padding-right: 12px;
}
@media screen and (max-width: 600px) {
  .post-title {
    font-size: 12px;
  }

  .comment-txt {
    font-size: 11px;
  }
}
</style>
