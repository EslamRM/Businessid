<template>
  <div class="wrapper">
    <div class="prltve">
      <div class="outer-wrapper">
        <div
          class="count-down"
          v-if="
            image.payment_status == 'Paid' &&
              image.expiry_date.split(' ')[0] > todayDate &&
              image.start_date.split(' ')[0] <= todayDate
          "
        >
          <Countdown :deadline="image.expiry_date.split(' ')[0]"></Countdown>
        </div>
        <div
          class="count-down start_message"
          v-else-if="
            image.payment_status == 'Paid' &&
              image.start_date.split(' ')[0] > todayDate &&
              image.expiry_date.split(' ')[0] > todayDate
          "
        >
          Advt will start on : {{ startDate(image.start_date) }}
        </div>
      </div>

      <div
        class="action_btn_wrapper"
        v-if="image.expiry_date.split(' ')[0] > todayDate"
      >
        <div class="label_inactive" v-if="image.payment_status == 'Unpaid'">
          <div class="dot_label_inactive"></div>
          In Active
        </div>
        <div class="label_active" v-if="image.payment_status == 'Paid'">
          <div class="dot_label_active"></div>

          Active
        </div>
        <div
          @click="payNow(image)"
          class="pay_now"
          v-if="image.payment_status == 'Unpaid'"
        >
          Pay Now
        </div>

        <div @click="cancel_adds(image.id)" class="cancel_adds">
          Cancel ads
        </div>
      </div>
      <div v-else class="action_btn_wrapper">
        <div class="cancel_adds">
          Expired
        </div>
        <div @click="cancel_adds(image.id)" class="cancel_adds">
          Cancel ads
        </div>
        <div @click="payNow(image)" class="pay_now">
          Renew
        </div>
      </div>
      <img :src="image.file" />
    </div>
  </div>
</template>
<script>
import Countdown from "vuejs-countdown";
import moment from "moment";

export default {
  props: ["image"],
  components: { Countdown },
  data() {
    return {};
  },
  computed: {
    startDate() {
      return date => moment(date).format("MMMM D, YYYY");
    },
    todayDate() {
      return moment().format("YYYY-MM-DD");
    }
  },
  methods: {
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
          this.$store.dispatch("DELETE_BANNER_ADDS", data).then(() => {
            const route = this.$route.fullPath.split("/");

            route[3] == "advertisements"
              ? (window.location.href = "/dashboard/vendor/advertisements")
              : (window.location.href =
                  "/dashboard/vendor/advertisements/ds-market");
          });
        }
      });
    }
  },
  created() {
    console.log(new Date().toISOString().slice(0, 10));
  }
};
</script>

<style scoped>
.start_message {
  color: #fff;
  font-weight: 700;
  text-transform: capitalize;
}
.action_btn_wrapper {
  position: absolute;
  bottom: 10px;
  right: 0;
  display: flex;
}
.wrapper {
  position: relative;
}
.outer-wrapper {
  position: absolute;
  right: 0;
}
.dot_label_active {
  background: #64dd17;
  margin: 0 7px;
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
  margin: 0 10px;
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
  margin: 0 7px;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  bottom: 8px;
  right: 80px;
  font-size: 12px;
  z-index: 2000;
  padding-top: 8px;
}
.cancel_adds {
  margin: 0 7px;
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
.cover-slider {
  background: none;
}
.pay_now {
  background: #ff5722;
  margin: 0 7px;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  cursor: pointer;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  padding-top: 8px;
  z-index: 2000;
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
  position: relative;
  top: 8px;
  right: 8px;
  padding: 8px;
  background: rgb(0 0 0 / 71%);
  border-radius: 5px;
  padding-bottom: 4px;
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
