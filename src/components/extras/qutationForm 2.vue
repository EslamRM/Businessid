<template>
  <div>
    <div class="container bg_wrapper">  
      <div class="qutation-wrap">
        <div class="head">Ask For Quotation</div>
          <div class="qutation-form col-sm-12" v-for="item in qutationItem" :key="item">
            <div class="company-detail col-sm-12 ">
              <i class="material-icons">person_outline</i>
               {{ item.companyTitle}}
            </div>
<!--------------->
<div class=" wrapper-date col-sm-12 fl pl-0 pr-0 ">
<div class="row_margin">
 <div class="wrap-date col-sm-12 pl-0 pr-0 ">           
<template>
  <div>
  <div class="col-sm-12 col-md-4 fl pr-3 pl-5">
   <md-datepicker v-model="selectedDate" >
      <label>Delivery date</label>
    </md-datepicker>
 </div>
<div class="col-sm-12 col-md-4  fl pr-5 pl-5">
  <div class="md-layout md-gutter">
 <md-field>
          <label for="font">Payment Options</label>
          <md-select v-model="Payment" name="Payment" id="Payment">
           <md-option value="Cash">Cash</md-option>
<md-option value="Cheque">Cheque</md-option>
<md-option value="Online">Online</md-option>
<md-option value="Bank Transfer">Bank Transfer</md-option>        
          </md-select>
        </md-field>
 </div>
 </div>  
<div class="col-sm-12 col-md-4  fl pr-5 pl-5">

 <div class="md-layout md-gutter">
 <md-field>
          <label for="font">Payment Date</label>
          <md-select v-model="Payment" name="Payment" id="Payment">
          <md-option value="Upon Acceptance">Upon Acceptance</md-option>
<md-option value="Upon Delivery">Upon Delivery</md-option>      
          </md-select>
        </md-field>
 </div>


</div>
  </div>
</template>
          </div>
            </div>
</div>
<!------items_start----------------------------------------------------------------------------->
             <div class="company-products-wrap">
                <div class="product col-sm-12  pl-0 pr-0 fl">

<!-------------->    
                <section>
                    <div class="info col-sm-12 pl-0 pr-0">
                      <div class="title">Product information</div>

<!------product_start------------->
<div class="col-sm-12 col-md-4 col-xl-3 card_margin">
 <div class=" pl-0 pr-0 wrapper_shadow">

                      <img :src="item.prdctImg" />
                     <!---- <div class="prdctName">{{ item.prdctName }}</div>--->
<div class="brand col-sm-12">Chopard</div>
<div class="title_brand col-sm-12">
Oud Malaki Edp 80ml
</div>
<div class="price_price col-sm-12"><span class="color_aed">AED</span> <span class="price_product">155.00</span>
<span class="offer_price">AED 487.38</span>
</div>

<div class="price_price col-sm-12">
<div class="offer_box">
68% OFF
</div>
</div>

</div>
</div>
<!------product_end------------->






</div>               
</section>
 <!-------------->   
</div>
 
  </div>
<!------items_end----------------------------------------------------------------->



 <div class="company-products-wrap border_none">
    <div class="product col-sm-12  pl-0 pr-0 fl">
                <section class="col-sm-12 pl-0 pr-0" >
                    <div class="info col-sm-12 pl-0 pr-0" >
                      <div class="title mt-3">Message</div>
                  
                     <div class="message_discription col-sm-12 pl-0 pr-0">
                     <div class="col-sm-12 pl-0 pr-0">
              <i class="material-icons ">sentiment_satisfied_alt</i>
              <span>Enter product details such as color, size, materials etc. and other specification requirements to receive an accurate quote.</span>
           </div>
             </div>
            <div class="col-sm-12 pl-0 pr-0 mt-4">
            <textarea rows="4" cols="50" placeholder="Enter product details such as color, size, materials etc. and other specification requirements to receive an accurate quote.">
                  </textarea>
            </div>                
                    </div>
                </section>
                </div>
 </div>                                     
 <div class="company-products-wrap border_none padding_border">
    <div class="product col-sm-12  pl-0 pr-0 fl">
                <section class="col-sm-12 pl-0 pr-0">
                    <div class="info col-sm-12 pl-0 pr-0" >
                      <div class="title mb-0">Please enter your quantity</div>
            <div class="col-sm-12 pl-0 pr-0 mt-3 email">
                     <div class="col-sm-4" style="background-color:red; height:45px;"></div>                    
            </div>
            
                  </div>
                </section>
                </div>
 </div>         
  <div class="company-products-wrap border_none">
    <div class="product col-sm-12  pl-0 pr-0 fl">
                <section class="col-sm-12 pl-0 pr-0" >
                    <div class="info col-sm-12 pl-0 pr-0" >
                 <button type="button" class="btn btn-submit">Send inquiry now</button>        
                  </div>
                </section>
                </div>
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
      qutationItem: [
        {
          companyTitle: "Lisa Shao Yiwu Huayi Electronic Co., Ltd",
          prdctImg: "https://cdn-incname.hihonor.com/pms/pages/frontCategory/k1L4NHiadXMtn7ZBCIwa.jpg",
          prdctName: "2*18650 Battery Rechargeable Zoomable Fast Track",
          prdctMnq: 12,
          prdctBrand: "adidas",
          prdctValidity: "12-10-2012",
          prdctPrice: 125
        }
      ]
    };
  },
  components: {
    
  }
};
</script>
<style scoped>
.qutation-wrap{
  margin-top: 1.5em;
}
.qutation-wrap .head{
    font-size: 19px;
    font-weight: 500;
    color: #333;
}
.qutation-form{
padding:0px;
  border: 1px solid #eee;
  margin-top: 1.5em;
  
}
.company-detail {
    border-bottom: 1px solid #eee;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
   margin-right: 0.3em;
}
.wrapper-date{ border-bottom: 1px solid #eee;
    padding: 12px 20px;
    align-items: center;
    font-size: 15px;
    font-weight: 400;
   margin-right: 0.3em;}
