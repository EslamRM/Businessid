<template>
  <div>
    <div class="pg-cnt-bx">
      <div class="container padding_mob">
        <div class="mansory-grd-bx">
          <div class="bx-tp-ct-lst">
            <div class="file_type_wrap">
              <div class="bx-ch-11">
                <div class="file_type">
                  <div class="radio-pill">
                    <!-- <md-radio
                      value=""
                      v-model="file_type"
                      @change="check($event)"
                      >All</md-radio
                    > -->
                    <md-button
                      @click="check('')"
                      class="md-raised ctShotsButtons"
                      :class="{ ctShotsButtonActive: file_type == '' }"
                    >
                      All
                    </md-button>
                  </div>
                  <div class="radio-pill">
                    <!-- <md-radio
                      value="video"
                      v-model="file_type"
                      @change="check($event)"
                      >Videos</md-radio
                    > -->
                    <md-button
                      @click="check('video')"
                      class="md-raised ctShotsButtons"
                      :class="{ ctShotsButtonActive: file_type == 'video' }"
                      >Videos</md-button
                    >
                  </div>
                  <div class="radio-pill">
                    <!-- <md-radio
                      value="image"
                      v-model="file_type"
                      @change="check($event)"
                      >Images</md-radio
                    > -->
                    <md-button
                      @click="check('image')"
                      class="md-raised ctShotsButtons"
                      :class="{ ctShotsButtonActive: file_type == 'image' }"
                      >Images</md-button
                    >
                  </div>
                </div>

                <div class="tag-wrap" v-if="model != 'gallery'">
                  <vue-tags-input
                    class="tags-chip"
                    @before-adding-tag="onEnterActivity"
                    v-model="tag"
                    :tags="activities"
                    :autocomplete-items="autocompleteItems"
                    :add-only-from-autocomplete="true"
                    @tags-changed="update"
                    placeholder="Choose activities #shipping"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="shots-wrap"
            v-infinite-scroll="loadMore"
            :infinite-scroll-listen-for-event="true"
            infinite-scroll-immediate-check="false"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="1500"
          >
            <div class="shot-box" v-for="(post, index) in posts" :key="index">
              <div v-if="post.type == 'image'">
                <AppPhoto
                  :model="model"
                  :photos="post"
                  :postFileUrl="postFileUrl"
                  :profileIconUrl="profileIconUrl"
                />
              </div>

              <div v-if="post.type == 'video'">
                <AppVideo
                  :model="model"
                  :photos="post"
                  :postFileUrl="postFileUrl"
                  :profileIconUrl="profileIconUrl"
                  :videoPosterPath="videoPosterPath"
                />
              </div>
            </div>
          </div>
          <div class="loader">
            <div class="circle-loader" v-if="showLoader"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import playIcon from "@/assets/images/play.png";
import AppPhoto from "./appPhoto";
import AppVideo from "./appVideo";
import { mapState } from "vuex";
import VueTagsInput from "@johmun/vue-tags-input";
export default {
  components: { AppPhoto, AppVideo, VueTagsInput },
  props: ["model", "profileid"],
  data() {
    return {
      page: 0,
      tag: "",
      autocompleteItems: [],
      isAutocompleteFilterd: false,
      activities: [],
      activitylists: "",
      showLoader: false,
      busy: false,
      isActive: true,
      playIcon,
      file_type: "",
      activity: []
      //display: "video-wrapper"
    };
  },
  created() {
    this.loadMore();
  },
  computed: {
    ...mapState({
      postFileUrl: state => state.ctshot.postFileUrl,
      advFileUrl: state => state.ctshot.advFileUrl,
      videoPosterPath: state => state.ctshot.videoPosterPath,
      profileIconUrl: state => state.ctshot.profileIconUrl
    }),
    posts() {
      return this.$store.getters.getCtshots;
    }
  },
  watch: {
    $route(to, from) {
      if (this.$router.history.index < this.$router.history.stack.length - 1) {
        console.log("back route");
      } else {
        console.log("not sure");
      }
    },
    tag: "initItems"
  },

  methods: {
    initItems() {
      console.log("init");

      // var temp_data = this.filters.activities;
      //this.filters.activities='a';
      // if(temp_data)
      // {
      //     let data=[...temp_data,this.tag];
      // }

      // this.filters.activities=[this.tag];
      // this.filterData();
      if (this.tag.length < 2) return;
      this.$store
        .dispatch("GET_ACTIVITIES", this.tag)
        .then(response => {
          this.autocompleteItems = response.data.result.map(a => {
            return { text: a.title };
          });
        })
        .catch(error => console.log(error));
    },
    update(newTags) {
      console.log(newTags);

      const activity = newTags.map(tags => {
        return tags.text;
      });
      this.activitylists = activity;
      this.page = 0;
      this.loadMore();
    },
    onEnterActivity(obj) {
      obj.addTag();
    },
    formatName(str) {
      console.log("objectdd");
      let words = str.split(" ").filter(str => str !== "");
      // remove accents / diacritics
      words = words.map(str =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      );
      // capitalize
      words = words.map(str => str[0].toUpperCase() + str.slice(1));
      return words.join(" ");
    },
    loadMore() {
      this.busy = true;
      this.page++;

      const data = {
        page: this.page,
        file_type: this.file_type,
        activities: this.activitylists,
        profileid: this.profileid
      };
      this.showLoader = true;
      this.$store
        .dispatch("Loadctshots", data)
        .then(response => {
          this.showLoader = false;
          if (response.posts) {
            this.showLoader = false;
            this.busy = false;
            console.log("there is response");
          }
        })

        .catch(error => {
          this.busy = false;
          this.showLoader = false;
          console.log(error);
        });
    },
    check(type) {
      this.file_type = type;
      this.page = 0;
      this.loadMore();
    }
  }
};
</script>
<style scoped>
@media screen and (max-width: 600px) {
  .md-button-content {
    margin-left: 0px;
  }
}

