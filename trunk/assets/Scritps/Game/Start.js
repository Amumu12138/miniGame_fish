/* 
	 * @description: 开始界面StartScene脚本
	 * @author: Amumu
	 * @created: Amumu (2018-07-21) 
	 * @update: name (XXX-xx-xx)  
*/  
var com = require('Common');
cc.Class({
    extends: cc.Component,

    properties: {
       bgAudio:{
           default:null, 
           url:cc.AudioClip                               
       },
       startBtn:{
           default:null,
           type:cc.Node
       },
       bgAudioBtn:{
        default:null,
        type:cc.Node
       },
       rankBtn:{
        default:null,
        type:cc.Node
       },
       //提示按钮
       tipBtn:cc.Node,
       //提示场景
       pretip:cc.Node,
       //场景中提示图标
       icontip:cc.Node,
    },
    
    // use this for initialization
    onLoad: function () {

        //获取用户登录授权
        this.Authorize();
        this.OnShare();
        this.OnTip();

        let self = this;
        //初始化分数
        com.score = 0;
        com.number = 1;
       
        //开启背景音效
        cc.audioEngine.playMusic(this.bgAudio,true);
        cc.director.preloadScene('Level01');
        //实现按钮变大变小动画效果
        var scaleTo = cc.scaleTo(0.8,0.9);
        var reverse = cc.scaleTo(0.8,1);
        var seq = cc.sequence(scaleTo,reverse);
        var repeat = cc.repeatForever(seq);
        this.startBtn.runAction(repeat);
        //点击开始按钮进入游戏第一关
        this.startBtn.on(cc.Node.EventType.TOUCH_START,function(){
            //获取开始按钮音效组件，播放声音
            var startAudio = cc.find('Canvas/img-kaishiyouxi').getComponent(cc.AudioSource);
            startAudio.play();
            cc.audioEngine.pauseMusic();
            cc.director.loadScene('Level0' + 1);
       });

       // 设置静音
       this.bgAudioBtn.on(cc.Node.EventType.TOUCH_START,function () {
            cc.loader.loadRes("Texture/ui/startScene/startScene", cc.SpriteAtlas, function (err, atlas) {
                var frame1 = atlas.getSpriteFrame("img-jinyingliang");
                if (frame1 === self.bgAudioBtn.getComponent(cc.Sprite).spriteFrame) {
                    com.globalAudioPlay = true;
                    cc.sys.localStorage.setItem("audioPlayBol", true);
                    var frame2 = atlas.getSpriteFrame("img-yinliang");
                    self.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = frame2;
                    cc.audioEngine.playMusic(self.bgAudio,true);
                } else {
                    cc.sys.localStorage.setItem("audioPlayBol", false);
                    cc.audioEngine.pauseMusic();
                    com.globalAudioPlay = false;
                    self.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = frame1;
                }
            });
       })
        //跳转到排行榜
        this.rankBtn.on(cc.Node.EventType.TOUCH_START, function () {
            cc.audioEngine.pauseMusic();
            com.preScene = "StartScene";
            cc.director.loadScene("RankList");
        })   

        // 根据本地存储的是否播放开始背景音乐
        if (com.getLocalAudioPlay()) {
            cc.audioEngine.playMusic(self.bgAudio,true);
            com.globalAudioPlay = true;
            cc.loader.loadRes("Texture/ui/startScene/startScene", cc.SpriteAtlas, function (err, altas) {
                self.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = altas.getSpriteFrame("img-yinliang");
            })
        } else {
            cc.audioEngine.pauseMusic();
            com.globalAudioPlay = false;
            cc.loader.loadRes("Texture/ui/startScene/startScene", cc.SpriteAtlas, function (err, altas) {
                self.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = altas.getSpriteFrame("img-jinyingliang");
            })
        };
       

    },
     //显示提示场景
     OnTip:function()
     {
         var self = this;
        this.tipBtn.on('touchstart',function(){
            self.pretip.active = true;
        });
        this.icontip.on('touchstart',function(){
            self.pretip.active = false;
        })
     },
     //获取用户登录授权
    Authorize:function()
    {
        wx.authorize({
            scope: 'scope.record',
            fail: function (res) {
              // iOS 和 Android 对于拒绝授权的回调 errMsg 没有统一，需要做一下兼容处理
              if (res.errMsg.indexOf('auth deny') > -1 || 	res.errMsg.indexOf('auth denied') > -1 ) {
                // 处理用户第一次登陆提示场景
                this.pretip.active = true;
              }    
            }
        })
    },
    //用户被动转发
	OnShare:function(){
        var shareData = com.shareData;
        var share = shareData[Math.round(Math.random() * (shareData.length - 1))];

        cc.loader.loadRes(share.imgUrl, function (err, spriteFrame) {
            wx.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: share.title,
                    imageUrl: spriteFrame.url
                }
            })	
        })       
   },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
