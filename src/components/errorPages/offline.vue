<template>
  <div class="text-center">
    <img src="./offline.svg" class="image" width="180px" height="180px" />
    <h1 class="title">Sorry You're Offline !!</h1>
    <p>Kindly turn on your internet and refresh</p>
    <md-button
      class="md-raised md-accent refresh-button"
      :md-ripple="true"
      @click="$router.go(-1)"
      >Refresh</md-button
    >
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.title {
  margin: 20px 10px;
}
.image {
  margin-top: 15%;
}

.refresh-button {
  margin-top: 50px;
}
</style>
