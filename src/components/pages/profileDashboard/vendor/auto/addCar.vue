//TODO: Abhishek----- (1) form.category convert object into name and then only
pass name to API //TODO: Abhishek----- (2) form.tags convert object into
"text"and then only pass "text" to API //TODO: Abhishek----- (3) Clean the Add
Product Images Code // NOTE: Dynamically Added to the Form //
this.form.stock_location_id = id; // this.form.location_country = country; //
this.form.location_city = city; // this.form.location_area = area;
<template>
  <div>
    <div
      class="md-layout md-gutter md-alignment-center-space-between page-title"
    >
      <div class="md-layout-item">
        <div class="frm-hdr-1-txt txt-algn-lft">
          {{ demandOrSupplyPrefix() }} Car
        </div>
      </div>
      <breadcrumbs :items="breadcrumbs"></breadcrumbs>
    </div>
    <!-- Personal Details -->

    <div>
      <!-- Product Information -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">1</span>Product Information
          </div>
          <button
            @click="toggleDiv('productInfo')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="productInfo"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="productInfo">
            <div class="md-layout md-gutter mt-4 md-alignment-center-center">
              <input-component
                type="text"
                placeholder="Enter Product name"
                label="Product Name"
                :value.sync="form.name"
              ></input-component>
            </div>
            <!-- <div class="md-layout md-gutter mt-4 md-alignment-center-center">

            </div> -->
          </div>
        </transition>
      </div>
      <!-- Product Categories -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">2</span>Auto Categories
          </div>
          <button
            @click="toggleDiv('autoCategories')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoCategories"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="autoCategories">
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
                </vSelect
              ></input-component>
              <input-component
                label="Auto Purpose *"
                custom="true"
                :error="checkValidation('auto_purpose')"
              >
                <vSelect
                  v-model="form.auto_purpose"
                  :options="['Sale', 'Rent']"
                  placeholder="Select Auto Purpose"
                >
                </vSelect
              ></input-component>
            </div>
            <div class="md-layout md-gutter mt-4 md-alignment-center-left">
              <input-component
                v-if="form.auto_type == 'Used'"
                size="33"
                type="text"
                placeholder="Enter Kilometers used"
                label="Total Kilometers used *"
                :value.sync="form.kilometers"
                :error="checkValidation('kilometers')"
              ></input-component>
              <input-component
                v-if="form.auto_type == 'Used'"
                size="33"
                type="number"
                placeholder="Usage"
                label="Usage (in years) *"
                :value.sync="form.usage"
                :error="checkValidation('usage')"
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
              /></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Auto Features -->
      <transition name="fade"
        ><div class="form-section">
          <!-- Form Title -->
          <div class="form-section-title">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">3</span>Auto Features
            </div>
            <button
              @click="toggleDiv('autoFeatures')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="form.category || autoFeatures"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <!-- Form Title -->
          <!-- Form Content -->
          <transition name="expand">
            <div v-if="form.category">
              <div class="md-layout md-gutter mt-4 md-alignment-center-center">
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
                      getAutoTypes(
                        'api_auto_types',
                        {
                          parentid: form.sub_category
                            ? form.sub_category.id
                            : '',
                        },
                        'models'
                      )
                    "
                  >
                  </vSelect
                ></input-component>
                <input-component
                  label="Auto Model *"
                  custom="true"
                  :error="this.submitted && this.$v.form.model.$invalid"
                >
                  <vSelect
                    v-model="form.model"
                    label="name"
                    :reduce="(element) => element.name"
                    :options="models"
                    placeholder="Select Auto Model"
                  >
                  </vSelect
                ></input-component>
              </div>

              <div
                class="md-layout md-gutter mt-4 md-alignment-center-left"
                v-if="features"
              >
                <input-component
                  :label="feature.key.replaceAll('_', ' ')"
                  custom="true"
                  v-for="feature in features"
                  :key="feature.id"
                  :size="33"
                  :error="checkValidation(feature.key + '')"
                >
                  <vSelect
                    v-model="form[feature.key]"
                    :label="feature.key.replaceAll('_', ' ')"
                    :options="feature.values"
                    :placeholder="CombinesStrings('Select ', feature.key)"
                  >
                  </vSelect
                ></input-component>
              </div>
              <div
                class="md-layout md-gutter mt-4 md-alignment-center-left"
                v-if="features"
              >
                <input-component
                  :label="feature.name.replaceAll('_', ' ')"
                  custom="true"
                  v-for="(feature, index) in extraFeatures"
                  :key="index"
                  :size="33"
                  :error="checkValidation(feature.name + '')"
                >
                  <vSelect
                    v-model="form[feature.name]"
                    :label="feature.name.replaceAll('_', ' ')"
                    :options="feature.options"
                    :placeholder="CombinesStrings('Select ', feature.name)"
                  >
                  </vSelect
                ></input-component>
                <input-component
                  size="33"
                  type="text"
                  placeholder="Drive System"
                  label="Drive System *"
                  :value.sync="form.drive_system"
                ></input-component>
              </div>
            </div>
          </transition></div
      ></transition>
      <!-- Auto Extra Features -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">4</span>Extra Auto Features
          </div>
          <button
            @click="toggleDiv('extraAutoFeatures')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="extraAutoFeatures"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="extraAutoFeatures">
            <div class="md-layout md-gutter mt-4 md-alignment-center-left">
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
                </vSelect
              ></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Auto Pricing -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">5</span>Auto Pricing
          </div>
          <button
            @click="toggleDiv('autoPricing')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoPricing"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="autoPricing">
            <div class="md-layout md-gutter mt-4 md-alignment-center-center">
              <input-component label="Select Pricing Type *" custom="true">
                <div class="limitRadio">
                  <md-radio v-model="pricing_type" value="show_pricing" checked
                    >Show Pricing</md-radio
                  >
                  <md-radio v-model="pricing_type" value="quotation" checked
                    >Quotation</md-radio
                  >
                </div>
              </input-component>
            </div>
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center"
              v-if="pricing_type == 'show_pricing'"
            >
              <input-component
                type="text"
                placeholder="Auto Price *"
                label="Auto Price *"
                :error="checkValidation('price')"
                :value.sync="form.price"
              ></input-component>
              <input-component
                type="text"
                placeholder="Offer price (Optional)"
                label="Offer price (Optional)"
                :error="this.submitted && this.$v.form.offerprice.$invalid"
                errorMessage="Offer price should be less than Auto Price."
                :value.sync="form.offerprice"
              ></input-component>
              <input-component
                label="Currency *"
                custom="true"
                :error="checkValidation('currency')"
              >
                <vSelect
                  v-model="form.currency"
                  :reduce="(element) => element.currency"
                  label="currency"
                  :options="currencies"
                  placeholder="Select Currency"
                >
                </vSelect
              ></input-component>
              <input-component
                type="text"
                placeholder="VAT(%)"
                label="VAT(%) *"
                :error="checkValidation('vat')"
                :value.sync="form.vat"
              ></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Auto Payment Method -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">6</span>Payment Method
          </div>
          <button
            @click="toggleDiv('autoPaymentMethod')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoPaymentMethod"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="autoPaymentMethod">
            <div class="md-layout md-gutter mt-4 md-alignment-center-center">
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
                </vSelect
              ></input-component>
              <input-component
                v-if="form.payment_method == 'Cheque'"
                type="text"
                placeholder="No. Of Cheques *"
                label="No of Cheques*"
                :error="checkValidation('no_of_cheques')"
                :value.sync="form.no_of_cheques"
              ></input-component>
              <input-component
                label="Payment Term *"
                custom="true"
                :error="checkValidation('payment_plan')"
              >
                <vSelect
                  v-model="form.payment_plan"
                  label="Payment Plan"
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
                </vSelect
              ></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Auto Tags -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">7</span>Auto Tags
          </div>
          <button
            @click="toggleDiv('autoTags')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoTags"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div
            class="md-layout md-gutter mt-4 md-alignment-center-center"
            v-if="autoTags"
          >
            <input-component label="Add Tags for Auto" custom="true">
              <v-select v-model="form.tags" taggable multiple
            /></input-component>
          </div>
        </transition>
      </div>

      <!-- Auto Contact Details -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">8</span>Add Contact Details
          </div>
          <button
            @click="toggleDiv('autoContactDetails')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoContactDetails"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="autoContactDetails">
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
                :value.sync="form.contact_name"
                :error="checkValidation('contact_name')"
              ></input-component>
              <input-component
                label="Contact Number"
                custom="true"
                :error="checkValidation('contact_number')"
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
                :value.sync="form.address"
                :error="checkValidation('address')"
              ></input-component>
              <input-component
                type="text"
                placeholder="Email *"
                label="Email *"
                :value.sync="form.contact_email"
                :error="checkValidation('contact_email')"
              ></input-component>
            </div>
            <div class="md-layout md-gutter mt-4 md-alignment-center-center">
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
                >
                </vSelect
              ></input-component>
              <input-component
                label="City *"
                custom="true"
                :error="checkValidation('location_city')"
              >
                <vSelect
                  v-model="form.location_city"
                  :reduce="(element) => element.location"
                  label="location"
                  :options="citiesList"
                  :placeholder="citiesStatus"
                  @input="citySelected"
                >
                </vSelect
              ></input-component>
              <input-component
                label="Area *"
                custom="true"
                :error="checkValidation('location_area')"
              >
                <vSelect
                  v-model="form.location_area"
                  :reduce="(element) => element.location"
                  label="location"
                  :options="areasList"
                  :placeholder="areaStatus"
                >
                </vSelect
              ></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Auto Product Visibility -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">9</span>Product Visibility
          </div>
          <button
            @click="toggleDiv('autoProductVisibility')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoProductVisibility"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="autoProductVisibility">
            <div class="md-layout md-gutter mt-4 md-alignment-center-center">
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
          </div>
        </transition>
      </div>
      <!-- Auto Product Images -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">10</span>Add Product Images
          </div>
          <button
            @click="toggleDiv('autoProductImages')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoProductImages"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="autoProductImages">
            <div class="md-layout md-gutter mt-4 md-alignment-center-center">
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
                </div></input-component
              >
            </div>
          </div>
        </transition>
      </div>
      <!-- Auto Product Information -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">11</span>Product Description
          </div>
          <button
            @click="toggleDiv('autoProductInformation')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="autoProductInformation"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="autoProductInformation">
            <div class="md-layout md-gutter mt-4 md-alignment-center-center">
              <input-component
                label="Add Auto Description.*"
                custom="true"
                :error="checkValidation('information')"
              >
                <vue-editor
                  :editor-toolbar="customToolbar"
                  v-model="form.information"
                ></vue-editor>
              </input-component>
            </div>
          </div>
        </transition>
      </div>
      <div class="btn-wrap text-center">
        <loaderButton
          @click="submitForm"
          name="Add Auto"
          :loading="loading"
        ></loaderButton>
      </div>
    </div>
  </div>
