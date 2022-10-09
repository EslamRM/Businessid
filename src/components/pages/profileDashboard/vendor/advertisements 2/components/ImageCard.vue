<template>
  <div class="wrapper">
    <div v-if="image.ads.length == 1">
      <div
        class="col-sm-6 pl-0 box_home_advertisement addbox_row_two tab_width"
      >
        <div class="badge_number fl">
          {{ image.section }}
        </div>
        <h3>
          {{ image.description }}
          <strong> Amount : AED {{ image.price }}</strong>
        </h3>
        <div class="prltve">
          <div
            class="count-down"
            v-if="
              image.ads[0].payment_status == 'Paid' &&
                startDate(image.ads[0].expiry_date) > todayDate &&
                startDate(image.ads[0].start_date) <= todayDate
            "
          >
            <Countdown
              :deadline="startDate(image.ads[0].expiry_date)"
            ></Countdown>
          </div>
          <div
            class="count-down start_message"
            v-else-if="
              image.ads[0].payment_status == 'Paid' &&
                image.ads[0].start_date.split(' ')[0] > todayDate &&
                image.ads[0].expiry_date.split(' ')[0] > todayDate
            "
          >
            Advt will start on : {{ startDate(image.ads[0].start_date) }}
          </div>
          <div
            class="action_btn_wrapper"
            v-if="startDate(image.ads[0].expiry_date) > todayDate"
          >
            <div
              class="label_inactive"
              v-if="image.ads[0].payment_status == 'Unpaid'"
            >
              <div class="dot_label_inactive"></div>
              In Active
            </div>
            <div
              class="label_active"
              v-if="image.ads[0].payment_status == 'Paid'"
            >
              <div class="dot_label_active"></div>
              Active
            </div>
            <div
              @click="payNow(image.ads[0])"
              class="pay_now"
              v-if="image.ads[0].payment_status == 'Unpaid'"
            >
              Pay Now
            </div>
            <div @click="cancel_adds(image.ads[0].id)" class="cancel_adds">
              Cancel ads
            </div>
          </div>
          <div v-else class="action_btn_wrapper">
            <div @click="cancel_adds(image.ads[0].id)" class="cancel_adds">
              Cancel ads
            </div>
            <div class="cancel_adds">
              Expired
            </div>
            <div @click="payNow(mage.ads[0])" class="pay_now">
              Renew Now
            </div>
          </div>
          <img :src="image.ads[0].file" />
        </div>
      </div>
      <div
        class="col-sm-6 pl-0 box_home_advertisement addbox_row_two tab_width"
        @click="toggleCropper(height, width)"
      >
        <h3>
          {{ image.description }}
          <strong> Amount : AED {{ image.price }}</strong>
        </h3>

        <div class="addbox_advertisement">
          <i data-v-72e9c9bd="" class="material-icons">add</i>
        </div>
      </div>
    </div>
    <div v-else-if="image.ads.length >= 2">
      <div
        class="col-sm-6 pl-0 box_home_advertisement addbox_row_two tab_width"
      >
        <div class="badge_number fl">
          {{ image.section }}
        </div>

        <h3>
          {{ image.description }}
          <strong> Amount : AED {{ image.price }}</strong>
        </h3>
        <div class="prltve">
          <div
            class="count-down"
            v-if="
              image.ads[0].payment_status == 'Paid' &&
                startDate(image.ads[0].expiry_date) > todayDate &&
                startDate(image.ads[0].start_date) <= todayDate
            "
          >
            <Countdown
              :deadline="startDate(image.ads[0].expiry_date)"
            ></Countdown>
          </div>
          <div
            class="count-down start_message"
            v-else-if="
              image.ads[0].payment_status == 'Paid' &&
                image.ads[0].start_date.split(' ')[0] > todayDate &&
                image.ads[0].expiry_date.split(' ')[0] > todayDate
            "
          >
            Advt will start on : {{ startDate(image.ads[0].start_date) }}
          </div>
          <div
            class="action_btn_wrapper"
            v-if="startDate(image.ads[0].expiry_date) > todayDate"
          >
            <div
              class="label_inactive"
              v-if="image.ads[0].payment_status == 'Unpaid'"
            >
              <div class="dot_label_inactive"></div>
              In Active
            </div>
            <div
              class="label_active"
              v-if="image.ads[0].payment_status == 'Paid'"
            >
              <div class="dot_label_active"></div>
              Active
            </div>
            <div
              @click="payNow(image.ads[0])"
              class="pay_now"
              v-if="image.ads[0].payment_status == 'Unpaid'"
            >
              Pay Now
            </div>
            <div @click="cancel_adds(image.ads[0].id)" class="cancel_adds">
              Cancel ads
            </div>
          </div>
          <div v-else class="action_btn_wrapper">
            <div @click="cancel_adds(image.ads[0].id)" class="cancel_adds">
              Cancel ads
            </div>
            <div class="cancel_adds">
              Expired
            </div>
            <div @click="payNow(image.ads[0])" class="pay_now">
              Renew
            </div>
          </div>

          <img :src="image.ads[0].file" />
        </div>
      </div>
      <div
        class="col-sm-6 pl-0 box_home_advertisement addbox_row_two tab_width"
      >
        <h3>
          {{ image.description }}
          <strong> Amount : AED {{ image.price }}</strong>
        </h3>

        <div class="prltve">
          <div
            class="count-down"
            v-if="
              image.ads[1].payment_status == 'Paid' &&
                startDate(image.ads[1].expiry_date) > todayDate &&
                startDate(image.ads[1].start_date) <= todayDate
            "
          >
            <Countdown
              :deadline="startDate(image.ads[1].expiry_date)"
            ></Countdown>
          </div>
          <div
            class="count-down start_message"
            v-else-if="
              image.ads[1].payment_status == 'Paid' &&
                image.ads[1].start_date.split(' ')[0] > todayDate &&
                image.ads[1].expiry_date.split(' ')[0] > todayDate
            "
          >
            Advt will start on : {{ startDate(image.ads[1].start_date) }}
          </div>
          <div
            class="action_btn_wrapper"
            v-if="startDate(image.ads[1].expiry_date) > todayDate"
          >
            <div
              class="label_inactive"
              v-if="image.ads[1].payment_status == 'Unpaid'"
            >
              <div class="dot_label_inactive"></div>
              In Active
            </div>
            <div
              class="label_active"
              v-if="image.ads[1].payment_status == 'Paid'"
            >
              <div class="dot_label_active"></div>
              Active
            </div>
            <div
              @click="payNow(image.ads[1])"
              class="pay_now"
              v-if="image.ads[1].payment_status == 'Unpaid'"
            >
              Pay Now
            </div>

            <div @click="cancel_adds(image.ads[1].id)" class="cancel_adds">
              Cancel ads
            </div>
          </div>
          <div v-else class="action_btn_wrapper">
            <div @click="cancel_adds(image.ads[1].id)" class="cancel_adds">
              Cancel ads
            </div>
            <div class="cancel_adds">
              Expired
            </div>
            <div @click="payNow(image.ads[1])" class="pay_now">
              Renew
            </div>
          </div>
          <img :src="image.ads[1].file" />
        </div>
      </div>
    </div>
    <div v-else-if="image.ads.length == 0">
      <div
        class="col-sm-6 pl-0 box_home_advertisement addbox_row_two tab_width"
        @click="toggleCropper(height, width)"
      >
        <div class="badge_number fl">
          {{ image.section }}
        </div>
        <h3>
          {{ image.description }}
          <strong> Amount : AED {{ image.price }}</strong>
        </h3>
        <div class="addbox_advertisement">
          <i data-v-72e9c9bd="" class="material-icons">add</i>
        </div>
      </div>
      <div
        class="col-sm-6 pl-0 box_home_advertisement addbox_row_two tab_width"
        @click="toggleCropper(height, width)"
      >
        <h3>
          {{ image.description }}
          <strong> Amount : AED {{ image.price }}</strong>
        </h3>
        <div class="addbox_advertisement">
          <i data-v-72e9c9bd="" class="material-icons">add</i>
        </div>
      </div>
    </div>
    <!--<div
      class="col-sm-6 pl-0 box_home_advertisement addbox_row_two tab_width"
      v-if="image.ads.length >= 2"
    >
      <div class="count-down">
        <Countdown :deadline="startDate(image.ads[1].expiry_date)"></Countdown>
      </div>

      <div
        class="label_inactive"
        v-if="imagea.ads[1].payment_status == 'Unpaid'"
      >
        <div class="dot_label_inactive"></div>
        In Active
      </div>
      <div class="label_inactive" v-if="image.ads[1].payment_status == 'Paid'">
        <div class="dot_label_inactive"></div>
        In Active
      </div>
      <div
        @click="payNow(image.ads[1])"
        class="pay_now"
        v-if="image[1].payment_status == 'Unpaid'"
      >
        Pay Now
      </div>

      <img :src="image.ads[1].file" />
    </div>-->
  </div>
