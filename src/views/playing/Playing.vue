<template>
<div class="player" v-if="Object.keys(playList).length !==0">
  <transition name="normal">
    <div class="normal-player" v-show="fullScreen">
    <div class="background">
      <img :src="currentSong.image" width="100%" height="100%">
    </div>
    <div class="top">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="currentSong.name"></h1>
      <h2 class="subtitle" v-html="currentSong.singer[0].name"></h2>
    </div>
    <div class="middle" @touchstart.prevent="middleStart"
    @touchmove.prevent="middleMove" @touchend="middleEnd" >
      <div class="middle-l" ref="middleL">
        <div class="cd-wrapper">
          <div class="cd" :class="cdCls">
            <img :src="currentSong.image" alt="" class="image">
          </div>
        </div>
        <div class="playing-lyric-wrapper">
          <div class="playing-lyric">{{playingLyric}}</div>
        </div>
      </div>
      <scroll class="middle-r" ref="lyricList"
      :data="currentLyric && currentLyric.lines"
      :pull-up-load="true">
        <div class="lyric-wrapper">
          <div v-if="currentLyric">
            <p v-for="(line,index) in currentLyric.lines" :key="index"
            ref="lyricLine" 
            class="text" 
            :class="{'current':currentLineNum === index}">{{line.txt}}</p>
          </div>
        </div>
      </scroll>
    </div>
    <div class="bottom">
      <div class="dot-wrapper">
        <span class="dot" :class="{'active':currentShow === 'cd'}"></span>
        <span class="dot" :class="{'active':currentShow === 'lyric'}"></span>
      </div>
      <div class="progress-wrapper">
        <span class="time time-l">{{format(currentTime*1000)}}</span>
        <div class="progress-bar-wrapper">
          <progress-bar :percent="percent" @onChange="onChange" />
        </div>
        <span class="time time-r">{{format(currentSong.duration*1000)}}</span>
      </div>
      <div class="operators">
        <div class="icon i-left" @click="changeMode">
          <i :class="iconMode"></i>
        </div>
        <div class="icon i-left" :class="disableCls">
          <i @click="prev" class="icon-prev"></i>
        </div>
        <div class="icon i-center" :class="disableCls">
          <i @click="togglePlaying" :class="playIcon"></i>
        </div>
        <div class="icon i-right" :class="disableCls">
          <i @click="next" class="icon-next"></i>
        </div>
        <div class="icon i-right">
          <i class="icon" @click="toggleFavorite(currentSong)" :class="getFavorite(currentSong)"></i>
        </div>
      </div>
    </div>
  </div>
  </transition>
  <transition name="mini">
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="icon">
        <img :src="currentSong.image" width="40" height="40" :class="cdCls">
      </div>
      <div class="text">
        <h2 class="name" v-html="currentSong.name"></h2>
        <p class="desc" v-html="currentSong.singer[0].name"></p>
      </div>
      <div class="control">
        <progress-circle :percent="percent" :radius=32 >
        <i :class="miniIcon" @click.stop="togglePlaying" class="icon-mini"></i>
        </progress-circle>
      </div>
      <div class="control" @click.stop="openList">
        <i class="icon-playlist"></i>
      </div>
   </div>
  </transition>
  <play-list ref="list"></play-list>
  <audio :src="songUrl" ref="audio" 
  @canplay="ready" @error="error"
  @timeupdate="updateTime"
  @ended="end"></audio>
