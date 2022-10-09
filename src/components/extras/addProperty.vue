<template>
  <div class="edit-product-wrap">
    <div class="adding-box-1-cnt">
      <div class="frm-hdr-1 txt-algn-lft">
        <div class="frm-hdr-1-txt">Adding Property</div>
      </div>
      <div class="frm-cntnt-bx">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Enter Product Name</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33 radio-wrap">
            <label class="custom-lbl">Property Category</label>

            <md-radio v-model="radio" :value="res" class="radio11">Residential</md-radio>
            <md-radio v-model="radio" :value="comm">Commercial</md-radio>
          </div>

          <!-- <div class="md-layout-item md-size-33">
                  <md-field>
                    <label for="movies">Tags</label>
                    <md-select v-model="tags" name="tags" id="tags" multiple>
                      <md-option value="fight-club">Fight Club</md-option>
                      <md-option value="godfather">Godfather</md-option>
                      <md-option value="godfather-ii">Godfather II</md-option>
                      <md-option value="godfather-iii">Godfather III</md-option>
                      <md-option value="godfellas">Godfellas</md-option>
                      <md-option value="pulp-fiction">Pulp Fiction</md-option>
                      <md-option value="scarface">Scarface</md-option>
                    </md-select>
                  </md-field>
          </div>-->

          <div class="md-layout-item md-size-33 radio-wrap">
            <label class="custom-lbl">Property Purpose</label>
            <div>
              <md-radio v-model="radio" :value="sale">Sale</md-radio>
              <md-radio v-model="radio" :value="Rent">Rent</md-radio>
            </div>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Property Type</label>
              <md-select v-model="selectUnit" name="selectUnit" id="selectUnit">
                <md-option value="feet">Apartment</md-option>
                <md-option value="cm">Bulk Sale Units</md-option>
                <md-option value="mm">Bungalow</md-option>
                <md-option value="square feet">Compound</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Bedrooms</label>
              <md-select v-model="selectUnit" name="selectUnit" id="selectUnit">
                <md-option value="feet">feet</md-option>
                <md-option value="cm">cm</md-option>
                <md-option value="mm">mm</md-option>
                <md-option value="square feet">Square feet</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="md-layout-item md-size-33 radio-wrap">
            <label class="custom-lbl">Select Furnished</label>
            <div>
              <md-radio v-model="radio" :value="Yes">Yes</md-radio>
              <md-radio v-model="radio" :value="No">No</md-radio>
            </div>
          </div>

          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Area Size</label>
              <md-input v-model="numberOfQuantity" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>

          <div class="md-layout-item md-size-33 radio-wrap">
            <label class="custom-lbl">Area Unit</label>
            <div>
              <md-radio v-model="radio" :value="SqFt">Sq.Ft</md-radio>
              <md-radio v-model="radio" :value="SqMt">Sq.Mt</md-radio>
            </div>
          </div>

          <div class="md-layout-item md-size-33 d-flex currency">
            <md-field>
              <label for="movie">Currency</label>
              <md-select v-model="currency" name="selectUnit" id="currency">
                <md-option value="feet">AED</md-option>
                <md-option value="cm">BHD</md-option>
                <md-option value="mm">INR</md-option>
              </md-select>
            </md-field>
            <md-field>
              <label class="form-label">Price</label>
              <md-input v-model="numberOfQuantity" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100">
            <md-chips v-model="Amenities" md-placeholder="Add Amenities..."></md-chips>
          </div>

          <div class="md-layout-item md-size-33 d-flex">
            <md-field>
              <label for="movie">Payment Term</label>
              <md-select v-model="selectTerm" name="selectTerm" id="selectTerm">
                <md-option value="Yearly">Yearly</md-option>
                <md-option value="Monthly">Monthly</md-option>
                <md-option value="Weekly">Weekly</md-option>
                <md-option value="Daily">Daily</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Payment Plan</label>
              <md-select v-model="selectPlan" name="selectPlan" id="selectPlan">
                <md-option value="Yearly">Yearly</md-option>
                <md-option value="Half Yearly">Half Yearly</md-option>
                <md-option value="Quarterly">Quarterly</md-option>
                <md-option value="Monthly">Monthly</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Number Of Checks</label>
              <md-select v-model="selectUnit" name="selectPlan" id="selectPlan">
                <md-option value="1">1</md-option>
                <md-option value="2">2</md-option>
                <md-option value="3">3</md-option>
                <md-option value="More">More</md-option>
              </md-select>
            </md-field>
          </div>

          <div class="property-location">
            <div class="title">Property Location</div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label for="food">Country</label>
                  <md-select v-model="country" name="country" id="country">
                    <md-option value="australia">UAE</md-option>
                    <md-option value="brazil">Brazil</md-option>
                    <md-option value="japan">Japan</md-option>
                    <md-option value="united-states">United States</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label for="food">City</label>
                  <md-select v-model="City" name="country" id="country">
                    <md-option value="australia">Dubai</md-option>
                    <md-option value="brazil">Abu Dhabi</md-option>
                    <md-option value="japan">Sharjah</md-option>
                    <md-option value="united-states">Ajman</md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item md-size-33">
                <md-field>
                  <label for="food">Area</label>
                  <md-select v-model="City" name="country" id="country">
                    <md-option value="australia">Dubai</md-option>
                    <md-option value="brazil">Abu Dhabi</md-option>
                    <md-option value="japan">Sharjah</md-option>
                    <md-option value="united-states">Ajman</md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item md-size-33 mrg-t-20 area">
                <md-field>
                  <label>Address</label>
                  <md-textarea v-model="textarea"></md-textarea>
                </md-field>
              </div>

              <div class="md-layout-item md-size-66 mrg-t-20 map">
                <label class="form-label label-color">Map Route (Drag to update map location)</label>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231281.63945897442!2d55.08732131791731!3d25.075593221539574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1563288431346!5m2!1sen!2sae"
                  width="100%"
                  height="400"
                  frameborder="0"
                  style="border:0"
                  allowfullscreen
                ></iframe>
              </div>

              <div class="md-layout-item mrg-t-20 md-size-33">
                <md-field>
                  <label class="form-label">Contact Name</label>
                  <md-input v-model="numberOfQuantity" required></md-input>
                  <span class="md-error">There is an error</span>
                </md-field>
              </div>
              <div class="md-layout-item mrg-t-20 md-size-33">
                <md-field>
                  <label class="form-label">Contact phone number</label>
                  <md-input v-model="numberOfQuantity" required></md-input>
                  <span class="md-error">There is an error</span>
                </md-field>
              </div>

              <div class="md-layout-item pos-rel date-picker-bx md-size-33 mrg-t-20">
                <md-datepicker v-model="selectedDate">
                  <label>Validity Till</label>
                </md-datepicker>
              </div>

              <div class="md-layout-item md-size-70 mrg-0-auto">
                <div class="add-meadia-bx">
                  <div class="uploader-box">
                    <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
                  </div>
                </div>
              </div>

              <div class="md-layout-item md-size-100 mrg-t-20">
                <div class="editr-bx-tp-1">
                  <vue-editor v-model="content"></vue-editor>
                </div>
              </div>
            </div>

            <router-link to="/vendor/manageStore">
              <md-button class="md-raised md-accent">Add Property</md-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { VueEditor } from "vue2-editor";
