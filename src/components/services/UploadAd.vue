<template>
  <div>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title class="d-flex preview-title"
        ><h2 class="mx-auto">Upload</h2>
        <div class="close">
          <i
            class="material-icons md-primary"
            style="cursor: pointer"
            @click="showDialog = false"
            >close</i
          >
        </div>
      </md-dialog-title>
      <md-button
        class="upload-button btn_ad2"
        @click="chooseFile()"
        v-if="ShowChooseFile"
      >
        <div class="choose-file-btn">
          <input
            type="file"
            ref="file"
            style="display: none"
            accept="image/*"
            v-on:change="chooseImage($event)"
          />
          <span>Choose Image</span>
          <i class="material-icons"> add_photo_alternate </i>
        </div>
      </md-button>
      <md-button
        class="upload-button btn_ad2"
        @click="chooseFile()"
        v-if="ShowChooseFile"
      >
        <div class="choose-file-btn">
          <input
            type="file"
            ref="file"
            style="display: none"
            accept="image/*"
            v-on:change="chooseImage($event)"
          />
          <span>Choose Video</span>
          <i class="material-icons"> video_call </i>
        </div>
      </md-button>
      <md-button
        class="upload-button btn_ad2"
        @click="chooseFile()"
        v-if="ShowChooseFile"
      >
        <div class="choose-file-btn">
          <input
            type="file"
            ref="file"
            style="display: none"
            accept="image/*"
            v-on:change="chooseImage($event)"
          />
          <span>New Upload</span>
          <i class="material-icons"> upload_file </i>
        </div>
      </md-button>
      <div id="app" v-if="isCropped">
        <Cropper
          classname="cropper"
          :stencilComponent="$options.components.CircleStencil"
          :restrictions="pixelsRestriction"
          :src="img"
          :stencil-props="{
            aspectRatio: 9 / 16
          }"
          @change="change"
        ></Cropper>
        <div class="dialog-crop-btn">
          <md-button
            class="md-raised md-primary"
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
          <md-button class="" v-if="Showcancel" @click="cancel()"
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
import axios from "axios";
import { Cropper, CircleStencil } from "vue-advanced-cropper";
export default {
  name: "UploadAd",
  components: { Cropper, CircleStencil },
  props: {
    dialog: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      showLoading: false,
      IsDisabledUpload: false,
      Showcancel: true,
      imageSizePopup: false,
      ShowChooseFile: true,
      showDialog: true,
      file: {},
      toggleDialog: false,
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
    cancel() {
      this.isCropped = false;
      this.ShowChooseFile = true;
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
        minWidth: minWidth,
        minHeight: minHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight
      };
    },
    chooseFile() {
      this.$refs.file.click();
      console.log(this);
    },
    chooseImage($event) {
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
          if (height < 200 || width < 200) {
            self.imageSizePopup = true;
            return false;
          }

          self.ShowChooseFile = false;
          self.isCropped = true;
          return true;

          // alert("Uploaded image has valid Height and Width.");
        };
      };
    },

    change({ coordinates, canvas }) {
      var img = canvas.toDataURL("image/png");
      var context = canvas.getContext("2d");
      canvas.toBlob(blob => {
        var self = this;
        self.file = blob;
        console.log(self.file);
      }, "image/wbmp");
    },
    upload() {
      this.showLoading = true;
      this.Showcancel = false;
      this.IsDisabledUpload = true;
      const profileId = this.$route.params.id;

      let formData = new FormData();
      formData.append("file", this.file);

      axios
        .post("https://businessid.net/api/v2/api_fileupload_google", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          const files = response.data.results.files[0].fileUrl;
          console.log("inside profile pic");
          console.log(response.data.results.files[0].fileUrl);
          this.$store
            .dispatch("profile_picture", files)
            .then(response => {
              this.$store
                .dispatch("loggedIn_profile")
                .then(response => {
                  this.showDialog = false;
                  this.isCropped = false;
                  this.showLoading = false;
                  this.ShowChooseFile = true;
                  this.IsDisabledUpload = false;
                  this.Showcancel = true;
                  console.log(this.showDialog);
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }
  },
  created() {
    this.showDialog = this.showCropDialog;
    console.log("created");
  }
};
</script>

<style scoped>
.md-dialog >>> .md-dialog-container {
  padding: 15px;
  border-radius: 10px;
  font-size: 16px;
}
.dialog-crop-btn {
  padding: 15px;
  justify-content: center;
  display: flex;
  width: 100%;
  max-width: 599px;
}
.dialog-crop-btn button {
  height: 37px;
  margin-right: 1.3%;
}
.choose-file-btn {
  padding: 15px;
  border-radius: 0.25em;
  height: 41px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
}
.choose-file-btn span {
  position: relative;
  top: 2px;
}
.choose-file-btn i {
  color: #333;
  margin-left: 10px;
}
.modal-header {
  display: flex;
  justify-content: space-between;
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
/* #app {
  width: 700px;
} */
.md-dialog {
  /* max-width: 599px; */
  width: 100%;
  /* height: 275px; */
}
.md-dialog-title {
  margin-bottom: 9px;
  padding: 0;
  font-size: 16px;
  font-weight: 600;
  opacity: 1;
  color: #222;
}
.md-dialog .md-dialog-title {
  border-bottom: 1px solid #ccc;
  padding-bottom: 7px;
}
.md-dialog .md-dialog-title h2{
  padding-top: 7px;
}
.upload-button {
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 10px 0px;
}
.upload-button:hover {
  background: #eee;
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
