<template>
  <div>
    <Crop :dialog="toggleDialog" />

    <ReactngleCrop :dialog="toggleRectangleDialog" :banners="profile.banners" />
    <div v-sticky sticky-offset="offset" sticky-side="top">
      <div class="prf-hd-bx timelineHead">
        <div class="name">
          <div class="photoHolder">
            <span v-if="profile.profile.logo != ''">
              <div class="profile-bg box_profile bg_color">
                <img
                  v-if="user_id && LoggedUser && user_id == profileId"
                  :src="LoggedUser.profile.logo"
                  alt
                />
                <img v-else :src="profile.profile.logo" alt @click="showDP()" />
              </div>
            </span>
            <span v-else>
              <div class="profile-bg box_profile">
                <span class="text">
                  {{ getFirstChar(profile.profile.trade_name_en) }}
                </span>
              </div>
            </span>

            <div class="change_dp" v-if="user_id && user_id == profileId">
              <input
                type="file"
                ref="file"
                style="display: none"
                v-on:change="chooseImage($event)"
              />
              <i class="material-icons camera_icon" @click="chooseFile()"
                >photo_camera</i
              >
            </div>
          </div>

          <div class="avatharName">
            {{ profile.profile.trade_name_en }}
            <span class="verified" v-if="profile.profile.is_verified == 1">
              <i class="material-icons">verified_user</i>
            </span>
          </div>
          <div class="avathaWrap">
            <div>
              <div
                class="cover_dp_wrapper"
                v-if="user_id && user_id == profileId"
              >
                <div class="change_cover" @click="addCover()">
                  <i class="material-icons">photo_camera</i>
                  <span class="btnText">Update Cover</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="profileTab">
          <div class="prof-lnk-bx-wrap">
            <div class="prof-lnk-bx">
              <div v-if="user_id && user_id == profileId">
                <router-link
                  class="rt-lnk-tp-1"
                  :to="/profile/ + profileName + '/' + profileId"
                  active-class="active-link"
                  exact
                >
                  <md-button :md-ripple="true">
                    <span class="display_text">Following</span>
                    <span class="display_icon">
                      <i class="material-icons">people_alt</i></span
                    >
                  </md-button>
                </router-link>
              </div>

              <div v-for="(tab, i) in tabs.tabs" :key="i">
                <router-link
                  class="rt-lnk-tp-1"
                  v-if="tab == 'timeline'"
                  :to="
                    tab == 'timeline'
                      ? `${'/profiletimeline/' + profileName + '/' + profileId}`
                      : ''
                  "
                  active-class="active-link"
                  exact
                >
                  <md-button :md-ripple="true">
                    <span class="display_text">Timeline</span>
                    <span class="display_icon">
                      <i class="material-icons">view_day</i></span
                    >
                  </md-button>
                </router-link>
                <a
                  class="rt-lnk-tp-1 dsMarket"
                  :class="activeClass"
                  v-if="tab == 'dsmarket'"
                  @click="toggleDsmarketTabs"
                  active-class="active-link"
                  exact
                >
                  <md-button :md-ripple="true">
                    <span class="display_text"> Market</span>
                    <span class="display_icon">
                      <i class="material-icons">shopping_cart</i></span
                    >
                  </md-button>
                </a>
                <router-link
                  class="rt-lnk-tp-1"
                  v-if="tab == 'gallery'"
                  :to="
                    tab == 'gallery'
                      ? `${'/gallery/' + profileName + '/' + profileId}`
                      : ''
                  "
                  active-class="active-link"
                  exact
                >
                  <md-button :md-ripple="true">
                    <span class="display_text">Gallery</span>
                    <span class="display_icon">
                      <i class="material-icons">image</i></span
                    >
                  </md-button>
                </router-link>
                <router-link
                  v-if="tab == 'about'"
                  class="rt-lnk-tp-1"
                  :to="/about/ + profileName + '/' + profileId"
                  active-class="active-link"
                  exact
                >
                  <md-button :md-ripple="true">
                    <span class="display_text">About</span>
                    <span class="display_icon">
                      <i class="material-icons">account_box</i></span
                    >
                  </md-button>
                </router-link>
                <router-link
                  v-if="tab == 'contact'"
                  class="rt-lnk-tp-1"
                  :to="/contacts/ + profileName + '/' + profileId"
                  active-class="active-link"
                  exact
                >
                  <md-button :md-ripple="true">
                    <span class="display_text">Contact</span>
                    <span class="display_icon">
                      <i class="material-icons">email</i></span
                    >
                  </md-button>
                </router-link>
              </div>
            </div>

            <div class="btn-action-wrap">
              <Follow
                :id="profile.profile.userid"
                :Isfollowing="profile.isFollow"
                :follow_count="profile.followersCount"
                :following_count="profile.followingCount"
              ></Follow>
            </div>
          </div>
          <router-link
            v-if="user_id && user_id == profileId"
            class="rt-lnk-tp-1 dash-brd-btn btn_mrgn"
            to="/dashboard/"
            active-class="active-link"
            exact
          >
            <md-button :md-ripple="true" class="md-raised md-accent dashBtn">
              <i class="material-icons">web</i
              ><span class="text_dashboard">Dashboard</span>
            </md-button>
          </router-link>
        </div>
      </div>
    </div>
    <md-dialog :md-active.sync="toggleDP">
      <!-- <div class="modal-header">
        <div class="modal-close">
          <i class="material-icons" @click="toggleDP = false">
            close
          </i>
        </div>
      </div> -->
      <div>
        <div class="modal-close dp_close_btn">
          <i class="material-icons" @click="toggleDP = false">
            close
          </i>
        </div>
        <img
          v-if="profile.profile.logo != ''"
          :src="profile.profile.logo"
          :alt="profile.profile.logo"
        />
      </div>
    </md-dialog>
  </div>
