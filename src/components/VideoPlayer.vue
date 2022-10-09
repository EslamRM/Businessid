<template>
  <video-player
    class="video-player-box"
    v-observe-visibility="visibilityChanged"
    ref="videoPlayer"
    :options="playerOptions"
    :playsinline="true"
    :webkit-playsinline="true"
    customEventName="customstatechangedeventname"
  >
  </video-player>
</template>
<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";
export default {
  props: ["video"],
  components: { videoPlayer },
  data() {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: this.video.file
          }
        ],
        poster: this.video.poster
      }
    };
  },
  methods: {
    visibilityChanged(isVisible, entry) {
      if (isVisible == true) {
        this.$refs.videoPlayer.player.play();
      } else {
        this.$refs.videoPlayer.player.pause();
      }
    }
  }
};
</script>
<style scoped></style>
