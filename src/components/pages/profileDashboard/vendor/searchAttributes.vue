<template>
  <div class="w-100" v-click-outside="hide">
    <div class=" c-form v--three-columns v--odd">
      <fieldset class="inline-through text-left">
        <label class="c-formLabel">{{ attribute.name }}</label>
        <input
          required
          v-model.trim="txtSearch"
          class="c-formInput c-form-placeholder"
          @blur="txtBlur(attribute.name, txtSearch)"
          @focus="txtFocus(attribute.optionalValue)"
          @input="searchAttributes(attribute.optionalValue)"
          type="text"
          @keydown.enter.prevent="enter"
          @keydown.down="down"
          @keydown.up="up"
          :placeholder="'Enter ' + attribute.name"
        />
      </fieldset>
    </div>
    <div id="result" v-if="showResult" class="auto-scrol-bx">
      <ul v-if="items.length">
        <li
          v-for="(item, i) in items"
          :key="i"
          @click="clickAttribute(attribute.name, item)"
          :class="{ 'is-active': i === arrowCounter }"
        >
          <div class="w-100 d-inline-flex align-center">
            <div class="d-inline-block addressShown">
              {{ item }}
            </div>
          </div>
        </li>
      </ul>
      <ul v-else-if="txtSearch.trim() != '' && items.length <= 0">
        <li
          @click="clickAttribute(attribute.name, txtSearch)"
          class="is-active"
        >
          {{ txtSearch }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import ClickOutside from "vue-click-outside";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxValue,
  numeric,
  sameAs,
  maxLength
} from "vuelidate/lib/validators";

export default {
  props: ["attribute", "keyIndex", "lastCategoryName"],
  data() {
    return {
      showError: false,
      txtSearch: "",
      form: {},
      brand: "",
      brands: [],
      items: [],
      showResult: false,

      arrowCounter: 0,
      showBrands: false
    };
  },
  computed: {},
  directives: {
    ClickOutside
  },

  methods: {
    touch() {
      this.$v.form.$touch();
    },
    txtBlur(name, value) {
      if (value == "") {
        this.showError = true;
      }
      this.$emit("emitAttribute", name.trim(), value.trim());
    },
    txtFocus(item) {
      this.showResult = true;
      this.items = item;
    },
    hide() {
      this.showResult = false;
      this.showBrands = false;
    },
    searchBrand() {
      const name = this.brand;

      if (this.brand.length) {
        const data = {
          product_type: "item",
          search: this.brand,
          category: this.lastCategoryName
        };
        this.$store
          .dispatch("loadBrand", data)
          .then(response => {
            this.showBrands = true;
            console.log(response.result);
            if (response.success == true) {
              this.brands = response.result;
            } else if (response.success == false) {
              this.brands = [];
            }
          })
          .catch(error => console.log(error));
      } else {
        this.showBrands = false;
      }
    },
    clickBrands(item) {
      this.brand = item;

      this.showBrands = false;
      this.$emit("emitBrand", item);
    },
    blurBrand(name) {
      this.$emit("emitBrand", name);
    },
    searchAttributes(values) {
      if (this.txtSearch.length) {
        this.isShowAutoComplete = true;
        this.showResult = true;
        this.items = values.filter(item => {
          return item.toLowerCase().indexOf(this.txtSearch.toLowerCase()) > -1;
        });
      } else {
        this.items = values;
      }
    },
    clickAttribute(name, value) {
      this.txtSearch = value;
      this.showResult = false;
      const AttrName = name;
      const AttrValue = value.replace(/['"]+/g, "");

      this.$emit("emitAttribute", AttrName.trim(), AttrValue.trim());
    },
    enter() {
      if (this.items[this.arrowCounter] != undefined) {
        this.txtSearch = this.items[this.arrowCounter];
      } else if (this.brands[this.arrowCounter] != undefined) {
        this.brand = this.brands[this.arrowCounter].brand;
      }
      this.showBrands = false;
      this.showResult = false;
    },

    //When up pressed while suggestions are open
    up(e) {
      e.preventDefault();
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },

    //When up pressed while suggestions are open
    down(e) {
      e.preventDefault();
      console.log("object");
      if (this.arrowCounter < this.items.length - 1)
        this.arrowCounter = this.arrowCounter + 1;
      else if (this.arrowCounter < this.brands.length - 1)
        this.arrowCounter = this.arrowCounter + 1;
    }
  },

  created() {
    this.searchBrand();
    this.form = this.attribute.name;
  }
};
</script>
<style scoped>
.c-formLabel {
  text-transform: capitalize;
}
#result {
  margin: 0px auto;
  background-color: #fff;
  width: 45%;
  position: absolute;
  z-index: 2;
  /* margin: 0px auto; */
  /* margin-left: 8px; */
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
#result ul li {
  padding: 8px 0px;
  display: inline-flex;
  align-items: center;
  text-transform: capitalize;
  padding-left: 10px;
  width: 100%;
  font-size: 13px;
  line-height: 1.3;
}
#result ul li.is-active,
#result ul li:hover {
  background-color: #d2d2d2;
  cursor: pointer;
  font-weight: 600;
}

.inline-through {
  width: 100%;

  display: block !important;
}
</style>
