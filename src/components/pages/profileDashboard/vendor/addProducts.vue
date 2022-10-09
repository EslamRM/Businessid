<template>
  <div>
    <md-dialog :md-active.sync="showDimensionDialog">
      <md-dialog-title>Choose dimension</md-dialog-title>
      <md-content style="padding: 0px 14px 0px;">
        <input-component
          label="Choose measurement unit"
          tooltip="Eg: (Cm, Feet, Inch, Meter, Mile)"
          :custom="true"
          :size="100"
        >
          <v-select
            v-model="form.variations.measurement_unit"
            :options="variationMeasurementOptions"
            placeholder="Cm, Feet, Inch, Meter, Mile"
            taggable
            push-tags
          >
          </v-select>
        </input-component>
      </md-content>
      <md-list v-if="form.variations.measurement_unit">
        <md-subheader>Pick from the list</md-subheader>
        <md-list-item v-for="(dimension, id) in allDimensions" :key="id">
          <md-checkbox v-model="dimension.active" />
          <span class="md-list-item-text">{{ dimension.name }}</span>
        </md-list-item>
      </md-list>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDimensionDialog = false"
          >Close</md-button
        >
      </md-dialog-actions>
    </md-dialog>

    <div class="adding-box-wrap">
      <!-- <div class="frm-hdr-1 txt-algn-lft">
        <div class="frm-hdr-1-txt">Add Product</div>
      </div> -->
      <div
        class="md-layout md-gutter md-alignment-center-space-between page-title"
      >
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
      <div class="container padding_mob" v-else>
        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle col-sm-12">
            <div class="d-inline-flex align-center col-sm-10 p-0">
              <span class="squareBadge mr-3">1</span>General Information
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

          <div
            class="c-form mt-4 col-sm-12 p-0 mob_margin_info"
            v-if="showProductInfo"
          >
            <transition name="fade" mode="out-in">
              <div class="w-100 c-form">
                <input-component
                  class="inputfield2"
                  label="Product Name *"
                  type="text"
                  v-model="form.name"
                  placeholder="Enter Product Name"
                  :error="checkValidation('name')"
                >
                </input-component>

                <div class="md-gutter m-0 col-sm-12 p-0">
                  <div class="col-sm-12 col-md-6 col-xl-4 p-0 fl">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel  my-3"
                        >Product Condition *</label
                      >
                      <div class="limitRadio">
                        <md-radio
                          v-model="form.product_condition"
                          value="new"
                          checked
                          >New</md-radio
                        >
                        <md-radio
                          v-model="form.product_condition"
                          value="used"
                          checked
                          >Used</md-radio
                        >
                        <md-radio
                          v-model="form.product_condition"
                          value="refurbished"
                          checked
                          >Refurbished</md-radio
                        >
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div class="md-gutter m-0 col-sm-12 p-0 margin_gutter">
                  <div class="col-sm-12 col-md-6 col-xl-4 p-0 fl">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel my-3">Quantity *</label>
                      <div class="limitRadio">
                        <md-radio
                          v-model="form.is_limited"
                          value="unlimited"
                          checked
                          >Unlimited</md-radio
                        >
                        <md-radio
                          class="mr-mob"
                          v-model="form.is_limited"
                          value="limited"
                          checked
                          >Limited</md-radio
                        >
                      </div>
                    </fieldset>
                  </div>

                  <div class="col-sm-12 col-md-6 col-xl-4 pr-0 fl pl_mob">
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel  my-3"
                        >Minimum Order (Optional)</label
                      >
                      <input
                        class="c-form-placeholder c-formInput inputfield"
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
                    class="
                      col-sm-12 col-md-6 col-xl-4
                      pr-0
                      fl
                      left_align
                      pl_mob
                    "
                    v-if="form.is_limited == 'limited'"
                  >
                    <fieldset class="inline-through text-left">
                      <label class="c-formLabel my-3"
                        >Available Quantity*</label
                      >
                      <input
                        class="c-formInput c-form-placeholder inputfield"
                        v-model.trim="form.quantity"
                        required
                        type="number"
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
                  class="
                    inline-through
                    text-left
                    col-sm-12 col-md-4 col-xl-4
                    p-0
                    mt_calendar
                  "
                  v-if="showDate"
                >
                  <label class="c-formLabel my-3">Validity Till *</label>
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
              <span class="material-icons" v-if="showProductCategory"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div v-if="showProductCategory">
            <div class="md-layout category mt_mob_category">
              <div class="md-layout-item md-size-100">
                <p class="label">Search Categories *</p>
                <v-select
                  class="dropdown"
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
                  class="dropdown"
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
                  class="dropdown"
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
                  class="dropdown"
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
                  class="dropdown"
                  v-model="subCategory4"
                  label="categoryname"
                  :options="subCategory4Options"
                  @input="subCategory4Selected"
                  placeholder="Select Category 4"
                >
                </v-select>
              </div>
            </div>

            <input-component
              label="Product Brand *"
              custom="true"
              :error="checkValidation('brand')"
              size="100"
            >
              <v-select
                class="dropdown"
                v-model="form.brand"
                label="brand"
                :reduce="brand => brand.brand"
                :options="brands"
                @search="onBrandSearch"
                placeholder="Search Brand."
              >
              </v-select>
            </input-component>
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
              class="
                md-layout md-gutter
                mt-4
                md-alignment-center-center
                productAttributes
                margin_delivery
              "
              v-if="allCategoriesSelected"
            >
              <div class="md-layout-item md-size-100 padding_delivery">
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
              <input-component size="100" :custom="true">
                <hr class="border_delivery" />
              </input-component>
            </div>
          </div>
        </div>
        <form-section number="4" title="Product Variation">
          <div
            class="
              md-layout md-gutter
              mt-4
              md-alignment-center-center
              mb_three_tab mb_mb_minus5
              desktop_mb_minus10
            "
          >
            <!-- <input-component label="Select Product Type *" custom="true">
              <div class="limitRadio">
                <md-radio
                  v-model="isVariableProduct"
                  :value="false"
                  @change="prefillOneVariation"
                >
                  Single Product
                </md-radio>
                <md-radio v-model="isVariableProduct" :value="true">
                  Variation Product
                </md-radio>
              </div>
            </input-component> -->
          </div>
          <div>
            <formSectionWithCRUD
              :number="`${parseInt(colorId) + 1}`"
              :title="color.$model.name"
              :color="color.$model.value"
              v-for="(color, colorId) in $v.form.variations.colors.$each.$iter"
              :key="colorId"
              @addNewColor="addNewColor"
              @deleteColor="deleteColor"
              :deleteButton="isVariableProduct"
            >
              <div
                class="
                  md-layout md-gutter
                  mt-4
                  md-alignment-center-right
                  mb_three_tab mb_mb_minus5
                  desktop_mb_minus10
                "
              >
                <input-component
                  style="position:relative;"
                  :class="isVariableProduct ? '' : 'no-color-selected'"
                  label="Color"
                  :error="submitted && !color.value.required"
                  custom="true"
                >
                  <div class="none">
                    <input type="checkbox" id="no-color" v-model="noColor" />
                    <label for="no-color">None</label>
                  </div>
                  <input
                    style="height:35px !important;margin-top: 5px !important;"
                    class="c-formInput c-form-placeholder inputfield"
                    type="color"
                    v-model.trim="color.$model.value"
                    :disabled="!isVariableProduct"
                  />
                </input-component>

                <input-component
                  :class="isVariableProduct ? '' : 'no-color-selected'"
                  label="Name"
                  type="text"
                  :disabled="!isVariableProduct"
                  v-model.trim="color.$model.name"
                  :error="submitted && !color.name.required"
                >
                </input-component>
                <input-component
                  label="Select Pricing Type *"
                  custom="true"
                  size="66"
                  :error="submitted && color.pricing_type.$invalid"
                >
                  <div class="limitRadio">
                    <md-checkbox
                      class="mt-3"
                      v-on:change="allPricing(colorId)"
                      value="all"
                      v-model="color.$model.pricing_type"
                      >All</md-checkbox
                    >
                    <md-checkbox
                      class="mt-3"
                      v-on:change="changePricing(colorId)"
                      value="pricing"
                      v-model="color.$model.pricing_type"
                      >Show Pricing</md-checkbox
                    >
                    <md-checkbox
                      class="mt-3"
                      v-on:change="changePricing(colorId)"
                      value="quotation"
                      v-model="color.$model.pricing_type"
                      >Quotation Based</md-checkbox
                    >
                    <md-checkbox
                      class="mt-3"
                      v-on:change="changePricing(colorId)"
                      v-model="color.$model.customization.active"
                      >Allow Customization</md-checkbox
                    >
                  </div>
                </input-component>

                <div class="md-layout-item md-size-100">
                  <input-component
                    :custom="true"
                    :label="'Variation Image'"
                    :size="100"
                  >
                    <file-uplaod
                      v-model="color.$model.files"
                      :error="submitted && color.files.$invalid"
                    ></file-uplaod>
                  </input-component>
                </div>
                <div
                  class="
                    md-layout-item
                    md-layout
                    md-alignment-center-space-between
                    md-size-100
                  "
                  v-for="(size, sizeId) in color.sizes.$each.$iter"
                  :key="sizeId"
                >
                  <div
                    class="
                    md-layout-item
                    md-layout
                    md-size-95
                    md-xsmall-size-100
                    "
                    style="
                    padding: 13px 0px;"
                  >
                    <div
                      class="md-layout-item
                        md-layout
                        md-gutter
                        md-size-100"
                    >
                      <h4 class="md-layout-item md-size-100 mt-4">
                        Size {{ parseInt(sizeId) + 1 }} :
                      </h4>
                      <input-component
                        label="Size name *"
                        tooltip="Eg:  (XL, GB, MAX, 1KG)"
                        :custom="true"
                        :size="20"
                        :error="submitted & !size.size.required"
                      >
                        <v-select
                          class="dropdown"
                          v-model="size.$model.size"
                          :options="variationSizeOptions"
                          placeholder="XL, GB, MAX, 1KG"
                          taggable
                          push-tags
                        >
                        </v-select>
                      </input-component>
                    </div>

                    <div
                      class="md-layout-item
                      md-layout
                      md-gutter
                      md-size-100 dimensions"
                    >
                      <h4 class="md-layout-item md-size-100 mt-4">
                        Dimensions
                      </h4>

                      <input-component
                        v-for="(dimension, id) in $v.productDimensions.colors
                          .$each.$iter[colorId].sizes.$each.$iter[sizeId]
                          .dimensions.$each.$iter"
                        :key="id"
                        :label="
                          dimension.$model.name +
                            ' (' +
                            form.variations.measurement_unit +
                            ')'
                        "
                        v-model="dimension.$model.value"
                        :error="submitted && !dimension.value.required"
                        type="text"
                        size="20"
                      >
                      </input-component>

                      <div
                        class="
                          md-layout-item md-large-size-20
                          md-small-size-100
                          mt-4
                        "
                        style="position:relative;height: 53px;"
                        @click="showDimensionDialog = true"
                      >
                        <div
                          class="
                          choose-size-btn add-dimension
                          md-button md-theme-default"
                        >
                          Add Dimension
                          <i class="material-icons">add</i>
                        </div>
                      </div>
                    </div>
                    <div
                      class="md-layout-item
                      md-layout
                      md-gutter
                      md-size-100"
                      v-if="
                        form.variations.colors[colorId].pricing_type.includes(
                          'pricing'
                        )
                      "
                    >
                      <h4 class="md-layout-item md-size-100 mt-4">
                        Price
                      </h4>
                      <input-component
                        :custom="true"
                        label="Price *"
                        :size="20"
                        :error="submitted && size.price.$invalid"
                        :errorMessage="
                          !size.price.required
                            ? 'Price is required.'
                            : 'Price could not be zero.'
                        "
                      >
                        <currency-input
                          class="c-formInput c-form-placeholder inputfield"
                          v-model="size.$model.price"
                          :distraction-free="false"
                          :currency="form.currency"
                          locale="en-US"
                          v-on:change="calcOfferPercentage(colorId, sizeId)"
                        />
                      </input-component>
                      <input-component
                        :custom="true"
                        label="Offer Price "
                        :size="20"
                      >
                        <currency-input
                          class="c-formInput c-form-placeholder inputfield"
                          v-model="
                            form.variations.colors[colorId].sizes[sizeId]
                              .offerprice
                          "
                          :distraction-free="false"
                          :currency="form.currency"
                          locale="en-US"
                          v-on:change="calcOfferPercentage(colorId, sizeId)"
                        />
                      </input-component>
                      <input-component
                        class="inputfield2"
                        label="Offer percentage (%)"
                        type="text"
                        :value="
                          form.variations.colors[colorId].sizes[sizeId]
                            .offerpercentage + '%'
                        "
                        :size="20"
                        readonly
                      >
                      </input-component>
                    </div>
                    <div
                      class="md-layout-item
                      md-layout
                      md-gutter
                      md-size-100"
                    >
                      <h4 class="md-layout-item md-size-100 mt-4">
                        Quantity
                      </h4>
                      <input-component
                        class="inputfield2"
                        label="Quantity *"
                        type="number"
                        v-model="size.$model.qty"
                        :size="20"
                        :error="submitted & !size.qty.required"
                      >
                      </input-component>
                    </div>
                  </div>

                  <div
                    class="
                    md-layout-item
                    md-size-5
                    md-xsmall-size-100
                    "
                    style="text-align:right"
                  >
                    <md-button
                      v-if="isVariableProduct"
                      class="md-raised md-primary btn_edit"
                      @click="deleteSize(colorId, sizeId)"
                    >
                      <i class="material-icons">delete</i>
                    </md-button>
                  </div>

                  <div
                    class="
                      md-layout-item
                      md-alignment-center-space-between
                      md-size-100"
                    style="
                      height:10px;
                      border-bottom: 1.4px dotted #d2d2d2;"
                  ></div>
                </div>

                <div
                  class="
                    md-layout-item md-large-size-20
                    md-small-size-50
                    mt-4
                    choose-size-btn
                    md-button md-theme-default
                  "
                  v-if="isVariableProduct"
                  @click="addNewSize(colorId)"
                >
                  Add New Size
                  <i class="material-icons">add</i>
                </div>

                <div
                  class="
                    md-layout-item
                    md-layout
                    md-gutter
                    md-alignment-center-center
                    md-size-100
                  "
                  v-if="form.variations.colors[colorId].customization.active"
                >
                  <h4
                    class="
                md-layout-item 
                md-size-100 mt-4"
                    style="
                    text-align: center"
                  >
                    {{
                      !noColor
                        ? "Customization for color " +
                          form.variations.colors[colorId].name
                        : "Customization for product"
                    }}
                  </h4>
                  <input-component
                    :custom="true"
                    label="Customization Cost *"
                    :size="20"
                    :error="
                      submitted &&
                        color.customization.customization_cost.$invalid
                    "
                  >
                    <currency-input
                      class="c-formInput c-form-placeholder inputfield"
                      v-model="color.$model.customization.customization_cost"
                      :distraction-free="false"
                      :currency="form.currency"
                      locale="en-US"
                    />
                  </input-component>

                  <input-component
                    label="Minimum Quantity *"
                    type="number"
                    v-model="color.$model.customization.minimum_qty"
                    :size="20"
                    :error="
                      submitted && color.customization.minimum_qty.$invalid
                    "
                  >
                  </input-component>

                  <md-button
                    v-if="isVariableProduct"
                    class="md-raised md-primary btn_edit"
                    @click="deleteCustomization(colorId)"
                    style="margin-top:26px;"
                  >
                    <i class="material-icons">delete</i>
                  </md-button>
                </div>
              </div>
            </formSectionWithCRUD>
            <div
              class="
                md-layout-item md-size-25
                md-small-size-100
                choose-file-btn
                md-button md-theme-default
              "
              v-if="isVariableProduct"
              @click="addNewColor"
            >
              Add New Color Variation
              <i class="material-icons">add</i>
            </div>
          </div>
        </form-section>

        <div class="adding-box-1-cnt wrapIn col-sm-12">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">3</span>VAT Details
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
          <div class="c-form mt-4 mob_margin_price" v-if="showProductPrice">
            <!-- <div class="w-100 c-form v--three-columns v--odd dblock_mob">
              <div class="pillWrap">
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="All"
                    v-model.trim="form.pricing_type"
                    >All</md-radio
                  >
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="Pricing"
                    v-model.trim="form.pricing_type"
                    >Show Pricing</md-radio
                  >
                </div>
                <div class="radio-pill">
                  <md-radio
                    class="item"
                    value="Quotation"
                    v-model.trim="form.pricing_type"
                    >Quotation Based</md-radio
                  >
                </div>
              </div>
            </div> -->
            <div
              class="
                w-100
                c-form
                v--three-columns v--odd
                dblock_mob
                mob_margin_price_two
              "
            >
              <!-- <fieldset class="inline-through text-left">
                <label class="c-formLabel">Price * </label>
                <input
                  min="1"
                  class="c-formInput c-form-placeholder"
                  v-model.trim="form.price"
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
              </fieldset> -->
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
              <!-- <fieldset class="inline-through text-left">
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
                  
                </div>
                <div class="c-forminlineError" v-if="checkValidation('unit')">
                  Unit is required
                </div>
              </fieldset> -->
              <fieldset class="inline-through text-left">
                <label class="c-formLabel my-3">Currency *</label>
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
                    class="dropdown"
                    v-model.trim="form.currency"
                    label="currency"
                    :options="currencies"
                    :reduce="curr => curr.currency"
                    placeholder="Select Currency"
                  >
                    <template slot="no-options"
                      >eg : AED, INR etc</template
                    >
                  </v-select>
                </div>
              </fieldset>
              <fieldset class="inline-through text-left input_vat">
                <label class="c-formLabel my-3">VAT (%)</label>
                <input
                  @input="restrictdigit"
                  class="c-form-placeholder c-formInput inputfield"
                  v-model.trim="form.vat"
                  required
                  type="number"
                  min="1"
                  max="99999999"
                  pattern="[1-9]{1}[0-9]{9}"
                  name
                  placeholder="Enter VAT"
                />
              </fieldset>
            </div>
            <fieldset class="inline-through text-left chipnoEffect bgFor">
              <label class="c-formLabel  my-3">Add Tags For product</label>
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
                class="dropdown"
              />
            </fieldset>
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
          <div class="c-form mt-4 margin_formSearch" v-if="showProductStock">
            <div class="w-100">
              <div class="md-layout-item md-size-100 c-formSearch">
                <input-component
                  label="Stock Location"
                  custom="true"
                  :error="checkValidation('stock_location_id')"
                  size="100"
                >
                  <v-select
                    class="dropdown"
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
                      <button
                        class="
                          md-button md-accent
                          btnRedOutline
                          md-theme-default
                          addBtn
                          btn_addpro
                        "
                      >
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
              <span class="material-icons" v-if="showProductVisibility"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div class="c-form mt-4" v-if="showProductVisibility">
            <div class="w-100">
              <div class="pillWrap mt_pillwrap_two">
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
                <div class="radio-pill mob_radio_products">
                  <md-radio
                    class="item"
                    value="company"
                    v-model.trim="form.visibility"
                    >Company</md-radio
                  >
                </div>
                <div class="radio-pill mob_radio_products">
                  <md-radio
                    class="item"
                    value="personal"
                    v-model.trim="form.visibility"
                    >Personal</md-radio
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
        <!-- <div class="adding-box-1-cnt wrapIn col-sm-12">
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
            <div class="w-100 mt-3 mt_product_img">
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
                            class="
                              md-button md-raised md-accent md-theme-default
                            "
                            @click="saveImage"
                          >
                            Save
                          </button>
                          <button
                            class="
                              md-button md-raised md-accent md-theme-primary
                            "
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
        </div> -->

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

        <div class="adding-box-1-cnt wrapIn pb_textarea">
          <div class="sectionTitle">
            <div
              style="cursor: pointer;  "
              class="d-inline-flex align-center"
              @click="toggleDiv('showProductAttributes')"
            >
              <span class="squareBadge mr-3">9</span>Product Attributes
            </div>
            <button
              @click="toggleDiv('showProductAttributes')"
              type="button"
              class="md-button md-theme-default toggleboxBtn"
            >
              <span class="material-icons" v-if="showProductAttributes"
                >keyboard_arrow_up</span
              >
              <span class="material-icons" v-else>keyboard_arrow_down</span>
            </button>
          </div>
          <div
            class="md-layout md-gutter md-alignment-center"
            style="margin:3px"
            v-if="showProductAttributes"
          >
            <div class="note md-layout-item md-size-90 ">
              <i>Note</i> :The more attributes you fill, more chances of your
              products suggested to user.
            </div>
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

        <div class="adding-box-1-cnt wrapIn" v-if="submitted && $v.$invalid">
          <div class="sectionTitle">
            <div class="d-inline-flex align-center">
              <span class="squareBadge mr-3">9</span>Error
            </div>
          </div>
          <div class="c-form mt-4">
            <div class="w-100">
              <div class="d-inline-flex align-center" style="color: #e01e5a">
                Some fields are missing, kindly fill up them.
              </div>

              <!-- <p
                class="missing-field"
                v-for="(missing, id) in missingFields"
                :key="id"
              >
                {{ id + 1 }} : {{ missing }}
              </p> -->
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
import { validationMixin, numeric } from "vuelidate";
import moment from "moment";
import { CurrencyInput } from "vue-currency-input";

