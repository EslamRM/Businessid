<template>
  <div>
    <div class="countryTable">
      <div class="title">United Arab Emirates</div>

      <div class="ctTable">
        <div class="ctTableContent">
          <table>
            <thead class="ctTable-body">
              <tr class="ctTable-row">
                <th class="ctTable-head">
                  <div class="ctTable-head-container">
                    <div class="ctTable-head-label">City</div>
                  </div>
                </th>
                <th class="ctTable-head">
                  <div class="ctTable-head-container">
                    <div class="ctTable-head-label">Amount</div>
                  </div>
                </th>
                <th class="ctTable-head">
                  <div class="ctTable-head-container">
                    <div class="ctTable-head-label">Delvery Time</div>
                  </div>
                </th>
                <th class="ctTable-head">
                  <div class="ctTable-head-container">
                    <div class="ctTable-head-label">Method of Delivery</div>
                  </div>
                </th>
                <th class="ctTable-head">
                  <div class="ctTable-head-container">
                    <div class="ctTable-head-label">Payment Method</div>
                  </div>
                </th>
                <th class="ctTable-head">
                  <div class="ctTable-head-container">
                    <div class="ctTable-head-label">Action</div>
                  </div>
                </th>
              </tr>
            </thead>

            <shippingCityRow />

            <tr class="ctTable-row newOne" v-if="showCityRow">
              <td class="ctTable-cell">
                <div class="ctTable-cell-container forForm">
                  <div class="show-bx-1 ctSelect">
                    <select>
                      <option value="">Dubai</option>
                      <option value="">Abu dhabi</option>
                    </select>
                  </div>
                </div>
              </td>
              <td class="ctTable-cell">
                <div class="ctTable-cell-container forForm">
                  <input
                    type="text"
                    placeholder="Amount"
                    class="c-formInput c-form-placeholder forAmount"
                  />
                </div>
              </td>
              <td class="ctTable-cell">
                <div class="ctTable-cell-container forForm">
                  <div class="show-bx-1 ctSelectDoubled">
                    <div class="breakk left">
                      <select>
                        <option value="">1</option>
                        <option value="">2</option>
                        <option value="">3</option>
                        <option value="">4</option>
                        <option value="">5</option>
                      </select>
                    </div>
                    <div class="breakk right">
                      <select v-model="hour">
                        <option value="Hour">Hour</option>
                        <option value="Day">Day</option>
                        <option value="Month">Month</option>
                        <option value="Year">Year</option>
                      </select>
                    </div>
                  </div>
                </div>
              </td>
              <td class="ctTable-cell">
                <div class="ctTable-cell-container formultiSelect">
                  <md-field class="smallSelect">
                    <label for="methodDelivery">Choose Method</label>
                    <md-select
                      v-model="methodDelivery"
                      name="methodDelivery"
                      multiple
                    >
                      <md-option value="Self">Self</md-option>
                      <md-option value="Third Party">Third Party</md-option>
                    </md-select>
                  </md-field>
                </div>
              </td>
              <td class="ctTable-cell">
                <div class="ctTable-cell-container formultiSelect">
                  <md-field class="smallSelect">
                    <label for="methodPayment">Choose Method</label>
                    <md-select
                      v-model="methodPayment"
                      name="methodPayment"
                      multiple
                    >
                      <md-option value="Credit Card">Credit Card</md-option>
                      <md-option value="Cash On Delivery"
                        >Cash On Delivery
                      </md-option>
                      <md-option value="Pay Pal">Pay Pal </md-option>
                    </md-select>
                  </md-field>
                </div>
              </td>
              <td class="ctTable-cell">
                <div class="ctTable-cell-container">
                  <div class="actionWrap">
                    <button
                      type="button"
                      class="md-button md-theme-default actionBtn forCity"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      class="md-button md-theme-default actionBtn forCity"
                      @click="removeCityRow"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </table>

          <div class="d-flex addMore justify-content-center">
            <button
              type="button"
              class="md-button md-theme-default actionBtn"
              @click="addCityRow"
            >
              <i class="material-icons">add</i>Add new city
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import shippingCityRow from "./shippingCityRow";
export default {
  components: { shippingCityRow },
  data () {
    return {
      hour: "",
      showCityRow: false,
      methodDelivery: [],
      methodPayment: []
    };
  },
  methods: {
    addCityRow () {
      this.showCityRow = true;
    },
    removeCityRow () {
      this.showCityRow = false;
    }
  }
};
</script>
<style scoped>
.actionWrap {
  display: flex;
}
.actionWrap .actionBtn {
  height: 26px;
  min-width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: rgb(223, 227, 233);
  margin-right: 0.55em;
}
.actionWrap .actionBtn span {
  font-size: 17px;
  color: rgb(33, 58, 99, 0.75);
}
.countryTable {
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}
.countryTable .title {
  font-size: 1.11em;
  font-weight: 600;
  padding: 15px;
}
.addMore button {
  height: 31px;
  background-color: rgb(223, 227, 233);
  margin-bottom: 1.1em;
  color: #213a63;
  display: flex;
  align-items: center;
  font-size: 12px;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
}
.addMore button i {
  font-size: 20px;
  color: #213a63;
}
.actionWrap {
  display: flex;
}
.actionWrap .actionBtn {
  height: 26px;
  min-width: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  background-color: rgb(223, 227, 233);
  margin-right: 0.55em;
}
.actionWrap .actionBtn span {
  font-size: 17px;
  color: rgb(33, 58, 99, 0.75);
}
.actionBtn.forCity i {
  font-size: 17px;
}
.forForm label {
  color: rgba(0, 0, 0, 0.75);
  font-size: 12px;
  margin-bottom: 3px;
  display: block;
}
.forForm .ctSelect {
  width: 100%;
  min-width: 135px;
}
.forForm .ctSelectDoubled {
  min-width: 95px;
  width: 100%;
}
.forAmount {
  width: 69px;
  height: 29px;
}
.ctSelectDoubled {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.breakk.right {
  right: 15px;
}
.ctSelectDoubled .breakk.right {
  width: 50%;
}
.ctSelectDoubled .breakk.left {
  width: 21%;
}
.ctTable-row.newOne {
  background-color: rgb(247, 249, 254);
}
.actionBtn.forCity {
  min-width: 59px;
  color: rgb(33, 58, 99, 1);
  font-size: 12px;
}
.formultiSelect {
  padding-right: 9px;
}
.smallSelect {
  margin: 0px 0 3px;
}
</style>
