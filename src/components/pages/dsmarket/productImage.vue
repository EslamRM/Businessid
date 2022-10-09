<template>
     <WidgetGallery  :product="product" ></WidgetGallery>
</template>

<script>
import WidgetGallery from "../../../components/pages/dsmarket/widgetDetailSlider"

export default {
    props:["product"],
    components:{WidgetGallery},
   
  methods:{
     
  }
    
}
</script>

<style scoped>

</style>