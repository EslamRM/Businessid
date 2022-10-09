<template>
  <div>
    <div
      class="md-layout md-gutter md-alignment-center-space-between page-title "
    >
      <div class="md-layout-item">
        <div class="frm-hdr-1-txt txt-algn-lft">
          {{ this.$route.query.productId ? "Update" : demandOrSupplyPrefix() }}
          Property
        </div>
      </div>
      <breadcrumbs :items="breadcrumbs"></breadcrumbs>
    </div>
    <!-- Personal Details -->
    <loader v-if="loader"></loader>
    <div v-else>
      <!-- Property Information -->
      <div class="form-section pb_property">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">1</span>Property Information
          </div>
          <button
            @click="toggleDiv('propertyInfo')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyInfo"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyInfo">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_mob_two"
            >
              <input-component
                type="text"
                placeholder="Enter Property name"
                label="Property Name"
                v-model="form.name"
                :error="checkValidation('name')"
              ></input-component>
            </div>
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-left mb_tab mt_mob_one"
            >
              <input-component
                type="text"
                placeholder="Parent Company, Group Name"
                label="Listed By *"
                v-model="form.listed_by"
                :error="checkValidation('listed_by')"
                size="33"
              ></input-component>
              <input-component
                :custom="true"
                label="Property Validity *"
                size="33"
              >
                <VueDatePicker
                  class="date_picker"
                  v-model="form.till_date"
                  color="#f47320"
                  placeholder="Choose From Date"
                  button-validate="Ok"
                  button-cancel="Cancel"
                  validate
                  clearable
                  :min-date="new Date()"
              /></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Property Categories -->
      <div class="form-section pb_property ">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">2</span>Property Details
          </div>
          <button
            @click="toggleDiv('propertyType')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyType"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyType">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-left mb_tab mt_mob_one mt_details"
            >
              <input-component
                label="Property Purpose *"
                custom="true"
                :error="this.submitted && !this.$v.property_purpose.required"
                size="33"
              >
                <vSelect
                  v-model="property_purpose"
                  label="name"
                  :options="propertyPurposes"
                  @input="propertyTypeSelected($event, 1)"
                  placeholder="Select Property Purpose"
                  size="33"
                >
                </vSelect
              ></input-component>
              <input-component
                v-if="property_purpose"
                label="Property Category *"
                custom="true"
                :error="this.submitted && !this.$v.property_category.required"
                size="33"
              >
                <vSelect
                  v-model="property_category"
                  label="name"
                  autocomplete="off"
                  @input="propertyCategorySelected"
                  :options="propertyCategories"
                  placeholder="Select Property Category"
                >
                </vSelect
              ></input-component>
              <!-- Property Type -->
              <input-component
                v-if="propertyTypes && property_category"
                label="Property Type *"
                custom="true"
                :error="this.submitted && !this.$v.property_type.required"
                size="33"
              >
                <vSelect
                  v-model="property_type"
                  label="name"
                  :options="propertyTypes"
                  placeholder="Select Property Type"
                >
                </vSelect
              ></input-component>
              <!-- Property RERA Permit Number -->
              <input-component
                v-model="form.rera_permit_number"
                label="RERA Permit Number *"
                type="number"
                placeholder="Enter RERA Number"
                :error="checkValidation('rera_permit_number')"
                size="33"
              >
              </input-component>
              <!-- Property Reference Number -->
              <input-component
                v-model="form.reference_number"
                label="Reference Number *"
                type="number"
                placeholder="Enter Reference Number"
                :error="checkValidation('reference_number')"
                size="33"
                class="margin_refrence mob_pb_property"
              >
              </input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Property Amenities -->
      <transition name="fade"
        ><div class="form-section pb_property">
          <!-- Form Title -->
          <div class="form-section-title">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">3</span>Property Amenities
            </div>
            <button
              @click="toggleDiv('propertyFeatures')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="propertyFeatures"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <!-- Form Title -->
          <!-- Form Content -->
          <transition name="expand">
            <div v-if="propertyFeatures" class="mb_tab_two">
              <div class="md-layout md-gutter mt-4 md-alignment-center-left ">
                <input-component
                  label="Area Unit *"
                  custom="true"
                  :error="checkValidation('area_unit')"
                  size="33"
                  class="margin_unit"
                >
                  <vSelect
                    v-model="form.area_unit"
                    :options="area_units"
                    placeholder="Select Area Unit"
                  >
                  </vSelect
                ></input-component>
                <input-component
                  type="number"
                  step="500"
                  placeholder="Enter Area Size"
                  label="Area Size *"
                  v-model="form.area_size"
                  :error="checkValidation('area_size')"
                  size="33"
                  class="margin_area"
                ></input-component>
              </div>
              <div
                class="md-layout md-gutter mt-4 md-alignment-center-center mt-0-tab"
              >
                <input-component
                  label="Bedrooms *"
                  custom="true"
                  :error="checkValidation('bedrooms')"
                  class="margin_bedrooms"
                >
                  <vSelect
                    v-model="form.bedrooms"
                    :options="Array.from({ length: 7 }, (_, i) => i + 1)"
                    placeholder="Select Bedrooms"
                  >
                  </vSelect
                ></input-component>
                <input-component
                  label="Bathrooms *"
                  custom="true"
                  :error="checkValidation('bathrooms')"
                  class="margin_amenities"
                >
                  <vSelect
                    v-model="form.bathrooms"
                    :options="Array.from({ length: 8 }, (_, i) => i + 1)"
                    placeholder="Select Bathrooms"
                  >
                  </vSelect
                ></input-component>
                <input-component
                  label="Attached Kitchen *"
                  custom="true"
                  :error="checkValidation('attached_kitchen')"
                  class="margin_amenities"
                >
                  <vSelect
                    v-model="form.attached_kitchen"
                    :options="['yes', 'no']"
                    placeholder="Have Attached Kitchen ?"
                  >
                  </vSelect
                ></input-component>
                <input-component
                  label="Furnished *"
                  custom="true"
                  :error="checkValidation('is_furnished')"
                  class="margin_amenities"
                >
                  <vSelect
                    v-model="form.is_furnished"
                    :options="['yes', 'no']"
                    placeholder="Is Furnished ?"
                  >
                  </vSelect
                ></input-component>
                <input-component
                  label="Parking *"
                  custom="true"
                  :error="checkValidation('is_parking')"
                  class="margin_amenities"
                >
                  <vSelect
                    v-model="form.is_parking"
                    :options="['yes', 'no']"
                    placeholder="Have Parking ?"
                  >
                  </vSelect
                ></input-component>
              </div>
              <div
                class="md-layout md-gutter mt-4 md-alignment-center-center mt_extra"
              >
                <input-component
                  label="Extra Amenities *"
                  custom="true"
                  :error="checkValidation('property_amenities')"
                  :size="100"
                >
                  <vSelect
                    multiple
                    label="name"
                    taggable
                    push-tags
                    :reduce="el => el.name"
                    v-model="form.property_amenities"
                    :options="amenities"
                    placeholder="eg: Material, Gym, Club House, Swimming Pool"
                  >
                  </vSelect
                ></input-component>
              </div>
            </div>
          </transition></div
      ></transition>
      <!-- Property Tags -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">4</span>Property Tags
          </div>
          <button
            @click="toggleDiv('propertyTags')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyTags"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyTags">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-left mb_three_tab "
            >
              <input-component
                label="Add Property Tags"
                custom="true"
                :error="this.submitted && this.$v.form.tags.$invalid"
              >
                <vSelect
                  taggable
                  push-tags
                  multiple
                  v-model="form.tags"
                  placeholder="Eg: extra information for Buyer/Seller"
                >
                </vSelect
              ></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Property Pricing -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">5</span>Property Pricing
          </div>
          <button
            @click="toggleDiv('propertyPricing')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyPricing"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyPricing">
            <!-- <div class="md-layout md-gutter mt-4 md-alignment-center-center">
              <input-component label="Select Pricing Type *" custom="true">
                <div class="limitRadio">
                  <md-radio v-model="form.pricing_type" value="all" checked
                    >All</md-radio
                  >
                  <md-radio
                    v-model="form.pricing_type"
                    value="show_pricing"
                    checked
                    >Show Pricing</md-radio
                  >
                  <md-radio
                    v-model="form.pricing_type"
                    value="quotation"
                    checked
                    >Quotation Based</md-radio
                  >
                </div>
              </input-component>
            </div> -->
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mb_tab_three "
            >
              <input-component
                class="mt_currency"
                label="Currency *"
                custom="true"
                :error="checkValidation('currency')"
              >
                <vSelect
                  v-model="form.currency"
                  :reduce="element => element.currency"
                  label="currency"
                  :options="currencies"
                  placeholder="Select Currency"
                >
                </vSelect
              ></input-component>
              <input-component
                placeholder="Property Price *"
                label="Property Price *"
                :error="checkValidation('price')"
                custom="true"
                class="margin_amenities"
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
                type="text"
                placeholder="Offer price (Optional)"
                label="Offer price "
                :error="submitted && $v.form.offerprice.$invalid"
                errorMessage="Offer price should be less than Auto Price."
                v-model="form.offerprice"
                class="margin_offerprice"
              ></input-component>

              <input-component
                type="text"
                placeholder="VAT(%)"
                label="VAT(%) *"
                v-model="form.vat"
                class="margin_vat"
              ></input-component>
            </div>
          </div>
        </transition>
      </div>
      <!-- Property Payment Method -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">6</span>Payment Method
          </div>
          <button
            @click="toggleDiv('propertyPaymentMethod')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyPaymentMethod"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyPaymentMethod">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_payment"
            >
              <input-component
                label="Payment Method *"
                custom="true"
                :error="checkValidation('payment_method')"
              >
                <vSelect
                  v-model="form.payment_method"
                  label="Payment Method"
                  :options="['Cash', 'Cheque', 'Bank Transfer']"
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
                v-model="form.no_of_cheques"
                class="mt_payment"
              ></input-component>
            </div>
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_agree"
            >
              <input-component
                type="text"
                placeholder="eg: 1 month, 1 year, 4 years etc. "
                label="Agreement Plan (in Years, Months, Weeks) *"
                :error="checkValidation('unit')"
                v-model="form.unit"
              ></input-component>
              <input-component
                label="Payment Term *"
                custom="true"
                :error="checkValidation('payment_term')"
                class="mt_term"
              >
                <vSelect
                  v-model="form.payment_term"
                  label="Payment term"
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
                    'Yearly'
                  ]"
                  placeholder="Payment Plan"
                >
                </vSelect
              ></input-component>
            </div>
          </div>
        </transition>
      </div>

      <!-- Property Contact Details -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">8</span>Add Contact Details
          </div>
          <button
            @click="toggleDiv('propertyContactDetails')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyContactDetails"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyContactDetails" class="mb_three_tab">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_location"
            >
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
                >
                </GoogleMap>
              </input-component>
            </div>
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_contact"
            >
              <input-component
                type="text"
                placeholder="Contact Name *"
                label="Contact Name *"
                v-model="form.contact_name"
                :error="checkValidation('contact_name')"
              ></input-component>
              <input-component
                label="Contact Number"
                custom="true"
                :error="checkValidation('contact_number')"
                class="mt_term"
              >
                <vue-tel-input
                  v-model="form.contact_number"
                  placeholder="Mobile"
                  :enabledCountryCode="true"
                  :validCharactersOnly="true"
                  :maxLen="13"
                ></vue-tel-input>
                <p
                  class="c-forminlineError"
                  v-if="
                    submitted &&
                      !$v.form.contact_number.minLength &&
                      $v.form.contact_number.required
                  "
                >
                  Please input correct number
                </p>
              </input-component>
            </div>
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_contact"
            >
              <input-component
                type="text"
                placeholder="Address *"
                label=" Address *"
                v-model="form.address"
                :error="checkValidation('address')"
              ></input-component>
              <input-component
                type="text"
                placeholder="Email *"
                label="Email *"
                v-model="form.contact_email"
                :error="checkValidation('contact_email')"
                class="mt_term"
              ></input-component>
            </div>
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_term"
            >
              <input-component
                label="Country *"
                custom="true"
                :error="checkValidation('location_country')"
              >
                <vSelect
                  v-model="form.location_country"
                  :reduce="element => element.name"
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
                class="mt_contact"
              >
                <vSelect
                  v-model="form.location_city"
                  :reduce="element => element.location"
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
                class="mt_contact"
              >
                <vSelect
                  v-model="form.location_area"
                  :reduce="element => element.location"
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
      <!-- Property Visibility -->
      <div class="form-section pb_property">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">9</span>Property Visibility
          </div>
          <button
            @click="toggleDiv('propertyProductVisibility')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyProductVisibility"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyProductVisibility">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mb_visibility"
            >
              <input-component
                label="Select Property Visibility *"
                custom="true"
                :error="checkValidation('visibility')"
              >
                <div class="limitRadio radio_property">
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
      <!-- Property Images -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">10</span>Add Property Images
          </div>
          <button
            @click="toggleDiv('propertyImages')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyImages"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyImages">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_term pb_file"
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
                </div></input-component
              >
            </div>
          </div>
        </transition>
      </div>
      <!-- Property Information -->
      <div class="form-section">
        <!-- Form Title -->
        <div class="form-section-title">
          <div class="d-inline-flex align-center">
            <span class="squareBadge mr-3">11</span>Property Description
          </div>
          <button
            @click="toggleDiv('propertyInformation')"
            type="button"
            class="md-button md-theme-default toggleboxBtn"
          >
            <span class="material-icons" v-if="propertyInformation"
              >keyboard_arrow_up</span
            >
            <span class="material-icons" v-else>keyboard_arrow_down</span>
          </button>
        </div>
        <!-- Form Title -->
        <!-- Form Content -->
        <transition name="expand">
          <div v-if="propertyInformation">
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center mt_contact"
            >
              <input-component
                label="Add Property Description.*"
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
      <!-- Property Information -->
      <div class="form-section" v-if="submitted && $v.$invalid">
        <div class="form-section-title">
          <div class="d-inline-flex align-center" style="color: #e01e5a">
            There are some fields missing, kindly fill up them.
          </div>
        </div>
      </div>
      <div class="btn-wrap text-center ">
        <loaderButton
          :disabled="submitted && $v.$invalid"
          @click="submitForm"
          name="Add Property"
          :loading="loading"
          class="text_addproperty"
        ></loaderButton>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/helpers/utils.js";
