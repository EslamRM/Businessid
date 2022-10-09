<template>
  <div class="dsmarket-tabs" v-if="tabs">
    <div v-for="(tab, i) in tabs.tabs.dsmarket" :key="i">
      <router-link
        class="rt-lnk-tp-1"
        v-if="tab == 'products'"
        :to="
          tab == 'products'
            ? `${'/profilestore/' + profileName + '/' + profileId}`
            : ''
        "
        active-class="active-link"
        exact
      >
        <!---- <span class="iconWrap"><i class="material-icons">category</i></span>---->
        <md-button :md-ripple="false">Products</md-button>
      </router-link>
      <router-link
        class="rt-lnk-tp-1"
        v-if="tab == 'services'"
        :to="
          tab == 'services'
            ? `${'/profileproperties/' + profileName + '/' + profileId}`
            : ''
        "
        active-class="active-link"
        exact
      >
        <!---- <span class="iconWrap"><i class="material-icons">apartment</i></span>---->
        <md-button :md-ripple="false">Properties</md-button>
      </router-link>
      <router-link
        class="rt-lnk-tp-1"
        v-if="tab == 'properties'"
        :to="
          tab == 'properties'
            ? `${'/profileservices/' + profileName + '/' + profileId}`
            : ''
        "
        active-class="active-link"
        exact
      >
        <!---- <span class="iconWrap"><i class="material-icons">settings</i></span>--->
        <md-button :md-ripple="false">Services</md-button>
      </router-link>
      <router-link
        class="rt-lnk-tp-1"
        v-if="tab == 'autos'"
        :to="
          tab == 'autos'
            ? `${'/profileautos/' + profileName + '/' + profileId}`
            : ''
        "
        active-class="active-link"
        exact
      >
        <!----  <span class="iconWrap"><i class="material-icons">drive_eta</i></span>--->
        <md-button :md-ripple="false">Auto & Motors</md-button>
      </router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tabs: state => state.profile.profilePage,

      LoggedUser: state => state.user.profile
    }),
    profileName() {
      return this.$route.params.name;
    },
    profileId() {
      return this.$route.params.id;
    }
  }
};
</script>
<style scoped>
.dsmarket-tabs {
  display: flex;
  flex-shrink: 0;
  align-items: stretch;
  margin: 11px 0;
  padding-top: 0.77em;
}
.dsmarket-tabs a {
  height: 42px;
  padding: 0 5px;
  margin: 6px 0px 6px 0;

  background-color: #fff;

  border-radius: 2px;
  color: #3c4043;
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  /* margin-left: 8px; */
  position: relative;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
  margin-right: 4px !important;
}

.md-button {
  height: 42px;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 0px;
  margin-left: 0px;
  margin-bottom: 0px;
}

.md-button-content {
  font-size: 12px !important;
}

.dsmarket-tabs a button {
  height: auto;
  padding: 0;
  min-width: auto;
  margin-top: 1px;
}
.iconWrap {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin: 3px 5px 3px 3px;
  border-radius: 25px;
  -o-object-fit: cover;
  object-fit: cover;
  overflow: hidden;
  vertical-align: middle;
  width: 40px;
  background: #eee;
  color: #ff5722;
}
.tabText {
  line-height: 41px;
  display: inline;
  vertical-align: top;
}
.active-link .iconWrap {
  background: #ff5722;
  color: #fff;
}
.rt-lnk-tp-1.active-link {
  background-color: #e4e4e4 !important;
}
.rt-lnk-tp-1.active-link .md-button {
  border-bottom: none !important;
}
.rt-lnk-tp-1.active-link .md-button:before {
  background: transparent;
  background-color: transparent;
  display: none;
}
.md-button:before {
  display: none;
}
.rt-lnk-tp-1.active-link .md-button:hover {
  background: transparent;
  background-color: transparent;
}

@media screen and (max-width: 768px) {
  .dsmarket-tabs {
    margin-right: 12px;
    margin-left: 12px;
    overflow-x: auto;
    white-space: nowrap;
    max-width: 100%;
  }
}

@media screen and (max-width: 600px) {
  .dsmarket-tabs a {
    height: 29px;
    padding: 0 18px;
    padding-top: 2px;
  }
  .dsmarket-tabs a button {
    margin-top: 0px;
  }
}

@media screen and (max-width: 360px) {
  .dsmarket-tabs a button {
    margin-top: 3px;
  }

  .rt-lnk-tp-1 .md-button-content {
    font-size: 10px !important;
  }
  .dsmarket-tabs a {
    height: 32px;
    padding: 0 16px;
  }
}

@media screen and (max-width: 360px) {
  .dsmarket-tabs a {
    height: 29px;
    padding: 0 16px;
  }
}
</style>
