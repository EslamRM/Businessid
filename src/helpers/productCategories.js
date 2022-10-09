import axios from "axios";
import debounce from "lodash.debounce";

export default {
  data() {
    return {
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
      //   allCategoriesSelected: false

      productAttributes: [],

      brands: []
    };
  },
  created() {
    this.loadCategories(null, "subCategory1Options", true);
  },
  methods: {
    onMainOptionsSearch(search, loading) {
      loading(true);

      if (search.length < 2) {
        loading(false);
        return;
      }
      this.search(
        loading,
        search,
        this,
        "mainOptions",
        "api_all_market_categories"
      );
    },
    onBrandSearch(search, loading) {
      loading(true);

      if (search.length < 2) {
        loading(false);
        return;
      }
      this.search(loading, search, this, "brands", "api_product_brands", {
        search,
        product_type: "item"
      });
    },
    search: debounce(async (loading, search, vm, object, api, data) => {
      try {
        if (!data) data = { search };
        const res = await axios.post(api, data);
        const { success, categories, result } = await res.data;
        if (success) {
          vm[object] = (await categories) || result;
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
    async subCategory1Selected(type) {
      if (!this.subCategory1) {
        this.allCategoriesNotSelected(1);
        return;
      }
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
        this.finalizeSelection(1);
        // this.loadProductAttributes(this.subCategory1.category_id);
        // this.allCategoriesSelected = true;
        return;
      }
      this.subCategory2Options = await category;
    },
    async subCategory2Selected() {
      if (!this.subCategory2) {
        this.allCategoriesNotSelected(2);
        return;
      }
      console.log("2 Selected");
      const { category } = await this.$store.dispatch(
        "loadCategories",
        this.subCategory2.category_id
      );
      if (!category) {
        this.finalizeSelection(2);

        // this.loadProductAttributes(this.subCategory2.category_id);
        // this.allCategoriesSelected = true;
        return;
      }
      this.subCategory3Options = await category;
    },
    async subCategory3Selected() {
      if (!this.subCategory3) {
        this.allCategoriesNotSelected(3);
        return;
      }
      this.subCategory4Options = [];
      console.log("3 Selected");
      const { category } = await this.$store.dispatch(
        "loadCategories",
        this.subCategory3.category_id
      );
      if (!category) {
        this.finalizeSelection(3);

        // this.loadProductAttributes(this.subCategory3.category_id);
        // this.allCategoriesSelected = true;
        return;
      }
      this.subCategory4Options = await category;
    },
    async subCategory4Selected() {
      if (!this.subCategory4) {
        this.allCategoriesNotSelected(4);
        return;
      }
      console.log("4 Selected");
      this.finalizeSelection(4);

      //   this.allCategoriesSelected = true;
      //   this.loadProductAttributes(this.subCategory4.category_id);
    },
    async loadProductAttributes(id) {
      this.productAttributes = [];
      const response = await this.$store.dispatch("loadProductAttributes", id);
      if (response) {
        this.productAttributes = response;
      }
      console.log("Product Attributes Loaded.");
    },

    // Only for Product "Update" => i.e when url has productId as query param
    async triggerAutoFill() {
      if (!this.categories[1]) {
        await this.autoFillCategories(this.categories[0]);
        return;
      }
      if (!this.categories[2]) {
        await this.autoFillCategories(this.categories[1]);
        return;
      }
      if (!this.categories[3]) {
        await this.autoFillCategories(this.categories[2]);
        return;
      }
      if (!this.categories[4]) {
        await this.autoFillCategories(this.categories[3]);
        return;
      }
      console.log(this.categories);
    },
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
      if (!this.product_attributes) return;
      // return this.product_attributes.find(el =>
      //   Object.keys(el).find(k => k == name)
      // );
      return this.product_attributes[name];
    }
  }
};
