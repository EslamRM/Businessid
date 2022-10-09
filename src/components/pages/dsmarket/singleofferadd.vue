<template>
  <div>
    <div class="single-offer pt-10">
      <div class="container">
        <div class="offer-img img-full">
          <router-link to="/">
            <img src="../../../assets/images/admain.png" alt>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.offer-img > a,
.offer-img2 > a,
.categories-img > a {
  display: block;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
}
.offer-img > a > img:hover,
.categories-img > a > img:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
