<template>
<div >
  
     <LightGallery
      :images="images"
      :index="index"
      :disable-scroll="true"
      @close="closePopUp(index)"
    />
    <ul>
      <li
        v-for="(img,index) in images"
        :key="img"
        @click="index = img"
      >
        <img :src="img">
      </li>
    </ul>
</div>
</template>
<script>
  import { LightGallery } from 'vue-light-gallery';

export default {
    components:{LightGallery},
    props:["images","currentIndex"],
      name: "Gallery",
  data() {
    return {
        index:0,
    }
    },
    watch:{

        currentIndex: function (val) {
            console.log("watching");
            console.log(val);
            
        },
    },
    methods:{
        closePopUp (index) 
        {
          
           this.index=null;
           this.$emit('popupCloseEmit')
           
        },
     
    },
    created(){
        this.index=this.currentIndex;
    }
    
}
</script>
<style scoped>

</style>