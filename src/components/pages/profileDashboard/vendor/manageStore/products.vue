<template>
  <div>
    <div class="col-sm-12 col-md-12 col-xl-12 fl wrapper_order_table">
      <div class="col-sm-12 pl-0 pr-0 fl">
        <div class="md-layout md-size-100 md-alignment-top-space-between caps">
          <div
            class="md-layout-item box_date filters"
          >

            <div class="search-box">
              <input
              type="text"
              placeholder="eg: name, brand, id"
              class="pl-0"
              v-model="form.search"
            />
            </div>
            <div class="refresh-box">
              <button>
              <i
                data-v-630689f1
                class="material-icons f-s-19"
                @click="refresh()"
                >search</i
              >
            </button>
            </div>
            <div class="select-box">
              <vSelect
                class="tall-box"
                v-model="form.market_type"
                :options="['supply', 'demand']"
                placeholder="Market Type"
                @input="refresh()"
                :clearable="false"
              >
              </vSelect>
            </div>
            <div class="select-box">
              <vSelect
                class="tall-box"
                label="name"
                v-model="form.status"
                :reduce="o => o.value"
                :options="[
                  { name: 'Active', value: '1' },
                  { name: 'In-Active', value: '2' }
                ]"
                placeholder="Status"
                @input="refresh()"
                :clearable="false"
              >
              </vSelect>
            </div>
            <div class="date-box">
              <VueDatePicker
                class="editOrder-datePicker-mob"
                v-model="form.from_date"
                color="#f47320"
                placeholder="Choose From Date"
                @onChange="dateSubmitted('from')"
                clearable
                :max-date="this.form.to_date"
              />
            </div>
            <div class="date-box">
              <VueDatePicker
                v-model="form.to_date"
                color="#f47320"
                placeholder="Choose To Date"
                @onChange="dateSubmitted('to')"
                clearable
                :min-date="this.form.from_date"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-sm-12 pl-0 pr-0 fl caps"
        v-infinite-scroll="loadPendingOrders()"
        :infinite-scroll-listen-for-event="true"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
        v-if="products.length > 0"
      >
        <div class=" md-gutter productsGrid col-sm-12 p-0">
          <div class="tab_row">
            <div
              class="md-layout-item box_store col-sm-6 col-md-6 col-xl-3"
              v-for="(product, index) in products"
              :key="index"
            >
              <productGrid
                class="offer-item"
                :product="product"
                @changeStatus="changeStatus"
                @deleteProduct="deleteProduct"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-12 pl-0 pr-0 fl products_table">
        <md-table>
          <transition name="fade">
            <md-table-row v-if="tableLoader">
              <md-table-cell colspan="10" md-numeric
                ><center>
                  <!---<div class="lds-dual-ring"></div>--->

                  <div class="loading-1 loading"></div></center
              ></md-table-cell>
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noInvoicesFound">
              <md-table-cell colspan="10" md-numeric
                ><center>
                  <h1 class="no-orders-found">No products found.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
          <transition name="fade">
            <md-table-row v-if="noMoreInvoices">
              <md-table-cell colspan="10" md-numeric
                ><center>
                  <h1 class="no-orders-found">No more {{ form.type }}s.</h1>
                </center></md-table-cell
              >
            </md-table-row>
          </transition>
        </md-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import vSelect from "vue-select";
