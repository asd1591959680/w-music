import Vue from 'vue'
import VueRouter from 'vue-router'

const Recommend = () =>import ('views/recommend/Recommend.vue')
const Singer = () =>import ('views/singer/Singer.vue')
const Ranking = () =>import ('views/ranking/Ranking.vue')
const Search = () =>import ('views/search/Search.vue')
const SingerDetail = () =>import('views/singerdetail/SingerDetail.vue')
const UniqueList = () => import('views/ranking/childrenComp/UniqueList.vue') 
const UserCenter = () =>import('views/usercenter/UserCenter.vue')
const Disc = () =>import('content/disc/Disc.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component:Recommend
  },
  {
    path: '/singer',
    component:Singer,
  },
  {
    path:'/singerlist/:id',
    component:SingerDetail
  },
  {
    path:'/ranking',
    component:Ranking
  },
  {
    path:'/search',
    component:Search,
  },
  {
    path:'/disc/:id',
    component:Disc
  },
  {
    path:'/ranking/:id',
    component:UniqueList
  },
  {
    path:'/user',
    component:UserCenter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
