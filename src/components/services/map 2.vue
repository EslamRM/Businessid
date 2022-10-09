<template>
  <div>

    <br />
    <gmap-map :center="center" :zoom="12" style="width:100%;  height: 400px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      >
      </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  props:['latitude','longitude'],
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      center: { lat:'', lng: ''},
      markers: [],
      places: [],
      currentPlace: null
    };
  },
created() {
    const lat = parseFloat(this.latitude);
    const lng = parseFloat(this.longitude)
    this.center.lat = lat
    this.center.lng = lng
     const marker = {
            lat:  lat,
            lng:  lng
          };
          this.markers.push({ position: marker });
},
};
</script>

<style scoped>
.autocomplete-input {
  padding: 8px;
  width: 100%;
  border: 1px solid #eaeaea;
}
.search-map {
  height: 20px;
  margin: 0px auto;
  display: block;
  margin-top: 13px;
}
</style>
