<template>
	<div>
      <div class="full-wrap result-wrap">
      <div class="container">
        <div class="head">Search result for <span>"mobile"</span></div>
        <div class="full-wrap">
          <div class="filter-chip  d-flex align-center">
            <div class="txt-head">Filter By:</div>
            <div class="chips"><md-chip md-clickable>Newest</md-chip></div>
            <div class="chips"><md-chip md-clickable>New User</md-chip></div>
            <div class="chips"><md-chip md-clickable>Message</md-chip></div>
            <div class="chips"><md-chip md-clickable>DS Market</md-chip></div>
            <div class="chips">
              <md-chip md-clickable>Follow Request</md-chip>
            </div>
          </div>
        </div>
      </div>
      </div>

	</div>


</template>

<script>
import { mapState } from "vuex";
export default {
  name:"searchResult",
  components: {

  },
  data () {
    return {


    }
  },
  methods:{

  },


  };




</script>
<style scoped>
.result-wrap {
  margin-top: 3.3em;
}
.head {
  font-size: 2.1em;
  font-weight: 600;
}
.txt-head {
  font-size: 13px;
  font-weight: 600;
  color: #888;
  margin-right: 0.5em;
}
.filter-chip {
  margin-top: 2em;
}
.chips {
  margin-right: 0.4em;
}
</style>
