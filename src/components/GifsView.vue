<template>
  <span>
    <h3 v-if="gifs.length > 0" is=sui-header class="instruction-header custom-font"> Escolha ou remova uma Gif com a estrela </h3> 
    <div class="gifs-wrapper">
      <div v-for="gif of gifs"  :key="gif.id">
        <div class="overlayWrapper unitWrapper">
          <img :src="gif.src" />
          <div :class="gif.saved ?  'overlaySaved':'overlay' ">
            <sui-icon color=yellow size=large class="overlayIcon" name="star" v-on:click="(e) => saveGif(gif)"/>
            <sui-icon v-if="!!pickGif" color=grey size=large class="overlayIconLeft" name="cog" v-on:click="(e) => pickGif(gif)"/>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>

export default {
  name: 'GifsView',
  props: {
    gifs: {type: Array, default:[]},
    saveGif: Function,
    pickGif: Function
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.instruction-header {
  color: #fbbd08 !important;
  margin-top: 15px !important;
}
.gifs-wrapper{
  margin-top: 30px;
  display:flex;
  flex-wrap: wrap;
  background-color: transparent
}
span{
  background-color: transparent
}
.unitWrapper img{
  width: 100%;
}
.overlayWrapper {
  position: relative;
  display: inline-block;
  width: 98%;
}
.gifs-wrapper>div{
  position: relative;
  display: inline-block;
  width: 50%;
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
.overlayIconLeft {
  cursor:pointer;
  color: white;
  font-size: 100px;
  position: absolute;
  top: 22px;
  left: 20px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}
</style>
