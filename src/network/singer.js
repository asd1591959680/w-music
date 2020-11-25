import {request} from './request.js'


export function getSingerList(){
  return request({
    url:"/singer/list",
  })
}

export class Singer {
  constructor({id,name,avatar}){
    this.id =id,
    this.name = name,
    this.avatar = avatar
  }
}

export function getSingerDetail(singermid,num){
  return request({
    url:'/singer/songs',
    params:{
      singermid,
      num
    }
  })
}
//在服务器上设置cookie
export function getCookie(){
  return request({
    method:'post',
    url:'/user/setCookie',
    data:{
      data:'RK=DEiss8zXGI; ptcz=da5a02532d190f26367500b5631da2753ba93fdf79e1de9b6961e7880631ef47; ptui_loginuin=848603414; pgv_pvi=1498016768; pgv_pvid=4187918960; ts_uid=6208093108; tmeLoginType=2; psrf_qqunionid=; euin=NevF7wni7e6P; psrf_qqopenid=AE510E842656BD7391BA7627D8155182; psrf_qqaccess_token=495E36E140AB97F995B95B9866380DA2; uin=848603414; yq_index=0; yqq_stat=0; pgv_info=ssid=s4783431315; ts_last=y.qq.com/; pgv_si=s379108352; _qpsvr_localtk=0.2798851461725864; qqmusic_key=Q_H_L_2iVet_50eOhQktv14CCJiYj76W3M0ReZyXb2x3MmztOZc-0Rx2Gk2R9OcxQBJs3; psrf_musickey_createtime=1605870075; psrf_access_token_expiresAt=1613646075; psrf_qqrefresh_token=E4007AD140B59DE564AD78926445CC51; qm_keyst=Q_H_L_2iVet_50eOhQktv14CCJiYj76W3M0ReZyXb2x3MmztOZc-0Rx2Gk2R9OcxQBJs3; userAction=1; ts_refer=ADTAGmyqq'
    }
  })
}
//console.log(getCookie().then((res) =>{
//  console.log(res);
//}));

