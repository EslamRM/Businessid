<template>
  <div class="bookmark-wrapper">
    <div class="btn-bookmark" v-if="isFavourite">
      <i
        v-if="
          dashboard_access &&
          dashboard_access.some(
            (el) => el.type === 'social' && el.access === '1'
          )
        "
        class="material-icons reaction-icn-1"
        @click="handleUnsave(id)"
        >bookmark</i
      >
      <i v-else class="material-icons disabled-icon">bookmark</i>
      <md-tooltip md-direction="top">Unsave Post</md-tooltip>
    </div>
    <div class="btn-bookmark" v-else>
      <i
        v-if="
          dashboard_access &&
          dashboard_access.some(
            (el) => el.type === 'social' && el.access === '1'
          )
        "
        class="material-icons reaction-icn-1"
        @click="handleSave(id)"
        >bookmark_border</i
      >
      <i v-else class="material-icons disabled-icon">bookmark_border</i>
      <md-tooltip md-direction="top">Save Post</md-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookmark",
  props: ["favourite", "id", "total_share"],
  data () {
    return {
      isFavourite: false
    };
  },
  computed: {
    dashboard_access () {
      return this.$store.state.profile.dashboard_access
    }
  },
  methods: {
    handleSave (id) {
      this.isFavourite = true;
      const data = {
        postid: id,
        favorite: 1
      };

      this.$store
        .dispatch("savePost", data)
        .then(response => {
          if (response.data.success == false) {
            this.isFavourite = false;
          }
        })
        .catch(error => console.log(error));
    },
    handleUnsave (id) {
      this.isFavourite = false;
      const data = {
        postid: id,
        favorite: 0
      };
      this.$store
        .dispatch("savePost", data)
        .then(response => {
          if (response.data.success == false) {
            this.isFavourite = true;
          }
        })
        .catch(error => console.log(error));
    }
  },
  created () {
    this.isFavourite = this.favourite;
  }
};
</script>
<style scoped>
.bookmark-wrapper {
  /* padding-right: 10px; */
}
.btn-bookmark {
  margin-top: 4px;
  cursor: pointer;
}
.reaction-count {
  text-align: center;
  font-size: 11px;
}
.reaction-icn-1 {
  font-size: 21px;
}
.disabled-icon {
  color: grey;
  cursor: not-allowed;
  font-size: 21px;
}
</style>
