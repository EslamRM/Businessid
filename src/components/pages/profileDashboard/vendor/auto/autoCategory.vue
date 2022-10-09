<template>
  <div>
    <div class="tp-1-txt align_heading">Please Tell Us About Your Auto</div>
    <router-view></router-view>
    <form-section number="1" title="Auto Details" class="formSection">
      <div class="mob_auto_details">
        <div
          class="md-layout md-gutter md-alignment-center-center"
          style="width: 416px; display: block; margin: 0 auto"
        >
          <input-component
            label="Name *"
            custom="true"
            class="mt-4"
            style="width: 100% !important; display: block; margin: 0 auto"
          >
            <div class="input-container">
              <input
                id="name"
                type="text"
                class="input-text"
                value=""
                v-model="form.name"
                :class="form.name == '' ? 'else_class' : 'has-value'"
              /><label for="asking_price" class="input-label"><span>Name</span></label>
            </div>
          </input-component>
          <input-component label="Auto Condition *" custom="true">
            <vSelect
              class="dropdown"
              v-model="form.auto_type"
              :options="['New', 'Used']"
              placeholder="Select Auto Type"
            >
            </vSelect>
          </input-component>
          <input-component label="Auto Purpose *" custom="true" class="mb_mt_10 mt-4">
            <vSelect
              class="dropdown"
              v-model="form.auto_purpose"
              :options="['Sale', 'Rent']"
              placeholder="Select Auto Purpose"
            >
            </vSelect>
          </input-component>
        </div>
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-left mb_tab mb_mt_10 desktop_mb_minus15"
          style="width: 416px; display: block; margin: 0 auto"
        >
          <input-component
            v-if="
              form.auto_type == 'Used' && form.category != 'Accessories And Spare Parts'
            "
            size="100"
            type="text"
            placeholder="Enter Kilometers used"
            label="Total Kilometers used *"
            v-model="form.kilometers"
          ></input-component>
        </div>
      </div>
      <div class="mb_tab_two mob_auto_features desktop_mb_minus10 mb-5">
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-center"
          v-if="form.category != 'Accessories And Spare Parts'"
          style="width: 416px; display: block; margin: 0 auto"
        >
          <input-component
            label="Auto Brand (Make) *"
            custom="true"
            class="mt-4"
            v-if="form.category != 'Number Plates'"
          >
            <vSelect
              v-if="form.category == 'Cars'"
              class="dropdown"
              v-model="form.sub_category"
              label="name"
              :options="sub_categories"
              placeholder="Select Brand/Make"
              @input="
                fetchAndAssign(
                  'api_auto_types',
                  {
                    parentid: form.sub_category ? form.sub_category.id : '',
                  },
                  'models'
                )
              "
              taggable
              push-tags
            >
            </vSelect>
            <div class="input-container" v-if="form.category !== 'Cars'">
              <input
                id="brand"
                type="text"
                class="input-text"
                value=""
                v-model="form.sub_category"
                :class="form.sub_category == '' ? 'else_class' : 'has-value'"
              /><label for="brand" class="input-label"
                ><span>Select Brand/Make</span></label
              >
            </div>
          </input-component>
          <input-component
            label="Auto Model *"
            custom="true"
            v-if="form.category != 'Number Plates'"
          >
            <vSelect
              v-if="form.category == 'Cars'"
              class="dropdown"
              v-model="form.model"
              label="name"
              :reduce="(element) => element.name"
              :options="models"
              placeholder="Select Auto Model"
              taggable
              push-tags
            >
            </vSelect>
            <div class="input-container" v-if="form.category != 'Cars'">
              <input
                id="Model"
                type="text"
                class="input-text"
                :class="form.model == '' ? 'else_class' : 'has-value'"
                value=""
                v-model="form.model"
              /><label for="Model" class="input-label"
                ><span>Select Auto Model</span></label
              >
            </div>
          </input-component>
        </div>
        <a
          @click="pathTo()"
          style="width: 78%; display: block; margin: 0 auto"
          class="btn-next"
        >
          <button id="carDetailSubmit" class="button primary block submit w-100 mt-5">
            Next
          </button>
        </a>
      </div>
    </form-section>
  </div>
