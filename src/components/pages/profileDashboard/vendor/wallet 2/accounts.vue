<template>
  <div>
    <tabWallets />
    <div
      class="col-sm-7 col-md-12 col-xl-12 fl wrapper_order_table pr_mob_order"
      v-for="(acc, index) in accounts"
      :key="index"
    >
      <h1>{{ acc.name }}</h1>

      <button
        v-if="index == 0"
        type="button"
        @click="showDialog = true"
        class="md-button md-primary button_Add_Money md-theme-default"
      >
        <div class="md-ripple">
          <div class="md-button-content">Add Card</div>
        </div>
      </button>
      <div v-if="index == 0 && accounts[0].cards.length">
        <div
          class="col-sm-12 fl box_order_table padding_box"
          v-for="(card, index) in accounts[0].cards"
          :key="index"
        >
          <Card
            :card="card"
            v-on:emitCardEdit="handleUpdate"
            :type="'card'"
            v-on:emitLoadAccount="refresh"
          />
        </div>
      </div>

      <md-dialog :md-active.sync="showDialog" class="modal_credit">
        <md-dialog-title class="title_modal_card">Add new card</md-dialog-title>

        <md-button class="md-primary close_btn" @click="showDialog = false">
          <i class="material-icons"> close </i>
        </md-button>

        <VCreditCard @change="creditInfoChanged" />

        <div class="col-sm-12 fl box_billing">
          <md-checkbox
            :disabled="checkDisable(accounts)"
            v-model="card_form.default"
            >Make this as my default payment method</md-checkbox
          >

          <button
            class="btn_save col-sm-12 p-0 fl"
            @click="saveCard(accounts[0].id)"
          >
            <i data-v-6cd0dfee="" class="material-icons"> lock </i>
            <span>Save Card</span>
          </button>
        </div>
      </md-dialog>
      <button
        type="button"
        v-if="index == 1"
        @click="showDialog2 = true"
        class="md-button md-primary button_Add_Money md-theme-default"
      >
        <div class="md-ripple">
          <div class="md-button-content">Add Bank</div>
        </div>
      </button>
      <div v-if="index == 1 && accounts[1].banks.length">
        <div
          class="col-sm-12 fl box_order_table padding_box"
          v-for="(bank, index) in accounts[1].banks"
          :key="index"
        >
          <Card
            :countries="countries"
            :card="bank"
            :type="'bank'"
            v-on:emitLoadAccount="refresh"
          />
        </div>
      </div>

      <md-dialog
        :md-active.sync="showDialog2"
        class="modal_credit width_credit"
      >
        <md-dialog-title class="title_modal_card mob_card_pl"
          >Add new bank account</md-dialog-title
        >

        <md-button class="md-primary close_btn" @click="showDialog2 = false">
          <i class="material-icons"> close </i>
        </md-button>

        <div class="col-sm-12 wrapper_inputbox pb-4 fl">
          <div class="col-sm-12 p-0 fl inputbox mt_inputbox">
            <span>Account Type</span>
            <v-select
              v-model="bank_form.account_type"
              :options="['Savings', 'Current']"
              placeholder="Account Type"
              class="account_type"
            ></v-select>
            <div
              v-if="submitted && $v.bank_form.account_type.$error"
              class="invalid-feedback"
            >
              <span v-if="!$v.bank_form.account_type.required"
                >Last name is required</span
              >
            </div>
          </div>

          <div class="col-sm-12 p-0 fl inputbox">
            <md-field class="mb-0">
              <label>IBAN Number</label>
              <md-input v-model="bank_form.iban_number"></md-input>
            </md-field>
          </div>

          <div class="col-sm-12 p-0 fl inputbox">
            <md-field class="mb-0">
              <label>Beneficiary Name</label>
              <md-input v-model="bank_form.beneficiary_name"></md-input>
            </md-field>
          </div>

          <div class="col-sm-12 p-0 fl inputbox mt_inputbox">
            <span>Country</span>
            <v-select
              v-model="bank_form.country"
              :options="countries"
              placeholder="Country"
              class="account_type"
            ></v-select>
          </div>

          <div class="col-sm-12 p-0 fl inputbox">
            <vue-tel-input
              class="card_mob"
              v-model="bank_form.mobile"
            ></vue-tel-input>
          </div>
        </div>

        <div class="col-sm-12 fl box_billing">
          <md-checkbox
            :disabled="checkDisable(accounts)"
            v-model="bank_form.default"
            >Make this as my default payment method</md-checkbox
          >

          <button
            class="btn_save col-sm-12 p-0 fl mt-5"
            @click="saveBank(accounts[1].id)"
          >
            <i class="material-icons"> lock </i>
            <span>Save Bank Account</span>
          </button>
        </div>
      </md-dialog>
      <button
        type="button"
        v-if="index == 2"
        @click="showDialog3 = true"
        class="md-button md-primary button_Add_Money md-theme-default"
      >
        <div class="md-ripple">
          <div class="md-button-content">Add Paypal</div>
        </div>
      </button>
      <div v-if="index == 2 && accounts[2].paypals.length">
        <div
          class="col-sm-12 fl box_order_table padding_box"
          v-for="(paypal, index) in accounts[2].paypals"
          :key="index"
        >
          <Card
            :card="paypal"
            :type="'paypal'"
            v-on:emitLoadAccount="refresh"
          />
        </div>
      </div>

      <md-dialog
        :md-active.sync="showDialog3"
        class="modal_credit width_credit"
      >
        <md-dialog-title class="title_modal_card mob_card_pl"
          >Add new paypal account</md-dialog-title
        >

        <md-button class="md-primary close_btn" @click="showDialog3 = false">
          <i class="material-icons"> close </i>
        </md-button>

        <div class="col-sm-12 wrapper_inputbox pb-4 fl">
          <div class="col-sm-12 p-0 fl inputbox">
            <md-field class="mb-0">
              <label>Paypay Email</label>
              <md-input v-model="paypal.email"></md-input>
            </md-field>
            <div class="mt-2">
              Dont have a paypal account?
              <a
                target="_blank"
                class="create_account_link"
                href="https://www.paypal.com/ae/webapps/mpp/account-selection"
              >
                create account</a
              >
            </div>
          </div>
        </div>

        <div class="col-sm-12 fl box_billing">
          <md-checkbox
            :disabled="checkDisable(accounts)"
            v-model="paypal.default"
            >Make this as my default payment method</md-checkbox
          >

          <button
            disabled="true"
            class="btn_save btn btn-primary col-sm-12 p-0 fl mt-5"
            @click="savePaypal(accounts[2].id)"
          >
            <i class="material-icons"> lock </i>
            <span>Save paypal account</span>
          </button>
        </div>
      </md-dialog>
    </div>
  </div>
