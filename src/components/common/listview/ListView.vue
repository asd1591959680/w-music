<template>
<div class="warpper">
  <scroll class="listview" :data="data" 
  :pull-up-load="true" ref="listview" 
  @scroll="scroll"
  :probeType="3">
    <ul>
      <li v-for="(group,index) in data" :key="index" class="list-group" ref="listgroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item,indey) in group.obj" :key="indey" 
          class="list-group-item" @click="selectItem(item)">
            <img v-lazy="item.avatar" alt="" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>

  </scroll>
  <div class="list-shortcut" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" :key="index" :data-index="index"
        class="item" :class="{'current':currentIndex === index}">
        {{item}}
        </li>
      </ul>
  </div>
  <div class="list-fixed" v-show="fixedTitle" ref="fixed">
  <h2 class="fixed-title">{{fixedTitle}}</h2>
  </div>
  <div v-show="!data.length" class="loading-container">
    <loading></loading>
  </div>
</div>
</template>

<script>
import Scroll from 'common/scroll/Scroll.vue'
import Loading from 'common/loading/Loading.vue'
import {getData} from 'common/utils.js'
const ANCHOR_HIGH = 18
const TITLE_HEIGHT = 30
const EVENT_SELECT = 'selectItem'
export default {

  props:{
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {
    Scroll,
    Loading},
  data() {
  return {
    scrollY: -1,
    currentIndex: 0,
    listHeight: [],
    diff:-1
  }
  },
  created () {
    this.touch = {}//不需要变化
  },
  computed: {
    shortcutList(){
      return this.data.map((group) => {
        return group.title.substr(0,1)
      })
    },
    fixedTitle(){
      
      if(this.scrollY > 0){
        return ''//滚动到顶部时消失
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    onTouchStart(e){
      let anchorIndex = getData(e.target,'index')//返回当前点击索引值是字符串
      //获取touches方法里面第0个元素
      let fristtouch = e.touches[0]
      //获取数据并赋值给属性
      this.touch.y1 = fristtouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onTouchMove(e){
      let fristtouch = e.touches[0]
      this.touch.y2 = fristtouch.pageY
      //偏移量  |0是向下取整相当于flood
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HIGH | 0 
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(position){
      this.scrollY = position.y//获取y轴变化
    },
    _scrollTo(index){
      //让边界外点击无响应
      if(!index && index!==0){
        return
      }
      //让边界外滑动无响应
      if(index < 0){
        index = 0
      }else if(index > this.listHeight.length-2){
        index = this.listHeight.length-2//最后一个元素
      }
      this.scrollY = -this.listHeight[index]//监听scrollY变化，获取位置
      this.$refs.listview.scrollToElement(this.$refs.listgroup[index],0)
    },
    _calculateHeight(){
      //计算每个标题到顶部高度，添加到新数组里
      this.listHeight = []
      const list = this.$refs.listgroup
      let height = 0
      this.listHeight.push(height)
      for(let i=0;i<list.length;i++){
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectItem(item){
      this.$emit(EVENT_SELECT,item)
    },
    refresh(){
      this.$refs.listview.$el.style.height= 'calc(100% - 88px - 60px)'
      this.$refs.listview.refresh()
      
    },
  },
  watch: {
    data(){
      setTimeout(() => {
        this._calculateHeight()
      },20)
    },
    scrollY(newY){//监听scrollY变化，参数是变化的y值
      const listheight = this.listHeight
      //当滚动到顶部时，newY > 0)
      if(newY > 0){
        this.currentIndex = 0
        return
      }
      //当滚动到中间部分
      for(let i=0;i<listheight.length-1;i++){
        let height1 = listheight[i]//下限
        let height2 = listheight[i+1]//上限
        if(-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY//标题上限减去y轴量
          return
        }
      }
      //滚动到底部，且-newY大于最后一个元素上限
      this.currentIndex = listheight.length-2
    },
    diff(newVal){//监听diff变化，参数是变化的新值
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      //减少不必要DOM操作，节流
      if(this.fixedTop === fixedTop){
        return
      }
      this.fixedTop = fixedTop
      console.log(this.fixedTop);
      //操作DOM
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    }
  },
}
</script>
<style lang='stylus' scoped>
  @import "~assets/stylus/variable"
.warpper
  height 100vh
  .listview
    position: relative
    width: 100%
    height: calc(100% - 88px)
    overflow: hidden
    background: $color-background
    
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 40%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-text-l
      font-size: $font-size-small
      &.current
        color: $color-theme
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)


</style>