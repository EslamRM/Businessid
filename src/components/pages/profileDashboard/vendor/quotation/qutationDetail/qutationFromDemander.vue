<template>
  <div>
    <div class="profile-dashbord-box">
      <div class="container">
        <div class="prof-dash-bord-bx mrg-t-10">
          <div class="lst-box-tp-1">
            <div>
              <Demander></Demander>
              <ProductDetail></ProductDetail>
              <Supplier></Supplier>
              <QutationForm></QutationForm>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Demander from "./demander";
import ProductDetail from "./productDetail";
import Supplier from "./supplier";
import QutationForm from "./qutationForm";
export default {
  components: {
    Demander,
    ProductDetail,
    Supplier,
    QutationForm

  }
};
</script>
<style scoped>
.prof-dash-bord-bx {
 /* min-height: 90vh;*/
  display: flex;
  align-items: center;
  text-align: center;
}
.lst-box-tp-1 {
  margin: 0 auto;
}
</style>
