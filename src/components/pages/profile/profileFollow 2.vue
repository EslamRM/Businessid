<template>
  <div class="follow-bx-widget">
    <div v-if="user_id && user_id != id" class="wrapAll">
      <md-button
        v-if="following == false"
        @click="handleFollow(id)"
        class="md-raised md-primary follow-btn-prof follow other_profile_follow"
      >
        Follow
      </md-button>
      <md-button
        v-else-if="following == true"
        class="md-raised md-primary follow-btn-prof min_height following other_profile_follow"
        @click="handleUnFollow(id)"
        >Following</md-button
      >
    </div>
    <div
      class="cnt-flwr-txt"
      :class="following == 'disabled' ? 'profileMe' : ''"
    >
      <span class="countBold">{{ count }}</span>

      <span class="">Followers</span>
    </div>
    <div
      class="cnt-flwr-txt brdr-1"
      :class="following == 'disabled' ? 'profileMe' : ''"
    >
      <span class="countBold">{{ folowing_count }}</span>
      <span class="">Following</span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Follow",
  props: ["Isfollowing", "id", "follow_count", "following_count"],
  data () {
    return {
      isDisabled: "",
      following: false,
      hover: false,
      count: 0,
      folowing_count: 0
    };
  },

  methods: {
    handleFollow (id) {
      this.following = true;
      this.count++;
      const data = {
        profileid: id,
        follow: 1
      };

      this.$store
        .dispatch("followUser", data)
        .then(response => {
          if (response.success == false) {
            this.count--;
            this.following = false;
          }
        })

        .catch(error => console.log(error));
    },
    handleUnFollow (id) {
      this.following = false;
      this.count--;

      const data = {
        profileid: id,
        follow: 0
      };
      this.$store
        .dispatch("followUser", data)
        .then(response => {
          console.log(response.success);
          if (response.success == false) {
            this.count++;
            this.following = true;
          }
        })
        .catch(error => console.log(error));
    }
  },
  // watch: {
  //     follow:function (newVal,oldVal) {
  //         console.log('Prop changed: ', newVal, ' | was: ', oldVal)
  //     }

  // },
  watch: {},
  computed: {
    ...mapState({
      user_id: state => state.user.user_id,
    })
  },
  created () {
    this.following = this.Isfollowing;
    this.isDisabled = this.Isfollowing;
    this.count = this.follow_count;
    this.folowing_count = this.following_count;
  },
  beforeUpdate () {
    console.log("before update");
  }
};
</script>

<style scoped>
.follow {
  background-color: #213a63 !important;
  color: #ffff !important;
}
.following {
  background-color: #e4e0e0 !important;
  color: #3a3939 !important;
}
.follow-bx-widget {
  display: inline-flex;
  padding: 5px 5px;
  border-radius: 8px;
  text-align: center;
  color: #0000ff;
  font-size: 12px;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  position: relative;
}
.follow-btn-prof {
  height: 35px;
  font-size: 12px;
  border-radius: 19px;
  transition: none;
}
.countBold {
  font-weight: bold;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
}

.cnt-flwr-txt {
  color: rgb(168, 181, 191);
  padding: 0 5px;
  margin-left: 2px;
  user-select: none;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: -10px;
}
.top-sticky .follow-btn-prof {
  height: 29px !important;
  font-size: 11px;
}

.brdr-1 {
  border-left: 1px solid #dbdbdb;
}
.wrapAll {
  margin-right: 0.5em;
  float: left;
  margin-top: -6px;
  padding: 0px;
}
.min_height.md-ripple {
  min-height: 30px !important;
  background-color: red !important;
}
button.md-button.md-raised.md-primary.follow-btn-prof.md-theme-default {
  background-color: #e4e0e0;
  color: #3a3939;
  height: 30px;
  font-size: 12px;
  border-radius: 3px;
  box-shadow: none;
  padding-top: 0px;
  margin: 0px;
  float: left;
}

button.md-button.md-raised.md-primary.follow-btn-prof.follow.other_profile_follow.md-theme-default {
  margin-top: -3px;
}

@media screen and (max-width: 768px) {
  button.md-button.md-raised.md-primary.follow-btn-prof.follow.other_profile_follow.md-theme-default {
    margin-top: -10px;
  }
  .wrapAll {
    position: absolute;
    right: 1%;
    top: 82px;
    margin-top: 0px;
  }
  .cnt-flwr-txt {
    padding-right: 10px;
    padding-left: 10px;
  }

  .follow-bx-widget {
    float: left;
  }

  .countBold,
  .cnt-flwr-txt span {
    font-weight: 400;
  }

  i.material-icons {
    float: left;
  }

  .cnt-flwr-txt {
    width: fit-content;

    float: left;
  }

  .follow-bx-widget {
    padding: 5px 5px;
    margin-top: 10px;
    width: 100% !important;
  }

  button.md-button.md-raised.md-primary.follow-btn-prof.follow.other_profile_follow.md-theme-default {
    margin-top: -11px;
  }
  button.md-button.md-raised.md-primary.follow-btn-prof.following.other_profile_follow.md-theme-default {
    margin-top: -11px;
  }
  .top-sticky .other_profile_follow.md-theme-default {
    margin-top: -4px !important;
  }

  .top-sticky .cnt-flwr-txt {
    margin-top: -4px;
  }
}

@media screen and (max-width: 600px) {
  .cnt-flwr-txt {
    color: #fff;
  }

  .countBold {
    color: #fff;
    margin-right: 3px;
    margin-bottom: 7px;
    font-size: 14px;
    width: 100%;

    float: left;
  }

  .cnt-flwr-txt {
    padding-right: 2px;
    padding-left: 0px;
  }

  .brdr-1 {
    border: none;
  }
}

@media screen and (max-width: 300px) {
  .countBold,
  .cnt-flwr-txt span {
    font-weight: 400;
    font-size: 12px;
  }
}
</style>
