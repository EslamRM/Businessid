<template>
 
    <div class="d-flex layout chat-section row">
      <div class="chat-container">
        <div class="d-flex align-center to-avathar-top">
          <div class="to-avathar">John Doe</div>
        </div>
      <section ref="chatArea" class="chat-area">
        <p v-for="message in messages" class="message" :class="{ 'message-out': message.author === 'you', 'message-in': message.author !== 'you' }">
          {{ message.body }}
        </p>
        
      </section>
       <form @submit.prevent="sendMessage('out')" id="person2-form">
         <!--  <label for="person2-input">You</label>
          <input v-model="youMessage" id="person2-input" type="text" placeholder="Type your message">
          <button type="submit">Send</button> -->

          <div class="d-flex layout row chat-messaging">
            <section class="align-center">
              <div class="list-avatar">
                   <img src="@/assets/images/dp-160-160.jpg"/>
              </div>
                <div class="typing-area">
                    <md-field>
                    <label>Type a message...</label>
                    <md-textarea v-model="youMessage" id="person2-input" md-autogrow></md-textarea>
                    </md-field>
                  
                </div>
                <div class="file-upload">
                  <md-field>
                  <md-file v-model="single" />
                </md-field>
                </div>
                  <div class="send">
                   <md-button class="md-raised md-primary" type="submit"><i class="material-icons">send</i></md-button>
                 </div>

            </section>
            <div class="close-chat">
                    <md-button class="md-raised"><md-icon>speaker_notes_off</md-icon><span>Close Chat</span></md-button>
                 </div>
            
          </div>



        </form>
        <!--  <button @click="clearAllMessages">Clear All</button> -->
    </div>
    </div>
  


 
</template>
<script>
export default {
  data() {

    return {
       bobMessage: '',
       youMessage: '',
       messages: [
      {
        body: 'Welcome to the chat, I\'m Bob!',
        author: 'bob'
      },
      {
        body: 'Thank you Bob',
        author: 'you'
      },
      {
        body: 'You\'re most welcome',
        author: 'bob'
      }
    ]
    };
  },
methods: {
    sendMessage(direction) {
      if (!this.youMessage) {
        return
      }
      if (direction === 'out') {
        this.messages.push({body: this.youMessage, author: 'you'})
        this.youMessage = ''
       } 
      //  else if (direction === 'in') {
      //   this.messages.push({body: this.bobMessage, author: 'bob'})
      //   this.bobMessage = ''
      // } 
      else {
        alert('something went wrong')
      }
      // Vue.nextTick(() => {
      //   let messageDisplay = this.$refs.chatArea
      //   messageDisplay.scrollTop = messageDisplay.scrollHeight
      // })
    },
    clearAllMessages() {
      this.messages = []
    }
  }
};
</script>
<style scoped>
.head{
  font-size: 2.1em;
  font-weight: 600;
}
.chat-section{
      width: calc(100% - 300px);
}
.layout.row {
    -ms-flex-direction: row;
    flex-direction: row;
}
.chat-container{
  flex-basis: 100%;
  max-width: 100%;
  padding: 12px;
  border-left: 1px solid #d2d2d2;
}
.chat-area {
  background: white;
  height: 50vh;
  padding: 1em;
  overflow: auto;
  margin: 0 auto 2em auto;
}
.message {
  width: 45%;
  border-radius: 10px;
  padding: 0.9em;
  margin-bottom: .5em;
  font-size: 13px;
}
.message-out {
  background: #ff5722;
  color: white;
  margin-left: 50%;
}
.message-in {
  background: #f1f0f0;
  color: black;
}
.chat-inputs {
  display: flex;
  justify-content: space-between;
}
#person1-input {
  padding: .5em;
}
#person2-input {
  padding: .5em;  
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
.chat-messaging{
  padding: 1em;
}
.chat-messaging section{
     width: 100%;
    /* max-height: 76px!important; */
    /* min-height: 40px; */
    display: flex;
    /* flex-basis: 100%; */
    box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0px 0px 0px rgba(0,0,0,0.1);
    padding: 0.88em;
    border-radius: 20px;
}
.typing-area{
  width: 100%;
      margin-right: 1.5em;
}
.file-upload .md-field{
  margin: 0;
  position: relative;
}
.file-upload .md-field::before,.file-upload .md-field::after{
  opacity: 0;
}
.md-file .md-icon{
    position: absolute;
    right: 0;
}
.send .md-button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    min-width: 50px;
    background-color: #ff5722 !important;
}
.to-avathar-top{
  height: 50px;
  border-bottom: 1px solid #d2d2d2;
 
}
.to-avathar{
   font-size: 17px;
  font-weight: 600;
}
.close-chat .md-button{
   background-color: #fff !important;
   color: #ff5722 !important;
   height: 35px;
   margin-top: 1.8em;
}
.close-chat span{
  position: relative;
  top: 2px;
}
.close-chat .md-button .md-icon{
   color: #ff5722 !important;
}
  
</style>