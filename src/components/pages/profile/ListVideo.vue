<template>
<router-link :to="{ name: 'VideoDetail', params: { id: video.pk_post_file_id } }">
    <img :src="video.poster" class="masonry-img">
    <i data-v-022d7da9 class="material-icons video-btn-1">slideshow</i>
</router-link>
</template>
<script>
export default {
    name:"ListVideo",
    props:["video"],
    
}
</script>

<style scoped>
.masonry-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  /* filter: brightness(50%); */
}
.video-btn-1 {
  font-size: 30px;
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: #fff !important;
}
</style>