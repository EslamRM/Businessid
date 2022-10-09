<template>
  <!-- Auto Categories -->
  <form-section :number="number" :title="title">
    <div class="desktop_mb_minus10">
      <div class="md-layout category desktop_mt_15">
        <div class="md-layout-item md-size-100">
          <input-component label="Search Categories *" custom="true">
            <v-select
              v-model="mainSelected"
              label="categoryname"
              :options="mainOptions"
              @search="onMainOptionsSearch"
              @input="autoSelectOtherCategories"
              placeholder="Search Categories."
            >
            </v-select
          ></input-component>
        </div>
      </div>

      <div class="md-layout md-gutter mt-4 md-alignment-center-start">
        <input-component label="Category 1 *" size="33" custom="true">
          <v-select
            v-model="subCategory1"
            label="categoryname"
            :options="subCategory1Options"
            @input="subCategory1Selected"
            placeholder="Select Category 1"
          >
          </v-select
        ></input-component>

        <input-component
          label="Category 2 *"
          size="33"
          custom="true"
          v-if="
            subCategory2Options.length > 0 ||
              (action_type === 'update' && this.subCategory2)
          "
        >
          <v-select
            v-model="subCategory2"
            label="categoryname"
            :options="subCategory2Options"
            @input="subCategory2Selected"
            placeholder="Select Category 2"
          >
          </v-select
        ></input-component>
        <input-component
          label="Category 3 *"
          size="33"
          custom="true"
          v-if="
            subCategory3Options.length > 0 ||
              (action_type === 'update' && this.subCategory3)
          "
        >
          <v-select
            v-model="subCategory3"
            label="categoryname"
            :options="subCategory3Options"
            @input="subCategory3Selected"
            placeholder="Select Category 3"
          >
          </v-select
        ></input-component>
        <input-component
          label="Category 4 *"
          size="33"
          custom="true"
          v-if="
            subCategory4Options.length > 0 ||
              (action_type === 'update' && this.subCategory4)
          "
        >
          <v-select
            v-model="subCategory4"
            label="categoryname"
            :options="subCategory4Options"
            @input="subCategory4Selected"
            placeholder="Select Category 4"
          >
          </v-select
        ></input-component>
      </div>
      <div
        class="md-alignment-center-center c-forminlineError"
        v-if="checkValidationCustom('form', 'allCategoriesSelected', 'checked')"
      >
        <center>Please Select All Categories</center>
      </div>

      <!-- Features -->
      <div
        class="md-layout md-gutter mt-4 md-alignment-center-center productAttributes margin_delivery"
        v-if="allCategoriesSelected"
      >
        <div class="md-layout-item md-size-100 padding_delivery ">
          <h3 class="title_delivery">Delivery Size</h3>
          <div class="note">
            <i>Note</i> : Please enter correct/precise values of Delivery Sizes.
            Your shipping charges will be calculated accordingly.
          </div>
        </div>
        <!-- :error="checkValidation(`item_${param.toLowerCase()}`)" -->
        <input-component
          custom="true"
          v-for="(param, index) in delivery_size"
          :key="index + 100"
          :label="`${param} (meters) *`"
          :error="checkValidationCustom('form', `item_${param}`, 'minValue')"
          :errorMessage="`Please Enter correct ${param} value`"
        >
          <input
            class="c-formInput c-form-placeholder"
            type="number"
            min="0.00"
            step="0.1"
            :placeholder="`${param} (meters)`"
            :value="_props[`item_${param}`]"
            @input="$emit(`update:item_${param}`, Number($event.target.value))"
          />
        </input-component>
        <input-component size="100" :custom="true">
          <hr
            data-v-6ab5a752=""
            style="border: 1px solid rgba(208, 206, 206, 0.93)"
          />
        </input-component>
        <div class="md-layout-item md-size-100">
          <h3 class="title_delivery">Product Attributes</h3>
          <div class="note">
            <i>Note</i> : The more attributes you fill, more chances of your
            products suggested to user.
          </div>
        </div>
        <input-component
          label="Product Brand *"
          custom="true"
          size="100"
          :error="checkValidation('brand')"
        >
          <v-select
            :value="brand"
            @input="el => $emit('update:brand', el)"
            label="brand"
            :reduce="brand => brand.brand"
            :options="brands"
            @search="onBrandSearch"
            placeholder="Search Brand."
            taggable
            push-tags
          >
          </v-select
        ></input-component>
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
                  Object.assign(product_attributes, {
                    [attribute.name]: ''
                  });
                }

                Object.assign(product_attributes, { [attribute.name]: e });
                $emit('update:product_attributes', product_attributes);
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
  </form-section>
