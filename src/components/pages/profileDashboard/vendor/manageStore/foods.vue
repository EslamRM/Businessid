<template>
  <div>
    <tabStore />

    <div class="col-sm-7 col-md-6 col-xl-12 fl wrapper_order_table">
      <div class="col-sm-12 pl-0 pr-0 fl">
        <div class="col-sm-12 pl-0 pr-0">
          <div class="col-sm-8 col-md-12 col-xl-8  box_date">
            <input
              type="text"
              placeholder="search"
              class="pl-0"
              v-model="form.order_number"
            />

            <button>
              <i
                data-v-630689f1
                class="material-icons f-s-19"
                @click="loadPendingOrders"
                >search</i
              >
            </button>

            <select class="list_button">
              <option>Active</option>
              <option>In Active</option>
            </select>

            <select class="list_button margin_list">
              <option>All Supplies</option>
              <option>All Demands</option>
            </select>
          </div>
          <div class="rowmargin_tab">
            <div class="col-sm-2 col-md-6 col-xl-2 pl-0 box_date">
              <div class="col-sm-12 pl_mob">
                <VueDatePicker
                  class="date_picker"
                  v-model="form.from_date"
                  color="#f47320"
                  placeholder="Choose From Date"
                  @onChange="dateSubmitted('from')"
                  button-validate="Ok"
                  button-cancel="Cancel"
                  validate
                  :max-date="this.form.to_date"
                />
              </div>
            </div>
            <div class="col-sm-2 col-md-6 col-xl-2 pl-0 box_date">
              <div class="col-sm-12 pl_mob">
                <VueDatePicker
                  class="date_picker"
                  v-model="form.to_date"
                  color="#f47320"
                  placeholder="Choose To Date"
                  @onChange="dateSubmitted('to')"
                  button-validate="Ok"
                  button-cancel="Cancel"
                  validate
                  :min-date="this.form.from_date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-12 pl-0 pr-0 fl">
        <md-table>
          <md-table-row>
            <md-table-head md-numeric><h3>ID</h3></md-table-head>
            <md-table-head><h3>Image</h3></md-table-head>
            <md-table-head><h3>Name</h3></md-table-head>

            <md-table-head><h3>Brand</h3></md-table-head>
            <md-table-head><h3>Unit</h3></md-table-head>
            <md-table-head><h3>Price</h3></md-table-head>
            <md-table-head><h3>Quantity</h3></md-table-head>

            <md-table-head><h3>Unit Price</h3></md-table-head>
            <md-table-head><h3>Offer Price</h3> </md-table-head>
            <md-table-head><h3>Status</h3></md-table-head>
            <md-table-head
              ><h3>
                Action
              </h3></md-table-head
            >
          </md-table-row>

          <md-table-row>
            <md-table-cell md-numeric>1</md-table-cell>
            <md-table-cell class="table_padding">
              <img
                src="https://cdn-incname.hihonor.com/pms/pages/frontCategory/k1L4NHiadXMtn7ZBCIwa.jpg"
              />
            </md-table-cell>

            <md-table-cell class="table_padding">Grocery</md-table-cell>
            <md-table-cell class="table_padding">Suhana</md-table-cell>
            <md-table-cell class="table_padding">200g</md-table-cell>
            <md-table-cell class="table_padding">AED 70</md-table-cell>
            <md-table-cell class="table_padding">1</md-table-cell>

            <md-table-cell class="table_padding">AED 70</md-table-cell>
            <md-table-cell class="table_padding"> 30% / N/A</md-table-cell>
            <md-table-cell class="table_padding">
              <span class="label_green">Active</span>
            </md-table-cell>
            <md-table-cell class="display_flex">
              <i class="material-icons action_icon mr-3">edit</i>
              <i class="material-icons action_icon">delete</i>
            </md-table-cell>
          </md-table-row>

          <md-table-row>
            <md-table-cell md-numeric>1</md-table-cell>
            <md-table-cell class="table_padding">
              <img
                src="https://cdn-incname.hihonor.com/pms/pages/frontCategory/k1L4NHiadXMtn7ZBCIwa.jpg"
              />
            </md-table-cell>

            <md-table-cell class="table_padding">Grocery</md-table-cell>
            <md-table-cell class="table_padding">Suhana</md-table-cell>
            <md-table-cell class="table_padding">200g</md-table-cell>
            <md-table-cell class="table_padding">AED 70</md-table-cell>
            <md-table-cell class="table_padding">1</md-table-cell>

            <md-table-cell class="table_padding">AED 70</md-table-cell>
            <md-table-cell class="table_padding"> 30% / N/A</md-table-cell>
            <md-table-cell class="table_padding">
              <span class="label_red">In Active</span>
            </md-table-cell>
            <md-table-cell class="display_flex">
              <i class="material-icons action_icon mr-3">edit</i>
              <i class="material-icons action_icon">delete</i>
            </md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import tabStore from "../manageStore/tabStore";
export default {
  components: {
    tabStore
  },
  data() {
    return {
      orders: [],
      count: {},
      form: {
        from_date: null,
        to_date: null,
        page: 1,
        status: "Pending",
        order_number: null
      },
      isDateValid: false,
      submitted: false,
      tableLoader: true
    };
  },
  mounted() {
    this.loadPendingOrders();
  },
  methods: {
    async loadPendingOrders() {
      this.tableLoader = true;
      console.log("Loaded");
      const data = this.form;
      const response = await axios.post("vendor/orders", data);
      this.tableLoader = false;
      const {
        result,
        success,
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped
      } = await response.data;
      this.count = {
        total_cancelled,
        total_delivered,
        total_pending,
        total_shipped
      };
      await this.$store.commit("SET_VENDOR_ORDERS_COUNT", this.count);
      this.orders = await result;
    },
    getDate(date) {
      return moment(date).format("MMMD,YYYY");
    },
    getTotalQuantity(index) {
      var quantity = 0;
      this.orders[index].items.forEach(order => {
        return (quantity += parseInt(order.quantity));
      });
      console.log(quantity);
      return parseInt(quantity, 10);
    },
    dateSubmitted(type) {
      this.submitted = true;
      if (this.form.from_date > this.form.to_date) {
        this.isDateValid = false;
        console.log("Invalid");
        return;
      }
      this.loadPendingOrders();
    }
  }
};
</script>

<style scoped>
.pl_mob {
  padding-right: 0px;
}
/* Abhishek */

.no-orders-found {
  padding: 40px 0px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.54);
  float: left;
  width: 100%;
}
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
}
@media screen and (max-width: 600px) {
  .pills {
    margin-right: -15px !important;
  }
  .md-button.md-theme-default.md-raised:not([disabled]) {
    margin-bottom: 7px;
    margin-right: 0px;
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
  background-color: #fff;
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
  width: 58.6%;
}
.box_date button {
  float: left;
  background: #fff;
  margin-right: 0;
  border: solid 1px #c8d2e0;
  padding: 7px 13px;
  border-radius: 6px;
  color: #ff5722;
  margin-left: 8px;
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
  width: 71px;
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
  wrapper_order_table {
    margin-top: 20px;
  }
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
    width: 78px;
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
    width: 79%;
  }
  .wrapper_order_table {
    width: 100%;
  }
  .pl_mob {
    padding-left: 0px;
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
    margin-bottom: 0px;
  }
  .rowmargin_tab {
    margin-left: 0px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {

.box_date input {
    width: 82%;
}
}
@media screen and (max-width: 360px) {
.box_date input {
    width: 78.5%;
  }
}
@media screen and (max-width: 300px) {
.box_date input {
    width: 70%;
  }
}
</style>
