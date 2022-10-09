<template>
  <div>
    <div>
      <div
        class="blk-gradient"
        v-if="postfocused"
        @click="postDeActivated"
      ></div>
      <div class="create-post" v-if="retrievedTokenDetail">
        <div class="post-hd-1 pos-rel">
          Start a post
          <i
            v-if="postfocused"
            class="material-icons post-close-btn d-hide"
            :class="{ postfocused: postfocused }"
            @click="postDeActivated"
            >close</i
          >
        </div>

        <div class="post-bx-cnt-1 pos-rel">
          <img
            v-if="userData && userData.profile.logo != ''"
            alt
            class="who-post-img avatharGreyShade"
            :src="userData.profile.logo"
          />
          <div v-else class="profile-default-text">
            <div class="text" v-if="userData">
              {{ getFirstChar(userData.profile.trade_name_en) }}
            </div>
          </div>
          <md-field>
            <md-textarea
              v-if="userData"
              autocomplete="off"
              v-model="form.postText"
              :placeholder="
                'Whats on your mind ' + userData.profile.trade_name_en + '?'
              "
              md-autogrow
              @focus="postActivated"
              @keyup="btnStatus"
            >
            </md-textarea>
          </md-field>

          <div class="lnk-prev">
            <div class="card">
              <div class="img-wrapper-prev-url">
                <img
                  v-if="prevUrl && prevUrl.image"
                  class="card-img-top"
                  :src="prevUrl.image"
                  :alt="prevUrl.title"
                />
              </div>
              <div class="card-block" v-if="prevUrl">
                <p class="prev-text">{{ prevUrl.title }}</p>
                <h4 class="card-title">{{ prevUrl.description }}</h4>
              </div>
            </div>
          </div>
          <!-- <link-prevue url="https://vuejs.org/">
            <template slot-scope="props">
              <div class="card" style="width: 20rem;">
                <img class="card-img-top" :src="props.img" :alt="props.title" />
                <div class="card-block">
                  <h4 class="card-title">{{ props.title }}</h4>
                  <p class="card-text">{{ props.description }}</p>
                  <a v-bind:href="props.url" class="btn btn-primary">More</a>
                </div>
              </div>
            </template>
          </link-prevue> -->
          <div class="uploader-box" v-if="imageVideoUpload">
            <vue-dropzone
              @vdropzone-file-added="fileAdded"
              @vdropzone-removed-file="fileRemoved"
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
            ></vue-dropzone>
          </div>
          <GoogleMap v-if="!mapHidden" @mapHandler="onClickAddMap"></GoogleMap>
          <div v-if="postfocused">
            <div class="upld-pst-tags brd-btm-e4e4e4 d-hide">
              <a @click="imageVideoUploaderActivated">
                <md-button
                  class="md-primary"
                  :class="{ activeBtn: selectedPostType == 'image' }"
                >
                  <span class="upl-crcl-1">
                    <img
                      class="upl-crcl-img-1"
                      src="../../../assets/images/icons/photoorvideo.png"
                      alt
                    />
                  </span>
                  Photo/Video
                </md-button>
              </a>

              <md-button
                class="md-primary"
                @click="checkin()"
                :class="{ activeBtn: selectedPostType == 'checkin' }"
              >
                <span class="upl-crcl-1">
                  <img
                    class="upl-crcl-img-1"
                    src="../../../assets/images/icons/location.png"
                    alt
                  />
                </span>
                Check in
              </md-button>

              <router-link to="/dashboard/vendor/addnewitems">
                <md-button class="md-primary">
                  <span class="upl-crcl-1">
                    <img
                      class="upl-crcl-img-1"
                      src="../../../assets/images/icons/products.png"
                      alt
                    />
                  </span>
                  Products
                </md-button>
              </router-link>
              <router-link to="/dashboard">
                <md-button class="md-primary">
                  <span class="upl-crcl-1">
                    <img
                      class="upl-crcl-img-1"
                      src="../../../assets/images/icons/properties.png"
                      alt
                    />
                  </span>
                  Properties
                </md-button>
              </router-link>
              <router-link to="/dashboard">
                <md-button class="md-primary">
                  <span class="upl-crcl-1">
                    <img
                      class="upl-crcl-img-1"
                      src="../../../assets/images/icons/services.png"
                      alt
                    />
                  </span>
                  Services
                </md-button>
              </router-link>
              <router-link to="/dashboard/vendor/auto">
                <md-button class="md-primary">
                  <span class="upl-crcl-1">
                    <img
                      class="upl-crcl-img-1"
                      src="../../../assets/images/icons/car.png"
                      alt
                    />
                  </span>
                  Autos
                </md-button>
              </router-link>
            </div>
            <div class="whs-see-pst-bx">
              <div class="hd-txt-1">Who Should see my post?</div>
              <div class="rad-slct-1">
                <md-radio v-model="form.privacy" value="public">
                  <div class="d-flex-tp">
                    <img
                      class="rd-icn-1"
                      src="../../../assets/images/icons/public.png"
                      alt
                    />
                    <span class="rd-txt-1">
                      Public
                      <div class="sb-txt-1">Every one can see this post</div>
                    </span>
                  </div>
                </md-radio>
              </div>
              <div class="rad-slct-1">
                <md-radio v-model="form.privacy" value="followers">
                  <div class="d-flex-tp">
                    <img
                      class="rd-icn-1"
                      src="../../../assets/images/icons/group.png"
                      alt
                    />
                    <span class="rd-txt-1">
                      Followers
                      <div class="sb-txt-1">
                        Only followers can see the post
                      </div>
                    </span>
                  </div>
                </md-radio>
              </div>
              <div class="rad-slct-1">
                <md-radio v-model="form.privacy" value="private">
                  <div class="d-flex-tp">
                    <img
                      class="rd-icn-1"
                      src="../../../assets/images/icons/profile.png"
                      alt
                    />
                    <span class="rd-txt-1">
                      Private
                      <div class="sb-txt-1">Only me can see the post</div>
                    </span>
                  </div>
                </md-radio>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-bx-wrp-1" v-if="postfocused">
          <md-button
            class="md-raised md-primary pst-btn-tp-1"
            :disabled="btnDisable"
            @click="submitPost()"
            >Share your post</md-button
          >
          <div class="loader">
            <div class="circle-loader" v-if="showLoader"></div>
          </div>
        </div>
        <div v-if="postfocused">
          <router-link v-if="userData"
            :to="
              '/' +
                userData.profile.trade_name_en +
                '/' +
                userData.profile.userid +
                '/create/advertising'
            "
          >
            <md-button class="md-raised md-primary pst-btn-tp-1"
              >Create Advertising</md-button
            ></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueTextareaAutosize from "vue-textarea-autosize";
