<template>
  <div class="col-sm-12 p-0">
    <div class="tp-1-txt align_heading">Reports</div>
    <div class="tp-2-txt align_text">
      Click To See Details
    </div>
    <div class="grd-tp-bx-1 col-sm-12 col-md-12 col-xl-6 p-0">
      <a class="lnk-tp-lst-1" @click="showProducts = !showProducts">
        <div class="lnk-tp-lst-1-bx">
          <div class="lnk-txt-1">Sold Products</div>
          <i class="material-icons lnk-tp-lst-1-icn">sell</i>
          <p>2000</p>
        </div>
      </a>
      <a class="lnk-tp-lst-1" @click="showLikes = !showLikes">
        <div class="lnk-tp-lst-1-bx">
          <div class="lnk-txt-1">Likes</div>
          <i class="material-icons lnk-tp-lst-1-icn">thumb_up</i>
          <p>6000</p>
        </div>
      </a>
      <a class="lnk-tp-lst-1 arrange_mob" @click="showFollow = !showFollow">
        <div class="lnk-tp-lst-1-bx">
          <div class="lnk-txt-1">Followers</div>
          <i class="material-icons lnk-tp-lst-1-icn">person_add</i>
          <p>5000</p>
        </div>
      </a>
    </div>
    <md-dialog :md-active.sync="showFollow" class="report-details">
      <md-dialog-title class="d-flex preview-title"
        ><h3 class="mx-auto">Followers</h3>
        <div class="close">
          <i
            class="material-icons md-primary"
            style="cursor: pointer"
            @click="showFollow = false"
            >close</i
          >
        </div>
      </md-dialog-title>
      <md-content md-dynamic-height class="mx-5 mb-5">
        <div>
          followers for last
          <select style="border: 0;">
            <option>1 days</option>
            <option>7 days</option>
            <option>28 days</option>
          </select>
        </div>
        <md-list class="md-triple-line">
          <md-list-item>
            <div class="md-list-item-text">
              <span>United Arab Emirates</span>
            </div>
            <span class="fr">
              1300
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <div class="md-list-item-text">
              <span>Egypt</span>
            </div>
            <span class="fr">
              1000
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <div class="md-list-item-text">
              <span>Bahrain</span>
            </div>
            <span class="fr">
              800
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <div class="md-list-item-text">
              <span>India</span>
            </div>
            <span class="fr">
              700
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <div class="md-list-item-text">
              <span>Kuwait</span>
            </div>
            <span class="fr">
              500
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <div class="md-list-item-text">
              <span>Oman</span>
            </div>
            <span class="fr">
              300
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <div class="md-list-item-text">
              <span>Philippines</span>
            </div>
            <span class="fr">
              250
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
          <md-list-item>
            <div class="md-list-item-text">
              <span>Saudi Arabia</span>
            </div>
            <span class="fr">
              150
            </span>
          </md-list-item>
          <md-divider class="md-inset"></md-divider>
        </md-list>
      </md-content>
    </md-dialog>
    <md-dialog
      :md-active.sync="showLikes"
      class="report-details"
      v-infinite-scroll="loadMore2"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="1500"
      :infinite-scroll-listen-for-event="true"
      infinite-scroll-immediate-check="false"
    >
      <md-dialog-title class="d-flex preview-title"
        ><h3 class="mx-auto">Likes</h3>
        <div class="close">
          <i
            class="material-icons md-primary"
            style="cursor: pointer"
            @click="showLikes = false"
            >close</i
          >
        </div>
      </md-dialog-title>

      <md-content md-dynamic-height class="mx-5 mb-5">
        <div>
          Likes for last
          <select style="border: 0;">
            <option>1 days</option>
            <option>7 days</option>
            <option>28 days</option>
          </select>
        </div>
        <md-list>
          <md-list-item
            class="md-triple-line likes"
            v-for="feed in profileTimeline"
            :key="feed.pk_post_id"
          >
            <md-avatar>
              <img
                v-if="feed.files[0].type == 'image'"
                :src="feed.files[0].file"
                alt=""
              />

              <video
                v-else-if="feed.files[0].type == 'video'"
                :src="feed.files[0].file"
                controls
                autoplay="autoplay"
              ></video>
            </md-avatar>

            <div class="md-list-item-text">
              <span>post title</span>
              <p>
                {{ feed.created_at }}
              </p>
            </div>

            <div style="text-align:center;font-size:12px;margin-left: 2em;">
              <md-icon class="md-primary" style="color:tomato"
                >thumb_up</md-icon
              >
              <p>4000</p>
            </div>
          </md-list-item>
        </md-list>
      </md-content>
    </md-dialog>
    <md-dialog :md-active.sync="showProducts" class="report-details">
      <md-dialog-title class="d-flex preview-title"
        ><h3 class="mx-auto">Sold Products</h3>
        <div class="close">
          <i
            class="material-icons md-primary"
            style="cursor: pointer"
            @click="showProducts = false"
            >close</i
          >
        </div>
      </md-dialog-title>

      <md-content md-dynamic-height class="mx-5 mb-5">
        <div>
          sold products for last
          <select style="border: 0;">
            <option>1 days</option>
            <option>7 days</option>
            <option>28 days</option>
          </select>
        </div>
        <md-list class="soldproducts">
          <md-list-item v-for="(product, index) in products" :key="product.id">
            <md-avatar>
              <img
                :src="product.variations.colors[0].files[0]"
                :alt="product.name"
              />
            </md-avatar>

            <div class="md-list-item-text">
              <span class="product-brand">{{ product.brand }} </span>
              <span>{{ product.name }}</span>
              <p>
                {{
                  currencySymbol(
                    product.variations.colors[0].sizes[0].offerprice,
                    product.currency
                  )[1]
                }}
              </p>
            </div>

            <div style="text-align:center;font-size:12px;margin-left: 2em;">
              <md-icon class="md-primary" style="color:tomato">sell</md-icon>
              <p>1000</p>
            </div>
          </md-list-item>
        </md-list>
      </md-content>
    </md-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "reports",
  data() {
    return {
      showProducts: false,
      showLikes: false,
      showFollow: false,
      showArea: false,
      busy: false,
      initialProfile: true,
      page: 0,
      isLoaded: false,
      showLoader: true,
      initialLoad: true,
      filters: {
        sort: "",
        search: "",
        search_category: "",
        market_type: "",
        page: 0,
        categories: [],
        tags: [],
        price_sort: "",
        offer_sort: "",
        min_price: "",
        max_price: "",
        brand: [],
        location_country: "United Arab Emirates",
        location_city: "",
        location_area: "",
        l1value: "",
        l1id: "",
        l2value: "",
        l2id: "",

        l3value: "",
        l3id: "",
        l4value: ""
      }
    };
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    },
    ...mapState({
      profileTimeline: state => state.newsFeed.profileTimeline,
      dashboard_access: state => state.profile.dashboard_access,
      userData: state => state.user.profile.profile
    })
  },
  methods: {
    loadMore() {
      this.filters.page++;
      this.showImage = false;
      this.showLoader = true;

      this.busy = true;

      // if (this.$route.params.id) {
      //   const id = this.$route.params.id;
      //   this.filters.profileid = id;
      // }
      var data = { ...this.filters };
      this.$store
        .dispatch("LoadProducts", this.filters)
        .then(response => {
          this.showLoader = false;
          if (response.success == true) {
            this.showLoader = false;
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
    loadMore2() {
      console.log("working");
      this.page++;
      this.showLoader = true;
      this.busy = true;
      const data = {
        page: this.page++,
        profileid: this.userData.userid
      };
      this.$store
        .dispatch("profile_timeline", data)
        .then(response => {
          this.showLoader = false;
          this.isLoaded = true;
          if (response.success) {
            this.busy = false;
          } else {
            this.showLoader = false;
            this.isLoaded = true;
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
    this.loadMore2();
  }
};
</script>
<style scoped>
.soldproducts >>> .md-list-item {
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}
.soldproducts >>> .md-avatar {
  border-radius: 0;
}
.likes >>> .md-avatar {
  border-radius: 10px;
  width: 70px;
  height: 70px;
}
.md-list >>> .md-list-item-content {
  padding: 0;
}
.md-divider.md-inset {
  margin-left: 0;
}
.report-details >>> .md-dialog-container {
  border-radius: 10px !important;
  overflow: auto !important;
  max-height: 100% !important;
  min-width: 500px;
}
.report-details .md-dialog-title {
  border-bottom: 1px solid #ccc;
  padding-bottom: 7px;
}
.report-details /deep/.md-dialog-container {
  max-width: 768px;
}
.prof-dash-bord-bx {
  align-items: baseline !important;
}
.close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e4e6eb;
  /* margin-left: auto; */
  padding: 7px;
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
  padding: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 170px;
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
  margin: 15px;
  color: #ff5722 !important;
}
.lnk-txt-1 {
  font-size: 14px;
  font-weight: 600;
  margin-top: 6px;
}
.align_heading {
  text-align: center;
}
.align_text {
  text-align: center;
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
  }

  .lnk-txt-1 {
    font-size: 12px;
  }
  .arrange_mob {
    margin-left: 0px;
    margin-right: 15px;
  }
  .arrange_foodbox {
    margin-left: 0px;
  }
  .tp-2-txt {
    margin-bottom: 2em;
  }
  .report-details >>> .md-dialog-container {
    min-width: auto;
  }
}

@media screen and (max-width: 300px) {
  .report-details >>> .md-dialog-container {
    min-width: auto;
  }
  .lnk-tp-lst-1 {
    width: 80px;
    height: 80px;
    margin: 0px 4px 4px 0px;

    border-radius: 3px;
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
}
</style>
