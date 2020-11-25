<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :pull-up-load="true" :data="uniqueList" ref="toplist">
      <ul>
        <li class="item" v-for="(item,index) in uniqueList" :key="index" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl" />
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,indey) in item.song" :key="indey">
              <span>{{indey + 1}}</span>
              <span>{{song.title}}-{{song.singerName}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!this.uniqueList.length">
        <loading/>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRank} from 'network/rank.js'
import {playlistMixin} from 'common/mixin.js'
import {mapMutations} from 'vuex'
import Scroll from 'common/scroll/Scroll.vue'
import Loading from 'common/loading/Loading.vue'
const showDetail = 1
export default {
components: {
  Scroll,
  Loading
},
data() {
return {
  uniqueList:[]
}
},
mixins: [playlistMixin],
created() {
  this._getRank()
},
methods: {
  _getRank(){
    getRank().then((res) => {
      this.uniqueList = res.data[2].list
    })
    
  },
  handlePlaylist(playList){
    const bottom = playList.length > 0 ? '60px' : ''
    this.$refs.rank.style.bottom = bottom
    this.$refs.toplist.refresh()
  },
  selectItem(item){
    this.$router.push({
      path:`/ranking/${item.topId}`
    })
    this.SET_UNIQUELIST(item)
  },
  ...mapMutations(['SET_UNIQUELIST'])
},
}
</script>
<style lang='stylus' scoped>
@import "~assets/stylus/variable"
@import "~assets/stylus/mixin"
  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>