import inputComponent from "@/components/ui-components/input.vue";
import breadcrumbs from "@/components/ui-components/breadcrumbs.vue";
import loaderButton from "@/components/ui-components/loader-button.vue";
import formSection from "@/components/pages/profileDashboard/vendor/manageStore/components/formSection.vue";
import formSectionWithCRUD from "@/components/pages/profileDashboard/vendor/manageStore/components/formSectionWithCRUD.vue";
import fileUplaod from "@/components/pages/profileDashboard/vendor/manageStore/components/fileUpload.vue";

import utils from "@/helpers/utils.js";
import variationCommonFunctions from "@/helpers/variationCommonFunctions.js";
import country from "@/helpers/country.js";
import loader from "@/components/pages/profileDashboard/components/loader.vue";

import {
  required,
  email,
  minLength,
  maxValue,
  minValue,
  requiredIf,
  decimal,
  sameAs,
  maxLength,
  checked,
  helpers
} from "vuelidate/lib/validators";
const greaterThanZero = (value, vm) => {
  if (vm.showPrice) {
    return value > 0;
  }
  return true;
};
const greaterThanZeroCustom = (value, vm) => {
  if (vm.active) {
    return value > 0;
  }
  return true;
};

export default {
  mixins: [validationMixin, utils, country, variationCommonFunctions],
  validations() {
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
      },
      variations: {
        colors: {
          required,
          $each: {
            name: {
              required: requiredIf(function() {
                return !this.noColor;
              })
            },
            value: {
              required: requiredIf(function() {
                return !this.noColor;
              })
            },
            pricing_type: {
              required,
              minLength: minLength(1)
            },
            files: {
              required,
              minLength: minLength(1)
            },
            customization: {
              required,
              customization_cost: {
                greaterThanZeroCustom
              },
              minimum_qty: {
                greaterThanZeroCustom
              }
            },
            sizes: {
              required,
              $each: {
                size: {
                  required
                },
                qty: {
                  required
                },
                price: {
                  greaterThanZero
                },
                offerprice: {
                  required
                }
              }
            }
          }
        }
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
      // fields.price = {
      //   required,
      //   decimal,
      // };
      // fields.offerprice = {
      //   maxValue: maxValue(this.form.price),
      // };
      // fields.unit = {
      //   required,
      // };
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
      productDimensions: {
        colors: {
          $each: {
            sizes: {
              $each: {
                dimensions: {
                  $each: {
                    value: {
                      required
                    }
                  }
                }
              }
            }
          }
        }
      }

      // RealArray: {
      //   required,
      //   minLength: minLength(1),
      // },
    };
  },

  data() {
    return {
      productId: "",
      productDetails: "",
      productDimensions: {
        colors: [
          {
            sizes: [
              {
                dimensions: []
              }
            ]
          }
        ]
      },
      success: false,
      loader: false,
      isVariableProduct: true,
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
      // All Dimensions
      allDimensions: [],
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
      variationFormSubmitted: false,
      submitStatus: null,
      pricing: "Pricing",
      showProductCategory: true,
      showProductVariations: true,
      showProductPrice: true,
      showProductShipping: true,
      showProductStock: true,
      showProductImages: true,
      showProductDescription: true,
      showProductVisibility: true,
      showProductMap: true,
      showProductAttributes: false,
      isShowAutoComplete: false,
      showStockLocations: false,
      showShipentDetails: false,
      productName: null,
      before_crop: true,
      before_crop_variation: true,
      showDimensionDialog: false,

      brandname: null,
      numberOfQuantity: null,
      UnitPrice: null,
      selectUnit: null,
      minimumOrder: null,
      deliveryCost: null,
      TaxCost: null,
      selectedDate: null,
      isCropped: false,
      isCropped_variation: false,
      IsDisabledUpload: false,

      content: "Some initial content",
      productUpdates: "",
      showProductInfo: true,
      tags: [],
      tag: "",
      arrowCounter: 0,
      isAllCategorySelected: "",
      missingFields: [],
      showManageStockLocation: false,

      variationSizeOptions: ["S", "M", "L", "XL"],
      variationMeasurementOptions: ["Cm", "Feet", "Inch", "Meter", "Mile"],
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
        variations: {
          colors: [
            {
              name: "",
              value: "",
              files: [],
              pricing_type: ["pricing"],
              sizes: [
                {
                  size: "",
                  qty: "",
                  price: "",
                  offerprice: "",
                  offerpercentage: "",
                  showPrice: true
                }
              ],
              customization: {
                active: false,
                customization_cost: "",
                minimum_qty: ""
              }
            }
          ]
        }, //TODO: Rename it to Attributes
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
      ShowChooseFile_variation: true,
      showLoading: false,
      selectedAttrs: {}
    };
  },

  components: {
    inputComponent,
    breadcrumbs,
    loader,
    loaderButton,
    formSection,
    formSectionWithCRUD,
    fileUplaod,

    DatePick,
    SearchAttributes,
    SearchStockLocation,
    vueDropzone: vue2Dropzone,
    SearchShipment,
    VueEditor,
    CategorySearch,
    GoogleMap,
    Cropper,
    CurrencyInput
  },

  methods: {
    calcOfferPercentage(colorId, sizeId) {
      console.log("calc");
      if (
        this.form.variations.colors[colorId].sizes[sizeId].price == 0 ||
        this.form.variations.colors[colorId].sizes[sizeId].offerprice == 0
      ) {
        this.form.variations.colors[colorId].sizes[sizeId].offerpercentage = 0;
        return false;
      }
      let discount =
        this.form.variations.colors[colorId].sizes[sizeId].price -
        this.form.variations.colors[colorId].sizes[sizeId].offerprice;
      let percentage =
        (discount / this.form.variations.colors[colorId].sizes[sizeId].price) *
        100;
      this.form.variations.colors[colorId].sizes[
        sizeId
      ].offerpercentage = Math.round(percentage);
    },
    allPricing(colorId) {
      if (this.form.variations.colors[colorId].pricing_type.includes("all")) {
        if (
          this.form.variations.colors[colorId].pricing_type.indexOf(
            "pricing"
          ) === -1
        )
          this.form.variations.colors[colorId].pricing_type.push("pricing");
        if (
          this.form.variations.colors[colorId].pricing_type.indexOf(
            "quotation"
          ) === -1
        )
          this.form.variations.colors[colorId].pricing_type.push("quotation");
        this.form.variations.colors[colorId].customization.active = true;
        this.form.variations.colors[colorId].sizes.map(
          item => (item.showPrice = true)
        );
      } else {
        this.form.variations.colors[colorId].pricing_type = [];
        this.form.variations.colors[colorId].customization.active = false;
        this.form.variations.colors[colorId].sizes.map(
          item => (item.showPrice = false)
        );
      }
    },
    changePricing(colorId) {
      if (
        this.form.variations.colors[colorId].pricing_type.includes("pricing")
      ) {
        this.form.variations.colors[colorId].sizes.map(
          item => (item.showPrice = true)
        );
      } else {
        this.form.variations.colors[colorId].sizes.map(
          item => (item.showPrice = false)
        );
      }
      if (
        ["pricing", "quotation"].every(i =>
          this.form.variations.colors[colorId].pricing_type.includes(i)
        ) &&
        this.form.variations.colors[colorId].customization.active
      ) {
        this.form.variations.colors[colorId].pricing_type.push("all");
      } else {
        this.form.variations.colors[
          colorId
        ].pricing_type = this.form.variations.colors[
          colorId
        ].pricing_type.filter(item => item != "all");
      }
    },
    onMainOptionsSearch(search, loading) {
      loading(true);

      if (search.length < 1) {
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
    onBrandSearch(search, loading) {
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

    async getStockLocations() {
      const res = await this.fetchAndAssign("/vendor/stock-location/get", {});
      // If No Locations Found Display the Manage Stock Location Button
      console.log(res, "Stock Locations");
      if (!res.success) {
        this.showManageStockLocation = true;
        return;
      }
      // If Locations Found then Display it
      await res.result.forEach(o => {
        o[
          "address"
        ] = `${o.building}, ${o.street}, ${o.area}, ${o.city}, ${o.country}`;
      });
      this.stockLocations = await res.result;
      return;
    },
    stockLocationSelected(value) {
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
    assignKeyValue(key, value) {
      this.form[key] = value;
    },
    async loadCategories(id, object, main = false) {
      const response = await this.$store.dispatch("loadCategories", id);
      if (main) {
        this[object] = await response.category;

        return;
      }
    },
    async autoSelectOtherCategories() {
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
      if (response.categories["2"]) {
        this.subCategory2 = {
          categoryname: response.categories["2"].name,
          category_id: response.categories["2"].category_id
        };
      }
      if (response.categories["3"]) {
        this.subCategory3 = {
          categoryname: response.categories["3"].name,
          category_id: response.categories["3"].category_id
        };
      }

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
    async subCategory1Selected(type) {
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
    async subCategory2Selected() {
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
    async loadDimensions() {
      this.allDimensions = [];
      const response = await this.$store.dispatch("loadDimensions");
      if (response) {
        this.allDimensions = response.dimensions;
      }
    },
    async subCategory3Selected() {
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
    async subCategory4Selected() {
      this.allCategoriesSelected = true;
      this.loadProductAttributes(this.subCategory4.category_id);
    },
    async loadProductAttributes(id) {
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
    checkValidationCustom(field, validation) {
      return this.submitted && this.$v.form[field][validation];
    },
    onSearchUnits(search, loading) {
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
    trimDoubleQuote(event) {
      const val = event.target.value;
    },

    isFutureDate(date) {
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
    validatePrice() {
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
    restrictdigit() {
      if (this.form.vat > 100) {
        this.form.vat = 100;
      }
    },
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    searchShipment(name) {
      if (name != undefined) {
        this.showShipentDetails = true;
        this.shipemtDetails = name;
      }
    },
    clickStockLocation(name) {
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
    loadCurrency() {
      this.$store
        .dispatch("GET_COUNTRY")
        .then(response => {
          this.currencies = response.data.result;
        })
        .catch(error => console.log(error));
    },

    change_market() {
      if (this.form.market_type == "supply") {
        this.showDate = false;
      } else if (this.form.market_type == "demand") {
        this.showDate = true;
      }
    },

    toggleDiv(name) {
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
      } else if (name == "showProductAttributes") {
        this.showProductAttributes = !this.showProductAttributes;
      }
    },
    addMissingFields(data, index = "", optional = "") {
      let noChild = true;
      if (optional == "iter") {
        this.addMissingFields(data["$iter"]);
      } else {
        for (const el in data) {
          if (
            ![
              "$anyDirty",
              "$anyError",
              "$dirty",
              "$error",
              "$invalid",
              "$model",
              "$params",
              "$pending",
              "required",
              "minLength",
              "maxValue",
              "decimal",
              "greaterThanZeroCustom",
              "greaterThanZero"
            ].includes(el)
          ) {
            noChild = false;
            if (Number.isInteger(parseInt(el))) {
              this.addMissingFields(data[el], el);
            } else if (el == "$each") {
              this.addMissingFields(data[el], el, "iter");
            } else {
              if (data[el].$invalid) {
              }
              this.addMissingFields(data[el], el, data[el].$invalid);
            }
          }
        }
        if (noChild == true && optional == true) {
          this.missingFields.push(index.replaceAll("_", " "));
        }
      }
    },
    async addProduct(e) {
      e.preventDefault();
      this.submitted = true;
      this.success = false;
      this.qtyRequired = false;

      this.$v.$touch();

      if (this.$v.$invalid) {
        this.missingFields = [];
        this.addMissingFields(this.$v.form);
        this.addMissingFields(this.$v.productDimensions);
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
      this.form.variations.dimensions = this.productDimensions;
      this.form.variations.activateddimensions = this.allDimensions.filter(
        dim => dim.active
      );

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

      // Product Images
      // const fileresponse = await this.getFileUrls(this);
      // console.log(fileresponse);
      // if (fileresponse == "fail" || fileresponse == "empty") return;

      // Variation Images
      await this.uploadVariationFiles();
      // Fill the Data to original product when the user selects single product
      if (!this.isVariableProduct) {
        // this.form.files = [...this.form.variations.colors[0].files];
        this.form.pricing_type = this.form.variations.colors[0].pricing_type;
        this.form.price = this.form.variations.colors[0].price;
        this.form.offerprice = this.form.variations.colors[0].offerprice;
      }
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

    checkHasShipment() {
      this.$store.dispatch("getProductShipping");
      this.$store.dispatch("getProductStockLocation");
    },

    // Only for Product "Update" => i.e when url has productId as query param
    async autoFillCategories(search) {
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
    autoSelectAttributes(name) {
      // Bcz. if no attributes are selected then it will give error
      if (!this.form.product_attributes) return;
      return this.form.product_attributes.find(el =>
        Object.keys(el).find(k => k == name)
      );
    },
    async loadProductandDetails() {
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

        //10. Variations
        if (key === "variations") {
          this.form.variations = { ...res.variations };
          this.form.variations.colors = res.variations.colors.map(color => {
            return {
              ...color,
              files: color.files.map(fileUrl => ({
                src: fileUrl,
                type: "image/webp",
                name: "",
                blob: null
              }))
            };
          });
          await this.allDimensions;
          this.activateDimensions();
          this.populateDimensions();
          if (!this.form.variations.colors[0].name) {
            this.isVariableProduct = false;
          }
          continue;
        }

        this.form[key] = await res[key];
      }
      this.loader = false;
    },
    activateDimensions() {
      let keys = this.form.variations.activateddimensions.map(
        dim => dim.dimension_id
      );
      this.allDimensions.map(dimension => {
        if (keys.includes(dimension.dimension_id)) {
          dimension.active = true;
        }
      });
    },
    populateDimensions() {
      this.productDimensions = this.form.variations.dimensions;
    },
    addNewColor() {
      const colorVariationBP = {
        name: "",
        value: "",
        files: [],
        sizes: [],
        pricing_type: ["Pricing"],
        customization: {
          active: false,
          customization_cost: "",
          minimum_qty: ""
        }
      };
      this.form.variations.colors.push(colorVariationBP);

      const dimensionBP = {
        sizes: []
      };
      this.productDimensions.colors.push(dimensionBP);
    },
    deleteColor(colorId) {
      this.form.variations.colors.splice(colorId, 1);
    },
    addNewSize(colorId) {
      const sizeBP = {
        size: "",
        qty: "",
        price: "",
        offerprice: "",
        offerpercentage: "",
        showPrice: true
      };
      this.form.variations.colors[colorId].sizes.push(sizeBP);

      const dimensionBP = {
        dimensions: []
      };
      this.productDimensions.colors[colorId].sizes.push(dimensionBP);
    },
    addCustomization(colorId) {
      const customization = {
        active: true,
        customization_cost: "",
        minimum_qty: ""
      };
      this.form.variations.colors[colorId].customization = customization;
    },
    deleteSize(colorId, sizeId) {
      this.form.variations.colors[colorId].sizes.splice(sizeId, 1);
    },
    deleteCustomization(colorId) {
      this.form.variations.colors[colorId].customization.active = false;
    },
    prefillOneVariation() {
      //remove color and name from json
      delete this.form.variations.colors[0].value;
      delete this.form.variations.colors[0].name;
      if (this.form.variations.colors.length == 0) {
        this.addNewColor();
      }
      if (this.form.variations.colors[0].sizes.length == 0) {
        this.addNewSize(0);
      }
    },
    async uploadVariationFiles() {
      for (
        let colorId = 0;
        colorId < this.form.variations.colors.length;
        colorId++
      ) {
        let files_cloud_urls = [];

        const resp = await this.getFileUrls_variation(
          this,
          this.form.variations.colors[colorId].files,
          files_cloud_urls
        );
        if (resp === "fail" || resp === "empty") {
          this.form.variations.colors[colorId].files = [];
        }

        console.log("variation files uploaded urls ---> ", files_cloud_urls);
        this.form.variations.colors[colorId].files = files_cloud_urls;
      }
    }
  },

  computed: {
    noColor: {
      get: function() {
        return !this.isVariableProduct;
      },
      set: function(newVal) {
        this.isVariableProduct = !newVal;
        if (newVal) {
          delete this.form.variations.colors[0].value;
          delete this.form.variations.colors[0].name;
        } else {
        }
      }
    },
    ...mapState({
      units: state => state.general.units,
      productShipping: state => state.store.productShipping,
      productStockLocation: state => state.store.productStockLocation
    })
  },
  watch: {
    "$route.query.productId": {
      handler: function(id) {
        this.loadProductandDetails();
      },
      deep: true,
      immediate: true
    },
    allDimensions: {
      handler(val) {
        let enabled = val.filter(item => item.active);
        let disabled = val
          .filter(item => !item.active)
          .map(item => item.dimension_id);
        for (let color in this.productDimensions.colors) {
          for (let size in this.productDimensions.colors[color].sizes) {
            enabled
              .filter(
                en =>
                  !this.productDimensions.colors[color].sizes[
                    size
                  ].dimensions.some(dim => dim.dimension_id == en.dimension_id)
              )
              .forEach(dim => {
                this.productDimensions.colors[color].sizes[
                  size
                ].dimensions.push(JSON.parse(JSON.stringify(dim)));
              });
            this.productDimensions.colors[color].sizes[
              size
            ].dimensions = this.productDimensions.colors[color].sizes[
              size
            ].dimensions.filter(item => !disabled.includes(item.dimension_id));
          }
        }

        console.log("arr", this.productDimensions);
      },
      deep: true
    }
  },
  created() {
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
    this.loadDimensions();
  }
};
</script>
<style scoped>
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
  height: 55px;
  border-radius: 10px;
  border: solid 1px #888 !important;
  padding: 10.5px 17.5px;
  box-sizing: border-box;
}
.inputfield {
  height: 55px;
  border-radius: 10px;
  border: solid 1px #888 !important;
  padding: 10.5px 17.5px;
  box-sizing: border-box;
}
.inputfield2 >>> input {
  height: 55px !important;
  border-radius: 10px !important;
  border: solid 1px #888 !important;
  padding: 10.5px 17.5px !important;
  box-sizing: border-box;
}
.none {
  position: absolute;
  top: 7px;
  left: 77px;
  font-size: 11px;
}

.none label {
  position: relative;
  bottom: 2px;
}
.no-color-selected {
  filter: blur(1px);
}

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
.choose-size-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 39px;
  color: #213963;
  padding: 0;
  padding-left: 9px;
  padding-right: 5px;
}
.add-dimension {
  position: absolute;
  bottom: 0;
  height: 37px;
  padding: 3px 26px;
}
.choose-size-btn i {
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
  text-transform: capitalize;
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
.limitRadio .md-radio,
.limitRadio .md-checkbox {
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
.c-formInput[data-v-10cafa6c] {
  float: left;
  /* border: solid 1px #c8d2e0 !important;
  padding: 10px 10px !important;
  border-radius: 6px !important;
  padding-left: 10px !important; */
  width: 100% !important;
  margin-top: 0px !important;
  margin-bottom: 5px !important;
  height: 55px !important;
  border-radius: 10px !important;
  border: solid 1px #888 !important;
  padding: 10.5px 17.5px !important;
  box-sizing: border-box !important;
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
.c-formLabel.color {
  margin-right: 8px;
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
  .dropdown >>> .vs__dropdown-toggle {
    height: 50px;
    border-radius: 10px;
    border: solid 1px #888 !important;
    padding: 10.5px 17.5px;
    box-sizing: border-box;
  }
  .inputfield {
    height: 50px;
    border-radius: 10px;
    border: solid 1px #888 !important;
    padding: 10.5px 17.5px;
    box-sizing: border-box;
  }
  .inputfield2 >>> input {
    height: 50px !important;
    border-radius: 10px !important;
    border: solid 1px #888 !important;
    padding: 10.5px 17.5px !important;
    box-sizing: border-box;
  }
  .limitRadio {
    font-size: 12px;
  }
  .mob_width {
    min-width: 100%;
    margin-top: 7px;
  }
  .none {
    position: absolute;
    top: 5px;
    left: 45px;
    font-size: 11px;
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

/* Modal Styles */

.title_modal_card {
  color: #535559;
  font-size: 16px;
  font-weight: 400;
  padding-left: 20px;
  padding-top: 13px;
}

.mob_card_pl {
  padding-left: 10px !important;
}

.modal_form {
  padding: 0px 12px;
  width: 600px;
}

.modal_form .md-layout-item {
  padding-right: 12px;
}

/* -- close button */
.close_btn {
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 12px;
  background-color: #c7ced8;
  border-radius: 50px;
  padding: 3px;
  height: 25px;
  width: 25px;
  min-width: 2px;
}
.close_btn i {
  font-size: 16px;
  color: #213a63;
  display: flex;
}

/* -- save button */
.btn_save span {
  margin-top: 3px;
}

.btn_save i {
  font-size: 16px;
  float: left;
  margin-right: 2px;
}
.btn_save {
  border: none;
  background-color: #ff5821;
  height: 40px;
  margin: 20px 0px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

@media screen and (max-width: 768px) {
  .close_btn {
    right: 11px;
    top: 7px;
  }
  .title_modal_card {
    font-size: 14px;
    padding-top: 12px;
  }

  .modal_credit .md-overlay.md-fixed,
  body > .md-overlay {
    z-index: 9999 !important;
  }

  .md-dialog {
    z-index: 99999;
  }
}

@media screen and (max-width: 600px) {
  .modal_form {
    width: 100%;
  }
  .modal_credit {
    width: 100%;
  }

  .close_btn {
    right: 2px;
  }

  .btn_save i {
    font-size: 14px;

    margin-right: 2px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 12px;
  }

  .title_modal_card {
    font-size: 13px;
    padding-top: 10px;
    padding-left: 10px;
  }
  .mob_card_pl {
    padding-left: 10px !important;
  }
  .box_billing {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media screen and (max-width: 300px) {
  .btn_save {
    height: 35px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 11px;
  }
}

/* Add Variation Button */
.iconButton {
  height: 29px;
  border: 1px solid #f47320;
  justify-content: center;
  align-items: center;
  display: flex;
  text-transform: capitalize;
  font-size: 13px;
  padding: 5px;
}
.iconButton span {
  font-size: 20px;
}

/* Variation Listing CSS */
.variationOption {
  padding: 12px;
  background-color: white;
  margin: 12px 12px;
  border-radius: 5px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
}

/* Variation card Swatch  */
.dot {
  width: 34px;
  height: 34px;
  content: "";
  background-color: #fe5823;
  padding: 10px;
  border-radius: 50%;
  /* margin-top: 10px; */
  float: right;
  cursor: pointer;
}

.letter {
  text-transform: capitalize;
  text-align: center;
  color: white;
  font-weight: bold;
}

.variationDetailsLeft {
  margin: auto;
  padding: 10px 0px;
  text-align: left;
}

.variationList {
  background-color: #f7f7f7;
}
.variationOptionName {
  font-size: larger;
  padding: 8px 0px;
}

.variationFileUpload .vue-advanced-cropper {
  max-width: 500px;
  max-height: 250px;
}

.dimensions {
  margin-left: 32px;
}

.dimension-columns {
  padding-right: 12px;
}

/* Variation CSS */
.btn_edit {
  min-width: 20px;
  height: 32px;
  border-radius: 3px;
  width: 38px;
}
@media screen and (max-width: 767px) {
  .form-section >>> .btn_edit {
    height: 22px !important;
    border-radius: 3px !important;
    width: 22px !important;
  }
  .form-section >>> .btn_edit .material-icons {
    font-size: 19px;
    padding: 3px;
  }
  .btn_edit {
    height: 22px !important;
    border-radius: 3px !important;
    width: 22px !important;
  }
  .btn_edit .material-icons {
    font-size: 19px;
    padding: 3px;
  }
}
</style>
