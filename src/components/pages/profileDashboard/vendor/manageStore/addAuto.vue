<template>
  <div>
    <div class="md-layout md-gutter md-alignment-center-space-between page-title">
      <div class="md-layout-item md-size-35">
        <div class="frm-hdr-1-txt txt-algn-lft">
          {{ this.$route.query.productId ? "Update" : "Add" }}
          {{ this.form.category.slice(0, -1) }}
        </div>
      </div>
      <breadcrumbs :items="breadcrumbs"></breadcrumbs>
    </div>
    <!-- Personal Details -->
    <loader v-if="loader"></loader>
    <div v-else>
      <!-- Product Information -->
      <form-section number="1" title="Auto Information">
        <div class="md-layout md-gutter mt-4 md-alignment-center-center mt_mob_two">
          <input-component
            type="text"
            placeholder="Enter Product name"
            label="Product Name"
            v-model="form.name"
            :error="checkValidation('name')"
          ></input-component>
        </div>
      </form-section>

      <!-- Product Categories -->
      <form-section number="2" title="Auto Details">
        <div class="mob_auto_details">
          <div class="md-layout md-gutter mt-4 md-alignment-center-center">
            <input-component
              label="Auto Condition *"
              custom="true"
              :error="checkValidation('auto_type')"
            >
              <vSelect
                v-model="form.auto_type"
                :options="['New', 'Used']"
                placeholder="Select Auto Type"
              >
              </vSelect>
            </input-component>
            <input-component
              label="Auto Purpose *"
              custom="true"
              :error="checkValidation('auto_purpose')"
              class="mb_mt_10"
            >
              <vSelect
                v-model="form.auto_purpose"
                :options="['Sale', 'Rent']"
                placeholder="Select Auto Purpose"
              >
              </vSelect>
            </input-component>
          </div>
          <div
            class="md-layout md-gutter mt-4 md-alignment-center-left mb_tab mb_mt_10 desktop_mb_minus15"
          >
            <input-component
              v-if="
                form.auto_type == 'Used' && form.category != 'Accessories And Spare Parts'
              "
              size="33"
              type="text"
              placeholder="Enter Kilometers used"
              label="Total Kilometers used *"
              v-model="form.kilometers"
              :error="checkValidation('kilometers')"
            ></input-component>

            <input-component
              size="33"
              v-if="form.auto_type == 'Used'"
              label="Year Purchased (Age) *"
              custom="true"
              :error="checkValidation('year')"
            >
              <VueDatePicker
                v-model="form.year"
                color="#f47320"
                placeholder="Year purchased (Age )"
                button-validate="Ok"
                button-cancel="Cancel"
                validate
              />
            </input-component>
          </div>
        </div>
      </form-section>

      <!-- Product Categories & Features Options- Only for Accessories -->
      <product-categories-component
        v-if="form.category === 'Accessories And Spare Parts'"
        number="3"
        title="Auto Categories"
        :action_type="form.action_type"
        :categories.sync="form.categories"
        :allCategoriesSelected.sync="form.allCategoriesSelected"
        :error="checkValidation('allCategoriesSelected')"
        :item_length.sync="form.item_length"
        :item_width.sync="form.item_width"
        :item_height.sync="form.item_height"
        :item_weight.sync="form.item_weight"
        :brand.sync="form.brand"
        :product_attributes.sync="form.product_attributes"
        :$v="$v"
        :submitted="submitted"
      ></product-categories-component>

      <form-section number="3" title="Auto Features" v-if="sub_categories && models">
        <div class="mb_tab_two mob_auto_features desktop_mb_minus10">
          <div
            class="md-layout md-gutter mt-4 md-alignment-center-center"
            v-if="form.category"
          >
            <input-component
              label="Auto Brand (Make) *"
              custom="true"
              :error="checkValidation('sub_category')"
            >
              <vSelect
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
            </input-component>
            <input-component
              label="Auto Model *"
              custom="true"
              :error="checkValidation('model')"
              class="mb_mt_10"
            >
              <vSelect
                v-model="form.model"
                label="name"
                :reduce="(element) => element.name"
                :options="models"
                placeholder="Select Auto Model"
                taggable
                push-tags
              >
              </vSelect>
            </input-component>
          </div>

          <div
            class="md-layout md-gutter mt-4 md-alignment-center-left mb_mt_5"
            v-if="features"
          >
            <input-component
              :label="feature.key.replaceAll('_', ' ')"
              custom="true"
              v-for="(feature, index) in features"
              :key="index"
              :size="33"
              :error="checkValidation(`${feature.key}`)"
              class="mb_mt_5"
            >
              <v-select
                v-model="form[`${feature.key}`]"
                :options="feature.values"
                :placeholder="CombinesStrings('Select ', feature.key)"
                taggable
                push-tags
              >
              </v-select>
            </input-component>
          </div>
        </div>
      </form-section>

      <!-- Auto Extra Features -->
      <form-section number="4" title="Extra Auto Features">
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-left mb_three_tab mb_mb_5 desktop_mb_5"
        >
          <input-component
            label="Add Extra Auto Features"
            custom="true"
            :error="this.submitted && this.$v.form.auto_features.$invalid"
          >
            <vSelect
              v-model="form.auto_features"
              label="name"
              :reduce="(x) => x.name"
              multiple
              :options="auto_features_list"
              placeholder="Eg: FM Radio, 4 wheel drive"
            >
            </vSelect>
          </input-component>
        </div>
      </form-section>

      <!-- Pricing -->
      <form-section number="3" title="Auto Pricing">
        <!-- <div class="md-layout md-gutter mt-4 md-alignment-center-center">
          <input-component label="Select Pricing Type *" custom="true">
            <div class="limitRadio">
              <md-radio v-model="form.pricing_type" value="all" checked
                >All</md-radio
              >
              <md-radio v-model="form.pricing_type" value="show_pricing" checked
                >Show Pricing</md-radio
              >
              <md-radio v-model="form.pricing_type" value="quotation" checked
                >Quotation</md-radio
              >
            </div>
          </input-component>
        </div> -->
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-center mb_tab_three mb_mb_0 desktop_mb_5"
        >
          <input-component
            label="Currency *"
            custom="true"
            :error="checkValidation('currency')"
            class="mt_currency"
          >
            <vSelect
              v-model="form.currency"
              :reduce="(element) => element.currency"
              label="currency"
              :options="currencies"
              placeholder="Select Currency"
            >
            </vSelect>
          </input-component>
          <input-component
            custom="true"
            label="Auto Price *"
            :error="checkValidation('price')"
            class="mb_mt_10"
          >
            <currency-input
              class="c-formInput c-form-placeholder"
              v-model="form.price"
              :distraction-free="false"
              :currency="form.currency"
              locale="en-US"
            />
          </input-component>
          <input-component
            custom="true"
            label="Offer price"
            :error="this.submitted && this.$v.form.offerprice.$invalid"
            errorMessage="Offer price should be less than Auto Price."
            class="mb_mt_5"
          >
            <currency-input
              class="c-formInput c-form-placeholder"
              placeholder="Offer price"
              v-model="form.offerprice"
              :distraction-free="false"
              :currency="form.currency"
              locale="en-US"
            />
          </input-component>

          <input-component
            type="number"
            placeholder="VAT(%)"
            label="VAT(%) *"
            :error="checkValidation('vat')"
            v-model="form.vat"
            class="mb_mt_5"
          ></input-component>
        </div>
      </form-section>

      <!-- Payment Method -->
      <form-section number="4" title="Auto Payment">
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-center mb_autopayment desktop_mb_5"
        >
          <input-component
            label="Payment Method *"
            custom="true"
            :error="checkValidation('payment_method')"
          >
            <vSelect
              v-model="form.payment_method"
              label="Payment Method"
              :options="['Cash', 'Cheque', 'Online', 'Bank Transfer']"
              placeholder="Payment Method"
            >
            </vSelect>
          </input-component>
          <input-component
            v-if="form.payment_method == 'Cheque'"
            type="text"
            placeholder="No. Of Cheques *"
            label="No of Cheques*"
            :error="checkValidation('no_of_cheques')"
            v-model="form.no_of_cheques"
            class="mb_mt_10"
          ></input-component>
          <input-component
            v-if="form.payment_method == 'Cheque'"
            label="Payment Term *"
            custom="true"
            :error="checkValidation('payment_plan')"
            class="mb_mt_5"
          >
            <vSelect
              v-model="form.payment_plan"
              label="Payment Plan"
              taggable
              push-tags
              :options="[
                '1 months',
                '2 months',
                '3 months',
                '4 months',
                '5 months',
                '6 months',
                '7 months',
                '8 months',
                '9 months',
                '10 months',
                '11 months',
                'Yearly',
              ]"
              placeholder="Payment Plan"
            >
            </vSelect>
          </input-component>
        </div>
      </form-section>

      <!-- Auto Tags -->
      <form-section number="7" title="Auto Tags">
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-center mb_three_tab mb_mb_5 desktop_mb_5"
          v-if="autoTags"
        >
          <input-component label="Add Tags for Auto" custom="true">
            <v-select
              v-model="form.tags"
              placeholder="Add your custom Tags"
              taggable
              multiple
            />
          </input-component>
        </div>
      </form-section>

      <!-- Auto Contact Details -->
      <form-section number="8" title="Add Contact Details">
        <div class="mb_three_tab mb_mb_5 mb_mt_contact desktop_mb_5">
          <div class="md-layout md-gutter mt-4 md-alignment-center-center">
            <input-component
              label="Add Current Location *"
              custom="true"
              :error="checkValidation('latitude')"
              errorMessage="Kindly Mark the location pointer by clicking on the Map."
            >
              <GoogleMap
                @mapHandler="onClickAddMap"
                :locateButton="false"
                height="250px"
                :autoSetMarker.sync="mapMarkers"
                :autoSetInfo.sync="form.address"
              >
              </GoogleMap>
            </input-component>
          </div>
          <div class="md-layout md-gutter mt-4 md-alignment-center-center">
            <input-component
              type="text"
              placeholder="Contact Name *"
              label="Contact Name *"
              v-model="form.contact_name"
              :error="checkValidation('contact_name')"
              class="mb_mt_contact"
            ></input-component>
            <input-component
              label="Contact Number"
              custom="true"
              :error="checkValidation('contact_number')"
              class="mb_mt_5"
            >
              <vue-tel-input
                v-model="form.contact_number"
                placeholder="Mobile"
                :enabledCountryCode="true"
                :validCharactersOnly="true"
              ></vue-tel-input>
            </input-component>
          </div>
          <div class="md-layout md-gutter mt-4 md-alignment-center-center">
            <input-component
              type="text"
              placeholder="Address *"
              label=" Address *"
              v-model="form.address"
              :error="checkValidation('address')"
              class="mb_mt_contact"
            ></input-component>
            <input-component
              type="text"
              placeholder="Email *"
              label="Email *"
              v-model="form.contact_email"
              :error="checkValidation('contact_email')"
              class="mb_mt_5"
            ></input-component>
          </div>
          <div class="md-layout md-gutter mt-4 md-alignment-center-center mb_mt_5">
            <input-component
              label="Country *"
              custom="true"
              :error="checkValidation('location_country')"
            >
              <vSelect
                v-model="form.location_country"
                :reduce="(element) => element.name"
                label="name"
                :options="currencies"
                placeholder="Select Country"
                @input="countrySelected"
                autocomplete="off"
              >
              </vSelect>
            </input-component>
            <input-component
              label="City *"
              custom="true"
              :error="checkValidation('location_city')"
              class="mb_mt_10"
            >
              <vSelect
                v-model="form.location_city"
                :reduce="(element) => element.location"
                label="location"
                :options="citiesList"
                :placeholder="citiesStatus"
                @input="citySelected"
              >
              </vSelect>
            </input-component>
            <input-component
              label="Area *"
              custom="true"
              :error="checkValidation('location_area')"
              class="mb_mt_10"
            >
              <vSelect
                v-model="form.location_area"
                :reduce="(element) => element.location"
                label="location"
                :options="areasList"
                :placeholder="areaStatus"
              >
              </vSelect>
            </input-component>
          </div>
        </div>
      </form-section>

      <!-- Auto Product Visibility -->
      <form-section number="9" title="Product Visibility">
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-center mb_three_tab mb_mb_minus5 desktop_mb_minus10"
        >
          <input-component
            label="Select Product Visibility *"
            custom="true"
            :error="checkValidation('visibility')"
          >
            <div class="limitRadio">
              <md-radio
                v-model="form.visibility"
                v-for="(el, id) in product_visibility"
                :key="id"
                :value="el.value"
                checked
              >
                {{ el.title }}
              </md-radio>
            </div>
          </input-component>
        </div>
      </form-section>

      <!-- Auto Product Images -->
      <form-section number="10" title="Add Product Images">
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-center mb_mt_10 desktop_mb_5"
        >
          <input-component
            custom="true"
            :error="this.submitted && this.$v.RealArray.$invalid"
            errorMessage="Kindly add at least one Image."
          >
            <div class="uploadWrap">
              <div class="add-meadia-bx">
                <div>
                  <div v-if="isCropped">
                    <Cropper
                      :restrictions="pixelsRestriction"
                      :src="img"
                      @change="change"
                    ></Cropper>
                    <div class="save-image">
                      <button
                        class="md-button md-raised md-accent md-theme-default"
                        @click="saveImage"
                      >
                        Save
                      </button>
                      <button
                        class="md-button md-raised md-accent md-theme-primary"
                        @click="CancelCrop"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  <div v-if="before_crop" class="mb-3">
                    <div class="img-selected-wrapper">
                      <div
                        class="selected-images"
                        v-for="(img, index) in InitialArray"
                        :key="index"
                      >
                        <img :src="img" />

                        <span
                          class="material-icons removeIco"
                          @click="delete_image(index)"
                          >close</span
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="uploader-box">
                  <div @click="chooseFile" v-if="ShowChooseFile">
                    <div class="choose-file-btn md-button md-theme-default">
                      <input
                        type="file"
                        ref="file"
                        style="display: none"
                        v-on:change="chooseImage($event)"
                      />
                      Add Files
                      <i class="material-icons">add</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </input-component>
        </div>
      </form-section>

      <!-- Auto Product Information -->
      <form-section number="11" title="Product Description">
        <div
          class="md-layout md-gutter mt-4 md-alignment-center-center mb_mt_10 mb_mb_10 desktop_mb_5"
        >
          <input-component
            label="Add Auto Description.*"
            custom="true"
            :error="this.submitted && !this.$v.information.required"
          >
            <vue-editor
              :editor-toolbar="customToolbar"
              v-model="information"
            ></vue-editor>
          </input-component>
        </div>
      </form-section>

      <form-section
        number="12"
        title="Error Submitting Form"
        v-if="submitted && $v.$invalid"
      >
        <div class="d-inline-flex align-center" style="color: #e01e5a; margin: 10px">
          There are some fields missing, kindly fill up them.
        </div>
      </form-section>
      <div class="btn-wrap text-center">
        <loaderButton
          :disabled="submitted && $v.$invalid"
          @click="submitForm"
          name="Add Auto"
          :loading="loading"
          class="text_addauto"
        ></loaderButton>
      </div>
    </div>
  </div>
