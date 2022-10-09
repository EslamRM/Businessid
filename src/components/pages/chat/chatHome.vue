<template>
  <div>
      <div class="container chat-page">
         <div class="head">Chat</div>
        <div class="chat-wrap">
            <chatPeople></chatPeople>
            <chatBox></chatBox>
           
        </div>
      </div>
    
       <router-view></router-view>

  </div> 
</template>
<script>
import chatPeople from "./chatPeople";
import chatBox from "./chatBox";
export default {
  data() {
    return {
     
    };
  },
  components: {
    chatPeople,
    chatBox
  }
};
</script>
<style scoped>
.head{
  font-size: 2.1em;
  font-weight: 600;
}
.chat-page{
  margin-top: 3em;
}
.chat-wrap{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
  
</style>