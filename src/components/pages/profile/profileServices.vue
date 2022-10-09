<template>
  <div >
    <Service> </Service>   
    
  </div>
</template>
<script>
import Service from '../../ctcomponents/services/service'

export default {
  name: "ProfileService",
data() {
  return {
    page: 1,
    busy: false,
    showLoader: true,
  }
},
  components: {
    Service
  },
  methods: {
    loadMore()
    {
      this.page++;
      console.log("loadmore");
     
      this.showLoader = true;
      this.busy = true;
      this.$store
        .dispatch("LoadProducts", this.page)
        .then(response => {
          this.showLoader = false;
          if (response.success) {
            this.busy = false;
          }
        })

        .catch(error => {
          this.busy = false;
          this.showLoader = false;
        });
    }
  },
};
</script>
<style scoped>
</style>