import inputComponent from "@/components/ui-components/input.vue";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";
import loader from "@/components/pages/profileDashboard/components/loader.vue";

import loaderButton from "@/components/ui-components/loader-button.vue";
import GoogleMap from "@/components/pages/newsfeed/google-map";

import axios from "axios";

import vSelect from "vue-select";
import VueTagsInput from "@johmun/vue-tags-input";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import { VueEditor } from "vue2-editor";
import { CurrencyInput } from "vue-currency-input";

import {
  required,
  maxLength,
  minLength,
  maxValue,
  numeric
} from "vuelidate/lib/validators";

export default {
  name: "addProperty",
  components: {
    inputComponent,
    breadcrumbs,
    loaderButton,
    GoogleMap,
    loader,

    vSelect,
    VueTagsInput,
    Cropper,
    VueEditor,
    CurrencyInput
  },
  // uploadFiles is defined in this Mixin
  mixins: [utils],

  validations() {
    const fields = {
      name: {
        required,
        maxLength: maxLength(50)
      },
      information: {
        required
      },
      listed_by: {
        required
      },
      rera_permit_number: {
        required,
        numeric
      },
      reference_number: {
        required,
        numeric
      },
      // till_date: {
      //   required
      // },
      tags: {
        required,
        minLength: minLength(1)
      },
      area_unit: { required },
      area_size: { required },
      bedrooms: { required },
      bathrooms: { required },
      attached_kitchen: { required },
      is_furnished: { required },
      is_parking: { required },
      property_amenities: { required },

      //PRicing
      price: { required },
      offerprice: { maxValue: maxValue(parseInt(this.form.price)) },
      currency: { required },

      // Payment Method
      payment_method: {
        required
      },
      unit: { required },
      payment_term: { required },

      visibility: {
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
      }
    };

    const optional = {};

    if (this.propertyTypes) {
      optional.property_type = {
        required
      };
    }
    if (this.form.payment_method == "Cheque") {
      fields.no_of_cheques = {
        required
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
    //   // fields.vat = {
    //   //   required
    //   // };
    // }

    return {
      form: {
        ...fields
      },
      property_purpose: {
        required
      },
      property_category: {
        required
      },
      ...optional,
      RealArray: {
        required,
        minLength: minLength(1)
      }
    };
  },

  data() {
    return {
      // Product Update
      productId: "",
      productDetails: "",

      loader: false,
      loading: false,
      submitted: false,
      propertyInfo: true,
      propertyType: true,
      propertyFeatures: true,
      propertyTags: true,
      propertyPricing: true,
      propertyPaymentMethod: true,
      propertyContactDetails: true,
      propertyProductVisibility: true,
      propertyImages: true,
      propertyInformation: true,

      breadcrumbs: [
        {
          title: "Add New Items",
          link: "/dashboard/vendor/addnewitems"
        },
        {
          title: this.$route.query.market_type,
          link:
            "/dashboard/vendor/add?market_type=" + this.$route.query.market_type
        },

        {
          title: this.$route.query.productId
            ? "Update Property"
            : this.demandOrSupplyPrefix() + " Property",
          link:
            "/dashboard/vendor/property?market_type=" +
            this.$route.query.market_type
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
      propertyPurposes: [],
      property_purpose: "",
      propertyCategories: [],
      property_category: "",
      propertyTypes: [],
      property_type: "",

      amenities: [],

      area_units: [
        "Sq. centimeter (cm²)",
        "Sq. foot (ft²)",
        "Sq. inch (in²)",
        "Sq. kilometer (km²)",
        "Sq. meter",
        "Sq. mile",
        "Sq. millimeter ",
        "Sq. yard ",
        "acre",
        "are (a)",
        "barn (b)",
        "hectare (ha)",
        "homestead",
        "rood",
        "township "
      ],

      currencies: [],
      tag: "",
      priceWithCurrency: "",
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
          title: "Company",
          value: "Company"
        },
        {
          title: "Personal",
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
      tags: [],

      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      doNotClear: ["market_type", "product_type", "till_date", "visibility"],
      form: {
        action_type: "add",

        market_type: "supply",
        product_type: "property",
        name: "",
        listed_by: "",
        till_date: new Date(),

        // Categories
        property_purpose: "",
        property_category: "",
        property_type: "",
        rera_permit_number: "",
        reference_number: "",

        // Amenities
        area_unit: "",
        area_size: "",
        bedrooms: "",
        bathrooms: "",
        attached_kitchen: "",
        is_furnished: "",
        is_parking: "",
        property_amenities: [],

        tags: [],

        // pricing_type: "all",
        price: "",
        offerprice: "",
        currency: "AED",
        vat: "",
        payment_method: "",
        no_of_cheques: "",
        unit: "",
        payment_term: "",

        visibility: "Public",

        information: "",
        files: [],

        contact_name: "",
        contact_number: "",
        contact_email: "",
        address: "",
        latitude: "",
        longitude: "",
        location_country: "",
        location_area: "",
        location_city: ""
      }
    };
  },

  created() {
    // this.fetchAndAssign("api_auto_types", {}, "categories");
    // Get Currency From API

    this.form.market_type = this.$route.query.market_type
      ? this.$route.query.market_type
      : "supply";
    this.fetchAndAssign("api_country", {}, "currencies");
    this.fetchAndAssign("/property-amenities", {}, "amenities");
    this.fetchAndAssign("property-types", {}, "propertyPurposes");
    this.loadProductandDetails();
  },
  methods: {
    toggleDiv(div) {
      this[div] = !this[div];
    },

    async propertyTypeSelected(data, iteration) {
      this.property_category = "";
      const response = this.fetchAndAssign(
        "property-types",
        { parentid: data.id },
        "propertyCategories"
      );
    },
    async propertyCategorySelected(data, iteration) {
      this.property_type = "";
      const response = this.fetchAndAssign(
        "property-types",
        { parentid: data.id },
        "propertyTypes"
      );
    },

    getCountryId() {
      return this.$helpers.selectObjectFromArray(
        this.currencies,
        "name",
        this.form.location_country
      );
    },
    getCityId() {
      return this.$helpers.selectObjectFromArray(
        this.citiesList,
        "location",
        this.form.location_city
      );
    },
    async countrySelected() {
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
    async citySelected() {
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
    // async getFileUrls () {
    //   if (!((await this.RealArray.length) > 0)) return "empty";
    //   try {
    //     await Promise.all(this.RealArray.map(async (file) => {
    //       // Prepare Form Data
    //       let formData = await new FormData();
    //       await formData.append("files[]", file);
    //       // Now Send it
    //       const response = await axios.post("api_fileupload", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data"
    //         }
    //       });
    //       console.log("file submit", response)
    //       // Store The Url in files Array of Form
    //       await this.form.files.push(response.data.results.files[0].fileUrl);
    //     }));
    //     return "success";
    //   } catch (error) {
    //     this.loading = true;
    //     console.log(error);
    //     this.$helpers.errorPopup("Error Adding Images.");
    //     return "fail";
    //   }
    // },
    async submitForm() {
      this.loading = true;
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.loading = false;
        return;
      }

      const fileresponse = await this.getFileUrls(this);
      console.log(fileresponse);
      if (fileresponse == "fail" || fileresponse == "empty") return;
      // Adjust form Values before submitting.
      this.form.property_purpose = await this.property_purpose.name;
      this.form.property_category = await this.property_category.name;
      this.form.property_type = await this.property_type.name;
      this.form.information = await this.form.information.replaceAll(
        '"',
        " ' "
      );
      console.log(this.form);
      const response = await this.$store.dispatch("uploadProduct", {
        ...this.form
      });
      console.log(response);
      if (await !response.data.success) {
        this.loading = false;
        console.log(response);
        await this.$swal.fire(
          this.$helpers.errorPopup(
            "Error Adding your Property." + response.data.message
          )
        );
        return;
      } else {
        this.loading = false;
        this.clearForm(this.doNotClear);
        await this.$swal.fire(
          this.$helpers.successPopup(
            "Your Property has been added successfully."
          )
        );
        this.$router.push("/dashboard/vendor/manage-store/property");
        return;
      }
    },
    checkValidation(field) {
      return this.submitted && !this.$v.form[field].required;
    },
    //------------  Choose Image Code -------------------------------
    chooseFile() {
      this.$refs.file.click();
    },
    CancelCrop() {
      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    saveImage() {
      this.InitialArray = [...this.InitialArray, this.temp];
      this.RealArray = [...this.RealArray, this.file];

      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    change({ coordinates, canvas }) {
      var img = canvas.toDataURL("image/png");

      var context = canvas.getContext("2d");
      canvas.toBlob(blob => {
        var self = this;

        var objectURL = URL.createObjectURL(blob);

        self.temp = objectURL;
        self.file = blob;
      }, "image/wbmp");
    },
    chooseImage($event) {
      const file = $event.target.files[0];
      this.img = URL.createObjectURL(file);

      var reader = new FileReader();
      var self = this;
      //Read the contents of Image File.
      reader.readAsDataURL($event.target.files[0]);

      reader.onload = function(e) {
        console.log(self.isCropped);
        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function() {
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
    delete_image(index) {
      this.InitialArray.splice(index, 1);
      this.RealArray.splice(index, 1);
      console.log(this.InitialArray);
      console.log(this.RealArray);
    },
    pixelsRestriction({
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
    // Google Maps
    onClickAddMap(value) {
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
    },
    // Clear Form
    clearForm(doNotClear) {
      if (!doNotClear) doNotClear = [];
      for (const [key, value] of Object.entries(this.form)) {
        if (Array.isArray(value)) {
          this.form[key] = [];
          continue;
        }
        if (doNotClear.includes(key)) {
          continue;
        } else {
          this.form[key] = "";
        }
      }
    },
    //-------------For Auto Update---------------------------------
    async loadProductandDetails() {
      const productId = await this.$route.query.productId;
      if (!productId && this.form.action_type === "add") return;
      this.loader = true;
      this.form.item_id = productId;
      // 1. Fetch Product Details
      const res = await this.$store.dispatch("productDetails", productId);
      this.productDetails = await res;
      // 2. Assign action_type = 'update'
      this.form.action_type = "update";
      //3. Assign Values to Form (Prefill)
      for (const key in res) {
        //5. Price Key is diff. in DB
        if (key === "unitprice") {
          // if (res.unitprice === '0.00') {
          //   this.form.pricing_type = 'quotation'; continue;
          // }
          // this.form.pricing_type = "show_pricing"
          // console.log(res.unitprice, ":sldjhskjh")
          this.form.price = await res.unitprice;
          continue;
        }

        //7. Images
        if (key === "images") {
          this.InitialArray = await res.images.map(el => el.file);
          this.RealArray = this.InitialArray;
          continue;
        }
        if (key === "brand") {
          this.form.sub_category = {
            id: "",
            name: res.brand
          };
          continue;
        }
        //4. More Details
        if (key === "moreDetails") {
          for (const k in res.moreDetails) {
            if (k === "property_purpose") {
              this.property_purpose = {
                id: "",
                name: res.moreDetails.property_purpose
              };
              continue;
            }
            if (k === "property_category") {
              this.property_category = {
                id: "",
                name: res.moreDetails.property_category
              };
              continue;
            }
            if (k === "property_type") {
              this.property_type = {
                id: "",
                name: res.moreDetails.property_type
              };
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
      this.loader = false;
    }
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
  font-size: 18px;
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

/* Date Picker */
.date_picker {
  border: solid 1px #c8d2e0;
  padding: 5px 10px;
  border-radius: 5px;
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
  margin-bottom: 7px;
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
  display: block;
  justify-content: center;
  float: left;
  width: 100%;
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

.pb_property {
  padding-bottom: 5px;
}
button.md-button.md-theme-default.md-raised.md-accent {
  /* width: 100px; */
  padding-left: 10px;
  padding-right: 10px;
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
  .productAttributes {
    background-color: #fff;
    padding-bottom: 5px;
    padding-top: 0px;
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

  .form-section {
    padding: 15px;
    padding-top: 5px;
    padding-bottom: 15px;
    margin-bottom: 20px;
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
  .mb_three_tab {
    margin-bottom: 4px;
  }
  .mt_currency {
    margin-top: -5px;
  }
  .mb_visibility {
    margin-bottom: 5px;
  }
  .uploadWrap {
    margin-bottom: 5px;
  }

  .selected-images {
    max-width: 81px;
    min-height: 81px;
    margin-right: 8px;
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
}

@media screen and (max-width: 600px) {
  .margin_unit {
    margin-top: 0px;
  }
  .mob_width {
    min-width: 100%;
    margin-top: 7px;
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

  .squareBadge {
    font-size: 11px;
  }
  .mob_margin_info {
    margin-top: 3px !important;
  }
  .toggleboxBtn {
    height: 18px;
    min-width: 18px;
    margin: 6px 8px;
    margin-right: 0;
  }

  .toggleboxBtn span {
    font-size: 14px;
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

button.md-button.md-theme-default.md-raised.md-accent{
  height: 36px !important;
    margin-top: 8px !important;
}

.text_addproperty{ width: 125px !important;}

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