</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {mapMutations} from 'vuex'
import {getSongUrl,getLyric} from 'network/singerList.js'
import {playMode} from 'common/config.js'
import {prefixStyle} from 'common/utils.js'
import {playingMixin} from 'common/mixin.js'
import moment from 'moment'
import Lyric from 'lyric-parser'
import progressBar from './childrenComp/progressBar.vue'
import ProgressCircle from './childrenComp/progressCircle.vue'
import PlayList from 'content/playlist/PlayList.vue'
import Scroll from 'common/scroll/Scroll.vue'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
export default {
  mixins: [playingMixin],
  components: {
  progressBar, 
  ProgressCircle,
  PlayList,
  Scroll
  },
data() {
return {
  songUrl:{},
  songReady:false,
  currentTime:0,
  currentLyric:{},
  currentLineNum:0,
  currentShow:'cd',
  playingLyric:''
}
},
created () {
  this.touch = {}
},
computed: {
  ...mapGetters([
    'fullScreen',
    'playList',
    'playing',
    'currentIndex',
    
  ]),
  playIcon(){
    return this.playing?'icon-pause':'icon-play'
  },
  miniIcon(){
    return this.playing?'icon-pause-mini':'icon-play-mini'
  },
  cdCls(){
    return this.playing?'play':'play-pause'
  },
  disableCls(){
    return this.songReady?'':'disable'
  },
  percent(){
    return this.currentTime/this.currentSong.duration
  },
  
},
methods: {
  _getSongUrl(){
    getSongUrl(this.currentSong.mid).then((res) => {
      if(res.result === 100){
        if(!res.data){
          return
        }
        this.songUrl = res.data[this.currentSong.mid]
      }
    })
  },
  _getLyric(){
    getLyric(this.currentSong.mid).then((res) => {
      this.currentLyric = new Lyric(res.data.lyric,this.handlerLyric)
      if(this.playing){
         this.currentLyric.play()
      }
    }).catch(() => {
      this.currentLyric = null
      this.playingLyric = ''
      this.currentLineNum = 0
    })
  },
  handlerLyric({lineNum, txt}){
  
    this.currentLineNum = lineNum//当前歌词行
    if(lineNum > 5){
      let lineEl = this.$refs.lyricLine[lineNum - 5]//总行数-5
      this.$refs.lyricList.scrollToElement(lineEl,1000)//scroll滚动
    }else{
      this.$refs.lyricList.scrollTo(0,0,1000)
    }
    this.playingLyric = txt//当前歌词行
  },
  back(){
    this.SET_FULL_SCREEN(false)
  },
  open(){
    this.SET_FULL_SCREEN(true)
  },
  togglePlaying(){
    if(!this.songReady){
      return
    }
    const audio = this.$refs.audio
    this.SET_PLAYING(!this.playing)
    if(this.currentLyric){
      this.currentLyric.togglePlay()//插件里面的方法
    }
    if(this.playing){
      audio.play()
    }else{
      audio.pause()
    }
    
  },
  ready(){//实现自动播放
  //微信端尝试加个定时器
    
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.$refs.audio.play()
    },1000)

    this.songReady =true//防止没加载完成的高频点击
    this.savePlayHistory(this.currentSong)
  },
  error(){
    this.songReady =true
  },
  next(){
    if(!this.songReady){
      return
    }
    if( this.playList.length === 1) {//边界情况处理，歌曲只有1个
      this.loop()
      return
    }else{
      let index = this.currentIndex + 1
      if(index === this.playList.length){
        index = 0
      }
      if(!this.playing){
        this.togglePlaying()
      }
      this.SET_CURRENT_INDEX(index)
    }
    
    this.songReady =false
  },
  prev(){
    if(!this.songReady){
      return
    }
    if( this.playList.length === 1) {//边界情况处理，歌曲只有1个
      this.loop()
      return
    }else{
      let index = this.currentIndex - 1
      if(index < 0){
        index = this.playList.length - 1
      }
      if(!this.playing){
        this.togglePlaying()
      }
      this.SET_CURRENT_INDEX(index)
    }
    
    this.songReady =false
  },
  format(time){
    return moment(time).format('mm:ss')
  },
  updateTime(e){
    this.currentTime = e.target.currentTime
  },
  onChange(percent){
    const currentTime = this.currentSong.duration * percent
    this.$refs.audio.currentTime = currentTime
    if(!this.playing){
      this.togglePlaying()
    }
    if(this.currentLyric){
      this.currentLyric.seek(currentTime * 1000)
    }
  },

  end(){
    if(this.mode === playMode.loop){
      this.loop()
    }else{
      this.next()
      this.$refs.audio.play()
    }
  },
  loop(){
    this.$refs.audio.currentTime = 0
    this.$refs.audio.play()
    if(this.currentLyric){
      this.currentLyric.seek(0)
    }
  },
  middleStart(e){
    this.touch.initiated = true
    const touch = e.touches[0]
    this.touch.startX = touch.pageX
    this.touch.startY = touch.pageY
  },
  middleMove(e){
    if(!this.touch.initiated){
      return
    }
    const touch = e.touches[0]
    const deltaX = touch.pageX - this.touch.startX
    const deltaY = touch.pageY - this.touch.startY
    if(Math.abs(deltaY) > Math.abs(deltaX)){
      return
    }
    const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left + deltaX)) //滚动宽度
    this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
    this.$refs.lyricList.$el.style[transform] =  `translate3d(${offsetWidth}px,0,0)`
    this.$refs.lyricList.$el.style[transitionDuration] = 0
    this.$refs.middleL.style.opacity = 1 - this.touch.percent
    this.$refs.middleL.style[transitionDuration] = 0
  },
  middleEnd(){
    let offsetWidth 
    let opacity
    if(this.currentShow === 'cd'){
      if(this.touch.percent > 0.2){//左滑
        offsetWidth = -window.innerWidth
        this.currentShow = 'lyric'
        opacity = 0
      }else{
        offsetWidth = 0
        opacity = 1
      }
    }else{
      if(this.touch.percent < 0.8) {//右滑
        offsetWidth = 0
        this.currentShow = 'cd'
        opacity = 1
      }else{
        offsetWidth = -window.innerWidth
        opacity = 0
      }
    }
    const time = 300
    this.$refs.lyricList.$el.style[transform] =  `translate3d(${offsetWidth}px,0,0)`
    this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
    this.$refs.middleL.style.opacity = opacity
    this.$refs.middleL.style[transitionDuration] = `${time}ms`
    
  },
  openList(){
    this.$refs.list.show()
  },
  ...mapMutations(['SET_FULL_SCREEN','SET_PLAYING',
  'SET_CURRENT_INDEX','SET_MODE','SET_PLAY_LIST','SET_SEQUENCE_LIST']),
  ...mapActions(['savePlayHistory'])
},
watch: {
  currentSong(){
    
    if(!this.playList.length){//边界条件判断
      return
    }
    this._getSongUrl()
    this._getLyric()
    if(this.currentLyric.lines){//清除上一首歌歌词
      this.currentLyric.stop()
      
    }else{
      return
    }
    
  },
  
}
}
</script>
<style lang='stylus' scoped>
  @import "~assets/stylus/variable"
  @import "~assets/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>