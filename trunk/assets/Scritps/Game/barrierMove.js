/* 
	 * @description: barrierMove脚本
	 * @author: Amumu
	 * @created: Amumu (2018-07-24) 
	 * @update: name (XXX-xx-xx)  
*/  

var com = require('Common');

cc.Class({
    extends: cc.Component,

    properties: {
        dir:0,
        speed:10,
        disMinX:0,
        disMinY:0,
        disMaxX:0,
        disMaxY:0,
        waterAudio: {
            default:null,
            type:cc.AudioSource
        },
    },

    // LIFE-CYCLE CALLBACKS:
    
     onLoad () {
         
     },

    start () {
         //获取障碍物移动的最小边界值
         this.startY = this.node.y - this.disMinY;
         this.startX = this.node.x - this.disMinX;
         //console.log(this.startY);
         //获取障碍物移动的最大边界值
         //this.maxX += this.node.x;  
        this.endY = this.node.y + this.disMaxY;
        this.endX = this.node.x + this.disMaxX;
    },
    /*
	 * @desscription: 碰撞回调
	 * @input:other,self //被碰撞者，碰撞者自身
 	 * @output: 
    */
   onCollisionEnter: function (other, self) {
       if(other.node.group === 'waterFlower')
       {
           other.node.getComponent(cc.Animation).play();
            //播放水花音效
            if (com.getLocalAudioPlay()) {
                this.waterAudio.play();
            } else {
                this.waterAudio.pause();
            }
       }
   },
    //实现障碍物自动来回移动
    update (dt) {
       
        switch(this.dir)
        {
            case 0:
                this.node.x += this.speed*dt;
                if(this.node.x >= this.endX)
                {
                    this.dir = 1;
                }
            break;
            case 1:
                this.node.x -= this.speed*dt;
                if(this.node.x <= this.startX)
                {
                    this.dir = 0;
                }
            break;
            case 2:
                this.node.y -= this.speed*dt;
                if(this.node.y <= this.startY)
                {
                    this.dir = 3;
                }
            break;
            case 3:
                this.node.y += this.speed*dt;
                if(this.node.y >= this.endY)
                {
                    this.dir = 2;
                }
            break;
            default:
            break;
        }
    },
});
