<template>
  <div class="wrapper_price_card">
    <h1 class="col-sm-12 p-0">Choose Any One Pack</h1>
    <div class="row_price_box md-layout md-gutter">

      <div
        class="md-layout-item md-size-50 md-small-size-50 md-alignment-top-center fl padding_price"
        v-for="(pack,id) in packages"
        :key="id"
        @click="packSelected(pack)"
      >
        <div
          class=" wrapper_price "
          :class="{'active': value ? id==value : id=='0'}"
        >
          <div class="header_price"> {{pack.period}} </div>
          <h2></h2>
          <h3>{{currency(pack.amount, pack.currency)}} </h3>

          <div class="col-sm-12 fl width_mob_card">
            <div class="box_feature">
              <img src="./tick.png" />
              <span> {{pack.period}} activation. </span>
            </div>
            <div class="col-sm-12 border_price"></div>
          </div>
          <div
            class="col-sm-12 fl width_mob_card"
            v-for="(desc,index) in pack.description"
            :key="index"
          >
            <div class="box_feature">
              <img src="./tick.png" />
              <span> {{desc}} </span>
            </div>
            <div class="col-sm-12 border_price"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import utils from "@/helpers/utils.js"
export default {
  name: "packages",
  mixins: [utils],
  props: ["value", "packages"],

  methods: {
    async packSelected (pack) {
      const { value: Reasons } = await this.$swal.fire({
        timer: 20000,
        timerProgressBar: true,
        title: `You have selected ${pack.period} pack. Do you want to proceed ?`,
        cancelButtonColor: "#d2d2d2",
        confirmButtonColor: "#64dd17",
        confirmButtonText: "Proceed",
        cancelButtonText: "Stay Here",
        showCancelButton: true,
        allowOutsideClick: () => !this.$swal.isLoading()
      })

      if (Reasons) {
        this.$emit('input', pack.id)
      }
      console.log(`Pack ${pack.period} selected with id: ${pack.id}`)
    }
  },
  created () {

  }
}
</script>
<style scoped>
/* Abhishek Edit */
.row_price_box .md-layout-item {
  margin-bottom: 12px;
}
.width_mob_card {
  padding: 0px 15px 15px;
}
.wrapper_price_card {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  margin: auto;
  padding: 25px;
  margin-bottom: 20px;
  margin-top: 20px;
  overflow: hidden;
}

.wrapper_price_card h1 {
  color: #343434;
  font-size: 17px;
  margin-bottom: 25px;
  text-align: center;
}

.wrapper_price_card h3 {
  color: #223b64;
  font-size: 15px;
  margin-bottom: 0px;
  text-align: center;
}

.wrapper_price_card h3 a {
  text-decoration: none;
  color: #223b64;
}

.wrapper_price_card h3 a:hover {
  color: #223b64;
  opacity: 0.9;
}

.wrapper_price {
  float: left;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  background-color: #fff;
  border-radius: 10px;
  padding-bottom: 25px;
  text-align: center;

  padding: 0px !important;
}

