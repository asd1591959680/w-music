<template>
<div ref="singer" class="singer">
  <list-view :data= "singerList" @selectItem="selectItem" ref="list"></list-view>
  <router-view></router-view>
</div>
</template>

<script>
import {getSingerList,Singer} from 'network/singer.js'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/mixin.js'
import ListView from 'common/listview/ListView.vue'
const pinyin = require('pinyin')
const ERR_OK = 200
const HOT_NAME = '热门'
const HOT_LENGTH = 10
export default {
components: {ListView},
data() {
return {
  singers:[],
  singerList:[]
}
},
created() {
  this._getSingerList()
  
  
},
mixins: [playlistMixin],
methods: {
  _getSingerList(){
    getSingerList().then((res) => {
    if(res.result = ERR_OK){
      
      this.singers = res.data.list

      this.singers.map((item) => {//获取首字母
        let a = pinyin(item.singer_name[0], {
        style: pinyin.STYLE_FIRST_LETTER
      　})
        item.initial = a[0][0].toUpperCase()
      })
      this.singerList=this._normalizeSinger(this.singers)
    }
  })
  },
  _normalizeSinger(list) {
  let map = {
    hot:{
      title: HOT_NAME,
      obj:[]
    }
  }
  //热门数据
  this.singers.forEach((item,index) => {
    if(index < HOT_LENGTH) {
      map.hot.obj.push(new Singer({
        id:item.singer_mid,
        name:item.singer_name,
        avatar:item.singer_pic
      }))
    }
    //拼音数据
    const key = item.initial
    if(!map[key]){
      map[key] = {
        title:key,
        obj:[]
      }
    }
    map[key].obj.push(new Singer({
        id:item.singer_mid,
        name:item.singer_name,
        avatar:item.singer_pic
      }))
  })
  //得到有序列表
  let hot = []
  let ret = []
  for(let key in map){
    let val = map[key]
    if(val.title.match(/[a-zA-Z]/)){
      ret.push(val)
    }else if (val.title === HOT_NAME){
      hot.push(val)
    }
  }
  //排序
  ret.sort((a,b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })
  //拼接
  return hot.concat(ret)
  },
  selectItem(singer){
    this.$router.push({
      path:`/singerlist/${singer.id}`
    })
    this.setSinger(singer)
  },
  handlePlaylist(playList){
    const bottom = playList.length > 0 ? '60px' : ''
    this.$refs.singer.style.bottom = bottom
    if(playList[0]){
     this.$refs.list.refresh()
    }
    
  },
  ...mapMutations({
    setSinger:'SET_SINGER'
  })
}
}
</script>
<style lang="stylus" scoped>
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>