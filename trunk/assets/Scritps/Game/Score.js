var com = require('Common');
/* 
	 * @description: 得分场景Score脚本
	 * @author: Amumu
	 * @created: Amumu (2018-08-01) 
	 * @update: name (XXX-xx-xx)  
*/
cc.Class({
    extends: cc.Component,

    properties: {
        restart:cc.Node,
        home:cc.Node,
        scoreLabel:cc.Label,
        scan:cc.Node,
        selfInfo:cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad :function() {
         //获取当前关卡分数
         var score = cc.sys.localStorage.getItem('score'); 
         this.scoreLabel.string = score;

         //点击查看排行榜
        this.scan.on('touchstart',function(){
            cc.director.loadScene('RankList');
        });

         //点击重开事件
        this.restart.on('touchstart',function(){
            //console.log('load level01');
            cc.director.loadScene('Level0' + com.number);
        });
        //点击返回主页事件
        this.home.on('touchstart',function(){
            cc.director.loadScene('StartScene');
        });

        if (CC_WECHATGAME) {
            window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 1334;
            window.sharedCanvas.height = 750;
            window.wx.postMessage({
                messageType: 4,
                MAIN_MENU_NUM: com.MAIN_MENU_NUM,
            });
        }

        //this.getUserInfo();

     },
     
    // start () {

    // },
     // 刷新子域的纹理
    _updateSubDomainCanvas() {
       
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.selfInfo.spriteFrame = new cc.SpriteFrame(this.tex);
    },
     update (dt) {
        this._updateSubDomainCanvas()
     },
});
