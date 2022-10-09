<template>
  <div>
    <Croppper
      v-on:EmittoggleCropper="handleEmitToggleCropper"
      v-if="showCropper"
      :imageObject="SelectedImageObject"
      :image="SelectedImage"
      :id="banners.id"
      :height="height"
      :width="width"
      :stencilHeight="stencilHeight"
      :stencilWidth="stencilWidth"
    ></Croppper>
    <input
      type="file"
      ref="file"
      style="display: none"
      v-on:change="chooseImage($event)"
    />
    <div
      class="col-sm-7 col-md-12 col-xl-12 fl wrapper_order_table"
      v-if="banners.section == 1"
    >
      <div class="badge_number fl">{{ banners.section }}</div>

      <h3>
        {{ banners.description }}

        <strong> Amount : AED {{ banners.price }}</strong>
      </h3>

      <!----slider_start------->
      <div class="carousel_adevertisement">
        <div class="cover-slider">
          <div
            class="big_img_add"
            @click="toggleCropper({ width: 680, height: 400 })"
            v-if="banners.ads.length <= 0"
          >
            <i data-v-72e9c9bd="" class="material-icons">add</i>
          </div>

          <carousel
            :perPage="1"
            :autoplay="true"
            :autoplayHoverPause="true"
            :paginationEnabled="true"
            easing="linear"
            :loop="true"
            paginationActiveColor="#f47320"
            paginationColor="rgba(255, 87, 34,0.5)"
            :navigationEnabled="true"
            navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
            navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
            :speed="500"
            :interval="2000"
            :autoplayTimeout="7000"
          >
            <slide v-for="image in banners.ads" :key="image.id">
              <SliderCard :image="image" />
            </slide>
          </carousel>
          <div class="thumbnails">
            <div
              v-for="(image, index) in banners.ads"
              :key="image.id"
              class="thumbnail-image"
              @click="activateImage(index)"
            >
              <img :src="image.file" />
            </div>
          </div>
        </div>

        <div
          class="add_btn"
          v-if="banners.ads.length > 0"
          @click="toggleCropper({ width: 680, height: 400 })"
        >
          <i data-v-72e9c9bd="" class="material-icons">add</i>
        </div>
      </div>

      <!----slider_end------->
    </div>

    <!---------start-------------------->
    <div
      class="col-sm-7 col-md-12 col-xl-12 fl wrapper_order_table"
      v-if="
        banners.section == 2 ||
          banners.section == 3 ||
          banners.section == 4 ||
          banners.section == 5
      "
    >
      <div class="row_box_adver">
        <div class="col-sm-12 p-0 fl">
          <ImageCard
            v-on:EmitCropperPopUp="handleEmit"
            :image="banners"
            type="market"
            :height="158"
            :width="600"
          />
        </div>
      </div>
    </div>
    <!-----------end-------------------->
  </div>
</template>
<script>
import tabAdvertisements from "../tabAdvertisements";
//import Carousel from '../advertisements/Carousel';
import { Carousel, Slide } from "vue-carousel";
import Countdown from "vuejs-countdown";
import Croppper from "./cropper";
import SliderCard from "./SliderCard";
import ImageCard from "./ImageCard";

export default {
  components: {
    tabAdvertisements,
    SliderCard,
    ImageCard,
    Countdown,
    Carousel,
    Croppper
  },
  props: ["banners"],
  data() {
    return {
      selectedSection: "",
      SelectedImageObject: "",
      SelectedImage: "",
      showCropper: false,

      images: [],
      width: "",
      height: "",
      stencilHeight: "",
      stencilWidth: ""
    };
  },
  methods: {
    handleEmitToggleCropper() {
      this.showCropper = false;
    },
    handleEmit(img) {
      console.log("ddd");
      this.toggleCropper(img);
    },
    toggleCropper(res) {
      console.log(res);
      if (res.height == 400) {
        this.stencilHeight = 500;
        this.stencilWidth = 860;
      } else if (res.height == 160) {
        this.stencilHeight = 145;
        this.stencilWidth = 565;
      }
      this.width = res.width;
      this.height = res.height;
      this.$refs.file.click();
    },
    setCarousel() {
      console.log("hereeee");

      let bannerImage = this.banners.ads;
      bannerImage.forEach(el => {
        const data = {
          id: el.id,
          big: el.file,
          thumb: el.file,
          start_date: el.start_date,
          expiry_date: el.expiry_date,
          payment_status: el.payment_status
        };
        this.images.push(data);
      });
      console.log("images", this.images);
    },
    chooseImage($event) {
      this.SelectedImageObject = $event.target.files[0];
      this.SelectedImage = URL.createObjectURL($event.target.files[0]);
      let file = this.$refs.file.files[0];
      if (!file || file.type.indexOf("image/") !== 0) return;

      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = evt => {
        let img = new Image();
        img.onload = () => {
          if (img.width >= this.width && img.height >= this.height) {
            this.showCropper = true;
          } else {
            console.log(this.width);
            alert("Recommended size - " + this.height + " *  " + this.width);
          }
        };
        img.src = evt.target.result;
      };

      reader.onerror = evt => {
        console.error(evt);
      };
      //this.showCropper = true;
    }
  },
  created() {
    this.setCarousel();
    console.log("route");
    console.log("ffffffff");
    console.log(this.$route.fullPath.split("/"));
  }
};
</script>

