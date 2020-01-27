import Vue from 'vue'
import App from './App.vue'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.use(SuiVue);
export const store = new Vuex.Store({
  state:{
    _gifs:[],
  },
  mutations:{
    _clearGifs(state, _){
      state._gifs = state._gifs.filter(gif => gif.saved);
    },
    _saveGif( state, gifData ){
      let editedGif = {...gifData};
      editedGif.saved = !editedGif.saved;
      state._gifs = state._gifs.map(gif => {
        if(gif.id === gifData.id){
          return editedGif;
        }
        else return gif;
      })
    },
    _editGif(state, {id, editedGif}){
      let tempGifs = state._gifs.map((gif)=>{
        if(gif.id === id){
          return editedGif;
        }
        else return gif; 
      })
      state._gifs = tempGifs
    },
    _buildGifs(state, json){  
      let rawData = json.data;
      let metaData = json.meta;
      if(metaData.status !== 200){
        window.alert("these are not the Gifs you are looking for. (check your internet connection or try again later)");
        return [];
      }
      if(rawData && rawData.length > 0){
        for(let gif of rawData){
          state._gifs.push({src: `https://media.giphy.com/media/${gif.id}/giphy.gif`, saved:false, id:gif.id, rawData: gif, name:"noName" });
        }
      }
    },
  },
  getters:{
    _gifs(state){
      return state._gifs
    }
  }

})

new Vue({
  render: h => h(App),
}).$mount('#app')
