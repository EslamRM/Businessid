<template>
  <div v-if="user_id && user_id != id">
    <md-button
      class="followBtn following"
      v-if="following"
      @click="handleUnfollow(id)"
      >following
    </md-button>
    <md-button
      class="md-button md-raised md-primary followBtn"
      v-else
      @click="handlefollow(id)"
      >follow</md-button
    >
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["id", "follow"],
  data() {
    return {
      following: false
    };
  },
  computed: {
    ...mapState({
      user_id: state => state.user.user_id
    })
  },
  methods: {
    handleUnfollow(id) {
      this.following = false;
      const data = {
        profileid: id,
        follow: 0
      };
      this.$store
        .dispatch("followUser", data)
        .then(response => {
          if (response.success == false) {
            this.following = true;
          }
        })
        .catch(error => console.log(error));
    },
    handlefollow(id) {
      this.following = true;
      const data = {
        profileid: id,
        follow: 1
      };

      this.$store
        .dispatch("followUser", data)
        .then(response => {
          this.following == false;
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.following = this.follow;
  }
};
</script>
<style scoped>
.followBtn {
  height: 30px;
  margin-left: 0.25em;

  background-color: #e4e0e0;
  border-radius: 3px;
  color: var(
    --md-theme-default-text-primary-on-background,
    rgba(0, 0, 0, 0.87)
  );
  font-size: 12px;
}

.followBtn:hover {
  color: #fff;
  background-color: #213a63;
}

.followBtn.following {
  background-color: #e0e0e0;
  color: #606060;
}
</style>
