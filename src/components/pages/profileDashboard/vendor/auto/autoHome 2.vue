<template>
  <div>
    <div class="tp-1-txt align_heading">
      Please choose a category for your product
    </div>

    <div class="row_grid_mob">
      <div class="grd-tp-bx-1 col-sm-12 col-md-12 col-xl-6 p-0">
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Cars'
            }
          }"
          class="lnk-tp-lst-1"
        >
          <div class="lnk-tp-lst-1-bx">
            <figure>
              <img src="@/assets/images/icon/car_auto.png" class="car" />
            </figure>
            <span class="lnk-txt-1">Cars</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Accessories And Spare Parts'
            }
          }"
          class="lnk-tp-lst-1"
        >
          <div class="lnk-tp-lst-1-bx ">
            <figure>
              <img src="@/assets/images/icon/parts_auto.png" class="parts" />
            </figure>
            <span class=" lnk-txt-1">Accessories & Parts</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Boats'
            }
          }"
          class="lnk-tp-lst-1 arrange_mob"
        >
          <div class="lnk-tp-lst-1-bx">
            <figure>
              <img src="@/assets/images/icon/boat_auto.png" class="boat" />
            </figure>
            <span class="lnk-txt-1">Boats</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Heavy Vehicles'
            }
          }"
          class="lnk-tp-lst-1 router-link-active"
        >
          <div class="lnk-tp-lst-1-bx">
            <figure>
              <img src="@/assets/images/icon/truck_auto.png" class="truck" />
            </figure>
            <span class="lnk-txt-1">Heavy Vehicles</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Motorcycles'
            }
          }"
          class="lnk-tp-lst-1 arrange_foodbox router-link-active"
        >
          <div class="lnk-tp-lst-1-bx">
            <figure>
              <img src="@/assets/images/icon/motor_auto.png" class="motor" />
            </figure>
            <span class="lnk-txt-1">Motorcycles</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Number Plates'
            }
          }"
          class="lnk-tp-lst-1 arrange_foodbox router-link-active"
        >
          <div class="lnk-tp-lst-1-bx ">
            <figure>
              <img src="@/assets/images/icon/plate_auto.png" class="plate" />
            </figure>
            <span class=" lnk-txt-1">Number Plates</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";

