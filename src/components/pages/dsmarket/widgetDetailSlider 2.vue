<template>

  <div class="detail-sldr-bx">
    <div class="zoomHolder">
       <img :src="selectedImage" @click="openGallery()">
      <Gallery v-if="togglePopUp" :images="images" :currentIndex="currentIndex" v-on:popupCloseEmit="HandlepopupCloseEmit"/>
    </div>
    <div class="thumb-holder">
    <ProductThumb :images="images" v-on:emitSelecteSlide="HandleemitSelecteSlide"></ProductThumb>
    </div>
  </div>
</template>
<script>

import Gallery from "../../../components/pages/dsmarket/productGallery"
import ProductThumb from "../../../components/pages/dsmarket/productThumb"
export default {
  props:['product'],
  components: { Gallery,ProductThumb },
  name: "WidgetSlider",
  data() {
    return {
      togglePopUp:false,
      images:'',
      selectedImage:'',
      currentIndex:0, 
    };
  },
  methods: {
    HandlepopupCloseEmit()
    {
      this.togglePopUp  =false
    },
    openGallery()
    {
      this.togglePopUp  = true
    },
    HandleemitSelecteSlide(index,image)
    {
      this.currentIndex = index;
      this.selectedImage = image;
    },
    setImageThumb(images)
    {
     return images.map(img=>{
      return img.file
      console.log(img.file)
     })
    }
  },
  created() {
    //this.images = this.product.images
    this.images = this.setImageThumb(this.product.images);
    this.selectedImage = this.product.images[0].file
  },

};
</script>
<style scoped>
.zoomHolder{
  display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 20px;
    padding-bottom: 20px;
}
.thumb-holder{
  width: 88%;
  margin: 0px auto;
}




</style>


