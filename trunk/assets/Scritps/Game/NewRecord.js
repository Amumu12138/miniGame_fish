var com = require('Common');
/* 
	 * @description: 新记录场景NewRecord脚本
	 * @author: Amumu
	 * @created: Amumu (2018-08-01) 
	 * @update: name (XXX-xx-xx)  
*/  
cc.Class({
    extends: cc.Component,

    properties: {
        restart: cc.Node,
        home: cc.Node,
        scoreLabel: cc.Label,
        scan: cc.Node,
        endLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad :function() {

        this.endLabel.node.active = false;

        //获取当前关卡分数
        var topScore = cc.sys.localStorage.getItem('topScore'); 
        this.scoreLabel.string = topScore;

        //将积分存储在微信托管数据中
        if (CC_WECHATGAME) {
            window.wx.postMessage({
                messageType: 3,
                MAIN_MENU_NUM: com.MAIN_MENU_NUM,
                score: topScore,
            });
        } else {
           //cc.log("提交得分: x1 : " + topScore)
        }

        // wx.showShareMenu({
        //     withShareTicket:true
        // });
        //点击分享
        // this.share.on('touchstart',function(){
        //     this.getShare();
        // });

        //点击查看排行榜
        this.scan.on('touchstart',function(){
            com.istopScore = true;
            cc.director.loadScene('RankList');
        });
        
        //点击重开事件
        this.restart.on('touchstart',function(){
            cc.director.loadScene('Level0' + com.number);
        });
        //点击返回主页事件
        this.home.on('touchstart',function(){
            cc.director.loadScene('StartScene');
        });

        // 显示敬请期待
        if (com.number > 5) {
            this.endLabel.node.active = true;
        }
     },

     /**
      * @desscription: 获取分享功能
      */
    //  getShare:function()
    //  {
    //     //分享给朋友
    //     wx.onMenuShareAppMessage({
    //         title:'分享',   //分享标题
    //         desc:'',        //分享描述
    //         link:'',        //分享链接
    //         imgUrl:'',      //分享图标
    //         type:'',        //分享类型
    //         dataUrl:'',     //分享类型的数据链接
    //         success:function(){
    //             //用户确认分享后执行的回调函数
    //         },
    //         cancel:function(){
    //             //用户取消分享后的回调函数
    //         },

    //     });
    //  },
    // start () {

    // },

     update (dt) {
        // 显示敬请期待
        if (com.number >= 5) {
            this.endLabel.active = true;
        }
     },
});
