<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <div class="modal-header">
        <md-dialog-title>Update Cover Picture</md-dialog-title>
        <div class="modal-close">
          <i class="material-icons" @click="showDialog = false"> close </i>
        </div>
      </div>
      <div class="upload-button" @click="chooseFile()" v-if="ShowChooseFile">
        <div class="choose-file-btn">
          <input
            type="file"
            ref="file"
            accept="image/*"
            style="display: none"
            v-on:change="chooseImage($event)"
          />
          <span>Add</span>
          <i class="material-icons">
            add_photo_alternate
          </i>
        </div>
      </div>
      <div v-if="before_crop">
        <div class="img-selected-wrapper">
          <div
            class="selected-images"
            v-for="(img, index) in InitialArray"
            :key="index"
          >
            <img :src="img" />
            <span class="remove-image">
              <span class="material-icons" @click="delete_image(index)">
                close
              </span>
            </span>
          </div>
        </div>
        <div class="btn-save-div">
          <md-button
            class="btn-save md-primary md-raised"
            @click="upload()"
            :disabled="IsDisabledUpload"
            >Save</md-button
          >
          <div class="lds-ellipsis" v-if="showLoading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <div id="app" v-if="isCropped">
        <Cropper classname="cropper" :src="img" @change="change"></Cropper>
        <div class="dialog-crop-btn">
          <md-button class="md-primary addMore" @click="add_more()"
            ><div class="btnContent">
              <span class="material-icons">add</span>Add more
            </div></md-button
          >
          <md-button class="md-raised md-primary" @click="add_save()"
            >Save</md-button
          >
          <md-button class="md-primary" v-if="Showcancel" @click="cancel()"
            >Cancel</md-button
          >
        </div>
      </div>
    </md-dialog>
    <md-dialog-alert
      :md-active.sync="imageSizePopup"
      md-title="Photo Too Small"
      md-content="Please choose a photo that's at least 200 pixels wide."
    />
  </div>
</template>