</template>
<script>
import Sticky from "vue-sticky-directive";
import axios from "axios";
import Follow from "./profileFollow";
import { mapState } from "vuex";
import { Cropper } from "vue-advanced-cropper";
import Crop from "../../services/roundedCrop";
import ReactngleCrop from "../../services/rectangleCrop";
export default {
  props: ["profile"],
  components: { Follow, Cropper, Crop, ReactngleCrop },
  data() {
    return {
      file: "",
      activeClass: "",
      toggleDialog: false,
      toggleRectangleDialog: false,
      dataIsLoaded: false,
      isCropped: false,
      toggleDP: false,
      img: "",
      showDsmarketChildren: false
    };
  },
  methods: {
    showDP() {
      console.log("object");
      this.toggleDP = !this.toggleDP;
    },

    toggleDsmarketTabs() {
      console.log("clicked");
      const url = this.$route.fullPath.split("/");
      if (
        url[1] == "profileproperties" ||
        url[1] == "profileservices" ||
        url[1] == "profileautos" ||
        url[1] == "profilestore"
      ) {
        this.$emit("toggleDsMarketMenu");
      } else {
        this.$router.push(
          "/profilestore/" +
            this.$route.params.name +
            "/" +
            this.$route.params.id
        );
      }
    },
    addCover() {
      console.log(this.toggleRectangleDialog);
      this.toggleRectangleDialog = !this.toggleRectangleDialog;
      console.log(this.toggleRectangleDialog);
    },
    chooseFile() {
      this.toggleDialog = !this.toggleDialog;
    },
    chooseImage($event) {
      this.isCropped = true;
      const file = $event.target.files[0];
      this.img = URL.createObjectURL(file);
      //this.url = URL.createObjectURL(file);
    },
    change({ coordinates, canvas }) {
      console.log(this.toggleDialog);
      console.log(coordinates, canvas);
      var img = canvas.toDataURL("image/png");
      this.file = img;
    },
    upload() {
      this.$store.dispatch("profile_picture", this.file);
    }
  },

  computed: {
    ...mapState({
      tabs: state => state.profile.profilePage,
      user_id: state => state.user.user_id,

      LoggedUser: state => state.user.profile
    }),
    getFirstChar() {
      return name => name.charAt(0);
    },
    profileName() {
      return this.$route.params.name;
    },
    profileId() {
      return this.$route.params.id;
    }
  },
  directives: {
    Sticky
  },
  watch: {
    $route: function(to, from) {
      const url = to.fullPath.split("/");
      if (
        url[1] == "profilestore" ||
        url[1] == "profileproperties" ||
        url[1] == "profileservices" ||
        url[1] == "profileautos"
      ) {
        this.activeClass = "active-link";
      } else {
        this.activeClass = "";
      }
      this.showDsmarketChildren = false;
    }
  },
  created() {
    this.showDsmarketChildren = false;
    const url = this.$route.fullPath.split("/");
    if (
      url[1] == "profilestore" ||
      url[1] == "profileproperties" ||
      url[1] == "profileservices" ||
      url[1] == "profileautos"
    ) {
      this.activeClass = "active-link";
    } else {
      this.activeClass = "";
    }
  }
};
</script>
<style scoped>
.cover_dp_wrapper {
  width: 12rem;
  height: auto;
}
.dp_close_btn {
  position: absolute;

  cursor: pointer;
  right: 0;
}

