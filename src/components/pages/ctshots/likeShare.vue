<template>
  <div class="btnShotWrap">
    <div class="level-right">
      <div class="btn-right-group" style="display: inline-flex">
        <div
          class="btm-btn-action mr-2 pl-0"
          @click="handleUnLike()"
          v-if="liked"
        >
          <md-icon class="liked-post-icon">favorite</md-icon
          ><span class="countIn">{{ count }}</span>
          <md-tooltip md-direction="top">{{ count }} Likes</md-tooltip>
        </div>
        <div class="btm-btn-action mr-2 pl-0" @click="handleLike(id)" v-else>
          <md-icon>favorite_border</md-icon> {{ count }}
          <md-tooltip md-direction="top">{{ count }} Likes</md-tooltip>
        </div>
        <div class="btm-btn-action mr-2">
          <md-icon>visibility</md-icon><span class="countIn">{{ views }}</span>
          <md-tooltip md-direction="top">{{ views }} Views</md-tooltip>
        </div>
        <div class="btm-btn-action mr-2">
          <md-icon>comment</md-icon
          ><span class="countIn">{{ total_comments }}</span>
          <md-tooltip md-direction="top"
            >{{ total_comments }} Comments</md-tooltip
          >
        </div>
      </div>
    </div>
    <div class="shareShot"><md-icon>share</md-icon><span>Share</span></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  props: ["likes", "isliked", "id", "follow", "views", "total_comments"],
  data () {
    return {
      liked: false,
      count: 0,
      following: false
    };
  },
  watch: {
    likes: function (val, Oldval) {
      if (val != undefined) {
        this.count = val;
      }
    },
    isliked: {
      handler (val, oldVal) {
        if (val != undefined) {
          this.liked = val;
        }
      },
      deep: true
    },

    follow: function (val, Oldval) {
      if (val != undefined) {
        this.following = val;
      }
    },
    "$route.params.id": function (id) {
      this.liked = this.isliked;
      this.count = this.likes;
      this.following = this.follow;
    }
  },

  methods: {
    handleUnLike (id) {
      this.liked = false;
      this.count--
      axios
        .post("/api_like", {
          postid: this.id,
          type: "like",
          like: "dislike"
        })
        .then(response => {
          if (response.data.success == false) {
            this.liked = true;
            this.count++;
          } else {
            this.liked = false;
            this.count = response.data.result
          }
        })
        .catch(error => {
          console.log(error);
          this.liked = true;
          this.count++;
        });
    },
    handleLike (id) {
      this.liked = true;
      this.count++
      axios
        .post("/api_like", {
          postid: id,
          type: "like",
          like: "like"
        })
        .then(response => {
          if (response.data.success == false) {
            this.liked = false;
            this.count--;
          } else {
            this.liked = true;
            this.count = response.data.result
          }
        })
        .catch(error => {
          console.log(error);
          this.liked = false;
          this.count--;
        });
    },
    handleUnfollow (id) {
      this.following = false;
      const data = {
        profileid: id,
        follow: 0
      };
      this.$store
        .dispatch("followUser", data)
        .then(response => {
          if (response.success == false) {
            this.following = true;
          }
        })
        .catch(error => console.log(error));
    },
    handlefollow (id) {
      this.following = true;
      const data = {
        profileid: id,
        follow: 1
      };

      this.$store
        .dispatch("followUser", data)
        .then(response => {
          this.following == false;
        })
        .catch(error => console.log(error));
    }
  },
  created () {
    this.liked = this.isliked;
    this.count = this.likes;
    this.following = this.follow;
  }
};
</script>
<style scoped>
.shareShot {
  cursor: pointer;
}
.shareShot:hover span,
.shareShot:hover i {
  color: #333;
}

.shareShot i.md-icon.md-icon-font.md-theme-default {
  margin-right: 4px !important;
  font-size: 22px !important;
  float: left;
}
.shareShot span {
  float: left;
  margin-top: 5px;
}
.btn-right-group .md-icon {
  color: #333;
  /* color: rgb(38, 38, 38); */
  font-size: 21px !important;
}
.level-right {
  align-items: center;
  justify-content: flex-end;
  margin-top: -4px;
}
.liked-post-icon {
  color: red !important;
}
.btm-btn-action {
  padding: 0px 8px;
  margin: 0px;
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.countIn {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.77);
}
.btnShotWrap {
  display: flex;
  justify-content: space-between;
  padding-top: 1em;
}
.shareShot button {
  height: 33px;
  display: flex;
  align-items: center;
  padding: 5px 2px;
  color: #333 !important;
  font-size: 14px;
}
.shareShot button i {
  font-size: 20px !important;
  margin-right: 3px !important;
  position: relative;
  color: #333 !important;
  top: 0px;
}
.shareShot button span {
  position: relative;
  top: 2px;
  text-transform: capitalize;
}
.followBtn {
  height: 31px;
  border: 1px solid #191919 !important;
}
.followBtn.following {
  background: #eee;
}

@media screen and (max-width: 1000px) {
  .btn-right-group .md-icon {
    margin-right: 3px;
  }
}
@media screen and (max-width: 1000px) {
  .shareShot i.md-icon.md-icon-font.md-theme-default {
    font-size: 21px !important;
    margin-right: 2px !important;
  }
}

@media screen and (max-width: 600px) {
  .shareShot span {
    font-size: 13px;
  }

  .shareShot i.md-icon.md-icon-font.md-theme-default {
    font-size: 19px !important;
    margin-right: 0px !important;
  }

  .btn-right-group .md-icon {
    font-size: 19px !important;
    margin-right: 3px !important;
  }
}
</style>