<style scoped>
.thumbnails {
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
}

.thumbnail-image {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 2px;
}
.VueCarousel-pagination,
.VueCarousel-dot-container {
  display: none !important ;
}
.card-carousel {
  user-select: none;
  position: relative;
}
.thumbnail-image > img {
  width: 100%;
  height: auto;
  transition: all 250ms;
}
.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}

.wrapper_order_table h3 {
  color: #535559;
  font-size: 13px;
  font-weight: 400;
  margin-top: 0px;
  line-height: 17px;
}
.wrapper_order_table strong {
  color: #ff5722;
  margin-left: 2px;
}
.add_btn {
  width: 38px;
  height: 36px;
  float: left;
  background-color: #fff;
  margin-top: 2px;
  cursor: pointer;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #ff5722;
  margin-left: 2px;
  border: dashed 1px #ff5722;
}
.carousel_adevertisement {
  position: relative;
}

.big_img_add {
  width: 100%;
  height: 100%;
  background: #fff;
  margin: 20px 0px;
  top: 0;
  z-index: 9;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dashed 1px #ff5722;
}

.big_img_add i {
  color: #ff5722;
  font-size: 50px;
  cursor: pointer;
}
.badge_number {
  background-color: #ff5722;
  width: 20px;
  height: 20px;
  float: left;
  border-radius: 3px;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 12px;
  margin-right: 8px;
  line-height: 2px;
}

.prltve {
  position: relative;
}
.box_home_advertisement {
  float: left;
}
.count-down {
  position: absolute;
  top: 18px;
  right: 8px;
  padding: 8px;
  background: rgb(0 0 0 / 71%);
  border-radius: 5px;
  padding-bottom: 4px;
}
.dot_label_active {
  background: #64dd17;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  float: left;
  margin: 1px 5px 0px 0px;
}
.dot_label_inactive {
  background: #f44336;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  float: left;
  margin: 1px 5px 0px 0px;
}
.label_active {
  background: rgba(0, 0, 0, 0.55);

  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  padding-top: 8px;
}

.label_inactive {
  background: rgba(0, 0, 0, 0.55);

  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 80px;
  font-size: 12px;
  padding-top: 8px;
}

.pay_now {
  background: #ff5722;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  padding-top: 8px;
}

.wrap_count-down {
  float: left;
  margin-right: 5px;
}
.wrap_count-down h3 {
  text-align: center;
  font-size: 10px;
  color: #fff;
  margin-top: 1px;
}
.box_count-down {
  background-color: #ff5722;
  border-radius: 5px;
  width: 42px;
  height: 34px;

  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  line-height: 1px;
}

.box_home_advertisement img {
  width: 100%;
  margin-top: 10px;
  height: 136px;
}
.row_box_adver {
  margin-left: 0px;
  margin-right: -15px;
}
.addbox_advertisement {
  display: flex;
  align-items: center;
  color: #ff5722;
  justify-content: center;
  margin-top: 10px;
  height: 206px;
  border: dashed 1px #ff5722;
  float: left;
  width: 100%;
}

