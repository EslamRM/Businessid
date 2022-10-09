<template>
  <div>
    <div id="popup1" class="overlay">
      <div class="popup">
        <div class="modal-header">
          <md-dialog-title>Add Banner</md-dialog-title>
          <div class="modal-close">
            <i class="material-icons" @click="toggleCrop">
              close
            </i>
          </div>
        </div>
        <div class="mt-4 pl-4">
          <div class="pb-2">Recommended size : {{ width }} * {{ height }}</div>
        </div>
        <div class="upload-button" @click="chooseFile()" v-if="ShowChooseFile">
          <div class="choose-file-btn">
            <input
              type="file"
              ref="file"
              style="display: none"
              v-on:change="chooseImage($event)"
            />
            <span>Change</span>
            <i class="material-icons">
              add_a_photo
            </i>
          </div>
        </div>
        <div id="app">
          <Cropper
            :stencil-props="{
              handlers: {},
              movable: true,
              scalable: false
            }"
            :restrictions="pixelsRestriction"
            image-restriction="stencil"
            default-boundaries="fill"
            class="cropper"
            ref="cropper"
            :src="image"
            @change="change"
          ></Cropper>
        </div>
        <div class="footer-wrapper">
          <div class="d-flex space-between">
            <div class="date_wrapper">
              <VueDatePicker
                color="#f47320"
                v-model="start_date"
                placeholder="* Pick Start Date "
                clearable
                validate
                :min-date="yesterday"
                class="editOrder-datePicker"
              />
            </div>
            <div class="link_input">
              <input
                class="redirect_link"
                type="text"
                placeholder="Redirect link"
                v-model="link"
              />
            </div>
          </div>
          <div>
            <div class="dialog-crop-btn">
              <md-button
                v-if="showAddBtn"
                class="md-raised md-primary custom_btn add_btn"
                @click="upload()"
                :disabled="start_date == null || showAddBtn == 'false'"
                >Add</md-button
              >
              <div class="lds-ellipsis" v-if="showLoading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <md-button class="custom_btn cancel_btn" @click="cancel()"
                >Cancel</md-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import moment from "moment";
import inputComponent from "@/components/ui-components/input.vue";