import productGrid from "./productGrid";
export default {
  components: {
    vSelect,
    productGrid
  },
  data() {
    return {
      products: [],
      form: {
        page: 0,
        market_type: "supply",
        type: "item",
        status: "",
        search: "",
        from_date: null,
        to_date: null
      },
      isDateValid: false,
      submitted: false,
      busy: false,
      tableLoader: true,
      noInvoicesFound: false,
      noMoreInvoices: false
    };
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        console.log(newValue);
        const { type } = newValue;
        this.initialLoad(type);
      },
      immediate: true
    }
  },
  methods: {
    initialLoad(type) {
      (this.form.market_type = "supply"),
        (this.form.type = type),
        (this.form.status = "1"),
        (this.form.search = ""),
        (this.form.from_date = null),
        (this.form.to_date = null),
        this.refresh("firstLoad");
    },
    async loadPendingOrders(type) {
      if (this.busy) return;
      this.tableLoader = true;
      this.busy = true;
      this.form.page++;

      // const data = this.form;
      console.log(this.form.page);
      console.log("page hit");
      const data = this.form;
      const response = await axios.post("vendor/store", data);

      const { result, success, message } = await response.data;

      if (!success) {
        if (message && message === `No ${this.form.type}s found`) {
          type === "refresh" || type === "firstLoad"
            ? (this.noInvoicesFound = true)
            : (this.noMoreInvoices = true);
        }
        this.tableLoader = false;
        this.busy = true;
      } else {
        this.tableLoader = false;
        this.busy = false;
        this.products = [...this.products, ...result];
      }
    },
    getDate(date) {
      return moment(date).format("MMMD,YYYY");
    },
    refresh(type = "refresh") {
      this.busy = false;
      this.noMoreInvoices = false;
      this.noInvoicesFound = false;
      this.form.page = 0;
      this.products = [];
      console.log(type, "ref");
      this.loadPendingOrders(type);
    },
    dateSubmitted(type) {
      this.submitted = true;
      if (this.form.from_date > this.form.to_date) {
        this.isDateValid = false;
        console.log("Invalid");
        return;
      }
      this.refresh();
    },
    async changeStatus(cuurentStatus, item_id) {
      const status = cuurentStatus === "1" ? "2" : "1";
      try {
        const response = await axios.post("/vendor/store/item/status", {
          item_id,
          status
        });
        if (response.data.success) {
          const itemIndex = await this.$helpers.selectObjectFromArray(
            this.products,
            "item_id",
            item_id,
            true
          );
          this.products[itemIndex].status = status;
        }
        // await this.$swal.fire(this.$helpers.successPopup(`Product is ${status === "1" ? "Active" : "In-Active"} now.`))
        // await this.refresh()
      } catch (error) {
        await this.$swal.fire(
          this.$helpers.errorPopup(
            `Error making it ${
              status === "1" ? "Active" : "In-Active"
            }. Please try again.`
          )
        );
        console.log(error);
      }
    },
    deleteProduct(item_id) {
      console.log(item_id);
      this.$swal
        .fire({
          title: "Are you sure you want to DELETE product ?",
          html:
            '<p style="font-size: 10px; padding-top: 10px" >You cannot undo this action.</p>',
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonColor: "#ff5722",
          confirmButtonColor: "#64dd17",
          showLoaderOnConfirm: true,
          timer: 20000,
          timerProgressBar: true,
          preConfirm: confirm => {
            return axios
              .post("/vendor/store/item/delete", { item_id })
              .then(response => {
                // console.log(response.data)
                if (!response.data.success) {
                  throw new Error(response.statusText);
                }
                return response;
              })
              .catch(error => {
                this.$swal.showValidationMessage(`Request failed: ${error}`);
              });
          },
          allowOutsideClick: () => !Swal.isLoading()
        })
        .then(response => {
          console.log(response);
          if (response.value && response.value.data.success) {
            // this.refresh()
            const itemIndex = this.$helpers.selectObjectFromArray(
              this.products,
              "item_id",
              item_id,
              true
            );
            this.products.splice(itemIndex, 1);
            this.$swal.fire(
              this.$helpers.successPopup("Product Deleted Successfully.")
            );
          }
        });
    }
  }
};
</script>

<style scoped>
.box_store {
  padding-right: 5px !important;
  padding-left: 5px !important;
  float: left !important;
}

.pl_mob {
  padding-right: 0px;
}
/* Abhishek */
/* Product Grid */
.productsGrid {
  margin-top: 20px;
}
.listItemShow {
  grid-gap: 10px !important;
}