</template>
<script>
import axios from "axios";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";
import formSection from "../manageStore/components/formSection.vue";
import inputComponent from "@/components/ui-components/input.vue";
import productCategoriesComponent from "../manageStore/components/productCategories.vue";
import vSelect from "vue-select";
import utils from "@/helpers/utils.js";
export default {
  name: "autoCategory",
  mixins: [utils],
  data() {
    return {
      categories: [],
      sub_categories: [],
      models: [],
      features: [],
      auto_features_list: [],
      form: {
        action_type: "add",
        market_type: "supply",
        product_type: "auto",
        category: this.$route.query.category,
        name: "",
        brand: "asas",
        make: "asas",
        manufacturer: "asas",
        sub_category: "",
        model: "",
        auto_type: this.$route.query.type,
        auto_purpose: this.$route.query.purpose,
        kilometers: "",
        usage: "",
        auto_features: [],
        // Auto Features From API
        age: "",
        body_type: "",
        doors: "",
        cylinders: "",
        horsepower: "",
        transmission_type: "",
        color: "",
        warranty: "",
        fuel_type: "",
        regional_specs: "",
        // Auto Features statically added
        body_condition: "",
        mechanical_condition: "",
        length: "",
        wheels: "",
        capacity: "",
        engine_size: "",
        usage: "",
        drive_system: "",
        // Only for Accessories And Spare Parts
        allCategoriesNotSelected: false,
        categories: [],
        item_height: 0.0,
        item_weight: 0.0,
        item_width: 54,
        item_length: 67,
        brand: "",
        product_attributes: {},
      },
    };
  },
  components: {
    inputComponent,
    productCategoriesComponent,
    breadcrumbs,
    formSection,
    vSelect,
  },
  created() {
    // this.fetchAndAssign("api_auto_types", {}, "categories");
    // Get Currency From API
    this.form.market_type = this.$route.query.market_type;
    this.assignCategory();
    console.log(
      this.form.category == "Accessories And Spare Parts" ||
        this.form.category == "Number Plates"
    );
  },
  methods: {
    pathTo() {
      if (this.form.category == "Number Plates") {
        this.$router.push({
          path: "/dashboard/vendor/addAuto/",
          query: {
            market_type: this.$route.query.market_type,
            category: this.$route.query.category,
            name: this.form.name,
            type: this.form.auto_type,
            kilometers: this.form.kilometers,
            purpose: this.form.auto_purpose,
            brand: this.form.sub_category.name,
            model: this.form.model,
          },
        });
      } else if (this.form.category == "Accessories And Spare Parts") {
        this.$router.push({
          path: "/dashboard/vendor/addAuto/",
          query: {
            market_type: this.$route.query.market_type,
            category: this.$route.query.category,
            name: this.form.name,
            type: this.form.auto_type,
            kilometers: this.form.kilometers,
            purpose: this.form.auto_purpose,
            brand: this.form.sub_category.name,
            model: this.form.model,
          },
        });
      } else {
        this.$router.push({
          path: "/dashboard/vendor/auto/details/features",
          query: {
            market_type: this.$route.query.market_type,
            category: this.$route.query.category,
            name: this.form.name,
            type: this.form.auto_type,
            kilometers: this.form.kilometers,
            purpose: this.form.auto_purpose,
            brand: this.form.sub_category.name,
            model: this.form.model,
          },
        });
      }
    },
    assignCategory() {
      var id;
      this.form.category = String(this.$route.query.category);

      switch (this.$route.query.category) {
        case "Cars":
          id = "1";
          break;
        case "Accessories And Spare Parts":
          id = "985";
          break;
        case "Boats":
          id = "2";
          break;
        case "Heavy Vehicles":
          id = "3";
          break;
        case "Motorcycles":
          id = "4";
          break;
        case "Number Plates":
          id = "5";
          break;
      }
      this.fetchAndAssign("api_country", {}, "currencies");
      this.fetchAndAssign("api_auto_features", {}, "auto_features_list");
      this.fetchAndAssign("api_auto_types", { parentid: id }, "sub_categories");
      this.getAutoFeatures(id);
      return;
    },
    toggleDiv(div) {
      this[div] = !this[div];
    },
    CombinesStrings(data1, data2) {
      return `${data1}${data2.replaceAll("_", " ")}`;
    },
    async getAutoFeatures(id) {
      this.loader = true;
      const res = await this.fetchAndAssign(
        "api_auto_category_features",
        { categoryid: id },
        "features"
      );
      if (res) {
        // await this.features.forEach(el => this.form[`${el.key}`] = "")
        await this.loadProductandDetails();
      }
      this.loader = false;
      // Use Below Function to to Update Validations for AUto Features.
      // 1. Go to Vue Dev Tools
      //2. Copy the value of Object featuresValidation
      //3. Paste the copied data in the corresponding object in "./components/validations.js"
      //4. Eg: Cars, Boats etc.
      // this.features.forEach(el => this.featuresValidation[el.key] = { required })
    },
    async submitForm() {
      this.loading = true;
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        for (const el in this.$v.form) {
          if (!el.$invalid) {
            console.log(el);
          }
        }
        return;
      }

      const fileresponse = await this.getFileUrls(this);
      console.log(fileresponse);
      if (fileresponse == "fail" || fileresponse == "empty") return;

      this.form.sub_category = await this.form.sub_category.name;
      this.form.brand = await this.form.sub_category;
      this.form.make = await this.form.sub_category;
      this.form.manufacturer = await this.form.sub_category;
      this.form.information = btoa(this.information);

      console.log(this.form);
      const response = await this.$store.dispatch("uploadProduct", this.form);
      console.log(response);
      if (await !response.data.success) {
        this.loading = false;
        console.log(response);
        await this.$swal.fire(
          this.$helpers.errorPopup("Error Adding your Auto." + response.data.message)
        );
        return;
      } else {
        this.loading = false;
        await this.$swal.fire(
          this.$helpers.successPopup("Your Auto has been added successfully.")
        );
        this.$router.push("/dashboard/vendor/manage-store/auto");
        return;
      }
    },
    //-------------For Auto Update---------------------------------
    async loadProductandDetails() {
      this.loader = true;
      const productId = await this.$route.query.productId;
      if (!productId && this.form.action_type === "add") return;
      this.form.item_id = productId;
      // 1. Fetch Product Details
      const res = await this.$store.dispatch("productDetails", productId);
      this.productDetails = await res;
      // 2. Assign action_type = 'update'
      this.form.action_type = "update";
      //3. Assign Values to Form (Prefill)
      for (const key in res) {
        //4. Price Key is diff. in DB
        if (key === "unitprice") {
          if (res.unitprice === "0.00") {
            this.form.pricing_type = "quotation";
            continue;
          }
          this.form.pricing_type = "show_pricing";

          this.form.price = Number(parseFloat(res.unitprice).toFixed(2));
          continue;
        }
        //5. Price Key is diff. in DB
        if (key === "offerprice") {
          this.form.offerprice = Number(parseFloat(res.offerprice).toFixed(2));
          continue;
        }

        //6. Images
        if (key === "images") {
          this.InitialArray = await res.images.map((el) => el.file);
          this.RealArray = this.InitialArray;
          continue;
        }
        //7. Images
        if (key === "brand") {
          this.form.sub_category = {
            id: "",
            name: res.brand,
          };
          continue;
        }
        //8. Latitude & Lang
        if (key === "latitude" || key === "longitude") {
          this.mapMarkers = {
            lat: parseFloat(res.latitude),
            lng: parseFloat(res.longitude),
          };
          this.form.latitude = res.latitude;
          this.form.longitude = res.longitude;
          continue;
        }
        //9. More Details
        if (key === "moreDetails") {
          for (const k in res.moreDetails) {
            if (k === "purpose") {
              this.form.auto_purpose = res.moreDetails.purpose;
              continue;
            }

            if (k === "year") {
              this.form.year = res.moreDetails.year || new Date();
              continue;
            }
            if (k === "sub_category") {
              continue;
            }
            if (k === "category") {
              // Skipping it bcz we are already assigning category from the Query Parameter
              continue;
            }

            if (!(k in this.form)) continue;
            this.form[k] = res.moreDetails[k];
          }
          continue;
        }
        //10. Information
        if (key === "information") {
          try {
            this.information = atob(res.information);
          } catch (error) {
            this.information = res.information;
            continue;
          }

          continue;
        }

        if (!(key in this.form)) continue;
        this.form[key] = res[key];
      }
      this.loader = false;
    },
  },
};
</script>
<style scoped>
/* custom style */
.desktop_mb_minus10 {
  margin-bottom: 0px !important;
}
.input-container {
  position: relative;
  padding: 0;
  max-width: 100%;
  margin: 0 auto 25px;
}
.input-text {
  border: 1px solid #b6b8b9;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  transition: all 0.3s ease;
  outline: 0 none;
  z-index: 1;
  padding: 18px 18px 4px 18px;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
}
.input-label {
  display: block;
  text-align: left;
  transition: all 0.2s ease;
  position: absolute;
  top: 12px;
  font-size: 14px;
  line-height: 24px;
  z-index: 0;
  padding: 0 18px;
  color: #626464;
  font-weight: normal;
}
.input-container .input-text:focus {
  border: 1px solid #2b2d2e;
}
.input-container .input-text {
  border: 1px solid #b6b8b9;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  transition: all 0.3s ease;
  outline: 0 none;
  z-index: 1;
  padding: 18px 18px 4px 18px;
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
}
.input-container .input-text:focus + .input-label,
.input-container .input-text.has-value + .input-label {
  top: 8px;
  bottom: initial;
  color: #626465;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
}
.autosuggest__input.input-text:focus + .input-label,
.react-autosuggest__input.input-text.has-value + .input-label {
  top: 4px;
  bottom: auto;
  color: #626465;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}
.md-layout {
  width: 81.5% !important;
}
.md-layout >>> .c-formLabel {
  font-weight: 600;
  color: #223b64;
}
button.button {
  border: 1px solid #b6b8b9;
  border-radius: 6px;
  padding: 11px 24px;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
  background-color: #ff5823;
  color: #fbfbfd;
  -webkit-appearance: none;
  box-sizing: border-box;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  outline: none;
}
button.primary:hover {
  color: #ffffff;
  background-color: #ff5f2c;
  border-color: #e53b3b;
}

.formSection {
  width: 50% !important;
  margin: 15px auto !important;
}
.dropdown >>> .vs__dropdown-menu {
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
.dropdown >>> .vs__dropdown-menu > * {
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
.dropdown >>> .vs__dropdown-menu > *:hover {
  font-weight: 600;
  color: #213a63;
}
.dropdown >>> .vs__dropdown-toggle {
  height: 48px;
  border-radius: 6px;
  border: solid 1px #b6b8b9;
  padding: 10.5px 17.5px;
  box-sizing: border-box;
}
.vs--open {
  border: solid 1px #000;
  border-radius: 6px;
}
/* end */
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
@media screen and (max-width: 1200px) {
  .formSection {
    width: 70% !important;
    margin: 15px auto !important;
  }
}
@media screen and (max-width: 1000px) {
  .formSection {
    width: 80% !important;
    margin: 15px auto !important;
  }
}

@media screen and (max-width: 768px) {
  .formSection {
    width: 100% !important;
    margin: 15px auto !important;
  }
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

  .lnk-tp-lst-1-bx img {
    margin-bottom: 8px;
  }
}

@media screen and (max-width: 600px) {
  .btn-next {
    width: 100% !important;
  }
  .md-layout {
    width: 100% !important;
  }
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
}
</style>
