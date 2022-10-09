<template>
  <div>
    <video controls :src="video" :poster="poster" autoplay="autoplay" />
  </div>
</template>
<script>
export default {
  name: "VideoPlay",
  props: ["video", "poster"],
  data () {
    return {
      play: ""
    };
  },
  watch: {
    video: function (val, oldval) { }
  },
  computed: {
    data () {
      this.play = this.video;
    }
  }
};
</script>

<style scoped></style>
