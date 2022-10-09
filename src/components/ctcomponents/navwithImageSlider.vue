<template>
  <div>
    <div class="right-content">
      <div class="ch-nav-with-image">
        <carousel
          :perPage="8"
          :autoplay="false"
          :autoplayHoverPause="true"
          :paginationSize="10"
          paginationActiveColor="#f47320"
          paginationColor="#000"
          easing="linear"
          :autoplayTimeout="5000"
          :loop="true"
          :navigationEnabled="false"
          navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
          navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
        >
          <slide v-for="(navSliderItem,index) in navSliderData" :key="index">
            <router-link to="/">
              <div class="text-center nav-lnk-sldr-bx">
                <div class="img-box">
                  <img
                    :src="require(`../../assets/images/${navSliderItem.navImage}`)"
                    :alt="require(`../../assets/images/${navSliderItem.navImage}`)"
                  >
                </div>
                <div class="category-name">{{navSliderItem.navText}}</div>
              </div>
            </router-link>
          </slide>
        </carousel>
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  data() {
    return {
      navSliderData: [
        {
          navLink: "/",
          navImage: "s00.png",
          navText: "Solar Energy Products"
        },
        {
          navLink: "/",
          navImage: "s11.png",
          navText: "Generators"
        },
        {
          navLink: "/",
          navImage: "s22.png",
          navText: "Industrial Controls"
        },
        {
          navLink: "/",
          navImage: "s33.png",
          navText: "Electrical Supplies"
        },
        {
          navLink: "/",
          navImage: "s44.png",
          navText: "Electrical Instruments"
        },
        {
          navLink: "/",
          navImage: "s55.png",
          navText: "Batteries"
        },
        {
          navLink: "/",
          navImage: "s66.png",
          navText: "Motors"
        },
        {
          navLink: "/",
          navImage: "s00.png",
          navText: "Solar Energy Products"
        },
        {
          navLink: "/",
          navImage: "s11.png",
          navText: "Generators"
        },
        {
          navLink: "/",
          navImage: "s22.png",
          navText: "Industrial Controls"
        },
        {
          navLink: "/",
          navImage: "s55.png",
          navText: "Batteries"
        },
        {
          navLink: "/",
          navImage: "s66.png",
          navText: "Motors"
        },
        {
          navLink: "/",
          navImage: "s00.png",
          navText: "Solar Energy Products"
        },
        {
          navLink: "/",
          navImage: "s11.png",
          navText: "Generators"
        },
        {
          navLink: "/",
          navImage: "s22.png",
          navText: "Industrial Controls"
        },
        {
          navLink: "/",
          navImage: "s55.png",
          navText: "Batteries"
        },
        {
          navLink: "/",
          navImage: "s66.png",
          navText: "Motors"
        },
        {
          navLink: "/",
          navImage: "s00.png",
          navText: "Solar Energy Products"
        },
        {
          navLink: "/",
          navImage: "s11.png",
          navText: "Generators"
        },
        {
          navLink: "/",
          navImage: "s22.png",
          navText: "Industrial Controls"
        },
        {
          navLink: "/",
          navImage: "s55.png",
          navText: "Batteries"
        },
        {
          navLink: "/",
          navImage: "s66.png",
          navText: "Motors"
        },
        {
          navLink: "/",
          navImage: "s00.png",
          navText: "Solar Energy Products"
        },
        {
          navLink: "/",
          navImage: "s11.png",
          navText: "Generators"
        },
        {
          navLink: "/",
          navImage: "s22.png",
          navText: "Industrial Controls"
        },
        {
          navLink: "/",
          navImage: "s33.png",
          navText: "Electrical Supplies"
        },
        {
          navLink: "/",
          navImage: "s44.png",
          navText: "Electrical Instruments"
        },
        {
          navLink: "/",
          navImage: "s55.png",
          navText: "Batteries"
        },
        {
          navLink: "/",
          navImage: "s66.png",
          navText: "Motors"
        },
        {
          navLink: "/",
          navImage: "s77.png",
          navText: "Professional video and audio"
        }
      ]
    };
  },
  components: {
    Carousel,
    Slide
  }
};
</script>
<style scoped>
</style>