@media screen and (max-width: 768px) {
  .filters .md-layout-item {
    max-width: 100%;
    min-width: 100%;
  }
  .box_date input {
    width: 89.4% !important;
  }

  .productsGrid {
    margin-top: 8px;
  }

  .tab_row {
    margin-left: -5px;
    margin-right: -5px;
  }
  .offer-item {
    margin: 5px 0px !important;
  }
}

@media screen and (max-width: 600px) {
  .listItemShow {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(143px, 1fr));
    grid-gap: 10px;
  }
  .box_date input {
    width: 83% !important;
  }
  .box_store {
    width: 50%;
    padding-right: 2.5px !important;
    padding-left: 2.5px !important;
  }
  .box_date input {
    width: 83% !important;
  }
  .offer-item {
    margin: 1px 0px !important;
  }
}

@media screen and (max-width: 300px) {
  .box_date button {
    padding: 5px 14px !important;
  }
  .md-xsmall-size-100 {
    padding-top: 6px !important;
  }
  .box_date {
    margin-bottom: -7px !important;
    margin-top: -6px;
  }
  .md-xsmall-size-100 {
    padding-top: 5px;
  }
  .box_date {
    margin-bottom: -10px;
  }
  .offer-item {
    margin: 1px 0px !important;
    margin-bottom: 4px !important;
  }
  .listItemShow {
    grid-template-columns: repeat(auto-fill, minmax(127px, 1fr));
    grid-gap: 6px;
  }
  .box_store {
    width: 100%;
  }
}

.offer-item {
  width: 100%;
  background: #fff;
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  margin: 7px 0px;
}

/* Product Grid Css End */

.filters .md-layout-item {
  margin-right: 10px;
  /* padding-right: 10px; */
}

.no-orders-found {
  padding: 10px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
  font-size: 18px;
  padding-top: 6px;
}

.caps {
  text-transform: capitalize;
}

/* .blink {
  border: 1px #ff5733 solid;

  animation: blink 1s;
  animation-iteration-count: 10;
}

@keyframes blink {
  50% {
    border-color: #fff;
  }
} */
/* loading
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 40px;
  height: 40px;
  margin: 8px;
  border-radius: 50%;
  border: 4px solid #f47320;
  border-color: #f47320 transparent #f47320 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
*/
/* loading */

