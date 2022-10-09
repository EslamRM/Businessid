<template>
  <div>
    <div v-if="isLoaded">
      <div class="company-profile-box" sticky-container>
        <div class="container wrapper_timeline">
          <div class="ct-timeline-wrap">
            <div class="top-section">
              <div class="ct-profile-cover">
                <div class="cover">
                  <coverSlider v-if="user" :profile="user" />
                  <div class="coverBorder"></div>
                </div>
                <div>
                  <profileHeader
                    v-if="user"
                    @toggleDsMarketMenu="toggleDsMarket"
                    :profile="user"
                  ></profileHeader>
                </div>
              </div>
            </div>
            <DsmarketMenu v-if="showMenu" />
          </div>
          <div>
            <router-view @handleBannerEmit="onclickChangeBanner"> </router-view>
          </div>
        </div>
      </div>
    </div>

    <div class="container" v-else>
      <div class="loader">
        <div class="circle-loader"></div>
      </div>
    </div>
  </div>
</template>
<script>
import DsmarketMenu from "./dsMarketMenu";
import coverSlider from "./coverSlider";
import profileHeader from "./profileHeader";
import { mapState } from "vuex";
import { VclFacebook, VclInstagram } from "vue-content-loading";

export default {
  components: {
    coverSlider,
    profileHeader,
    VclFacebook,
    VclInstagram,
    DsmarketMenu
  },
  data() {
    return {
      showMenu: false,
      isLoaded: true
    };
  },
  watch: {
    //call load profile if the route has changes
    //check condition if the router parameter is same or not, if not same then call api
    $route(to, from) {
      if (to.params.id != from.params.id) {
        this.LoadProfile();
      }
      const url = to.fullPath.split("/");
      if (
        url[1] == "profilestore" ||
        url[1] == "profileproperties" ||
        url[1] == "profileservices" ||
        url[1] == "profileautos"
      ) {
        this.showMenu = true;
      } else {
        this.showMenu = false;
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.profile.profilePage
    }),
    profileId() {
      return this.$route.params.id;
    },
    profileName() {
      return this.$route.params.name;
    }
  },
  methods: {
    toggleDsMarket() {
      this.showMenu = !this.showMenu;
    },
    onclickChangeBanner(value) {
      console.log(value);
      //vm.isLoaded = value;
    },
    LoadProfile() {
      const profile_id = this.$route.params.id;
      this.isLoaded = false;
      this.$store
        .dispatch("profile_info", profile_id)
        .then(response => {
          this.isLoaded = true;
        })
        .catch(error => console.log(error));
    }
  },

  created() {
    this.LoadProfile();

    const url = this.$route.fullPath.split("/");
    if (
      url[1] == "profilestore" ||
      url[1] == "profileproperties" ||
      url[1] == "profileservices" ||
      url[1] == "profileautos"
    ) {
      this.showMenu = true;
    } else {
      this.showMenu = false;
    }
  }
};
</script>
<style scoped>
.company-profile-box {
  padding-bottom: 2.2em;
}
.ct-timeline-wrap {
  position: relative;
}
.top-section {
  border-radius: 0 0 11px 11px;
  background: #fff;
  border: 1px solid #e4e4e4;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  overflow: hidden;
  border-top: 0;
  transition: all 0.333ms ease-in;
}
.profile-container {
  padding: 0px 20px;
  margin-top: -50px;
  position: relative;
}
.loader {
  position: relative;
  right: 25%;
}
.circle-loader {
  position: absolute;
  top: 150px;
  bottom: 10;
  left: 70%;

  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
.ct-profile-cover {
  margin: -1px -1px 0;
  display: block;
}
.cover {
  display: block;
  position: relative;
}
.cover-slider {
  display: block;
  position: relative;
  height: 315px;
  overflow: hidden;
  text-decoration: none;
}
.cover-slider img {
  image-rendering: optimizeQuality;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  left: 0;
}
.coverBorder {
  height: 61px;
  /* border: 1px solid #000; */
  border-color: rgba(0, 0, 0, 0.25);
  border-top-color: rgba(0, 0, 0, 0.1);
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  /* top: 0; */
  background: linear-gradient(rgba(0, 0, 0, 0) 4%, rgba(0, 0, 0, 0.6));
  border-bottom-color: rgba(0, 0, 0, 0.4);
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media screen and (max-width: 768px) {
  .wrapper_timeline {
    max-width: 100%;
    padding: 0px;
  }

  .top-section {
    border-radius: 0px;
  }
}

@media screen and (max-width: 300px) {
  .wrapper_timeline {
    padding-right: 39px;
  }
}
</style>
