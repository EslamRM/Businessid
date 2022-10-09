<template>
  <div class="">
    <div class="row container mx-auto mt-5">
      <div class="col-md-6 col-sm-12 mx-auto">
        <h2 class="ad-create">Create Ad</h2>
        <div class="col-12 adver-container">
          <div class="adver-design">
            <div class="col-12 adver-head d-flex">
              <h3>Advertising Design</h3>
              <button class="ml-auto mt-3" @click="showPosts = true">
                Use Post
              </button>
            </div>
            <div class="col-12 adver-body">
              <p>What would you like your ad to look like?</p>
              <md-field
                :class="{
                  validation: errorMessage == 'Missing param description'
                }"
                v-focus="unvalidate()"
              >
                <label>Description</label>
                <md-textarea v-model="description" rows="3">{{
                  description
                }}</md-textarea>
              </md-field>
              <div class="img-adver mb-3">
                <strong>Try using an image that focuses on one point.</strong>
                <div>
                  <div class="imgAd text-center" v-if="!file">
                    <img
                      src="https://via.placeholder.com/300"
                      :class="{
                        validation: errorMessage == 'Missing param file'
                      }"
                    />
                  </div>
                  <div v-else class="imgAd">
                    <img
                      v-if="file_type == 'image'"
                      :src="file"
                      alt=""
                      class="feedImageView"
                    />
                    <video controls v-else :src="file" autoplay="autoplay" />
                  </div>
                </div>
                <div class="change_dp" @click="toggleDialog = !toggleDialog">
                  <input
                    type="file"
                    ref="file"
                    style="display: none"
                    accept="image/*"
                    v-on:change="chooseImage($event)"
                  />
                  Upload options
                </div>
              </div>
              <div class="button-name" style="line-height: 1;">
                <input-component custom="true">
                  <vSelect
                    :class="{
                      validation: errorMessage == 'Missing param button_name'
                    }"
                    v-model="button_name"
                    @input="buttonName($event)"
                    class="dropdown"
                    label="name"
                    placeholder="Button Name"
                    :options="['Call Now', 'Order Now', 'Visit Us']"
                  >
                  </vSelect>
                </input-component>
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-12 adver-container"
          :class="{
            validation: errorMessage == 'Missing param location'
          }"
        >
          <div class="audience">
            <h3>The Audience</h3>
            <p>Who should see your ad?</p>
            <div class="aud-details">
              <div class="details-header d-flex">
                <h3>The Audience Details</h3>
                <div class="edit-aud" @click="showAudience = true">
                  <i class="material-icons edit-i"> edit </i>
                </div>
              </div>
              <div class="details-body">
                <!-- <p>Location {{location[0]}}</p> -->
                <p>
                  Location - {{ location[0] }} {{ location[1] }}
                  {{ location[2] }} ...
                </p>
                <p>Age {{ age[0] }} - {{ age[1] }}+</p>
              </div>
            </div>
            <md-button class="btn-aud" @click="showAudience = true"
              >Create New Audience</md-button
            >
          </div>
        </div>
        <div class="col-12 adver-container">
          <div class="time">
            <h3>The Time</h3>
            <div class="time-details">
              <md-radio v-model="ad_limit" :value="1" @change="get_type()"
                >Run this ad continuously</md-radio
              >
              <md-radio v-model="ad_limit" :value="2" @change="get_type2()"
                >Choose the end date of this ad</md-radio
              >
              <div class="end-time d-flex" v-if="ad_limit == 2">
                <div class="days mr-3">
                  <label for="day">Days</label>
                  <input
                    type="number"
                    name="number"
                    v-model="adDay"
                    id="day"
                    class="number"
                  />
                  <button name="minus" class="minus" @click="adDay--,get_date()" :disabled="adDay == 1">&#8722</button>
                  <button name="plus" class="plus" @click="adDay++,get_date()">&#x2b</button>
                </div>
                <input-component
                  label="Choose End Date"
                  custom="true"
                  class="days ml-auto"
                >
                  <VueDatePicker
                    @onChange="get_day()"
                    color="#f47320"
                    placeholder="End Date"
                    button-validate="Ok"
                    button-cancel="Cancel"
                    v-model="endDate"
                  />
                </input-component>
              </div>
            </div>
          </div>
          <div class="budget">
            <h3>The Budget</h3>
            <div class="budget-details">
              <p>The actual amount spent per day can vary.</p>
              <div class="currency">
                <div>
                  <div>Country - Currency</div>
                  <div>{{ location_budget }} - {{ currency_budget }}</div>
                </div>
                <button type="button" @click="showCurrency = true">
                  Change
                </button>
              </div>
              <p>
                Estimated number of people reached from {{ reach }} to
                {{ reach * 2 }}
              </p>
              <div class="text-center">
                <span class="cost"
                  ><sup style="font-size: 12px">AED.</sup> {{ range }}.00</span
                >
              </div>
              <vue-range-slider
                :min="4"
                class="mb-4"
                v-model="range"
                :clickable="false"
              ></vue-range-slider>
            </div>
          </div>
        </div>
        <div
          class="col-12 adver-container"
          style="padding: 40px;line-height: 2;"
        >
          <div class="preview">
            <h3>Advertising Preview</h3>
            <md-button
              class="btn-preview my-4"
              :class="{
                validation: errorMessage == 'Missing param advertising_preview'
              }"
              @click="showPreview = true"
              >View all Previews</md-button
            >
          </div>
          <div class="pay-results pb-3 mt-3">
            <h3>Advertising Preview</h3>
            <p>
              Reached people
              <span class="fr">{{ reach }} - {{ reach * 2 }}</span>
            </p>
          </div>
          <div class="summary pb-3 mt-3">
            <h3>Payment Summary</h3>
            <p>Your ad will run for {{ adDay }} days.</p>
            <h4>Total Budget</h4>
            <p>
              AED {{ range }}.00 per day x {{ adDay }} days<span class="fr"
                >AED {{ this.ad_cost }}</span
              >
            </p>
          </div>
        </div>
        <div class="col-12 adver-container">
          <div class="payment">
            <div class="pay-header">
              <h3>Payment Method</h3>
            </div>
            <div class="pay-container">
              <img src="../../../../assets/images/payment.jpg" alt="" />
              <md-button
                class="btn-pay"
                style="background:#d4e4ec;color:#149adb;"
                v-if="!status"
                @click="add_advertising()"
                >Pay Now</md-button
              >
            </div>
          </div>
          <div id="smart-button-container" style="padding: 0 20px;">
            <div style="text-align: center;">
              <div id="paypal-button-container"></div>
            </div>
          </div>
        </div>
      </div>
      <md-dialog :md-active.sync="showAudience">
        <md-dialog-title class="d-flex"
          ><h2 class="mx-auto">The Audience</h2>
          <div class="close">
            <i
              class="material-icons md-primary"
              style="cursor: pointer"
              @click="showAudience = false"
              >close</i
            >
          </div>
        </md-dialog-title>

        <md-content md-dynamic-height class="mx-5">
          <p>
            Select the location, age, gender and interests of the people you
            want to reach with your ad.
          </p>
          <div class="gender mt-4">
            <h3>Gender</h3>
            <div class="d-flex my-3">
              <md-button
                v-for="(btn, index) in genderBtn"
                :key="index"
                @click="activGender(index), gett(btn)"
                :value="btn"
                :class="{ active_g: index == currentGender }"
                >{{ btn }}</md-button
              >
            </div>
          </div>
          <div class="age mt-5">
            <h3>Age</h3>
            <vue-range-slider
              class="mb-4 mt-4"
              v-model="age"
              :min-range="18"
              :max-range="65"
              :clickable="false"
              @drag-end="65"
            ></vue-range-slider>
            <div class="d-flex age-range">
              <div class="w-100 text-left">
                <span>{{ age[0] }}</span>
              </div>
              <div class="w-100" style="text-align: right;">
                <span>{{ age[1] }}</span>
              </div>
            </div>
          </div>
          <div class="location mt-5">
            <h3>Location</h3>
            <div class="loc-holder mt-4">
              <input-component label="Location" custom="true">
                <v-select
                  :class="{
                    validation: errorMessage == 'Missing param location'
                  }"
                  class="dropdown"
                  v-model="location"
                  placeholder="Write here to add more locations"
                  taggable
                  multiple
                />
              </input-component>
              <div class="md-layout md-gutter mt-4 md-alignment-center-center">
                <input-component
                  custom="true"
                  errorMessage="Kindly Mark the location pointer by clicking on the Map."
                >
                  <GoogleMap
                    :locateButton="false"
                    v-model="location"
                    height="250px"
                    :autoSetMarker.sync="mapMarkers"
                    :autoSetInfo.sync="location"
                  >
                  </GoogleMap>
                </input-component>
              </div>
            </div>
          </div>
        </md-content>

        <md-dialog-actions class="p-5 mt-5" style="border-top: 1px solid #ccc;">
          <md-button
            class="md-primary"
            style="padding:0 50px;background:#e9ccca;color:tomato;"
            @click="showAudience = false"
            >Save</md-button
          >
          <md-button
            class="md-primary"
            style="padding:0 25px;background:#e4e6eb;"
            @click="showAudience = false"
            >Close</md-button
          >
        </md-dialog-actions>
      </md-dialog>
      <md-dialog :md-active.sync="showCurrency" class="md-currency">
        <md-dialog-title class="d-flex"
          ><h2 class="mx-auto">Location and Currency</h2>
          <div class="close">
            <i
              class="material-icons md-primary"
              style="cursor: pointer"
              @click="showCurrency = false"
              >close</i
            >
          </div>
        </md-dialog-title>

        <md-content md-dynamic-height class="mx-5">
          <div class="location mt-3">
            <h4>Location</h4>
            <input-component custom="true">
              <v-select
                class="dropdown mb-4"
                :class="{
                  validation: errorMessage == 'Missing param location_budget'
                }"
                v-model="location_budget"
                :options="countryName"
                placeholder="Location"
                @input="getCurrency"
                taggable
              />
            </input-component>
            <h4>Currency</h4>
            <input-component custom="true">
              <v-select
                :class="{
                  validation: errorMessage == 'Missing param currency_budget'
                }"
                class="dropdown mb-4"
                v-model="currency_budget"
                placeholder="Currency"
                taggable
              />
            </input-component>
            <h4>Time Zone</h4>
            <input-component custom="true">
              <v-select
                :class="{
                  validation: errorMessage == 'Missing param time_zone_budget'
                }"
                class="dropdown mb-4"
                v-model="time_zone_budget"
                placeholder="Time Zone"
                taggable
              />
            </input-component>
          </div>
        </md-content>

        <md-dialog-actions class="p-3 mt-3" style="border-top: 1px solid #ccc;">
          <md-button
            class="md-primary btn_ad2"
            style="height: 45px;"
            @click="showCurrency = false"
            >Save</md-button
          >
          <md-button
            class="md-primary btn_ad2"
            style="height: 45px;"
            @click="showCurrency = false"
            >Close</md-button
          >
        </md-dialog-actions>
      </md-dialog>
      <md-dialog :md-active.sync="showPreview" class="md-currency">
        <md-dialog-title class="d-flex preview-title"
          ><h2 class="mx-auto">All Previews</h2>
          <div class="close">
            <i
              class="material-icons md-primary"
              style="cursor: pointer"
              @click="showPreview = false"
              >close</i
            >
          </div>
        </md-dialog-title>

        <md-content md-dynamic-height class="mx-5 mb-5">
          <div class="">
            <md-button class="btn_ad2" @click="get_preview('Timeline in Pc')"
              >Timeline in Pc</md-button
            >
            <md-button class="btn_ad2" @click="get_preview('Timeline in Phone')"
              >Timeline in Phone</md-button
            >
            <md-button class="btn_ad2" @click="get_preview('In Right Side')"
              >In Right Side</md-button
            >
            <md-button class="btn_ad2" @click="get_preview('In Left Side')"
              >In Left Side</md-button
            >
            <md-button class="btn_ad2" @click="get_preview('All')"
              >All</md-button
            >
          </div>
        </md-content>
      </md-dialog>
      <md-dialog :md-active.sync="showPosts" class="posts-dialog">
        <md-dialog-title class="d-flex preview-title"
          ><h2 class="mx-auto">Browse Posts</h2>
          <div class="close">
            <i
              class="material-icons md-primary"
              style="cursor: pointer"
              @click="showPosts = false"
              >close</i
            >
          </div>
        </md-dialog-title>

        <md-content md-dynamic-height class="mx-5 mb-5">
          <div
            class="text-center p-3 no_posts"
            v-if="profileTimeline && profileTimeline.length == 0"
          >
            <i style="font-size:200px" class="material-icons">insert_photo</i>
            <h3>There are no posts to display</h3>
            <p>
              This Account does not contain any posts with a single photo or
              video.
            </p>
          </div>
          <div
            class="text-center p-3 no_posts"
            v-for="feed in profileTimeline"
            v-else
          >
            <Post
              class="post"
              :model="'Timeline'"
              :key="feed.pk_post_id"
              :feed="feed"
            />
            <md-button @click="useThis(feed.pk_post_id)"
              >Use This Post</md-button
            >
          </div>
        </md-content>
      </md-dialog>
      <UploadAd :dialog="toggleDialog" />
      <!-- <ReactngleCrop :dialog="toggleRectangleDialog" /> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import { mapState } from "vuex";
