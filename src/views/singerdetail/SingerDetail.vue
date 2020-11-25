<template>
<transition name="slide">
  <music-list :title="title" :songs="songs" 
  :bgImage="bgImage" class="singer-detail"></music-list>
</transition>

</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'network/singer.js'
import {Song} from 'network/singerList.js'
import MusicList from 'content/musiclist/MusicList.vue'
const num = 10
const ERR_OK = 100
export default {
  name:'SingerDetail',//清除缓存
  computed: {
    ...mapGetters(['singer']),
    title(){
      return this.singer.name
    },
    bgImage(){
      return this.singer.avatar
    }
  },
  created () {
    this._getSingerDetail()
     
  },
components: {
  MusicList
},
data() {
return {
  songs:[],
}
},
methods: {
  _getSingerDetail(){
    if(!this.singer.id){
      this.$router.push('/singer')
      return
    }
    
    getSingerDetail(this.singer.id,10).then((res) => {
      if(res.result === ERR_OK){
        this.songs = this._noramlizeSongs(res.data.list)
      }
    })
  },
  _noramlizeSongs(list){
    let ret = []
    list.forEach((item) => {
      ret.push(new Song({
        id:item.id,
        mid:item.mid,
        singer:item.singer,
        name:item.name,
        album:item.album,
        duration:item.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,
      }))
    })
    return ret
  },
},

}
</script>
<style lang='stylus' scoped>
@import '~assets/stylus/variable.styl'
 .singer-detail
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background $color-background
.slide-enter-active,.slide-leave-active
  transition: all .3s linear
.slide-enter,.slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>