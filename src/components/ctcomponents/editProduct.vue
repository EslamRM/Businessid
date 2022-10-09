<template>
  <div class="edit-product-wrap">
    <div class="adding-box-1-cnt">
      <div class="frm-hdr-1 txt-algn-lft">
        <i class="material-icons frm-hdr-1-icn md-accent">create</i>
        <div class="frm-hdr-1-txt">Edit Product</div>
      </div>
      <div class="frm-cntnt-bx">
        <div class="md-layout md-gutter md-alignment-center">
          <div class="md-layout-item md-size-50">
            <md-field>
              <label class="form-label">Enter Product Name</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-50">
            <md-field>
              <label for="movie">Categories</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="A4 Papers">A4 Papers</md-option>
                <md-option value="Abdominal Survey Equipments"
                  >Abdominal Survey Equipments</md-option
                >
                <md-option value="Abrasive Tools">Abrasive Tools</md-option>
                <md-option value="Abrasives">Abrasives</md-option>
                <md-option value="Abrators">Abrators</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-50">
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
          </div>
          <div class="md-layout-item md-size-50">
            <md-field>
              <label class="form-label">Enter Brand Name</label>
              <md-input v-model="brandname" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-100 md-layout">
            <div class="md-layout-item pd-r-20">
              <md-field>
                <label class="form-label">Enter Number Of Quantity</label>
                <md-input v-model="numberOfQuantity" required></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="md-layout-item pd-r-20">
              <md-field>
                <label class="form-label">Enter Unit Price</label>
                <md-input v-model="UnitPrice" required></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="md-layout-item">
              <md-field>
                <label for="movie">Select Unit</label>
                <md-select
                  v-model="selectUnit"
                  name="selectUnit"
                  id="selectUnit"
                >
                  <md-option value="feet">feet</md-option>
                  <md-option value="cm">cm</md-option>
                  <md-option value="mm">mm</md-option>
                  <md-option value="square feet">Square feet</md-option>
                </md-select>
              </md-field>
            </div>
          </div>
          <div class="md-layout-item md-size-100 md-layout">
            <div class="md-layout-item md-size-25">
              <md-field>
                <label class="form-label">Minimum Order (Optional)</label>
                <md-input v-model="minimumOrder"></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-25 pd-l-10">
              <md-field>
                <label class="form-label">Enter Delivery Cost</label>
                <md-input v-model="deliveryCost" required></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-25 pd-l-10">
              <md-field>
                <label class="form-label">Enter VAT Perc</label>
                <md-input v-model="TaxCost" required></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div
              class="md-layout-item pos-rel date-picker-bx md-size-25 pd-l-10"
            >
              <md-datepicker v-model="selectedDate">
                <label>Validity Till</label>
              </md-datepicker>
            </div>
          </div>

          <div class="md-layout-item md-size-100">
            <div class="add-meadia-bx">
              <div class="uploader-box">
                <vue-dropzone
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                ></vue-dropzone>
              </div>
            </div>
          </div>
          <div class="md-layout-item md-size-100">
            <div class="editr-bx-tp-1">
              <vue-editor v-model="content"></vue-editor>
            </div>
          </div>
          <div class="md-layout-item md-size-100">
            <div class="btn-wrp-1">
              <router-link to="/vendor/manageStore">
                <md-button class="md-raised">Cancel</md-button>
              </router-link>
              <router-link to="/vendor/manageStore">
                <md-button class="md-raised md-accent">Save</md-button>
              </router-link>
            </div>
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
      productName: null,
      categories: null,
      tags: [],
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
</style>
