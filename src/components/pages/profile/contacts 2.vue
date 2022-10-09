<template>
  <div v-if="contactsData.profile">
    <div class="sectionBox">
      <h1 class="heroHead">Just say hello.</h1>
      <div class="row">
        <div class="col-md-6">
          <p class="txtMute">
            Feel free to get in touch with us. We are always open to discussing
            with you.
          </p>

          <div class="contactWrap">
            <div class="optionBox">
              <span>Mobile</span>
              <a href="" class="optionValue">
                {{
                  contactsData.profile.mobile != null
                    ? contactsData.profile.mobile
                    : "N/A"
                }}</a
              >
            </div>
            <div class="optionBox">
              <span>Phone</span>
              <a href="" class="optionValue">
                {{
                  contactsData.profile.phone != null
                    ? contactsData.profile.phone
                    : "N/A"
                }}</a
              >
            </div>
            <div class="optionBox">
              <span>E-mail</span>
              <a href="" class="optionValue">
                {{
                  contactsData.profile.email != null
                    ? contactsData.profile.email
                    : "N/A"
                }}</a
              >
            </div>
            <div class="optionBox">
              <span>Location</span>
              <div class="optionValue">
                {{
                  contactsData.profile.city != null
                    ? contactsData.profile.city
                    : "N/A"
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <form>
            <md-field>
              <label>Enter your name *</label>
              <md-input v-model="type"></md-input>
            </md-field>
            <md-field>
              <label>Enter your email *</label>
              <md-input v-model="type"></md-input>
            </md-field>
            <md-field>
              <label>Enter your phone *</label>
              <md-input v-model="type"></md-input>
            </md-field>
            <md-field>
              <label>Leave a message for us *</label>
              <md-textarea v-model="textarea"></md-textarea>
            </md-field>
            <md-button class="md-raised md-primary send-btn">
              Send
            </md-button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    contactsData: {
      profile: null
    },
    inline: null,
    type: "",
    textarea: null
  }),
  methods: {
    async loadAboutProfile(id) {
      this.$Progress.start();
      const response = await axios.post("profile", {
        profileid: id
      });
      if (!response.data) return;
      this.$Progress.finish();
      this.contactsData = response.data;
    }
  },
  created() {
    const id = this.$route.params.id;
    this.loadAboutProfile(id);
  }
};
</script>
<style scoped>
.sectionBox {
  background: #fff;
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  padding: 30px;
  margin: 0 auto;
  margin-top: 10px;
  max-width: 960px;
  width: 100%;
}
.heroHead {
  font-size: 2.6em;
  color: #333;
  letter-spacing: -1.2px;
}
.txtMute {
  color: #888;
  line-height: 1.7em;
  vertical-align: text-top;
  margin-top: 15px;
}
.optionBox {
  margin-top: 30px;
}
.optionBox span {
  display: block;
  color: #aaa;
  font-size: 0.75em;
  padding-bottom: 1.1em;
}
.optionValue {
  color: #333 !important;
  font-weight: 600;
  font-size: 17px;
}
form {
  max-width: 360px;
  margin: 0 auto;
  width: 100%;
}
.send-btn.md-button {
  height: 35px;
  margin-top: 0px;
}

@media screen and (max-width: 768px) {
  .heroHead {
    font-size: 28px;
  }
  .sectionBox {
    border-radius: 0px;
  }
}

@media screen and (max-width: 600px) {
  .md-field.md-focused .md-input,
  .md-field.md-focused .md-textarea,
  .md-field.md-has-value .md-input,
  .md-field.md-has-value .md-textarea {
    font-size: 13px !important;
  }

  .md-field + .md-has-textarea:not(.md-autogrow) {
    margin-top: 40px !important;
  }

  .md-field .md-input::-webkit-input-placeholder,
  .md-field .md-textarea::-webkit-input-placeholder {
    font-size: 13px !important;
  }

  .md-field .md-input::placeholder,
  .md-field .md-textarea::placeholder {
    font-size: 13px !important;
  }

  .md-field .md-input,
  .md-field .md-textarea {
    font-size: 13px !important;
  }

  .heroHead {
    font-size: 13px;
    font-weight: 500;
  }

  .sectionBox {
    padding: 15px;
  }

  .optionValue {
    font-size: 12px;
    font-weight: 500;
  }
  .optionBox {
    margin-top: 20px;
  }

  .md-field.md-theme-default {
    min-height: 40px;
    margin-bottom: 10px;
  }

  .txtMute {
    font-size: 12px;
  }
  .md-button.md-theme-default.md-raised:not([disabled]).md-primary {
    margin-left: 0px;
    margin-top: 10px;
  }
}
</style>