import GoogleMap from "./google-map";
import axios from "axios";

import vue2Dropzone from "vue2-dropzone";
import { mapState } from "vuex";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  data() {
    return {
      selectedPostType: undefined,
      mapHidden: true,
      btnDisable: true,
      showLoader: false,
      terms: false,
      files: "",
      prevUrl: "",
      form: {
        postType: "post",
        postText: "",
        textDirection: "rtl",
        postFiles: [],
        privacy: "public",
        latitude: "11212",
        longitude: "2323"
      },
      file: [],
      textarea: "",
      radio: false,
      postfocused: false,
      imageVideoUpload: false,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 114,
        maxFilesize: 110,
        addRemoveLinks: true,
        // acceptedFiles:'image/*',
        headers: { "My-Awesome-Header": "header value" },
        autoProcessQueue: false
      }
    };
  },
  components: {
    VueTextareaAutosize,
    vueDropzone: vue2Dropzone,
    GoogleMap
  },
  computed: {
    ...mapState({
      retrievedTokenDetail: state => state.user.retrievedTokenDetail,
      userData: state => state.user.profile
    }),

    getFirstChar() {
      return name => name.charAt(0);
    },
    profileIconUrl() {
      return this.$store.getters.getProfileIconUrl;
    },
    isDisabled: function() {
      return !this.terms;
    }
  },
  watch: {
    postfocused: function(val) {
      if (val == false) {
        this.prevUrl = "";
        this.form.postText = "";
      }
      if (this.form.postText != "") {
        const url = this.checkIsUrl(this.form.postText);
        if (!url) {
          this.btnDisable = true;
          this.prevUrl = "";
        }
      }
      // else {
      //   this.btnDisable = true;
      //   this.prevUrl = ""
      // }
    }
  },
  methods: {
    fileAdded() {
      this.btnDisable = false;
    },
    fileRemoved() {
      const uploadedFile = this.$refs.myVueDropzone.getQueuedFiles();
      if (!uploadedFile.length) {
        this.btnDisable = true;
      }
    },
    btnStatus() {
      console.log("object");

      if (this.form.postText != "") {
        this.btnDisable = false;
        const url = this.checkIsUrl(this.form.postText);
        if (url) {
          //this.prevUrl = this.form.postText;
          return new Promise((resolve, reject) => {
            axios
              .post("post-url-preview", {
                url: this.form.postText
              })
              .then(response => {
                resolve(response.data);
                if (response.data.success) this.prevUrl = response.data.result;
                // this.prev = response.data;
                console.log(response.data);
              })
              .catch(error => {
                reject(error);
                console.log(error);
              });
          });
        } else {
          this.prevUrl = "";
        }
      } else {
        this.btnDisable = true;
        this.prevUrl = "";
      }
    },
    getSlug() {
      return (name) => this.slugify(name);
    },
    onClickAddMap(value) {
      console.log(value);
      this.btnDisable = false;
      this.form.latitude = value.geometry.location.lat();
      this.form.longitude = value.geometry.location.lng();
    },
    checkin() {
      this.mapHidden = false;
      this.selectedPostType = "checkin";
      this.form.postType = "checkin";
    },
    async submitPost() {
      const IsLink = this.checkIsUrl(this.form.postText);
      if (this.$refs.myVueDropzone == undefined && IsLink) {
        this.form.postType = "link";
      } else if (this.$refs.myVueDropzone != undefined && IsLink) {
        this.postType = "post";
      }
      this.btnDisable = true;
      this.disable = true;
      this.showLoader = true;
      if (this.$refs.myVueDropzone != undefined) {
        const uploadedFile = this.$refs.myVueDropzone.getQueuedFiles();
        this.file = uploadedFile[0];
        const file = { file: uploadedFile[0] };

        //            if (navigator.geolocation) {
        //             navigator.geolocation.getCurrentPosition(
        //             function (position) {
        //           console.log(position)

        //         },
        //         function (error) {
        //             alert(error.message);
        //         }, {
        //             enableHighAccuracy: true
        //             , timeout: 5000
        //         }
        //     );
        // } else {
        //     alert("Geolocation is not supported by this browser.");
        // }
        if (uploadedFile.length == 1) {
          let formData = new FormData();
          formData.append("file", ...uploadedFile);
          axios
            .post("/api_fileupload_google", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(response => {
              const {
                fileType,
                fileUrl,
                filePosterImg
              } = response.data.results.files[0];
              console.log(fileType);
              if (fileType == "video") {
                this.form.postFiles.push({
                  type: fileType,
                  url: fileUrl,
                  posterImg: filePosterImg
                });
              } else {
                this.form.postFiles.push({ type: fileType, url: fileUrl });
              }
              this.$store
                .dispatch("AddPost", this.form)
                .then(response => {
                  console.log(response);
                  this.form.postText = "";
                  this.form.postFiles = [];
                  console.log(this.form);
                  this.postfocused = false;
                  this.imageVideoUpload = false;
                  this.posterImg = this.disable = false;
                  this.mapHidden = true;
                  this.showLoader = false;
                })
                .catch(error => {
                  this.disable = false;
                  this.mapHidden = true;
                  this.showLoader = false;
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        } else if (uploadedFile.length > 1) {
          this.files = this.$refs.myVueDropzone.getQueuedFiles();
          let formData = new FormData();
          let data = [];
          for (var i = 0; i < this.files.length; i++) {
            let file = this.files[i];
            formData.append("file", file);

            const response = await axios.post(
              "/api_fileupload_google",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data"
                }
              }
            );
            data.push(response.data.results.files[0]);
          }

          // const data = response.data.results.files;
          // const data = response.data.results.files;

          data.forEach(result => {
            console.log(result.fileType);
            if (result.fileType == "video") {
              this.form.postFiles.push({
                type: result.fileType,
                url: result.fileUrl,
                posterImg: result.filePosterImg
              });
            } else {
              this.form.postFiles.push({
                type: result.fileType,
                url: result.fileUrl
              });
            }
          });
          this.$store
            .dispatch("AddPost", this.form)
            .then(response => {
              this.form.postText = "";
              this.disable = false;
              this.showLoader = false;
              this.form.postFiles = [];
              console.log(this.form);
              this.postfocused = false;
              this.mapHidden = true;
              this.imageVideoUpload = false;
            })
            .catch(error => console.log(error));
          this.disable = false;
          this.mapHidden = true;
          this.showLoader = false;
        }
      } else {
        this.$store
          .dispatch("AddPost", this.form)
          .then(response => {
            console.log(response);
            this.form.postText = "";
            this.prevUrl = "";
            console.log(this.form);
            this.disable = false;
            this.showLoader = false;
            this.mapHidden = true;
            this.postfocused = false;
            this.imageVideoUpload = false;
          })
          .catch(error => console.log(error));
      }
    },
    checkIsUrl(url) {
      console.log(url);
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(url);
    },

    postActivated() {
      this.postfocused = true;
    },
    postDeActivated() {
      this.mapHidden = true;
      this.selectedPostType = undefined;
      this.postfocused = false;
      this.imageVideoUpload = false;
    },
    imageVideoUploaderActivated() {
      this.imageVideoUpload = true;

      this.selectedPostType = "image";
      setTimeout(() => {
        console.log(this.$refs.myVueDropzone.dropzone);
        document.getElementById("dropzone").click();
      }, 200);
    }
  }
};
</script>
<style scoped>
.lnk-prev {
  max-height: 200px;
  overflow: scroll;
}
.card-title {
  color: #d0d0d0;
  font-size: 18px;
  padding-bottom: 10px;
}
.prev-text {
  color: #c5c5c5;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 10px;
  text-transform: uppercase;
}
.card-img-top {
  vertical-align: middle;
  border-style: none;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  align-items: center;
  display: block;
  margin: 0px auto;
}
.card-block {
  background-color: #3a3b3c;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 10px;
}
.profile-default-text {
  position: absolute;
  top: 15px;
  left: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  padding: 1px;
  background: #ff5722;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile-default-text .text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}
.activeBtn {
  background-color: #d8e4f9;
}
.icn-crt-1 {
  font-size: 15px;
  margin-right: 5px;
  position: relative;
  top: 3px;
}

.post-hd-1 {
  border-bottom: 0.5px solid #efefef;
  border-radius: 2px 2px 0 0;
  font-weight: 500;
  padding: 11px;
  padding-bottom: 8px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.post-bx-cnt-1 {
  padding: 0px;
  padding-top: 5px;
  background: #fff;
}
.post-bx-cnt-1 .md-field {
  margin-bottom: -20px !important;
}
.upld-pst-tags {
  padding-top: 10px;
  padding-bottom: 5px;
  /* border-top: 1px solid #e4e4e4; */
  padding-left: 5px;
  padding-right: 5px;
}

.md-button {
  height: 35px;
  width: 32.8%;
  font-size: 13px;
  margin-bottom: 5px;
  padding: 0;
}

.upl-crcl-1 {
  margin-right: 5px;
}
.brd-btm-e4e4e4 {
  border-bottom: 1px solid #e4e4e4;
}
.hd-txt-1 {
  padding: 5px 0px;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.8;
  color: #999;
}
.md-radio {
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
}
.rd-icn-1 {
  height: 22px;
}
.rd-txt-1 {
  font-size: 13px;
  font-weight: 500;
  padding-left: 8px;
  display: inline-block;
  width: 250px;
}
.rad-slct-1 {
  padding: 0px 0px 10px 0px;
}
.d-flex-tp {
  display: flex;
  align-items: center;
}
.sb-txt-1 {
  color: #999;
  font-size: 12px;
  line-height: 1;
}
.blk-gradient {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.post-close-btn {
  top: 5px;
  right: 3px;
  color: #999;
  cursor: pointer;
}
.btn-bx-wrp-1 {
  background: #fff;
  border-top: 1px solid #e4e4e4;
  padding: 20px 15px;
  float: left;
  width: 100%;
}
.whs-see-pst-bx {
  padding: 7px;
}
.pst-btn-tp-1 {
  height: 33px;
  width: 100%;
  margin: 0;
  float: left;
}
.loader {
  position: relative;
  right: 25%;
}
.news-fd-bx {
  position: relative;
}
.circle-loader {
  position: absolute;
  bottom: 1px;
  left: 54%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 5px solid rgba(0, 0, 0, 0.2);
  border-top: 5px solid #717171;
  animation: animate 1.5s infinite linear;
}
@keyframes animate {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@media screen and (max-width: 900px) {
  .md-button {
    width: 30.7%;
  }

  .btn-bx-wrp-1 {
    text-align: right;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    padding: 5px;
    float: left;
    width: 100%;
    padding-right: 20px;
    padding-bottom: 10px;
  }

  .create-post {
    border-radius: 0;
  }

  button.md-button.md-raised.md-primary.pst-btn-tp-1.md-theme-default {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .profile-default-text {
    top: 13px;
  }
  .post-bx-cnt-1 .md-field {
    margin-bottom: -13px !important;
  }
}

@media screen and (max-width: 600px) {
  .create-post {
    border-radius: 0px;
  }
  .profile-default-text {
    width: 33px;
    height: 33px;
    top: 10px;
  }
  .md-button.md-theme-default.md-primary {
    color: #213a63;
    color: var(--md-theme-default-primary-on-background, #213a63);
    margin-right: 0px;
    margin-left: 5px;
  }
  .btn-bx-wrp-1 {
    padding-right: 15px;
  }

  .post-bx-cnt-1 .md-field .md-textarea {
    font-size: 13px !important;
    padding-top: 12px;
  }
  .post-bx-cnt-1 .md-field .md-textarea::placeholder {
    font-size: 13px !important;
  }
  .post-bx-cnt-1 .md-field {
    margin-bottom: -4px !important;
  }
}

@media screen and (max-width: 300px) {
  .md-button {
    width: 47%;
  }
  .btn-bx-wrp-1 {
    padding-right: 14px;
  }

  .md-button.md-theme-default.md-primary {
    margin-left: 4px;
  }

  .post-bx-cnt-1 .md-field .md-textarea {
    font-size: 11px !important;
    padding-top: 11px;
  }
  .post-bx-cnt-1 .md-field .md-textarea::placeholder {
    font-size: 11px !important;
  }
}
</style>
