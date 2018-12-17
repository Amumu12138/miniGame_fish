

// 分享

var com = require('Common');

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.on("touchstart", this.onShare, this);
    },

    onShare (event) {
        var shareData = com.shareData;
        var share = shareData[Math.round(Math.random() * (shareData.length - 1))];
        cc.loader.loadRes(share.imgUrl, function (err, spriteFrame) {
            wx.shareAppMessage({
                title: share.title,
                imageUrl: spriteFrame.url
            })
        })
    },

    start () {

    },

    // update (dt) {},
});
