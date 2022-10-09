<template>
  <div>
    <div class="adding-box-wrap">
      <!-- <div class="frm-hdr-1 txt-algn-lft">
        <div class="frm-hdr-1-txt">Add Product</div>
      </div> -->
      <div class="md-layout md-gutter md-alignment-center-space-between page-title">
        <div class="md-layout-item width_100">
          <div class="frm-hdr-1-txt txt-algn-lft">
            {{
              this.$route.query.productId ? "Update" : demandOrSupplyPrefix()
            }}
            Product
          </div>
        </div>
        <breadcrumbs :items="breadcrumbs"></breadcrumbs>
      </div>
      <loader v-if="loader"></loader>
      <div
        class="container padding_mob "
        v-else
      >
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
              <span
                class="material-icons"
                v-if="showProductInfo"
              >keyboard_arrow_up</span>
              <span
                class="material-icons"
                v-else
              >keyboard_arrow_down</span>
            </button>
          </div>

          <div
            class="c-form mt-4 col-sm-12 p-0 mob_margin_info"
            v-if="showProductInfo"
          >
            <transition
              name="fade"
              mode="out-in"
            >
              <div class="w-100 c-form">
                <input-component
                  label="Product Name *"
                  type="text"
                  v-model="form.name"
                  placeholder="Enter Product Name"
                  :error="checkValidation('name')"
                >
                </input-component>

                <div class="md-gutter m-0 col-sm-12 p-0">
                  <div class="col-sm-12 col-md-6 col-xl-4 p-0 fl ">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel">Product Condition *</label>
                      <div class="limitRadio">
                        <md-radio
                          v-model="form.product_condition"
                          value="new"
                          checked
                        >New</md-radio>
                        <md-radio
                          v-model="form.product_condition"
                          value="used"
                          checked
                        >Used</md-radio>
                        <md-radio
                          v-model="form.product_condition"
                          value="refurbished"
                          checked
                        >Refurbished</md-radio>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="md-gutter m-0 col-sm-12 p-0 margin_gutter">
                  <div class="col-sm-12 col-md-6 col-xl-4 p-0 fl">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel">Quantity *</label>
                      <div class="limitRadio">
                        <md-radio
                          v-model="form.is_limited"
                          value="unlimited"
                          checked
                        >Unlimited</md-radio>
                        <md-radio
                          class="mr-mob"
                          v-model="form.is_limited"
                          value="limited"
                          checked
                        >Limited</md-radio>
                      </div>
                    </fieldset>
                  </div>

                  <div class="col-sm-12 col-md-6 col-xl-4 pr-0 fl pl_mob">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel">Minimum Order (Optional)</label>
                      <input
                        class="c-formInput c-form-placeholder"
                        v-model.trim="form.minimumorder"
                        type="number"
                        min="1"
                        max="99999999"
                        name
                        placeholder="Enter Minimum Order"
                      />
                      <div class="c-forminlineError">
                        <span v-if="this.submitted && $v.form.minimumorder.$invalid">Mimum order should be less than quantity</span>
                      </div>
                    </fieldset>
                  </div>

                  <div
                    class="col-sm-12 col-md-6 col-xl-4 pr-0 fl left_align pl_mob"
                    v-if="form.is_limited == 'limited'"
                  >
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel">Available Quantity*</label>
                      <input
                        class="c-formInput c-form-placeholder"
                        v-model.trim="form.quantity"
                        required
                        type="number"
                        min="1"
                        name
                        placeholder="Enter Quantity"
                      />

                      <div class="c-forminlineError">
                        <span v-if="checkValidation('quantity')">Quantity is required</span>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <fieldset
                  class="inline-through text-left col-sm-12 col-md-4 col-xl-4 p-0 mt_calendar"
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
                    class="date_picker date_mob_product"
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

        <div class="adding-box-1-cnt wrapIn col-sm-12 pb_category">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">2</span>Product Category
            </div>
            <button
              @click="toggleDiv('showProductCategory')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span
                class="material-icons"
                v-if="showProductCategory"
              >keyboard_arrow_up</span>
              <span
                class="material-icons"
                v-else
              >keyboard_arrow_down</span>
            </button>
          </div>
          <div v-if="showProductCategory">
            <div class="md-layout category mt_mob_category">
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
            <div class="md-layout mrgn_category_tab">
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
                class="md-layout-item md-size-33 mob_width"
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
                <p
                  class="c-forminlineError"
                  style="text-align: center"
                >
                  Please Select All the Categories
                </p>
              </div>
            </div>

            <div
              class="md-layout md-gutter mt-4 md-alignment-center-center productAttributes margin_delivery"
              v-if="allCategoriesSelected"
            >
              <div class="md-layout-item md-size-100 padding_delivery ">
                <h3>Delivery Size</h3>
              </div>
              <input-component
                label="Length (meters) *"
                type="number"
                min="0.00"
                step="0.1"
                v-model="form.item_length"
                placeholder="Length (meters)"
                :error="checkValidation('item_length')"
              >
              </input-component>
              <input-component
                label="Width (meters) *"
                type="number"
                min="0.00"
                step="0.1"
                v-model="form.item_width"
                placeholder="Width (meters)"
                :error="checkValidation('item_width')"
              >
              </input-component>
              <input-component
                label="Height (meters) *"
                type="number"
                min="0.00"
                step="0.1"
                v-model="form.item_height"
                placeholder="Height (meters)"
                :error="checkValidation('item_height')"
              >
              </input-component>
              <input-component
                label="Weight (kg) *"
                type="number"
                min="0.00"
                step="0.1"
                v-model="form.item_weight"
                placeholder="Weight (meters)"
                :error="checkValidation('item_weight')"
              >
              </input-component>
              <input-component
                size="100"
                :custom="true"
              >
                <hr class="border_delivery" />
              </input-component>
              <div class="md-layout-item md-size-100 attribute">
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
                  :reduce="brand => brand.brand"
                  :options="brands"
                  @search="onBrandSearch"
                  placeholder="Search Brand."
                >
                </v-select>
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
                  :value="autoSelectAttributes(attribute.name)"
                  @input="
                    e => {
                      if (!e) {
                        form.product_attributes = [];
                        return;
                      }
                      form.product_attributes.push({
                        [attribute.name]: e
                      });
                    }
                  "
                  :options="attribute.optionalValue"
                  :placeholder="'Select ' + attribute.name"
                  taggable
                  push-tags
                >
                </v-select>
              </input-component>
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
              <span
                class="material-icons"
                v-if="showProductPrice"
              >keyboard_arrow_up</span>
              <span
                class="material-icons"
                v-else
              >keyboard_arrow_down</span>
            </button>
          </div>
          <div
            class="c-form mt-4 mob_margin_price"
            v-if="showProductPrice"
          >
            <div class="w-100 c-form v--three-columns v--odd dblock_mob">
              <div class="pillWrap">
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="All"
                    v-model.trim="form.pricing_type"
                  >All</md-radio>
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="Pricing"
                    v-model.trim="form.pricing_type"
                  >Show Pricing</md-radio>
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="Quotation"
                    v-model.trim="form.pricing_type"
                  >Quotation Based</md-radio>
                </div>
              </div>
            </div>
            <div
              class="w-100 c-form v--three-columns v--odd dblock_mob mob_margin_price_two"
              v-if="form.pricing_type !== 'Quotation'"
            >
              <fieldset class="inline-through text-left">
                <label class="c-formLabel">Price * </label>
                <input
                  min="1"
                  class="c-formInput c-form-placeholder"
                  v-model.trim="form.price"
                  type="number"
                  name
                  placeholder="Enter Price"
                />
                <div
                  class="c-forminlineError"
                  v-if="checkValidation('price')"
                >
                  Price is required
                </div>
              </fieldset>
              <fieldset class="inline-through text-left">
                <label class="c-formLabel">Offer Price (Optional)</label>
                <input
                  min="1"
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
                    :reduce="units => units.unit"
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
                <div
                  class="c-forminlineError"
                  v-if="checkValidation('unit')"
                >
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
                    :reduce="curr => curr.currency"
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
                <div
                  class="c-forminlineError"
                  v-if="checkValidation('vat')"
                >
                  VAT is required
                </div>
              </fieldset>
            </div>
            <fieldset class="inline-through text-left chipnoEffect bgFor">
              <label class="c-formLabel">Add Tags For product</label>
              <!-- <vue-tags-input
                class="tags-chip"
                v-model.trim="tag"
                :tags="tags"
                @tags-changed="update"
                placeholder="Add tags"
              /> -->
              <v-select
                v-model="form.tags"
                taggable
                multiple
              />
            </fieldset>
          </div>
        </div>
        <!-- <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle ifButton">
            <div><span class="squareBadge mr-3">4</span>Paid Shipping</div>
            <div class="ico-btn-wrap">
              <button
                @click="toggleDiv('showProductShipping')"
                type="button"
                class="md-button md-theme-default toggleboxBtn"
              >
                <span
                  class="material-icons"
                  v-if="showProductShipping"
                >keyboard_arrow_up</span>
                <span
                  class="material-icons"
                  v-else
                >keyboard_arrow_down</span>
              </button>
            </div>
          </div>
          <div
            class="c-form mt-4"
            v-if="showProductShipping"
          >
            <div class="w-100">
              <div class="pillWrap mt_pillwrap">
                <div class="radio-pill mob_radio_products">
                  <md-radio
                    class="item"
                    value="free_shipping"
                    v-model.trim="form.shipping_type"
                  >Free Shipping</md-radio>
                </div>
                <div class="radio-pill mob_radio_products mr-mob">
                  <md-radio
                    class="item"
                    value="paid_shipping"
                    v-model.trim="form.shipping_type"
                  >Paid Shipping
                  </md-radio>
                </div>
                <div class="addWrap Manageshipping">
                  <button class="md-button md-accent btnRedOutline md-theme-default addBtn btn_addpro">
                    <i class="material-icons">settings</i>
                    Manage shipping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle ifButton">
            <div><span class="squareBadge mr-3">5</span>Add Stock Location</div>
            <div class="ico-btn-wrap">
              <button
                @click="toggleDiv('showProductStock')"
                type="button"
                class="md-button md-theme-default toggleboxBtn"
              >
                <span
                  class="material-icons"
                  v-if="showProductStock"
                >keyboard_arrow_up</span>
                <span
                  class="material-icons"
                  v-else
                >keyboard_arrow_down</span>
              </button>
            </div>
          </div>
          <div
            class="c-form mt-4 margin_formSearch"
            v-if="showProductStock"
          >
            <div class="w-100">
              <div class="md-layout-item md-size-100 c-formSearch">
                <input-component
                  label="Stock Location"
                  custom="true"
                  :error="checkValidation('stock_location_id')"
                  size="100"
                >
                  <v-select
                    v-if="!showManageStockLocation"
                    autocomplete="new-stock"
                    label="address"
                    :options="stockLocations"
                    @input="stockLocationSelected"
                    placeholder="Search by City or Area."
                    :error="checkValidation('stock_location_id')"
                  >
                    <template v-slot:option="option">
                      <i class="md-icon icoWrap">location_on</i>
                      {{ option.address }}
                    </template>
                  </v-select>
                </input-component>
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
              <div
                class="md-layout-item md-size-100 c-formSearch"
                v-if="showManageStockLocation"
              >
                <center>
                  <div class="addWrap Manageshipping">
                    <router-link to="/dashboard/vendor/manage-stock-location">
                      <button class="md-button md-accent btnRedOutline md-theme-default addBtn btn_addpro">
                        <i class="material-icons">location_on</i>
                        Manage Stock Locations
                      </button>
                    </router-link>
                  </div>
                </center>
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
              <span
                class="material-icons"
                v-if="showProductVisibility"
              >keyboard_arrow_up</span>
              <span
                class="material-icons"
                v-else
              >keyboard_arrow_down</span>
            </button>
          </div>
          <div
            class="c-form mt-4"
            v-if="showProductVisibility"
          >
            <div class="w-100">
              <div class="pillWrap mt_pillwrap_two">
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="public"
                    v-model.trim="form.visibility"
                  >Public</md-radio>
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="private"
                    v-model.trim="form.visibility"
                  >Private</md-radio>
                </div>
                <div class="radio-pill mob_radio_products">
                  <md-radio
                    class="item"
                    value="company"
                    v-model.trim="form.visibility"
                  >Company</md-radio>
                </div>
                <div class="radio-pill mob_radio_products">
                  <md-radio
                    class="item"
                    value="personal"
                    v-model.trim="form.visibility"
                  >Personal</md-radio>
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
              <span
                class="material-icons"
                v-if="showProductImages"
              >keyboard_arrow_up</span>
              <span
                class="material-icons"
                v-else
              >keyboard_arrow_down</span>
            </button>
          </div>
          <div
            class="c-form mt-4"
            v-if="showProductImages"
          >
            <div class="w-100 mt-3 mt_product_img">
              <div class="uploadWrap">
                <div class="add-meadia-bx">
                  <div>
                    <div class="app">
                      <div
                        id="app"
                        v-if="isCropped"
                      >
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
                    <div
                      v-if="before_crop"
                      class="mb-3"
                    >
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
                            >close</span>
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
                    <div
                      @click="chooseFile"
                      v-if="ShowChooseFile"
                    >
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

        <div class="adding-box-1-cnt wrapIn pb_textarea">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">8</span>Product Description
            </div>
            <button
              @click="toggleDiv('showProductDescription')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span
                class="material-icons"
                v-if="showProductDescription"
              >keyboard_arrow_up</span>
              <span
                class="material-icons"
                v-else
              >keyboard_arrow_down</span>
            </button>
          </div>
          <div
            class="c-form mt-4"
            v-if="showProductDescription"
          >
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
                  <span v-if="!$v.form.information.required">Product Description is required</span>
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
        <div
          class="adding-box-1-cnt wrapIn"
          v-if="submitted && $v.$invalid"
        >
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">9</span>Error
            </div>
          </div>
          <div class="c-form mt-4">
            <div class="w-100">
              <div
                class="d-inline-flex align-center"
                style="color: #e01e5a"
              >
                Below mentioned fields are missing, kindly fill up them.
              </div>

              <p
                class="missing-field"
                v-for="(missing, id) in missingFields"
                :key="id"
              >
                {{ id + 1 }} : {{ missing }}
              </p>
            </div>
          </div>
        </div>
        <div class="md-layout md-alignment-center-center">
          <div class="md-layout-item">
            <center>
              <md-button
                class="md-raised md-accent btnWrap"
                @click="addProduct($event)"
                :disabled="btnDisable && submitted && $v.$invalid"
              >
                <div class="md-layout md-gutter md-alignment-center-center">
                  <div class="md-layout-item text_add">Add Product</div>
                  <transition
                    name="fade"
                    v-if="showLoader"
                  >
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
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";
import utils from "@/helpers/utils.js";
import loader from "@/components/pages/profileDashboard/components/loader.vue";