</template>

<script>
import formSection from "./components/formSection.vue";
import {
  Cars,
  AccessoriesAndSpareParts,
  Boats,
  Motorcycles,
} from "./components/validations.js";
import inputComponent from "@/components/ui-components/input.vue";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";
import pricingAndPaymentMethod from "./components/pricingAndPaymentMethod";
import country from "@/helpers/country.js";
import utils from "@/helpers/utils.js";
import loader from "@/components/pages/profileDashboard/components/loader.vue";

import productCategoriesComponent from "./components/productCategories.vue";
import loaderButton from "@/components/ui-components/loader-button.vue";
import GoogleMap from "@/components/pages/newsfeed/google-map";

import axios from "axios";

import vSelect from "vue-select";
import { mapState } from "vuex";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import { VueEditor } from "vue2-editor";
import { CurrencyInput } from "vue-currency-input";
import {
  required,
  maxLength,
  minLength,
  maxValue,
  numeric,
} from "vuelidate/lib/validators";

export default {
  name: "addAuto",
  // country - For Country, City, Area Selection.
  // Utils - GetFileUrls(), fetchAndAssign()
  mixins: [country, utils],
  components: {
    inputComponent,
    breadcrumbs,
    loaderButton,
    productCategoriesComponent,
    GoogleMap,
    formSection,
    loader,

    vSelect,
    CurrencyInput,
    Cropper,
    VueEditor,
  },
  validations() {
    var fields = {
      name: {
        required,
        maxLength: maxLength(50),
      },

      auto_type: {
        required,
      },
      auto_purpose: {
        required,
      },

      visibility: {
        required,
      },
      payment_method: {
        required,
      },

      //Payment
      price: {
        required,
      },
      offerprice: {
        maxValue: maxValue(parseInt(this.form.price)),
      },
      currency: {
        required,
      },
      vat: {
        required,
      },

      // Contact Details
      contact_name: {
        required,
      },
      contact_number: {
        required,
        minLength: minLength(8),
      },
      contact_email: {
        required,
      },
      address: {
        required,
      },
      location_country: {
        required,
      },
      location_city: {
        required,
      },
      location_area: {
        required,
      },
      latitude: {
        required,
      },
      longitude: {
        required,
      },
      // Extra Auto Features
      auto_features: {
        required,
        minLength: minLength(1),
      },
    };

    // Changes Depending Upon Category -> Default category is "Cars"
    //1. Accessories And Spare Parts - for this we dont have Kilometers
    if (
      this.form.auto_type === "Used" &&
      this.form.category != "Accessories And Spare Parts"
    ) {
      fields.year = {
        required,
      };
      fields.kilometers = {
        required,
      };
    } else {
      //2. All the other Categories it's Same.-> Cars + Boats + Heavy Vehicles
      fields.year = {
        required,
      };
    }
    // 3. Auto Features -> Category - Cars + Heavy Vehicles
    if (this.form.category === "Cars" || this.form.category === "Heavy Vehicles") {
      fields = { ...fields, ...Cars };
      // fields.body_type = {
      //   required
      // };
      // fields.doors = {
      //   required
      // };
      // fields.cylinders = {
      //   required
      // };
      // fields.horsepower = {
      //   required
      // };
      // fields.transmission_type = {
      //   required
      // };
      // fields.color = {
      //   required
      // };
      // fields.warranty = {
      //   required
      // };
      // fields.fuel_type = {
      //   required
      // };
      // fields.regional_specs = {
      //   required
      // };

      // // Auto Features statically added
      // fields.body_condition = {
      //   required
      // };
      // fields.mechanical_condition = {
      //   required
      // };
      // fields["length"] = {
      //   required
      // };
      // fields.wheels = {
      //   required
      // };
      // fields.capacity = {
      //   required
      // };
      // fields.engine_size = {
      //   required
      // };
      // fields.drive_system = {
      //   required
      // }
    }
    // 4. Auto Features -> Category - Accessories And Spare Parts
    if (this.form.category === "Accessories And Spare Parts") {
      fields = { ...fields, ...AccessoriesAndSpareParts };
    }
    // 5. Auto Features -> Category - Boats
    if (this.form.category === "Boats") {
      fields = { ...fields, ...Boats };
    }
    // 6. Auto Features -> Category - Motorcycles
    if (this.form.category === "Motorcycles") {
      fields = { ...fields, ...Motorcycles };
    }
    if (this.models.length > 0) {
      fields.model = {
        required,
      };
    }
    if (this.sub_categories && this.sub_categories.length > 0) {
      fields.sub_category = {
        required,
      };
    }
    if (this.form.payment_method == "Cheque") {
      fields.no_of_cheques = {
        required,
      };
      fields.payment_plan = {
        required,
      };
    }

    // if (this.form.pricing_type !== "quotation") {
    //   fields.price = {
    //     required
    //   };
    //   fields.offerprice = {
    //     maxValue: maxValue(parseInt(this.form.price))
    //   };
    //   fields.currency = {
    //     required
    //   };
    //   fields.vat = {
    //     required
    //   };
    // }

    return {
      form: {
        ...fields,
      },
      RealArray: {
        required,
        minLength: minLength(1),
      },
      information: {
        required,
      },
    };
  },

  data() {
    return {
      // Product Update
      productId: "",
      productDetails: "",

      loader: false, // PreLoader - only used while Update PRoduct
      loading: false,
      submitted: false,
      productInfo: true,
      autoCategories: true,
      autoFeatures: false,
      extraAutoFeatures: true,
      autoPricing: true,
      autoPaymentMethod: true,
      autoTags: true,
      autoContactDetails: true,
      autoProductVisibility: true,
      autoProductImages: true,
      autoProductInformation: true,

      breadcrumbs: [
        {
          title: this.demandOrSupplyPrefix() + " New Items",
          link: "/dashboard/vendor/addnewitems",
        },
        {
          title: this.$route.query.market_type,
          link: "/dashboard/vendor/add?market_type=" + this.$route.query.market_type,
        },
        {
          title: this.demandOrSupplyPrefix() + " Autos",
          link: "/dashboard/vendor/auto?market_type=" + this.$route.query.market_type,
        },
        {
          title: this.$route.query.productId
            ? `Update ${this.$route.query.category.slice(0, -1)}`
            : this.demandOrSupplyPrefix() + this.$route.query.category.slice(0, -1) + "",
          link: "/dashboard/vendor/addCar?market_type=" + this.$route.query.market_type,
        },
      ],
      // Custom Toolbar Vue-Editor
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
      ],
      categories: [],
      sub_categories: [],
      models: [],
      features: [],
      auto_features_list: [],
      currencies: [],

      citiesList: [],
      citiesStatus: "Select City",
      areasList: [],
      areaStatus: "Select Area",
      product_visibility: [
        {
          title: "Public",
          value: "Public",
        },
        {
          title: "Private",
          value: "Private",
        },
        {
          title: "Company",
          value: "Company",
        },
        {
          title: "Personal",
          value: "Personal",
        },
      ],
      // Upload Image Fields

      before_crop: true,
      isCropped: false,
      ShowChooseFile: true,
      IsDisabledUpload: false,
      files: [],
      InitialArray: [],
      RealArray: [],
      temp: "",
      mapMarkers: {},
      featuresValidation: {},
      information: "",
      form: {
        action_type: "add",
        market_type: "supply",
        product_type: "auto",
        category: "Cars",
        name: this.$route.query.name,
        brand: "asas",
        make: "asas",
        manufacturer: "asas",
        sub_category: { name: this.$route.query.brand },
        model: this.$route.query.model,
        auto_type: this.$route.query.type,
        auto_purpose: this.$route.query.purpose,
        year: new Date(),
        kilometers: this.$route.query.kilometers,
        usage: "",
        pricing_type: "show_pricing",
        price: 0,
        offerprice: 0,
        currency: "AED",
        vat: "",
        payment_method: "",
        no_of_cheques: "",
        payment_plan: "",
        tags: [],
        visibility: "Public",

        information: "",
        files: [],
        auto_features: [],
        contact_name: "",
        contact_number: "",
        contact_email: "",
        address: "",
        latitude: "",
        longitude: "",
        location_country: "",
        location_area: "",
        location_city: "",
        // Auto Features From API
        age: "",
        body_type: this.$route.query.body_type,
        doors: this.$route.query.doors,
        cylinders: this.$route.query.cylinders,
        horsepower: this.$route.query.horsepower,
        transmission_type: this.$route.query.transmission_type,
        color: this.$route.query.color,
        warranty: this.$route.query.warranty,
        fuel_type: this.$route.query.fuel_type,
        regional_specs: this.$route.query.regional_specs,
        // Auto Features statically added
        body_condition: this.$route.query.body_condition,
        mechanical_condition: this.$route.query.mechanical_condition,
        length: this.$route.query.length,
        wheels: this.$route.query.wheels,
        capacity: this.$route.query.capacity,
        engine_size: this.$route.query.engine_size,
        usage: "",
        drive_system: this.$route.query.drive_system,

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
  created() {
    // this.fetchAndAssign("api_auto_types", {}, "categories");
    // Get Currency From API
    this.form.market_type = this.$route.query.market_type;
    this.assignCategory();
  },
  computed: {
    // mainUser: (state) => state.profile,
  },
  methods: {
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
          if (this.$v.form[el].$invalid) {
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
.desktop_mb_minus15 {
  margin-bottom: -15px !important;
}
.desktop_mb_minus10 {
  margin-bottom: -10px !important;
}
.desktop_mb_5 {
  margin-bottom: 5px !important;
}

.text_addauto {
  width: 125px !important;
}

/* Main Add Car Title */
.page-title {
  margin-top: 10px;
  margin-bottom: 15px;
}
.breadcrums {
  font-size: 18px !important;
}
.adding-box-wrap {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.frm-hdr-1 {
  margin-bottom: 1.7em;
  display: flex;
  align-items: center;
}

.frm-hdr-1-txt {
  color: #2a3234;
  font-weight: 500;
  font-size: 18px;
}

/* Radio Buttons */
.limitRadio {
  display: flex;
  margin-bottom: 1em;
}
.limitRadio .md-radio {
  border: 1px solid #ddd;
  height: 35px;
  border-radius: 19px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 13px;
  margin-right: 1em;
}
/* Manage Shipping Button */
.addWrap {
  display: inline-flex;
  margin-right: 1.77em;
}

.Manageshipping {
  display: flex;
  align-items: center;
}
.Manageshipping button {
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.Manageshipping i {
  font-size: 18px;
}
.addBtn {
  height: 31px;
  width: auto;
}
/* stock Location */
.stockLocation {
  text-align: left;
  line-height: 1.4;
  margin-top: 5px;
  padding: 11px;
  background-color: #f3f6f9;
  border-radius: 2px;
}
.stockLocation li {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
  font-size: 14px;
}
.stockLocation li span {
  width: 100%;
  max-width: 200px;
  color: #878787;
}

/* Add Images */
.uploadWrap {
  max-width: 100%;
  margin: 0 auto;
}
.add-meadia-bx {
  border: 1.4px dotted #d2d2d2;
  padding: 11px;
  margin: 0;
  overflow: hidden;
}

.save-image {
  padding: 10px 0px;
}
.save-image button {
  height: 33px;
  min-width: 71px;
}
.img-selected-wrapper {
  display: block;
  justify-content: center;
}
.selected-images {
  max-width: 105px;
  min-height: 105px;
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 7.5px;
  float: left;
  margin-bottom: 7.5px;
}
.selected-images img {
  border-radius: 6px;
  bottom: 0px;
  height: 100%;
  left: 0px;
  opacity: 1;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100%;
}
.selected-images {
  transition: all 0.2s;
}
.selected-images:after {
  content: "";
  height: 100%;
  position: absolute;
  transition: all 0.2s;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
}
.selected-images:hover::after {
  background-color: rgba(255, 255, 255, 0.5);
}
.removeIco {
  position: absolute;
  background: #fff;
  border-radius: 3px;
  padding: 1px;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  color: #ff5722;
  cursor: pointer;
}
.selected-images:hover .removeIco {
  opacity: 1;
}
.uploader-box {
  display: flex;
  justify-content: center;
  float: left;
  width: 100%;
}
.uploader-box div {
  width: 100%;
  margin-top: 5px;
}
.choose-file-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 39px;
  color: #ff5722;
  background-color: rgba(255, 87, 34, 0.12);
  padding: 0;
  padding-left: 9px;
  padding-right: 5px;
}
.choose-file-btn i {
  font-size: 20px;
  margin-left: 2px;
}

@media screen and (max-width: 768px) {
  .mt_calendar {
    margin-top: 11px;
  }
  .addBtn {
    margin-left: 8px !important;
  }
  .mob_margin_info {
    margin-top: 9px !important;
  }

  .margin_gutter {
    margin-bottom: -0px !important;
    margin-top: 10px !important;
  }

  /*.pillWrap{display: block;}
.radio-pill{width:48%; float: left; margin-bottom: 5px;}*/
  .inline-through {
    margin-bottom: 0px;
  }

  .limitRadio {
    margin-bottom: 0;
  }

  .left_align {
    clear: left;
  }
  .mr-mob {
    margin-right: 0px !important;
  }
  .frm-hdr-1-txt {
    font-size: 14px;
  }
  .c-formLabel {
    font-size: 12px !important;
  }

  .wrapIn {
    padding: 15px;
    padding-top: 5px;
    padding-bottom: 15px;
    margin-bottom: 20px;
  }

  .input_vat input {
    padding-bottom: 18px !important;
  }
  .padding_mob {
    padding-left: 0px;
    padding-right: 0px;
  }

  .breadcrumb-title {
    font-size: 13px;
  }

  .md-radio .md-radio-label {
    font-size: 12px !important;
    padding-left: 5px !important;
  }
  .limitRadio .md-radio {
    width: 100%;
  }
  .pb_textarea {
    padding-bottom: 0px;
  }
  .pb_textarea .editr-bx-tp-1 {
    margin-bottom: 13px;
  }
  .pb_category {
    padding-bottom: 15px;
  }
  .category {
    padding: 10px 5px 10px;
  }
  .c-formSearch {
    margin: 7px 0;
  }

  .Manageshipping i {
    padding-right: 3px;
  }
  .label {
    font-size: 13px;
  }
  .shipAddress li span {
    font-size: 13px;
  }

  .shipAddress li {
    font-size: 13px;
  }
  .margin_delivery {
    margin-left: -8px !important;
    margin-right: -8px !important;
  }
  .mt_mob_category {
    margin-left: -5px !important;
    margin-right: -5px !important;
  }

  .mrgn_category_tab {
    margin-left: -5px !important;
    margin-right: -5px !important;
  }

  .mb_tab {
    margin-bottom: -15px;
  }
  .mb_tab_two {
    margin-bottom: -10px;
  }
  .mb_tab_three {
    margin-bottom: -2px !important;
  }
  .mt-0-tab {
    margin-top: 0px !important;
  }
  .desktop_mb_5 {
    margin-bottom: 0px !important;
  }

  .mb_three_tab {
    margin-bottom: 4px !important;
  }

  .mt_currency {
    margin-top: -5px;
  }
  .mb_visibility {
    margin-bottom: 5px;
  }
  .uploadWrap {
    margin-bottom: 5px;
    margin-top: -2px;
  }

  .selected-images {
    max-width: 81px;
    min-height: 81px;
    margin-right: 8px;
    float: left;
  }
  .add-meadia-bx {
    padding-top: 0px;
    padding-bottom: 4px;
  }
  .choose-file-btn {
    margin-left: -1px;
    margin-right: -1px;
    font-size: 13px;
  }

  .text_addauto {
    width: 110px !important;
  }
}

@media screen and (max-width: 600px) {
  .margin_unit {
    margin-top: 0px;
  }
  .mob_width {
    min-width: 100%;
    margin-top: 7px;
  }
  .padding_delivery h3 {
    font-size: 12px !important;
    margin-top: -10px !important;
  }

  .mt_mob_one {
    margin-top: 3px !important;
  }
  .mt_mob_two {
    margin-top: 8px !important;
  }
  .mob_pb_property {
    padding-bottom: 5px !important;
  }

  .mb_tab_two {
    margin-bottom: -5px !important;
    margin-top: -3px !important;
  }

  .mt_extra {
    margin-top: 10px !important;
  }
  .mb_mt_10 {
    margin-top: 10px !important;
  }
  .mb_three_tab {
    margin-bottom: 0px !important;
    margin-top: 10px !important;
  }

  .margin_offerprice {
    margin-top: 5px !important;
  }
  .margin_vat {
    margin-top: 5px !important;
  }

  .mt_payment {
    margin-top: 10px !important;
  }
  .mt_agree {
    margin-top: 10px !important;
  }
  .mt_term {
    margin-top: 7px !important;
  }
  .mt_location {
    margin-top: 5px !important;
  }
  .mt_contact {
    margin-top: 10px !important;
  }
  .mb_visibility {
    margin-bottom: -10px !important;
    margin-top: 10px !important;
  }
  .btn-wrap.text-center {
    margin-bottom: -25px !important;
  }
  .selected-images {
    max-width: 70px;
    min-height: 70px;
    margin-right: 8px;
  }

  .pb_file {
    margin-bottom: -5px !important;
  }

  .margin_gutter {
    margin-bottom: -0px !important;
    margin-top: 0px !important;
  }
  .mt_details .md-size-33 {
    margin-top: 5px !important;
  }

  .mt_details .margin_refrence {
    margin-top: 1px !important;
  }

  .mt_pillwrap {
    margin-top: 3px;
  }
  .mt_pillwrap_two {
    margin-top: 3px;
    margin-bottom: -8px;
  }

  .category {
    padding: 7px 0px 7px;
    min-width: 100%;
  }
  .pillWrap {
    display: block;
  }
  .radio-pill {
    width: 100%;
    margin-bottom: 10px;
    height: 35px;
  }
  .limitRadio {
    display: block;
    margin-bottom: 0em;
  }
  .limitRadio .md-radio {
    margin-bottom: 10px;
  }

  .frm-hdr-1-txt {
    font-size: 10px;
  }

  .page-title {
    margin-top: 0px;
    margin-bottom: 14px;
  }

  .wrapIn {
    padding: 10px;
    padding-top: 3px;
  }

  .sectionTitle {
    padding: 0px 0;
    font-size: 11px;
  }

  .mob_margin_info {
    margin-top: 3px !important;
  }

  .c-formLabel {
    font-size: 11px !important;
  }
  .c-form fieldset {
    margin: 0rem 0 !important;
  }
  .pl_mob {
    padding-left: 0px;
  }

  .adding-box-1-cnt.wrapIn .md-radio .md-radio-label {
    font-size: 11px !important;
    line-height: 21px;
  }
  .label {
    font-size: 11px;
  }
  .mt_mob_category {
    margin-top: 9px;
  }

  .productAttributes {
    margin-top: 8px !important;
    font-size: 10px;
  }

  .productAttributes {
    margin-left: -4px;
    margin-right: -4px;
  }
  .c-formLabel {
    margin-top: 3px !important;
  }

  .margin_delivery .c-formLabel {
    margin-top: 47px !important;
  }

  .margin_delivery .md-layout-item.md-xsmall-size-100 {
    margin-top: 3px;
  }
  .padding_delivery {
    padding-top: 2px;
    padding-bottom: 4px;
  }
  .border_delivery {
    margin-top: 0px;
  }
  .attribute h3 {
    margin-top: 7px;
  }
  .note {
    font-size: 11px;
    padding: 10px;
    font-weight: 400;
    line-height: 14px;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .mb {
    margin-bottom: 5px !important;
  }

  .wrapIn {
    margin-bottom: 10px;
    box-shadow: 0 0px 8px 0 rgba(153, 153, 153, 0.2);
  }

  .productAttributes.margin_delivery {
    margin-bottom: -5px;
  }

  .dblock_mob {
    display: block !important;
  }

  .mob_margin_price {
    margin-top: 12px !important;
  }
  .mob_margin_price_two {
    margin-top: -2px;
  }

  .mob_margin_price .c-form fieldset {
    margin: 6px 0 !important;
    margin-bottom: 0px !important;
  }
  .tall-box .vs__dropdown-toggle {
    height: 35px !important;
  }
  .input_vat input {
    padding-bottom: 0px !important;
    padding-top: 0px !important;
  }
  .Manageshipping i {
    font-size: 18px;
    margin-right: 0gitpx;
  }
  .Manageshipping button {
    margin: 0px;
  }

  .c-formSearch {
    margin-top: -12px;
  }

  .shipAddress li {
    font-size: 11px;
  }

  .mt_product_img {
    margin-top: 2px !important;
  }
  .pb_textarea .editr-bx-tp-1 {
    margin-bottom: 0px;
    margin-top: 3px;
  }

  .choose-file-btn {
    font-size: 11px;
    height: 28px;
  }
  .choose-file-btn i {
    font-size: 18px;
    margin-left: 2px;
  }
  .md-button-content {
    font-size: 11px !important;
  }
  .text_add {
    font-size: 10px !important;
  }
  .btnWrap {
    height: 30px;
    margin-bottom: -20px;
  }

  .mt_calendar .c-formLabel {
    margin-top: 8px !important;
  }

  .mt_mob_category {
    margin-left: 0px;
    margin-right: 0px;
  }
  .mrgn_category_tab {
    margin-left: 0px;
    margin-right: 0px;
  }

  .c-formSearch {
    margin-top: 0px;
    margin-bottom: 15px;
  }
  .margin_delivery {
    margin-left: -4px !important;
    margin-right: -3px !important;
  }
  .shipAddress li span {
    font-size: 12px;
  }

  .form-section-title {
    padding: 0px 0;
    font-size: 11px;
  }
  .form-section {
    padding: 10px;
    padding-top: 3px;
    margin-bottom: 10px;
    padding-bottom: 14px;
  }
  .date_picker {
    margin-top: 0px;
    margin-bottom: 10px;
  }
  .margin_area {
    margin-top: 5px;
  }

  .margin_bedrooms {
    margin-top: 0px;
  }

  .margin_amenities {
    margin-top: 9px;
  }

  button.md-button.md-theme-default.md-raised.md-accent {
    height: 36px !important;
    margin-top: 8px !important;
  }
  .mob_auto_details {
    margin-top: -5px !important;
    margin-bottom: 10px;
  }

  .mob_auto_features {
    margin-top: -5px !important;
    margin-bottom: 0px !important;
  }

  .mb_mb_5 {
    margin-bottom: 5px !important;
  }
  .mb_mb_0 {
    margin-bottom: 0px !important;
  }

  .mb_autopayment {
    margin-top: 10px !important;
    margin-bottom: 5px !important;
  }

  .mb_mt_0 {
    margin-top: 0px !important;
  }
  .mb_mt_5 {
    margin-top: 5px !important;
  }

  .mb_mt_contact {
    margin-top: -5px !important;
  }
  .mb_mb_minus5 {
    margin-bottom: -5px !important;
  }
  .mb_mb_10 {
    margin-bottom: 5px !important;
  }
}

@media screen and (max-width: 360px) {
  .selected-images {
    max-width: 68px;
    min-height: 68px;
    margin-right: 8px;
  }
}

@media screen and (max-width: 300px) {
  .frm-hdr-1-txt {
    font-size: 10px;
    margin-left: 0px;
    width: 100%;
    max-width: 100%;
  }
  button.md-button.md-theme-default.md-raised.md-accent {
    height: 34px !important;
  }
  .selected-images {
    max-width: 67px;
    min-height: 67px;
    margin-right: 8px;
  }

  .sectionTitle {
    margin-top: -5px !important;
  }
  button.md-button.md-theme-default.md-raised.md-accent {
    /* width: 100px; */
    padding-left: 10px;
    padding-right: 10px;
    height: 30px;
    margin-bottom: -50px !important;
  }
  .adding-box-wrap {
    margin-left: -22px;
  }
  .width_100 {
    min-width: 100%;
  }

  .wrapIn {
    padding: 10px;
  }
  .frm-hdr-1-txt {
    color: #2a3234;
    font-weight: 500;
    font-size: 18px;
    margin-left: 17px;
  }
  .padding_mob {
    padding-left: 22px !important;
  }
  .adding-box-1-cnt {
    width: 100%;
  }
  .frm-hdr-1-txt {
    font-size: 10px;
    margin-left: 0px;
  }

  .text_add {
    font-size: 11px !important;
    margin-right: 2px !important;
  }

  .btn-wrap.text-center {
    margin-bottom: 0px !important;
  }
}
</style>
