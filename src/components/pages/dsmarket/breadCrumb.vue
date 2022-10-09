<template>
  <div>
    <div class="container">
      <div class="row_margin">
        <div class="col-sm-12 p-0 fl">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb" v-if="categories.length > 0">
              <li
                v-for="(category, index) in categories"
                :key="index"
                class="breadcrumb-item"
              >
                {{ category }}
                <span v-if="categories.length - 1 != index">></span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["product"],
  data() {
    return {
      categories: ""
    };
  },
  computed: {
    breadCrumbs() {
      return this.categories.forEach(item => {
        return item;
      });
    }
  },
  created() {
    this.categories = this.product.categories;
  }
};
</script>
<style scoped>
.breadcrumb-item {
  color: #545766;
  text-transform: capitalize;
  display: inline-block;
  text-decoration: none;
  padding-bottom: 1px;
  border-bottom: 1px solid transparent;
  cursor: pointer;
  font-size: 12px;
  font-weight: 400;
}
.breadcrumb-item:hover {
  border-bottom: 1px solid #f47320;
  color: #f47320;
}

.breadcrumb span {
  margin-left: 3px;
  margin-right: 3px;
  font-size: 10px;
}
.breadcrumb {
  margin-top: 15px;
}

@media screen and (max-width: 768px) {
  .breadcrumb {
    margin-top: 0px;
    line-height: 15px;
  }
  .row_margin {
    margin-left: -25px;
    margin-right: -25px;
    margin-top: 10px;
  }
  .page-padd-cmn {
    padding-top: 2.3em;
  }
}

@media screen and (max-width: 600px) {
  .row_margin {
    margin-left: -5px;
    margin-right: -5px;
    margin-top: 8px;
  }

  .breadcrumb-item {
    font-size: 11px;
  }
}
</style>
