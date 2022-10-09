<template>
  <div class="MobileHeader">
    <div class="row fullWidth m-0">
      <div class="pl-0 pt-3 pr-3" @click="backPage">
        <font :icon="['fas', 'arrow-left']" />
      </div>
      <div class="col-auto text-right p-0" v-if="retrievedTokenDetail">
        <router-link to="/notification" exact>
          <div class="HdrIcn">
            <div
              @click="$store.dispatch('notificationCheck')"
              class="cart_count"
              v-if="
                notification_count && notification_count.badge_counts !== '0'
              "
            >
              {{ notification_count.badge_counts }}
            </div>
            <!---- <img src="../assets/images/mobile/camera.png" alt="" />--->
            <img src="../assets/images/mobile/notifiaction_mob.png" alt="" />
          </div>
        </router-link>
      </div>

      <!-------<div class="HdrTxt1 ">What are you looking for...</div>----->

      <div class="col searchbar" v-if="retrievedTokenDetail">
        <!-- <input
          data-v-=""
          type="text"
          placeholder="What are you looking for..."
          class="big-data"
        /> -->
        <appHeaderSearch></appHeaderSearch>
        <div class="filter-button" @click="openStatisticsFilter">
          <i class="material-icons">tune</i>
        </div>
      </div>

      <!-----  <img src="../assets/images/mobile/messages.png" alt="">
                <img src="../assets/images/mobile/menu_icon.png" alt="" class="menu_icon" >--->

      <img
        src="../assets/images/mobile/menu_icon.png"
        class="menu_icon"
        @click="checkUserLogin()"
      />
      <md-drawer
        v-if="retrievedTokenDetail"
        class="md-right ProfileBoxTp1 z-index"
        :md-active.sync="showSidepanel"
      >
        <!-- <span class="LogoutTp1" @click="logoutHandler">Log out</span> -->

        <div class="full-wrap">
          <div class="drawer-cover">
            <figure>
              <img
                v-if="user && user.profile.cover != null"
                :src="user.profile.cover"
              />
              <img v-else src="../assets/images/banner_default.jpg" />
            </figure>
            <div class="avathar-drawer">
              <img
                v-if="user && user.profile.logo != ''"
                :src="user.profile.logo"
              />
              <div
                v-else-if="user && user.profile.logo == ''"
                class="profile-default-text"
              >
                <div class="text">
                  {{ user.profile.trade_name_en.substring(0, 1) }}
                </div>
              </div>
            </div>
          </div>

          <div class="drawer-content">
            <div class="hero" v-if="user">
              {{ user.profile.trade_name_en }}
            </div>
            <div class="type" v-if="user">
              {{ user.profile.user_type }}
            </div>
            <ul class="tabs">
              <li>
                <router-link
                  @click.native="hideDrawer"
                  v-if="user"
                  :to="
                    /profile/ +
                      getSlug(user.profile.trade_name_en) +
                      '/' +
                      user.profile.userid
                  "
                >
                  <span> <i class="material-icons">person</i> </span>Profile
                </router-link>
              </li>
              <li>
                <router-link
                  @click.native="hideDrawer"
                  v-if="user"
                  to="/dashboard/buyer/orders/"
                >
                  <span> <i class="material-icons">article</i> </span>My Orders
                </router-link>
              </li>
              <!-- <li>
                <router-link
                  @click.native="hideDrawer"
                  to="/dashboard/vendor/addnewitems"
                >
                  <span> <i class="material-icons">add</i> </span>New Product
                </router-link>
              </li> -->
              <!----- <li>
                <router-link @click.native="hideDrawer" to="/notification">
                  <span> <i class="material-icons">notifications</i> </span
                  >Notification
                  <md-badge class="md-primary" md-content="6" />
                </router-link>
              </li>----->
              <li>
                <router-link @click.native="hideDrawer" to="/">
                  <span> <i class="material-icons">bookmark_border</i> </span
                  >Saved Items
                </router-link>
              </li>

              <li>
                <router-link @click.native="hideDrawer" to="/StatisticsHome">
                  <span>
                    <i class="md-icon md-icon-font md-theme-default"
                      >equalizer</i
                    > </span
                  >Statistics
                </router-link>
              </li>
              <li>
                <router-link
                  @click.native="hideDrawer"
                  v-if="user"
                  to="/dashboard"
                >
                  <span> <i class="material-icons">dashboard</i> </span
                  >Dashboard
                  <md-badge class="md-primary" md-content="9" />
                </router-link>
              </li>
              <li>
                <router-link
                  @click.native="hideDrawer"
                  v-if="user"
                  :to="'/'+
                      getSlug(user.profile.trade_name_en) +
                      '/' +
                      user.profile.userid + '/create/advertising'
                    "
                >
                  <span> <i class="material-icons">campaign</i> </span>Advertising
                </router-link>
              </li>
              <li>
                <router-link
                  @click.native="hideDrawer"
                  to="/dashboard/common/settings"
                >
                  <span> <i class="material-icons">settings</i> </span>Settings
                </router-link>
              </li>
              <li @click="logoutHandler" class="logout-link">
                <a>
                  <span> <i class="material-icons">keyboard_tab</i> </span
                  >Logout
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- <md-toolbar class="md-transparent" md-elevation="0">
            <div class="LoggedBoxTp1 text-center">
              <div class="profileCover">
                <img :src="retrievedTokenDetail.coverPicUrl + retrievedTokenDetail.result.cover" />
              </div>
              <div class="DetatilBoxTp1">
                <img
                  class="PrfLogoTp1 ctImg1"
                  :src="retrievedTokenDetail.profileIconUrl + retrievedTokenDetail.result.logo"
                />
                <div class="DescriptionBox">
                  <div class="TxtTp101">
                    {{ retrievedTokenDetail.result.first_name_en }}
                    {{ retrievedTokenDetail.result.last_name_en }}
                  </div>
                  <div class="TxtTp102">
                    {{ retrievedTokenDetail.result.description_en }}
                  </div>
                </div>
                <div class="LnkBoxTp1">
                  <router-link to="/" class="LoggedLinkTp1">About</router-link>
                  <router-link to="/" class="LoggedLinkTp1">Photos</router-link>
                  <router-link to="/" class="LoggedLinkTp1">Videos</router-link>
                  <router-link to="/" class="LoggedLinkTp1"
                    >Ds Market</router-link
                  >
                  <router-link to="/" class="LoggedLinkTp1">Cart</router-link>
                </div>
              </div>
            </div>
          </md-toolbar>-->
      </md-drawer>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import appHeaderSearch from "@/components/appHeaderSearchBox.vue";
