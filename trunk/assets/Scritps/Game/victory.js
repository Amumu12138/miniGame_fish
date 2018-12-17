

var com = require("Common");

cc.Class({
    extends: cc.Component,

    properties: {
        nextLevel: cc.Label,
        toNextLevel: cc.Node,
        victoryAudio: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.nextLevel.getComponent(cc.Label).string = com.number;
        if (com.getLocalAudioPlay()) {
            cc.audioEngine.play(this.victoryAudio, false, 2.0);
        }
        this.toNextLevel.on("touchstart", function () {
            cc.director.loadScene("Level0" + com.number);
        })
    },

    start () {

    },

    // update (dt) {},
});
