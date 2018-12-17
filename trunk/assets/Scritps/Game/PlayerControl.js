/* 
	 * @description: 控制主角PlayerControl脚本
	 * @author: Amumu
	 * @created: Amumu (2018-07-21) 
	 * @update: name (XXX-xx-xx)  
*/  

var com = require('Common');

cc.Class({
    extends: cc.Component,

    properties: {
        startSpeed: 50,
        moveDirRot: 90,
        failureAudio: {
            default:null,
            url:cc.AudioClip
        },
        jumpAudio: {
            default: null,
            url: cc.AudioClip
        },
        main:cc.Node,

    },
    // use this for initialization
    onLoad: function () {
        this.index = 0;
        this.node.zIndex = 255;
        this.addTailDt = this.StartSpeed * 0.0005;
        this.speed = 0;
        this.isStop = false;
        this.isFinish = false;

        //获取终点Finish节点
        this.finish = cc.find("Canvas/bg/finish");

        this.onControl();

        this.MapRect = cc.rect(0, 0, this.node.parent.width, this.node.parent.height);
    },

    /*
	 * @desscription: 玩家的操作行为处理
	 * @input:
 	 * @output: 
    */ 
    onControl: function () {
        //全局保存当前玩家
        cc.director.Player = this;
        //获取主角身上的动画组件
        this.ani = this.getComponent(cc.Animation);

        //var len = 500;
        //移动向量
        var moveVec = cc.pForAngle(this.moveDirRot  * (Math.PI / 180));
        this.moveDirVec = moveVec;

        this.node.rotation = -this.moveDirRot;

        //镜头跟随
        var followAction = cc.follow(this.node);
        //followAction.setTag(100);
        //this.node.parent.stopActionByTag(100);
        this.node.parent.runAction(followAction);


        //接收到点击移动的操作信息
        cc.director.GlobalEvent.on('moveTo', function (data) {
           
            //console.log(this + " node active is false");
            var aimVec = cc.director.Player.node.parent.convertTouchToNodeSpace(data);
            
            //目标向量
            var selfVec = cc.p(cc.director.Player.node.x, cc.director.Player.node.y);
            var moveByAimVec = cc.pNormalize(cc.pSub(aimVec, selfVec));
            cc.director.Player.moveDirVec.x = moveByAimVec.x;
            cc.director.Player.moveDirVec.y = moveByAimVec.y;

            var rot = cc.pToAngle(moveByAimVec) * (180 / Math.PI);

            cc.director.Player.node.rotation = -rot;

            
        }, this)

        //接收到加速的消息
        cc.director.GlobalEvent.on('isAddSpeedMove', function (data) {
            var isAdd = data;

            if (isAdd) {
                cc.director.Player.speed = cc.director.Player.startSpeed * 2;
            } else {
                cc.director.Player.speed = cc.director.Player.startSpeed;
            }
            // console.log('重置尾巴动作');
            //this.runAddTailAction()

        }, this)
    },

    
    /*
	 * @desscription: 碰撞回调
	 * @input:other,self //被碰撞者，碰撞者自身
 	 * @output: 
    */
    onCollisionEnter: function (other, self) {
        
        //碰撞到障碍物，游戏结束，主角停止移动
        if(other.node.group === 'barrier')
        {
            
            //碰撞结束主角移动
            this.speed = 0;
            this.isStop = true;
            //播放失败音效
            if (com.getLocalAudioPlay()) {
                cc.audioEngine.play(this.failureAudio,false,2.0);
            } else {
                cc.audioEngine.pause();
            }
            wx.vibrateLong();
            this.main.getComponent('Main').Over();
        }
        
        //主角到达终点，标签变为胜利
        else if(other.node.group === 'finish')
        { 
            this.node.group = 'default';
            this.isStop = true;
            //主角跳跃角度等于终点角度
            this.node.rotation = this.finish.rotation;
             //播放胜利动画
            if(this.node.rotation === 90)
            {
                this.ani.play('fishDrump90');
            }else if(this.node.rotation === 180)
            {
                this.ani.play('fishDrump180');
            }
           else{
                this.ani.play('fishDrump');
           }

           //播放胜利音乐
           if (com.getLocalAudioPlay()) {
                // 跳水音乐
                var audioId = cc.audioEngine.play(this.jumpAudio, false, 1.0);
           }else {
               cc.audioEngine.pauseAll();
           }
           let self = this;
           //主角胜利后，取消碰撞 
           //等待动画播放完毕
           this.scheduleOnce(function(){
                cc.audioEngine.pause(audioId);
                self.main.getComponent('Main').Finish();
                self.node.opacity = 0;
                // 结束跟随
                self.node.parent.pauseAllActions();
           },1); 
           
        }

    },


    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
       

        this.node.x += this.moveDirVec.x * this.speed * dt;
        this.node.y += this.moveDirVec.y * this.speed * dt;

        // if(!cc.rectContainsPoint(this.MapRect, cc.p(this.node.x, this.node.y))){
        //     // this.isStop = true;
        //     // this.node.stopAllActions();
        // }

    },
});
