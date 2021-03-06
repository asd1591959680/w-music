import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const PLAY_KEY = '__paly__'
const FAVORITE_KEY = '__favorite__'
const SEARCH_MAX_LENGTH = '15'
const PLAY_MAX_LENGTH = '200'
const FAVORITE_MAX_LENGTH = '200'

//增加元素方法
function insertArray(arr,val,compare,maxLen){
  const index = arr.findIndex(compare)
  if(index === 0){
    return
  }
  if(index > 0){
    arr.splice(index,1)//删除
  }
  arr.unshift(val)
  if(maxLen && arr.length > maxLen) {
    arr.pop()//最后一个元素删除
  }
}
//删除元素方法
function deleteFormArray(arr,compare){
  const index = arr.findIndex(compare)
  if (index > -1){
    arr.splice(index,1)
  }
}

export function saveSearch(query){
  let searches = storage.get(SEARCH_KEY,[])
  insertArray(searches,query,(item) => {
    return item === query//把query插入列表中
  },SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY,searches)
  return searches
}
export function deleteSearch(query){
  let searches = storage.get(SEARCH_KEY,[])
  deleteFormArray(searches,(item) => {
    return item === query
  })
  storage.set(SEARCH_KEY,searches)
  return searches
}
//初始化
export function loadSearch(){
  return storage.get(SEARCH_KEY,[])
}



//清空元素
export function clearSearch(){
  storage.remove(SEARCH_KEY)
  return []
}

//播放列表历史
export function savePlay(song){
  let songs = storage.get(PLAY_KEY,[])
  insertArray(songs,song,(item) => {
    return item.id === song.id
  },PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY,songs)
  return songs
}

  //初始化
  export function loadPlay(){
  return storage.get(PLAY_KEY,[])
}
//增
export function saveFavorite(song){
  let songs = storage.get(FAVORITE_KEY,[])
  insertArray(songs,song,(item) => {
    return song.id === item.id
  },FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY,songs)
  return songs
}
//删
export function deleteFavorite(song){
  let songs = storage.get(FAVORITE_KEY,[])
  deleteFormArray(songs,(item) => {
    return song.id === item.id 
  })
  storage.set(FAVORITE_KEY,songs)
  return songs
}
//初始化
export function loadFavorite(){
  return storage.get(FAVORITE_KEY,[])
}