<script>
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import axios from "axios";
export default {
  name: "roundedCrop",
  components: { Cropper, CircleStencil },
  props: ["dialog", "banners"],

  data() {
    return {
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
      toggleRectangleDialog: false,
      dataIsLoaded: false,
      isCropped: false,
      img: ""
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
    pixelsRestriction({
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      imageWidth,
      imageHeight
    }) {
      return {
        minWidth: 200,
        minHeight: 200,
        maxWidth: 200,
        maxHeight: 200
      };
    },
    delete_image(index) {
      this.InitialArray.splice(index, 1);
      this.RealArray.splice(index, 1);
      console.log(this.InitialArray);
      console.log(this.RealArray);
    },

    chooseFile() {
      this.$refs.file.click();
    },
    add_more() {
      this.InitialArray = [...this.InitialArray, this.temp];
      this.RealArray = [...this.RealArray, this.file];

      //  console.log(this.file);
      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    add_save() {
      this.add_more();
      this.upload();
    },
    chooseImage($event) {
      this.before_crop = false;
      const file = $event.target.files[0];
      if (!file.type.includes("image/")) {
        alert("Only Images are allowed to upload");
        return;
      }
      this.img = URL.createObjectURL(file);

      var reader = new FileReader();
      var self = this;
      //Read the contents of Image File.
      reader.readAsDataURL($event.target.files[0]);

      reader.onload = function(e) {
        console.log(self.isCropped);
        //Initiate the JavaScript Image object.
        var image = new Image();

        //Set the Base64 string return from FileReader as source.
        image.src = e.target.result;

        //Validate the File Height and Width.
        image.onload = function() {
          var height = this.height;
          var width = this.width;
          // if (height < 200 || width < 200) {
          //   self.imageSizePopup = true;
          //   return false;
          // }

          self.ShowChooseFile = false;
          self.isCropped = true;

          return true;
        };
      };
    },

    change({ coordinates, canvas }) {
      console.log(this.toggleDialog);
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
      this.isCropped = false;
      this.ShowChooseFile = true;
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
      console.log(this.InitialArray);
      console.log(this.RealArray);
      console.log("uploading");
      const imageArray = [];
      this.showLoading = true;
      this.Showcancel = false;
      this.IsDisabledUpload = true;
      const profileId = this.$route.params.id;
      const id = this.$route.params.id;
      var i = 0;

      const finalArray = [];
      const uploadArray = [];

      this.RealArray.forEach(img => {
        if (this.CheckIsBlob(img)) {
          finalArray.push(img);
        } else {
          uploadArray.push(img);
        }
      });
      const uploadLength = uploadArray.length;
      const finalLength = finalArray.length;

      if (uploadLength != 0) {
        uploadArray.forEach(file => {
          let formData = new FormData();
          formData.append("file", file);
          axios
            .post("/api_fileupload_google", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(response => {
              i++;
              finalArray.push(response.data.results.files[0].fileUrl);
              if (uploadLength === i) {
                this.$store
                  .dispatch("cover_picture", finalArray)
                  .then(response => {
                    this.$store.dispatch("loggedIn_profile");
                    this.$store
                      .dispatch("profile_info", id)
                      .then(response => {
                        this.showDialog = false;
                        this.showLoading = false;
                        this.isCropped = false;
                        this.Showcancel = true;
                        this.IsDisabledUpload = false;
                      })
                      .catch(error => console.log(error));
                  })
                  .catch(error => console.log(error));
              }
            })
            .catch(error => console.log(error));
        });
      } else if (uploadLength == 0) {
        this.$store.dispatch("cover_picture", finalArray).then(response => {
          this.$store.dispatch("loggedIn_profile");
          this.$store
            .dispatch("profile_info", id)
            .then(response => {
              this.showDialog = false;
              this.showLoading = false;
              this.isCropped = false;
              this.IsDisabledUpload = false;
            })
            .catch(error => console.log(error));
        });
      }
    }
  },
  created() {
    this.showDialog = this.showCropDialog;
    if (this.banners.length) {
      //this.SelectedImages = {...this.SelectedImages,...this.banners.file};
      this.banners.map(image => {
        this.InitialArray.push(image.file);
        this.RealArray.push(image.file);
      });
    }

    console.log(this.SelectedImages);
    console.log("cccc");
  }
};
</script>

<style scoped>
.btn-save-div {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 21px;
}
.btn-save-div button {
  height: 37px;
}
.img-selected-wrapper {
  padding: 0 9px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}
.remove-image {
  position: absolute;
  background: #fff;
  border-radius: 3px;
  padding: 1px;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  opacity: 0;
  color: #ff5722;
  cursor: pointer;
}
.selected-images:hover .remove-image {
  opacity: 1;
}
.selected-images:after {
  content: "";
  height: 100%;
  position: absolute;
  transition: all 0.2s;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0);
}
.selected-images:hover::after {
  background-color: rgba(255, 255, 255, 0.5);
}
.selected-images {
  max-width: 75px;
  min-height: 75px;
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 7.5px;
  transition: all 0.2s;
}
.selected-images img {
  border-radius: 6px;
  bottom: 0px;
  height: 100%;
  left: 0px;
  opacity: 1;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 100%;
  object-fit: cover;
}
.dialog-crop-btn {
  padding: 15px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-crop-btn button {
  height: 37px;
  margin-right: 1.3%;
}
button.addMore {
  border: 1.3px dashed #213a63;
  margin-right: 5%;
}
.btnContent {
  position: relative;
  top: -5px;
}
.btnContent span {
  position: relative;
  top: 7px;
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
.modal-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
}
.md-dialog-title {
  margin-bottom: 9px;
  padding: 13px 19px 0;
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
.md-dialog {
  /* max-width: 599px; */
  width: 100%;
}
.upload-button {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}
.cropper {
  height: 250px;
  width: 100%;
  background: #ddd;
}

/* loader */
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