</template>

<script>
import formSection from "./formSection.vue";
import inputComponent from "@/components/ui-components/input.vue";
import productCategories from "@/helpers/productCategories.js";
import utils from "@/helpers/utils.js";
export default {
  name: "productCategories",
  mixins: [productCategories, utils],
  props: {
    number: String,
    title: String,
    action_type: String,
    allCategoriesSelected: Boolean,
    categories: Array,
    error: Boolean,

    item_length: {},
    item_width: {},
    item_height: {},
    item_weight: {},
    brand: String,

    product_attributes: Object,

    $v: {},
    submitted: Boolean
  },
  components: {
    formSection,
    inputComponent
  },
  data() {
    return {
      localCategories: [],
      delivery_size: ["length", "width", "height", "weight"]
    };
  },
  created() {
    if (this.action_type === "update") {
      this.triggerAutoFill();
      console.log(this);
    }
  },
  methods: {
    //1. Called when the next C ategory Options are not found. (All Categories Selected.)
    finalizeSelection(num) {
      this.localCategories = [];
      // Load Product Attributes
      this.loadProductAttributes(this[`subCategory${num}`].category_id);
      this.$emit("update:allCategoriesSelected", true);

      // Fill up Categories Array
      this.subCategory1
        ? this.localCategories.push(this.subCategory1.categoryname)
        : null;
      this.subCategory2
        ? this.localCategories.push(this.subCategory2.categoryname)
        : null;
      this.subCategory3
        ? this.localCategories.push(this.subCategory3.categoryname)
        : null;
      this.subCategory4
        ? this.localCategories.push(this.subCategory4.categoryname)
        : null;
      // Emit the Array
      this.$emit("update:categories", this.localCategories);
    },
    allCategoriesNotSelected(id) {
      // When Any one category is cleared it is called to empty the options array of next catrgory.
      for (var x = id + 1; x < 5; x++) {
        this[`subCategory${x}`] = null;
        this[`subCategory${x}Options`] = [];
      }
      // Set all Categories Selected to False.
      this.$emit("update:allCategoriesSelected", false);
      // Empty product_attributes
      this.$emit("update:product_attributes", {});
    },
    //5. Update Brand
    updateBrand(val) {
      console.log(val);
    }
  }
};
</script>
<style>
.desktop_mt_15 {
  margin-top: 15px;
}
.productAttributes {
  padding: 19px 0px;
  background-color: #f3f6f9;
  border-radius: 2px;
  margin: 0px !important;
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
.margin_delivery {
  margin-top: 15px !important;
}
.padding_delivery {
  padding-top: 0px;
  padding-bottom: 10px;
}
.desktop_mb_minus10 {
  margin-bottom: -10px !important;
}
@media screen and (max-width: 768px) {
  .margin_delivery {
    margin-left: -8px !important;
    margin-right: -8px !important;
    margin-bottom: -8px !important;
  }
  .productAttributes {
    background-color: #fff;
    padding-bottom: 5px;
    padding-top: 0px;
  }
  .title_delivery {
    font-size: 15px !important;
  }
}

@media screen and (max-width: 600px) {
  .productAttributes.margin_delivery {
    margin-bottom: -5px;
  }
  .padding_delivery {
    padding-top: 2px;
    padding-bottom: 4px;
  }
  .margin_delivery {
    margin-left: -4px !important;
    margin-right: -4px !important;
  }
  .title_delivery {
    font-size: 12px !important;
    margin-top: -10px;
  }
}

@media screen and (max-width: 300px) {
}
</style>
