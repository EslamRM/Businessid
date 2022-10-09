<template>
  <div>
    <div class="tp-1-txt align_heading">
      Please choose a category for your property
    </div>
    <router-view></router-view>
    <!-- Main Category -->
    <div class="row_grid_mob">
      <div class="grd-tp-bx-1 col-sm-12 col-md-12 col-xl-6 p-0">
        <a
          @click="property_purpose($event, 1)"
          v-model="filters.property_purpose"
          value="property for sale"
          class="lnk-tp-lst-1"
        >
          <div class="lnk-tp-lst-1-bx">
            <figure>
              <i
                class="material-icons"
                style="color: #ff6231;
                    font-size: 45px;"
                >house</i
              >
            </figure>
            <span class="lnk-txt-1">Property for Sale</span>
          </div>
        </a>
        <a
          @click="property_purpose($event, 2)"
          v-model="filters.property_purpose"
          value="property for rent"
          class="lnk-tp-lst-1"
        >
          <div class="lnk-tp-lst-1-bx ">
            <figure>
              <i
                class="material-icons"
                style="color: #ff6231;
                    font-size:45px;"
                >apartment</i
              >
            </figure>
            <span class=" lnk-txt-1">Property for Rent</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";

export default {
  name: "propertyCategory",
  data() {
    return {
      filters: {
        property_purpose: "property for rent",
        property_category_id: "",
        property_purpose_id: "",
        property_category: "",
        property_type: "",
      },
      categories: [],
      secondLevel: [],
      thirdLevel: [],
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
    this.loadurlData();
    this.getPropertyType();
    this.getCountry();
    this.loadMore();
    this.getCity("city", 1);
    this.fetchAndAssign("api_country", {}, "currencies");
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
    },
    property_purpose(event, id) {
      this.filters.property_purpose_id = id.toString();
      this.filters.property_category = "";
      if (event == null) {
        this.filters.property_purpose = "";
        this.filters.property_purpose_id = "";
        this.filters.property_category = "";
        this.filters.property_category_id = "";
        this.filters.property_type = "";
        this.isRent = false;
        this.isSale = false;
        this.thirdLevel = false;
      }
      if (
        this.filters.property_purpose == null ||
        this.filters.property_purpose == ""
      ) {
        this.filters.property_purpose = "";
        this.filters.property_purpose_id = "";
        this.thirdLevel = [];
      }
      if (
        this.filters.property_category == null ||
        this.filters.property_category == ""
      ) {
        this.filters.property_category = "";
        this.filters.property_category_id = "";
        this.thirdLevel = [];
      }
      if (this.filters.property_purpose != null) {
        if (this.filters.property_purpose_id == 2) {
          this.showFirst = false;
          this.showSecond = true;
          this.getSecondLevelSale(id);
          this.$router.push({
            path:"/dashboard/vendor/add-new-property/property-category",
            query: { purpose: "property for rent", purpose_id: 2 }
          });
        } else if (this.filters.property_purpose_id == 1) {
          this.showFirst = false;
          this.showSecond = true;
          this.getSecondLevelSale(id);
          this.$router.push({
            path:"/dashboard/vendor/add-new-property/property-category",
            query: { purpose: "property for sale", purpose_id: 1 }
          });
        }
      } else {
        this.showSecond = false;
      }
    },
    getPropertyType() {
      this.$store
        .dispatch("propertyCategories")
        .then(response => (this.categories = response.result))
        .catch(error => console.log(error));
    },
    getSecondLevelSale(id) {
      this.$store
        .dispatch("propertyCategories", id)
        .then(response => (this.secondLevel = response.result))
        .catch(error => console.log(error));
    },
    getThirdLevel(id) {
      this.$store
        .dispatch("propertyCategories", id)
        .then(response => (this.thirdLevel = response.result))
        .catch(error => console.log(error));
    },
    loadMore() {
      this.filters.page++;
      console.log("loadmore");
      this.showImage = false;
      this.showLoader = true;
      this.busy = true;
      if (this.$route.params.id) {
        const id = this.$route.params.id;
        this.filters.profileid = id;
      }
      this.$store
        .dispatch("LoadProperties", this.filters)
        .then(response => {
          this.showLoader = false;
          if (response.success) {
            this.busy = false;
          } else if (response.success == false && this.filters.page == 1) {
            this.showImage = true;
          }
        })

        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    },
    loadurlData() {
      Object.keys(this.$route.query).forEach(key => {
        if (Object.keys(this.filters).includes(key)) {
          let query = this.$route.query[key];
          this.filters[key] = query;
          if (key == "offer_sort") {
            this.sort = "o" + query;
          }
          if (key == "price_sort") {
            this.sort = "p" + query;
          }
          if (key == "property_category_id") {
            this.getThirdLevel(query);
          }
          switch (key) {
            case "country_id":
              this.getCity("city", query);

              break;
            case "city_id":
              this.getCity("area", query);

              break;

            default:
              break;
          }
        }
      });
      if (this.$route.query.property_purpose) {
        if (this.$route.query.property_purpose == "property for rent") {
          this.isRent = true;
          this.getSecondLevelSale("2");
        } else if (this.$route.query.property_purpose == "property for sale") {
          if (this.$route.query.property_purpose_id) {
            this.isSale = true;
            this.getSecondLevelSale(this.$route.query.property_purpose_id);
          }
        }
      } else {
        this.isRent = true;
        this.getSecondLevelSale("2");
      }
    },
    async fetchAndAssign(url, data, property) {
      try {
        const response = await axios.post(url, data);
        const result = await response.data.result;

        if (!property) {
          return response.data;
        }
        this[property] = await result;
        return true;
      } catch (error) {
        console.log(`${error} in ${url}`);
        return false;
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
  cursor: pointer;
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
.lnk-tp-lst-1-bx img {
  margin-bottom: 10px;
}
.list-itm {
  display: block !important;
  margin: 0 auto !important;
}
.list-1 {
  background-image: url(../../../../../assets/images/right-chevron.png);
  background-position: right 8px center;
  background-repeat: no-repeat;
  background-size: 14px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  width: 100%;
  height: 50px;
  margin-bottom: 15px;
  align-items: center;
  text-align: left;
  justify-content: center;
  transition: 0.3s;
  margin-left: auto;
  cursor: pointer;
}
.list-2 {
  margin-right: auto;
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