</template>
<script>
import {
  required,
  maxLength,
  minLength,
  maxValue,
  numeric
} from "vuelidate/lib/validators";
import tabWallets from "../wallet/tabWallets";
import VCreditCard from "v-credit-card";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { validationMixin } from "vuelidate";

import "v-credit-card/dist/VCreditCard.css";
import axios from "axios";
import Card from "./components/card";
import moment from "moment";
export default {
  name: "DialogCustom",
  name: "RegularCheckboxes",
  mixins: [validationMixin],

  data: () => ({
    card_form: {
      default: true,
      action_type: "",
      type_id: "",
      card_name: "",
      card_number: "",
      mm: "",
      yy: "",
      cvc: ""
    },
    bank_form: {
      account_type: "",
      action_type: "",
      type_id: "",

      iban_number: "",
      beneficiary_name: "",
      country: "",
      mobile: "",
      default: true
    },
    paypal: {
      email: "",
      default: true,
      action_type: "add"
    },
    showDialog: false,
    countries: [],
    submitted: false,

    showDialog2: false,
    showDialog3: false,
    showEditOption: false,
    accounts: []
  }),
  validations: {
    bank_form: {
      account_type: {
        required
      },
      iban_number: {
        required
      },
      beneficiary_name: {
        required
      },
      country: {
        required
      },
      mobile: {
        required
      }
    }
  },

  components: {
    Card,
    tabWallets,
    VCreditCard,
    vSelect
  },
  computed: {
    getDate() {
      return date => moment(date).format("MMMM D, YYYY");
    }
  },
  methods: {
    checkDisable(accounts) {
      console.log(accounts);
      if (
        accounts[0].cards.length ||
        accounts[1].banks.length ||
        accounts[2].paypals.length
      ) {
        return false;
      } else {
        return true;
      }
      //return accounts => if();
    },
    checkValidation(field) {
      return this.submitted && !this.$v.form[field].required;
    },
    handleUpdate() {
      console.log("ffff");
      this.showDialog = true;
    },
    refresh() {
      this.loadAccounts();
    },
    toggleEditOption() {
      this.showEditOption = !this.showEditOption;
    },
    creditInfoChanged(values) {
      for (const key in values) {
        if (key == "name") {
          this.card_form.card_name = values[key];
        } else if (key == "cardNumber") {
          this.card_form.card_number = values[key];
        } else if (key == "expiration") {
          const date = values[key].split("/");

          this.card_form.mm = date[0];
          this.card_form.yy = date[1];
        } else if (key == "security") {
          this.card_form.cvc = values[key];
        }

        console.log(key + " " + values[key]);
        // this.card_form[key] = values[key];
      }
    },
    async savePaypal(id) {
      this.paypal.type_id = id;
      this.paypal.action_type = "add";
      const response = await axios.post(
        "account/payment/add-paypal",
        this.paypal
      );
      const { success } = await response.data;
      if (success) {
        this.loadAccounts();
        this.showDialog3 = false;
        this.$swal({
          position: "center",
          icon: "success",
          title: "Saved succesfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.showDialog3 = false;
        this.$swal({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    },
    async saveCard(id) {
      this.card_form.type_id = id;
      this.card_form.action_type = "add";
      const response = await axios.post(
        "account/payment/add-card",
        this.card_form
      );
      const { success } = await response.data;
      if (success) {
        this.loadAccounts();
        this.showDialog = false;
        this.$swal({
          position: "center",
          icon: "success",
          title: "Saved succesfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.showDialog = false;
        this.$swal({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(id);
    },

    //save bank
    async saveBank(id) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.bank_form.type_id = id;
      this.bank_form.action_type = "add";
      const response = await axios.post(
        "account/payment/add-bank",
        this.bank_form
      );
      const { success } = await response.data;
      if (success) {
        this.loadAccounts();
        this.showDialog2 = false;
        this.$swal({
          position: "center",
          icon: "success",
          title: "Saved succesfully",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.showDialog2 = false;
        this.$swal({
          position: "center",
          icon: "error",
          title: "Something went wrong!!",
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.log(id);
    },

    async loadAccounts() {
      const response = await axios.post("account/payment/accounts");
      const { result, success } = await response.data;
      if (success) {
        this.accounts = result;
      }
    },
    loadCountry() {
      this.$store.dispatch("GET_COUNTRY").then(response => {
        response.data.result.forEach(country => {
          this.countries.push(country.name);
        });
      });
    }
  },
  created() {
    //get account
    this.loadAccounts();
    this.loadCountry();
  }
};
</script>

<style scoped>
.create_account_link {
  text-decoration: underline !important;
  color: #0660af !important;
}
.dropdown-menu.switching {
  left: auto;
  right: 0px;
  width: 130px;
  height: 109px;
  vertical-align: top;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.04) 0px 0px 9px 0px;
  padding: 14px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(226, 229, 241);
  top: 107%;
  padding: 0;
  position: absolute;
  z-index: 1;
  background: #fff;
}
.dropdown-menu.switching::before {
  border-color: transparent;
  border-bottom-color: #fff;
  border-style: dashed dashed solid;
  border-width: 0 8.5px 8.5px;
  position: absolute;
  right: 4.5px;
  top: -7.9px;
  z-index: 11;
  height: 0;
  width: 0;
  content: "";
}
.dropdown-menu.switching::after {
  border-color: transparent;
  border-style: dashed dashed solid;
  border-width: 0 8.5px 8.5px;
  position: absolute;
  right: 4.5px;
  z-index: 1;
  height: 0;
  width: 0;
  border-bottom-color: rgb(226, 229, 241);
  top: -9px;
  content: "";
}
.text-uppercase {
  text-transform: uppercase;
}
.card_name,
.text-capitalize {
  text-transform: uppercase;
}

.date {
  background-color: #f5f5f5;
  padding: 5px;
  font-weight: 600;
  border-radius: 3px;
}
.inputbox span {
  font-size: 13px;
  color: #707070;
  margin-top: 10px;
  float: left;
  width: 100%;
}
.inputbox label {
  font-size: 13px;
  color: #707070;
}

.account_type {
  float: left;
  width: 100%;
  margin-top: 4px;
}

.card_mob {
  margin-top: 24px;
}
.mt_inputbox {
  margin-top: 20px;
}
.wrapper_inputbox {
  padding: 0px 20px;
}
.box_billing {
  padding-left: 20px;
  padding-right: 20px;
}
.box_billing h2 {
  color: #535559;
  font-size: 13px;
  font-weight: 400;
  margin-top: 10px;
  line-height: 16px;
}

.btn_save span {
  margin-top: 3px;
}

.btn_save i {
  font-size: 16px;
  float: left;
  margin-right: 2px;
}
.btn_save {
  border: none;
  background-color: #ff5821;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 6px;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.btn_save:hover {
  background-color: #ff5722;
  color: #fff;
}

.modal_credit {
  width: 497px;
  margin: auto;
  z-index: 99999;
}
.md-dialog-container {
  max-height: 100% !important;
}

.vue-credit-card .card-form-and-image .credit-card-form .field input {
  padding: 10px !important;
  font-size: 13px !important;
}

.title_billing {
  color: #535559;
  font-size: 13px;
  font-weight: 600;

  padding-top: 0px;
}

.title_modal_card {
  color: #535559;
  font-size: 16px;
  font-weight: 400;
  padding-left: 20px;
  padding-top: 13px;
}

.close_btn {
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 12px;
  background-color: #c7ced8;
  border-radius: 50px;
  padding: 3px;
  height: 25px;
  width: 25px;
  min-width: 2px;
}
.close_btn i {
  font-size: 16px;
  color: #213a63;
  display: flex;
}

.md-dialog .md-dialog-container {
  max-width: 28px;
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

.wrapper_order_table h1 {
  color: #535559;
  font-size: 18px;
  font-weight: 400;
  margin-top: 0px;
  line-height: 17px;
  width: fit-content;
  float: left;
}

.button_Add_Money {
  letter-spacing: 1px;
  background-color: #ff5722;
  height: fit-content;
  float: right;
  width: fit-content;
  color: #fff !important;
  padding: 10px 5px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);

  font-size: 11px;
  border-radius: 4px;
  margin: 0px;
}

.box_order_table {
  -webkit-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  background-color: #fff;
  border-radius: 6px;
  border: solid 1px #f6f6f6;
  text-align: left;
  margin-top: 18px;

  padding: 12px;
  padding-left: 14px;
  padding-right: 14px;
}

.box_order_table h2 {
  color: #4c98d1;
  font-size: 16px;
  margin-bottom: 8px;
  width: fit-content;
  float: left;
  margin-right: 10px;
}

.box_order_table h4 {
  color: #535559;
  font-size: 14px;
}

.label_default {
  background: #64dd17;
  color: #fff;
  padding: 5px 3px;
  border-radius: 3px;
  cursor: pointer;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  float: left;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  padding-bottom: 4px;
}

.text_expires {
  color: #878787;
  font-size: 12px;
  font-weight: 500;
}

.btn_more {
  float: right;
  cursor: pointer;
  color: #878787;
}
.icon_bank {
  float: left;
  color: #878787;
  font-size: 20px;
  margin-right: 4px;
  height: 35px;
}

@media screen and (max-width: 768px) {
.wrapper_order_table {
margin-bottom: 10px;
    width: 608px;
}

  .wrapper_order_table h1 {
    font-size: 14px;
  }
  .box_order_table h2 {
    color: #4c98d1;
    font-size: 14px;
  }

  .label_default {
    padding: 4px 8px;
    padding-bottom: 3px;
    font-size: 10px;
  }

  .text_expires {
    font-size: 11px;
  }

  .button_Add_Money {
    font-size: 9px;
  }

  .close_btn {
    right: 11px;
    top: 7px;
  }
  .title_modal_card {
    font-size: 14px;
    padding-top: 12px;
  }

  .modal_credit .md-overlay.md-fixed,
  body > .md-overlay {
    z-index: 9999 !important;
  }

  .md-dialog {
    z-index: 99999;
  }
}

@media screen and (max-width: 600px) {
  .inputbox span {
    font-size: 12px;
  }

  .wrapper_inputbox {
    padding: 0px 10px;
  }
  .inputbox label {
    font-size: 12px;
  }

  ::placeholder {
    font-size: 10px;
  }

  .icon_bank {
    font-size: 22px;
  }

  .button_Add_Money {
    padding: 6px 8px;
    margin: 0px 0px 0px 0px;
  }
  .box_order_table {
    margin-top: 10px;
  }

  .md-button-content {
    font-size: 9px;
  }

  .wrapper_order_table {
    padding: 10px;
    padding-right: 10px;
    width: 100%;
  }

  .box_order_table {
    padding: 10px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .btn_more {
    margin-top: -26px;
    margin-right: -2px;
    font-size: 20px;
  }

  .box_order_table h2 {
    font-size: 11px;
    margin-right: 3px;
  }

  .label_default {
    padding-bottom: 2px;
    font-size: 8px;
  }

  .text_expires {
    font-size: 10px;
  }

  .wrapper_order_table h1 {
    font-size: 11px;
  }

  .modal_credit {
    width: 100%;
  }

  .close_btn {
    right: 2px;
  }

  .title_modal_card {
    font-size: 13px;
    padding-top: 10px;
    padding-left: 10px;
  }
  .mob_card_pl {
    padding-left: 10px !important;
  }
  .box_billing {
    padding-left: 10px;
    padding-right: 10px;
  }

  .btn_save i {
    font-size: 14px;

    margin-right: 2px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 12px;
  }
  .width_mob_card {
    width: 80%;
  }
  .text_expires {
    width: 80%;
  }
  .btn_more_two {
    margin-top: -7px;
  }
}

@media screen and (max-width: 420px) and (min-width: 400px) {
  .box_billing {
    padding-left: 17px;
    padding-right: 17px;
  }
  .title_modal_card {
    padding-left: 17px;
  }

  .close_btn {
    right: 7px;
  }
}

@media screen and (max-width: 300px) {
  .icon_bank {
    font-size: 20px;
  }
  .box_order_table h2 {
    font-size: 9px;
  }

  .text_expires {
    font-size: 8px;
  }

  .label_default {
    padding: 3px 6px;
    font-size: 6px;
    padding-bottom: 2px;
  }

  .md-button-content {
    font-size: 8px;
  }
  .wrapper_order_table h1 {
    font-size: 9px;
    margin-bottom: 5px;
  }

  .title_modal_card {
    font-size: 12px;
    padding-top: 10px;
  }

  .btn_save {
    height: 35px;
  }
  .btn_save span {
    margin-top: 3px;
    font-size: 11px;
  }

  .width_mob_card {
    width: 80%;
  }

  .icon_bank {
    font-size: 15px;
    height: 20px;
  }
  .box_order_table {
    padding: 8px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .btn_more_two {
    margin-top: -9px;
  }
}
</style>
