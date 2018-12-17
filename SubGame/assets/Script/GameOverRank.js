/* 
	 * @description: 子域GameOverRank脚本
	 * @author: Amumu
	 * @created: Amumu (2018-08-06) 
	 * @update: name (XXX-xx-xx)  
*/  
cc.Class({
    extends: cc.Component,
    name: "GameOverRank",
    properties: {
        backSprite: cc.Node,
        rankLabel: cc.Label,
        avatarImgSprite: cc.Sprite,
        nickLabel: cc.Label,
        topScoreLabel: cc.Label,
        //numFont:cc.Font,
    },
    start() {

    },

    init: function (rank, data,isPlayer) {
     
        let avatarUrl = data.avatarUrl;
        // let nick = data.nickname.length <= 10 ? data.nickname : data.nickname.substr(0, 10) + "...";
        let nick = data.nickname;
        let grade = data.KVDataList.length != 0 ? data.KVDataList[0].value : 0;

        if (rank % 2 == 0) {
            this.backSprite.opacity = new cc.Color(55, 55, 55, 255);
        }
        if (isPlayer) {
            this.backSprite.opacity = 41;        
            this.avatarImgSprite.node.scale = 1.2;
        }

        this.rankLabel.string = (rank + 1).toString();
        this.createImage(avatarUrl);
        this.nickLabel.string = nick;
        
        this.topScoreLabel.string = grade.toString();
        
       
    },
    createImage(avatarUrl) {
        if (CC_WECHATGAME) {
            try {
                let image = wx.createImage();
                image.onload = () => {
                    try {
                        let texture = new cc.Texture2D();
                        texture.initWithElement(image);
                        texture.handleLoadedTexture();
                        this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
                    } catch (e) {
                        cc.log(e);
                        this.avatarImgSprite.node.active = false;
                    }
                };
                image.src = avatarUrl;
            }catch (e) {
                cc.log(e);
                this.avatarImgSprite.node.active = false;
            }
        } else {
            cc.loader.load({
                url: avatarUrl, type: 'jpg'
            }, (err, texture) => {
                this.avatarImgSprite.spriteFrame = new cc.SpriteFrame(texture);
            });
        }
    }

});
