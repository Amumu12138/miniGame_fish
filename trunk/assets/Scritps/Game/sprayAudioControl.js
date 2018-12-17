
var com = require('Common');

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (com.getLocalAudioPlay()) {
            this.node.getComponent(cc.AudioSource).loop = true;
            this.node.getComponent(cc.AudioSource).play();
        } else {
            this.node.getComponent(cc.AudioSource).pause();
        }
    },

    start () {

    },

    // update (dt) {},
});