export default {
  props: ["showHeader"],
  components: {
    appHeaderSearch
  },
  data() {
    return {
      showSidepanel: false
    };
  },

  computed: {
    ...mapState({
      retrievedTokenDetail: state => state.user.retrievedTokenDetail,
      user: state => state.user.profile,

      notification_count: state => state.profile.notifications
    }),

    getSlug() {
      return name => this.slugify(name);
    }
  },
  methods: {
    backPage(){
        this.$router.go(-1);
    },
    openStatisticsFilter() {
      if (this.$route.path !== "/StatisticsHome") {
        this.$router.push("/StatisticsHome");
      }
      this.$store.dispatch("showMobileFilter", true);
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
    logoutHandler() {
      this.$store.dispatch("destroyTokenHandler").then(() => {
        this.showSidepanel = false;
        this.$router.push("/");
      });
      this.$store.dispatch("emptyCart");
    },
    hideDrawer() {
      this.showSidepanel = false;
    },
    checkUserLogin() {
      if (
        !localStorage.getItem("access_token") &&
        this.$route.path != "/logIn"
      ) {
        this.$router.push("/logIn");
      } else {
        this.showSidepanel = true;
      }
    }
  },
  created() {
    this.$store.dispatch("loggedIn_profile");
    this.$store.dispatch("getCart");
    //below line commented as there is a console error on mobile view
    //this.$store.dispatch("notificationListing", { page: 1 });
  }
};
</script>
<style scope>
.filter-button {
  display: flex;
  padding: 5px;
  /* background-color: #e3e1e1;
  border-radius: 3px; */
  color: #fe5722;
}
.big-data {
  border: none;
  width: 100%;
  margin-left: 0px;
  border-radius: 3px;
  height: 31px;
  padding-left: 7px;
  font-size: 18px;
  outline: none;
  font-weight: 500;
  color: #212121;
  padding-top: 0px;
}

.big-data::placeholder {
  font-weight: 500;
  color: #212121;
  font-size: 18px;
}
.cart_count {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-style: normal;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  background-color: #ff5722;
  border: 2px solid #fff;
  right: -6px;
  top: -5px;
}
.searchbar {
  position: relative;
  display: flex;
  column-gap: 12px;
}

.MobileHeader {
  background: #fff;
  padding: 12px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.12);
  position: fixed;
  top: 0px;
  width: 100%;
  height: 55px;
  z-index: 9999;
  left: 0px;
  display: flex;
  align-items: center;
}
.HdrIcn {
  position: relative;
}
.HdrIcn img {
  width: 20px;
  margin-top: 5px;
}

.HdrTxt1 {
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  color: #212121;
  padding-top: 6px;
  line-height: 1;
}
.menu_icon {
  margin-top: 7px;
  cursor: pointer;
  width: 30px;
  height: 16px !important;
}

/*------------------------menu------*/

.Head:after {
  height: 130%;
  top: 11px;
  border-top-left-radius: 130px;
  border-top-right-radius: 130px;
}
.profile-default-text {
  display: inline-flex;
  align-items: center;
  align-self: center;
  cursor: pointer;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f47320;
  padding: 1px;
  position: relative;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
}
.profile-default-text .text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.wrap-container {
  /* min-height: 100%;
  padding-top: 51px;
  display: flex;
  flex-direction: column;
  transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: padding-top; */
  width: 100%;
}
.bx-tp-1 {
  display: inline-block;
}
.cmp-logo-main {
  width: 38px;
  display: inline-block;
  padding: 5px 0px;
}
.cmp-logo-main img {
  width: 50%;
  aspect-ratio: 193/84;
  height: 20px !important;
}
.logout-link {
  cursor: pointer;
}
header {
  background: #fff;
  border: none;
  border-radius: 0;
  margin: 0;
  border-bottom: 1px solid #e4e4e4;
  width: 100%;
  margin: auto;
  max-width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9999;
}

