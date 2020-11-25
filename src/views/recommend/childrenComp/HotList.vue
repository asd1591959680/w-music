<template>
<div class="hot-list">
  <div class="title"><span>热门歌单推荐</span></div>
    <div class="list">
      <ul>
        <li v-for="(item,index) in hotlist" 
        :key="index" class="item"
        @click="selectItem(item)">
          <img v-lazy="item.cover" alt="" class="list-img">
          <div class="list-text">
            <p>{{item.title}}</p>
            <p class="text">{{item.username}}</p>
          </div>
        </li>
      </ul>
    </div>
  <div class="loading-content" v-show="!hotlist.length" >
    <loading/>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import Loading from 'common/loading/Loading.vue'
import {mapMutations} from 'vuex'
export default {
props:{
  hotlist:{
    type:Array,
    default(){
      return []
    }
  }
},
components: {
  Loading
},

methods: {
  selectItem(item){
    this.$router.push({
      path:`/disc/${item.content_id}`
    })
    this.SET_DISC(item)
  },
  ...mapMutations(['SET_DISC'])
},
mounted () {
 
}
}
</script>
<style lang='stylus' scoped>
@import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'
.hot-list
  position relative
  .title
    margin-top 20px
    text-align center
    color $color-theme
    font-size $font-size-medium
 ul

  padding 0 20px
  .item

    display flex
    padding 15px 0

    align-items center
    font-size $font-size-medium
    .list-img
      width 70px
      height 70px
      border-radius 3px
      padding-right 20px
    .list-text
      width 70%
      p
        no-wrap()
      .text
        padding-top 10px
        color $color-text-d
  .loading-content
    position absolute
    top 50%
    left 50%
    transform translate(-50%,-50%)
</style>