<template>
  <div>
    <div v-if="aboutProfile.profile">
      <div class="sectionBox intro">
        <div class="heroHead">
          {{ aboutProfile.profile.trade_name_en }}
          <span class="material-icons">verified_user</span>
        </div>
        <div class="introWrap">
          <ul>
            <li>
              <span><i class="material-icons">location_on</i></span>
              <div class="right">
                <div class="introType">Country / Region:</div>
                <div class="introValue">
                  {{
                    aboutProfile.profile.country
                      ? aboutProfile.profile.country
                      : "N/A"
                  }}
                </div>
              </div>
            </li>
            <li>
              <span><i class="material-icons">restore</i></span>
              <div class="right">
                <div class="introType">Year Established:</div>
                <div class="introValue">
                  {{
                    aboutProfile.profile.established
                      ? aboutProfile.profile.established
                      : "N/A"
                  }}
                </div>
              </div>
            </li>
            <li>
              <span><i class="material-icons">portrait</i></span>
              <div class="right">
                <div class="introType">Business Type:</div>
                <div class="introValue" v-if="aboutProfile.profile.activities">
                  <div
                    v-for="(activity, index) in aboutProfile.profile.activities"
                    :key="index"
                  >
                    {{ index == 0 ? activity : "" }}
                  </div>
                </div>
                <div class="introValue" v-else>N/A</div>
              </div>
            </li>
            <li>
              <span><i class="material-icons">category</i></span>
              <div class="right">
                <div class="introType">Main Products:</div>
                <div class="introValue" v-if="aboutProfile.profile.activities">
                  <div
                    v-for="(activity, index) in aboutProfile.profile.activities"
                    :key="index"
                  >
                    {{ activity }}
                  </div>
                </div>
                <div class="introValue" v-else>
                  N/A
                </div>
              </div>
            </li>
            <li>
              <span><i class="material-icons">grade</i></span>
              <div class="right">
                <div class="introType">Rating:</div>
                <div class="introValue">{{ aboutProfile.profile.rating }}</div>
              </div>
            </li>
            <li>
              <span><i class="material-icons">language</i></span>
              <div class="right">
                <div class="introType">Website:</div>
                <div class="introValue">
                  {{
                    aboutProfile.profile.website
                      ? aboutProfile.profile.website
                      : "N/A"
                  }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="sectionBox">
        <div class="titleHead">Overview</div>
        <p class="summaryTxt">
          {{
            aboutProfile.profile.description_en
              ? aboutProfile.profile.description_en
              : "N/A"
          }}
        </p>
      </div>
      <div class="sectionBox">
        <div class="titleHead">User Info</div>
        <table class="tableBox">
          <tr class="row">
            <td class="first col-md-3">First Name :</td>
            <td class="second col-md-9">
              {{
                aboutProfile.profile.first_name_en
                  ? aboutProfile.profile.first_name_en
                  : "N/A"
              }}
            </td>
          </tr>
          <tr class="row">
            <td class="first col-md-3">Last Name :</td>
            <td class="second col-md-9">
              {{
                aboutProfile.profile.last_name_en
                  ? aboutProfile.profile.last_name_en
                  : "N/A"
              }}
            </td>
          </tr>

          <tr class="row" v-if="aboutProfile.profile.user_type == 'company'">
            <td class="first col-md-3">Register Number (Profile ID) :</td>
            <td class="second col-md-9">
              {{
                aboutProfile.profile.unique_id != null
                  ? aboutProfile.profile.unique_id
                  : "N/A"
              }}
            </td>
          </tr>
          <tr class="row">
            <td class="first col-md-3">Gender</td>
            <td class="second col-md-9">
              {{
                aboutProfile.profile.gender
                  ? aboutProfile.profile.gender
                  : "N/A"
              }}
            </td>
          </tr>
          <tr class="row">
            <td class="first col-md-3">DOB</td>
            <td class="second col-md-9">
              {{ aboutProfile.profile.DOB ? aboutProfile.profile.DOB : "N/A" }}
            </td>
          </tr>
          <tr class="row">
            <td class="first col-md-3">Nationality</td>
            <td class="second col-md-9">
              {{
                aboutProfile.profile.nationality
                  ? aboutProfile.profile.nationality
                  : "N/A"
              }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "aboutProfile",
  data() {
    return {
      aboutProfile: {
        profile: null
      }
    };
  },
  created() {
    const id = this.$route.params.id;
    this.loadAboutProfile(id);
  },
  methods: {
    async loadAboutProfile(id) {
      this.$Progress.start();
      const response = await axios.post("profile", {
        profileid: id
      });
      if (!response.data) return;
      this.$Progress.finish();
      this.aboutProfile = response.data;
    },
    mainProducts() {
      if (
        !this.aboutProfile.profile.activities ||
        !(this.aboutProfile.profile.activities.length > 0)
      )
        return "";
      const activities = this.aboutProfile.profile.activities;
      const stringArray = activities.map(element => element.text);
      return stringArray.join().replaceAll(",", ", ");
    }
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
  padding-top: 20px;
}
.heroHead {
  font-size: 2.11rem;
  font-weight: 600;
  overflow-wrap: break-word;
  word-wrap: break-word;
  text-align: center;
  padding-bottom: 19px;
  border-bottom: 1px solid #dbe3ef;
  display: flex;
  justify-content: center;
}
.heroHead span {
  color: #ff5722;
  font-size: 21px;
  margin-left: 3px;
  display: block;
}
.introWrap {
  width: 100%;
  margin-top: 1.9em;
}
.introWrap ul {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(227px, 1fr));
  grid-gap: 30px;
}
.introWrap li span {
  width: 60px;
  height: 60px;
  align-items: center;
  border: 1px solid;
  border-color: #dae2ed;
  border-radius: 100%;
  display: flex;
  justify-content: center;
}
.introWrap li span i {
  font-size: 34px;
  color: #ff5722;
}
.introWrap li {
  display: inline-flex;
  align-items: center;
  display: flex;
}
.introWrap li .right {
  flex: 1;
  margin-left: 12px;
}
.introType,
.introValue {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.4;
}
.introValue {
  color: #888;
  font-weight: 500;
}
.titleHead {
  font-size: 18px;
  font-weight: 600;
  color: #333332;
  padding-bottom: 1.1em;
}
.tableBox {
  width: 100%;
  border-collapse: collapse;
}
.tableBox .row {
  padding-bottom: 16px;
}
.first {
  color: #878787;
  padding-right: 8px;
}
.second {
  line-height: 1.4;
  word-break: break-word;
  color: #212121;
}
.summaryTxt {
  color: #878787;
  line-height: 1.4;
}

@media screen and (max-width: 768px) {
  .sectionBox {
    border-radius: 0px;
  }
}

@media screen and (max-width: 600px) {
  .introWrap li span i {
    font-size: 18px;
    color: #ff5722;
  }
  .introWrap li span {
    width: 30px;
    height: 30px;
  }

  .introWrap ul {
    grid-gap: 16px;
  }

  .sectionBox {
    padding-bottom: 20px;
    padding: 15px;
  }

  .heroHead {
    font-size: 13px;
    padding-bottom: 12px;
    font-weight: 400;
  }
  .sectionBox {
    padding-top: 15px;
  }
  .introWrap {
    margin-top: 1.3em;
  }
  .heroHead span {
    font-size: 13px;
  }

  .introType,
  .introValue {
    font-size: 12px;
    font-weight: 400;
  }
  .titleHead {
    font-size: 13px;
    font-weight: 400;
  }

  .first {
    font-size: 13px;
  }
  .second {
    font-size: 13px;
  }
}
</style>
