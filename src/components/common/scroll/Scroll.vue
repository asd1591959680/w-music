<template>
  <div class="wrapper" ref="wrapper">
  <div>
    <slot></slot>
  </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
    data:{
      type:Array,
      default(){
        return []
      }
    },
    beforeScroll:{
      type:Boolean,
      default:false
    },
    refreshDelay:{
      type:Number,
      default:20
    }
  },
components: {},
data() {
return {
  scroll:null
}
},
mounted() {
  this.scroll=new BScroll(this.$refs.wrapper,{
    click:true,
    probeType:this.probeType,
    pullUpLoad:this.pullUpLoad
  })
  this.scroll.on('scroll',(position) => {
    this.$emit('scroll',position)
    
  })
  this.scroll.on('pullingUp',() => {
    this.$emit('pullingUp')
  })
  if(this.beforeScroll){//用户手指放在滚动区域的时候
    this.scroll.on('beforeScrollStart', () => {
      this.$emit('beforeScroll')
    })
  }

},
methods: {
  scrollTo(x,y,time=500){
    this.scroll && this.scroll.scrollTo(x,y,time)
  },
  scrollToElement(el,time){
    this.scroll && this.scroll.scrollToElement(el,time)
  },
  finishPullUp() {
    this.scroll.finishPullUp()
  },
  refresh(){
    this.scroll && this.scroll.refresh()
  }
  
},
//监听数据变化，即时刷新
watch: {
  data(){
    setTimeout(()=>{
      this.refresh()
    },this.refreshDelay)
  }
}
  
}
</script>

<style scoped>

</style>