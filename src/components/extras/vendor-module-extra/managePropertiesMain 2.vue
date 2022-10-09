<template>
  <div>
    <div class="bx-tp-22 pd-10-all">
      <span class="txt-stl-1">Manage Your Properties</span>
      <span class="flt-rght">
        <i
          class="material-icons cursor-pointer"
          :class="{active:requestForItemStyle}"
          @click="requestForItemStyle=!requestForItemStyle"
        >view_headline</i>
        <i
          class="material-icons cursor-pointer"
          :class="{active:requestForItemStyle}"
          @click="requestForItemStyle=!requestForItemStyle"
        >view_list</i>
      </span>
    </div>
    <div>
      <div class="lst-bx-tp-1">
        <div class="pd-10-all">
          <div class="lst-bx-tp-1-cnt">
            <div class="lst-bxing-1">
              <div class="container-floor2">
                <offerItemType1 :listItems="itemList" :requestTolist="requestForItemStyle"></offerItemType1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import offerItemType1 from "@/components/ctcomponents/offerItemType1";
export default {
  data () {
    return {
      requestForItemStyle: false,
      itemList: [
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 125
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 123,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 1252
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        },
        {
          prdctId: 1,
          prdctThmb: "property2.png",
          prdctTittle: "Iphone Mobiles",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 12
        }
      ]
    };
  },
  components: {
    offerItemType1
  }
};
</script>
<style scoped>
.md-button-content {
  display: flex;
  align-items: center;
}
</style>
