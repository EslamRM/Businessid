<template>
  <div class="scroll">
    <div v-if="guest">
      <postItem
        :model="'Newsfeed'"
        v-for="feed in newsFeed"
        :key="feed.pk_post_id"
        :feed="feed"
      ></postItem>
    </div>
    <div v-if="user">
      <postItem
        :model="'Newsfeed'"
        v-for="feed in newsFeed"
        :key="feed.pk_post_id"
        :feed="feed"
      ></postItem>
    </div>
  </div>
</template>
<script>
import postItem from "./postItem";
import { mapState } from "vuex";

export default {
  name: "allPosts",
  data () {
    return {
      page: 1,
      guest: false,
      user: false
    };
  },
  components: {
    postItem,

  },
  computed: {
    // ...mapState({
    //  newsFeed  : state => state.newsFeed.newsFeed,
    // }),
    newsFeed () {
      return this.$store.getters.getNewsFeed;
    }
  },
  watch: {
    newsFeed: {
      // the callback will be called immediately after the start of the observation
      immediate: true,
      handler (val, oldVal) { },
      deep: true
    }
  },

  methods: {
    watchProps (val, oldVal) {
      if (val.hasOwnProperty("isliked")) {
        this.user = true;
      } else {
        this.guest = true;
      }
    }
  },

  created () {
    // console.log("created method from all posts")
    this.$store.dispatch("LoadPosts", 1).then(response => {
      const res = response.posts;
      if (res[0]["isliked"]) {
        this.user = true;
      } else {
        this.guest = true;
      }
    });

    //   .then(
    //     response=>{
    //       const res = response.posts;
    //      if(res)
    //      {
    //        this.hasNewsFeed=true;
    //      }else{
    //        this.newsFeed = false;
    //      }

    // })
    //console.log(this.$store.modules.test)

    //let test = state;
    // if(){

    //}
  },
  mounted () {
    console.log("response from mounted");
  }
};
</script>
<style scoped></style>
