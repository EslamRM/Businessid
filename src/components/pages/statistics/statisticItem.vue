<template>
  <div v-if="post">
    <div
      v-if="post.cover != null"
      class="card-cover"
      :style="{ backgroundImage: 'url(' + post.cover + ')' }"
    ></div>
    <div v-else class="card-cover" :style="{ backgroundImage }"></div>

    <div class="ProfileCard-content">
      <div class="ProfileCard-avatarLink">
        <img v-if="post.logo != ''" :src="post.logo" />
        <div class="profile-bg profile_statistic" v-else>
          <span class="text">{{ getFirstChar(post.trade_name_en) }}</span>
        </div>
      </div>

      <Follow
        v-if="post"
        :follow="post.isFollowing"
        :id="post.id"
        class="follow_button"
      />
      <div class="ProfileCard-userFields">
        <div class="name-wrap">
          <div class="ProfileName">
            <router-link
              v-if="user_id && user_id == post.id"
              :to="/profile/ + getSlug(post.trade_name_en) + '/' + post.id"
            >
              <span v-if="post.trade_name_en.length < 30">{{
                post.trade_name_en
              }}</span>
              <span v-else>{{
                post.trade_name_en.substring(0, 30) + "..."
              }}</span>
              <div class="verified" v-if="post.is_verified == 1">
                <i class="material-icons">verified_user</i>
              </div>
            </router-link>
            <router-link
              v-else
              :to="
                /profiletimeline/ + getSlug(post.trade_name_en) + '/' + post.id
              "
            >
              <span v-if="post.trade_name_en.length < 30">{{
                post.trade_name_en
              }}</span>
              <span v-else>{{
                post.trade_name_en.substring(0, 30) + "..."
              }}</span>
              <div class="verified" v-if="post.is_verified == 1">
                <i class="material-icons">verified_user</i>
              </div>
            </router-link>
          </div>
        </div>
        <div class="Type">{{ post.user_type | capitalize }}</div>
        <div class="bottom-action">
          <div class="item">
            <md-tooltip md-direction="top" v-if="user_id"
              >{{ "Mobile : " + post.mobile + " | " + "Phone : " + post.phone }}
            </md-tooltip>
            <a v-bind:href="'tel:' + post.mobile"
              ><i class="material-icons">phone</i></a
            >
          </div>
          <div class="item">
            <md-tooltip md-direction="top" v-if="user_id">{{
              post.email
            }}</md-tooltip>
            <i class="material-icons">
              <a v-bind:href="'mailto:' + post.email" class="email-to"
                >mail</a
              ></i
            >
          </div>

          <div class="item">
            <i class="material-icons">insert_comment</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Follow from "./Follow";
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  components: { Follow },
  data() {
    return {
      backgroundImage: `url(${require("@/assets/images/banner_default.jpg")})`
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return;
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  computed: {
    ...mapState({
      profileIconUrl: state => state.statistic.profileIconUrl,
      CoverUrl: state => state.statistic.CoverUrl,
      retrievedTokenDetail: state => state.user.retrievedTokenDetail,
      user_id: state => state.user.user_id
    }),

    getFirstChar() {
      return name => name.charAt(0);
    },
    getSlug() {
      return name => this.slugify(name);
    }
  },
  methods: {
    // hidefollow(post, retrievedTokenDetail) {
    //   if (retrievedTokenDetail) {
    //     return retrievedTokenDetail.result.userid != post.id ? true : false;
    //   } else {
    //     return true;
    //   }
    // },
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
    }
  }
};
</script>
<style scoped>
.email-to {
  color: rgb(115, 129, 152) !important;
}
.listing-on {
  width: 775px;
  max-width: 100%;
}
.card {
  border-radius: 4px;
  overflow: hidden;
  background-color: #fff;
  width: 31.87%;
  box-shadow: 0 2px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin: 0 7px;
  margin-bottom: 7px;
  display: inline-block;
}
.card-cover {
  display: block;
  max-width: 100%;
  object-fit: cover;
  height: 90px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  margin-top: -7px;
}
.ProfileCard-content {
  margin: 13px 15px;
  position: relative;
}
.ProfileCard-avatarLink {
  background-color: #fff;
  border-radius: 50%;
  display: inline-block;
  margin: -45px 2px 0 -3px;
  padding: 3px;
  position: relative;
  vertical-align: bottom;
  z-index: 1;
}
.ProfileCard-avatarLink img {
  border-radius: 50%;
  display: block;
  height: 70px;
  width: 70px;
  object-fit: cover;
  margin: 0 auto;
}
.ProfileCard-userFields {
  color: #14171a;
  margin-top: 15px;
  width: 100%;
}
.name-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 1.4;
}
.verified {
  display: inline-flex;
  margin-left: 2px;
}
.name-wrap .verified i {
  color: #1a73e8;
  font-size: 18px;
  position: relative;
  top: 4px;
}
.profile-bg {
  border-radius: 50%;
  display: flex;
  height: 70px;
  width: 70px;
  -o-object-fit: contain;
  object-fit: contain;
  margin: 0 auto;
  background-color: #ff5722;
  justify-content: center;
  align-items: center;
}
.profile-bg span {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.ProfileName {
  cursor: pointer;
  margin-top: -2px;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
  align-items: center;
  position: relative;
  display: inline-flex;
}
/* .ProfileName:after{
   content: "...";
  position: absolute;
  right: 0;
  top: 0;
  background-color: white;
  padding: 0 5px;
} */
.Type {
  font-size: 11px;
  color: #888;
  font-weight: 500;
}
.ProfileCard-actions {
  display: inline-block;
  height: 31px;
  margin: 0 0 -4px 0;
  position: absolute;
  right: 0;
  vertical-align: bottom;
}
.ProfileCard-actions .md-button {
  height: 29px;
  min-width: 75px;
  font-size: 12px;
  padding: 5px 3px;
  border-radius: 100px;
  color: #ff5722 !important;
  border: 1px solid rgba(33, 59, 100, 0.7);
  box-sizing: border-box;
  box-shadow: none;
}
.bottom-action {
  margin-top: 0.8em;
}
.bottom-action .item {
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #fff;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  background-color: rgba(33, 58, 99, 0.11);
}
.bottom-action .item a {
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
}
.bottom-action .item i {
  margin: 0 auto;
  font-size: 19px;
  color: rgb(115, 129, 152);
}
.card-wrap {
  padding-bottom: 30px;
}
.ProfileCard-actions.follow_button {
  margin-right: -3px;
}
@media only screen and (max-width: 1025px) {
  .profile_statistic {
    max-width: 70px !important;
    height: 70px !important;
  }
}
@media only screen and (max-width: 768px) {
  .ProfileCard-actions.follow_button {
    margin-top: -10px;
    margin-right: -10px;
  }
  .ProfileName {
    white-space: initial;
  }
}

@media only screen and (max-width: 600px) {
  .ProfileCard-actions.follow_button {
    margin-top: -5px;
    margin-right: -10px;
  }

  .card-cover {
    display: none;
  }
  .bottom-action {
    display: none;
  }
  .ProfileCard-avatarLink {
    display: block;
    margin: 0;
  }
  .ProfileCard-userFields {
    text-align: center;
  }
  .ProfileName {
    display: block;
    margin: auto;
  }

  .ProfileCard-actions.follow_button {
    width: 100%;
    margin-right: 0px;
    float: left;
    margin-top: 60px;
    text-align: center;
  }

  .profile_statistic,
  .ProfileCard-avatarLink img {
    max-width: 60px !important;
    height: 60px !important;
    background-color: #ff5722;
    padding: 2px;
  }

  .ProfileCard-userFields {
    margin-top: 10px;
  }
  .ProfileCard-content {
    margin-top: 15px;
  }
}

@media only screen and (max-width: 300px) {
  .ProfileCard-actions.follow_button {
    margin-top: 80px;
  }

  .profile_statistic,
  .ProfileCard-avatarLink img {
    max-width: 50px !important;
    height: 50px !important;
  }

  .ProfileCard-actions.follow_button {
    margin-top: 75px;
  }
  .ProfileCard-content {
    margin-top: 11px;
  }
}
</style>