.loading-1 {
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  width: 50px;
  height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-1:after {
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px solid #ff5722;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s ease infinite;
  z-index: 10;
}
.loading-1:before {
  z-index: 5;
  content: "";
  position: absolute;
  border-radius: 50%;
  border: 3px dashed #fff;
  width: 18px;
  height: 18px;
  border-left: 3px solid transparent;
  border-bottom: 3px solid transparent;
  animation: loading1 1s linear infinite;
}

@keyframes loading1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
/* loading */

.vd-wrapper {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 9px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  width: 100%;
}

/* Abhishek */
/* tab Css */
h2 {
  margin-top: 40px;
}
.wlc-btn-wrp {
  margin-top: 40px;
}
.md-button {
  height: 42px;
}
.manage-order-tab {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pill-active .md-button {
  background-color: rgba(0, 0, 0, 0) !important;
}
.pill span {
  width: 22px;
  height: 21px;
  line-height: 21px;
  background-color: #949292;
  border-radius: 50%;
  display: inline-block;
  color: #fff;
  margin-left: 0.2em;
}

.list_button {
  height: 41px;
  margin-right: 0px !important;
  float: right !important;
  border: solid 1px #c8d2e0;
  border-radius: 6px;
  width: fit-content;
  padding-left: 5px;
  padding-right: 6px;
  width: fit-content;
}

.margin_list {
  margin-right: 15px !important;
}

.action_icon {
  float: left;
  font-size: 22px;
  cursor: pointer;
}

/*-----table_style_start-----*/
.bg_row {
  background-color: #f6f6f6;
}

.md-table.md-theme-default .md-table-row td {
  border: none !important;
}
.header_table_wallet {
  background-color: #213c64;
  margin-top: 30px;
}
.header_table_wallet h3 {
  color: #fff !important;
  font-weight: 400;
}

/*-----table_style_end-----*/

@media screen and (max-width: 1000px) {
  .pills {
    margin-left: -8px !important;
  }

  .rowmargin_tab {
    margin-left: -15px;
  }
  .box_date {
    margin-bottom: 15px;
  }
  .md-xsmall-size-100 {
    padding-top: 10px;
  }
}

@media screen and (max-width: 768px) {
  .box_date {
    margin-bottom: 0px;
    margin-bottom: -10px;
  }
  .wrapper_order_table {
    padding: 10px !important;
  }
}

@media screen and (max-width: 600px) {
  .no-orders-found {
    font-size: 13px;
  }

  .tab_row {
    margin-left: -3px;
    margin-right: -3px;
  }

  .pills {
    margin-right: -15px !important;
  }
  .md-button.md-theme-default.md-raised:not([disabled]) {
    margin-bottom: 7px;
    margin-right: 0px;
  }

  .md-xsmall-size-100 {
    padding-top: 8px;
  }
}
/* tab css end */
.order-wrap {
  width: 100%;
  padding: 15px;
}
.order-item {
  display: flex;
  padding: 11px;
  width: 100%;
  border: 1px solid #eee;
  margin-top: 1em;
}
.order-wrap figure {
  flex: 0 0 111px;
  text-align: center;
  margin-right: 1.5em;
}
.order-wrap figure img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}
.right {
  flex: 1 1;
  display: flex;
  justify-content: space-between;
}
.right .title {
  font-size: 14px;
  font-weight: 500;
}
.right .detail {
  font-size: 14px;
  color: #888;
  margin-top: 0.3em;
}
.right .detail span {
  color: #333;
  font-weight: 500;
}
.action-right {
  display: block;
  align-self: center;
  text-align: center;
}
.action-right .price {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0.3em;
}
.price.vat {
  font-size: 14px;
}
.status {
  background: #fbd5c9;
  padding: 5px 7px;
  border-radius: 4px;
}
.edit-status {
  display: flex;
  align-items: center;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
}
.edit-ico {
  border-radius: 4px;
  width: 30px;
  height: 30px;
  background: rgba(56, 174, 4, 0.2);
  align-items: center;
  line-height: 30px;
  color: #38ae04 !important;
  margin-right: 0.5em;
  font-size: 21px;
  text-align: center;
}

.fl {
  float: left;
}
.wrapper_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #f7f7f7;
  border-radius: 6px;
  padding: 25px;
  margin-bottom: 20px;
}
.box_date {
  float: left;
  padding: 0px;
}
.box_date input {
  float: left;
  border: solid 1px #c8d2e0;
  padding: 10px 10px;
  border-radius: 6px;
  padding-left: 10px !important;
  min-width: 100%;
}
.box_date button {
  float: left;
  background: #fff;
  margin-right: 0;
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  -webkit-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
}

.box_date button:hover {
  background: #ff5722;
  color: #fff;
  border: solid 1px #fff;
}

.fr {
  float: right;
}
.md-table-head-label {
  font-size: 14px;
}
.md-content.md-table-content.md-scrollbar.md-theme-default {
  margin-top: 10px;
}
textarea,
input {
  outline: none;
}
.md-table-cell-container img {
  width: 75px;
  float: left;
  height: 75px;
  margin-bottom: 5px;
}
.label_green {
  background: #64dd17;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.md-table-cell-container {
  padding: 6px 10px 6px 10px !important;
}

.label_red {
  background: #ff5733;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  width: 75px;
  cursor: pointer;
}
.out_of_stock {
  background: #ff5733;
  color: #fff;
  padding: 6px 10px;
  border-radius: 3px;
  float: left;
  width: 95px;
  cursor: not-allowed;
}

