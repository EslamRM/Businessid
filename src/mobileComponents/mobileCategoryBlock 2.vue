<template>
  <div>
    <div class="GridBlockTp1">
      <div class="row">
        <div class="col-sm-3 wrapper_categories">
          <router-link :to="{ name: 'demands' }">
            <div class="GridBlockTp1Grid">
              <img src="../assets/images/mobile/grid1.png" alt="" />
              <div>All</div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-3 wrapper_categories">
          <router-link :to="{ name: 'demands' }">
            <div class="GridBlockTp1Grid">
              <img src="../assets/images/mobile/grid2.png" alt="" />
              <div>Products</div>
            </div>
          </router-link>
        </div>
         <div class="col-sm-3 wrapper_categories">
          <router-link :to="{ name: 'autos' }">
            <div class="GridBlockTp1Grid">
              <img src="../assets/images/mobile/grid5.png" alt="" />
              <div>Autos</div>
            </div>
          </router-link>
        </div>
        
        <div class="col-sm-3 wrapper_categories">
          <router-link :to="{ name: 'properties' }">
            <div class="GridBlockTp1Grid">
              <img src="../assets/images/mobile/grid4.png" alt="" />
              <div>Property</div>
            </div>
          </router-link>
        </div>
       <!-- <div class="col-sm-4 wrapper_categories">
          <router-link :to="{ name: 'services' }">
            <div class="GridBlockTp1Grid">
              <img src="../assets/images/mobile/grid3.png" alt="" />
              <div>Services</div>
            </div>
          </router-link>
        </div>
        <div class="col-sm-4 wrapper_categories">
          <router-link :to="{ name: '#' }">
            <div class="GridBlockTp1Grid">
              <img src="../assets/images/mobile/grid6.png" alt="" />
              <div>Foods</div>
            </div>
          </router-link>
        </div> -->
      </div>
    </div>
  </div>
</template>
<style scoped>
.GridBlockTp1 {
  padding: 15px 15px;
  font-size: 9px;
  text-align: center;
  margin-bottom: 5px;
  background: #fff;
}
.GridBlockTp1Grid img {
  width: 100%;
}
.GridBlockTp1 .col-md-2 {
  flex: 0 0 20%;
  max-width: 20%;
}
.GridBlockTp1Grid div {
  padding: 10px 0px;
  line-height: 13px;
}

@media screen and (max-width: 1000px) {
  .GridBlockTp1Grid img {
    width: 70px;
    padding-top: 14px;
  }

  .GridBlockTp1Grid div {
    line-height: 17px;
    font-size: 14px;
  }
  .HorizontalSliderItem {
    margin: 8px 4px;
  }
}

@media screen and (max-width: 600px) {
  .GridBlockTp1Grid img {
    width: 44px;
    padding-top: 3px;
  }

  .GridBlockTp1Grid {
    line-height: 15px;
    font-size: 13px;
  }
  .wrapper_categories {
    width: 125px;
    margin-bottom: 10px;
  }
  .GridBlockTp1 {
    padding-bottom: 5px;
  }
}
@media screen and (max-width:420px) {
  .wrapper_categories {
    /* width: 33.3%; */
    width: 25%;
  }
}




@media screen and (max-width: 360px) {
  .wrapper_categories {
    /* width: 33.3%; */
    width: 25%;
  }
}





@media screen and (max-width: 300px) {
  .wrapper_categories {
    width: 98px;
    margin-bottom: 10px;
    margin-left: 0px;
    padding-left: 8px;
  }
}







</style>
