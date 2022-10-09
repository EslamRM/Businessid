<template>
  <div >
    <md-checkbox  @change="property_category()"  >{{
      items.name
    }}</md-checkbox>
   
  </div>
</template>
<script>
export default {
  props: ["items"],
  data() {
    return {
       
        name: '',
    };
  },

  methods: {
    property_category(event){
        // this.ischecked = false;
        this.$emit('changeCategory',name)
        
        //this.name='';
        console.log(this.name)
     
    }
  }
};
</script>
<style scoped>
.secondLevel {
  padding-left: 10px;
}
</style>