.ctShotsButtons {
  height: 34px !important;
}
.ctShotsButtonActive {
  background: #e4e4e4 !important;
}
.masonry-grd {
  column-count: 5;
  column-gap: 12px;
}
.ti-input[data-v-61d92e31] {
  border: none;
}
.masonry-grd-item {
  display: inline-block;
  margin: 0 0 12px;
  width: 100%;
  background: #fff;
  padding: 10px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding-bottom: 10px;
  position: relative;
  transition: 0.5s;
}
.masonry-grd-item:hover {
  cursor: pointer;
  transition: 0.5s;
}
.myclass div:first-child {
  border: none !important;
}
.vue-tags-input {
  max-width: 100%;
  width: 100%;
  border: none;
  margin-top: 6px;
}

.masonry-grd-item:hover:after {
  content: "";
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.5s;
  border-radius: 10px;
}
.ti-tag {
  background-color: red !important;
}
.bx-ch-12 {
  display: inline-flex;
}
.shot-box {
  cursor: pointer;
}
.shots-wrap .shot-box .fill {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
.mansory-grd-bx {
  margin-top: 15px;
}
.shots-wrap.video-holder-wrap {
  grid-auto-rows: auto;
}
.loader {
  position: relative;
  padding: 35px 0px;
}
.file_type_wrap {
  display: inline-flex;
  width: 100%;
}
.file_type {
  /* width: 44%;  */
  padding-top: 10px;
  display: inline-flex;
}
.radio-pill {
  display: inline-flex;
  padding: 3px 2px;
  padding-bottom: 16px;
}
.radio-pill .md-radio.md-theme-default.md-checked {
  background: #e4e4e4;
  color: #000;
}
.md-radio .md-theme-default .md-checked .md-radio-container {
  display: none !important;
}
.radio-pill .md-radio .md-radio-label {
  padding-left: 9px;
}
.radio-pill .md-radio {
  width: auto;
  margin: 7px 0px 0px 0;
  display: inline-flex;
  position: relative;
  padding: 11px 17px;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  text-transform: uppercase;
  font-size: 13px;
}
.md-radio .md-radio-label {
  padding-left: 5px !important;
}

.circle-loader {
  position: absolute;
  bottom: 0;
  left: 50%;

  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.bx-tp-12-ch {
  background: #fff;
  padding: 14px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
  display: inline-flex;
  width: 100%;
}
.bx-ch-11 {
  width: 100%;
}
.tag-wrap {
  width: 47%;
  display: inline-flex;
  margin-left: 2%;
  align-items: center;
  justify-content: flex-end;
}
.author img {
  border-radius: 50% !important;
}

.radio-pill .md-radio {
  padding: 9px 19px;
}
@media screen and (max-width: 1000px) {
  .radio-pill {
    padding-bottom: 11px;
  }

  .vue-tags-input {
    margin-top: 9px;
  }

  .radio-pill .md-radio {
    padding: 8px 18px;
  }
}

@media screen and (max-width: 600px) {
  .tag-wrap {
    display: none;
  }

  .shots-wrap {
    width: 100%;
    grid-auto-rows: 219px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 1.3em;
  }

  .radio-pill .md-radio {
    padding: 7px 17px;
  }

  .radio-pill {
    padding-bottom: 8px;
  }

  .file_type {
    padding-top: 5px;
  }

  .padding_mob {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

@media screen and (max-width: 320px) {
  .shots-wrap {
    width: 100%;
    grid-auto-rows: 219px;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 15px;
    margin-top: 1em;
  }
  .padding_mob {
    padding-left: 0px !important;
    padding-right: 0px !important;
  }

  .shots-wrap .shot-box {
    border-radius: 0px !important;
  }

  .radio-pill .md-radio {
    width: auto;
    margin: 7px 0px 0px 1px;
    padding: 5px 10px;
  }
  .mansory-grd-bx {
    margin-top: 9px;
  }

  .radio-pill {
    padding-bottom: 8px;
  }

  .file_type {
    padding-top: 9px;
    margin-left: 15px;
  }

  .radio-pill {
    margin-left: -12px;
  }

  .ctShotsButtons {
    height: 34px !important;
    min-width: 70px;
  }
}
</style>