</template>

<script>
import inputComponent from "@/components/ui-components/input.vue";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";

import loaderButton from "@/components/ui-components/loader-button.vue";
import GoogleMap from "@/components/pages/newsfeed/google-map";

import axios from "axios";

import vSelect from "vue-select";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import { VueEditor } from "vue2-editor";
import {
  required,
  maxLength,
  minLength,
  maxValue,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "addCar",
  components: {
    inputComponent,
    breadcrumbs,
    loaderButton,
    GoogleMap,

    vSelect,
    Cropper,
    VueEditor
  },
  validations () {
    const fields = {
      name: {
        required,
        maxLength: maxLength(50)
      },
      information: {
        required
      },
      auto_type: {
        required
      },
      auto_purpose: {
        required
      },
      sub_category: {
        required
      },
      model: {},
      visibility: {
        required
      },
      payment_method: {
        required
      },
      payment_plan: {
        required
      },
      // Contact Details
      contact_name: {
        required
      },
      contact_number: {
        required,
        minLength: minLength(8)
      },
      contact_email: {
        required
      },
      address: {
        required
      },
      location_country: {
        required
      },
      location_city: {
        required
      },
      location_area: {
        required
      },
      latitude: {
        required
      },
      longitude: {
        required
      },
      drive_system: {
        required
      },
      auto_features: {
        required
      },
      body_type: {
        required
      },
      doors: {
        required
      },
      cylinders: {
        required
      },
      horsepower: {
        required
      },
      transmission_type: {
        required
      },
      color: {
        required
      },
      warranty: {
        required
      },
      fuel_type: {
        required
      },
      regional_specs: {
        required
      },
      auto_features: {
        required,
        minLength: minLength(1)
      },
      // Auto Features statically added
      body_condition: {
        required
      },
      mechanical_condition: {
        required
      },
      length: {
        required
      },
      wheels: {
        required
      },
      capacity: {
        required
      },
      engine_size: {
        required
      },

      drive_system: {
        required
      },
    };

    if (this.form.auto_type == "Used") {
      fields.kilometers = {
        required
      };
      fields.year = {
        required
      };
      fields.usage = {
        required
      };
    }


    if (this["models"].length && this["models"].length != 0) {
      fields.model = {
        required
      };
    }

    if (this.form.payment_method == "Cheque") {
      fields.no_of_cheques = {
        required
      }
    }

    if (this.pricing_type == "show_pricing") {
      fields.price = {
        required
      };
      fields.offerprice = {
        maxValue: maxValue(parseInt(this.form.price))
      };
      fields.currency = {
        required
      };
      fields.vat = {
        required
      };
    }

    return {
      form: {
        ...fields
      },
      RealArray: {
        required,
        minLength: minLength(1)
      }
    };
  },

  data () {
    return {
      // Product Update
      productId: "",
      productDetails: "",

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
          link: "/dashboard/vendor/addnewitems"
        },
        {
          title: this.$route.query.market_type,
          link: "/dashboard/vendor/add?market_type=" + this.$route.query.market_type
        },
        {
          title: this.demandOrSupplyPrefix() + " Autos",
          link: "/dashboard/vendor/auto?market_type=" + this.$route.query.market_type
        },
        {
          title: this.demandOrSupplyPrefix() + " Car",
          link: "/dashboard/vendor/addCar?market_type=" + this.$route.query.market_type
        }
      ],
      extraFeatures: [
        {
          name: "body_condition",
          options: [
            "Normal Wear & Tear",
            "Perfect Inside & Out",
            "Some Parts Damaged",
            "Scratches on Body",
            "Interior Damaged"
          ]
        },
        {
          name: "mechanical_condition",
          options: ["Perfect", "Average", "Bad"]
        },
        {
          name: "length",
          options: ["Normal Length", "Medium Length (SUV)", "Long Length"]
        },
        {
          name: "wheels",
          options: [1, 2, 3, 4, 5, 6, 7, 8, "9+"]
        },
        {
          name: "capacity",
          options: [1, 2, 3, 4, 5, 6, 7, 8, "9+"]
        },
        {
          name: "engine_size",
          options: [
            "100-500 cc",
            "500-1000 cc",
            "1000-1500 cc",
            "1500-2000 cc",
            "2000+ cc"
          ]
        }
      ],
      // Custom Toolbar Vue-Editor
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      categories: [],
      sub_categories: [],
      models: [],
      features: [],
      auto_features_list: [],
      currencies: [],
      tag: "",
      pricing_type: "show_pricing",

      citiesList: [],
      citiesStatus: "Select City",
      areasList: [],
      areaStatus: "Select Area",
      product_visibility: [
        {
          title: "Public",
          value: "Public"
        },
        {
          title: "Private",
          value: "Private"
        },
        {
          title: "Only for Company",
          value: "Company"
        },
        {
          title: "Only for Personal",
          value: "Personal"
        }
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

      form: {
        action_type: "add",
        market_type: "supply",
        product_type: "auto",
        category: "Cars",
        name: "",
        brand: "asas",
        make: "asas",
        manufacturer: "asas",
        sub_category: "",
        model: "",
        auto_type: "",
        auto_purpose: "",
        year: new Date(),
        price: "",
        offerprice: "",
        currency: "",
        vat: "",
        payment_method: "",
        no_of_cheques: "",
        payment_plan: "",
        tags: [],
        visibility: "Public",
        kilometers: "",
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
        drive_system: ""
      }
    };
  },

  created () {
    // this.getAutoTypes("api_auto_types", {}, "categories");
    // Get Currency From API
    this.form.market_type = this.$route.query.market_type
    this.getAutoTypes("api_country", {}, "currencies");
    this.getAutoTypes("api_auto_features", {}, "auto_features_list");
    this.getAutoTypes("api_auto_types", { parentid: "1" }, "sub_categories");
    this.getAutoTypes(
      "api_auto_category_features",
      { categoryid: "1" },
      "features"
    );
    this.loadProductandDetails();
  },
  methods: {
    assignKeyValue (key, value) {
      this.form[key] = value;
    },
    toggleDiv (div) {
      this[div] = !this[div];
    },
    CombinesStrings (data1, data2) {
      return `${data1}${data2.replaceAll("_", " ")}`;
    },
    async getAutoTypes (url, data, property) {
      try {
        const response = await axios.post(url, data);
        const result = await response.data.result;
        this[property] = await result;
      } catch (error) {
        console.log(error);
      }
    },
    getAutoFeatures () {
      this.getAutoTypes(
        "api_auto_category_features",
        { categoryid: this.form.category ? this.form.category.id : "" },
        "features"
      );
    },
    getCountryId () {
      return this.$helpers.selectObjectFromArray(
        this.currencies,
        "name",
        this.form.location_country
      );
    },
    getCityId () {
      return this.$helpers.selectObjectFromArray(
        this.citiesList,
        "location",
        this.form.location_city
      );
    },
    async countrySelected () {
      try {
        this.citiesList = [];
        this.form.location_city = "";
        this.citiesStatus = "Loading...";
        const parentid = await this.getCountryId();
        const rawResponse = await axios.post("api_country", {
          parentid: `${parentid.pk_countries_id}`
        });
        const response = await rawResponse.data;
        if (response.success) {
          this.citiesList = response.result;
          this.citiesStatus = "Select City";
        } else {
          this.citiesList = [];
          this.citiesStatus = "No Cities Found";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async citySelected () {
      try {
        this.areasList = [];
        this.form.location_area = "";
        this.areaStatus = "Loading...";
        const parentid = await this.getCityId();
        const rawResponse = await axios.post("api_country", {
          parentid: `${parentid.pk_countries_id}`
        });
        const response = await rawResponse.data;
        if (response.success) {
          this.areasList = response.result;
          this.areaStatus = "Select Area";
        } else {
          this.areasList = [];
          this.areaStatus = "No Areas Found";
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getFileUrls () {
      if (!((await this.RealArray.length) > 0)) return "empty";
      try {
        await Promise.all(this.RealArray.map(async (file) => {
          if (typeof file === "string") return this.form.files.push(file);
          // Prepare Form Data
          let formData = await new FormData();
          await formData.append("file", file);
          // Now Send it
          const response = await axios.post("/api_fileupload_google", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          console.log("file submit", response)
          // Store The Url in files Array of Form
          await this.form.files.push(response.data.results.files[0].fileUrl);
        }));
        return "success";
      } catch (error) {
        this.loading = true;
        console.log(error);
        this.$helpers.errorPopup("Error Adding Images.");
        return "fail";
      }
    },
    async submitForm () {
      this.loading = true;
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }

      const fileresponse = await this.getFileUrls();
      console.log(fileresponse)
      if (fileresponse == "fail" || fileresponse == "empty") return

      this.form.sub_category = await this.form.sub_category.name
      this.form.brand = await this.form.sub_category;
      this.form.make = await this.form.sub_category;
      this.form.manufacturer = await this.form.sub_category;

      console.log(this.form);
      const response = await this.$store.dispatch("uploadProduct", this.form);
      console.log(response)
      if (await !response.data.success) {
        this.loading = false;
        console.log(response);
        await this.$swal.fire(this.$helpers.errorPopup("Error Adding your Auto." + response.data.message))
        return
      } else {
        this.loading = false;
        await this.$swal.fire(this.$helpers.successPopup("Your Auto has been added successfully."))
        this.$router.push("/dashboard/vendor/manage-store/auto")
        return
      }

    },
    checkValidation (field) {
      return this.submitted && !this.$v.form[field].required;
    },
    //------------  Choose Image Code -------------------------------
    chooseFile () {
      this.$refs.file.click();
    },
    CancelCrop () {
      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    saveImage () {
      this.InitialArray = [...this.InitialArray, this.temp];
      this.RealArray = [...this.RealArray, this.file];

      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    change ({ coordinates, canvas }) {
      var img = canvas.toDataURL("image/png");

      var context = canvas.getContext("2d");
      canvas.toBlob(blob => {
        var self = this;

        var objectURL = URL.createObjectURL(blob);

        self.temp = objectURL;
        self.file = blob;
      }, "image/wbmp");
    },
    chooseImage ($event) {
      const file = $event.target.files[0];
      this.img = URL.createObjectURL(file);

      var reader = new FileReader();
      var self = this;
      //Read the contents of Image File.
      reader.readAsDataURL($event.target.files[0]);

      reader.onload = function (e) {
        console.log(self.isCropped);
        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          var height = this.height;
          var width = this.width;
          if (height < 210 || width < 210) {
            alert(
              "Please choose file which has minimum height of 210 and width of 210"
            );
            return false;
          }

          self.ShowChooseFile = false;
          self.isCropped = true;

          return true;
        };
      };
    },
    delete_image (index) {
      this.InitialArray.splice(index, 1);
      this.RealArray.splice(index, 1);
      console.log(this.InitialArray);
      console.log(this.RealArray);
    },
    pixelsRestriction ({
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      imageWidth,
      imageHeight
    }) {
      return {
        minWidth: 220,
        minHeight: 220,
        maxWidth: 4000,
        maxHeight: 4000
      };
    },
    //-------------Google Maps-------------------------------------
    onClickAddMap (value) {
      console.log(value);
      const data = value.address_components;
      const addressFiltered = data.map(x => {
        return {
          name: x.long_name,
          type: x.types[0]
        };
      });

      addressFiltered.forEach(x => {
        if (x.type == "country") this.form.location_country = x.name;
        else if (x.type == "administrative_area_level_1")
          this.form.location_city = x.name;
      });
      console.log(addressFiltered);
      this.form.latitude = value.geometry.location.lat();
      this.form.longitude = value.geometry.location.lng();

      // if (data.length == 1) {
      // } else if (data.length == 2) {
      //   this.form.location_city = data[0].long_name;
      //   this.form.location_country = data[1].long_name;
      // } else if (data.length == 3) {
      //   this.form.location_area = data[0].long_name;
      //   this.form.location_city = data[1].long_name;
      //   this.form.location_country = data[2].long_name;
      // } else if (data.length == 4) {
      //   this.form.location_area = data[0].long_name;
      //   this.form.location_street = data[1].long_name;
      //   this.form.location_city = data[2].long_name;
      //   this.form.location_country = data[3].long_name;
      // } else if (data.length == 5) {
      //   this.form.location_area = data[0].long_name;
      //   this.form.location_street = data[1].long_name;
      //   this.form.location_city = data[3].long_name;
      //   this.form.location_country = data[4].long_name;
      // } else if (data.length == 6) {
      //   this.form.location_area = data[1].long_name;
      //   this.form.location_street = data[2].long_name;
      //   this.form.location_city = data[4].long_name;
      //   this.form.location_country = data[5].long_name;
      // }
      //else if (data.length == 3) {
      //   this.form.city = data[1];
      //   this.form.country = data[2];
      // } else if (data.length == 4) {
      //   this.form.city = data[2];
      //   this.form.country = data[3];
      // }

      // if()
    },
    //-------------For Auto Update---------------------------------
    async loadProductandDetails () {
      const productId = await this.$route.query.productId;
      if (!productId && this.form.action_type === 'add') return;
      this.form.item_id = productId;
      // 1. Fetch Product Details
      const res = await this.$store
        .dispatch("productDetails", productId);
      this.productDetails = await res;
      // 2. Assign action_type = 'update'
      this.form.action_type = "update";
      //3. Assign Values to Form (Prefill)
      for (const key in res) {

        //5. Price Key is diff. in DB
        if (key === 'unitprice') {
          if (res.unitprice === '0.00') {
            this.pricing_type = 'quotation'; continue;
          }
          this.pricing_type = "show_pricing"
          console.log(res.unitprice, ":sldjhskjh")
          this.form.price = await res.unitprice;
          continue;
        }

        //7. Images
        if (key === 'images') {
          this.InitialArray = await res.images.map(el => el.file);
          this.RealArray = this.InitialArray;
          continue;
        }
        if (key === 'brand') {
          this.form.sub_category = {
            id: "",
            name: res.brand
          }
          continue;
        }
        if (key === 'latitude' || key === 'longitude') {
          this.mapMarkers = {
            lat: parseFloat(res.latitude),
            lng: parseFloat(res.longitude)
          }
          continue;
        }
        //4. More Details
        if (key === 'moreDetails') {
          for (const k in res.moreDetails) {
            if (k === 'purpose') {
              this.form.auto_purpose = res.moreDetails.purpose
              continue;
            }

            if (k === 'year') {
              this.form.year = res.moreDetails.year || new Date()
              continue;
            }
            if (k === 'sub_category') {
              continue;
            }

            if (!(k in this.form)) continue;
            this.form[k] = res.moreDetails[k];
          }
          continue;
        }

        if (!(key in this.form)) continue;
        this.form[key] = await res[key];
      }
    },

  }
};
</script>

<style scoped>
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
  font-size: 22px;
}

/*-----------------Form Section---------------------- */
.form-section {
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 10px;
  padding: 21px;
  height: 100%;
  margin-bottom: 1.55em;
}

.form-section-title {
  font-size: 1.4rem;
  font-weight: 600;
  padding: 9px 0;
  text-align: left;
  border-bottom: 1px solid #eeee;
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toggleboxBtn {
  height: 25px;
  min-width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
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
  max-width: 75%;
  margin: 0 auto;
}
.add-meadia-bx {
  border: 1.4px dotted #d2d2d2;
  padding: 11px;
  margin: 0;
}

.save-image {
  padding: 10px 0px;
}
.save-image button {
  height: 33px;
  min-width: 71px;
}
.img-selected-wrapper {
  display: flex;
  justify-content: center;
}
.selected-images {
  max-width: 105px;
  min-height: 105px;
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 7.5px;
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
</style>
