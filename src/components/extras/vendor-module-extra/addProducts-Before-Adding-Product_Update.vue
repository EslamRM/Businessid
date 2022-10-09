<template>
  <div>
    <div class="adding-box-wrap">
      <!-- <div class="frm-hdr-1 txt-algn-lft">
        <div class="frm-hdr-1-txt">Add Product</div>
      </div> -->
      <div
        class="md-layout md-gutter md-alignment-center-space-between page-title"
      >
        <div class="md-layout-item">
          <div class="frm-hdr-1-txt txt-algn-lft">
            {{ demandOrSupplyPrefix() }} Products
          </div>
        </div>
        <breadcrumbs :items="breadcrumbs"></breadcrumbs>
      </div>

      <div class="container">
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle col-sm-12">
            <div class="d-inline-flex align-center col-sm-10 p-0">
              <span class="squareBadge mr-3">1</span>Product Information
            </div>
            <button
              @click="toggleDiv('showProductInfo')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductInfo"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>

          <div class="c-form mt-4 col-sm-12 p-0" v-if="showProductInfo">
            <transition name="fade" mode="out-in">
              <div class="w-100 c-form">
                <input-component
                  label="Product Name *"
                  type="text"
                  :value.sync="form.name"
                  placeholder="Enter Product Name"
                >
                </input-component>
                <div class="c-forminlineError" v-if="checkValidation('name')">
                  <span v-if="submitted && !$v.form.name.maxLength"
                    >Product name should not be greater than 50 characters</span
                  >
                  <span v-else>Product Name is required.</span>
                </div>

                <div class="md-gutter m-0 col-sm-12 p-0">
                  <div class="col-sm-12 col-md-6 col-xl-4 p-0 fl">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel">Quantity *</label>
                      <div class="limitRadio">
                        <md-radio
                          v-model="form.is_limited"
                          value="unlimited"
                          checked
                          >Unlimited</md-radio
                        >
                        <md-radio
                          v-model="form.is_limited"
                          value="limited"
                          checked
                          >Limited</md-radio
                        >
                      </div>
                    </fieldset>
                  </div>

                  <div class="col-sm-12 col-md-6 col-xl-4 pr-0 fl">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel"
                        >Minimum Order (Optional)</label
                      >
                      <input
                        @keypress="onlyNumber"
                        class="c-formInput c-form-placeholder"
                        v-model.trim="form.minimumorder"
                        type="number"
                        min="1"
                        max="99999999"
                        name
                        placeholder="Enter Minimum Order"
                      />
                      <div class="c-forminlineError">
                        <span
                          v-if="this.submitted && $v.form.minimumorder.$invalid"
                          >Mimum order should be less than quantity</span
                        >
                      </div>
                    </fieldset>
                  </div>

                  <div
                    class="col-sm-12 col-md-6 col-xl-4 pr-0 fl left_align"
                    v-if="form.is_limited == 'limited'"
                  >
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel">Available Quantity*</label>
                      <input
                        @keypress="onlyNumber"
                        class="c-formInput c-form-placeholder"
                        v-model.trim="form.quantity"
                        required
                        type="text"
                        min="1"
                        name
                        placeholder="Enter Quantity"
                      />

                      <div class="c-forminlineError">
                        <span v-if="checkValidation('quantity')"
                          >Quantity is required</span
                        >
                      </div>
                    </fieldset>
                  </div>
                </div>
                <fieldset
                  class="inline-through text-left col-sm-12 col-md-4 col-xl-4 p-0"
                  v-if="showDate"
                >
                  <label class="c-formLabel">Validity Till *</label>
                  <!-- <date-pick
                    v-model="form.valid_till"
                    :inputAttributes="{ readonly: true }"
                    :isDateDisabled="isFutureDate"
                    :displayFormat="'DD-MM-YYYY'"
                  ></date-pick> -->
                  <VueDatePicker
                    class="date_picker"
                    v-model="form.valid_till"
                    color="#f47320"
                    placeholder="Choose From Date"
                    button-validate="Ok"
                    button-cancel="Cancel"
                    validate
                    clearable
                    :min-date="new Date()"
                  />
                </fieldset>
              </div>
            </transition>
          </div>
        </div>

        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">2</span>Product Category
            </div>
            <button
              @click="toggleDiv('showProductCategory')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductCategory"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div v-if="showProductCategory">
            <div class="md-layout category">
              <div class="md-layout-item md-size-100">
                <p class="label">Search Categories *</p>
                <v-select
                  v-model="mainSelected"
                  label="categoryname"
                  :options="mainOptions"
                  @search="onMainOptionsSearch"
                  @input="autoSelectOtherCategories"
                  placeholder="Search Categories."
                >
                </v-select>
              </div>
            </div>
            <div class="md-layout">
              <div class="md-layout-item md-size-33 category">
                <p class="label">Category 1 *</p>
                <v-select
                  v-model="subCategory1"
                  label="categoryname"
                  :options="subCategory1Options"
                  @input="subCategory1Selected($event)"
                  placeholder="Select Category 1"
                >
                </v-select>
              </div>
              <div
                class="md-layout-item md-size-33 category"
                v-if="
                  subCategory2Options.length > 0 ||
                  (this.form.action_type === 'update' && this.subCategory2)
                "
              >
                <p class="label">Category 2 *</p>
                <v-select
                  v-model="subCategory2"
                  label="categoryname"
                  :options="subCategory2Options"
                  @input="subCategory2Selected($event)"
                  placeholder="Select Category 2"
                >
                </v-select>
              </div>
              <div
                class="md-layout-item md-size-33 category"
                v-if="
                  subCategory3Options.length > 0 ||
                  (this.form.action_type === 'update' && this.subCategory3)
                "
              >
                <p class="label">Category 3 *</p>
                <v-select
                  v-model="subCategory3"
                  label="categoryname"
                  :options="subCategory3Options"
                  @input="subCategory3Selected($event)"
                  placeholder="Select Category 3"
                >
                </v-select>
              </div>
              <div
                class="md-layout-item md-size-33"
                v-if="
                  subCategory4Options.length > 0 ||
                  (this.form.action_type === 'update' && this.subCategory4)
                "
              >
                <p class="label">Category 4 *</p>
                <v-select
                  v-model="subCategory4"
                  label="categoryname"
                  :options="subCategory4Options"
                  @input="subCategory4Selected"
                  placeholder="Select Category 4"
                >
                </v-select>
              </div>
            </div>
            <div class="md-layout">
              <div
                class="md-layout-item"
                v-if="submitted && $v.allCategoriesSelected.$invalid"
              >
                <p class="c-forminlineError" style="text-align: center">
                  Please Select All the Categories
                </p>
              </div>
            </div>
            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center productAttributes"
              v-if="allCategoriesSelected"
            >
              <div class="md-layout-item md-size-100">
                <h3>Product Attributes</h3>
                <div class="note">
                  <i>Note</i> :The more attributes you fill, more chances of
                  your products suggested to user.
                </div>
              </div>
              <input-component
                label="Product Brand *"
                custom="true"
                :error="checkValidation('brand')"
                size="100"
              >
                <v-select
                  v-model="form.brand"
                  label="brand"
                  :reduce="(brand) => brand.brand"
                  :options="brands"
                  @search="onBrandSearch"
                  placeholder="Search Brand."
                >
                </v-select
              ></input-component>
              <div
                class="md-layout-item md-size-100"
                style="padding-top: 10px; padding-bottom: 10px"
              >
                <h4>Delivery Sizes</h4>
              </div>
              <input-component
                label="Length (meters) *"
                type="text"
                :value.sync="form.item_length"
                placeholder="Length (meters)"
                :error="checkValidation('item_length')"
              >
              </input-component>
              <input-component
                label="Width (meters) *"
                type="text"
                :value.sync="form.item_width"
                placeholder="Width (meters)"
                :error="checkValidation('item_width')"
              >
              </input-component>
              <input-component
                label="Height (meters) *"
                type="text"
                :value.sync="form.item_height"
                placeholder="Height (meters)"
                :error="checkValidation('item_height')"
              >
              </input-component>
              <input-component
                label="Weight (kg) *"
                type="text"
                :value.sync="form.item_weight"
                placeholder="Weight (meters)"
                :error="checkValidation('item_weight')"
              >
              </input-component>
              <input-component size="100" :custom="true">
                <hr
                  data-v-6ab5a752=""
                  style="border: 1px solid rgba(208, 206, 206, 0.93)"
                />
              </input-component>
              <input-component
                v-for="(attribute, id) in productAttributes"
                :key="id"
                :label="attribute.name"
                custom="true"
                size="33"
                autocomplete="off"
              >
                <v-select
                  :label="attribute.name"
                  :value="
                    form.product_attributes.find((el) =>
                      Object.keys(el).find((k) => k == attribute.name)
                    )
                  "
                  @input="
                    (e) => {
                      if (!e) {
                        form.product_attributes = [];
                        return;
                      }
                      form.product_attributes.push({
                        [attribute.name]: e,
                      });
                    }
                  "
                  :options="attribute.optionalValue"
                  :placeholder="'Select ' + attribute.name"
                  taggable
                  push-tags
                >
                </v-select
              ></input-component>
            </div>
          </div>
        </div>
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">3</span>Product Price
            </div>
            <button
              @click="toggleDiv('showProductPrice')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductPrice"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div class="c-form mt-4" v-if="showProductPrice">
            <div class="w-100 c-form v--three-columns v--odd">
              <div class="pillWrap">
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="show_pricing"
                    v-model.trim="pricing"
                    >Show Pricing</md-radio
                  >
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="quotation"
                    v-model.trim="pricing"
                    >Quotation</md-radio
                  >
                </div>
              </div>
            </div>
            <div
              class="w-100 c-form v--three-columns v--odd"
              v-if="pricing === 'show_pricing'"
            >
              <fieldset class="inline-through text-left">
                <label class="c-formLabel">Price * </label>
                <input
                  min="1"
                  @keypress="onlyNumber"
                  class="c-formInput c-form-placeholder"
                  v-model.trim="form.price"
                  @blur="validatePrice"
                  type="number"
                  name
                  placeholder="Enter Price"
                />
                <div class="c-forminlineError" v-if="checkValidation('price')">
                  Price is required
                </div>
              </fieldset>
              <fieldset class="inline-through text-left">
                <label class="c-formLabel">Offer Price (Optional)</label>
                <input
                  min="1"
                  @keypress="onlyNumber"
                  @blur="validatePrice"
                  class="c-formInput c-form-placeholder"
                  v-model.trim="form.offerprice"
                  type="number"
                  name
                  placeholder="Enter Offer Price"
                />
                <div
                  class="c-forminlineError"
                  v-if="checkValidationCustom('offerprice', '$invalid')"
                >
                  Offer Price should be less than Unit Price.
                </div>
              </fieldset>
              <!-- <fieldset class="inline-through text-left">
                  <label class="c-formLabel">Minimum Order (Optional)</label>
                  <input
                    @keypress="onlyNumber"
                    class="c-formInput c-form-placeholder"
                    v-model.trim="form.minimumorder"
                    type="number"
                    min="1"
                    max="99999999"
                    name
                    placeholder="Enter Minimum Order"
                  />
                  <div
                    class="c-forminlineError"
                    v-if="submitted && $v.form.minimumorder.$error"
                  >
                    <span v-if="!$v.form.quantity.maxValue"
                      >Minimumorder field cannot be greater than 10 digits</span
                    >
                  </div>
                </fieldset>-->
              <fieldset class="inline-through text-left">
                <label class="c-formLabel">Unit *</label>
                <div class>
                  <v-select
                    v-model="form.unit"
                    label="unit"
                    :filterable="false"
                    :options="options"
                    @search="onSearchUnits"
                    :reduce="(units) => units.unit"
                  >
                    <template slot="no-options">eg : piece, pack etc</template>
                  </v-select>
                  <!-- <select
                      v-model.trim="form.unit"
                      name="selectUnit"
                      id="selectUnit"
                    >
                      <option value data-foo>Unit</option>
                      <option
                        v-for="(unit, index) in units"
                        :key="index"
                        :value="unit.unit"
                      >
                        {{ unit.unit }}
                      </option>
                    </select>-->
                </div>
                <div class="c-forminlineError" v-if="checkValidation('unit')">
                  Unit is required
                </div>
              </fieldset>
              <fieldset class="inline-through text-left">
                <label class="c-formLabel">Currency *</label>
                <div>
                  <!-- <select
                      v-model.trim="form.currency"
                      name="selectcurrency"
                      id="selectcurrency"
                    >
                      <option value data-foo>Currency</option>
                      <option
                        v-for="(currency, index) in currencies"
                        :key="index"
                        :value="currency.currency"
                      >
                        {{ currency.currency }}
                      </option>
                    </select> -->
                  <v-select
                    class="tall-box"
                    v-model.trim="form.currency"
                    label="currency"
                    :options="currencies"
                    :reduce="(curr) => curr.currency"
                    placeholder="Select Currency"
                  >
                    <template slot="no-options">eg : AED, INR etc</template>
                  </v-select>
                </div>
                <div
                  class="c-forminlineError"
                  v-if="checkValidation('currency')"
                >
                  Currency is required
                </div>
              </fieldset>
              <fieldset class="inline-through text-left input_vat">
                <label class="c-formLabel">VAT (%)</label>
                <input
                  @input="restrictdigit"
                  class="c-formInput c-form-placeholder"
                  v-model.trim="form.vat"
                  required
                  type="number"
                  min="1"
                  max="99999999"
                  pattern="[1-9]{1}[0-9]{9}"
                  name
                  placeholder="Enter VAT"
                />
                <div class="c-forminlineError" v-if="checkValidation('vat')">
                  VAT is required
                </div>
              </fieldset>
            </div>
            <fieldset class="inline-through text-left chipnoEffect bgFor">
              <label class="c-formLabel">Add Tags For product</label>
              <vue-tags-input
                class="tags-chip"
                v-model.trim="tag"
                :tags="tags"
                @tags-changed="update"
                placeholder="Add tags"
              />
            </fieldset>
          </div>
        </div>
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle ifButton">
            <div>
              <span class="squareBadge mr-3">4</span>Add Shipping Charge
            </div>
            <div class="ico-btn-wrap">
              <!-- check if this supplies has shipping. if no then show add button -->

              <button
                @click="toggleDiv('showProductShipping')"
                type="button"
                class="md-button md-theme-default toggleboxBtn"
              >
                <span class="material-icons" v-if="showProductShipping"
                  >keyboard_arrow_up</span
                >
                <span class="material-icons" v-else>keyboard_arrow_down</span>
              </button>
            </div>
          </div>
          <div class="c-form mt-4" v-if="showProductShipping">
            <div class="w-100">
              <div class="pillWrap">
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="free_shipping"
                    v-model.trim="form.shipping_type"
                    >Free Shipping</md-radio
                  >
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="paid_shipping"
                    v-model.trim="form.shipping_type"
                    >Add Shipping Charge Based on City</md-radio
                  >
                </div>
                <div class="addWrap Manageshipping">
                  <button
                    class="md-button md-accent btnRedOutline md-theme-default addBtn"
                  >
                    <i class="material-icons">settings</i>
                    Manage shipping
                  </button>
                </div>
              </div>
              <!-- <div class="md-layout-item md-size-100" v-if="showShipentDetails">
                <ul class="w-100 shipAddress">
                  <li><span> Country :</span> {{ shipemtDetails.country }}</li>
                  <li><span>City :</span> {{ shipemtDetails.city }}</li>
                  <li>
                    <span>Delivery Charge : </span>{{ shipemtDetails.amount }}
                  </li>
                  <li>
                    <span> Estimated Time :</span>
                    {{
                      shipemtDetails.estimated_time +
                        "" +
                        shipemtDetails.estimated_unit
                    }}
                  </li>
                  <li>
                    <span> Method Of Delivery :</span>
                    <label
                      class="offer-discount delivery"
                      v-for="(payment,
                      index) in shipemtDetails.method_of_delivery"
                      :key="index"
                      >{{ payment.name_en }}</label
                    >
                  </li>
                  <li>
                    <span> Method Of Payment :</span>
                    <label
                      class="offer-discount payment"
                      v-for="(payment,
                      index) in shipemtDetails.method_of_payment"
                      :key="index"
                      >{{ payment.name_en }}</label
                    >
                  </li>
                </ul>
                </div>-->
            </div>
          </div>
        </div>
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle ifButton">
            <div><span class="squareBadge mr-3">5</span>Add Stock Location</div>
            <div class="ico-btn-wrap">
              <button
                @click="toggleDiv('showProductStock')"
                type="button"
                class="md-button md-theme-default toggleboxBtn"
              >
                <span class="material-icons" v-if="showProductStock"
                  >keyboard_arrow_up</span
                >
                <span class="material-icons" v-else>keyboard_arrow_down</span>
              </button>
            </div>
          </div>
          <div class="c-form mt-4" v-if="showProductStock">
            <div class="w-100">
              <div class="md-layout-item md-size-100 c-formSearch">
                <!-- <SearchStockLocation
                  :isSubmitted="success"
                  @onClickItem="clickStockLocation"
                /> -->
                <input-component
                  label="Stock Location"
                  custom="true"
                  :error="checkValidation('stock_location_id')"
                  size="100"
                >
                  <v-select
                    label="address"
                    :options="stockLocations"
                    @input="stockLocationSelected"
                    @search="onStockLocationSearch"
                    placeholder="Search by City or Area."
                    :filterable="false"
                    :error="checkValidation('stock_location_id')"
                  >
                    <template v-slot:option="option">
                      <i class="md-icon icoWrap">location_on</i>
                      {{ option.address }}
                    </template>
                  </v-select></input-component
                >
              </div>

              <div
                class="md-layout-item md-size-100"
                v-if="form.stock_location_id"
              >
                <ul class="w-100 shipAddress">
                  <li>
                    <span>Country :</span>
                    {{ form.location_country }}
                  </li>
                  <li>
                    <span>City :</span>
                    {{ form.location_city }}
                  </li>
                  <li>
                    <span>Area :</span>
                    {{ form.location_area }}
                  </li>
                  <li>
                    <span>Street Number :</span>
                    {{ form.location_street }}
                  </li>
                  <li>
                    <span>Building Name :</span>
                    {{ form.location_building }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">6</span>Product Visibility
            </div>
            <button
              @click="toggleDiv('showProductVisibility')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductVisibility"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div class="c-form mt-4" v-if="showProductVisibility">
            <div class="w-100">
              <div class="pillWrap">
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="public"
                    v-model.trim="form.visibility"
                    >Public</md-radio
                  >
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="private"
                    v-model.trim="form.visibility"
                    >Private</md-radio
                  >
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="company"
                    v-model.trim="form.visibility"
                    >Only for Company</md-radio
                  >
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="personal"
                    v-model.trim="form.visibility"
                    >Only for Personal</md-radio
                  >
                </div>
              </div>
              <!-- <div class="md-layout-item md-size-100">
              <div class="btn-wrp-2">
                <md-checkbox v-model="productUpdates" value="1"
                  >By Clicking This You Will Recieve Products
                  Updates</md-checkbox
                >
                <md-checkbox v-model="productUpdates" value="1"
                  >By Clicking This You agree the Term and conditions of
                  uaect</md-checkbox
                >
              </div>
                </div>-->
            </div>
          </div>
        </div>
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">7</span>Product Images
            </div>
            <button
              type="button"
              @click="toggleDiv('showProductImages')"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductImages"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div class="c-form mt-4" v-if="showProductImages">
            <div class="w-100 mt-3">
              <div class="uploadWrap">
                <div class="add-meadia-bx">
                  <div>
                    <div class="app">
                      <div id="app" v-if="isCropped">
                        <Cropper
                          :restrictions="pixelsRestriction"
                          class="cropper"
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
                    </div>
                    <div v-if="before_crop" class="mb-3">
                      <div class="img-selected-wrapper">
                        <div
                          class="selected-images"
                          v-for="(img, index) in InitialArray"
                          :key="index"
                        >
                          <img :src="img" />
                          <span class="remove-image">
                            <span
                              class="material-icons removeIco"
                              @click="delete_image(index)"
                              >close</span
                            >
                          </span>
                        </div>
                      </div>
                      <!-- <div class="btn-save-div">
                    <md-button
                      class="btn-save md-primary md-raised"
                      @click="upload()"
                      :disabled="IsDisabledUpload"
                      >Save</md-button
                    >
                    <div class="lds-ellipsis" v-if="showLoading">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                        </div>-->
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

                    <!-- <vue-dropzone
                        ref="myVueDropzone"
                        id="dropzone"
                        :options="dropzoneOptions"
                      ></vue-dropzone>-->
                  </div>
                  <div
                    class="c-forminlineError"
                    style="text-align: center"
                    v-if="this.submitted && $v.RealArray.$invalid"
                  >
                    <span>Please upload product images</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="adding-box-1-cnt wrapIn">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">8</span>Product Description
            </div>
            <button
              @click="toggleDiv('showProductDescription')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductDescription"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div class="c-form mt-4" v-if="showProductDescription">
            <div class="w-100">
              <div class="editr-bx-tp-1">
                <vue-editor
                  :editor-toolbar="customToolbar"
                  v-model="form.information"
                ></vue-editor>
                <div
                  class="c-forminlineError"
                  v-if="submitted && $v.form.information.$error"
                >
                  <span v-if="!$v.form.information.required"
                    >Product Description is required</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="adding-box-1-cnt wrapIn col-sm-12 ">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">9</span>Location
            </div>
            <button
              @click="toggleDiv('showProductMap')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductMap"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div class="c-form mt-4" v-if="showProductMap">
            <div class="w-100">
              <GoogleMap @mapHandler="onClickAddMap"> </GoogleMap>
            </div>
          </div>
          </div>-->
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item">
            <center>
              <md-button
                class="md-raised md-accent btnWrap"
                @click="addProduct($event)"
                :disabled="btnDisable"
              >
                <div class="md-layout md-gutter md-alignment-center-center">
                  <div class="md-layout-item">Add Product</div>
                  <transition name="fade" v-if="showLoader">
                    <div class="md-layout-item">
                      <md-progress-spinner
                        :md-diameter="20"
                        :md-stroke="3"
                        md-mode="indeterminate"
                      ></md-progress-spinner>
                    </div>
                  </transition>
                </div>
              </md-button>
            </center>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>
<script>
import VueTagsInput from "@johmun/vue-tags-input";
import Swal from "sweetalert2";
import DatePick from "vue-date-pick";
import "vue-date-pick/dist/vueDatePick.css";
import axios from "axios";
import debounce from "lodash.debounce";
import uniqby from "lodash.uniqby";
import map from "lodash.map";

// import DatePicker from "vue-md-date-picker";
import SearchAttributes from "./searchAttributes";
import vue2Dropzone from "vue2-dropzone";
import SearchShipment from "@/components/ctcomponents/ShipmentSearch";
import SearchStockLocation from "@/components/ctcomponents/StockLocationSearch";
import CategorySearch from "@/components/ctcomponents/CategorySearch";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { VueEditor } from "vue2-editor";
import { mapState } from "vuex";
import GoogleMap from "@/components/pages/newsfeed/google-map";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import { validationMixin } from "vuelidate";
import moment from "moment";

import inputComponent from "@/components/ui-components/input.vue";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue"


import {
  required,
  email,
  minLength,
  maxValue,
  numeric,
  sameAs,
  maxLength,
  checked
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  validations () {
    const fields = {
      name: {
        required,
        maxLength: maxLength(50)
      },
      information: {
        required
      },
      stock_location_id: {
        required
      },

      brand: {
        required
      },
      item_length: {
        required
      },
      item_width: {
        required
      },
      item_height: {
        required
      },
      item_weight: {
        required
      },
      minimumorder: {
        numeric,
        maxValue: maxValue(100000000)
      }
    };
    if (this.form.is_limited == "limited") {
      fields.minimumorder = {
        numeric,
        maxValue: maxValue(this.form.quantity)
      };
      fields.quantity = {
        required
      };
    }
    if (this.pricing == "show_pricing") {
      fields.price = {
        required,
        numeric
      };
      fields.offerprice = {
        maxValue: maxValue(this.form.price)
      };
      fields.unit = {
        required
      };
      fields.currency = {
        required
      };
      fields.vat = {
        required
      };
    }

    return {
      allCategoriesSelected: {
        checked: value => value === true
      },
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
      success: false,
      productId: "",
      productDetails: "",
      //TODO: Insert the in form afterwards,
      mainSelected: "",
      mainOptions: [],
      // Sub Categories
      // Sub Cat 1
      subCategory1: null,
      subCategory1Options: [],
      // Sub Cat 2
      subCategory2: null,
      subCategory2Options: [],
      // Sub Cat 3
      subCategory3: null,
      subCategory3Options: [],
      // Sub Cat 4
      subCategory4: null,
      subCategory4Options: [],
      // All Categories Selected
      allCategoriesSelected: false,
      // Brands
      brands: [],
      // Product Attributes
      productAttributes: [],
      // Custom Toolbar Vue-Editor
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
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
          title: this.demandOrSupplyPrefix() + " Product",
          link: "/dashboard/vendor/item?market_type=" + this.$route.query.market_type
        },

      ],
      options: [],
      unit: "",
      qtyRequired: false,
      brands: [],
      showAttributeError: "",
      files: [],
      showBrands: false,
      showPriceError: "",
      showOfferError: false,
      offerError: "",
      showLoader: false,
      btnDisable: false,
      submitted: false,
      submitStatus: null,
      pricing: "show_pricing",
      showProductCategory: true,
      showProductPrice: true,
      showProductShipping: true,
      showProductStock: true,
      showProductImages: true,
      showProductDescription: true,
      showProductVisibility: true,
      showProductMap: true,
      isShowAutoComplete: false,
      showStockLocations: false,
      showShipentDetails: false,
      productName: null,
      before_crop: true,

      brandname: null,
      numberOfQuantity: null,
      UnitPrice: null,
      selectUnit: null,
      minimumOrder: null,
      deliveryCost: null,
      TaxCost: null,
      selectedDate: null,
      isCropped: false,
      IsDisabledUpload: false,
      // dropzoneOptions: {
      //   maxFiles: 1,
      //   init: function() {
      //     this.on("maxfilesexceeded", function(file) {
      //       this.removeAllFiles();
      //       this.addFile(file);
      //     });
      //   },
      //   autoProcessQueue: false,
      //   url: "https://httpbin.org/post",
      //   thumbnailWidth: 125,
      //   maxFilesize: 110,
      //   addRemoveLinks: true,
      //   maxFiles: 1,
      //   headers: { "My-Awesome-Header": "header value" },
      //   dictDefaultMessage:
      //     "<i class='material-icons'>insert_photo</i>Attach Images For Product"
      // },
      content: "Some initial content",
      productUpdates: "",
      showProductInfo: true,
      tags: [],
      tag: "",
      arrowCounter: 0,
      isAllCategorySelected: "",
      form: {
        action_type: "add",
        is_limited: "unlimited",
        visibility: "public",

        brand: "",
        categories: [],
        shipping_type: "free_shipping",
        market_type: "",
        product_type: "item",
        name: "",
        tags: [],
        brand: "",
        item_length: "",
        item_width: "",
        item_height: "",
        item_weight: "",
        quantity: "",
        product_attributes: [],
        price: "",
        offerprice: "",
        currency: "",

        minimumorder: "",
        valid_till: "",
        vat: "",
        files: [],
        information: "",

        stock_location_id: "",
        location_country: "",
        location_city: "",
        location_street: "",
        location_area: "",
        location_building: "",
        lastCategoryName: ""
      },
      myattrs: [],
      minOrdRequired: false,
      attrbitrLength: 0,
      atrributeChoosed: false,
      showFourthcategory: false,
      stockLocations: [],
      shipemtDetails: [],
      InitialArray: [],
      attributes: [],
      currencies: "",
      categories: "",
      sub_categories: "",
      third_categories: "",
      fourth_categories: "",
      showDate: true,
      file: {},
      RealArray: [],
      temp: "",
      ShowChooseFile: true,
      showLoading: false,
      selectedAttrs: {}
    };
  },

  components: {
    inputComponent,
    breadcrumbs,
    VueTagsInput,
    DatePick,
    SearchAttributes,
    SearchStockLocation,
    vueDropzone: vue2Dropzone,
    SearchShipment,
    VueEditor,
    CategorySearch,
    GoogleMap,
    Cropper
  },

  methods: {
    //TODO:
    // Before Submitting a Form
    // 1. Fill Up Categories in the l1value, l1id
    // 2. Delete undefined items in form.product_attributes

    onMainOptionsSearch (search, loading) {
      loading(true);

      if (search.length < 2) {
        loading(false);
        return;
      }
      this.search(loading, search, this);
    },
    search: debounce(async (loading, search, vm, object, api) => {
      try {
        const res = await axios.post("/api_all_market_categories", { search });
        const { success, categories } = await res.data;
        if (success) {
          vm.mainOptions = await categories;
          loading(false);
          return
        } else {
          loading(false);
          return
        }
      } catch (error) {
        console.log(error);
        loading(false);
        return
      }
    }, 400),
    onBrandSearch (search, loading) {
      loading(true);
      this.brandSearch(loading, search, this);
    },
    brandSearch: debounce(async (loading, search, vm, object, api) => {
      try {
        const res = await axios.post("/api_product_brands", {
          search,
          product_type: "item"
        });
        const { success, result } = await res.data;
        if (success) {
          vm.brands = await result;
          loading(false);
        } else {
          vm.brands.push({ brand: search });
          loading(false);
        }
      } catch (error) {
        console.log(error);
        loading(false);
      }
    }, 400),

    async onStockLocationSearch (search, loading) {
      loading(true);
      this.stockLocationSearch(loading, search, this)
    },
    stockLocationSearch: debounce(async (loading, search, vm) => {
      try {
        const res = await axios.post("/api_product_stock_location", {
          search,
        });
        const { success, result } = await res.data;
        if (success) {
          await result.forEach(o => {
            o["address"] = `${o.building}, ${o.street}, ${o.area}, ${o.city}, ${o.country}`
          })
          vm.stockLocations = await result;
          loading(false);
        } else {
          loading(false);
        }
      } catch (error) {
        console.log(error);
        loading(false);
      }
    }, 400),
    stockLocationSelected (value) {
      if (!value) {
        this.form.stock_location_id = ""
        return
      }
      this.form.stock_location_id = value.id;
      this.form.location_area = value.area;
      this.form.location_street = value.street;
      this.form.location_city = value.city;
      this.form.location_country = value.country;
      this.form.location_building = value.building;

      console.log(value)
    },
    assignKeyValue (key, value) {
      this.form[key] = value;
    },
    async loadCategories (id, object, main = false) {
      const response = await this.$store.dispatch("loadCategories", id);
      if (main) {
        this[object] = await response.category;
        return;
      }
    },
    async autoSelectOtherCategories () {
      this.subCategory2Options = [];
      this.subCategory3Options = [];
      this.subCategory4Options = [];
      this.subCategory2 = null;
      this.subCategory3 = null;
      this.subCategory4 = null;
      const response = await this.$store.dispatch(
        "SelectCategory",
        this.mainSelected.category_id
      );
      this.subCategory1 = {
        categoryname: response.categories["1"].name,
        category_id: response.categories["1"].category_id
      };
      this.subCategory2 = {
        categoryname: response.categories["2"].name,
        category_id: response.categories["2"].category_id
      };
      this.subCategory3 = {
        categoryname: response.categories["3"].name,
        category_id: response.categories["3"].category_id
      };
      await this.subCategory1Selected("auto");
      await this.subCategory2Selected("auto");
      await this.subCategory3Selected("auto");

      console.log(response);
    },
    async subCategory1Selected (type) {
      console.log("1 Selected");
      if (type !== "auto") {
        this.mainSelected = "";
        this.mainOptions = [];
        this.subCategory2Options = [];
        this.subCategory3Options = [];
        this.subCategory4Options = [];
        this.subCategory2 = "";
        this.subCategory3 = "";
        this.subCategory4 = "";
      }

      const { category } = await this.$store.dispatch(
        "loadCategories",
        this.subCategory1.category_id
      );
      if (!category) {
        this.loadProductAttributes(this.subCategory1.category_id);
        this.allCategoriesSelected = true;
        return;
      }
      this.subCategory2Options = await category;
    },
    async subCategory2Selected () {
      console.log("2 Selected");
      const { category } = await this.$store.dispatch(
        "loadCategories",
        this.subCategory2.category_id
      );
      if (!category) {
        this.loadProductAttributes(this.subCategory2.category_id);
        this.allCategoriesSelected = true;
        return;
      }
      this.subCategory3Options = await category;
    },
    async subCategory3Selected () {
      this.subCategory4Options = [];
      console.log("3 Selected");
      const { category } = await this.$store.dispatch(
        "loadCategories",
        this.subCategory3.category_id
      );
      if (!category) {
        this.loadProductAttributes(this.subCategory3.category_id);
        this.allCategoriesSelected = true;
        return;
      }
      this.subCategory4Options = await category;
    },
    async subCategory4Selected () {
      console.log("4 Selected");
      this.allCategoriesSelected = true;
      this.loadProductAttributes(this.subCategory4.category_id);
    },
    async loadProductAttributes (id) {
      this.productAttributes = [];
      this.form.product_attributes = [];
      const response = await this.$store.dispatch("loadProductAttributes", id);
      if (response) {
        this.productAttributes = response;
      }
      console.log("Product Attributes Loaded.");
    },
    checkValidation (field) {
      return this.submitted && !this.$v.form[field].required;
    },
    checkValidationCustom (field, validation) {
      return this.submitted && this.$v.form[field][validation];
    },
    onSearchUnits (search, loading) {
      loading(true);
      // this.form.unit = search;

      const data = {
        product_type: "item",
        search: search
      };
      this.$store
        .dispatch("GET_UNITS", data)
        .then(response => {
          loading(false);
          this.options = response.data.result;
        })
        .catch(error => console.log(error));
    },
    trimDoubleQuote (event) {
      const val = event.target.value;
    },

    isFutureDate (date) {
      const currentDate = new Date();
      return date < currentDate;
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
    validatePrice () {
      if (this.form.price == "" && this.form.offerprice != "") {
        this.showPriceError = "Please enter price field";
      } else {
        this.showPriceError = "";
      }
      if (this.form.price != "" && this.form.offerprice != "") {
        const offer = parseInt(this.form.offerprice);
        const price = parseInt(this.form.price);
        if (offer >= price) {
          this.showOfferError = true;
          this.offerError = "Offer price should be lesser than original price";
          this.form.offerprice = "";
        } else {
          this.showOfferError = false;
          this.offerError = "";
        }
      }
    },
    update (newTags) {
      this.form.tags = [];
      const activity = newTags.map(tag => {
        this.form.tags.push(tag.text);
      });
    },
    // setBrandName (name) {
    //   this.form.brand = name;
    // },
    // setAttributeName (key, value) {
    //   // const valueString = value.toString();
    //   // const keyString = key.toString();

    //   this.selectedAttrs[key] = value;

    //   //  this.form.product_attributes[keyString] = valueString;
    // },
    // restrictNumber($event)
    // {
    //   const vat = parseInt(this.form.vat);
    //   console.log(this.form.vat);
    //   if (vat > 100) {
    //       $event.preventDefault();

    //   }
    // },
    restrictdigit () {
      if (this.form.vat > 100) {
        this.form.vat = 100;
      }
    },
    onlyNumber ($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    searchShipment (name) {
      if (name != undefined) {
        this.showShipentDetails = true;
        this.shipemtDetails = name;
      }
    },
    clickStockLocation (name) {
      if (name != undefined) {
        const { id, city, country, area } = name;
        this.form.stock_location_id = id;
        this.form.location_country = country;
        this.form.location_city = city;
        this.form.location_area = area;
        this.stockLocations = name;
        this.showStockLocations = true;
      }
    },

    // changeAttributes (event, keyName) {
    //   if (event.target.value != "") {
    //     const data = (this.selectedAttrs[keyName] = event.target.value);
    //   }
    // },
    loadCurrency () {
      this.$store
        .dispatch("GET_COUNTRY")
        .then(response => {
          this.currencies = response.data.result;
        })
        .catch(error => console.log(error));
    },
    // loadUnit() {
    //this.$store.dispatch("GET_UNITS", "item");
    //},
    change_market () {
      if (this.form.market_type == "supply") {
        this.showDate = false;
      } else if (this.form.market_type == "demand") {
        this.showDate = true;
      }
    },
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
    // searchCategory (id, name) {
    //   this.form.categories = [];
    //   this.sub_categories = [];
    //   this.third_categories = [];
    //   this.fourth_categories = [];
    //   this.showSubcategory = false;
    //   this.showThirdcategory = false;
    //   this.showFourthcategory = false;
    //   this.form.l2value = "";
    //   this.form.l3value = "";
    //   this.form.l4value = "";

    //   this.$store
    //     .dispatch("SelectCategory", id)
    //     .then(response => {
    //       this.attributes = [];
    //       this.form.lastCategoryName = "";
    //       const categories = response.categories;
    //       this.form.l1value = categories[1].name;
    //       this.form.l1id = categories[1].category_id;
    //       this.getOnLoadSubcategory(categories[1].category_id);
    //       this.showSubcategory = true;
    //       this.category = categories[1].name;

    //       if (categories[2] != undefined) {
    //         this.getOnLoadThirdcategory(categories[2].category_id);
    //         this.form.l2value = categories[2].name;
    //         this.form.l2id = categories[2].category_id;
    //         this.sub_category = categories[2].name;
    //       }
    //       if (categories[3] != undefined) {
    //         this.getOnLoadThirdcategory(categories[2].category_id);
    //         this.third_category = categories[3].name;
    //         this.form.l3value = categories[3].name;
    //         this.form.l3id = categories[3].category_id;

    //         this.getOnLoadFourthcategory(categories[3].category_id);
    //         if (response.isChildrenAvailable == false) {
    //           this.showFourthcategory = false;
    //           this.form.lastCategoryName = categories[3].name;
    //           this.loadAttributes(categories[3].category_id);
    //         }
    //       }
    //       if (categories[4] != undefined) {
    //         this.showFourthcategory = true;
    //         this.getOnLoadFourthcategory(categories[3].category_id);
    //         this.form.lastCategoryName = categories[4].name;
    //         this.loadAttributes(categories[4].category_id);

    //         this.form.l4value = categories[4].name;
    //         this.fourth_category = categories[4].name;
    //       }
    //       Object.keys(categories).forEach(element => {
    //         this.form.categories.push(categories[element].name);
    //       });
    //     })
    //     .catch(error => console.log(error));
    // },
    // loadBrand()
    // {

    // },
    // change_categories (event) {
    //   this.category = "";
    //   this.isAllCategorySelected = "";
    //   this.attributes = [];
    //   this.selectedAttrs = {};
    //   this.myattrs = [];
    //   this.form.lastCategoryName = "";
    //   if (event.target.options.selectedIndex > -1) {
    //     let value =
    //       event.target.options[event.target.options.selectedIndex].dataset.foo;
    //     console.log("value" + value);
    //     if (value != "") {
    //       this.category = value;
    //       this.form.categories = [this.category];
    //     }
    //   }
    //   const id = event.target.value;

    //   this.selectedDropdown = "category";

    //   this.sub_categories = [];
    //   this.third_categories = [];
    //   this.fourth_categories = [];
    //   if (this.category == "") {
    //     this.form.categories = [];
    //   } else {
    //     this.LoadProductCategory(id);
    //   }
    // },
    // change_subcategory (event) {
    //   this.isAllCategorySelected = "";
    //   this.attributes = [];
    //   this.selectedAttrs = {};
    //   this.form.lastCategoryName = "";
    //   this.attributes = [];
    //   this.sub_category = "";

    //   const id = event.target.value;

    //   if (event.target.options.selectedIndex > -1) {
    //     let value =
    //       event.target.options[event.target.options.selectedIndex].dataset.foo;

    //     if (value != "") {
    //       this.sub_category = value;

    //       this.form.categories = [this.category, this.sub_category];
    //     } else {
    //       this.third_categories = [];
    //       this.fourth_categories = [];
    //       this.form.categories = [this.category];
    //     }
    //   }
    //   this.selectedDropdown = "sub_category";

    //   if (this.sub_category == "") {
    //   } else {
    //     this.LoadProductCategory(id);
    //   }
    // },
    // change_thirdcategory (event) {
    //   this.isAllCategorySelected = "";
    //   this.attributes = [];
    //   this.selectedAttrs = {};
    //   this.form.lastCategoryName = "";
    //   this.attributes = [];
    //   this.selectedDropdown = "third_category";
    //   this.third_category = "";
    //   const id = event.target.value;
    //   if (event.target.options.selectedIndex > -1) {
    //     let value =
    //       event.target.options[event.target.options.selectedIndex].dataset.foo;
    //     this.form.lastCategoryName = value;
    //     if (value != "") {
    //       this.third_category = value;
    //       this.form.categories = [
    //         this.category,
    //         this.sub_category,
    //         this.third_category
    //       ];
    //     } else {
    //       this.third_category = value;
    //       this.form.categories = [this.category, this.sub_category];
    //     }
    //   }
    //   this.fourth_categories = [];

    //   if (this.third_category != "") {
    //     this.LoadProductCategory(id);
    //   }
    // },
    // change_fourthcategory (event) {
    //   this.isAllCategorySelected = "";
    //   this.attributes = [];
    //   this.selectedAttrs = {};
    //   this.form.lastCategoryName = "";
    //   this.selectedDropdown = "fourth_category";
    //   this.fourth_category = "";
    //   const id = event.target.value;
    //   if (event.target.options.selectedIndex > -1) {
    //     let value =
    //       event.target.options[event.target.options.selectedIndex].dataset.foo;
    //     this.form.lastCategoryName = value;
    //     this.form.l4value = value;
    //     if (value != "") {
    //       this.fourth_category = value;
    //       this.form.categories = [
    //         this.category,
    //         this.sub_category,
    //         this.third_category,
    //         this.fourth_category
    //       ];
    //     } else {
    //       this.form.l4value = "";
    //       this.fourth_category = value;
    //       this.form.categories = [
    //         this.category,
    //         this.sub_category,
    //         this.third_category
    //       ];
    //     }
    //   }
    //   if (this.fourth_category != "") {
    //     this.loadAttributes(id);
    //   }
    // },
    // LoadProductCategory (id) {
    //   this.$store
    //     .dispatch("loadCategories", id)
    //     .then(response => {
    //       const { category, success } = response;
    //       if (this.selectedDropdown == "category") {
    //         this.sub_categories = category;
    //       } else if (this.selectedDropdown == "sub_category") {
    //         this.third_categories = category;
    //       } else if (this.selectedDropdown == "third_category") {
    //         this.fourth_categories = category;
    //         if (!category) {
    //           this.showFourthcategory = false;
    //           this.loadAttributes(id);
    //         } else {
    //           this.showFourthcategory = true;
    //         }
    //       } else {
    //         this.categories = category;
    //       }
    //     })
    //     .catch(error => console.log(error));
    // },
    // getOnLoadSubcategory (id) {
    //   this.$store
    //     .dispatch("loadCategories", id)
    //     .then(response => {
    //       const { category, success } = response;
    //       console.log(category);
    //       this.sub_categories = category;
    //     })
    //     .catch(error => console.log(error));
    // },
    // getOnLoadThirdcategory (id) {
    //   this.$store
    //     .dispatch("loadCategories", id)
    //     .then(response => {
    //       const { category, success } = response;
    //       this.third_categories = category;
    //     })
    //     .catch(error => console.log(error));
    // },
    // getOnLoadFourthcategory (id) {
    //   this.$store
    //     .dispatch("loadCategories", id)
    //     .then(response => {
    //       const { category, success } = response;
    //       if (category != undefined) {
    //         this.showFourthcategory = true;
    //       } else {
    //         this.showFourthcategory = false;
    //       }
    //       this.fourth_categories = category;
    //     })
    //     .catch(error => console.log(error));
    // },
    toggleDiv (name) {
      console.log("object");
      if (name == "showProductInfo") {
        this.showProductInfo = !this.showProductInfo;
      } else if (name == "showProductCategory") {
        this.showProductCategory = !this.showProductCategory;
      } else if (name == "showProductPrice") {
        this.showProductPrice = !this.showProductPrice;
      } else if (name == "showProductShipping") {
        this.showProductShipping = !this.showProductShipping;
      } else if (name == "showProductStock") {
        this.showProductStock = !this.showProductStock;
      } else if (name == "showProductVisibility") {
        this.showProductVisibility = !this.showProductVisibility;
      } else if (name == "showProductImages") {
        this.showProductImages = !this.showProductImages;
      } else if (name == "showProductDescription") {
        this.showProductDescription = !this.showProductDescription;
      } else if (name == "showProductMap") {
        this.showProductMap = !this.showProductMap;
      }
    },

    // loadAttributes (id) {
    //   this.isAllCategorySelected = true;
    //   this.$store

    //     .dispatch("loadProductAttributes", id)
    //     .then(response => {
    //       this.atrributeChoosed = true;
    //       this.attributes = response;
    //       this.myattrs = [];
    //       this.selectedAttrs = {};
    //       this.attributes.forEach(attribute => {
    //         this.myattrs.push(attribute.name);
    //         console.log(attribute);
    //       });
    //       console.log(this.myattrs.length);
    //       this.attrbitrLength = this.myattrs.length;
    //       // let result = Object.entries(this.selectedAttrs).map(([k, v]) => ({
    //       //   [k]: v
    //       // }));
    //       // this.form.product_attributes = result;
    //     })
    //     .catch(error => console.log(error));
    // },
    // enter () {
    //   if (this.brands[this.arrowCounter] != undefined) {
    //     this.form.brand = this.brands[this.arrowCounter].brand;
    //   }
    //   this.showBrands = false;
    //   console.log(this.form);
    // },

    //When up pressed while suggestions are open
    // up (e) {
    //   e.preventDefault();
    //   if (this.arrowCounter > 0) {
    //     this.arrowCounter = this.arrowCounter - 1;
    //   }
    // },

    //When up pressed while suggestions are open
    // down (e) {
    //   e.preventDefault();

    //   this.arrowCounter = this.arrowCounter + 1;
    // },
    addProduct (e) {
      e.preventDefault();

      console.log(this.form);
      this.submitted = true;
      this.success = false;
      this.qtyRequired = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      } else if (!this.allCategoriesSelected) {
        alert("Select Categories");
        return;
      }

      //round price
      if (this.form.price) {
        this.form.price = parseFloat(this.form.price).toFixed(2);
      }
      if (this.form.offerprice) {
        this.form.offerprice = parseFloat(this.form.offerprice).toFixed(2);
      }

      Object.keys(this.form).forEach((key, index) => {
        // debugger;
        if (
          typeof this.form[key] == "string" ||
          typeof this.form[key] == "number" ||
          typeof this.form[key] == "boolean"
        ) {
          this.form[key] = this.form[key].replace(/['"]+/g, "");
        }
        if (key == "tags" && this.form.tags.length > 0) {
          this.form.tags.forEach((key, index) => {
            this.form.tags[index] = key.replace(/['"]+/g, "");
          });
        }
      });

      this.subCategory1
        ? this.form.categories.push(this.subCategory1.categoryname)
        : null;
      this.subCategory2
        ? this.form.categories.push(this.subCategory2.categoryname)
        : null;
      this.subCategory3
        ? this.form.categories.push(this.subCategory3.categoryname)
        : null;
      this.subCategory4
        ? this.form.categories.push(this.subCategory4.categoryname)
        : null;

      // this.form.product_attributes = this.form.product_attributes.filter(
      //   function (element) {
      //     element.replace(/['"]+/g, "");
      //     return element !== undefined;
      //   }
      // );

      // const length = Object.keys(this.selectedAttrs).length;
      // if (length > 0) {
      //   if (length == this.attrbitrLength) {
      //     for (let key in this.selectedAttrs) {
      //       if (this.selectedAttrs[key] == "") {
      //         return;
      //       }
      //     }
      //   } else {
      //     return;
      //   }
      // } else {
      //   this.showAttributeError = "Please add attributes";
      //   return;
      // }

      // let result = Object.entries(this.selectedAttrs).map(([k, v]) => ({
      //   [k]: v.replace(/['"]+/g, "")
      // }));

      // this.form.product_attributes.push(...result);
      if (this.form.market_type == "supply") {
        this.form.valid_till = "";
      } else {
        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ];
        let current_datetime = new Date();
        let formatted_date =
          current_datetime.getDate() +
          " " +
          months[current_datetime.getMonth()] +
          " " +
          current_datetime.getFullYear();
        this.form.valid_till = formatted_date;
      }

      this.btnDisable = true;
      this.showLoader = true;
      var i = 0;

      if (this.RealArray.length >= 1) {
        this.RealArray.forEach(file => {
          let formData = new FormData();
          formData.append("file", file);
          axios
            .post("/api_fileupload_google", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(response => {
              i++;
              this.form.files.push(response.data.results.files[0].fileUrl);
              if (this.RealArray.length === i) {
                this.$store
                  .dispatch("uploadProduct", this.form)
                  .then(response => {
                    console.log(this.form);
                    if (response.data.success == true) {
                      var self = this;
                      Object.keys(this.form).forEach(function (key, index) {
                        if (
                          key == "shipping_type" ||
                          key == "visibility" ||
                          key == "product_type" ||
                          key == "market_type" ||
                          key == "is_limited"
                        ) {
                        } else {
                          self.form[key] = "";
                        }
                      });
                      this.submitted = false;
                      this.qtyRequired = false;
                      this.minOrdRequired = false;
                      this.form.is_limited == "unlimited";
                      this.isAllCategorySelected = "";
                      this.sub_categories = "";
                      this.third_categories = "";
                      this.fourth_categories = "";
                      this.success = true;
                      this.form.files = [];
                      this.form.product_attributes = [];
                      this.stockLocations = [];
                      this.showStockLocations = false;
                      this.RealArray = [];
                      this.form.tags = [];
                      this.tags = [];

                      this.attributes = [];

                      this.InitialArray = [];
                      this.selectedAttrs = {};
                      this.attrbitrLength = 0;
                      this.atrributeChoosed = false;
                      this.btnDisable = false;
                      this.showLoader = false;

                      this.$swal.fire(
                        this.$helpers.successPopup(
                          "Product has been uploaded succesfully"
                        )
                      );
                    } else {
                      this.RealArray = [];
                      this.InitialArray = [];
                      this.selectedAttrs = {};
                      this.btnDisable = false;
                      this.showLoader = false;
                      this.$swal.fire(
                        this.$helpers.errorPopup(response.data.message)
                      );
                      console.log(this.form);
                    }
                  })
                  .catch(response => {
                    this.btnDisable = false;
                    this.showLoader = false;
                    this.btnDisable = false;
                    this.showLoader = false;
                    this.$swal.fire(this.$helpers.errorPopup(response));
                    console.log(response);
                  });
              }
            })

            .catch(error => {
              this.showLoader = false;
              this.btnDisable = false;
              this.$swal.fire(this.$helpers.errorPopup(error));
              console.log(error);
            });
        });
      }
    },

    onClickAddMap (value) {
      // this.form.latitude = value.geometry.location.lat();
      // this.form.longitude = value.geometry.location.lng();
    },

    checkHasShipment () {
      this.$store.dispatch("getProductShipping");
      this.$store.dispatch("getProductStockLocation");
    },
    async autoFillCategories (search) {
      const catRes = await axios.post("/api_all_market_categories", { search });
      const { success, categories } = await catRes.data;
      if (success) {
        this.mainOptions = await categories;
        this.mainSelected = await categories.find(el => el.categoryname === search)
        await this.autoSelectOtherCategories()
        return true;
      }
      return;
    },
    async loadProductandDetails () {
      const productId = await this.$route.query.productId;
      if (!productId && this.form.action_type === 'add') return;

      // 1. Fetch Product Details
      const res = await this.$store
        .dispatch("productDetails", productId);
      this.productDetails = await res;
      // 2. Assign action_type = 'update'
      this.form.action_type = "update";
      //3. Assign Values to Form (Prefill)
      for (const key in res) {

        //4. If Categories then assign to 1,2,3,4 categories
        if (key === 'categories') {
          if (!res.categories[1]) {
            await this.autoFillCategories(res.categories[0]); this.allCategoriesSelected = true; continue;
          }
          if (!res.categories[2]) {
            await this.autoFillCategories(res.categories[1]); this.allCategoriesSelected = true; continue;
          }
          if (!res.categories[3]) {
            await this.autoFillCategories(res.categories[2]); this.allCategoriesSelected = true; continue;
          }
        }
        //5. Price Key is diff. in DB
        if (key === 'unitprice' || key === 'price') {
          this.form.price = parseFloat(res.unitprice, 2) || parseFloat(res.price, 2);
        }
        //6. Get Tags
        if (key === 'tags') {
          this.tags = res.tags;
        }
        //7. Images
        if (key === 'images') {
          this.InitialArray = await res.images.map(el => el.file);
          this.RealArray = this.InitialArray;
        }

        this.form[key] = await res[key];
      }
    }
  },

  computed: {
    // dateFormat: {
    //   get () {
    //     return this.$material.locale.dateFormat
    //   },
    //   set (val) {
    //     this.$material.locale.dateFormat = val

    // },
    // },
    ...mapState({
      units: state => state.general.units,
      productShipping: state => state.store.productShipping,
      productStockLocation: state => state.store.productStockLocation
    })

    // ready () {
    //   return this.childFooIsReady && this.childBarIsReady

    //}
  },
  watch: {
    '$route.query.productId': {
      handler: function (id) {
        this.loadProductandDetails()
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    //get tomorow date
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var date = year + "/" + month + "/" + day;
    this.form.valid_till = date;

    this.form.market_type = this.$route.query.market_type;
    if (this.form.market_type == "supply") {
      this.showDate = false;
    } else if (this.form.market_type == "demand") {
      this.showDate = true;
    } else {
      this.form.market_type == "supply";
      this.showDate = false;
    }
    this.loadCurrency();
    //this.loadUnit();
    // this.LoadProductCategory();
    this.loadCategories(null, "subCategory1Options", true);

    this.checkHasShipment();

  }
};
</script>
<style scoped>
/* Abhishek */
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
/* ---------------TITLE END------------- */
.date_picker {
  border: solid 1px #c8d2e0;
  padding: 5px 10px;
  border-radius: 5px;
}
.icoWrap {
  width: 25px;
  height: 25px;
  display: inline-flex;
}
.icoWrap {
  margin: 0;
  color: #ff5722;
}
.label {
  padding-bottom: 5px;
}
.category {
  padding: 10px 5px 10px;
}
.note {
  font-size: 12px;
  /* padding-top: 8px; */
  background-color: #ffeae5;
  color: #fe5823;
  padding: 10px;
  margin-top: 8px;
  font-weight: bold;
}

.productAttributes {
  padding: 19px 0px;
  background-color: #f3f6f9;
  border-radius: 2px;
  margin: 0px;
}
#app {
  width: 100%;
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
.save-image {
  padding: 10px 0px;
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
.categories:not(:last-child) {
  margin-right: 25px;
}

.market_type {
  margin-top: 22px;
  margin-right: 25px;
}
.attributes-select select {
  text-transform: capitalize;
}
/* .attr-wrapper .ctSelect:nth-child(2n+0){
  margin-left: 10px;
} */
.add-meadia-bx {
  border: 1.4px dotted #d2d2d2;
  padding: 11px;
  margin: 0;
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
.offer-discount {
  display: inline-block;
  margin-top: 4px;

  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  /* padding: 0px; */
  margin-right: 6px;
  padding: 4px 10px 4px 10px;
}
.offer-discount.payment {
  color: rgb(56, 174, 4);
  background-color: #d7efd4;
}
.offer-discount.delivery {
  color: rgb(254, 87, 34);
  background-color: #ffeae5;
}

.attributes-select {
  margin: 10px 0px;
}
.frm-hdr-1 {
  margin-bottom: 1.7em;
  display: flex;
  align-items: center;
}
.frm-hdr-1-icn {
  color: #ff5722 !important;
  margin-right: 5px;
}
.frm-hdr-1-txt {
  color: #2a3234;
  font-weight: 500;
  font-size: 22px;
}
.filled-det-bx {
  background: #f1f1f1;
  margin: 20px 0px;
  padding-top: 10px;
}
.bx-tp-fl-1-txt-1 {
  font-size: 16px;
  color: #213a63;
  line-height: 1.5;
  font-weight: 400;
  margin-right: 10px;
  display: inline-block;
  width: 220px;
}
.bx-tp-fl-1 {
  padding: 10px;
  display: flex;
  padding-top: 0px;
  align-items: center;
}
.md-chip {
  height: 27px;
  line-height: 27px;
  text-transform: capitalize;
}
.bx-tp-fl-1-txt-1-cnt {
  display: flex;
  align-items: center;
}
.bx-tp-fl-1-txt-1-cnt-icn {
  margin-right: 5px;
  color: #64dd17 !important;
}
.bx-tp-fl-1-txt-2 {
  font-size: 15px;
  text-transform: capitalize;
}
.btn-wrp-1 {
  margin-bottom: 60px;
  margin-top: 30px;
}
.md-checkbox-label {
  color: #213a63 !important;
}
.md-checkbox {
  margin: 10px 16px 11px 0;
}
.btn-wrp-2 {
  text-align: left;
  padding-left: 50px;
  margin-bottom: 20px;
}
.wrapIn {
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 10px;
  padding: 21px;
}
.adding-box-wrap {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#result {
  margin: 0px auto;
  background-color: #fff;
  width: 89%;
  position: absolute;
  z-index: 2;
  /* margin: 0px auto; */
  /* margin-left: 8px; */
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
#result ul li {
  text-align: left;
  padding: 8px 0px;
  text-transform: capitalize;
  padding-left: 10px;
}
#result ul li.is-active,
#result ul li:hover {
  background-color: #d2d2d2;
  cursor: pointer;
  font-weight: 600;
}
.sectionTitle {
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
.adding-box-1-cnt {
  margin-bottom: 1.55em;
}
.md-layout-item-wrap .md-layout-item {
  display: inline-flex;
}
.md-layout-item-wrap {
  padding: 11px;
  background-color: #f3f6f9;
  border-radius: 2px;
}
.c-formSearch {
  margin: 11px 0;
}

/* .radio-pill .md-radio.md-theme-default.md-checked[data-v-e9275114] {
  background: #f7c8b8;
  color: #fff;
} */
.radio-pill .item .md-radio-label {
  padding-left: 9px;
}
.radio-pill {
  display: inline-flex;
  border: 1px solid #ddd;
  height: 41px;
  border-radius: 19px;
  align-items: center;
  margin-right: 9px;
}
.md-radio.item label {
  padding-left: 9px;
}
.radio-pill .md-radio {
  margin: 8px;
  margin-top: 9px;
  display: flex;
  position: relative;
  padding: 0px 11px;
  border-radius: 32px;
  background-color: rgb(255, 255, 255);
  margin-left: 5px;
  max-width: 100%;
  width: 100%;
}
.sectionTitle.ifButton {
  justify-content: space-between;
}
.addBtn {
  height: 31px;
  width: auto;
}
.loader {
  position: relative;
  top: -20px;
  left: 17px;
}

.circle-loader {
  position: absolute;
  z-index: 10;
  bottom: -42px;
  left: 54%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 5px solid rgba(0, 0, 0, 0.2);
  border-top: 5px solid #ffff;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
.attr {
  width: 100%;
  text-align: left;
  margin-bottom: 1.1em;
  padding: 7px;
  line-height: 1.4;
}
.note {
  font-size: 12px;
  /* padding-top: 8px; */
  background-color: #ffeae5;
  color: #fe5823;
  padding: 10px;
  margin-top: 8px;
  font-weight: bold;
}
.chipnoEffect.bgFor {
  padding: 11px;
  background-color: #f9f9f9;
  border-radius: 2px;
  margin-top: 2em;
}
.shipAddress {
  text-align: left;
  line-height: 1.4;
  margin-top: 5px;
  padding: 11px;
  background-color: #f3f6f9;
  border-radius: 2px;
}
.shipAddress li {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 0.5em;
  font-size: 14px;
}
.shipAddress li span {
  width: 100%;
  max-width: 200px;
  color: #878787;
}
.pillWrap {
  display: flex;
  justify-content: flex-start;
  margin-top: 0.44em;
}
.btnWrap {
  letter-spacing: 1px;
  font-weight: 500;
  font-size: 15px;
  padding: 10px;
}
/* .btnWrap button {
  font-weight: 500;
  font-size: 15px;
  height: 45px;
  max-width: 175px;
  width: 100%;
} */
.backTo {
  margin-left: 1%;
  background-color: rgba(255, 87, 34, 0.2) !important;
}
.toggleboxBtn {
  height: 25px;
  min-width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.addWrap {
  display: inline-flex;
  margin-right: 1.77em;
}
.ico-btn-wrap {
  display: inline-flex;
  align-items: center;
}
.uploadWrap {
  max-width: 75%;
  margin: 0 auto;
}
.uploader-box {
  display: flex;
  justify-content: center;
}
.save-image button {
  height: 33px;
  min-width: 71px;
}
.img-selected-wrapper {
  display: flex;
  justify-content: center;
  /* margin-bottom: 1em;
        margin-top: 0.99em; */
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
.v--two {
  grid-template-columns: 28% 28%;
  grid-gap: 1.7%;
}

.inline-through {
  width: 100%;

  display: block !important;
}

.vdpComponent {
  display: block !important;
}
.c-formInput {
  float: left;
  border: solid 1px #c8d2e0 !important;
  padding: 10px 10px !important;
  border-radius: 6px !important;
  padding-left: 10px !important;
  width: 100% !important;
  margin-top: 0px !important;
  margin-bottom: 5px !important;
}

.c-formSelect select,
.c-formSelect {
  height: auto !important;
}
.c-formSelect {
  float: left;
  border: solid 1px #c8d2e0 !important;
  padding: 10px 10px !important;
  border-radius: 6px !important;
  padding-left: 10px !important;
  width: 100% !important;
  margin-top: 0px !important;
  margin-bottom: 5px !important;
}

.c-formLabel {
  font-size: 1.4rem !important;
  font-weight: 400 !important;
}

.vue-tags-input {
  max-width: 100% !important;
}
.input_vat input {
  padding-top: 18px !important;
  padding-bottom: 18px !important;
}

.fl {
  float: left;
}

@media screen and (max-width: 768px) {
  .left_align {
    clear: left;
  }
}
@media screen and (max-width: 600px) {
  .limitRadio {
    display: block;
    margin-bottom: 0em;
  }
  .limitRadio .md-radio {
    margin-bottom: 10px;
  }
}
@media screen and (max-width: 300px) {
  .adding-box-wrap {
    margin-left: -22px;
  }

  .adding-box-1-cnt {
    width: 175px;
  }
  .wrapIn {
    padding: 15px;
  }
  .frm-hdr-1-txt {
    color: #2a3234;
    font-weight: 500;
    font-size: 18px;
    margin-left: 17px;
  }
}
</style>