.btnText {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0px;
  margin: 0 0 0 0rem;
  color: #333;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
  opacity: 0;
  margin-right: 19px;
}
.cover_dp_wrapper i {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  right: 5px;
  /* width: 2.125rem; */
  /* height: 1.125rem; */
  background: none;
  position: absolute;
  top: 2.2px;
  bottom: 0;
  margin: auto;
  font-size: 19px;
  color: #ff5722;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cover_dp_wrapper:hover .change_cover {
  width: 8.88em;
}
.cover_dp_wrapper:hover .btnText {
  opacity: 1;
}
.change_cover {
  transition: width 400ms ease-in-out;
  position: absolute;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
  right: 1px;
  top: 15px;
  cursor: pointer;
}

.profile-bg {
  background-color: #ff5722;
  display: block;
  height: 160px;
  position: relative;
  width: 160px;
  border-radius: 9px;
  border: 4px solid #fff;
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-bg .text {
  font-size: 60px;
  font-weight: bold;
  color: #fff;
}
.prf-hd-bx {
  background: #fff;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  position: relative;
}
.prof-phot-1-img {
  border-radius: 50%;
  background: #ff5722;
  padding: 1px;
  width: 110px;
  height: 110px;
}
.prof-lnk-bx {
  padding-left: 143px;
  display: flex;
}
.prof-lnk-bx a {
  width: 100%;
  height: 100%;
  display: inline-block;
}
.prof-lnk-bx a button {
  min-width: 79px;
}
.prof-phot-1-lnk {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.follow-btn-prof {
  height: 26px;
  font-size: 11px;
}
.cnt-flwr-txt {
  line-height: 36px;
}
.change_dp {
  position: absolute;
  bottom: -11px;
  right: 11px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  transform: translate3d(0, 11px, 0);
  transition-delay: 0.03s;
  transition-duration: 0.25s;
  transition-opacity: 0.15s;
  opacity: 0;
}
.change_dp i {
  color: #ff5722;
}

.photoHolder:hover .change_dp {
  transform: translateZ(0);
  opacity: 1;
}

.top-sticky .change_dp {
  display: none;
}
.company-name {
  position: absolute;
  z-index: 999;
  left: 131px;
  top: -40px;
  color: #fff;
  text-rendering: optimizelegibility;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.8);
  font-size: 24px;
  -webkit-font-smoothing: antialiased;
  font-weight: 500;
  line-height: 30px;
  max-width: 275px;
}
.dash-brd-btn {
  float: right;
}
.dashBtn {
  transition: none;
}
.timelineHead {
  position: relative;
  width: 100%;
  /* z-index: 4; */
}
.name {
  overflow: hidden;
}
.avathaWrap {
  display: flex;
  width: 100%;
  position: absolute;
  justify-content: flex-end;
  top: -75px;
  right: 15px;
  align-items: center;
}
.photoHolder {
  box-shadow: none;
  /* z-index: 22; */
  height: 152px;
  left: 15px;
  margin-top: 0;
  top: -143px;
  width: 152px;
  padding: 1px;
  position: absolute;
  border-radius: 100%;
  display: block;
  cursor: pointer;
}
.photoHolder img {
  background-color: #fff;
  display: block;
  height: 100%;
  position: relative;
  width: 100%;
  border-radius: 9px;
  border: 4px solid #fff;
  overflow: hidden;
  padding: 1px;
  object-fit: contain;
}

.profileTab {
  clear: right;
  padding-left: 33px;
  display: flex;
  transition: all ease-in-out 0.4s;
  align-items: center;
}
.avatharName {
  top: -46px;
  left: 197px;
  position: absolute;
  /* bottom: 0; */
  font-weight: bold;
  color: #fff;
  font-size: 17px;
  display: flex;
}
.avatharName i {
  font-size: 17px;
  margin-left: 2px;
  margin-top: 1px;
}
.top-sticky {
  top: 51px !important;
  width: 1210px;
  z-index: 10 !important;
  transition: top 333ms linear;
}
.prof-lnk-bx-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn-action-wrap {
  margin-right: 9px;
  display: flex;
}
.top-sticky .prof-lnk-bx-wrap {
  position: relative;
  top: 9px;
  width: auto;
}
.top-sticky .photoHolder {
  top: 0;
  height: auto;
  left: 0;
  margin-top: 0;
  width: auto;
  padding-left: 5px;
}
.top-sticky .btn-action-wrap {
  position: relative;
  top: -15px;
}
.top-sticky .photoHolder img {
  height: 48px;
  width: 48px;
  box-sizing: border-box;
  background-clip: content-box;
  border: 2px solid transparent;
  padding: 3px;
  margin-top: 5px;
  object-fit: contain;
  border-radius: 6px;
}
.avatharName .verified {
  display: inline-flex;
  color: #fff;
}
.top-sticky .profile-bg {
  height: 48px;
  width: 48px;
  top: 1px;
}
.top-sticky .profile-bg .text {
  font-size: 29px;
}
.top-sticky .avatharName .verified {
  color: #464646 !important;
}
.top-sticky .avatharName {
  top: 20px;
  left: 55px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-left: 5px;
}
/* .top-sticky .follow-bx-widget {
  background: transparent;
  padding: 0;
} */
.top-sticky .cnt-flwr-txt {
  display: none;
}
.top-sticky .action {
  top: 24px;
  padding: 0;
  position: absolute;
  right: 129px;
}
.top-sticky .follow-btn-prof {
  height: 29px;
}
.top-sticky .prf-hd-bx {
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 0px;
  padding: 11.5px 0;
  max-height: 59px;
  transition: all 0.333ms ease-in;
}
.top-sticky .prof-lnk-bx {
  padding-left: 7px;
  justify-content: flex-start;
  margin-top: 3px;
  display: none;
}
.top-sticky .profileTab .md-button {
  height: 29px;
  padding: 0px 0px;
  font-size: 12px;
  padding-bottom: 15px;
  min-width: 77px;
}
.top-sticky .dash-brd-btn .md-button {
  padding-bottom: 0;
}
.top-sticky .profileTab .md-ripple .md-button-content {
  height: 35px;
}
.top-sticky .profileTab .md-button:before {
  display: none;
}
.top-sticky .profileTab {
  padding-left: 0;
  /* margin-top: 21px; */
  justify-content: flex-end;
  position: relative;
  top: 10px;
}
.top-sticky .prof-lnk-bx a {
  border-radius: 14px;
}
.top-sticky .dsMarket {
  display: none;
}
.top-sticky .cover_dp_wrapper {
  display: none;
}

.top-sticky .dash-brd-btn .md-button {
  margin-right: 1.1em;
  position: relative;
  top: -11px;
}
.top-sticky .avathaWrap {
  top: 6px;
  right: 15px;
}

.dash-brd-btn .material-icons {
  margin-right: 5px;
  font-size: 20px;
}
.cropper {
  height: 150px;
  background: #ddd;
}
/* .top-sticky .dashBtn {
  transition: none;
} */
.display_icon {
  display: none;
}
.bg_color {
  background-color: #fff;
}
@media screen and (max-width: 768px) {

.md-button {
    height: 36px !important;}

  .box_profile {
    height: 120px !important;
    max-width: 120px !important;
    top: 30px;
  }
  .avatharName {
    left: 157px;
  }
  .display_icon {
    display: block;
    color: #8e8a8a;
  }
  .display_text {
    display: none;
  }

  .md-button .md-ripple {
    padding: 0 0px;
  }

  .prof-lnk-bx a button {
    min-width: 38px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .prof-lnk-bx {
    padding-left: 100px;
  }

  button.md-button.md-theme-default {
    margin: 0px 7px !important;
  }

  .btn-action-wrap {
    display: block;
  }

  a.rt-lnk-tp-1.dash-brd-btn {
    width: fit-content;
    border-radius: 0px;
    position: relative;
    margin-top: -10px;
  }

  .text_dashboard {
    font-size: 13px;
  }
  button.md-button.md-raised.md-accent.dashBtn.md-theme-default {
    height: 46px;
    margin-right: 0px !important;
    margin-left: 0px !important;
    border-radius: 0px;
  }

  .btn-action-wrap {
    margin-right: 5px;
  }
  .top-sticky .btn-action-wrap {
    top: -26px;
  }

  .top-sticky .profile-bg {
    height: 46px !important;
    width: 46px;
    top: 0px;
  }

  .follow-bx-widget {
    display: block !important;
  }

  .top-sticky .prf-hd-bx {
    max-height: 48px;

    overflow: hidden;
  }

  .top-sticky .avatharName {
    top: 16px;
    left: 53px;
    font-weight: 500;
  }

  .top-sticky .profile-bg {
    top: 0px;
  }

  .prof-lnk-bx-wrap {
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-box;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .top-sticky .photoHolder img {
    padding: 0px;
  }
}

@media screen and (max-width: 600px) {
.md-button {
    height: 36px !important;}


  .profileTab {
    padding-left: 0px;
  }
  .prof-lnk-bx {
    padding-left: 0px;
  }

  .profile-bg .text {
    font-size: 36px;
    font-weight: bold;
    color: #fff;
  }

  .box_profile {
    height: 70px !important;
    max-width: 70px !important;
    top: 46px;
  }

  .avatharName {
    left: 98px;
    top: -88px;
  }

  button.md-button.md-theme-default {
    margin: 0px 0px !important;
    min-width: 44px;
  }

  .btn-action-wrap {
    margin-right: 0px;
    position: absolute;
    top: -65px;
    left: 90px;
  }

  i.material-icons {
    font-size: 18px !important;
  }

  button.md-button.md-raised.md-accent.dashBtn.md-theme-default {
    padding-left: 8px;
    padding-right: 8px;
    top: 0;
    right: 0;
  }
  .text_dashboard {
    font-size: 12px;
    margin-top: 2px;
  }

  button.md-button.md-raised.md-accent.dashBtn.md-theme-default {
    height: 36px;
    border-radius: 0px;
  }

  .top-sticky .profileTab {
    top: 0px;

    right: 0px;
  }

  .display_text {
    display: none !important;
  }

  .change_dp {
    position: absolute;
    bottom: 30px;
    right: 75px;
    height: 35px;
    width: 35px;
  }

  .photoHolder {
    top: -153px;
  }

  .avatharName {
    top: -100px;
    left: 99px;
    font-weight: 500 !important;
    font-size: 14px !important;
  }
  .btn-action-wrap {
    top: -78px;
    width: 270px;
  }
  .prof-lnk-bx a {
    padding-right: 8px;
  }

  .top-sticky .btn-action-wrap {
    position: relative;
    top: 0px;
    display: none;
  }

  a.rt-lnk-tp-1.dash-brd-btn {
    margin-top: 0px;
  }

  .follow-bx-widget {
    float: left;
    display: block;
    width: fit-content;
  }

  .top-sticky .dash-brd-btn .md-button {
    height: 46px !important;
    top: -11px !important;
  }

  .top-sticky .dash-brd-btn .md-button span {
    font-size: 13px !important;
  }

  .display_icon i {
    margin-top: 5px;
  }

  .top-sticky .prf-hd-bx {
    height: 148px !important;
    overflow: hidden;
  }

  .photoHolder img,
  .profile-bg {
    padding: 0px;
  }

  .profile-bg {
    border-width: 1px;
  }

  .top-sticky .profile-bg {
    height: 39px !important;
    width: 39px !important;
    top: 3px !important;
  }

  .top-sticky .avatharName {
    top: 16px;
    left: 44px;
    font-weight: 500;
    font-size: 13px !important;
  }
}

@media screen and (max-width: 420px) {
  button.md-button.md-theme-default {
    min-width: 40px;
  }
  .top-sticky .profile-bg {
    left: -2px;
  }
  .top-sticky .avatharName {
    top: 17px;
    left: 42px;
  }
}

@media screen and (max-width: 400px) {
  button.md-button.md-theme-default {
    min-width: 35px;
  }
}
@media screen and (max-width: 370px) {
  .prof-lnk-bx a {
    padding-right: 6px;
  }
}

@media screen and (max-width: 320px) {
  .md-button {
    height: 30px !important;}
  button.md-button.md-theme-default {
    margin: 0px 0px !important;
    min-width: 24px;
    height: 30px;
  }

  .photoHolder {
    top: -143px;
  }
  .avatharName {
    top: -90px;
    font-size: 13px !important;
  }
  .btn-action-wrap {
    top: -60px;
  }

  .follow-bx-widget {
    padding: 4px 5px !important;
    margin-top: -2px !important;
  }

  button.md-button.md-raised.md-accent.dashBtn.md-theme-default {
    height: 30px;
  }

  .top-sticky .avatharName {
    top: 17px;
    left: 35px;
    font-weight: 500;
    font-size: 12px !important;
  }
  .top-sticky .dash-brd-btn .md-button span {
    font-size: 11px !important;
  }
  .text_dashboard {
    font-size: 10px;
    margin-top: 2px;
  }

  .top-sticky .profile-bg {
    height: 38px !important;
    width: 38px;
    top: 0px;
  }

  .top-sticky .dash-brd-btn .md-button {
    height: 38px !important;
    top: -11px !important;
  }
  .top-sticky .prf-hd-bx {
    max-height: 41px;
    overflow: hidden;
  }

  .avatharName .verified i {
    font-size: 13px !important;
    margin-top: -3px;
  }

  .top-sticky .photoHolder img {
    height: 100%;
    width: 100%;
  }

  .top-sticky .profile-bg {
    height: 34px !important;
    width: 34px !important;
    top: 2px !important;
    left: -5px;
  }
}
</style>
