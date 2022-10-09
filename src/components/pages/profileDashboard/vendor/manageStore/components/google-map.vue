<template>
  <div>
    <div>
      <label>
        <gmap-autocomplete
          class="autocomplete-input"
          @keyup.enter="setPlace"
          @place_changed="setPlace"
        >
        </gmap-autocomplete>
        <!-- <md-button
          class="md-raised md-primary pst-btn-tp-1 search-map"
          @click="addMarker"
          >Add</md-button> -->
      </label>
      <br />
    </div>
    <div class="d-flex">
      <div class="error" v-if="showMaperror">
        <div class="inner">
          <span class="">{{ mapErrorText }}</span>
          <i class="material-icons close-error" @click="showMaperror = false">
            close
          </i>
        </div>
      </div>
      <div v-if="locateButton">
        <md-button
          class="md-button md-raised md-accent currentLoc"
          @click="locateMe"
        >
          <div class="ktPulse pos-rel">
            <i class="md-icon md-icon-font">gps_fixed</i>
            <span class="map kt-pulse__ring"></span>
          </div>
          <span class="txtbtn">Locate Me</span>
        </md-button>
      </div>
    </div>
    <gmap-map
      @click="click($event)"
      :center="autoSetMarker.lat ? autoSetMarker : center"
      :zoom="12"
      style="width: 100%"
      :style="{ height }"
    >
      <gmap-marker
        v-if="autoSetMarker.lat"
        :position="autoSetMarker"
        :option="MarkerOptions"
        @click="toggleInfoWindow(m, index)"
      />
      <gmap-marker
        v-else
        v-for="(m, index) in markers"
        :key="index"
        :position="m.position"
        :option="MarkerOptions"
        @click="toggleInfoWindow(m, index)"
      />
      <gmap-info-window
        :options="infoOptions"
        :position="autoSetMarker.lat ? autoSetMarker : infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <div v-if="autoSetActive" v-html="autoSetInfo || infoContent"></div>
        <div v-else v-html="infoContent"></div>
      </gmap-info-window>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props: {
    locateButton: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: "400px"
    },
    autoSetMarker: {
      type: Object
    },
    autoSetInfo: {
      type: String
    }
  },
  data () {
    return {
      showMaperror: false,
      mapErrorText: "",
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat: 45.508, lng: -73.587 },
      markers: [],
      places: [],
      currentPlace: null,
      infoContent: "asas",
      infoWindowPos: {
        lat: "",
        lng: ""
      },
      infoWinOpen: true,
      currentMidx: null,
      fullscreenControl: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      MarkerOptions: {
        zIndex: 999999,
        opacity: 0.2
      },
      autoSetActive: true,
    };
  },

  mounted () {
    this.geolocate();
  },


  methods: {
    locateMe () {
      this.showMaperror = false;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError
        );
      } else {
        this.showMaperror = true;
        this.mapErrorText = "Geolocation is not supported by this browser.";
        return;
      }
    },
    showPosition (position) {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const marker = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({ latLng: marker }, (result, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.$emit("mapHandler", result[0]);

          this.markers = [];
          this.markers.push({ position: marker });
          this.places.push(result[0]);
          this.center = marker;
          this.currentPlace = null;
          this.infoWindowPos = marker;
          this.infoContent = this.getInfoWindowContent(
            result[0].formatted_address
          );
        } else {
          console.log("false");
        }
      });
    },
    showError (error) {
      this.showMaperror = true;

      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.mapErrorText = "Please allow your browser to send your location";
          break;
        case error.POSITION_UNAVAILABLE:
          this.mapErrorText = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.mapErrorText = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.mapErrorText = "An unknown error occurred.";
          break;
      }
    },
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.position;
      this.infoContent = this.getInfoWindowContent(marker);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    getInfoWindowContent: function (marker) {
      console.log("clg");
      console.log(marker);
      return `<div class="">
          <div>
            <div>

                ${marker}

            </div>

          </div>
        </div>`;
    },

    click (event) {
      // clear Pre-Selected autoSetMarker & It's Info and mark a new marker
      this.$emit("update:autoSetMarker", {});
      this.autoSetActive = false;

      this.infoWinOpen = true;
      console.log(event, "google map event");
      var self = this;
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({ latLng: event.latLng }, (result, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          // accessing autocomplete reference and populating the address

          this.$emit("mapHandler", result[0]);

          const marker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          };
          console.log(result[0]);
          this.infoWindowPos = marker;
          this.infoContent = this.getInfoWindowContent(
            result[0].formatted_address
          );
          this.$emit("update:autoSetInfo", result[0].formatted_address);
          this.markers = [];
          this.markers.push({ position: marker });
          this.places.push(result[0]);
          this.center = marker;
          this.currentPlace = null;
        }
      });
      // const marker = {
      //   lat: event.latLng.lat(),
      //   lng: event.latLng.lng()
      // };
      // this.markers = [];
      // this.markers.push({ position: marker });
      // this.places.push(this.currentPlace);
      // this.center = marker;
      // this.currentPlace = null;
    },
    locate () {
      console.log("object");
    },
    usePlace (place) {
      console.log("object");
    },
    updateCoordinates (event) {
      // console.log(event);
    },
    // receives a place object via the autocomplete component
    setPlace (place) {
      this.showMaperror = false;
      this.mapErrorText = "";
      const data = place.address_components;

      if (data.length == 1) {
        this.showMaperror = true;
        this.mapErrorText = "Please search for an area in your city";
        return false;
      }
      this.infoWinOpen = true;
      this.currentPlace = place;

      if (this.currentPlace != null) {
        this.$emit("mapHandler", this.currentPlace);
        if (this.currentPlace) {
          const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
          };
          this.infoWindowPos = marker;

          this.infoContent = this.getInfoWindowContent(place.formatted_address);
          this.markers.push({ position: marker });
          this.places.push(this.currentPlace);

          this.center = marker;
          this.currentPlace = null;
        }
      }
    },
    addMarker () {
      //   if (this.currentPlace != null) {
      //     this.$emit("mapHandler", this.currentPlace);
      //     console.log(this.currentPlace);
      //     if (this.currentPlace) {
      //       const marker = {
      //         lat: this.currentPlace.geometry.location.lat(),
      //         lng: this.currentPlace.geometry.location.lng()
      //       };
      //       this.markers.push({ position: marker });
      //       this.places.push(this.currentPlace);
      //       this.center = marker;
      //       this.currentPlace = null;
      //     }
      //   }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>

<style scoped>
.locate-me {
  position: absolute;
  z-index: 1000;
}
.autocomplete-input {
  padding: 8px;
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: 0.25em;
}
.autocomplete-input:active,
.autocomplete-input:focus {
  outline: 0;
  border: 1px solid #213a63;
}
.search-map {
  height: 20px;
  margin: 0px auto;
  display: block;
  margin-top: 13px;
}

.gm-style-mtc {
  display: none;
}
.currentLoc {
  height: 40px;
  position: absolute;
  z-index: 2000;
  margin-top: 0px;
  display: flex;
  align-items: center;
  border-radius: 19px;
  right: 15px;
  text-transform: capitalize;
  font-size: 15px;
  padding: 0;
  top: 4.3em;
}
.txtbtn {
  position: relative;
  top: -7px;
  left: -5px;
}
.ktPulse {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.ktPulse i {
  margin: 0 auto !important;
}
.map.kt-pulse__ring {
  border-color: #ffffff;
}
.lauoutWrap {
  display: flex;
  justify-content: space-between;
}
.close-error {
  font-size: 14px;
  cursor: pointer;
}
.error {
  position: absolute;
  z-index: 1000;
  top: 62px;
  width: 500px;
  left: 2.5%;
  right: 2.5%;
  background-color: rgba(253, 236, 236, 0.97);
  color: rgb(203, 117, 128);
  box-shadow: rgba(0, 0, 0, 0.03) 0px 2px 3px 0px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(251, 211, 216);
  border-image: initial;
}
.error .inner {
  position: relative;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 11px;
}
</style>