.wrapper-date{}
.company-products-wrap{
    padding: 12px 20px 10px 20px;
   overflow:hidden;
    width: 100%;
    justify-content: space-between; 
    border-bottom: 1px solid #eee;
}
.message_discription{display:flex; align-items: center;}
textarea{width: 100%;
    box-sizing: border-box;
    min-height: 200px;
    padding: 20px;
    resize: none;
    max-width: 100%;}
.message_discription span{     float: left;
    margin-top: 8px;
    margin-left: 3px;
}
.message_discription i {
    float: left;
    color: #ff5722;
}
.float_demander{float:right}
.company-products-wrap section{
  display: inline-flex;
}
.demander section{
  margin-right: 0.5em;
}
section .title{
  font-size: 15px;
  display: inline-block;
  width: 100%; 
  height: 20px;
  margin-bottom: 1.4em;
}
.info img{
  min-width: 160px;
  height: 160px;

}
.info{    margin-top: 10px;
    margin-bottom: 10px;
}
.prdctName{
  font-size: 14px;
  font-weight: 500;
  display: inline-block;
}
.textfield input[type=text] {
  width: 75px;
  height: 30px;
  border: solid 1px #c8d2e0;
}
.textfield select {
  width: 75px;
  height: 30px;
   border: solid 1px #c8d2e0;
}
.product{
}
.demander{}
 .email input{ height: 40px;
    padding: 10px;}  
.btn-submit{height: 40px;
    padding: 0 20px;line-height: 40px;font-size: 16px;    background: #ff5722 ; color: #FFF;
    border:none; margin-bottom: 13px; margin-top: -5px;}  
 .wrap-date{float:right;}    
.fl{float:left;}
textarea,input,select[type=text]{outline:none;border: solid 1px #c8d2e0; }
.bg_wrapper,.pg-cnt-bx{background-color:#fbfbfd;     margin-bottom: 30px;}
.border_none{border:none;padding-bottom: 0px; padding-top: 0px;}
.row_margin {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 16px;
    margin-left: -8px;
}
.brand {
  margin-top: 5px;
    margin-bottom: 4px;
    float:left;font-size: 13px;color:#555;text-align: left;
}

.title_brand{  float:left; line-height:18px; text-align:justify; color:#222}

.price_price {
    margin-top: 8px;float:left;font-size: 14px;text-align: left;
}

.offer_price{ color: #777;
    font-size: 12px;
    text-decoration: line-through;
    margin-left: 4px;} 
.color_aed{color:#777; font-size:13px;}
.offer_box{padding: 5px 6px;
    background-color: #cbfbc6;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin-top: -5px;
    font-size: 12px;
    height: -webkit-fit-content;
    height: -moz-fit-content;
    height: fit-content;
    color: #64985c;}
.price_product{ font-weight:600; font-size:15px;}

.wrapper_shadow{ overflow:hidden;
padding:15px;
float:left;
width: 100%;
    background: #fff;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.05);
    border-radius: 6px;
    text-align:center; 

}
.card_margin{float:left; padding:5px}






@media screen and ( max-width: 1000px ) {
  .float_demander {
    float: left;
    margin-top:25px;
    margin-bottom:10px;
}
section .title{
    margin-bottom: 0.8em;margin-left: 5px;
}
.qutation-wrap {
    padding-top: 20px;
}
.wrapper_checkbox{padding-bottom:25px;}
.message_discription i {
    float: left;
    color: #ff5722;
    margin-right: 5px;
    height:40px;
}
.message_discription span {
    float: none;    line-height: 17px;
}
.wrapper-date{padding:0px}
textarea::placeholder{line-height:20px}
.padding_border{padding-top:4px;}
}
@media screen and ( max-width: 768px ) {
.md-layout.md-gutter {
    margin-right: 0px;
    margin-left: 5px;
}
.prdctName {
    margin-top: 15px;
}
.brand[data-v-d9af28bc] {
    margin-top: 2px;
}
}
@media screen and ( max-width: 600px ) {
.message_discription i { 
    height: 52px;
}
textarea {
    margin-top: 10px;
}
.float_demander {
    margin-top: 5px;
    margin-bottom: 5px;
}
.info img{margin-bottom:10px;}
.title_brand{font-size:13px}

}
</style>