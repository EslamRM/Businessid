<template>
  <div>
    <div class="container">
      <div class="text-center">
        <div class="headerTitle">
          <h2>Saved Items</h2>
        </div>
        <div class="item" v-for="index in 10" :key="index">
          <div class="imgAd">
            <img
              src="https://via.placeholder.com/150"
              alt=""
              class="feedImageView"
            />
          </div>
          <div class="desc">
            <div class="title">
              <h3>
                You can type lorem and then tab and it will expand into a
                paragraph
              </h3>
            </div>
            <div class="postBy mt-5">
              <img src="https://via.placeholder.com/25" alt="" />
              <span>Saved from user post</span>
            </div>
            <div class="actions mt-3">
              <button type="">Use As Ad</button>
              <button type="">
                <i class="material-icons">
                  reply
                </i>
              </button>
              <button type="">
                <i class="material-icons">
                  delete
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "savedItems"
};
</script>
<style>
.headerTitle {
  background: #fff;
  display: flex;
  align-items: left;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #eee;
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
}
.item {
  background: #fff;
  display: flex;
  align-items: left;
  justify-content: center;
  padding: 10px;
  margin: 10px;
  border: 1px solid #eee;
  border-radius: 15px;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 5%);
}
.item .imgAd {
  width: 150px;
  margin: 0 10px 0 0;
}
.item .imgAd img {
  border-radius: 15px;
}
.item .desc {
  margin-right: auto;
  text-align: left;
  line-height: 1.5;
  padding: 10px;
}
.item .postBy {
  font-size: 12px;
}
.item .postBy img {
  border-radius: 50%;
}
.item .actions {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.item .actions button {
  border: 0;
  padding: 5px 15px;
  background: #ddd;
  border-radius: 10px;
  margin-right: 3px;
}
.item .actions button:hover {
  background: #ccc;
}
.item .actions i {
  font-size: 17px;
}
</style>
