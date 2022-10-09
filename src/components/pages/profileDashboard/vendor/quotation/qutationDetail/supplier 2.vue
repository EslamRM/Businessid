<template>
  <div>
    <div class="edit-profile-wrap">
      <section class="first-sec">
        <div class="people">
          <div class="list-avatar">
            <img src="https://www.uaect.com/assets/profile/logo-1.png" />
          </div>
          <div class="list-content">
            <div class="name">
              Erics Jackson
              <span>Supplier</span>
            </div>
            <div class="type">Company</div>
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
.people {
  height: 68px;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.list-avatar {
  display: flex;
  justify-content: center;
  min-width: 56px;
  margin-right: 1em;
}
.list-avatar img {
  border-radius: 50%;
  display: inline-flex;
  vertical-align: middle;
  height: 55px;
  width: 55px;
  object-fit: contain;
  border: 1px solid #eee;
}
.list-content {
  text-align: left;
  flex: 1 1 auto;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
.list-content .name {
  line-height: 1.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  font-weight: 600;
}
.list-content .name span {
  font-size: 11px;
  font-weight: 500;
  background-color: rgba(255, 87, 34, 0.22);
  padding: 0.45em;
  margin-left: 1em;
  border-radius: 4px;
}
.type {
  font-size: 13px;
  color: #888;
}
</style>