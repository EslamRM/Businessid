<template>
  <div class="md-layout-item md-size-65">
    <div class="frm-hdr-1-txt breadcrums txt-algn-right">
      <router-link
        v-for="(item, index) in items"
        :key="index"
        exact-active-class="breadcrumb-active"
        exact
        :to="item.link"
      >
        <span class="breadcrumb-title"> {{ item.title }}</span>
        <span class="breadcrumb-arrow">></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "breadCrumbs",
  props: {
    items: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>
.breadcrumb-title {
  text-transform: capitalize;
  color: #8e8e8e;
  padding: 0px 10px;
}

.breadcrumb-active .breadcrumb-title {
  color: #ff5722 !important;
}

@media screen and (max-width: 768px) {
  .breadcrumb-title {
    font-size: 12px;
    padding: 0px 6px;
  }
  .breadcrums {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .breadcrumb-title {
    font-size: 10px;
    padding: 0px 0px;
  }

  
}
@media screen and (max-width: 300px) {
  .breadcrumb-title {
    font-size: 9px;
  }
}
</style>
