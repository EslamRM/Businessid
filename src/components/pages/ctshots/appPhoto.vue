<template>
  <div>
    <div class="shot-boxwrap" v-show="model != 'gallery'">
      <div class="author">
        <img
          class="avatharIn"
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

    <router-link
      :to="{ name: 'PhotoDetail', params: { id: photos.pk_post_file_id } }"
    >
      <!-- <v-lazy-image  :src="photos.file" class="image" /> -->
      <!-- <img class="image" :src="photos.file" v-if="photos.file" /> -->

      <figure v-lazyload class="image__wrapper">
        <!-- loader bgins -->
        <div class="loading"></div>
        <!-- loader ends -->
        <img class="image__item" :data-url="photos.file" alt />
      </figure>
    </router-link>
  </div>
</template>
<script>
import playIcon from "@/assets/images/play.png";
import { mapState } from "vuex";
import VLazyImage from "v-lazy-image";

export default {
  name: "appPhoto",
  props: ["photos", "postFileUrl", "profileIconUrl", "profileid", "model"],
  components: {
    VLazyImage,
  },
  data() {
    return {
      isExpanded: false,
      display: "display-block",
    };
  },
  computed: {
    ...mapState({
      user_id: (state) => state.user.user_id,
    }),
    getFirstChar() {
      return (name) => name.charAt(0);
    },
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
.profile-bg {
  width: 100%;
  max-width: 36px !important;
  height: 36px !important;
  border-radius: 50% !important;
  background-color: #f47320;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-bg .text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.masonry-grd {
  column-count: 5;
  column-gap: 12px;
}

.display-block {
  display: block;
}
.display-none {
  display: none !important;
}
.image {
  min-height: 219px;
  max-height: 100%;
  max-width: 100%;
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

.shots-wrap .shot-box .fill {
  width: 100%;
  object-fit: cover;
  height: 100%;
}
.mansory-grd-bx {
  margin-top: 15px;
}
.shots-wrap {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
}
.shots-wrap .shot-box {
  flex: 20%;
  max-width: 20%;
  padding: 0 15px;
  line-height: 1.6;
  position: relative;
  margin: 15px 0px;
  /*width: calc(100% / 5 - 0px);*/
}
.loader {
  position: absolute;
  padding: 0px 0px;
  z-index: -1000;
}
.circle-loader {
  position: relative;
  bottom: 0;
  left: 25px;

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
.image__wrapper {
  position: relative;
}

.loading {
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f7f8;
  background-image: -webkit-linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-image: linear-gradient(
    left,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 219px;
  height: 219px;
  position: relative;
}
@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }

  100% {
    background-position: 468px 0;
  }
}
.image__wrapper.loaded .loading {
  opacity: 0;
  display: none;
}

@media screen and (max-width: 1000px) {
  .profile-bg {
    max-width: 30px !important;
    height: 30px !important;
  }
}
</style>
