<template>
  <div>
    <div
      class="md-layout md-gutter md-alignment-center-space-between"
     
    >
      <div class="md-layout-item">
        <h2 class="new-page">Please choose a category for your product</h2>
      </div>
      <breadcrumbs :items="breadcrumbs"></breadcrumbs>
    </div>

    <div class="autoHome">
      <div class="add-cat-list-hero">
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Cars',
            },
          }"
          class="link"
        >
          <div class="cat-box">
            <figure>
              <img src="@/assets/images/icon/car.png" />
            </figure>
            <span>Cars</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Accessories And Spare Parts',
            },
          }"
          class="link"
        >
          <div class="cat-box">
            <figure>
              <img src="@/assets/images/icon/parts1.png" class="parts" />
            </figure>
            <span>Accessories & Parts</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Boats',
            },
          }"
          class="link"
        >
          <div class="cat-box">
            <figure>
              <img src="@/assets/images/icon/boat.png" class="boat" />
            </figure>
            <span>Boats</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Heavy Vehicles',
            },
          }"
          class="link"
        >
          <div class="cat-box">
            <figure>
              <img src="@/assets/images/icon/truck.png" class="truck" />
            </figure>
            <span>Heavy Vehicles</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Motorcycles',
            },
          }"
          class="link"
        >
          <div class="cat-box">
            <figure>
              <img src="@/assets/images/icon/motor.png" class="truck" />
            </figure>
            <span>Motorcycles</span>
          </div>
        </router-link>
        <router-link
          exact
          :to="{
            name: 'addAuto',
            query: {
              market_type: $route.query.market_type,
              category: 'Number Plates',
            },
          }"
          class="link"
        >
          <div class="cat-box">
            <figure>
              <img src="@/assets/images/icon/plate.png" class="plate" />
            </figure>
            <span>Number Plates</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios"
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";

export default {
  name: "AutoHome",
  data () {
    return {
      categories: [],
      breadcrumbs: [
        {
          title: this.demandOrSupplyPrefix() + " New Items",
          link: "/dashboard/vendor/addnewitems"
        },
        {
          title: this.$route.query.market_type,
          link: "/dashboard/vendor/add?market_type=" + this.$route.query.market_type,
        },
        {
          title: this.demandOrSupplyPrefix() + " Autos",
          link: "/dashboard/vendor/auto?market_type=" + this.$route.query.market_type
        },

      ]
    }
  },
  components: {
    breadcrumbs
  },
  created () {
    this.getAutoTypes("api_auto_types", {}, "categories");
  },
  methods: {
    async getAutoTypes (url, data, property) {
      try {
        const response = await axios.post(url, data);
        const result = await response.data.result;
        this[property] = await result;
      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
<style scoped>
.new-page {
  font-size: 18px;
  font-weight: 300;

  display: block;
}
.upper {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.add-cat-list-hero .cat-box figure {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  position: absolute;
  background-color: rgba(255, 87, 34, 1);
  vertical-align: middle;
  top: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease-in-out 0.3s;
}
.add-cat-list-hero .cat-box figure img {
  height: 15px;
}
.add-cat-list-hero .cat-box span {
  align-self: center;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #191919;
  margin-top: 25px;
}
.parts {
  height: 20px !important;
}
.boat {
  height: 17.5px !important;
}
.truck {
  height: 18px !important;
}
.plate {
  height: 14.5px !important;
}
.autoHome {
  display: flex;
  max-width: 601px;
  margin: 0 auto;
  width: 100%;
}
.md-layout.md-gutter.md-alignment-center-space-between{margin: 2em 0px}

@media screen and (max-width: 768px) {
.new-page {
    font-size: 14px; font-weight: 500;}

.md-alignment-center-space-between .md-layout-item{ width: 100%; min-width: 100%;}

.md-layout.md-gutter.md-alignment-center-space-between{margin: 10px -10px; }

.add-cat-list-hero .cat-box span{ font-size: 13px;     font-weight: 400;}


}

@media screen and (max-width: 600px) {


.new-page{
    font-size: 12px;
    font-weight: 500;
    margin-left: 5px;
}


.add-cat-list-hero {
    column-gap: 10px;
    margin-top: 2em;
}

.add-cat-list-hero .cat-box span {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: #191919;
    margin-top: 24px;
    text-align: center;
    line-height: 14px;
}

.add-cat-list-hero .cat-box{height: 65px;}

.md-layout.md-gutter.md-alignment-center-space-between {
   
    margin-top: 0px;
}



}

@media screen and (max-width: 300px) {

.add-cat-list-hero {
    column-gap: 5px;
    margin-top: 2em;
}

.add-cat-list-hero .cat-box {
    height: 60px;
}

.md-layout.md-gutter.md-alignment-center-space-between {
    margin: 10px -10px;
    margin-top: -2px;
}

.new-page{
    font-size: 11px;
}

.add-cat-list-hero .cat-box figure {
    width: 40px;
    height: 40px;}

.add-cat-list-hero .cat-box figure img{
    height: 12px;
}

.parts{
    height: 16px !important;
}
img.boat{ height: 13px !important;}

.truck {
    height: 13px !important;
}

.plate{
    height: 11.5px !important;
}
.add-cat-list-hero .cat-box span {
    margin-top: 19px;
 
}



}

</style>