.logn-btn.md-button {
  height: 30px;
  margin-top: 10px;
  font-weight: 600;
  font-size: 12px;
}
.logn-btn.md-button .md-icon {
  width: 18px;
  min-width: 18px;
  height: 18px;
  font-size: 20px !important;
}
.ch-btn-color .md-icon {
  width: 18px;
  min-width: 18px;
  height: 18px;
  font-size: 20px !important;
  color: #ff5722 !important;
}
.md-icon {
  margin-right: 6px !important;
}
/* .ch-btn-color.md-button {
  border-bottom: 2px solid transparent;
} */
.active .ch-btn-color.md-button {
  border-bottom: 2px solid #f47320;
}
.z-index {
  z-index: 20;
  position: fixed;
}
.HdRUserLogo {
  width: 35px;
  height: 35px !important;
  margin: 5px 5px;
  border-radius: 50%;
  background: grey;
  position: relative;
  box-shadow: 0 4px 12px 0 hsla(0, 0%, 60%, 0.2);
  border: 1px solid #d2d2d2;
  clip-path: none;
  transform: scale(1);
}
.drawer-cover {
  position: relative;
  display: flex;
  justify-content: center;
}
.drawer-cover figure {
  height: 155px;
  overflow: hidden;
  border-radius: 0px 0px 15px 15px;
}
.avathar-drawer {
  width: 91px;
  height: 91px;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  bottom: -36px;
  border: 3px solid #fff;
  background-color: #fff;
}
.avathar-drawer img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  object-fit: cover;
  top: 0;
  bottom: 0;
  right: 0;
}
.drawer-content {
  width: 100%;
  display: block;
  padding: 31px;
  padding-top: 3.3em;
}
.drawer-content .hero {
  font-size: 1.1em;
  font-weight: 600;
  width: 100%;
  text-align: center;
  line-height: 1.4;
}
.type {
  font-size: 0.9em;
  font-weight: 500;
  color: #888;
  text-align: center;
  text-transform: capitalize;
}
.drawer-content .tabs li {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 9px;
  border-bottom: 1px solid #eee;
  padding-left: 0;
}
.drawer-content .tabs {
  text-align: center;
  width: 90%;
  margin: auto;
  margin-top: 1.45em;
}
.drawer-content .tabs li span {
  width: 32px;
  height: 32px;
  color: #888;

  vertical-align: middle;
  margin-right: 0.66em;
}
.drawer-content .tabs li span i {
  font-size: 24px;
}
.drawer-content .tabs li a {
  font-size: 13px;
  color: #333;
  font-weight: 500;
}
.drawer-content .tabs li a:hover,
.drawer-content .tabs li a:focus {
  opacity: 0.8;
  color: #333;
}
.drawer-content .tabs li:last-child {
  border: none;
  /* margin-top: 1em; */
}
.md-badge {
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  left: 11px;
  top: -2px;
  font-size: 11px;
  font-style: normal;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  pointer-events: none;
  z-index: 6;
  background: #ff5722;
  position: relative;
}
.md-overlay {
  width: 100%;
  height: 100vh;
}
.ct-badge {
  position: absolute;
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-style: normal;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  pointer-events: none;
  z-index: 7;
  background: #213a63;
  border: 2px solid #fff;
  right: 0;
}
.cartCount {
  height: 50px;
  display: flex;
  text-align: center;
  position: relative;
  -ms-flex-align: center;
  align-items: center;
  align-self: center;
  justify-content: center;
  top: 5px;
}
.cartCount i {
  color: #ff5722 !important;
  margin: 0 !important;
}
.cartCount .md-position-top {
  top: -1px;
  right: -1.1px;
}
.fitSize {
  /* width: 100%;
  height: 100%; */
  display: inline-block;
}
.cartBtnWrap {
  width: 49px;
  min-width: 49px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}
.new-avatar {
  height: 50px;
  display: inline-flex;
}
.new-avatar:after {
  display: none;
}
.avathar-drawer .profile-default-text {
  width: 90px;
  height: 90px;
}
.avathar-drawer .profile-default-text .text {
  font-size: 3em;
}
@media only screen and (max-width: 768px) {
  .app-menu-wrap {
    display: none;
  }
  .src-bx-1 {
    width: 100%;
  }
}

@media only screen and (max-width: 600px) {
  .big-data::placeholder {
    font-size: 16px;
  }

  .big-data {
    font-size: 16px;
  }

  .menu_icon {
    margin-top: 9px;
    width: 23px;
    height: 13px !important;
  }
}

@media only screen and (max-width: 320px) {
  .big-data::placeholder {
    font-size: 14px;
    padding-left: 0px;
  }

  .big-data {
    font-size: 14px;
    padding-left: 0px;
  }
}
</style>
