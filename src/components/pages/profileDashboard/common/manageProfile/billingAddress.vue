<template>
  <div>
    <div class="edit-profile-wrap">
      <p class="info">Update your billing adress to make on time delivery. Report Us support@uaect.com</p>
      
      <section class="first-sec">
        <div class="head">Contact Person / Number</div>
         <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-33">
          <md-field>
            <label class="form-label">Name</label>
            <md-input v-model="productName" required></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>        
        <div class="md-layout-item md-size-33">
          <md-field>
            <label class="form-label">Mobile Number</label>
            <md-input v-model="productName" required></md-input>
            <span class="md-error">There is an error</span>
          </md-field>
        </div>
      </div>
        
      </section>


      <section>
        <div class="head">Address Details</div>
        <div class="md-layout md-gutter">
          <div class="md-layout-item  md-size-33">
                <md-field>
                  <label for="food">Country</label>
                  <md-select v-model="country" name="country" id="country">
                    <md-option value="australia">UAE</md-option>
                    <md-option value="brazil">Brazil</md-option>
                    <md-option value="japan">Japan</md-option>
                    <md-option value="united-states">United States</md-option>
                  </md-select>
                </md-field>
             </div>
             <div class="md-layout-item  md-size-33">
                <md-field>
                  <label for="food">City</label>
                  <md-select v-model="City" name="country" id="country">
                    <md-option value="australia">Dubai</md-option>
                    <md-option value="brazil">Abu Dhabi</md-option>
                    <md-option value="japan">Sharjah</md-option>
                    <md-option value="united-states">Ajman</md-option>
                  </md-select>
                </md-field>
             </div>
             <div class="md-layout-item  md-size-33">
                <md-field>
                  <label for="food">Area</label>
                  <md-select v-model="City" name="country" id="country">
                    <md-option value="australia">Dubai</md-option>
                    <md-option value="brazil">Abu Dhabi</md-option>
                    <md-option value="japan">Sharjah</md-option>
                    <md-option value="united-states">Ajman</md-option>
                  </md-select>
                </md-field>
             </div>
             <div class="md-layout-item md-size-33">
              <md-field>
                <label class="form-label">Street Name</label>
                <md-input v-model="productName" required></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
             <div class="md-layout-item md-size-33">
              <md-field>
                <label class="form-label">Building / Villa No</label>
                <md-input v-model="productName" required></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-33">
              <md-field>
                <label class="form-label">Room No </label>
                <md-input v-model="productName" required></md-input>
                <span class="md-error">There is an error</span>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100 map">
               <label class="form-label label-color">Map Route (Drag to update map location)</label>
             
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231281.63945897442!2d55.08732131791731!3d25.075593221539574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai!5e0!3m2!1sen!2sae!4v1563288431346!5m2!1sen!2sae" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>
               
            </div>
             
        </div>
        
      </section>

      <div class="btn-wrap text-center">
        <md-button class="md-raised md-accent">Save Changes</md-button>
      </div>
      
      
    </div>
  	
   
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio: false,
      single: null,
      multiple: null
    }
  },
};
</script>
<style scoped>
section{
  margin-bottom: 1.5em;
}
.first-sec{
  margin-top: 1.5em;
}
section .head{
  font-size: 14px;
  font-weight: 600;
}
.info{
  text-align: center;
  color: #ff5722;
}
.btn-wrap .md-button{
  height: 37px;
}
section .area{
  margin-top: 16px; 
}
.map{
  margin-top: 1.5em;
}
.label-color{
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
}
.map iframe{
  outline: none;
  margin-top: 1.5em;
}

</style>