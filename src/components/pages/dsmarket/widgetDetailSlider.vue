<template>
  <div class="detail-sldr-bx">
    <div class="zoomHolder">
      <img :src="selectedImage" @click="openGallery()" />
      <Gallery
        v-if="togglePopUp"
        :images="images"
        :currentIndex="currentIndex"
        v-on:popupCloseEmit="HandlepopupCloseEmit"
      />
    </div>
    <div class="thumb-holder">
      <ProductThumb
        :images="images"
        v-on:emitSelecteSlide="HandleemitSelecteSlide"
      ></ProductThumb>
    </div>
  </div>
</template>
<script>
import Gallery from "../../../components/pages/dsmarket/productGallery";
import ProductThumb from "../../../components/pages/dsmarket/productThumb";
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    selectedVariationImage: {
      type: String,
    },
  },
  components: { Gallery, ProductThumb },
  name: "WidgetSlider",
  data() {
    return {
      togglePopUp: false,
      images: "",
      selectedImage: "",
      currentIndex: 0,
    };
  },
  watch: {
    selectedVariationImage(newVal, oldVal) {
      this.selectedImage = newVal;
    },
  },
  methods: {
    HandlepopupCloseEmit() {
      this.togglePopUp = false;
    },
    openGallery() {
      this.togglePopUp = true;
    },
    HandleemitSelecteSlide(index, image) {
      this.currentIndex = index;
      this.selectedImage = image;
    },
    getVariationsImages() {

      let accumulator = [];
      if (!this.product.variations || this.product.variations.colors.length < 0)
      {
        if(this.product.images < 0)
        {
          return [];
        }
        else
        {
          accumulator = this.product.images.map((pr)=>pr.file);
        }
      }
      else
      {
        this.product.variations.colors.forEach((element) => {
          accumulator = [...accumulator, ...element.files];
        });
      }
      return accumulator;
    },
  },

  created() {
    //this.images = this.product.images
    this.images = [
      // ...this.product.images.map((img) => img.file),
      ...this.getVariationsImages(),
    ];
    this.selectedImage = this.images[0];
  },
};
</script>
<style scoped>
.zoomHolder {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
.thumb-holder {
  width: 88%;
  margin: 0px auto;
}
</style>


