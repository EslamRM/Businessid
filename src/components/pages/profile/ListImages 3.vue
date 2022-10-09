<template>
   <router-link
      :to="{ name: 'PhotoDetail', params: { id: photo.pk_post_file_id } }"
    >
  
      <img :src="photo.file" class="masonry-img">
   </router-link>
</template>
<script>
export default {
    name:"ListImages",
    props:["photo"],
    
}
</script>

<style scoped>
.masonry-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  /* filter: brightness(50%); */
}
</style>