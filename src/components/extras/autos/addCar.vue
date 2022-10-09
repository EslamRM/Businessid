<template>
  <div class="edit-product-wrap">
    <div class="adding-box-1-cnt">
      <div class="frm-hdr-1 txt-algn-lft">
        <div class="frm-hdr-1-txt">Adding Car</div>
      </div>
      <div class="frm-cntnt-bx">
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">What is the model of your car</label>
              <md-input v-model="productName" required></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Title</label>
              <md-input v-model="productName"></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Price</label>
              <md-input v-model="productName"></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">Kilometers</label>
              <md-input v-model="productName"></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Body Condition</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="A4 Papers">Perfect inside and out</md-option>
                <md-option value="Abdominal Survey Equipments">Abdominal Survey Equipments</md-option>
                <md-option value="Abdominal Survey Equipments">No accidents, very few faults</md-option>
                <md-option value="Abdominal Survey Equipments">A bit of wear & tear, all repaired</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Mechanical condition</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Perfect inside and out">Perfect inside and out</md-option>
                <md-option value="Abdominal Survey Equipments">Abdominal Survey Equipments</md-option>
                <md-option value="Abdominal Survey Equipments">No accidents, very few faults</md-option>
                <md-option value="Abdominal Survey Equipments">A bit of wear & tear, all repaired</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Trim</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Ambition">Ambition</md-option>
                <md-option value="Attraction">Attraction</md-option>
                <md-option value>No accidents, very few faults</md-option>
                <md-option value>A bit of wear & tear, all repaired</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Year</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="2020">2020</md-option>
                <md-option value="2019">2019</md-option>
                <md-option value="2018">2018</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label class="form-label">VIN number (optional)</label>
              <md-input v-model="productName"></md-input>
              <span class="md-error">There is an error</span>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Body type</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Coupe">Coupe</md-option>
                <md-option value="Crossover">Crossover</md-option>
                <md-option value="Hard Top Convertible">Hard Top Convertible</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Color</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Black">Black</md-option>
                <md-option value="Blue">Blue</md-option>
                <md-option value="Brown">Brown</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Transmission Type</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Manual Transmission">Manual Transmission</md-option>
                <md-option value="Automatic Transmission">Automatic Transmission</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Regional Specs</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="European Specs">European Specs</md-option>
                <md-option value="GCC Specs">GCC Specs</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">No. of Cylinders</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="4">4</md-option>
                <md-option value="3">3</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Doors</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="2 door">2 door</md-option>
                <md-option value="4 door">4 door</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Doors</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="2 door">2 door</md-option>
                <md-option value="4 door">4 door</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Horsepower</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Less than 150 HP">Less than 150 HP</md-option>
                <md-option value="150 - 200 HP">150 - 200 HP</md-option>
                <md-option value="300 - 400 HP">300 - 400 HP</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Warranty</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Yes">Yes</md-option>
                <md-option value="No">No</md-option>
                <md-option value="Does not apply">Does not apply</md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-33">
            <md-field>
              <label for="movie">Fuel Type</label>
              <md-select v-model="categories" name="categories" id="categories">
                <md-option value="Gasoline">Gasoline</md-option>
                <md-option value="Diesel">Diesel</md-option>
                <md-option value="Hybrid">Hybrid</md-option>
                <md-option value="Electric">Electric</md-option>
              </md-select>
            </md-field>
          </div>
        </div>

        <div class="keyword-wrap">
          <label class="keywod-head">Suggested features for you</label>
          <md-chips
            class="md-primary"
            v-model="artists"
            md-placeholder="Add features..."
            :md-format="formatName"
          >
            <div class="md-helper-text">Add other features for your add</div>
          </md-chips>
        </div>

        <div class="btn-wrap">
          <router-link to="/">
            <md-button class="md-raised">Back</md-button>
          </router-link>
          <router-link to="/vendor/manageStore">
            <md-button class="md-raised md-accent">Submit</md-button>
          </router-link>
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
      productUpdates: "",
      artists: [
        'Claude Debussy',
        'Jules Massenet',
        'Gabriel Dupont',
        'Emma Bardac',
        'Mary Garden'
      ]
    };
  },

  components: {
    vueDropzone: vue2Dropzone,
    VueEditor
  },
  methods: {

    formatName (str) {
      let words = str.split(' ').filter(str => str !== '')
      // remove accents / diacritics
      words = words.map(str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
      // capitalize
      words = words.map(str => str[0].toUpperCase() + str.slice(1))
      return words.join(' ')
    }
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
.keyword-wrap {
  text-align: left;
  margin-top: 2em;
}
.keywod-head {
  font-size: 15px;
  font-weight: 500;
  margin: 8px 0;
}
.md-chips.md-field {
  padding-bottom: 12px;
}
.btn-wrap {
  width: 100%;
  text-align: center;
}
.btn-wrap .md-button {
  height: 41px;
  margin-top: 1.7em;
  min-width: 125px;
  margin-right: 0.5em;
}
</style>
