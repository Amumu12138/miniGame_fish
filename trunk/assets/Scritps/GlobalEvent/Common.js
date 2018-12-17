/* 
	 * @description: 全局变量Common脚本
	 * @author: Amumu
	 * @created: Amumu (2018-07-25) 
	 * @update: name (XXX-xx-xx)  
*/  

var common = {
	number: 1,
	costTime: 0,
	topScore: 0,
	score: 0,
	//上一场景名称
	preScene: "",
	MAIN_MENU_NUM:"Classic",
	shareData: [
		{
			title: "我渴望有鱼的自由， 却又怕失去人类的回忆本能",
			imgUrl: "Texture/share/fish-share1"
		},
		{
			title: "可是我只能游个不停，装作鱼 只有七秒的记忆~~",
			imgUrl: "Texture/share/fish-share2"
		},
		{
			title: "[有人@你] 余生，我愿做一条鱼，用七秒的记忆回望我们曾经。",
			imgUrl: "Texture/share/fish-share3"
		},
		{
			title: "你愿意带我走吗，走出这迷雾 ，无论阻力多大",
			imgUrl: "Texture/share/fish-share4"
		}
	],
	globalAudioPlay: true,
	getLocalAudioPlay: function () {
		var audioPlayBol = cc.sys.localStorage.getItem('audioPlayBol');
		if (audioPlayBol) {
			return audioPlayBol;
		} else {
			return this.globalAudioPlay
		}
	},
	


};

module.exports = common;