</template>

<script>
import Countdown from "vuejs-countdown";
import moment from "moment";
export default {
  data() {
    return {
      images: {
        size: ""
      }
    };
  },
  props: ["image", "type", "height", "width"],
  components: { Countdown },
  computed: {
    startDate() {
      return date => date.split(" ")[0];
    },
    todayDate() {
      return moment().format("YYYY-MM-DD");
    }
  },
  methods: {
    checkFileSize() {
      let file = this.$refs.myFile.files[0];
      console.log("file", file);
      if (!file || file.type.indexOf("image/") !== 0) return;
    },
    toggleCropper(ht, wd) {
      this.$emit("EmitCropperPopUp", {
        height: this.height,
        width: this.width
      });
    },
    payNow(image) {
      window.location.href =
        process.env.BASE_URL + "ads/payment-preview?token=" + image.token;
    },
    cancel_adds(id) {
      const data = {
        banner_id: id
      };
      this.$swal({
        title: "Delete this adds?",
        text: "Are you sure? You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!"
      }).then(result => {
        // <--
        if (result.value) {
          // <-- if confirmed
          this.$store.dispatch("DELETE_BANNER_ADDS", data);
          this.$store.dispatch("DELETE_BANNER_ADDS", data).then(() => {
            const route = this.$route.fullPath.split("/");

            route[4] == "ds-market"
              ? (window.location.href =
                  "/dashboard/vendor/advertisements/ds-market")
              : (window.location.href = "/dashboard/vendor/advertisements");
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.expired_adds {
  position: absolute;
}
.expired_adds {
  position: absolute;
}
.action_btn_wrapper {
  position: absolute;
  bottom: 10px;
  right: 0;
  display: flex;
}
.cancel_adds {
  margin: 0 8px;
  background: rgb(220 0 0);
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
  bottom: 8px;
  right: 85px;
  font-size: 12px;
  padding-top: 8px;
}
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
  margin: 0 8px;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  padding-top: 8px;
}

.label_inactive {
  background: rgba(0, 0, 0, 0.55);
  margin: 0 8px;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  bottom: 8px;
  right: 80px;
  font-size: 12px;
  padding-top: 8px;
}

.pay_now {
  margin: 0 8px;
  background: #ff5722;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
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
  height: 190px;
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
  height: 190px;
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
