import {request} from './request.js'

export function getSongUrl(id){
  return request({
    url:'/song/urls',
    params:{
      id
    }
  })

}

export class Song {
  constructor({id,mid,singer,name,album,duration,image,url}){
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function getLyric(songmid){
  return request({
    url:'/lyric',
    params:{
      songmid
    }
  })
}

export function getSongList(id){
  return request({
    url:'/songlist',
    params:{
      id
    }
  })
}

