<template>
  <div class="list-wrapper">
    <div class="listItemShow">
      <div class="offer-item" v-for="(product, index) in products" :key="index">
        <ProductList :product="product" />
      </div>
    </div>
  </div>
</template>
<script>
import ProductList from "./productList";
export default {
  components: { ProductList },

  data() {
    return {
      rightSelect: "ijas",
      gridActivated: false,
      listActivated: true,
      listactive: false
    };
  },
  methods: {
    callToList() {
      this.listActivated = !this.listActivated;
      this.gridActivated = !this.gridActivated;
      this.listactive = !this.listactive;
    }
  },
  computed: {
    products() {
      return this.$store.getters.getProducts;
    }
  }
};
</script>
<style scoped>
.listItemShow {
  grid-gap: 10px !important;
}

@media screen and (max-width: 768px) {
}

@media screen and (max-width: 600px) {
  .listItemShow {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(143px, 1fr));
    grid-gap: 10px;
  }

  .listactiveBox .listItemShow {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media screen and (max-width: 300px) {
  .listItemShow {
    grid-template-columns: repeat(auto-fill, minmax(127px, 1fr));
    grid-gap: 6px;
  }

  .listactiveBox .listItemShow[data-v-eb306cea] {
    grid-template-columns: repeat(auto-fill, minmax(260px, 0fr));
  }
}
</style>
