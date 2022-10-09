<template>
  <div class="comment-wrapper">
    <div class="" v-if="postComments">
      <div>
        <div
          class="lst-comments-itm comment-box-lst"
          v-for="(comment, index) in postComments"
          :key="index"
        >
          <Comment
            :comment="comment"
            :index="index"
            @deleteComment="deleteComment"
          />
        </div>
      </div>
      <div
        class="view-more-comments"
        v-if="total_comment > 2 && islastComment == false"
      >
        <a
          v-if="!loadingMore"
          class="md-button md-theme-default"
          @click="loadMoreComment(postid)"
        >
          more comments</a
        >
        <md-progress-spinner
          v-else
          :md-diameter="30"
          :md-stroke="2"
          md-mode="indeterminate"
        ></md-progress-spinner>
      </div>
    </div>
    <div
      class="add-comment-box"
      v-if="
        dashboard_access &&
          dashboard_access.some(el => el.type === 'social' && el.access === '1')
      "
    >
      <input
        :disabled="
          dashboard_access &&
            dashboard_access.some(
              el => el.type === 'social' && el.access === '0'
            )
        "
        type="text"
        v-on:keyup.enter="onEnter(postid)"
        v-model="txtComment"
        placeholder="Post a Comment..."
        class="big-data post-comment-bx"
      />
      <md-button
        v-if="
          dashboard_access &&
            dashboard_access.some(
              el => el.type === 'social' && el.access === '1'
            )
        "
        @click="handleSubmit(postid)"
        style="color: #fe5722 !important"
        >post</md-button
      >
      <md-button v-else disabled style="color: #fe5722 !important"
        >post</md-button
      >

      <!-- <md-icon class="post-btn">send</md-icon> -->
    </div>
    <div>
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Login</md-dialog-title>
        <form
          novalidate
          class="md-layout pos-rel formLoginBox"
          @submit.prevent="handleLogin"
        >
          <md-dialog-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-100">
                <md-field>
                  <label for="email">Email</label>
                  <md-input
                    type="email"
                    name="email"
                    id="email"
                    autocomplete="email"
                    v-model="form.email"
                    :disabled="sending"
                  />
                  <div
                    v-if="submitted && $v.form.email.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.email.required"
                      >Email is required</span
                    >
                    <span v-if="!$v.form.email.email">Email is invalid</span>
                  </div>
                </md-field>
                <md-field>
                  <label for="password">Password</label>
                  <md-input
                    type="password"
                    name="password"
                    id="password"
                    autocomplete="password"
                    v-model="form.password"
                    :disabled="sending"
                  />
                  <div
                    v-if="submitted && $v.form.password.$error"
                    class="invalid-feedback"
                  >
                    <span v-if="!$v.form.password.required"
                      >Password is required</span
                    >
                  </div>
                </md-field>
                <md-progress-bar md-mode="indeterminate" v-if="sending" />
                <div class="forgot-password">Forgot your password ?</div>
                <div class="btn-wrap">
                  <md-button
                    class="md-raised md-accent md-block"
                    type="submit"
                    :disabled="sending"
                    >Log In</md-button
                  >
                </div>
                <span class="error-fill">{{ loginError }}</span>
              </div>
            </div>
          </md-dialog-content>
          <md-snackbar :md-active.sync="userSaved"
            >Login Successfull!!!</md-snackbar
          >
        </form>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false"
            >Close</md-button
          >
          <md-button class="md-primary" @click="showDialog = false"
            >Save</md-button
          >
        </md-dialog-actions>
      </md-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import Comment from "./comment";
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  name: "comment",
  props: ["comments", "postid", "total_comment"],
  components: { Comment },
  data() {
    return {
      loadingMore: false,
      expandReadmore: false,
      display: "",
      islastComment: false,
      showDialog: false,
      postComments: [],
      txtComment: "",
      sending: false,
      userSaved: false,
      form: {
        email: null,
        password: null
      },
      loginError: null,
      submitted: false,
      iscommentOption: false,
      page: 0
    };
  },
  validations: {
    form: {
      password: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapState({
      dashboard_access: state => state.profile.dashboard_access,
      user: state => state.user.profile.profile,
      user_id: state => state.user.user_id
    })
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
        .replace(p, c => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
    onEnter(id) {
      if (this.txtComment != null && this.txtComment.trim() !== "") {
        this.handleSubmit(id);
      }
      //
    },
    handleSubmit(id) {
      if (this.txtComment != null && this.txtComment.trim() !== "") {
        const token = localStorage.getItem("token");
        if (token) {
          axios
            .post("api_comment", {
              postid: id,
              comment: this.txtComment
            })
            .then(response => {
              const result = { ...response.data.result };
              const logo = this.user.logo;
              const trade_name_en = this.user.trade_name_en;
              const pk_comment_id = result.pk_comment_id;
              const id = result.fk_user_id;
              const user = { trade_name_en, logo, pk_comment_id, id };

              const data = { user, ...result };
              console.log(data);

              this.postComments.push(data);
              this.txtComment = "";
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          //this.showDialog = true;
          this.$router.push("login");
        }
      }
    },
    deleteComment(id, index) {
      // this.iscommentOption=true;
      console.log(index);
      this.postComments.splice(index, 1);
      const data = {
        commentid: id
      };
      this.$store
        .dispatch("deleteComment", data)
        .then(response => {})
        .catch(error => console.log(error));
    },
    loadMoreComment(id) {
      this.loadingMore = true;
      this.page++;
      const data = {
        page: this.page,
        postid: id
      };
      this.$store
        .dispatch("LoadComment", data)
        .then(response => {
          this.loadingMore = false;
          if (this.page == 1) {
            this.postComments = [];
          }
          this.postComments = [...this.postComments, ...response.result];
          if (response.isLast == true) {
            this.islastComment = true;
          }
        })
        .catch(error => {
          this.loadingMore = false;
          console.log(error);
        });
    },

    handleLogin(e) {
      this.submitted = true;
      this.sending = true;
      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.$store
        .dispatch("LOGIN", {
          email: this.form.email,
          password: this.form.password
        })
        .then(success => {
          this.sending = false;
          console.log("success");

          this.$store.dispatch("loggedIn_profile");
          this.showDialog = false;
          //this.$router.go()
          // this.$store.dispatch("LoadPosts", 1);
        })
        .catch(error => {
          this.loginError = error.data.message;
          this.sending = false;
        });
    }
  },
  created() {
    this.postComments = this.comments;
  }
};
</script>

<style scoped>
.readmore {
  color: #000000;
  cursor: pointer;
  font-size: 14px;
}
.view-more-comments {
  padding-bottom: 7px;
  text-align: center;
}
.view-more-comments a {
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  text-transform: capitalize;
  height: 23px !important;
  margin-top: 0.45em;
  color: #213a63;
  padding-left: 10px;
  padding-right: 10px;
}
a.coment-url {
  text-decoration: underline !important;
}
.comment-wrapper {
  clear: both;
}
.username {
  font-weight: bold;
}
.photo-page-mini-profile:hover .comment-options {
  display: block;
}
.comment-options {
  display: none;
}
.post-comment-bx {
  display: block;
  width: 100%;
  border: none;
  outline: none !important;
  font-weight: 500;
  padding: 10px 54px 10px 10px;
  font-size: 13px;
  padding-bottom: 1px;
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
  float: right;
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
  color: #bfbfbf;
  font-size: 10px;
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
.photo-page-mini-profile {
  display: inline-block;
  width: 100%;
  align-items: center;
  text-decoration: none;
  /*background-color: rgba(230, 236, 240, 0.55);*/
  /* background-color: #f0f2f5;*/
  /*  padding: 10px;*/
  /* border-radius: 0px 19px 19px 19px; */
  border-radius: 19px;
  padding-right: 40px;
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

  padding-top: 0px;
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
}
</style>
