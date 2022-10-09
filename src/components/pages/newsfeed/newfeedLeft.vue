<template>
  <div>
    <div class="lft-wrp-1">
      <router-link
        v-if="user"
        :to="
          /profile/ +
            getSlug(user.profile.trade_name_en) +
            '/' +
            user.profile.userid
        "
      >
        <div class="flex-bx-tp-1 avatharWrap" v-if="isLogged">
          <div
            class="avatharUser heroAvathar"
            :class="{ 'new-avatar-feed': user.profile.logo == '' }"
          >
            <img
              v-if="user.profile.logo != ''"
              alt="profile"
              class="who-post-img"
              :src="user.profile.logo"
            />
            <div v-else class="profile-default-text">
              <div class="text">
                {{ getFirstChar(user.profile.trade_name_en) }}
              </div>
            </div>
          </div>
          <div class="thm-cnt-bx">
            <div>
              <div class="thm-cnt-bx-txt-1" v-if="user">
                {{ getsubString(user.profile.trade_name_en) }}
              </div>
              <div class="thm-cnt-bx-txt-2" v-if="user">
                {{ user.profile.user_type | capitalize }}
              </div>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <div class="drc-lnk-bx-1" v-if="user">
      <div class="lnk-bx-tp-r-1">
        <md-button class="md-primary">
          <span class="icon-circle-1">
            <img
              class="icn-crcle-img-1"
              src="../../../assets/images/icons/about.png"
              width="24px"
              alt
            />
          </span>
          <span class="desc-txt-1">
            <router-link
              :to="
                /about/ +
                  getSlug(user.profile.trade_name_en) +
                  '/' +
                  user.profile.userid
              "
              >About</router-link
            ></span
          >
        </md-button>
      </div>
      <!-- <div class="lnk-bx-tp-r-1">
        <md-button class="md-primary">
          <span class="icon-circle-1">
            <img
              class="icn-crcle-img-1"
              src="../../../assets/images/icons/messages.png"
              width="24px"
              alt
            />
          </span>
          <span class="desc-txt-1">
            <router-link to="#">Messages</router-link></span
          >
        </md-button>
      </div> -->
      <div class="lnk-bx-tp-r-1">
        <md-button class="md-primary">
          <span class="icon-circle-1">
            <img
              src="../../../assets/images/icons/dsmarket.png"
              alt
              width="24px"
            />
          </span>
          <span class="desc-txt-1"
            ><router-link
              :to="
                /profilestore/ +
                  getSlug(user.profile.trade_name_en) +
                  '/' +
                  user.profile.userid
              "
              >D&S Market</router-link
            >
          </span>
        </md-button>
      </div>
      <div class="lnk-bx-tp-r-1">
        <md-button class="md-primary">
          <span class="icon-circle-1">
            <img
              class="icn-crcle-img-1"
              src="../../../assets/images/icons/photos.png"
              width="24px"
              alt
            />
          </span>
          <span class="desc-txt-1"
            ><router-link
              :to="
                /gallery/ +
                  getSlug(user.profile.trade_name_en) +
                  '/' +
                  user.profile.userid
              "
              >Media</router-link
            ></span
          >
        </md-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      isLogged: false,
      personalData: {
        profileThumb: "dp-40-40.jpg",
        userName: "ijasnppktr",
        subText: "ijas"
      }
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return;
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
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
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.profile
    }),
    getSlug() {
      return name => this.slugify(name);
    },
    getFirstChar() {
      return name => name.charAt(0);
    },
    getsubString() {
      return name => this.$helpers.substring(0, 15, name);
    }
  },

  mounted() {
    if (localStorage.getItem("token")) {
      this.isLogged = true;
    }
  },
  created() {
    this.$store.dispatch("loggedIn_profile");
  }
};
</script>
<style scoped>
.heroAvathar {
  margin-right: 0em;
}
.heroAvathar:after {
  display: none;
}
.heroAvathar img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 1px;
  background: #fff;
  margin: 8px 6px;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
  border: 1px solid #d2d2d2;
  position: initial !important;
  margin: 0px;
}
.new-avatar-feed:after {
  top: 30.3px;
  width: 100%;
  height: 47%;
}
.heroAvathar:after {
  top: 28.3px;
  width: 100%;
  height: 47%;
  left: 0px;
}
.avatharWrap {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
.profile-default-text {
  width: 35px;
  height: 35px !important;
  border-radius: 50%;
  background: #f47320;
  padding: 1px;
  position: relative;
  top: 0px;
  -webkit-box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-default-text .text {
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.lft-wrp-1 {
  transition: all 0.3s ease-in;
}
.top-sticky .lft-wrp-1 {
  padding-top: 50px;
}
.thm-img-bx {
  width: 45px;
}
/* .icn-crcle-img-1 {
  width: 25px;
  height: 25px;
} */
.thm-cnt-bx {
  flex: 1;
  padding-left: 6px;
  align-items: center;
  align-self: center;
}
.flex-bx-tp-1 {
  padding: 10px;
  border-radius: 2px;
  align-items: center;
}
.thm-cnt-bx-txt-1 {
  font-size: 13px;
  font-weight: 600;
  color: #191919;
  line-height: 1.1;
}
.thm-cnt-bx-txt-2 {
  color: #999;
  font-weight: 400;
  font-size: 13px;
  margin-top: 4px;
}

.material-icons {
  font-size: 25px;
  color: #ff5722 !important;
}
.desc-txt-1 {
  padding-left: 7px;
  color: #191919;
  font-size: 13px;
  letter-spacing: 0.3px;
  position: relative;
  top: 1px;
}
.desc-txt-1 a {
  color: #191919 !important;
}
.profile {
  cursor: pointer;
}
</style>
