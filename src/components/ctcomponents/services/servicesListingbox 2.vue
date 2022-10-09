<template>
  <div>
    <div class="bx-tp-ct-lst">
      <div class="bx-tp-12-ch">
        <div class="bx-ch-12">
          <div class="d-flex">
            <span class="spn-tp-121">Services</span>
            <!-- <span class="spn-tp-122">(3256,items Found)</span> -->
          </div>
        </div>

        <div class="show-bx-1 ctSelect">
          <i class="md-icon md-icon-font md-theme-default">swap_vert</i>
          <select @change="onChangePrice($event)">
            <option value="">Sort</option>
            <option value="phtl" :selected="sort == 'phtl'"
              >Price - High to Low
            </option>
            <option value="plth" :selected="sort == 'plth'"
              >Price - Low to High</option
            >
            <option value="ohtl" :selected="sort == 'ohtl'"
              >% Off - High to Low</option
            >
            <option value="olth" :selected="sort == 'olth'"
              >% Off - Low to High</option
            >
          </select>
        </div>

        <!-- <div class="filter_products">
          <i class="md-icon md-icon-font md-theme-default">filter_alt</i>
        </div> -->

        <div class="bx-ch-13 topPos">
          <div class="switchView">
            <span
              class="swtc-bx-lnk-1"
              :class="{ active: listActivated }"
              @click="callToList"
            >
              <i class="material-icons">view_list</i>
            </span>
            <span
              class="swtc-bx-lnk-1"
              :class="{ active: gridActivated }"
              @click="callToList"
            >
              <i class="material-icons">view_headline</i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="lst-bxing-1">
      <div class="container-floor2">
        <div class="list-wrapper" :class="{ listactiveBox: gridActivated }">
          <div class="listItemShow services">
            <div
              class="offer-item"
              v-for="(service, index) in services"
              :key="index"
            >
              <ListService :service="service" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ListService from "./listService";
export default {
  components: { ListService },
  props: ["sort"],
  data() {
    return {
      price_sort: "",
      rightSelect: "ijas",
      gridActivated: false,
      listActivated: true,
      listactive: false
    };
  },
  computed: {
    services() {
      return this.$store.getters.getServices;
    }
  },
  methods: {
    onChangePrice(event) {
      const data = event.target.value;
      this.$emit("price_sort", data);
    },
    callToList() {
      this.listActivated = !this.listActivated;
      this.gridActivated = !this.gridActivated;
      this.listactive = !this.listactive;
    }
  }
};
</script>
<style scoped>
.spn-tp-121 {
  padding-left: 0px;
}
.switchView {
  margin-right: 8px !important;
}
.show-bx-1 {
  margin-bottom: 0px !important;
  width: 170px;
}
.show-bx-1 i {
  font-size: 20px !important;
  color: #a6a6ab !important;
  margin-right: -6px !important;
}
.filter_products {
  float: right !important;
  margin-right: 2px;
}

.filter_products i {
  width: 35px;
  height: 30px;
  margin-right: 10px;
  float: left;
  border: solid 1px #d2d2d2;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px !important;
  cursor: pointer;
}

.extra-ftr-icn {
  font-size: 14px;
  position: relative;
  top: 2px;
  margin-right: 10px;
}
.bravo-offer-price,
.bravo-offer-moq {
  text-align: left;
}
.inner-img {
  object-fit: cover !important;
}

.bravo-offer-price {
  font-size: 12px;
  color: #000;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  margin-bottom: 8px;
  word-wrap: normal;
  height: 38px;
}
.bravo-offer-moq {
  font-size: 12px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: normal;
  height: 35px;
}
.list-tp-services {
  font-size: 12px;
  color: #191919;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-wrap: normal;
  height: 20px;
  font-weight: 500;
  margin-top: 5px;
  text-align: left;
}
.bravo-offer-image {
  display: none;
}
.listItemShow.services .bravo-normal-offer {
  padding: 0;
}

.listItemShow {
  grid-gap: 10px !important;
}
.listItemShow.property .bravo-normal-offer {
  padding: 0;
  padding-bottom: 11px;
}
.listItemShow.property {
  grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
}
.listactiveBox .listItemShow.property {
  grid-template-columns: repeat(auto-fill, minmax(311px, 1fr)) !important;
}

.lst-bxing-1 {
  float: left;
}
.bx-tp-12-ch {
  display: block !important;
  float: left;
  padding-top: 10px !important;
}
.show-bx-1 .bx-tp-12-ch {
  float: left;
}
.bx-ch-12 {
  float: left;
}
.topPos {
  float: right;
}

.ctSelect {
  float: right;
}
.spn-tp-121 {
  margin-top: 6px !important;
}
@media screen and (max-width: 768px) {
  .spn-tp-121 {
    font-size: 16px;
  }
  .ctSelect select,
  .ctSelectDoubled select {
    font-size: 11px !important;
  }
  .ctSelect {
    width: 155px !important;
  }
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
  .switchView {
    margin-right: 6px !important;
  }
  .filter_products i {
    margin-right: 4px !important;
  }
  .ctSelect {
    width: 135px !important;
  }
  .spn-tp-121 {
    font-size: 14px;
    margin-top: 8px !important;
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
  .ctSelect {
    width: 100% !important;
    margin-top: 16px;
  }

  .filter_products {
    position: absolute;
    right: 8px;
  }

  .bx-tp-12-ch {
    position: relative;
  }
  .topPos {
    position: absolute;
    right: 50px;
  }
  .spn-tp-121 {
    font-size: 13px;
  }
}
</style>
