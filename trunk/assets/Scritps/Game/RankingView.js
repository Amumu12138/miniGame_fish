/* 
	 * @description: 排行榜界面RankingView脚本
	 * @author: Amumu
	 * @created: Amumu (2018-08-06) 
	 * @update: name (XXX-xx-xx)  
*/ 
var com = require("Common");
var globalList = require("GlobalRankList");

cc.Class({
    extends: cc.Component,
    name: "RankingView",
    properties: {
        worldRank: cc.Node,
        friendRank: cc.Node,
        rankingScrollView: cc.Sprite,//显示排行榜
        worldPrefab: {
            default: null,
            type: cc.Prefab
        },
        worldRankList: cc.Node,
        worldPortraitList: {
            type: cc.SpriteFrame,
            default: []
        }
    },
    onLoad() {
        var self = this;
        self.isHaveClick = false;
        //加载自定义字体
        // this.family = wx.loadFont("Font/num.ttf");
        if (CC_WECHATGAME) {
            window.wx.showShareMenu({withShareTicket: true});//设置分享按钮，方便获取群id展示群排行榜
            this.tex = new cc.Texture2D();
            window.sharedCanvas.width = 1334;
            window.sharedCanvas.height = 750;
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: com.MAIN_MENU_NUM,
            });
        }

         //点击查看好友排行榜
        this.friendRank.on('touchstart',function(){
            self.worldRankList.active = false;
            self.worldRank.children[0].opacity = 26;
            self.friendRank.children[0].opacity = 41;
            self.friendRank.children[1].opacity = 255;
            self.worldRank.children[1].opacity = 180;
            if(!self.isHaveClick)
            {
                self.friendRankFunc();
                self.isHaveClick = !self.isHaveClick;
            }
            
        });
        //点击查看世界排行榜
        this.worldRank.on('touchstart',function(){
            self.isHaveClick = false;

            self.worldRank.children[0].opacity = 41;
            self.friendRank.children[0].opacity = 26;
            self.friendRank.children[1].opacity = 180;
            self.worldRank.children[1].opacity = 255;
            self.worldRankFunc();
        });
    },
    start() {
          
    },
    //好友排行榜
    friendRankFunc:function() {
        if (CC_WECHATGAME) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 1,
                MAIN_MENU_NUM: com.MAIN_MENU_NUM,
                // font:this.family,
            });
        } else {
            cc.log("获取好友排行榜数据。x1");
        }
    },
    //世界排行
    worldRankFunc: function () {
        this.worldRankList.children[0].children[0].removeAllChildren();
        if (CC_WECHATGAME) {
            // 发消息给子域
            window.wx.postMessage({
                messageType: 6,
                MAIN_MENU_NUM: com.MAIN_MENU_NUM,
            });
        }

        

        this.worldRankList.active = true;

        var rankList = [];
        rankList.push(...globalList);
        //给伪数据排序
        var compare = function(obj1,obj2){
            var va1 = obj1.score;
            var va2 = obj2.score;
            if(va1 < va2){
                return 1;
            }
            else if(va1 > va2)
            {
                return -1;
            } else {
                return 0;
            }
        }
        rankList.sort(compare);
        //生成伪数据排行榜
        for(var i = 0;i < rankList.length;i++)
        {
            var newList = cc.instantiate(this.worldPrefab);
            
            if(i % 2 === 1)
            {
                newList.children[0].opacity = 41;
            }
           
            newList.children[1].children[0].getComponent(cc.Label).string = i + 1;
            newList.children[1].children[1].getComponent(cc.Sprite).spriteFrame = this.worldPortraitList[i];
            newList.children[1].children[2].getComponent(cc.Label).string = rankList[i].wxName;
            newList.children[1].children[3].getComponent(cc.Label).string = rankList[i].score;
            newList.getComponent(cc.Widget).top = i * 100;

            this.worldRankList.children[0].children[0].addChild(newList);
        }
    },

   

    // 刷新子域的纹理
    _updateSubDomainCanvas() {
        if (window.sharedCanvas != undefined) {
            this.tex.initWithElement(window.sharedCanvas);
            this.tex.handleLoadedTexture();
            this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
            // if (!this.tex) {
            //     return;
            // }
            // var openDataContext = wx.getOpenDataContext();
            // var sharedCanvas = openDataContext.canvas;
            // this.tex.initWithElement(sharedCanvas);
            // this.tex.handleLoadedTexture();
            // this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex);
        }
    },
    update() {
        this._updateSubDomainCanvas();
    },
});