import UploadAd from "../../../services/UploadAd";
import countryJson from "../../../services/country-codes.json";
// import ReactngleCrop from "../../../services/rectangleCrop";
import Post from "../../newsfeed/sliderBox.vue";
import inputComponent from "@/components/ui-components/input.vue";
import VueRangeSlider from "vue-range-component";
import GoogleMap from "@/components/pages/newsfeed/google-map";
import VideoPlayer from "../../../../components/VideoPlayer";
import vSelect from "vue-select";
export default {
  name: "advertisment",
  data() {
    return {
      genderBtn: ["All", "Men", "Women"],
      countryName: [],
      country_json: countryJson,
      ad_limit: 2,
      currentGender: 0,
      gender: "All",
      toggleRectangleDialog: false,
      showPreview: false,
      showAudience: false,
      showCurrency: false,
      showPosts: false,
      isCropped: false,
      toggleDialog: false,
      mapMarkers: {},
      location: false,
      button_name: "",
      description: this.$route.query.title,
      continuously: false,
      advertising_preview: "",
      endDate: "",
      adDay: 7,
      enddate_bac: "",
      adday_bac: "",
      img: "",
      age: [18, 65],
      file: null,
      file_type: this.$route.query.type,
      location_budget: "",
      currency_budget: "",
      time_zone_budget: "",
      range: 7,
      busy: false,
      showLoader: true,
      initialProfile: true,
      page: 0,
      isLoaded: false,
      action_type: "add",
      payment_method: "paypal",
      advertising_id: "",
      status: false,
      errorMessage: null,
      // paypal
      show_proceed_payment_btn: true,
      showPaymentProcessing: false,
      paypal_buttons_loaded: false,
      show_paypal_buttons_wrap: true,
      aed_to_usd_rate: 1
    };
  },
  components: {
    // ReactngleCrop,
    VideoPlayer,
    UploadAd,
    inputComponent,
    vSelect,
    VueRangeSlider,
    VueDatePicker,
    GoogleMap,
    Post
  },
  computed: {
    ...mapState({
      profileTimeline: state => state.newsFeed.profileTimeline,
      dashboard_access: state => state.profile.dashboard_access,
      userData: state => state.user.profile.profile
    }),
    date() {
      var dt = new Date();
      var end_date = dt.setDate(dt.getDate() + this.adDay);
      return (this.endDate = end_date);
    },
    ad_cost() {
      return this.adDay * this.range;
    },
    reach() {
      return parseInt((this.adDay * this.range) / 0.0015);
    },
    countryFilter() {
      return this.countryName.filter(country => {
        return country["country-name"]
          .toLowerCase()
          .startsWith(this.location_budget.toLowerCase());
      });
    }
  },
  methods: {
    add_advertising() {
      return new Promise((resolve, reject) => {
        axios
          .post("https://businessid.net/api/v2/vendor/advertising/add", {
            description: this.description,
            file: this.file,
            // file_type: this.Adfile.type,
            gender: this.gender,
            age: this.age[0] + "-" + this.age[1],
            location: this.location,
            button_name: this.button_name,
            time_days: this.adDay,
            end_date: this.endDate,
            location_budget: this.location_budget,
            currency_budget: this.currency_budget,
            time_zone_budget: this.time_zone_budget,
            estimated_price: this.range,
            payment_method: this.payment_method,
            advertising_preview: this.advertising_preview,
            action_type: this.action_type
          })
          .then(response => {
            resolve(response);
            console.log(response);
            if (Number(response.headers["content-length"]) > 100) {
              this.status = true;
              paypal
                .Buttons({
                  style: {
                    shape: "rect",
                    color: "blue",
                    layout: "vertical",
                    label: "paypal"
                  },

                  createOrder: function(data, actions) {
                    return actions.order.create({
                      purchase_units: [
                        { amount: { currency_code: "USD", value: 1 } }
                      ]
                    });
                  },

                  onApprove: function(data, actions) {
                    return actions.order.capture().then(function(orderData) {
                      this.paypal.type_id = this.advertising_id;
                      this.paypal.action_type = this.action_type;
                      this.paypal.transaction_id = this.advertising_id;
                      console.log(
                        "Capture result",
                        orderData,
                        JSON.stringify(orderData, null, 2)
                      );

                      // Show a success message within this page, e.g.
                      const element = document.getElementById(
                        "paypal-button-container"
                      );
                      element.innerHTML = "";
                      element.innerHTML =
                        "<h3>Thank you for your payment!</h3>";

                      // Or go to another URL:  actions.redirect('thank_you.html');
                    });
                  },

                  onError: function(err) {
                    console.log(err);
                  }
                })
                .render("#paypal-button-container");
              initPayPalButton();
            } else {
              this.status = false;
              this.errorMessage = response.data.message;
              this.$swal.fire(
                this.$helpers.errorPopup("<h3>Please Complete Ad Details</h3>")
              );
            }
            this.advertising_id = Number(
              response.data.substr(response.data.length - 2)[0]
            );
            this.description = "";
            this.file = false;
            this.button_name = "";
          })
          .catch(error => {
            reject(error);
            console.log(error);
          });
      });
    },
    useThis(id) {
      this.file = "";
      this.profileTimeline.forEach(feed => {
        feed.files.forEach(file => {
          if (feed.pk_post_id === id) {
            this.file = file.file;
            this.file_type = file.type;
            this.description = feed.title;
            console.log(file.file);
          }
        });
      });
      this.showPosts = false;
    },
    loadMore() {
      this.page++;
      this.showLoader = true;
      this.busy = true;
      const data = { page: this.page, profileid: this.$route.params.id };
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
    },
    chooseImage($event) {
      this.isCropped = true;
      const file = $event.target.files[0];
      this.img = URL.createObjectURL(file);
    },
    chooseFile() {
      this.toggleDialog = !this.toggleDialog;
    },
    activGender(index) {
      this.currentGender = index;
    },
    get_date() {
      var dt = new Date();
      var end_date = dt.setDate(dt.getDate() + this.adDay);
      console.log(end_date);
      this.endDate = end_date;
    },
    get_day() {
      const oneDay = 24 * 60 * 60 * 1000;
      const firstDate = new Date();
      var secdDate = this.endDate;
      var secondDate = new Date(secdDate).getTime();
      this.adDay = Math.round(Math.abs((secondDate - firstDate) / oneDay));
    },
    gett(event) {
      this.gender = event;
    },
    get_type() {
      // this.continuously = "true";
      this.endDate = "false";
      this.adDay = "false";
    },
    get_type2() {
      this.endDate = this.enddate_bac;
      this.adDay = this.adday_bac;
    },
    get_preview(event) {
      this.advertising_preview = event;
      this.showPreview = false;
    },
    buttonName(event) {
      this.button_name = event;
      console.log(this.button_name);
    },
    unvalidate() {
      setTimeout(() => {
        this.errorMessage = false;
      }, 30000);
    },
    getCurrency() {
      this.country_json.forEach(element => {
        if (element["country-name"] == this.location_budget) {
          this.currency_budget = element["currency"];
          this.time_zone_budget = element["time-zone-in-capital"];
        }
      });
    }
  },
  created() {
    this.country_json.forEach(element => {
      this.countryName.push(element["country-name"]);
    });
    setTimeout(() => {
      if (this.$route.query.file) {
        this.file = this.$route.query.file;
      }
      this.enddate_bac = this.endDate;
      this.adday_bac = this.adDay;
    }, 2000);
    this.loadMore();
    this.$emit("handleBannerEmit", false);

    const profile_id = this.$route.params.id;
    this.$store
      .dispatch("profile_info", profile_id)
      .then(response => {
        this.$emit("handleBannerEmit", true);
      })
      .catch(error => console.log(error));
  },
  mounted: function() {
    const script = document.createElement("script");
    const ClientID = process.env.PAYPAL_CLIENT_ID;
    script.src = `https://www.paypal.com/sdk/js?client-id=${ClientID}`;
    document.body.appendChild(script);
    this.get_date();
    this.get_day();
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
};
</script>
<style>
.validation {
  border: 1px solid #dc3545 !important;
  border-radius: 10px;
}
.no_posts .md-button {
  width: 95%;
  background: coral;
  border-radius: 10px;
  color: #fff;
}
.post .swiper-slide {
  width: 510px;
}
.vue-range-slider.slider-component
  .slider
  .slider-dot.slider-always
  .slider-tooltip-wrap {
  display: none !important;
}
.ad-create {
  margin-left: 2rem;
}
.no_posts {
  color: #888;
  line-height: 2;
  padding: 10px;
}
.c-formLabel {
  margin-top: -3px;
}
.md-dialog .md-dialog-container {
  border-radius: 10px !important;
  overflow: auto !important;
  max-height: 100% !important;
}
.md-dialog .md-dialog-title {
  border-bottom: 1px solid #ccc;
  padding-bottom: 7px;
}
.md-currency .md-dialog-container {
  width: 480px;
}
.md-currency .md-dialog-container h2 {
  font-size: 20px;
  margin-left: 22%;
}
.md-dialog /deep/.md-dialog-container {
  max-width: 768px;
}
.active_g {
  color: tomato !important;
  background: #e9ccca !important;
}
.close {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e4e6eb;
  /* margin-left: auto; */
  padding: 7px;
}
.preview-title {
  margin-bottom: 0;
}
.gender .md-button {
  font-weight: 600;
  background: #e4e6eb;
  width: 100%;
}
.age-range span {
  font-size: 16px;
  padding: 10px;
  border-radius: 50%;
  background: #e4e6eb;
}
.loc-holder {
  position: relative;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 10px;
  margin-top: 5px;
}
.loc-holder i {
  position: absolute;
  top: 20px;
  left: 10px;
}
.md-field label {
  position: absolute;
  top: 0;
  left: 30px;
}
.md-field .md-input {
  padding-left: 30px;
}
.main {
  width: 908px;
}
.left-side {
  flex-basis: 500px;
  max-width: 500px !important;
}
.right-side {
  width: auto;
  max-width: 100%;
  margin-left: 4em;
  width: auto;
  background: #eee;
}
.dropdown .vs__dropdown-menu {
  height: auto;
  overflow-y: auto;
  float: left;
  position: absolute;
  transform: scale(1, 1);
  transition: transform ease 150ms;
  transform-origin: top;
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #eef0f1;
  box-shadow: 0 20px 40px 0 rgb(0 0 0 / 5%);
  padding: 12px 0;
  z-index: 20;
  margin-top: 8px;
  max-height: 360px;
  width: 100%;
  /* max-width: 332px; */
}
.dropdown .vs__dropdown-menu > * {
  transform: scale(1, 1);
  transition: transform ease 150ms;
  transform-origin: top;
  padding: 15.5px 24px;
  border-bottom: 1px solid #eef0f1;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  color: #2b2d2e;
  display: block;
  text-decoration: none;
  text-align: left;
  background: none;
}
.dropdown .vs__dropdown-menu > *:hover {
  font-weight: 600;
  color: #213a63;
}
.dropdown .vs__dropdown-toggle {
  height: 55px;
  border-radius: 10px;
  border: solid 1px #888 !important;
  padding: 10.5px 17.5px;
  box-sizing: border-box;
}
.adver-container {
  color: #050505;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  background: #fff;
  line-height: 3;
  font-size: 16px;
  padding: 15px;
  margin: 15px;
  border: 1px solid #eee;
  border-radius: 10px;
}
p {
  color: #65676b;
}
.adver-head a {
  font-weight: 600;
}
.md-field {
  border: 1px solid #888;
  height: 80px !important;
  border-radius: 10px;
}
.md-field .md-textarea {
  height: auto !important;
  min-height: auto !important;
  font-size: 20px !important;
  border-radius: 10px;
}
.md-field.md-theme-default.md-has-textarea:not(.md-autogrow):before {
  border: 0;
}
.md-field.md-has-textarea:not(.md-autogrow):after {
  border-radius: 10px !important;
}
.md-field.md-theme-default.md-has-textarea:not(.md-autogrow):after {
  border: 0;
}
.imgAd img {
  border-radius: 10px;
}
.imgAd {
  position: relative;
  margin: 0 auto;
  width: 300px;
}
.change_dp {
  width: 60%;
  margin: auto;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: #ffffff;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  transform: translate3d(0, 11px, 0);
  transition-delay: 0.03s;
  transition-duration: 0.25s;
  transition-opacity: 0.15s;
}
.change_dp:hover {
  border-color: #ff5722;
}
.aud-details {
  background: #f0f2f5;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 2;
}
.btn-aud,
.btn-preview,
.btn-pay,
.btn_ad2 {
  background: #f0f2f5;
  width: 100%;
  margin: 0px;
  border-radius: 10px;
  margin-top: 16px;
  font-weight: 600;
  height: 40px;
}
.btn_ad2 {
  height: 60px;
}
.edit-aud {
  background: #ddd;
  width: 30px;
  height: 30px;
  padding: 6px;
  border-radius: 50%;
  margin-left: auto;
  cursor: pointer;
  box-shadow: 0 20px 40px 0 rgb(0 0 0 / 5%);
}
.btn-preview {
}
.edit-aud:hover {
  background: #ccc;
}
.edit-i {
  font-size: 16px;
}
.days {
  padding: 15px;
  border: 1px solid #888;
  border-radius: 10px;
  height: 60px;
  line-height: 1;
  width: 50%;
  position: relative;
  min-width: auto !important;
}
.days:hover,
.dropdown .vs__dropdown-toggle:hover,
.md-field:hover {
  border: 1px solid tomato !important;
  border-radius: 10px;
}
.days:focus,
.dropdown .vs__dropdown-toggle:focus,
.md-field:focus {
  border: 2px solid tomato !important;
  border-radius: 10px;
}
.days label {
  display: block;
  font-size: 10px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.number {
  width: 50%;
  border: 0;
  font-size: 16px;
}
.plus,
.minus {
  border: 2px solid #888;
  border-radius: 50%;
  font-size: 16px;
  background: #fff;
  position: absolute;
  right: 65px;
}
.plus {
  right: 20px;
}
.budget {
  border-top: 1px solid #ccc;
  margin-top: 20px;
}
.currency {
  display: flex;
}
.currency div {
  width: 115px;
  overflow-wrap: break-word;
  font-size: 13px;
  line-height: 1.5;
  color: #65676b;
}
.currency button,
.adver-head button {
  margin-left: auto;
  width: fit-content;
  color: #333;
  line-height: 1;
  border: 0;
  border-radius: 10px;
  font-size: 14px;
  padding: 10px;
  font-weight: 600;
  background: #f0f2f5;
  height: 35px;
}
.currency button:hover,
.adver-head button:hover {
  background: #ccc;
}
.cost {
  color: tomato;
  font-size: 44px;
  margin: auto;
}
.preview,
.pay-results,
.summary {
  border-bottom: 1px solid #ccc;
}
.summary span,
.pay-results span {
  font-size: 16px;
}
@media screen and (max-width: 1000px) and (min-width: 768px) {
  .colmd6 {
    -webkit-box-flex: 0 !important;
    flex: 0 0 85% !important;
    max-width: 85% !important;
  }
}
@media screen and (max-width: 600px) {
  .vd-wrapper {
    margin-top: 0;
  }
  .aud-details {
    font-size: 10px;
  }
  .dropdown .vs__dropdown-toggle {
    height: 35px;
    padding: 7.5px 5.5px;
  }
  .dropdown .vs__search {
    font-size: 10px;
  }
  .dropdown .vs__dropdown-menu > * {
    font-size: 12px;
  }
  .adver-container {
    font-size: 10px;
    margin-top: 1em !important;
  }
  .md-field label {
    font-size: 10px;
  }
  .currency button,
  .adver-head button {
    font-size: 10px;
  }
  .adver-head button {
    padding: 7px !important;
    margin-top: 0 !important;
    height: 30px;
  }
  h2 {
    font-size: 14px;
  }
  h3 {
    font-size: 12px;
  }
  .ad-creat {
    margin-left: o;
    padding-bottom: 2rem;
  }
  .colmd6 {
    padding: 0;
    margin: 0;
  }
  .adver-container {
    padding: 10px;
    margin: 0;
    margin-bottom: 10px;
  }
  .days {
    max-width: 50% !important;
  }
  .imgAd {
    width: 150px;
  }
}
@media screen and (max-width: 300px) {
  .imgAd {
    width: 150px;
  }
  .c-formLabel,
  .vd-wrapper {
    font-size: 8px !important;
  }
  .vd-picker__input-wrapper input {
    font-size: 8px !important;
  }
  .days {
    padding: 10px;
    height: 50px;
  }
  .plus,
  .minus {
    font-size: 10px;
    right: 33px;
  }
  .plus {
    right: 5px;
  }
  .currency div {
    font-size: 10px;
  }
  .summary span {
    display: block;
  }
}
</style>
