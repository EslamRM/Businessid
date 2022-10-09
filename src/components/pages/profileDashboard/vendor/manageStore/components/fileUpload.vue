<template>
  <div class="w-100 mt-3 mt_product_img">
    <div class="uploadWrap">
      <div class="add-meadia-bx">
        <div>
          <div id="app" v-if="isCropped">
            <Cropper
              ref="cropper"
              :src="image.src"
              check-orientation
              class="variationFileUpload"
            ></Cropper>
            <div class="save-image">
              <button
                class="md-button md-raised md-accent md-theme-default"
                @click="saveImage"
              >
                Save
              </button>
              <button
                class="md-button md-raised md-accent md-theme-primary"
                @click="CancelCrop"
              >
                Cancel
              </button>
            </div>
          </div>

          <div v-if="before_crop || value.length > 0" class="mb-3">
            <div class="img-selected-wrapper">
              <div
                class="selected-images"
                v-for="(img, index) in value"
                :key="index"
              >
                <img :src="img.src" />
                <span
                  class="material-icons removeIco"
                  @click="delete_image(index)"
                  >close</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="uploader-box">
          <div v-if="ShowChooseFile">
            <div
              class="choose-file-btn md-button md-theme-default"
              @click="$refs.file.click()"
            >
              <input
                ref="file"
                type="file"
                accept="image/*"
                style="display: none"
                @change="loadImage($event)"
              />
              Add Files
              <i class="material-icons">add</i>
            </div>
          </div>
        </div>
        <div class="c-forminlineError" style="text-align: center" v-if="error">
          <span> {{ errorMessage || "Please Select At Least One File" }} </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Cropper } from "vue-advanced-cropper";
// This function is used to detect the actual image type,
const getMimeType = (file, fallback = null) => {
  const byteArray = new Uint8Array(file).subarray(0, 4);
  let header = "";
  for (let i = 0; i < byteArray.length; i++) {
    header += byteArray[i].toString(16);
  }
  switch (header) {
    case "89504e47":
      return "image/png";
    case "47494638":
      return "image/gif";
    case "ffd8ffe0":
    case "ffd8ffe1":
    case "ffd8ffe2":
    case "ffd8ffe3":
    case "ffd8ffe8":
      return "image/jpeg";
    default:
      return fallback;
  }
};
export default {
  name: "fileUpload",
  props: {
    error: {
      type: Boolean,
    },
    errorMessage: {
      type: String,
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    isCropped: false,
    ShowChooseFile: true,
    before_crop: false,
    image: null,
    filesArray: [], // here filesARray is values as we are using the Vue Model Component
  }),

  components: {
    Cropper,
  },
  methods: {
    saveImage() {
      const { canvas } = this.$refs.cropper.getResult();
      canvas.toBlob((blob) => {
        // To Download File
        // import { saveAs } from "file-saver";
        // saveAs(blob);

        this.image.src = URL.createObjectURL(blob);
        this.image.blob = blob;
        // this.file = blob;
      }, this.image.type);

      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;

      // Append to the FilesArray
      this.value.push(this.image);
      // Update the Parent Component about this
      this.$emit("input", this.value);
    },
    CancelCrop() {
      this.image = {
        src: null,
        type: null,
        name: null,
      };
      this.before_crop = true;
      this.isCropped = false;
      this.ShowChooseFile = true;
    },
    delete_image(index) {
      this.value.splice(index, 1);
      // Update the Parent Component about this
      this.$emit("input", this.value);
    },
    loadImage(event) {
      // Reference to the DOM input element
      const { files } = event.target;
      // Ensure that you have a file before attempting to read it
      if (files && files[0]) {
        // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
        if (this.image && this.image.src) {
          URL.revokeObjectURL(this.image.src);
        }
        // 2. Create the blob link to the file to optimize performance:
        const blob = URL.createObjectURL(files[0]);
        // 3. The steps below are designated to determine a file mime type to use it during the
        // getting of a cropped image from the canvas. You can replace it them by the following string,
        // but the type will be derived from the extension and it can lead to an incorrect result:
        //
        // this.image = {
        //    src: blob;
        //    type: files[0].type
        // }
        // Create a new FileReader to read this image binary data
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Check File Size

          if (e.height < 210 || e.width < 210) {
            alert(
              "Please choose file which has minimum height of 210 and width of 210"
            );
            return false;
          }
          // Note: arrow function used here, so that "this.image" refers to the image of Vue component
          this.image = {
            // Read image as base64 and set it as src:
            src: blob,
            // Determine the image type to preserve it during the extracting the image from canvas:
            type: getMimeType(e.target.result, files[0].type),
            // Determine image type
            name: files[0].name,
          };
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsArrayBuffer(files[0]);

        // Open The Cropper and close the Add files Button
        this.ShowChooseFile = false;
        this.isCropped = true;
      }
    },
  },
  destroyed() {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (this.image.src) {
      URL.revokeObjectURL(this.image.src);
    }
  },
};
</script>

<style scoped>
.uploadWrap {
  max-width: 100%;
  margin: 0 auto;
}

.add-meadia-bx {
  border: 1.4px dotted #d2d2d2;
  padding: 11px;
  margin: 0;
  overflow: hidden;
}

.variationFileUpload .vue-advanced-cropper {
  max-width: 500px;
  max-height: 250px;
}

.save-image {
  padding: 10px 0px;
}

.save-image button {
  height: 33px;
  min-width: 71px;
}

/* Image Upload Box */
.uploader-box {
  display: block;
  justify-content: center;
  float: left;
  width: 100%;
}

.choose-file-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 39px;
  color: #ff5722;
  background-color: rgba(255, 87, 34, 0.12);
  padding: 0;
  padding-left: 9px;
  padding-right: 5px;
}
.choose-file-btn i {
  font-size: 20px;
  margin-left: 2px;
}

/* Images Display  */
.img-selected-wrapper {
  display: block;
  justify-content: center;
  /* margin-bottom: 1em;
        margin-top: 0.99em; */
}

.selected-images {
  transition: all 0.2s;
  float: left;
  margin-bottom: 7px;
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
  max-width: 105px;
  min-height: 105px;
  position: relative;
  width: 100%;
  height: 100%;
  margin-right: 7.5px;
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
}
.save-image {
  padding: 10px 0px;
}

.removeIco {
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
.selected-images:hover .removeIco {
  opacity: 1;
}
/* Media Queries */
@media screen and (max-width: 768px) {
  .add-meadia-bx {
    padding-top: 0px;
    padding-bottom: 4px;
  }

  .choose-file-btn {
    margin-left: -1px;
    margin-right: -1px;
    font-size: 13px;
  }
}
</style>