<template>
  <div class="">
    <div class="video-comment-info">
      <div class="head">{{ comments.total_comments }} Comments</div>
      <div class="comment-box comment_typing">
        <div class="avathar-img" v-if="user">
          <img v-if="user.logo" :src="user.logo" />
          <div v-else class="profile-default-text">
            <span class="text">{{ user.trade_name_en.substring(0, 1) }}</span>
          </div>
        </div>
        <div class="comment-form">
          <md-field>
            <label>Type here!</label>
            <md-textarea md-autogrow v-model="txtComment"></md-textarea>
          </md-field>
          <md-button
            @click="handleSubmit(comments.pk_post_id)"
            class="md-button"
          >
            <md-icon>comment</md-icon><span>Comment</span>
          </md-button>
        </div>
      </div>
      <div v-if="postComments">
        <div
          class="comment-box"
          v-for="(comment, index) in postComments"
          :key="index"
        >
          <div class="avathar-img">
            <img v-if="comment.usericon" :src="comment.usericon" />
            <div v-else class="profile-default-text">
              <span class="text">{{ comment.username.substring(0, 1) }}</span>
            </div>
          </div>
          <div class="comment-form">
            <div class="comment-content">
              <router-link
                :to="userProfileUrl(comment.username, comment.userid)"
              >
                <div class="name">
                  {{ comment.username || comment.trade_name_en }}
                  <span>{{ agoDate(comment.created_at) }} </span>
                </div>
              </router-link>
              <p>{{ comment.comment }}</p>
            </div>
          </div>

          <div class="delete-comment" v-if="user_id">
            <div
              class="comment-options"
              v-if="user_id == comment.userid"
              @click="deleteComment(comment.pk_comment_id, index)"
            >
              <i class="material-icons"> delete_forever </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import moment from "moment";

export default {
  components: {},
  props: ["comments"],
  data() {
    return {
      txtComment: "",
      showDialog: false,
      postComments: []
    };
  },
  computed: {
    agoDate() {
      return date => moment(date).fromNow();
    },
    ...mapState({
      user: state => state.user.profile.profile,
      user_id: state => state.user.user_id
    })
  },
  created() {
    this.postComments = this.comments.comments;
  },
  methods: {
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
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
    deleteComment(id, index) {
      // this.iscommentOption=true;
      this.$swal({
        title: "Delete comment",
        text: "Are you sure you want to delete?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!"
      }).then(result => {
        // <--
        if (result.value) {
          this.postComments.splice(index, 1);
          const data = {
            commentid: id
          };
          this.$store
            .dispatch("deleteComment", data)
            .then(response => {})
            .catch(error => console.log(error));
        }
      });
    },
    handleSubmit(id) {
      if (this.txtComment != null && this.txtComment.trim() !== "") {
        const token = localStorage.getItem("token");
        if (token) {
          //console.log("Commented");
          axios
            .post("api_comment", {
              postid: id,
              comment: this.txtComment
            })
            .then(response => {
              const result = { ...response.data.result };
              const usericon = this.user.logo;
              const username = this.user.trade_name_en;
              const pk_comment_id = result.pk_comment_id;
              const userid = result.fk_user_id;
              // const user = {  };

              const data = {
                username,
                usericon,
                pk_comment_id,
                id,
                userid,
                usericon,
                ...result
              };
              console.log(data);

              this.postComments.push(data);
              this.txtComment = "";
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.showDialog = true;
        }
      }
    }
  }
};
</script>
<style scoped>
.comment-options {
  cursor: pointer;
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  border-radius: 4px;
  justify-content: center;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.comment-options:hover,
.comment-options:focus {
  background: rgba(0, 0, 0, 0.11);
}
.comment-options i {
  color: rgba(0, 0, 0, 0.77);
  font-size: 23px;
}
.video-comment-info {
  margin-top: 1.9em;
}
.video-comment-info .head {
  font-size: 15px;
  font-weight: 500;
  color: #555;
  margin-bottom: 0.7em;
}
.comment_typing .avathar-img {
  margin-top: -20px;
}

.comment-box {
  display: flex;
  align-items: center;
  margin-bottom: 1.2em;
  /* overflow: hidden; */
}
.comment-box .avathar-img {
  margin-right: 10px;
  width: 100%;
  max-width: 36px;
  max-height: 36px;
  min-width: 36px;
  min-height: 36px;
  position: relative;
  margin-top: -20px;
}
.comment-box .avathar-img img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
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
  margin-top: 1.1em;
  float: right;
  margin-left: auto;
  background-color: #f3eeee;
  padding: 0px;
}
.comment-content .name {
  font-size: 14px;
  font-weight: 600;
  display: inline-block;
}
.comment-content .name span {
  color: #a9a9a9;
  font-size: 12px;
  margin-left: 0.4em;
  font-weight: 500;
}
.comment-content p {
  color: #555;
  margin-top: 0.5em;
  font-size: 13px;
}
.red {
  color: red;
}
.comment-form button {
  height: 33px;
  /* color: rgb(254, 87, 34) !important; */
}
.comment-form button span {
  position: relative;
  top: 1.5px;
}
@media screen and (max-width: 1000px) {
  .comment-form .md-button {
    margin-right: 0px;
  }

  .comment-form button span {
    margin-left: 5px;
    font-size: 13px;
  }
  .comment-form button i {
    color: #737374 !important;
  }
  .video-comment-info .head {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .comment-box .avathar-img {
    margin-right: 10px;
    width: 100%;
    max-width: 30px;
    max-height: 30px;
    min-width: 30px;
    min-height: 30px;
    position: relative;
    margin-top: -28px;
  }
}

@media screen and (max-width: 600px) {
  .comment-form .md-button {
    padding-right: 9px;
    padding-left: 7px;
  }
  .comment-form .md-button {
    margin-top: 0.9em;
  }

  .comment-box {
    margin-bottom: 1em;
  }
  .video-comment-info .head {
    margin-bottom: 0em;
    font-size: 13px;
  }
  .video-comment-info {
    margin-top: 1.5em;
  }

  .comment-form button i {
    font-size: 16px !important;
  }
  .comment-form button span {
    margin-left: 2px;
    font-size: 12px;
  }
  .comment-content .name {
    font-size: 11px;
    color: #8c8d8c;
  }
  .comment-content .name span {
    font-size: 11px;
    color: #8c8d8c;
  }

  .comment-content p {
    color: #040404;
    margin-top: 0.5em;
    font-size: 12px;
  }

  .comment-box .avathar-img {
    max-width: 30px;
    max-height: 30px;
    min-width: 30px;
    min-height: 30px;
    margin-top: -23px;
  }
}

@media screen and (max-width: 360px) {
  .comment-box .avathar-img {
    margin-top: -25px;
  }
}

@media screen and (max-width: 300px) {
  .video-comment-info .head {
    font-size: 13px;
  }
}
</style>