.label_white {
  background: #e4e4e4;
}
.md-content.md-theme-default {
  margin-top: 20px;
}
.m-auto {
  margin: auto;
}
.md-field {
  margin: -7px 0 25px;
}
.md-numeric,
.items_no {
  color: #4c98d1;
}

@media screen and (max-width: 1600px) and (min-width: 1300px) {
  .wrapper_order_table {
    width: 1182px;
  }
}

@media screen and (max-width: 1200px) and (min-width: 1010px) {
  .wrapper_order_table {
    width: 100%;
    max-width: 100%;
  }
  .box_date input {
    width: 48.6%;
  }
}
@media screen and (max-width: 1000px) {
  .m-auto {
    margin: 0 !important;
  }
  .box_date input {
    width: 43.6%;
  }
  .md-content.md-theme-default {
    margin-top: 10px;
  }
  .md-field {
    margin: -7px 0 0px;
  }

  .label_red {
    width: 80px;
  }
  .out_of_stock {
    width: 102px;
  }
}
@media screen and (max-width: 600px) {
  .box_order {
    width: 255px;
    margin-top: 18px;
    margin-bottom: -7px;
    float: left;
  }

  .box_date input {
    width: 75%;
    padding: 8px 10px;
  }
  .box_date input::placeholder {
    font-size: 13px;
  }
  .pl_mob {
    padding-left: 0px;
  }

  .box_date button {
    padding: 5px 13px;
  }

  .md-field {
    margin: -7px 0 5px;
    margin-top: 10px;
  }
  .list_button {
    width: 100%;
    margin-top: 12px;
  }

  button.md-button.md-raised.md-theme-default {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
  .margin_list {
    margin-right: 0px !important;
  }

  .box_date {
    margin-bottom: -9px;
  }
  .rowmargin_tab {
    margin-left: 0px;
  }
  .vd-wrapper {
    margin-top: 0px;
    padding: 8px 10px;
  }

  .wrapper_order_table {
    background-color: #fbfbfd;
    box-shadow: none !important;
    padding: 0px !important;
  }
}
@media screen and (max-width: 500px) {
  .wrapper_order_table {
    padding: 0px;
  }
  .offer-item {
    margin: 7px 0px;
  }
}
@media screen and (max-width: 420px) and (min-width: 400px) {
  .box_date input {
    width: 75%;
  }
  .box_date input {
    width: 84.7% !important;
  }
}
@media screen and (max-width: 360px) {
  .box_date input {
    width: 81% !important;
  }
}
@media screen and (max-width: 300px) {
  .box_date input {
    width: 70%;
  }
  .box_date input {
    width: 76.5% !important;
  }
}
.filters{
  display: flex;
  max-width: 100%;
}
.filters > div{
  padding: 0 5px;
}
.tall-box{
  width: 150px;
}
.date-box{
  width: 22%;
}
.search-box{
  min-width: 195px;
}
@media screen and (min-width: 768px) and (max-width: 1199px) {
  .filters{
    flex-wrap: wrap;
  }
  .search-box{
    min-width: calc(100% - 382px);
  }
  .date-box{
    margin-top: 10px;
    width: 50%;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .search-box{
    min-width: calc(100% - 322px);
  }
  .tall-box{
    width: 120px;
  }
  .productsGrid {
    margin-top: 10px;
  }
}
@media screen and (max-width: 767px) {
  .filters{
    flex-wrap: wrap;
    margin: 0 -5px;
    max-width: calc(100% + 10px);
  }
  .search-box{
    min-width: calc(100% - 62px);
  }
  .select-box{
    margin-top: 10px;
    width: 50%;
  }
  .tall-box{
    min-width: 100%;
  }
  .date-box{
    margin-top: -3px;
    margin-bottom: 10px;
    width: 50%;
  }
  .productsGrid {
    margin-top: 10px;
  }
}
@media screen and (max-width: 600px) {
  .filters{
    padding-top: 10px;
  }
  .date-box{
    margin-top: 10px;
    width: 50%;
  }
  .manage-order-tab .pills{
    width: 100%;
  }
}
</style>
