<template>
  <div>
    <div class="pg-cnt-bx">
      <div class="bx-wrp-cntr-1">
        <createPost
          v-if="
            dashboard_access &&
              dashboard_access.some(
                el => el.type === 'social' && el.access === '1'
              )
          "
        ></createPost>
        <allPost></allPost>
        <content-loader
          v-if="loading"
          :width="400"
          :height="460"
          :speed="2"
          primaryColor="#f3f3f3"
          secondaryColor="#ecebeb"
        >
          <circle cx="31" cy="31" r="15" />
          <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
          <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
          <rect x="0" y="60" rx="2" ry="2" width="400" height="400" />
        </content-loader>
      </div>
    </div>
  </div>
</template>
<script>
import allPost from "./allPosts";
import createPost from "./createPost";
import { ContentLoader } from "vue-content-loader";

export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  computed: {
    dashboard_access() {
      return this.$store.state.profile.dashboard_access;
    }
  },
  props: ["loading"],
  components: {
    createPost,
    allPost,
    ContentLoader
  },
  created() {
    this.$store.dispatch("dashboard_access");
    if (localStorage.getItem("token")) {
      this.isLoggedIn = true;
    }
  }
};
</script>
<style scoped>
.bx-wrp-cntr-1 {
  padding-left: 25px;
  padding-right: 25px;
}

@media screen and (max-width: 1000px) {
  .bx-wrp-cntr-1 {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
