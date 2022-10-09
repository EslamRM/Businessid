import axios from "axios";
export default {
  data: () => ({
    currencies: [],
    citiesList: [],
    citiesStatus: "Select City",
    areasList: [],
    areaStatus: "Select Area"
  }),
  created() {
    this.postRequest("api_country", {}, "currencies");
  },
  methods: {
    /* Add these Fileds in Daata()
  currencies : [],
  citiesList : [],
  citiesStatus: "",
  form : {
      country: "",
      city: "",
  }
  */
    async postRequest(url, data, property) {
      try {
        const response = await axios.post(url, data);
        const result = await response.data.result;
        this[property] = await result;
      } catch (error) {
        console.log(error);
      }
    },
    // Clear Form
    clearForm(doNotClear) {
      if (!doNotClear) doNotClear = [];
      for (const [key, value] of Object.entries(this.form)) {
        if (Array.isArray(value)) {
          this.form[key] = [];
          continue;
        }
        if (doNotClear.includes(key)) {
          continue;
        } else {
          this.form[key] = "";
        }
      }
    },
    getCountryId() {
      return this.$helpers.selectObjectFromArray(
        this.currencies,
        "name",
        this.form.country || this.form.location_country
      );
    },
    async countrySelected() {
      try {
        this.citiesList = [];
        this.form.city = "";
        this.citiesStatus = "Loading...";
        const parentid = await this.getCountryId();
        const rawResponse = await axios.post("api_country", {
          parentid: `${parentid.pk_countries_id}`
        });
        const response = await rawResponse.data;
        if (response.success) {
          this.citiesList = response.result;
          this.citiesStatus = "Select City";
        } else {
          this.citiesList = [];
          this.citiesStatus = "No Cities Found";
        }
      } catch (error) {
        console.log(error);
      }
    },
    getCityId() {
      return this.$helpers.selectObjectFromArray(
        this.citiesList,
        "location",
        this.form.location_city || this.form.city
      );
    },
    async citySelected() {
      try {
        this.areasList = [];
        this.form.location_area = "";
        this.areaStatus = "Loading...";
        const parentid = await this.getCityId();

        //Get the code of the Selected City.
        //used in ChangeAddress.vue
        this.form.postal_code = parentid.code;

        const rawResponse = await axios.post("api_country", {
          parentid: `${parentid.pk_countries_id}`
        });
        const response = await rawResponse.data;
        if (response.success) {
          this.areasList = response.result;
          this.areaStatus = "Select Area";
        } else {
          this.areasList = [];
          this.areaStatus = "No Areas Found";
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
