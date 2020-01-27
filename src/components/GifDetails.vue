<template>
  <div class="gif-wrapper">
    <h3 is=sui-header color="yellow">Altere as informações da Gif escolhida</h3> 
    <div :key="gif.id">
      <div class="editing-wrapper">
        <img :src=" gif ? gif.src:'' " />
        <div>
          <sui-input class="details-input" type="text"  v-model="newName"/>
          <sui-input type="text"  class="details-input" v-model="newSrc"/>
          <sui-button icon="save" v-on:click="() => { buildNewGif({src:newSrc, name:newName}); toggleDetails();}" ></sui-button>
          <sui-button v-on:click="() => { toggleDetails(); }" > Sair </sui-button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GifDetails',
  props: {
    gif: {type: Object, default:{}},
    editGif: Function,
    toggleDetails: Function
  },
  data() {
    return {
      newName:"",
      newSrc:"",
    }
  },
  mounted(){
    this.newName = this.gif.name;
    this.newSrc = this.gif.src;
  },
  methods:{
    buildNewGif(params){
      let newGif = this.gif;
      newGif.src = params.src;
      newGif.name = params.name;
      this.editGif({id:this.gif.id, editedGif:newGif});
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gif-wrapper{
  margin-top: 30px;
}
.overlayWrapper {
  position: relative;
  display: inline-block;
}
.overlay {
  
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .3s ease;
  background-color: transparent
}
.overlayWrapper:hover .overlay {
  opacity: 1;
}
.overlaySaved {
  opacity: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transition: .3s ease;
  background-color: transparent
}
.details-input {
  margin-right: 5px;
}
.overlayIcon {
  cursor:pointer;
  color: white;
  font-size: 100px;
  position: absolute;
  top: 25px;
  right: 1px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

</style>
