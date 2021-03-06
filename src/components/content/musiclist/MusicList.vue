<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="baStyle" ref="bgImage">
      <div class="play-wrapper">
        <div class="play" ref="play" v-show="songs.length>0" @click="random">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll :data="songs" 
    class="list" :pull-up-load="true" 
    ref="scroll" :probeType="3" @scroll="scroll">
      <div class="song-list-wrapper">
        <song-list :rank="rank" @selectItem="selectItem" :songs="songs"></song-list>
      </div>
      <loading class="loading-container" v-show="!songs.length"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'common/scroll/Scroll.vue'
import SongList from 'content/songlist/SongList.vue'
import Loading from 'common/loading/Loading.vue'
import {prefixStyle} from 'common/utils.js'
import {mapActions} from 'vuex'
import {playlistMixin} from 'common/mixin.js'
const RESERVE_HEIGHT = 40
const transform = prefixStyle('transform') //各种浏览器兼容
export default {
  props:{
    title:{
      type:String,
      default:''
    },
    bgImage:{
      type:String,
      default:''
    },
    songs:{
      type:Array,
      default(){
        return []
      }
    },
    rank:{
      type:Boolean,
      dafault:false
    }
  },
  mixins: [playlistMixin],
  components: {
    Scroll,
    SongList,
    Loading
},
data() {
return {
  scrollY:-1,
}
},
computed: {
  baStyle(){
    return `background-image:url(${this.bgImage})`
  }
},
mounted() {
  this.imageHeight = this.$refs.bgImage.clientHeight //用缓存一下，避免重复操作DOM
  this.minTranslateY = -this.imageHeight + RESERVE_HEIGHT
  this.$refs.scroll.$el.style.top = `${this.imageHeight}px`
},
methods: {
  scroll(pos){
    this.scrollY = pos.y
  },
  back(){
    this.$router.back()
  },
  selectItem(item,index){
    this.selectPlay({
      list:this.songs,
      index
    })
  },
  random(){
    this.randomPlay({
      list:this.songs
    })
  },
  handlePlaylist(playList){
    const bottom = playList.length > 0 ? '60px' : ''
    this.$refs.scroll.$el.style.bottom = bottom
    this.$refs.scroll.refresh()
  },
  ...mapActions(['selectPlay','randomPlay'])
},
watch: {
  scrollY(newY){
    let translateY = Math.max(this.minTranslateY,newY)
    let zIndex = 0
    let scale = 1
    const percent = Math.abs(newY/this.imageHeight)//实现无缝贴合
    this.$refs.layer.style[transform]=`translate3d(0,${translateY}px,0)`
    if(newY > 0){
      scale = 1+percent
      zIndex = 10
    }
    if(newY < this.minTranslateY){
      zIndex = 10
      this.$refs.bgImage.style.paddingTop = 0
      this.$refs.bgImage.style.height = `${RESERVE_HEIGHT}px`
      this.$refs.play.style.display = 'none'
    }else{
      this.$refs.bgImage.style.paddingTop = '70%'
      this.$refs.bgImage.style.height = 0
      this.$refs.play.style.display = ''
    }
    this.$refs.bgImage.style.zIndex =zIndex
    this.$refs.bgImage.style[transform]=`scale(${scale})`
  }
},
}
</script>
<style lang='stylus' scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"
  .music-list
    position: fixed
    z-index: 102
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position fixed
      top 0
      bottom 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>