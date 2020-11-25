<template>
  <div id="app">
    <m-header></m-header>
    <tab-bar></tab-bar>
    <keep-alive exclude="SingerDetail,Disc,UniqueList" >
      <router-view></router-view>
    </keep-alive>
    <playing/>
  </div>
</template>

<script>
import MHeader from 'content/header/MHeader.vue'
import TabBar from 'content/tabar/TabBar.vue'
import Playing from 'views/playing/Playing.vue'

export default {
  components: {
    MHeader,
    TabBar,
    Playing,
  }
}
</script>>


<style lang="stylus">
@import 'assets/stylus/index.styl'

</style>
