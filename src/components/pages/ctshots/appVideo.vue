<template>
  <div>
    <router-link
      :to="{ name: 'VideoDetail', params: { id: photos.pk_post_file_id } }"
      v-show="model != 'gallery'"
    >
      <div class="overlay-render">
        <video
          class="embed-responsive-item"
          controls="false"
          preload="metadata"
        >
          <source :src="`${photos.file}`" type="video/mp4" />
        </video>
        <div class="play-wrap">
          <span class="play-iconn"
            ><i class="material-icons">play_arrow</i></span
          >
        </div>
      </div>
      <!-- <span class="play-iconn" :style="{ backgroundImage:  'url('+playIcon+')' }"></span> -->

      <div class="shot-boxwrap">
        <div class="author">
          <img
            class="image"
            v-if="photos.usericon != ''"
            :src="photos.usericon"
          />
          <div class="profile-bg" v-else>
            <span class="text">{{ getFirstChar(photos.username) }}</span>
          </div>
          <router-link
            v-if="user_id == photos.userid"
            :to="/profile/ + getSlug(photos.username) + '/' + photos.userid"
          >
            <h3 v-if="photos.username.length < 16">{{ photos.username }}</h3>
            <h3 v-else>
              {{ photos.username.substring(0, 16) + "..." }}
            </h3>
          </router-link>

          <router-link
            v-else
            :to="
              /profiletimeline/ + getSlug(photos.username) + '/' + photos.userid
            "
          >
            <h3 v-if="photos.username.length < 16">{{ photos.username }}</h3>
            <h3 v-else>
              {{ photos.username.substring(0, 16) + "..." }}
            </h3>
          </router-link>
        </div>
      </div>
    </router-link>

    <router-link
      :to="{ name: 'VideoDetail', params: { id: photos.pk_post_file_id } }"
    >
      <div class="overlay-render">
        <img
          :src="photos.poster"
          class="embed-responsive-item"
          controls="false"
        />
        <div class="play-wrap">
          <span class="play-iconn"
            ><i class="material-icons">play_arrow</i></span
          >
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import playIcon from "@/assets/images/play.png";
import { mapState } from "vuex";

export default {
  name: "appVideo",
  props: [
    "photos",
    "postFileUrl",
    "profileIconUrl",
    "videoPosterPath",
    "model",
  ],
  components: {},
  data() {
    return {
      playIcon,
      isExpanded: false,
      display: "display-block",
    };
  },
  computed: {
    getFirstChar() {
      return (name) => name.charAt(0);
    },
    ...mapState({
      user_id: (state) => state.user.user_id,
    }),
    getSlug() {
      return (name) => this.slugify(name);
    },
  },
  methods: {
    slugify(text, ampersand = "and") {
      const a = "àáäâèéëêìíïîòóöôùúüûñçßÿỳýœæŕśńṕẃǵǹḿǘẍźḧ";
      const b = "aaaaeeeeiiiioooouuuuncsyyyoarsnpwgnmuxzh";
      const p = new RegExp(a.split("").join("|"), "g");
      return text
        .toString()
        .toLowerCase()
        .replace(/[\s_]+/g, "-")
        .replace(p, (c) => b.charAt(a.indexOf(c)))
        .replace(/&/g, `-${ampersand}-`)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+|-+$/g, "");
    },
    expandName() {
      this.isExpanded = !this.isExpanded;
      this.display = "display-none";
      if (this.isExpanded) {
        this.display = "display-none";
      } else {
        this.display = "display-block";
      }
    },
  },
};
</script>
<style scoped>
.masonry-grd {
  column-count: 5;
  column-gap: 12px;
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
.embed-responsive-item {
  background-color: rgb(255, 255, 255);
  height: 219px;
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
.display-block {
  display: block;
}
.display-none {
  display: none !important;
}
.shots-wrap .shot-box .fill {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
.mansory-grd-bx {
  margin-top: 15px;
}
.shot-box.video-wrapper video {
  height: 185px;
  max-width: 100%;
}
</style>
