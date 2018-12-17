var com = require('Common');
/* 
	 * @description: 主函数Main脚本
	 * @author: Amumu
	 * @created: Amumu (2018-07-21) 
	 * @update: name (XXX-xx-xx)  
*/  
cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel:{
            default:null,
            type:cc.Label
        },
        bgAudio: {
            default:null,
            url:cc.AudioClip
        },
        
        playTime:0,
        victoryPrefab: {
            default: null,
            type: cc.Prefab
        }

    },
    // use this for initialization
    onLoad: function () {

        //com.number = 1;
        this.isDoubleClick = false;
        this.isHaveClick = false;
        //判断是否倒计时开始
        this.isStart = false;
        //添加触摸
        this.addTouchEvent();

        //添加碰撞
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        //准备时间
        this.readyTime = this.playTime;

        //获取主角节点
        this.player = cc.find("Canvas/bg/player");
        //主角是否存活标志
        this.isStop = false;
        //游戏是否胜利
        this.isFinish = false;

        
        //播放背景音乐
        // cc.audioEngine.playMusic(this.bgAudio,true);
        if (com.getLocalAudioPlay()) {
            cc.audioEngine.playMusic(this.bgAudio,true);
        } else {
            cc.audioEngine.pauseMusic();
        }
    },

    /*
	 * @desscription: 添加触摸监控
	 * @input:
 	 * @output: 
    */
    addTouchEvent: function() {
        var dt = 0.3;//双击的间隔时间

        this.node.on(cc.Node.EventType.TOUCH_START, function(event) {
            //点击开始倒计时
            this.isStart = true;
            cc.director.GlobalEvent.emit('moveTo', event.touch)


            //==============双击的判断===================
            if (this.isHaveClick) {
                this.isDoubleClick = true;
                //console.log('双击！');
                cc.director.GlobalEvent.emit('isAddSpeedMove', true)
            }
            this.isHaveClick = true;
            var action = cc.sequence(
                cc.delayTime(dt),
                cc.callFunc(function(){
                    this.isHaveClick = false;
                }, this),
            )
            //==========================================
            
            //action.setTag(255)
            //this.node.stopActionByTag(255)
            this.node.runAction(action)
        }, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function(event) {
            
            cc.director.GlobalEvent.emit('moveTo', event.touch);
            
        }, this)
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            //松开一定要恢复原速
            cc.director.GlobalEvent.emit('isAddSpeedMove', false);
        }, this)
    },
    //分数写到本地（当前分 最高分）
    updateScore: function() {
    
        var currentScore = com.score;
        
        var pretopScore = com.topScore;
        //console.log(pretopScore);
        com.preScene = 'Score';
        //寻找本地数据中当前关卡的得分大于最高分，则当前分数成为最高分
        if ( pretopScore < currentScore ){
            com.preScene = 'NewRecord';
            com.topScore = currentScore;
            cc.sys.localStorage.setItem('topScore', currentScore); 
        }
        cc.sys.localStorage.setItem('score', currentScore); 
    },
     /*
	 * @desscription: 获取得分
	 * @input:
 	 * @output: 
    */
   getScore:function()
   {
        com.score += com.number * 100 + com.number * 10 * this.playTime.toFixed(1);
   },
    /*
	 * @desscription: 游戏结束
	 * @input:
 	 * @output: 
    */
    Over:function()
    {
        //记录当前关卡用时
        com.costTime = this.readyTime - this.playTime;
        //console.log(this.costTime);

        this.updateScore();
        //进入下一场景
        cc.director.loadScene(com.preScene);
 
        //关闭背景音乐
        cc.audioEngine.pauseMusic();
    },

     /*
	 * @desscription: 游戏胜利，进入下一场景
	 * @input:
 	 * @output: 
    */
    Finish:function()
    {
        this.player.getComponent('PlayerControl').speed = 0;
        this.getScore();
        com.number++;
        if(com.number > 5){ 

            com.number = 5;
            this.Over();
        }else{
            var victory = cc.instantiate(this.victoryPrefab);
            this.node.addChild(victory);
        }
        
        cc.audioEngine.pauseMusic();
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    
    //获取主角此时的状态
    this.isStop = this.player.getComponent('PlayerControl').isStop;

    //游戏失败,进入Over,
    if(this.playTime <= 0)
    {
        this.Over();
    }
    //开始游戏显示时间
    this.timeLabel.string = this.playTime.toFixed(3);
    //判断主角是否存活
    if(this.isStop === false && this.isStart === true)
    {
        this.playTime -= dt;
        //游戏时间结束
        if(this.playTime <= 0){
            this.playTime = 0;
            //console.log('Time Up');   
            cc.audioEngine.pauseMusic();
        }
    }
    this.timeLabel.string = this.playTime.toFixed(3);
    

    },
});
