(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba45d994"],{"057e":function(t,s,e){"use strict";var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"music-list"},[e("div",{staticClass:"back",on:{click:t.back}},[e("i",{staticClass:"icon-back"})]),e("h1",{staticClass:"title"},[t._v(t._s(t.title))]),e("div",{ref:"bgImage",staticClass:"bg-image",style:t.baStyle},[e("div",{staticClass:"play-wrapper"},[e("div",{directives:[{name:"show",rawName:"v-show",value:t.songs.length>0,expression:"songs.length>0"}],ref:"play",staticClass:"play",on:{click:t.random}},[e("i",{staticClass:"icon-play"}),e("span",{staticClass:"text"},[t._v("随机播放全部")])])]),e("div",{staticClass:"filter"})]),e("div",{ref:"layer",staticClass:"bg-layer"}),e("scroll",{ref:"scroll",staticClass:"list",attrs:{data:t.songs,"pull-up-load":!0,probeType:3},on:{scroll:t.scroll}},[e("div",{staticClass:"song-list-wrapper"},[e("song-list",{attrs:{rank:t.rank,songs:t.songs},on:{selectItem:t.selectItem}})],1),e("loading",{directives:[{name:"show",rawName:"v-show",value:!t.songs.length,expression:"!songs.length"}],staticClass:"loading-container"})],1)],1)},i=[],n=e("5530"),l=e("5d17"),r=e("1045"),c=e("764a"),o=e("783f"),u=e("2f62"),g=e("f300"),h=40,f=Object(o["c"])("transform"),m={props:{title:{type:String,default:""},bgImage:{type:String,default:""},songs:{type:Array,default:function(){return[]}},rank:{type:Boolean,dafault:!1}},mixins:[g["b"]],components:{Scroll:l["a"],SongList:r["a"],Loading:c["a"]},data:function(){return{scrollY:-1}},computed:{baStyle:function(){return"background-image:url(".concat(this.bgImage,")")}},mounted:function(){this.imageHeight=this.$refs.bgImage.clientHeight,this.minTranslateY=-this.imageHeight+h,this.$refs.scroll.$el.style.top="".concat(this.imageHeight,"px")},methods:Object(n["a"])({scroll:function(t){this.scrollY=t.y},back:function(){this.$router.back()},selectItem:function(t,s){this.selectPlay({list:this.songs,index:s})},random:function(){this.randomPlay({list:this.songs})},handlePlaylist:function(t){var s=t.length>0?"60px":"";this.$refs.scroll.$el.style.bottom=s,this.$refs.scroll.refresh()}},Object(u["b"])(["selectPlay","randomPlay"])),watch:{scrollY:function(t){var s=Math.max(this.minTranslateY,t),e=0,a=1,i=Math.abs(t/this.imageHeight);this.$refs.layer.style[f]="translate3d(0,".concat(s,"px,0)"),t>0&&(a=1+i,e=10),t<this.minTranslateY?(e=10,this.$refs.bgImage.style.paddingTop=0,this.$refs.bgImage.style.height="".concat(h,"px"),this.$refs.play.style.display="none"):(this.$refs.bgImage.style.paddingTop="70%",this.$refs.bgImage.style.height=0,this.$refs.play.style.display=""),this.$refs.bgImage.style.zIndex=e,this.$refs.bgImage.style[f]="scale(".concat(a,")")}}},d=m,b=(e("8b5c"),e("2877")),p=Object(b["a"])(d,a,i,!1,null,"c02bc484",null);s["a"]=p.exports},"0902":function(t,s,e){"use strict";e.d(s,"a",(function(){return i})),e.d(s,"b",(function(){return n}));var a=e("1bab");function i(){return Object(a["a"])({url:"/top/category",params:{showDetail:1}})}function n(t){return Object(a["a"])({url:"/top",params:{id:t}})}},"5f66":function(t,s,e){},"81fb":function(t,s,e){"use strict";e.r(s);var a=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("transition",{attrs:{name:"slide"}},[e("music-list",{attrs:{title:t.title,bgImage:t.bgImage,songs:t.songs,rank:t.rank}})],1)},i=[],n=(e("4160"),e("b0c0"),e("159b"),e("5530")),l=e("057e"),r=e("2f62"),c=e("1d7f"),o=e("0902"),u={name:"UniqueList",components:{MusicList:l["a"]},data:function(){return{songs:[],bgImage:"",rank:!0}},created:function(){this._getTopList()},computed:Object(n["a"])(Object(n["a"])({},Object(r["c"])(["uniqueList"])),{},{title:function(){return this.uniqueList.label}}),methods:{_getTopList:function(){var t=this;this.uniqueList.topId||this.$router.push("/ranking"),Object(o["b"])(this.uniqueList.topId).then((function(s){t.songs=t._noramlizeSongs(s.data.list),t.bgImage=t.songs[0].image}))},_noramlizeSongs:function(t){var s=[];return t.forEach((function(t){s.push(new c["a"]({id:t.id,mid:t.mid,singer:t.singer,name:t.name,album:t.albumMid,duration:t.interval,image:"https://y.gtimg.cn/music/photo_new/T002R300x300M000".concat(t.albumMid,".jpg?max_age=2592000")}))})),s}}},g=u,h=(e("8e8c"),e("2877")),f=Object(h["a"])(g,a,i,!1,null,"704a4d38",null);s["default"]=f.exports},"8b5c":function(t,s,e){"use strict";e("5f66")},"8e8c":function(t,s,e){"use strict";e("d0fb")},d0fb:function(t,s,e){}}]);
//# sourceMappingURL=chunk-ba45d994.fcf0fb57.js.map