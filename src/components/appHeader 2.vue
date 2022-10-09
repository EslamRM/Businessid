<template>
  <div class="wrap-container">
    <div class="hdr-bx-1">
      <header class="header HeaderBxTp1">
        <div class="header-bx">
          <div class="container cstTp1">
            <div class="hdr-bx-cnt">
              <div class="row d-flex align-items-center">
                <div class="col-auto">
                  <div class="bx-tp-1">
                    <router-link to="/" class="cmp-logo-main">
                      <img
                        :src="
                          base_url_api + 'assets/uploads/18Oct2020235235_J5ckUTK0KG.png'
                        "
                        alt
                      />
                    </router-link>
                  </div>
                </div>
                <div class="col">
                  <appHeaderSearch></appHeaderSearch>
                </div>
                <div class="col-auto">
                  <div class="bx-tp-1 app-menu app-menu-wrap">
                    <router-link to="/" active-class="active" exact>
                      <md-button class="md-primary ch-btn-color" :md-ripple="true">
                        <md-icon>home</md-icon> Home
                      </md-button>
                    </router-link>
                    <!-- <router-link
                      to="/dsmarket"
                      active-class="active"
                      exact
                    >
                      <md-button
                        class="md-primary ch-btn-color"
                        :md-ripple="true"
                      >
                        <md-icon>shop_two</md-icon> Market
                      </md-button>
                    </router-link> -->
                    <router-link
                      to="/newsfeed"
                      @click.native="toTop"
                      active-class="active"
                      exact
                    >
                      <md-button class="md-primary ch-btn-color" :md-ripple="true">
                        <md-icon>library_books</md-icon> Newsfeed
                      </md-button>
                    </router-link>

                    <router-link to="/StatisticsHome" active-class="active" exact>
                      <md-button class="md-primary ch-btn-color" :md-ripple="true">
                        <md-icon>equalizer</md-icon>Statistics
                      </md-button>
                    </router-link>

                    <router-link to="/ctshots" active-class="active" exact>
                      <md-button class="md-primary ch-btn-color" :md-ripple="true">
                        <md-icon>video_library</md-icon>Shots
                      </md-button>
                    </router-link>

                    <md-button class="md-primary cartBtnWrap" :md-ripple="true">
                      <router-link to="/buyer/cart" exact>
                        <div class="cartCount">
                          <md-icon>shopping_cart</md-icon>
                          <span class="ct-badge md-position-top">
                            {{ cart_count }}
                          </span>
                        </div>
                      </router-link>
                    </md-button>

                    <md-button
                      class="md-primary cartBtnWrap"
                      :md-ripple="true"
                      @click="$store.dispatch('notificationCheck')"
                    >
                      <router-link to="/notification" exact>
                        <div class="cartCount">
                          <i class="material-icons">notifications</i>
                          <span
                            class="ct-badge md-position-top"
                            v-if="notification_count && notification_count !== '0'"
                          >
                            {{ notification_count }}
                          </span>
                        </div>
                      </router-link>
                    </md-button>
                    <!-- <span v-if="retrievedTokenDetail">Toajn exist :  {{retrievedTokenDetail.result.logo}} </span> -->
                    <!-- <span v-else>Toajn dsnt exist : </span> -->

                    <span v-if="retrievedTokenDetail">
                      <span
                        @click="showSidepanel = true"
                        class="avatharUser Head"
                        :class="{
                          'new-avatar': user && user.profile.logo == '',
                        }"
                      >
                        <img
                          v-if="user && user.profile.logo != ''"
                          :src="user.profile.logo"
                          class="HdRUserLogo"
                        />
                        <div
                          v-else-if="user && user.profile.logo == ''"
                          class="profile-default-text"
                        >
                          <span class="text">{{
                            getFirstChar(user.profile.trade_name_en)
                          }}</span>
                        </div>
                      </span>
                    </span>
                    <span v-else>
                      <router-link to="/logIn" active-class="active" exact>
                        <md-button class="md-raised md-primary logn-btn">
                          <md-icon>account_circle</md-icon>Login
                        </md-button>
                      </router-link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <img v-if="user && user.profile.logo != ''" :src="user.profile.logo" />
                <div
                  v-else-if="user && user.profile.logo == ''"
                  class="profile-default-text"
                >
                  <div class="text">
                    {{ getFirstChar(user.profile.trade_name_en) }}
                  </div>
                </div>
              </div>
            </div>

            <div class="drawer-content">
              <div class="hero" v-if="user">
                {{ user.profile.trade_name_en }}
              </div>
              <div class="type" v-if="user">
                {{ user.profile.user_type | capitalize }}
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
                    <span> <i class="material-icons">bookmark_border</i> </span>Saved
                    Items
                  </router-link>
                </li>
                <li>
                  <router-link @click.native="hideDrawer" v-if="user" to="/dashboard">
                    <span> <i class="material-icons">dashboard</i> </span>Dashboard
                    <md-badge class="md-primary" md-content="9" />
                  </router-link>
                </li>
                <li>
                  <router-link @click.native="hideDrawer" v-if="user" to="/dashboard">
                    <span> <i class="material-icons">campaign</i> </span>Advertising
                  </router-link>
                </li>
                <li>
                  <router-link @click.native="hideDrawer" to="/dashboard/common/settings">
                    <span> <i class="material-icons">settings</i> </span>Settings
                  </router-link>
                </li>
                <li @click="logoutHandler" class="logout-link">
                  <a>
                    <span> <i class="material-icons">keyboard_tab</i> </span>Logout
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
      </header>
    </div>
  </div>
</template>
<script>
import appHeaderSearch from "./appHeaderSearchBox";
import Sticky from "vue-sticky-directive";
import { mapState } from "vuex";
export default {
  data() {
    return {
      base_url_api: process.env.BASE_URL,
      showSidepanel: false,
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return;
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  directives: {
    Sticky,
  },
  mounted() {},
  computed: {
    getFirstChar() {
      return (name) => name.charAt(0);
    },
    ...mapState({
      retrievedTokenDetail: (state) => state.user.retrievedTokenDetail,
      user: (state) => state.user.profile,
      notification_count: (state) => state.user.profile.notification_badge_counts,
    }),
    cart_count() {
      return this.$store.getters.getCartCount;
    },

    profileUrl() {
      return this.$store.getters.getProfileUrl;
    },
    profileIconUrl() {
      return this.$store.getters.getProfileIconUrl;
    },
    getSlug() {
      return (name) => this.slugify(name);
    },
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
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
    async logoutHandler() {
      this.showSidepanel = false;
      const { value: Reasons } = await this.$swal.fire({
        timer: 20000,
        timerProgressBar: true,
        title: "Are you sure you want to Log Out ?",
        cancelButtonColor: "#ff5722",
        confirmButtonColor: "#64dd17",
        confirmButtonText: "Yes",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading(),
      });
      if (!Reasons) return;
      this.$store.dispatch("destroyTokenHandler").then(() => {
        this.showSidepanel = false;
        this.$router.push("/");
      });
      this.$store.dispatch("emptyCart");
    },
    hideDrawer() {
      this.showSidepanel = false;
    },
  },
  created() {
    this.$store.dispatch("loggedIn_profile");
    this.$store.dispatch("getCart");
    this.$store.dispatch("dashboard_access");
  },

  components: {
    appHeaderSearch,
  },
};
</script>

<style scope>
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
  width: 35px;
  height: 35px;
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
  width: 100%;
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
  z-index: 11;
}
.md-button {
  height: 50px;
  padding: 5px 0px;
  margin: 0px;
  font-size: 13px;
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
  z-index: 10;
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
</style>
