<template>
  <div>
    <div class="edit-profile-wrap">
      <section class="first-sec">
        <div class="section right">
          <div class="title">MOBILE PHONE ACCESSORIES</div>
          <div class="detail">
            Product Name:
            <span>Mobile</span>
          </div>
          <div class="detail">
            Brand:
            <span>Apple</span>
          </div>
          <div class="detail">
            Validity:
            <span>From 19 05 2019 to 1 Dec 2019</span>
          </div>
        </div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Quantity</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Unit/Price</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Unit</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Total</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">ContactPerson</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Contact Number</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 area">
            <md-field>
              <label class="form-label">Product Description</label>
              <md-textarea v-model="textarea"></md-textarea>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 form-sections">
            <div class="head-type small">Method Of Payment:</div>
            <div class="section-type">
              <md-radio v-model="radio" :value="1">Cash</md-radio>
              <md-radio v-model="radio" :value="2">Cheque</md-radio>
              <md-radio v-model="radio" :value="3">LPO</md-radio>
              <md-radio v-model="radio" :value="4">Credit Card</md-radio>
              <md-radio v-model="radio" :value="5">Other</md-radio>
            </div>
          </div>
          <div class="md-layout-item md-size-100 text-left mt-3">
            <div class="head-type">Qutation Available</div>
          </div>

          <div class="md-layout-item md-size-33">
            <md-datepicker v-model="selectedDate">
              <label>From the date</label>
            </md-datepicker>
          </div>
          <div class="md-layout-item md-size-33">
            <md-datepicker v-model="selectedDate">
              <label>To the date</label>
            </md-datepicker>
          </div>
          <div class="md-layout-item md-size-100 area">
            <md-field>
              <label class="form-label">Note</label>
              <md-textarea v-model="textarea"></md-textarea>
            </md-field>
          </div>

          <div class="md-layout-item md-size-100 text-left">
            <md-button class="md-raised md-accent mr-2">Send Qutation</md-button>
            <md-button class="md-button md-raised md-theme-default">Cancel</md-button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: false,
      single: null,
      multiple: null
    };
  }
};
</script>
<style scoped>
section {
  margin-bottom: 1.5em;
}
section .head {
  font-size: 14px;
  font-weight: 600;
  text-align: left;
}
.text-left {
  text-align: left;
}
.form-sections {
  display: flex;
  align-items: center;
}
.head-type {
  font-size: 14px;
  font-weight: 500;
  margin-right: 0.88em;
}
.head-type.small {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  font-weight: 400;
  letter-spacing: 0.01em;
}
.md-button {
  height: 41px;
}
.right .title {
  font-size: 13px;
  font-weight: 500;
  background: #ccc;
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 1em;
  float: left;
}
.right .detail {
  font-size: 13px;
  color: #888;
  margin-top: 0.3em;
  text-align: left;
  width: 100%;
  float: left;
}
.right .detail span{
	color: #333;
	font-weight: 500;
}
</style>