import {
  required,
  email,
  minLength,
  maxValue,
  decimal,
  sameAs,
  maxLength,
  checked
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin, utils],
  validations () {
    const fields = {
      name: {
        required,
        maxLength: maxLength(50)
      },
      product_condition: {
        required
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
        decimal,
        required
      },
      item_width: {
        decimal,
        required
      },
      item_height: {
        decimal,
        required
      },
      item_weight: {
        decimal,
        required
      },
      minimumorder: {
        decimal,
        maxValue: maxValue(100000000)
      }
    };
    if (this.form.is_limited == "limited") {
      fields.minimumorder = {
        decimal,
        maxValue: maxValue(this.form.quantity)
      };
      fields.quantity = {
        required
      };
    }
    if (this.form.pricing_type !== "Quotation") {
      fields.price = {
        required,
        decimal
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
      productId: "",
      productDetails: "",

      success: false,
      loader: false,
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
          link:
            "/dashboard/vendor/add?market_type=" + this.$route.query.market_type
        },
        {
          title: this.$route.query.productId
            ? "Update Product"
            : this.demandOrSupplyPrefix() + " Product",
          link:
            "/dashboard/vendor/item?market_type=" +
            this.$route.query.market_type
        }
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
      pricing: "Pricing",
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
      missingFields: [],
      showManageStockLocation: false,
      form: {
        action_type: "add",
        is_limited: "unlimited",
        visibility: "public",
        product_condition: "new",
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
        pricing_type: "All",
        price: "",
        offerprice: "",
        currency: "",
        unit: "",

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
        location_building: ""
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
    loader,

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
          return;
        } else {
          loading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        loading(false);
        return;
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

    async getStockLocations () {
      const res = await this.fetchAndAssign("/vendor/stock-location/get", {});
      // If No Locations Found Display the Manage Stock Location Button
      console.log(res, "Stock Locations")
      if (!res.success) {
        this.showManageStockLocation = true
        return
      }
      // If Locations Found then Display it
      await res.result.forEach(o => {
        o[
          "address"
        ] = `${o.building}, ${o.street}, ${o.area}, ${o.city}, ${o.country}`;
      });
      this.stockLocations = await res.result;
      return
    },
    stockLocationSelected (value) {
      if (!value) {
        this.form.stock_location_id = "";
        return;
      }
      this.form.stock_location_id = value.id;
      this.form.location_area = value.area;
      this.form.location_street = value.street;
      this.form.location_city = value.city;
      this.form.location_country = value.country;
      this.form.location_building = value.building;

      console.log(value);
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
      if (response.categories["4"]) {
        this.subCategory4 = {
          categoryname: response.categories["4"].name,
          category_id: response.categories["4"].category_id
        };
        await this.subCategory4Selected();
      }
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
    // checkValidation (field) {
    //   return this.submitted && !this.$v.form[field].required;
    // },
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
          this.options = response;
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
    // pixelsRestriction ({
    //   minWidth,
    //   minHeight,
    //   maxWidth,
    //   maxHeight,
    //   imageWidth,
    //   imageHeight
    // }) {
    //   return {
    //     minWidth: 220,
    //     minHeight: 220,
    //     maxWidth: 4000,
    //     maxHeight: 4000
    //   };
    // },
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
    // update (newTags) {
    //   this.form.tags = [];
    //   const activity = newTags.map(tag => {
    //     this.form.tags.push(tag.text);
    //   });
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
    loadCurrency () {
      this.$store
        .dispatch("GET_COUNTRY")
        .then(response => {
          this.currencies = response.data.result;
        })
        .catch(error => console.log(error));
    },

    change_market () {
      if (this.form.market_type == "supply") {
        this.showDate = false;
      } else if (this.form.market_type == "demand") {
        this.showDate = true;
      }
    },

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

    async addProduct (e) {
      e.preventDefault();

      console.log(this.form);
      this.submitted = true;
      this.success = false;
      this.qtyRequired = false;

      this.$v.$touch();
      if (this.$v.$invalid) {
        this.missingFields = [];
        for (const el in this.$v.form) {
          console.log(el);
          if (this.$v.form[el].$invalid) {
            this.missingFields.push(el.replaceAll("_", " "));
          }
        }
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

      const fileresponse = await this.getFileUrls(this);
      console.log(fileresponse);
      if (fileresponse == "fail" || fileresponse == "empty") return;

      console.log(this.form);

      const response = await this.$store.dispatch("uploadProduct", this.form);
      console.log(response);
      if (await !response.data.success) {
        this.loading = false;
        console.log(response);
        await this.$swal.fire(
          this.$helpers.errorPopup(
            `Error ${this.form.action_type}ing your Product.` +
            response.data.message
          )
        );
        return;
      } else {
        this.loading = false;
        console.log(this.form.action_type);
        await this.$swal.fire(
          this.$helpers.successPopup(
            `Your Product has been ${this.form.action_type}ed successfully.`
          )
        );
        await this.$router.push("/dashboard/vendor/manage-store/item");

        this.btnDisable = false;
        this.showLoader = false;
        return;
      }
    },

    checkHasShipment () {
      this.$store.dispatch("getProductShipping");
      this.$store.dispatch("getProductStockLocation");
    },

    // Only for Product "Update" => i.e when url has productId as query param
    async autoFillCategories (search) {
      const catRes = await axios.post("/api_all_market_categories", { search });
      const { success, categories } = await catRes.data;
      if (success) {
        this.mainOptions = await categories;
        this.mainSelected = await categories.find(
          el => el.categoryname === search
        );
        await this.autoSelectOtherCategories();
        return true;
      }
      return;
    },
    autoSelectAttributes (name) {
      // Bcz. if no attributes are selected then it will give error
      if (!this.form.product_attributes) return;
      return this.form.product_attributes.find(el =>
        Object.keys(el).find(k => k == name)
      );
    },
    async loadProductandDetails () {
      const productId = await this.$route.query.productId;
      if (!productId && this.form.action_type === "add") return;
      this.loader = "true";
      this.form.item_id = productId;
      // 1. Fetch Product Details
      const res = await this.$store.dispatch("productDetails", productId);
      this.productDetails = await res;
      // 2. Assign action_type = 'update'
      this.form.action_type = "update";
      //3. Assign Values to Form (Prefill)
      for (const key in res) {
        //4. If Categories then assign to 1,2,3,4 categories
        if (key === "categories") {
          if (!res.categories[1]) {
            await this.autoFillCategories(res.categories[0]);
            this.allCategoriesSelected = true;
            continue;
          }
          if (!res.categories[2]) {
            await this.autoFillCategories(res.categories[1]);
            this.allCategoriesSelected = true;
            continue;
          }
          if (!res.categories[3]) {
            await this.autoFillCategories(res.categories[2]);
            this.allCategoriesSelected = true;
            continue;
          }
          if (!res.categories[4]) {
            await this.autoFillCategories(res.categories[3]);
            this.allCategoriesSelected = true;
            continue;
          }
          continue;
        }
        //5. Price Key is diff. in DB
        if (key === "unitprice") {
          // if (res.unitprice === '0.00') this.form.pricing_type = 'Quotation'; continue;
          res.unitprice === "0.00"
            ? (this.form.pricing_type = "Quotation")
            : (this.form.pricing_type = "Pricing");
          this.form.price = parseInt(res.unitprice);
          continue;
        }

        //7. Images
        if (key === "images") {
          this.InitialArray = await res.images.map(el => el.file);
          this.RealArray = this.InitialArray;
          continue;
        }
        //8. Product_attributes
        if (key === "product_attributes") {
          this.form.product_attributes = (await res.product_attributes) || [];
          continue;
        }

        //9. Stock Location
        if (key === "stock_location") {
          this.stockLocationSelected(res.stock_location);
          continue;
        }

        this.form[key] = await res[key];
      }
      this.loader = false;
    }
  },

  computed: {
    ...mapState({
      units: state => state.general.units,
      productShipping: state => state.store.productShipping,
      productStockLocation: state => state.store.productStockLocation
    })
  },
  watch: {
    "$route.query.productId": {
      handler: function (id) {
        this.loadProductandDetails();
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
    this.getStockLocations();

  }
};
</script>
<style scoped>
.padding_mob {
  padding: 0px !important;
}

/* Abhishek */
/* Main Add Car Title */
.missing-field {
  padding: 10px;
  text-transform: capitalize;
}
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

.date_mob_product {
  margin-top: 0px;
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
  margin-bottom: 8px;
  font-weight: bold;
}

.productAttributes {
  padding: 19px 0px;
  background-color: #f3f6f9;
  border-radius: 2px;
  margin: 0px;
  padding-top: 10px;
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
  overflow: hidden;
}
.Manageshipping {
  display: flex;
  align-items: center;
}
.Manageshipping button {
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}
.Manageshipping i {
  font-size: 18px;
  margin-right: 5px;
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
  font-size: 18px;
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
  max-width: 100%;
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
  padding-top: 4px;
}
.shipAddress {
  text-align: left;
  line-height: 1.4;
  margin-top: 5px;
  padding: 11px;
  background-color: #f3f6f9;
  border-radius: 2px;
  margin-bottom: 15px;
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
  max-width: 100%;
  margin: 0 auto;
}
.uploader-box {
  display: block;
  justify-content: center;
  float: left;
  width: 100%;
}
.save-image button {
  height: 33px;
  min-width: 71px;
}
.img-selected-wrapper {
  display: block;
  justify-content: center;
  /* margin-bottom: 1em;
        margin-top: 0.99em; */
}
.selected-images {
  transition: all 0.2s;
  float: left;
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
.padding_delivery {
  padding-top: 10px;
  padding-bottom: 10px;
}

.border_delivery {
  border: 1px solid rgba(208, 206, 206, 0.93);
}
.mt_mob_category {
  margin-top: 8px;
}
.mob_margin_info {
  margin-top: 8px !important;
}
.margin_formSearch {
  margin-top: 0px !important;
  margin-bottom: -15px !important;
}
.margin_gutter {
  margin-bottom: -15px !important;
}

.mt_calendar {
  margin-top: 18px;
}
.text_add {
  font-size: 13px;
}

.margin_delivery {
  margin-top: 15px !important;
}

@media screen and (max-width: 768px) {
  .mt_calendar {
    margin-top: 11px;
  }
  .padding_delivery h3 {
    font-size: 15px !important;
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
    margin-bottom: -8px !important;
  }
  .mt_mob_category {
    margin-left: -5px !important;
    margin-right: -5px !important;
  }

  .mrgn_category_tab {
    margin-left: -5px !important;
    margin-right: -5px !important;
  }
  .mob_width {
    margin-left: 5px;
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
  .mob_width {
    min-width: 100%;
    margin-top: 7px;
  }

  .padding_delivery h3 {
    font-size: 12px !important;
    margin-top: -10px !important;
  }

  .margin_gutter {
    margin-bottom: -0px !important;
    margin-top: 0px !important;
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
    margin-right: -4px !important;
    margin-top: 20px !important;
  }
  .shipAddress li span {
    font-size: 12px;
  }

  .mrgn_category_tab,
  .mt_mob_category {
    margin-left: 0px !important;
    margin-right: 0px !important;
  }
  .mob_width {
    margin-left: 0px !important;
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
  .sectionTitle {
    margin-top: -5px !important;
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
  .selected-images {
    max-width: 67px;
    min-height: 67px;
    margin-right: 8px;
  }
}
</style>
