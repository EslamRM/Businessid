<template>
  <div>
    <div class="edit-profile-wrap">
      <section class="first-sec">
        <div class="order-wrap">
          <div class="order-item">
            <figure class="order-img">
              <img src="https://www.uaect.com/assets/demands/ct_ds_19May2019175712_mm31oiij3L.jpg" />
            </figure>
            <div class="right">
              <div class="title">MOBILE PHONE ACCESSORIES</div>
              <div class="detail">
                Product Name:
                <span>Mobile</span>
              </div>
              <div class="detail">
                Brand:
                <span>Apple</span>
              </div>
              <div class="detail">
                Unit Price/unit:
                <span>AED 1500</span>
              </div>
              <div class="detail">
                Minimum Order:
                <span>Piece</span>
              </div>
              <div class="detail">
                Availability:
                <span>From 19 05 2019 to 1 Dec 2019</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.order-wrap {
  width: 100%;
  padding: 0;
}
.order-item {
  display: flex;
  padding-top: 10px;
  width: 100%;
}
.order-wrap figure {
  flex: 0 0 26%;
  text-align: center;
  margin-right: 1.5em;
}
.order-wrap figure img {
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
}

.right .title {
  font-size: 13px;
  font-weight: 500;
  background: #ccc;
  border-radius: 6px;
  padding: 5px;
  margin-bottom: 1em;
  float: left;
}
.right .detail {
  font-size: 13px;
  color: #888;
  margin-top: 0.3em;
  text-align: left;
  width: 100%;
  float: left;
}
.right .detail span {
  color: #333;
  font-weight: 500;
}
.action-right {
  display: block;
  align-self: center;
  text-align: left;
}
.action-right .price {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0.3em;
}
.price.vat {
  font-size: 14px;
}
.status {
  background: #fbd5c9;
  padding: 5px 7px;
  border-radius: 4px;
}
.edit-status {
  display: flex;
  align-items: center;
  margin-top: 1em;
}
.edit-ico {
  border-radius: 4px;
  width: 30px;
  height: 30px;
  background: rgba(56, 174, 4, 0.2);
  align-items: center;
  line-height: 30px;
  color: #38ae04 !important;
  margin-right: 0.3em;
  font-size: 21px;
}
</style>