<template>
  <div
    class="ProfileCard-actions"
    v-if="user_id && user_id != id"
  >
    <div v-if="following != null">
      <md-button class="md-raised folllowing" @click="handleUnFollow(id)"
        >Following
      </md-button>
    </div>
    <div v-else>
      <md-button class="md-raised" @click="handleFollow(id)">Follow</md-button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Follow",
  props: ["follow", "id"],
  data() {
    return {
      following: null,
      hover: false
    };
  },
  computed: {
    ...mapState({
      retrievedTokenDetail: state => state.user.retrievedTokenDetail,
      user_id: state => state.user.user_id

    })
  },
  methods: {
    handleFollow(id) {
      this.following = "null";
      const data = {
        profileid: id,
        follow: 1
      };

      this.$store
        .dispatch("followUser", data)
        .then(response => {
          if (response.success == false) {
            this.following = null;
          }
        })

        .catch(error => console.log(error));
    },
    handleUnFollow(id) {
      this.following = null;
      this.$parent.$emit("follow");
      const data = {
        profileid: id,
        follow: 0
      };
      this.$store
        .dispatch("followUser", data)
        .then(response => {
          console.log(response.success);
          if (response.success == false) {
            this.following = "null";
          }
        })
        .catch(error => console.log(error));
    }
  },
  watch: {
    follow: function(newVal, oldVal) {
      console.log("Prop changed: ", newVal, " | was: ", oldVal);
      if (newVal != null) {
        this.following = newVal;
      }
      if (newVal == null) {
        this.following = null;
      }
    }
  },

  created() {
    this.following = this.follow;
  },
  beforeUpdate() {
    console.log("before update");
  }
};
</script>

<style scoped>
.ProfileCard-actions {
  display: inline-block;
  height: 31px;
  margin: 0 0 -4px 0;
  position: absolute;
  right: 0;
  vertical-align: bottom;
}

.ProfileCard-actions .md-button {
  height: 29px;
  min-width: 75px;
  font-size: 12px;
  padding: 5px 3px;
  border-radius: 100px;
  color: #ffffff !important;
  box-sizing: border-box;
  box-shadow: none;
  background-color: #213a63 !important;
}
.bottom-action {
  margin-top: 0.8em;
}
.bottom-action .item {
  width: 35px;
  text-align: center;
  line-height: 35px;
  border-radius: 50%;
  background: #fff;
  display: inline-flex;
  align-items: center;
}

.bottom-action .item i {
  margin: 0 auto;
  font-size: 20px;
  color: #ff5722;
}
.ProfileCard-actions div .folllowing {
  background-color: rgb(231, 233, 238) !important;
  color: #213a63 !important;
}
.ProfileCard-actions div .folllowing:hover {
  content: "unfollow";
}

button.md-button.md-raised.md-theme-default {
  background-color: #e4e0e0;
  color: #3a3939;
  height: 30px;
  font-size: 12px;
  border-radius: 3px;
  box-shadow: none;
}

button.md-button.md-raised.md-theme-default:hover {
  color: #fff;
  background-color: #213a63;
}

@media only screen and (max-width: 600px) {
  .follow_button.ProfileCard-actions .md-button {
    background-color: #ff5722 !important;
  }
  button.md-button.md-raised.folllowing.md-theme-default {
    padding-left: 10px;
    padding-right: 10px;
    background-color: #e6e4e4 !important;
    color: #fff !important;
  }
}
@media only screen and (max-width: 300px) {
  button.md-button.md-raised.folllowing.md-theme-default {
    margin-left: 3px;
  }
}
</style>
