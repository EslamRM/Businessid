<template>
  <div>
    <div class="appWrapper">
      <div v-if="isMobileCheck == 'true' || isTabletCheck == 'true'">
        <mobileHeader />
      </div>
      <div v-else>
        <appHeader></appHeader>
      </div>

      <div class="appContainerHero">
        <div class="router-bx-1">
          <vue-progress-bar></vue-progress-bar>
          <router-view />
        </div>
        <div class="push"></div>
      </div>
      <div v-if="isMobileCheck == 'true' || isTabletCheck == 'true'">
        <mobileFooter v-if="showHeaderFooter" />
      </div>
      <div v-else>
        <div
          v-if="
            [
              'logIn',
              'dsMarket',
              'RegisterHome',
              'appHome',
              'personalAccount',
              'businessAccount',
            ].includes($route.name)
          "
        >
          <div class="appFooterHero">
            <appFooter></appFooter>
          </div>

          <copyWrite />
        </div>
      </div>

      <!-- <appFooter  v-if="['logIn','dsMarket','RegisterHome','personalAccount','businessAccount'].indexOf($route.name) > -1"></appFooter> -->
    </div>
  </div>
</template>

<script>
import { isMobile, isTablet } from "mobile-device-detect";
import { mapState } from "vuex";

import appHeader from "./components/appHeader";
import appFooter from "./components/appFooter";
import copyWrite from "./components/copywrite";
import mobileHeader from "./mobileComponents/mobileHeader";
import mobileFooter from "./mobileComponents/mobileFooter";
export default {
  components: {
    appHeader,
    appFooter,
    copyWrite,
    mobileHeader,
    mobileFooter,
  },
  data() {
    return {
      isMobileCheck: isMobile ? "true" : "false",
      isTabletCheck: isTablet ? "true" : "false",
    };
  },
  computed: {
    ...mapState({
      showHeaderFooter: (state) => state.general.showHeader,
    }),
  },

  mounted() {
    //  [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish();
  },
  created() {
    this.$store.dispatch("switchedUserId");
    //  [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        // parse meta tags
        this.$Progress.parseMeta(meta);
      }
      //  start the progress bar
      this.$Progress.start();
      // if (navigator.onLine) {
      //   console.log('online');
      // } else {
      //   window.location.href = "/offline";
      //   console.log('offline');
      // }
      //  continue to next page
      next();
    });
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish();
    });
  },
};
</script>

<style scope>
@import url("./assets/css/ctgrids.css");
@import url("./assets/css/app.css");
@import url("./assets/css/abhishek.css");
@import url("./assets/css/noushad.css");

/* SweetAlert2 Global css */
.swal2-container {
  zoom: 1.5;
}
.swal2-timer-progress-bar {
  background-color: tomato;
}

.swal2-loading .swal2-confirm {
  background-color: tomato;
}

.swal2-title {
  /* font-size: 1.7em; */
  font-size: 1em;
  font-weight: 400;
  color: #1a1a1a;
}

.swal2-styled.swal2-cancel {
  font-size: 1em;
}
.swal2-styled.swal2-confirm {
  font-size: 1em;
}

/* Vue Date Picker editOrder.vue */

.editOrder-datePicker .vd-picker__input-clear__icon {
  position: absolute;
  right: 2px;
}
.vd-picker__input-clear__icon {
  position: absolute;
  right: 2px;
  top: -2px;
}

@media screen and (max-width: 600px) {
  .editOrder-datePicker-mob .vd-picker__input-clear__icon {
    position: absolute;
    right: 2px;
  }
}

/* Vue Mobile Number Input */
.vti__dropdown-list {
  z-index: 999 !important;
  border: #ccc 3px solid;
  border-radius: 3px;
}

/* V-Select */
.v-select {
  text-transform: capitalize;
  /* Bcz. In add product the background looks dirty */
  background-color: white;
}
.vs__search::placeholder {
  color: grey;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* TRANSITION */
/* always present */
.expand-enter-active,
.expand-leave-active {
  transition: all 500ms ease-in-out;
}
.expand-enter, .expand-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
</style>