.header_price {
  background-color: #f3f3f4;
  /* color: #fff; */
  color: rgba(0, 0, 0, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 10px 10px 0px 0px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
}

.wrapper_price h2 {
  color: #535559;
  font-size: 15px;
  font-weight: 600;
  margin: 15px 0px 15px 0px;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.wrapper_price h3 {
  font-size: 16px;
  color: #ff5722;
  margin-bottom: 20px;
}

.box_feature {
  display: flex;
  align-items: center;
  justify-content: center;
}

.box_feature img {
  float: left;
  width: 12px;
  margin: 2px 3px 0px 0px;
}

.box_feature span {
  color: #4c98d1;
  font-size: 13px;
}

.border_price {
  height: 1px;
  background-color: #e0e0e0;
  margin: auto;
  width: 90%;
  margin-top: 8px;
  margin-bottom: 8px;
}

.total_border {
  height: 1px;
  background-color: #e0e0e0;
  margin: auto;
  width: 100%;
  margin-top: 25px;
  margin-bottom: 8px;
}

.padding_price {
  padding-left: 5px;
  padding-right: 5px;
}

.row_price_box {
  margin-left: -5px;
  margin-right: -5px;
}

.box_bill span {
  font-size: 13px;
  color: #717171;
  margin: 12px 0 0;
}

.box_bill strong {
  font-size: 13px;
  color: #343434;
  margin: 12px 0 0;
}

.wrapper_price {
  transition: all 0.5s ease-in-out;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
}

.active .header_price {
  background-color: #223b64;
  border: solid 1px #223b64;
  color: #ffffff;
}
.wrapper_price:hover {
  -ms-transform: scale(1.02);
  /* IE 9 */
  transform: scale(1.02);
  -moz-transform: scale(1.02);
}

.wrapper_price:hover .header_price {
  background-color: #223b64;
  border: solid 1px #223b64;
  color: white;
}

.logo {
  width: 135px;
  text-align: center;
  margin-top: 25px;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
}

.border_logo {
  height: 1px;
  background-color: #e0e0e0;
  margin: auto;
  margin-top: 25px;
  margin-bottom: 8px;
}

.container_mob {
  text-align: center;
}

@media screen and (max-width: 768px) {
  .logo {
    width: 130px;
  }

  .wrapper_price_card {
    padding: 20px;
  }

  .header_price {
    height: 55px;
    font-size: 15px;
  }

  .wrapper_price h2 {
    font-size: 14px;
    margin: 13px 0px 13px 0px;
  }

  .wrapper_price h3 {
    font-size: 15px;
    margin-bottom: 15px;
  }
}

@media screen and (max-width: 600px) {
  .border_logo {
    margin-top: 15px;
  }

  .logo {
    width: 105px;
    margin-top: 15px;
  }

  .width_mob_card {
    width: 100%;
  }

  .pzero_mob {
    padding: 0px;
  }

  .wrapper_price_card {
    padding: 8px;
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .wrapper_total h2 {
    font-size: 11px;
    margin: 4px 0px;
    width: 60%;
  }

  .wrapper_total span {
    font-size: 11px;
  }

  .text_total {
    font-size: 12px !important;
  }

  .box_bill {
    width: 100%;
  }

  .header_price {
    height: 40px;
    font-size: 13px;
  }

  .wrapper_price_card h1 {
    font-size: 14px;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .wrapper_price {
    margin-top: 10px;
  }

  .wrapper_price h2 {
    font-size: 13px;
    margin: 10px 0px 10px 0px;
  }

  .wrapper_price h3 {
    font-size: 13px;
    margin-bottom: 10px;
  }

  .box_feature span {
    font-size: 12px;
  }

  .border_price {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .wrapper_price {
    padding-bottom: 18px;
  }

  .box_bill span {
    font-size: 12px;
  }

  .box_bill strong {
    font-size: 12px;
  }

  .mb_mob {
    margin-bottom: 3px !important;
    font-size: 13px !important;
  }

  .total_border {
    margin-top: 20px;
    margin-bottom: 3px;
  }
}

@media screen and (max-width: 300px) {
  .mb_mob {
    font-size: 12px !important;
  }

  .wrapper_price_card h1 {
    font-size: 13px;
  }

  .header_price {
    height: 35px;
    font-size: 12px;
  }

  .box_feature span {
    font-size: 11px;
  }

  .box_feature img {
    margin: 2px 3px 0px 0px;
  }

  .wrapper_price h2 {
    font-size: 12px;
  }

  .wrapper_price h3 {
    font-size: 12px;
  }

  .wrapper_price_card {
    margin-top: 6px;
    margin-bottom: 6px;
  }

  .logo {
    width: 95px;
    margin-top: 10px;
  }

  .border_logo {
    margin-top: 10px;
  }
}
</style>