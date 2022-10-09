<template>
    <vueper-slides v-if="images.length > 1"
      class="no-shadow"
      :visible-slides="3"
      slide-multiple
      :gap="3"
      :slide-ratio="1 / 4"
      :dragging-distance="200"
      :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
      <vueper-slide  v-for="(image,index) in images" :key="index" :image="image"     @click.native="goToSlide(index,image)"> </vueper-slide>
    </vueper-slides>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
export default {
     components: { VueperSlides, VueperSlide },
     props:["images"],
     data(){
         return{
             
                //images:'',
                selectedImage:'',
                currentIndex:0,
         }
     },
     methods:{
             goToSlide(index,image){
                console.log(index);     
           
                this.$emit('emitSelecteSlide',index,image)
 
    },
     }

}
</script>
<style scoped>

</style>