export default {
  name: "AutoHome",
  data() {
    return {
      categories: [],
      breadcrumbs: [
        {
          title: this.demandOrSupplyPrefix() + " New Items",
          link: "/dashboard/vendor/addnewitems"
        },
        {
          title: this.$route.query.market_type,
          link:
            "/dashboard/vendor/add?market_type=" + this.$route.query.market_type
        },
        {
          title: this.demandOrSupplyPrefix() + " Autos",
          link:
            "/dashboard/vendor/auto?market_type=" +
            this.$route.query.market_type
        }
      ]
    };
  },
  components: {
    breadcrumbs
  },
  created() {
    this.getAutoTypes("api_auto_types", {}, "categories");
  },
  methods: {
    async getAutoTypes(url, data, property) {
      try {
        const response = await axios.post(url, data);
        const result = await response.data.result;
        this[property] = await result;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
<style scoped>
.prof-dash-bord-bx {
  align-items: baseline !important;
}
.grd-tp-bx-1 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
}
.lnk-tp-lst-1 {
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 143px;
  height: 143px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  margin-left: 15px;
  margin-bottom: 15px;
  align-items: center;
  text-align: center;
  justify-content: center;
  transition: 0.3s;
}
.lnk-tp-lst-1:nth-child(3n + 4),
.lnk-tp-lst-1:first-child {
  margin-left: 0;
}
.lnk-tp-lst-1-bx {
  margin: 0 auto;
}
.lnk-tp-lst-1:hover {
  box-shadow: 0 4px 12px 0 rgba(255, 87, 34, 0.6);
}
.lnk-tp-lst-1-icn {
  font-size: 45px;
  color: #ff5722 !important;
}
.lnk-txt-1 {
  font-size: 14px;
  font-weight: 600;
  margin-top: 6px;
  line-height: 18px;
}
.align_heading {
  text-align: center;
  margin-bottom: 2em;
}
.align_text {
  text-align: center;
}

.car {
  height: 25px;
}

.parts {
  height: 30px;
}

.boat {
  height: 27.5px;
}

.truck {
  height: 28px;
}

.motor {
  height: 28px;
}

.plate {
  height: 24.5px;
}

.lnk-tp-lst-1-bx img {
  margin-bottom: 10px;
}

@media screen and (max-width: 768px) {
  .align_heading {
    text-align: center;
    font-size: 18px;
  }
  .align_text {
    text-align: center;
    font-size: 14px;
  }

  .tp-2-txt {
    margin-bottom: 2em;
  }

  .lnk-tp-lst-1-icn {
    font-size: 40px;
  }

  .lnk-txt-1 {
    font-size: 12px;
  }

  .car {
    height: 20px;
  }

  .parts {
    height: 25px;
  }

  .boat {
    height: 22.5px;
  }

  .truck {
    height: 23px;
  }

  .motor {
    height: 23px;
  }

  .plate {
    height: 19.5px;
  }

  .lnk-tp-lst-1-bx img {
    margin-bottom: 8px;
  }
}

@media screen and (max-width: 600px) {
  .align_heading {
    text-align: center;
    font-size: 14px;
  }
  .align_text {
    text-align: center;
    font-size: 12px;
  }
  .lnk-tp-lst-1-icn {
    font-size: 34px;
  }
  .lnk-tp-lst-1 {
    width: 115px;
    height: 115px;
    margin-right: 10px;
    float: left;
  }

  .lnk-txt-1 {
    font-size: 12px;
  }
  .arrange_mob {
    margin-left: 0px;
  }

  .row_grid_mob {
    margin-right: -15px;
  }

  .grd-tp-bx-1 {
    display: block !important;
  }
  .lnk-tp-lst-1 {
    margin-left: 0px;
  }

  .arrange_foodbox {
    margin-left: 0px;
  }
  .tp-2-txt {
    margin-bottom: 2em;
  }

  .car {
    height: 17px;
  }

  .parts {
    height: 22px;
  }

  .boat {
    height: 19.25px;
  }

  .truck {
    height: 20px;
  }

  .motor {
    height: 20px;
  }

  .plate {
    height: 16.5px;
  }

  .lnk-tp-lst-1-bx img {
    margin-bottom: 8px;
  }
}
@media screen and (max-width: 420px) and (min-width: 400px) {
  .lnk-tp-lst-1 {
    width: 125px;
    height: 125px;
    margin-right: 15px;
  }

  .row_grid_mob {
    margin-right: -25px;
  }
}

@media screen and (max-width: 360px) {
  .lnk-tp-lst-1 {
    width: 109px;
    height: 109px;
    margin-right: 12px;
  }

  .row_grid_mob {
    margin-right: -15px;
  }
}

@media screen and (max-width: 300px) {
  .lnk-tp-lst-1 {
    width: 86px;
    height: 86px;
    margin: 6px 6px 0px 0px;
    border-radius: 3px;
  }

  .row_grid_mob {
    margin-right: -15px;
  }

  .lnk-txt-1 {
    font-size: 11px;
    line-height: 12px;
  }

  .tp-2-txt {
    margin-bottom: 1.5em;
    font-size: 10px;
    line-height: 16px;
  }

  .tp-1-txt {
    margin-bottom: 6px;
  }

  .lnk-tp-lst-1-icn {
    font-size: 26px;
  }
  .align_heading {
    font-size: 12px;
  }

  .car {
    height: 15px;
  }

  .parts {
    height: 20px;
  }

  .boat {
    height: 17.25px;
  }

  .truck {
    height: 18px;
  }

  .motor {
    height: 18px;
  }

  .plate {
    height: 14.5px;
  }
}
</style>
