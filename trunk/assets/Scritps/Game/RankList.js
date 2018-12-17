
/* 
	 * @description:排行榜场景RankList脚本 
	 * @author: Amumu
	 * @created: Amumu (2018-08-02) 
	 * @update: name (XXX-xx-xx)  
*/  
var com = require('Common');
var globalList = require("GlobalRankList");
var rankList = [];
var worldRankBol = true;


cc.Class({
    extends: cc.Component,

    properties: {
        back:cc.Node,
        groupRank: cc.Node,
  
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {


        // 默认显示世界排行榜
        rankList.push(...globalList);


        var self = this;
        //群聊，会获得shareTicket
        wx.updateShareMenu({
            withShareTicket: true
        })


        //点击返回按钮，返回上一场景
        this.back.on('touchstart',function(){
            
            cc.director.loadScene(com.preScene);  
        });

        // 分享查看群排行榜
        this.groupRank.on("touchstart", function () {
            var shareData = com.shareData;
            var share = shareData[Math.round(Math.random() * 3)];
            cc.loader.loadRes(share.imgUrl, function (err, spriteFrame) {
                wx.shareAppMessage({
                    title: share.title,
                    imageUrl: spriteFrame.url,
                    success: function (res) {
                        //getSystemInfo是为了获取当前设备信息，判断是android还是ios，如果是android
                        //还需要调用wx.getShareInfo()，只有当成功回调才是转发群，ios就只需判断shareTickets
                        //获取用户设备信息
                        wx.getSystemInfo({
                            success: function (d) {
                                console.log(d);
                                //判断用户手机是IOS还是Android
                                if (d.platform == 'android') {
                                    wx.getShareInfo({//获取群详细信息
                                        shareTicket: res.shareTickets,
                                        success: function (res) {
                                            //这里写你分享到群之后要做的事情，比如增加次数什么的
                                            if (CC_WECHATGAME) {
                                                // 发消息给子域
                                                window.wx.postMessage({
                                                    messageType: 5,
                                                    MAIN_MENU_NUM: com.MAIN_MENU_NUM,
                                                });
                                            }
                                        },
                                        fail: function (res) {//这个方法就是分享到的是好友，给一个提示
                                            wx.showModal({
                                                title: '提示',
                                                content: '分享好友无效，请分享群',
                                                success: function (res) {
                                                    if (res.confirm) {
                                                        console.log('用户点击确定')
                                                    } else if (res.cancel) {
                                                        console.log('用户点击取消')
                                                    }
                                                }
                                            })
                                        }
                                    })
                                }
                                if (d.platform == 'ios') {//如果用户的设备是IOS
                                    if (res.shareTickets != undefined) {
                                        console.log("分享的是群");
                                        wx.getShareInfo({
                                            shareTicket: res.shareTickets,
                                            success: function (res) {
                                                //分享到群之后你要做的事情
                                            }
                                        })
         
                                    } else {//分享到个人要做的事情，我给的是一个提示
                                        console.log("分享的是个人");
                                        wx.showModal({
                                            title: '提示',
                                            content: '分享好友无效，请分享群',
                                            success: function (res) {
                                                if (res.confirm) {
                                                    console.log('用户点击确定')
                                                } else if (res.cancel) {
                                                    console.log('用户点击取消')
                                                }
                                            }
                                        })
                                    }
                                }
         
                            }
                        })
                    },
                    fail: function (data) {
                        
                    }
                })
            })
        });

        // 监听显示为世界排行榜还是好友排行榜
        //this.worldRankBtn.on("touchstart", this.judgeRankList, this)
        //this.friendRankBtn.on("touchstart", this.judgeRankList, this);

        // 排行榜数据显示
        // for (var i = 0; i < rankList.length; i++) {
        //     var newList = cc.instantiate(this.listPrefab);
        //     // cc.log(newList.children[1]);
        //     newList.children[1].children[2].getComponent(cc.Label).string = rankList[i].wxName;
        //     newList.children[1].children[3].getComponent(cc.Label).string = rankList[i].score;
        //     newList.getComponent(cc.Widget).top = 100 * i;
        //     if (i % 2 === 1) {
        //         newList.children[0].opacity = 26;
        //     }
        //     cc.loader.loadRes("Texture/Public/defaultPortrait", cc.SpriteFrame, function (err, spriteFrame) {
        //         newList.children[1].children[1].getComponent(cc.Sprite).spriteFrame = spriteFrame;
        //     });
        //     this.rankContent.height = 100 * (i + 1);
        //     this.rankContent.getComponent(cc.Widget).top = 0;
        //     this.rankContent.addChild(newList);
        // }

    },

    // 监听显示为世界排行榜还是好友排行榜
    // bug
    // judgeRankList () {
    //     if (worldRankBol) {
    //         worldRankBol = true;
    //         this.worldRankBtn.children[0].opacity = 41;
    //         this.friendRankBtn.children[0].opacity = 25.5;
    //         rankList.length = 0;
    //     } else {
    //         worldRankBol = false;
    //         this.worldRankBtn.children[0].opacity = 25.5;
    //         this.friendRankBtn.children[0].opacity = 41;
    //         rankList.length = 0;
    //         rankList.push(...globalList);
    //     }
    // },

    start () {

    },

    update (dt) {
        // if (!rankList.length) {
        //     for (let i = 0; i < this.rankContent.children.length; i++) {
        //         this.rankContent.children[i].removeFromParent(false);
        //     }
        // } else {
        //     for (var i = 0; i < rankList.length; i++) {
        //         var newList = cc.instantiate(this.listPrefab);
        //         // cc.log(newList.children[1]);
        //         newList.children[1].children[2].getComponent(cc.Label).string = rankList[i].wxName;
        //         newList.children[1].children[3].getComponent(cc.Label).string = rankList[i].score;
        //         newList.getComponent(cc.Widget).top = 100 * i;
        //         if (i % 2 === 1) {
        //             newList.children[0].opacity = 26;
        //         }
        //         cc.loader.loadRes("Texture/Public/defaultPortrait", cc.SpriteFrame, function (err, spriteFrame) {
        //             newList.children[1].children[1].getComponent(cc.Sprite).spriteFrame = spriteFrame;
        //         });
        //         this.rankContent.height = 120 * (i + 1);
        //         this.rankContent.getComponent(cc.Widget).top = 0;
        //         this.rankContent.addChild(newList);
        //     }
        // }
    },
});
