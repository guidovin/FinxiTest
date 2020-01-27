<template >
  <div id="app" >
    <h1 class="app-title">
      Gifs To Die For
    </h1>
    <sui-input type="text"  v-model="searchQuery"/>
    <sui-button-group>
      <sui-button icon="search" v-on:click="() => {clearSearch(); fetchGifs()}" ></sui-button>
      <sui-button icon="star" :color="displaySaved ? 'red':'blue'" :togle="displaySaved" @click="togleDisplay"></sui-button>
    </sui-button-group>
    <GifsView v-if="!displaySaved && !details" :gifs="_gifs.filter(gif => !gif.saved)" :saveGif="saveGif"/>
    <GifsView v-if="displaySaved && !details" :gifs="_gifs.filter(gif => gif.saved)" :saveGif="saveGif" :pickGif="setSelectedGif"/>
    <GifDetails v-if="details" :gif="selectedGif" :editGif="editGif" :toggleDetails="togleDetails"/>
  </div>
</template>

<script>
import _ from "lodash"
import GifsView from "./components/GifsView"
import GifDetails from "./components/GifDetails"
import { store } from "./main"

export default {
  data(){
    return {
      gifs:[],
      searchQuery: "",
      offset: 0,
      displaySaved:false, 
      details:false,
      selectedGif:{}
    }
  },
  computed:{
    _gifs(){
      return store.getters._gifs
    }
  },
  mounted(){
    let infiniteScroll = () => {
      let bottomOfWindow = (window.innerHeight + window.scrollY) >= document.body.scrollHeight -100 ;
      if (bottomOfWindow) {
        this.fetchGifs();
      }
    };
    window.onscroll =  _.throttle(infiniteScroll, 500) 

  },
  components:{
    GifsView,
    GifDetails
  },
  methods:{
    clearSearch(){
      store.commit('_clearGifs', {})
    },
    togleDisplay(){
      this.displaySaved = !this.displaySaved;
    }, 
    togleDetails(){
      this.details = !this.details;
    }, 
    setSelectedGif(gif){
      this.details = true;
      this.selectedGif = gif;
    },
    saveGif( gifData ){
      store.commit('_saveGif', gifData)
    },
    editGif({id, editedGif}){
      store.commit('_editGif', {id, editedGif})
    },
    buildGifs(json){
      store.commit('_buildGifs', json)
    },
    async fetchGifs(){
      let apiKey = "dc6zaTOxFJmzC";
      let searchEndPoint = "https://api.giphy.com/v1/gifs/search?";
      let limit = 10;
      let url = `${searchEndPoint}&api_key=${apiKey}&q=${this.searchQuery}&limit=${limit}&offset=${this.offset}`;
      let response = await fetch(url);
      let responseGifs = await response.json();
      this.buildGifs(responseGifs);
      this.offset += 10;
    }
  },
  name: 'app',
}
</script>
<style >
  html { 
    background-image: url("./assets/171872_star-wars-star-backgrounds.jpg");
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  body {
    background-image: url("./assets/171872_star-wars-star-backgrounds.jpg");

    background-color: transparent !important;
  }
</style>
<style scoped>
.app-title {
  color: #fbbd08
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: hsl(210, 29%, 24%);
  margin-top: 60px;
  background-color: transparent;
  
}
input {
  padding: 5px;
  margin-bottom: 20px;
}

</style>