.addbox_advertisement i {
  cursor: pointer;
}
.addbox_right_two {
  height: 207px;
}
.addbox_row_two img {
  height: 207px;
}
@media screen and (max-width: 768px) {
  .wrapper_order_table h3 {
    color: #535559;
    font-size: 11px;
    line-height: 15px;
  }

  .tab_width h3 {
    width: 89%;
  }
  .badge_number {
    margin-bottom: 10px;
  }
  .box_home_advertisement img,
  .addbox_advertisement {
    height: 68px;
  }

  .addbox_row_two img,
  .addbox_right_two {
    height: 105px;
  }

  .wrap_count-down h3 {
    color: white;
    font-size: 8px;
  }

  .box_count-down {
    width: 36px;
    height: 21px;
    color: #fff;
    font-size: 11px;
  }
  .wrap_count-down {
    float: left;
    margin-right: 3.2px;
  }
  .count-down {
    padding: 4px;
    padding-bottom: 0px;
    top: 14px;
    right: 4px;
  }

  .label_active {
    padding: 4px 5px;
    position: absolute;
    bottom: 3px;
    right: 4px;
    font-size: 9px;
    padding-top: 5px;
  }

  .label_inactive {
    padding: 4px 5px;
    position: absolute;
    bottom: 3px;
    right: 56px;
    font-size: 9px;
    padding-top: 5px;
  }
  .pay_now {
    background: #ff5722;
    color: #fff;
    padding: 4px 5px;

    position: absolute;
    bottom: 3px;
    right: 4px;
    font-size: 9px;
    padding-top: 5px;
  }

  .dot_label_active,
  .dot_label_inactive {
    width: 6px;
    height: 6px;
    margin: 1px 4px 0px 0px;
  }
}

@media screen and (max-width: 600px) {
  .wrapper_order_table {
    padding: 10px;
  }

  .box_home_advertisement img,
  .addbox_advertisement {
    height: 135px;
  }

  .addbox_row_two img,
  .addbox_right_two {
    height: 175px;
  }

  .box_home_advertisement img {
    margin-bottom: 3px;
    margin-top: 7px;
  }
  .wrapper_order_table h3 {
  }
  .addbox_advertisement {
    margin-top: 7px;
  }

  .box_count-down {
    width: 40px;
    height: 34px;
    font-size: 12px;
  }

  .wrap_count-down h3 {
    font-size: 9px;
  }
  .wrap_count-down {
    margin-right: 5px;
  }

  .count-down {
    padding: 6px;
    top: 14px;
    right: 7px;
    padding-bottom: 4px;
  }
  .label_active {
    padding: 6px 10px;
    position: absolute;
    bottom: 10px;
    right: 7px;
    font-size: 11px;
    padding-top: 7px;
  }

  .dot_label_active,
  .dot_label_inactive {
    margin: 2px 4px 0px 0px;
  }

  .label_inactive {
    padding: 6px 10px;
    position: absolute;
    bottom: 10px;
    right: 80px;
    font-size: 11px;
    padding-top: 7px;
  }

  .pay_now {
    padding: 6px 10px;
    position: absolute;
    bottom: 10px;
    right: 7px;
    font-size: 11px;
    padding-top: 7px;
  }
}

@media screen and (max-width: 300px) {
  .wrapper_order_table h3 {
    font-size: 10px;
    line-height: 14px;
  }

  .box_home_advertisement img,
  .addbox_advertisement {
    height: 97px;
  }

  .addbox_row_two img,
  .addbox_right_two {
    height: 97px;
  }

  .box_home_advertisement img {
    margin-top: 5px;
  }

  .addbox_advertisement {
    margin-top: 5px;
  }

  .count-down {
    padding: 6px;
    top: 10px;
    right: 5px;
    padding-bottom: 4px;
  }

  .label_active {
    padding: 6px 10px;
    position: absolute;
    bottom: 8px;
    right: 5px;
    font-size: 11px;
    padding-top: 7px;
    font-size: 10px;
  }

  .box_count-down {
    width: 42px;
  }

  .label_inactive {
    bottom: 8px;
    right: 73px;
    font-size: 10px;
  }

  .pay_now {
    right: 5px;
    font-size: 10px;
    bottom: 8px;
  }

  .dot_label_active,
  .dot_label_inactive {
    margin: 1px 4px 0px 0px;
  }
  .wrap_count-down h3 {
    font-size: 9px;
  }
}
</style>
