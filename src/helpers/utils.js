import axios from "axios";
export default {
  methods: {
    // 1. Validation Check
    checkValidation(field) {
      if (!this.$v.form[field]) {
        console.log(field, "Not in Validatrions");
      }
      return this.submitted && !this.$v.form[field].required;
    },
    checkValidationCustom(obj, field, validation) {
      return this.submitted && !this.$v[obj][field][validation];
    },
    checkValidity(field, obj = "form", validation = "$invalid") {
      return this.submitted && this.$v[obj][field][validation];
    },
    //2. Fetch Url and add response to an Object
    async fetchAndAssign(url, data, property) {
      try {
        const response = await axios.post(url, data);
        const result = await response.data.result;

        if (!property) {
          return response.data;
        }
        this[property] = await result;
        return true;
      } catch (error) {
        console.log(`${error} in ${url}`);
        return false;
      }
    },
    //3. Google Map Address Function
    onClickAddMap(value) {
      console.log(value);
      const data = value.address_components;
      const addressFiltered = data.map(x => {
        return {
          name: x.long_name,
          type: x.types[0]
        };
      });

      addressFiltered.forEach(x => {
        if (x.type == "country") this.form.location_country = x.name;
        else if (x.type == "administrative_area_level_1")
          this.form.location_city = x.name;
      });
      console.log(addressFiltered);
      this.form.latitude = value.geometry.location.lat();
      this.form.longitude = value.geometry.location.lng();

      // if (data.length == 1) {
      // } else if (data.length == 2) {
      //   this.form.location_city = data[0].long_name;
      //   this.form.location_country = data[1].long_name;
      // } else if (data.length == 3) {
      //   this.form.location_area = data[0].long_name;
      //   this.form.location_city = data[1].long_name;
      //   this.form.location_country = data[2].long_name;
      // } else if (data.length == 4) {
      //   this.form.location_area = data[0].long_name;
      //   this.form.location_street = data[1].long_name;
      //   this.form.location_city = data[2].long_name;
      //   this.form.location_country = data[3].long_name;
      // } else if (data.length == 5) {
      //   this.form.location_area = data[0].long_name;
      //   this.form.location_street = data[1].long_name;
      //   this.form.location_city = data[3].long_name;
      //   this.form.location_country = data[4].long_name;
      // } else if (data.length == 6) {
      //   this.form.location_area = data[1].long_name;
      //   this.form.location_street = data[2].long_name;
      //   this.form.location_city = data[4].long_name;
      //   this.form.location_country = data[5].long_name;
      // }
      //else if (data.length == 3) {
      //   this.form.city = data[1];
      //   this.form.country = data[2];
      // } else if (data.length == 4) {
      //   this.form.city = data[2];
      //   this.form.country = data[3];
      // }

      // if()
    },
    //4. Upload Files and get their URLS - for normal use case
    async uploadFiles(postData) {
      if (!postData) return;
      try {
        let formData = new FormData();
        formData.append("file", postData);
        const response = await axios.post("/api_fileupload_google", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        const { success, results } = await response.data;
        if (success) {
          console.log("File Uploaded Successfully.");
          return results.files;
        } else {
          return "fail";
        }
      } catch (error) {
        console.log(error);
        return "fail";
      }
    },
    //5. Upload File and get urls  -> For Add Products Bcz they include update product too.
    //Ref - https://medium.com/swlh/image-crop-and-upload-in-vuejs-2d8d5c73c310
    async getFileUrls(self) {
      if (!((await self.RealArray.length) > 0)) return "empty";
      try {
        await Promise.all(
          self.RealArray.map(async file => {
            if (self.form.files==null) self.form.files=[];
            if (typeof file === "string") return self.form.files.push(file);


            // Prepare Form Data
            let formData =  new FormData();
            formData.append("file", file, "product_image");

            let reqOptions = {
              url: "/api_fileupload_google",
              method: "POST",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              data: formData,
            }
            
            // Now Send it
            const response = await axios.request(reqOptions);
            console.log("file submit", response);
            // Store The Url in files Array of Form
            await self.form.files.push(response.data.results.files[0].fileUrl);
          })
        );
        return "success";
      } catch (error) {
        self.loading = true;
        console.log(error);
        self.$helpers.errorPopup("Error Adding Images.");
        return "fail";
      }
    },
    //6. File Upload Operations
    chooseFile() {
      this.$refs.file.click();
    },
    CancelCrop() {
      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    saveImage() {
      this.InitialArray = [...this.InitialArray, this.temp];
      this.RealArray = [...this.RealArray, this.file];

      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    change({ coordinates, canvas }) {
      var img = canvas.toDataURL("image/png");

      var context = canvas.getContext("2d");
      canvas.toBlob(blob => {
        var self = this;

        var objectURL = URL.createObjectURL(blob);

        self.temp = objectURL;
        self.file = blob;
      }, "image/wbmp");
    },
    chooseImage($event) {
      const file = $event.target.files[0];
      this.img = URL.createObjectURL(file);

      var reader = new FileReader();
      var self = this;
      //Read the contents of Image File.
      reader.readAsDataURL($event.target.files[0]);

      reader.onload = function (e) {
        console.log(self.isCropped);
        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function () {
          var height = this.height;
          var width = this.width;
          if (height < 210 || width < 210) {
            alert(
              "Please choose file which has minimum height of 210 and width of 210"
            );
            return false;
          }

          self.ShowChooseFile = false;
          self.isCropped = true;

          return true;
        };
      };
    },
    delete_image(index) {
      this.InitialArray.splice(index, 1);
      this.RealArray.splice(index, 1);
      console.log(this.InitialArray);
      console.log(this.RealArray);
    },
    pixelsRestriction({
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      imageWidth,
      imageHeight
    }) {
      return {
        minWidth: 220,
        minHeight: 220,
        maxWidth: 4000,
        maxHeight: 4000
      };
    }
  }
};
