<template>
  <div class="list-wrapper offeritemtype1" :class="{itemTriggerToList:requestTolist}">
    <div class="offer-item" v-for="(listItem , index) in listItems" :key="index">
      <div class="bravo-normal-offer">
        <div class="bravo-offer-image">
          <div class="place"></div>
          <router-link to="/productDetailpage" class="product-link">
            <div class="offer-image">
              <img
                class="inner-img"
                :src="require(`../../assets/images/${listItem.prdctThmb}`)"
                :alt="require(`../../assets/images/${listItem.prdctThmb}`)"
              />
            </div>
          </router-link>
        </div>
        <div class="main-section text-center pos-rel">
          <div class="bravo-offer-price">{{listItem.prdctTittle}}</div>
          <div class="bravo-offer-moq">{{listItem.prdctBrand}}</div>
          <div class="price-tag-1">AED:{{listItem.prdctPrice}}</div>
        </div>
        <div class="add-more-btn">
          <i class="material-icons" @click="DeleteConfirm">delete</i>
          <router-link class="material-icons" to="/vendor/editProduct" tag="i">create</router-link>
        </div>
      </div>
    </div>
    <confirmBox :confirmBoxValue="confirmBox"></confirmBox>
  </div>
</template>
<script>
import confirmBox from "../ctcomponents/confirmBox";
import editProduct from "../ctcomponents/editProduct";
export default {

  props: ["listItems", "requestTolist"],
  data () {
    return {
      confirmBox: false,
      actice: false,
      value: null
    };
  },
  components: {
    confirmBox,
    editProduct
  },
  methods: {
    DeleteConfirm () {
      this.confirmBox = true;
    },
    onConfirm () {
      this.value = "Agreed";
    },
    onCancel () {
      this.value = "Disagreed";
    }
  }
};
</script>
<style scoped>
.price-tag-1 {
  text-align: center;
}
</style>