export default {
  data () {
    return {
      Amenities: ["Gym", "Swimming Pool", ""],
      productName: null,
      categories: null,
      tags: [],
      radio: false,
      brandname: null,
      numberOfQuantity: null,
      UnitPrice: null,
      selectUnit: null,
      minimumOrder: null,
      deliveryCost: null,
      TaxCost: null,
      selectedDate: null,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 125,
        maxFilesize: 110,
        addRemoveLinks: true,
        headers: { "My-Awesome-Header": "header value" },
        dictDefaultMessage:
          "<i class='material-icons'>insert_photo</i>Attach Images For Product"
      },
      content: "Some initial content",
      productUpdates: ""
    };
  },
  components: {
    vueDropzone: vue2Dropzone,
    VueEditor
  }
};
</script>
<style scoped>
.edit-product-wrap {
  padding: 25px;
}
.radio-wrap {
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.radio11 {
  margin: 0;
}
.md-radio-label {
  padding-left: 7px;
}
.custom-lbl {
  color: rgba(0, 0, 0, 0.54);
  opacity: 1;
  font-size: 13px;
  display: inline-block;
}
.frm-hdr-1 {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.frm-hdr-1-icn {
  color: #ff5722 !important;
  margin-right: 5px;
  font-size: 23px;
}
.frm-hdr-1-txt {
  color: #191919;
  font-weight: 500;
  font-size: 17px;
}
.btn-wrp-1 {
  text-align: center;
}
.btn-wrp-1 .md-button {
  height: 39px;
}
.currency .md-field:nth-child(1) {
  width: 40%;
  display: inline-block;
}
.property-location {
  width: 100%;
  display: block;
  margin-top: 1.4em;
}
.property-location .md-layout {
  margin: 0;
}
.property-location .title {
  font-size: 14px;
  font-weight: 500;
  padding-right: 20px;
  padding-left: 20px;
  text-align: left;
}
.label-color {
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
}
.map label {
  text-align: left;
  display: block;
  margin-bottom: 1em;
}
</style>