import axios from "axios";
export default {
  name: "cropper",
  components: { Cropper, CircleStencil, inputComponent },
  props: [
    "dialog",
    "image",
    "id",
    "height",
    "width",
    "height",
    "stencilHeight",
    "stencilWidth"
  ],

  data() {
    return {
      showAddBtn: true,
      link: "",
      InitialArray: [],
      RealArray: [],
      showLoading: false,
      before_crop: true,
      IsDisabledUpload: false,
      Showcancel: true,
      imageSizePopup: false,
      ShowChooseFile: true,
      showDialog: true,
      file: {},
      temp: "",
      imageList: "",
      yesterday: "",
      start_date: null,
      toggleRectangleDialog: false,
      dataIsLoaded: false,
      isCropped: false,
      img: "",
      selectedHeight: "240",
      selectedWidth: "492",
      canUpload: true
    };
  },
  watch: {
    dialog: {
      // This will let Vue know to look inside the array
      deep: true,

      // We have to move our method to a handler field
      handler(newVal, oldVal) {
        this.showDialog = true;
      }
    }
  },
  methods: {
    toggleCrop() {
      this.$emit("EmittoggleCropper");
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
        maxWidth: 500,
        imageHeight: 150,
        imageWidth: 150,
        minWidth: this.width,
        minHeight: this.height,
        maxHeight: 500
      };
    },

    chooseFile() {
      this.$refs.file.click();
    },

    add_save() {
      this.add_more();
      this.upload();
    },
    // chooseImage($event) {
    //   console.log("choosen");
    //   this.before_crop = false;
    //   const file = $event.target.files[0];
    //   this.img = URL.createObjectURL(file);

    //   var reader = new FileReader();
    //   var self = this;
    //   //Read the contents of Image File.
    //   reader.readAsDataURL($event.target.files[0]);

    //   reader.onload = function(e) {
    //     console.log(self.isCropped);
    //     //Initiate the JavaScript Image object.
    //     var image = new Image();

    //     //Set the Base64 string return from FileReader as source.
    //     image.src = e.target.result;

    //     //Validate the File Height and Width.
    //     image.onload = function() {
    //       console.log("loadddd");
    //       var height = this.height;
    //       var width = this.width;
    //       console.log(height);
    //       console.log(width);
    //       if (height < 375 || width < 1200) {
    //         alert("Image is too small");
    //         self.imageSizePopup = true;
    //         return false;
    //       }

    //       self.ShowChooseFile = false;
    //       self.isCropped = true;

    //       return true;
    //     };
    //   };
    // },

    change({ coordinates, canvas }) {
      this.selectedHeight = coordinates.height;
      this.selectedWidth = coordinates.width;
      console.log(coordinates, canvas);
      var img = canvas.toDataURL("image/png");

      var context = canvas.getContext("2d");
      canvas.toBlob(blob => {
        var self = this;

        var objectURL = URL.createObjectURL(blob);

        self.temp = objectURL;
        self.file = blob;
        console.log(self.file);
      }, "image/wbmp");
    },
    cancel() {
      this.$emit("EmittoggleCropper");
    },
    CheckIsBlob(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
    upload() {
      this.showAddBtn = false;
      this.showLoading = true;

      this.IsDisabledUpload = true;

      let formData = new FormData();
      formData.append("file", this.file);

      axios
        .post("/api_fileupload_google", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          const data = {
            ads_id: this.id,
            file: response.data.results.files[0].fileUrl,
            link: this.link,
            start_date: this.start_date
          };
          this.$store
            .dispatch("ADD_BANNER_ADDS", data)
            .then(response => {
              this.showAddBtn = true;
              this.canUpload = true;
              console.log(response.token);
              // this.showDialog = false;
              // this.showLoading = false;
              // this.isCropped = false;
              // this.Showcancel = true;
              // this.IsDisabledUpload = false;
              if (response.token) {
                window.location.href =
                  process.env.BASE_URL + "ads/payment-preview?token=" +
                  response.token;
              }
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.yesterday = moment().subtract(1, "days")._d;

    this.showDialog = this.showCropDialog;
    // if (this.banners.length) {

    //   this.banners.map(image => {
    //     this.InitialArray.push(image.file);
    //     this.RealArray.push(image.file);
    //   });
    // }

    // console.log(this.SelectedImages);
    console.log("cccc");
  }
};
</script>

<style scoped>
#app {
  height: 300px;
  width: 100%;
}
.cancel_btn {
  border: 1px solid #223a63;
  color: #223a63;
}
.redirect_link {
  height: 35px;
  border: 1px solid #c8d2e0;
  border-radius: 5px;
}
.custom_btn {
  padding: 5px 5px;
  font-size: 14px;
  outline: none;
  border-radius: 6px;
  /* margin-top: 12px; */
  margin-right: 5px;
  height: 35px;
}
.btn-save-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 21px;
}
.btn-save-div button {
  height: 37px;
}
.date_wrapper {
  padding: 6px;
  border: 1px solid #c8d2e0;
  border-radius: 6px;
  height: 35px;
}
.footer-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 25px 0px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
}
.modal-header {
  border-bottom: 1px solid #eee;
}
.md-dialog-title {
  margin-bottom: 9px;
  padding: 0px 19px 0;
  font-size: 16px;
  font-weight: 600;
  opacity: 1;
  color: #222;
}
.modal-close {
  cursor: pointer;
  position: absolute;
  right: 19px;
  top: 12px;
  background-color: #c7ced8;
  border-radius: 50px;
  padding: 3px;
  height: 27px;
  width: 27px;
}
.modal-close i {
  font-size: 20px;
  position: relative;
  top: 1px;
  left: 1px;
  color: #213a63;
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(23 23 23 / 79%);
  z-index: 2000;
}
.cropper {
  height: 600px;

  background: #ddd;
}
.overlay:target {
  visibility: visible;
  opacity: 1;
}
.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 90%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}
.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}
.popup .close:hover {
  color: #06d85f;
}
.popup .content {
  max-height: 30%;
  overflow: auto;
}
.upload-button {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}
.link_input {
  padding-left: 10px;
}
.choose-file-btn {
  /* background-color: rgb(33, 58, 99,0.25); */
  border: 1.3px dashed #213a63;
  width: 155px;
  border-radius: 0.25em;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.choose-file-btn span {
  position: relative;
  top: 2px;
}
.choose-file-btn i {
  color: #213a63;
  margin-left: 4px;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 50px;
}
.btn-save {
  height: 30px;
  background-color: #d6e6ff;
  color: #2d2d2d;
}
.c-formInput {
}
.lds-ellipsis div {
  position: absolute;
  top: 25px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #dadada;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}

@media screen and (max-width: 700px) {
  .box {
    width: 70%;
  }
  .popup {
    width: 70%;
  }
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
