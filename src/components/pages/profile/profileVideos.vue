<template>
  <div>
    
    <div class="img-box-1" v-if="videos">
      <div
        class="masonry masonry--h"
        v-infinite-scroll="loadMore"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="1500"
      >
     
        <div
       
          class="masonry-brick masonry-brick--h"
          v-for="(video, index) in videos"
          :key="index"
        >
          <ListVideo :video="video" />
        </div>
       
      </div>
      
        
    </div>
     <div v-if="showImage" class="image-wrap">
               <h2 class="nodata">NO VIDEOS FOUND</h2>
              <img class="no-data-img" src="../../../assets/images/data.png">
        </div>
       
       <div class="loader">
              <div class="circle-loader" v-if="showLoader"></div>
        </div>
  </div>
</template>
<script>
import ListVideo from "./ListVideo";
export default {
  components: { ListVideo },
  data() {
    return {
      page:0,
      showLoader:false,
        showImage:false,
    };
  },
    computed: {
    videos(){
      return this.$store.getters.getProfilevideos;
    }
  },
  methods: {
    loadMore() {
     
      this.page++;
      const id = this.$route.params.id;
      this.showLoader = true;
      
      this.busy = true;
      const data = {profileid:id,page:this.page}
      this.$store
        .dispatch("profile_videos", data)
        .then(response => {
          console.log(response.success)
          this.showLoader = false;
          if (response.success) {
            this.busy = false;
          }
           else if(response.success == false && this.page==1){
            
            this.showImage = true;
            
          }
        })

        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    }
  },

  created() {
    this.loadMore();
  }
};
</script>
<style scoped>
.image-wrap{
  padding: 20px 0;
}
.nodata{
  margin-top: 25px;
      text-align: center;
    color: #616161;
    font-weight: bolder;
}
.no-data-img{

    height: 400px;
    display: block;
    margin: 0px auto;
}
.img-box-1 {
  margin-top: 15px;
}
.masonry {
  display: flex;
  width: 100%;
}

.masonry--h {
  flex-flow: row wrap;
}

.masonry--v {
  flex-flow: column wrap;
  max-height: 1080px;
}

.masonry--h,
.masonry--v {
  margin-left: -4px; /* Adjustment for the gutter */
  counter-reset: brick;
}

.masonry-brick {
  overflow: hidden;
  border-radius: 5px;
  margin: 0 0 8px 8px; /* Some Gutter */
  background-color: #333;
  color: white;
  position: relative;
  position: relative;
}

.masonry-brick:hover:after {
  font-size: 2.25em;
  opacity: 1;
}

.masonry-brick--h {
  flex: auto;
  height: 190px;
  min-width: 150px;
}
.masonry-brick--h:nth-child(4n + 1) {
  width: 250px;
}
.masonry-brick--h:nth-child(4n + 2) {
  width: 325px;
}
.masonry-brick--h:nth-child(4n + 3) {
  width: 180px;
}
.masonry-brick--h:nth-child(4n + 4) {
  width: 380px;
}
.masonry--v {
  max-height: 1600px;
}
.masonry-brick--v {
  width: 33.33333%;
}

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
.loader {
  position: relative;
  right: 0;
  margin: 0px auto;
}

.circle-loader {
  position: absolute;
  bottom: 0;
  left: 45%;
  top: 50px;
  transform: translate(-50%, -50%);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid rgba(206, 190, 190, 0.2);
  border-top: 5px solid #ff9a7a;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
