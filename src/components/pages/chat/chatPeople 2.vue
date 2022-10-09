<template>
  <div>
    <div class="search">
      <md-field>
        <label>Search</label>
        <md-input v-model="voice"></md-input>
        <md-icon>search</md-icon>
      </md-field>
    </div>
    <div class="chat-people-wrap chat-nav-drawer">
      <div class="list" :key="people.userID" v-for="people in peoples">
        <div class="people">
          <div class="list-avatar">
            <img :src="require(`../../../assets/images/${people.picture}`)" />
          </div>
          <div class="list-content">
            <div class="name">{{people.name}}</div>
          </div>
          <div class="d-flex align-center text-center count">
            <md-button class="md-primary">{{ people.messageCount }}</md-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "Lists",
      peoples,
    };
  },
  components: {},
};

let peoples = [
  {
    userID: 1,
    name: "Ijaz NP",
    picture: "dp-40-40.jpg",
    messageCount: 5,
  },
  {
    userID: 2,
    name: "John Doe",
    picture: "dp-40-40.jpg",
    messageCount: 2,
  },
  {
    userID: 2,
    name: "John Doe",
    picture: "dp-40-40.jpg",
    messageCount: 2,
  },
  {
    userID: 2,
    name: "John Doe",
    picture: "dp-40-40.jpg",
    messageCount: 2,
  },
  {
    userID: 2,
    name: "John Doe",
    picture: "dp-40-40.jpg",
    messageCount: 2,
  },
];
</script>
<style scoped>
.search {
  margin-top: 1em;
}
.chat-nav-drawer {
  /* height: calc(100vh - 200px)!important;*/
}
.chat-people-wrap {
  width: 300px;
  left: 0;
  max-width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: auto;
  top: 0;
}
.people {
  height: 68px;
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 7px;
}
.list-avatar {
  display: flex;
  justify-content: flex-start;
  min-width: 56px;
}
.list-avatar img {
  border-radius: 50%;
  display: inline-flex;
  vertical-align: middle;
  height: 40px;
  width: 40px;
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
  line-height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  font-weight: 600;
}
.count {
  justify-content: flex-end;
}
.count .md-button {
  height: 25px !important;
  width: 25px !important;
  border-radius: 50%;
  min-width: 25px;
  background-color: #ff5722;
  padding: 0;
  color: #fff;
}
</style>