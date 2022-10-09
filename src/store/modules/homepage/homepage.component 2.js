import axios from 'axios'
export default {
    
    state:{
        homebannerslider:[],
        dsbannerslider:[],
        homeBannerSliderLoaded:false,
        featuredSliderData:[],
        featuredSliderLoaded:false,
        
    },

    getters:{
        GET_BANNER_SLIDER(state)
        {
        
            if(state.homebannerslider.length)
            {
            return state.homebannerslider;
            }
           
          
        },
        GET_DSBANNER_SLIDER(state)
        {
        
            if(state.dsbannerslider.length)
            {
            return state.dsbannerslider;
            }
           
          
        }
    },

    mutations:{
        SET_BANNER(state, result){
            
            state.homebannerslider = result;
         
        },
        SET_DSBANNER(state, result){
           
            state.dsbannerslider = result;
         
        },

        // SET_FEATURED_SLIDER(state,featuredsliderdata)
        // {
        //     const productFileUrl = "https://www.uaect.com/assets/demands/";
        //     var data = featuredsliderdata.products.map(item => {
        //         item.imageurl = productFileUrl + item.file;
        //         return item;
        //     });
        //     state.featuredSliderData = data;
        //     state.featuredSliderLoaded= true;
        // }
    },

    actions:{
        homePageBanner({commit},data){
            axios.post('/home-page-ads',{
               ...data
            })
            .then(response=>{
             
                if(data.type=="home")
                {
                    commit('SET_BANNER',response.data.result)
                }else{
                    commit('SET_DSBANNER',response.data.result)
                }
            })
            .catch(err=>{
                console.log(err)
            })
        },
        // loadBannerHandler({commit}){
        //     axios.post('https://www.uaect.com/api_home_banner',{
        //         position:1
        //     })
        //     .then(response=>{
        //         let SliderData = response.data;
        //         commit('SET_BANNER',SliderData)
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // },

        // loadFeaturedSliderHadler({commit}){
        //     axios.post('https://www.uaect.com/api_home_products',{
        //         page:1
        //     })
        //     .then(response=>{
        //         let featuredSliderData = response.data;
        //         commit('SET_FEATURED_SLIDER',featuredSliderData)
        //     })
        //     .catch(err=>{
        //         console.log(err)
        //     })
        // }
    }
}