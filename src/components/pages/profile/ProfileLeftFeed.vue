<template>
  <div class="bx-tp-descWrap">
    <div class="bx-tp-desc-1">
      <div class="bx-tp-desc-hd-1">
        <i class="material-icons icn-st-1">account_box</i>
        <span class="txt-stl-1">About</span>
      </div>

      <div class="bx-tp-123">
        <table>
          <tr>
            <!-- <td>
                          <i class="material-icons done-mark">done</i>
                        </td> -->
            <td>
              <span class="span-st-1">Type:</span>
              <span class="span-st-2">{{ profile.profile.user_type }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="span-st-1">Location:</span>
              <span
                class="span-st-2"
                v-if="
                  profile.profile.city == null &&
                    profile.profile.country == null
                "
                >N/A</span
              >
              <span class="span-st-2" v-else>{{
                profile.profile.city + "," + profile.profile.country
              }}</span>
            </td>
          </tr>
          <!-- <tr>
            <td>
              <span class="span-st-1">Ownership:</span>
              <span class="span-st-2">Private Owner</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="span-st-1">Total Employees:</span>
              <span class="span-st-2">301 - 500 People</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="span-st-1">Total Annual Revenue:</span>
              <span class="span-st-2">confidential</span>
            </td>
          </tr> -->
          <tr>
            <td>
              <span class="span-st-1">Legal Status:</span>
              <span class="span-st-2">{{
                profile.profile.legal_status
                  ? profile.profile.legal_status
                  : "N/A"
              }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="span-st-1">Year Established:</span>
              <span class="span-st-2">{{
                profile.profile.established
                  ? profile.profile.established
                  : "N/A"
              }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="span-st-1">Activities:</span>
              <span class="span-st-2" v-if="profile.profile.activities.length">
                <span
                  v-for="(el, index) in profile.profile.activities"
                  :key="index"
                >
                  {{ el }}
                </span>
              </span>
              <span class="span-st-2" v-else>
                N/A
              </span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bx-tp-desc-1" v-if="ctshots">
      <div class="bx-tp-desc-hd-1">
        <i class="material-icons icn-st-1">photo_library</i>
        <span class="txt-stl-1">Media</span>
      </div>
      <div class="bx-tp-123">
        <ul class="grd-bx-1">
          <li class="grd-bx-itm" v-for="(shot, index) in ctshots" :key="index">
            <div v-if="index <= 11">
              <router-link
                class="grd-itm-lnk"
                v-if="shot.type == 'image'"
                :to="/shotsDetail/ + '' + shot.pk_post_file_id"
              >
                <div class="holder">
                  <img :src="shot.file" :alt="shot.title" class="grd-img-1" />
                </div>
              </router-link>

              <router-link
                class="grd-itm-lnk"
                v-else-if="shot.type == 'video'"
                :to="/video-detail/ + '' + shot.pk_post_file_id"
              >
                <div class="holder">
                  <img :src="shot.poster" alt class="grd-img-1" />
                </div>
                <span class="play-iconIn">
                  <i class="material-icons video-btn-1">play_arrow</i>
                </span>
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ProfileLeftFeed",
  data() {
    return {
      profileInfo: ""
    };
  },
  computed: {
    ...mapState({
      profile: state => state.profile.profilePage,
      ctshots: state => state.ctshot.ctshots
    })
  },
  created() {
    var i;

    const data = {
      page: 1,

      profileid: this.$route.params.id
    };
    this.$store.dispatch("Loadctshots", data);
  }
};
</script>

<style scoped>
.bx-tp-descWrap {
  display: flex;
  width: 100%;
  flex-direction: column;
  transition: all 0.3s ease-in;
}
.top-sticky .bx-tp-descWrap {
  padding-top: 8.6em;
}
.bx-tp-desc-1 {
  padding: 8px;
  background: #fff;
  border: 1px solid #efefef;
  margin-bottom: 8px;
  background: #fff;
  padding: 14px;
  -webkit-box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  box-shadow: 0 4px 12px 0 rgba(153, 153, 153, 0.2);
  border-radius: 12px;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
.bx-tp-desc-hd-1 {
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #efefef;
}
.txt-stl-1 {
  font-size: 15px;
  font-weight: 500;
  padding-left: 5px;
  color: #444;
}
.icn-st-1 {
  font-size: 21px;
  color: #213a63;
}
.done-mark {
  color: #ff5722;
  font-size: 16px;
  padding-right: 5px;
}
.span-st-1 {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.9);
}
.span-st-2 {
  color: rgba(0, 0, 0, 0.6);
  text-transform: capitalize;
}
.bx-tp-123 {
  padding-top: 11px;
}
.grd-bx-1 {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23%, 1fr));
  grid-gap: 7px;
}
.grd-bx-itm {
  display: block;
  position: relative;
  width: 100%;
}

.grd-bx-itm .holder {
  position: relative;
  flex: 75px;
  max-width: 75px;
  min-height: 75px;
  width: 100%;
  height: 100%;
}
.grd-img-1 {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  object-fit: cover;
  border-radius: 3px;
}
.bx-wrp-cntr-1 {
  padding-left: 25px;
  padding-right: 25px;
  margin-top: -8px;
}
table tr {
  margin-bottom: 0.33em;
  display: block;
}
.play-iconIn {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  transition: all 300ms;
  cursor: pointer;
  width: 25px;
  height: 25px;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12.5px;
  margin-left: -12.5px;
}
.video-btn-1 {
  color: #fff !important;
  font-size: 21px;
}
.grd-itm-lnk {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: relative;
}
@media screen and (max-width: 768px) {
  .nf-lft-bx,
  .nf-rgt-bx {
    display: none;
  }
  .bx-wrp-cntr-1 {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
