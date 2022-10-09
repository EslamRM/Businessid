<template>
<div>
  <div class="overflowWrap">
  <ul class="dividingTo util-clearfix">
    <li
      v-for="(third_category, index) in display(sub_category.categories)"
      :key="index"
    >
      <router-link
        :to="getUrl(category, sub_category, 'third_category', third_category)"
      >
        {{ third_category.categoryname }}
      </router-link>
    </li>
  </ul>
      <div class="toggle-wrapper" v-if="sub_category.categories.length > 25">
      <a class="view-more" @click="showLess = !showLess"
        >View {{ showLess ? "More" : "Less" }}
        <i v-if="showLess" class="material-icons">arrow_drop_down</i>
        <i v-else class="material-icons">arrow_drop_up</i></a
      >
    </div>
</div>
</div>
</template>

<script>
export default {
  props: ["category", "sub_category"],
  data() {
    return {
      showLess: true
    };
  },
  computed: {
    display() {
      return data =>
        data.length > 17 ? (this.showLess ? data.slice(0, 17) : data) : data;
    }
  },
  methods: {
    getUrl(category, sub_category, type, third_category = "") {
      const catname = this.replaceAmbersand(category.categoryname)
      const sub_catname = this.replaceAmbersand(sub_category.categoryname);
      const third_catname = this.replaceAmbersand(third_category.categoryname);
      const third_url = '&categories='+third_catname+'&l3value='+third_catname+'&l3id='+third_category.category_id; 
      return '/store?categories='+catname+'&l1value='+catname+'&l1id='+category.category_id+'&categories='+sub_catname+'&l2value='+sub_catname+'&l2id='+sub_category.category_id+third_url;
    },
    replaceAmbersand(data){
        return data.replace(/[&]/g, "%26");
    }
  }
};
</script>
<style scoped>
.util-clearfix:after {
    visibility: hidden;
    display: block;
    height: 0;
    font-size: 0;
    content: '\0020';
    clear: both;
}
li {
  width: auto;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  line-height: 18px;
  height: 18px;
}
li a {
  font-size: 13px;
  width: 227px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #4a4a4a;
}
.toggle-wrapper {
  margin-top: 10px;
}
.toggle-wrapper .view-more {
  color: #4d7bf1 !important;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.dividingTo{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(231px, 1fr));
  grid-gap: 3px;
}
.overflowWrap{


}
.view-more i {
}
</style>
