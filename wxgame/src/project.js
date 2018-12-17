require = function c(r, a, s) {
  function d(t, e) {
    if (!a[t]) {
      if (!r[t]) {
        var o = "function" == typeof require && require;
        if (!e && o) return o(t, !0);
        if (l) return l(t, !0);
        var i = new Error("Cannot find module '" + t + "'");
        throw i.code = "MODULE_NOT_FOUND", i
      }
      var n = a[t] = {
        exports: {}
      };
      r[t][0].call(n.exports, function (e) {
        return d(r[t][1][e] || e)
      }, n, n.exports, c, r, a, s)
    }
    return a[t].exports
  }
  for (var l = "function" == typeof require && require, e = 0; e < s.length; e++) d(s[e]);
  return d
}({
  Common: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "ac67didAVhHOKf1k0Sai20V", "Common");
    var i = {
      number: 1,
      costTime: 0,
      topScore: 0,
      score: 0,
      preScene: "",
      MAIN_MENU_NUM: "Classic",
      shareData: [{
        title: "我渴望有鱼的自由， 却又怕失去人类的回忆本能",
        imgUrl: "Texture/share/fish-share1"
      }, {
        title: "可是我只能游个不停，装作鱼 只有七秒的记忆~~",
        imgUrl: "Texture/share/fish-share2"
      }, {
        title: "[有人@你] 余生，我愿做一条鱼，用七秒的记忆回望我们曾经。",
        imgUrl: "Texture/share/fish-share3"
      }, {
        title: "你愿意带我走吗，走出这迷雾 ，无论阻力多大",
        imgUrl: "Texture/share/fish-share4"
      }],
      globalAudioPlay: !0,
      getLocalAudioPlay: function () {
        var e = cc.sys.localStorage.getItem("audioPlayBol");
        return e || this.globalAudioPlay
      },
      
    };
    t.exports = i, cc._RF.pop()
  }, {}],
  GlobalRankList: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "18f74BmsGNN/5wKviNllR1u", "GlobalRankList");
    t.exports = [{
      wxName: "M",
      score: "2599",
      portrait: "Image/portrait1"
    }, {
      wxName: "雪茄",
      score: "2556",
      portrait: "Image/portrait2"
    }, {
      wxName: "往事如风",
      score: "2748",
      portrait: "Image/portrait3"
    }, {
      wxName: "Chaos Orb",
      score: "2533",
      portrait: "Image/portrait4"
    }, {
      wxName: "丝雨微凉",
      score: "2792",
      portrait: "Image/portrait5"
    }, {
      wxName: "小猪佩奇爹",
      score: "2875",
      portrait: "Image/portrait6"
    }, {
      wxName: "请记住我",
      score: "2693",
      portrait: "Image/portrait7"
    }, {
      wxName: "卖女孩的小火柴",
      score: "2711",
      portrait: "Image/portrait8"
    }, {
      wxName: "YJ",
      score: "2785",
      portrait: "Image/portrait9"
    }, {
      wxName: "冰晶",
      score: "2596",
      portrait: "Image/portrait10"
    }, {
      wxName: "梦灭",
      score: "2658",
      portrait: "Image/portrait11"
    }, {
      wxName: "w_hhhhhh",
      score: "2812",
      portrait: "Image/portrait12"
    }, {
      wxName: "嗦不出话",
      score: "2731",
      portrait: "Image/portrait13"
    }, {
      wxName: "程序量",
      score: "2501",
      portrait: "Image/portrait14"
    }, {
      wxName: "橙子",
      score: "2695",
      portrait: "Image/portrait15"
    }, {
      wxName: "終わらない夢",
      score: "2787",
      portrait: "Image/portrait16"
    }, {
      wxName: "雪奈",
      score: "2535",
      portrait: "Image/portrait17"
    }, {
      wxName: "77小龙虾",
      score: "2679",
      portrait: "Image/portrait18"
    }, {
      wxName: "Cynthia",
      score: "2819",
      portrait: "Image/portrait19"
    }, {
      wxName: "楠|楠~lose",
      score: "2847",
      portrait: "Image/portrait20"
    }, {
      wxName: "三宝猫咪",
      score: "2676",
      portrait: "Image/portrait21"
    }], cc._RF.pop()
  }, {}],
  Main: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "44b3dAfTkNGS5YESzoJTE1X", "Main");
    var i = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        timeLabel: {
          default: null,
          type: cc.Label
        },
        bgAudio: {
          default: null,
          url: cc.AudioClip
        },
        playTime: 0,
        victoryPrefab: {
          default: null,
          type: cc.Prefab
        }
      },
      onLoad: function () {
        
        this.OnShare();
        this.isDoubleClick = !1, this.isHaveClick = !1, this.isStart = !1, this.addTouchEvent(), cc.director
          .getCollisionManager().enabled = !0, this.readyTime = this.playTime, this.player = cc.find(
            "Canvas/bg/player"), this.isStop = !1, this.isFinish = !1, i.getLocalAudioPlay() ? cc.audioEngine
              .playMusic(this.bgAudio, !0) : cc.audioEngine.pauseMusic()
      },
      addTouchEvent: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
          this.isStart = !0, cc.director.GlobalEvent.emit("moveTo", e.touch), this.isHaveClick && (this.isDoubleClick = !
            0, cc.director.GlobalEvent.emit("isAddSpeedMove", !0)), this.isHaveClick = !0;
          var t = cc.sequence(cc.delayTime(.3), cc.callFunc(function () {
            this.isHaveClick = !1
          }, this));
          this.node.runAction(t)
        }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
          cc.director.GlobalEvent.emit("moveTo", e.touch)
        }, this), this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
          cc.director.GlobalEvent.emit("isAddSpeedMove", !1)
        }, this)
      },
      updateScore: function () {
        var e = i.score,
          t = i.topScore;
        i.preScene = "Score", t < e && (i.preScene = "NewRecord", i.topScore = e, cc.sys.localStorage.setItem(
          "topScore", e)), cc.sys.localStorage.setItem("score", e)
      },
      getScore: function () {
        i.score += 100 * i.number + 10 * i.number * this.playTime.toFixed(1)
      },
      Over: function () {
        i.costTime = this.readyTime - this.playTime, this.updateScore(), cc.director.loadScene(i.preScene),
          cc.audioEngine.pauseMusic()
      },
      Finish: function () {
        if (this.player.getComponent("PlayerControl").speed = 0, this.getScore(), i.number++ , 5 < i.number)
          i.number = 5, this.Over();
        else {
          var e = cc.instantiate(this.victoryPrefab);
          this.node.addChild(e)
        }
        cc.audioEngine.pauseMusic()
      },
      //用户被动转发
      OnShare: function () {
        var shareData = i.shareData;
        var share = shareData[Math.round(Math.random() * (shareData.length - 1))];
        wx.onShareAppMessage(function () {
          // 用户点击了“转发”按钮
          return {
            title: share.title,
            imageUrl: spriteFrame.url
          }
        })

      },
      update: function (e) {
        this.isStop = this.player.getComponent("PlayerControl").isStop, this.playTime <= 0 && this.Over(),
          this.timeLabel.string = this.playTime.toFixed(3), !1 === this.isStop && !0 === this.isStart &&
          (this.playTime -= e, this.playTime <= 0 && (this.playTime = 0, cc.audioEngine.pauseMusic())),
          this.timeLabel.string = this.playTime.toFixed(3)
      }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  NewRecord: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "74f0eADI5tOl7xtuKgX9G0A", "NewRecord");
    var i = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        restart: cc.Node,
        home: cc.Node,
        scoreLabel: cc.Label,
        scan: cc.Node,
        endLabel: cc.Label
      },
      onLoad: function () {
        this.endLabel.node.active = !1;
        var e = cc.sys.localStorage.getItem("topScore");
        this.scoreLabel.string = e, window.wx.postMessage({
          messageType: 3,
          MAIN_MENU_NUM: i.MAIN_MENU_NUM,
          score: e
        }), this.scan.on("touchstart", function () {
          i.istopScore = !0, cc.director.loadScene("RankList")
        }), this.restart.on("touchstart", function () {
          cc.director.loadScene("Level0" + i.number)
        }), this.home.on("touchstart", function () {
          cc.director.loadScene("StartScene")
        }), 5 < i.number && (this.endLabel.node.active = !0)
      },
      update: function (e) {
        5 <= i.number && (this.endLabel.active = !0)
      }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  Over: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "ee2dfRMVy1J+ZcSd1l5T365", "Over"), cc.Class({
      extends: cc.Component,
      properties: {
        btnRestart: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function () {
        this.btnRestart.on("touchstart", function () {
          cc.director.loadScene("MainScene")
        })
      }
    }), cc._RF.pop()
  }, {}],
  PlayerControl: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "0d4d1CPPNBNE7B8OHn6TZD2", "PlayerControl");
    var n = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        startSpeed: 50,
        moveDirRot: 90,
        failureAudio: {
          default: null,
          url: cc.AudioClip
        },
        jumpAudio: {
          default: null,
          url: cc.AudioClip
        },
        main: cc.Node
      },
      onLoad: function () {
        this.index = 0, this.node.zIndex = 255, this.addTailDt = 5e-4 * this.StartSpeed, this.speed = 0,
          this.isStop = !1, this.isFinish = !1, this.finish = cc.find("Canvas/bg/finish"), this.onControl(),
          this.MapRect = cc.rect(0, 0, this.node.parent.width, this.node.parent.height)
      },
      onControl: function () {
        (cc.director.Player = this).ani = this.getComponent(cc.Animation);
        var e = cc.pForAngle(this.moveDirRot * (Math.PI / 180));
        this.moveDirVec = e, this.node.rotation = -this.moveDirRot;
        var t = cc.follow(this.node);
        this.node.parent.runAction(t), cc.director.GlobalEvent.on("moveTo", function (e) {
          var t = cc.director.Player.node.parent.convertTouchToNodeSpace(e),
            o = cc.p(cc.director.Player.node.x, cc.director.Player.node.y),
            i = cc.pNormalize(cc.pSub(t, o));
          cc.director.Player.moveDirVec.x = i.x, cc.director.Player.moveDirVec.y = i.y;
          var n = cc.pToAngle(i) * (180 / Math.PI);
          cc.director.Player.node.rotation = -n
        }, this), cc.director.GlobalEvent.on("isAddSpeedMove", function (e) {
          var t = e;
          cc.director.Player.speed = t ? 2 * cc.director.Player.startSpeed : cc.director.Player.startSpeed
        }, this)
      },
      onCollisionEnter: function (e, t) {
        if ("barrier" === e.node.group) this.speed = 0, this.isStop = !0, n.getLocalAudioPlay() ? cc.audioEngine
          .play(this.failureAudio, !1, 2) : cc.audioEngine.pause(), wx.vibrateLong(), this.main.getComponent(
            "Main").Over();
        else if ("finish" === e.node.group) {
          if (this.node.group = "default", this.isStop = !0, this.node.rotation = this.finish.rotation,
            90 === this.node.rotation ? this.ani.play("fishDrump90") : 180 === this.node.rotation ?
              this.ani.play("fishDrump180") : this.ani.play("fishDrump"), n.getLocalAudioPlay()) var o =
                cc.audioEngine.play(this.jumpAudio, !1, 1);
          else cc.audioEngine.pauseAll();
          var i = this;
          this.scheduleOnce(function () {
            cc.audioEngine.pause(o), i.main.getComponent("Main").Finish(), i.node.opacity = 0, i.node.parent
              .pauseAllActions()
          }, 1)
        }
      },
      update: function (e) {
        this.node.x += this.moveDirVec.x * this.speed * e, this.node.y += this.moveDirVec.y * this.speed *
          e
      }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  RankList: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "a29b7YK/E5NY6MoyRcxqtHr", "RankList");
    var i = e("Common"),
      n = e("GlobalRankList"),
      c = [];
    cc.Class({
      extends: cc.Component,
      properties: {
        back: cc.Node,
        groupRank: cc.Node
      },
      onLoad: function () {
        c.push.apply(c, function (e) {
          if (Array.isArray(e)) {
            for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
            return o
          }
          return Array.from(e)
        }(n));
        wx.updateShareMenu({
          withShareTicket: !0
        }), this.back.on("touchstart", function () {
          cc.director.loadScene(i.preScene)
        }), this.groupRank.on("touchstart", function () {
          var o = i.shareData[Math.round(3 * Math.random())];
          cc.loader.loadRes(o.imgUrl, function (e, t) {
            wx.shareAppMessage({
              title: o.title,
              imageUrl: t.url,
              success: function (t) {
                wx.getSystemInfo({
                  success: function (e) {
                    console.log(e), "android" == e.platform && wx.getShareInfo({
                      shareTicket: t.shareTickets,
                      success: function (e) {
                        window.wx.postMessage({
                          messageType: 5,
                          MAIN_MENU_NUM: i.MAIN_MENU_NUM
                        })
                      },
                      fail: function (e) {
                        wx.showModal({
                          title: "提示",
                          content: "分享好友无效，请分享群",
                          success: function (e) {
                            e.confirm ? console.log("用户点击确定") : e.cancel && console.log(
                              "用户点击取消")
                          }
                        })
                      }
                    }), "ios" == e.platform && (null != t.shareTickets ? (console.log("分享的是群"),
                      wx.getShareInfo({
                        shareTicket: t.shareTickets,
                        success: function (e) { }
                      })) : (console.log("分享的是个人"), wx.showModal({
                        title: "提示",
                        content: "分享好友无效，请分享群",
                        success: function (e) {
                          e.confirm ? console.log("用户点击确定") : e.cancel && console.log(
                            "用户点击取消")
                        }
                      })))
                  }
                })
              },
              fail: function (e) { }
            })
          })
        })
      },
      start: function () { },
      update: function (e) { }
    }), cc._RF.pop()
  }, {
    Common: "Common",
    GlobalRankList: "GlobalRankList"
  }],
  RankingView: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "aa851mP3iVKzIGOH2fAPMdD", "RankingView");
    var i = e("Common"),
      n = e("GlobalRankList");
    cc.Class({
      extends: cc.Component,
      name: "RankingView",
      properties: {
        worldRank: cc.Node,
        friendRank: cc.Node,
        rankingScrollView: cc.Sprite,
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
      onLoad: function () {
        var e = this;
        e.isHaveClick = !1, window.wx.showShareMenu({
          withShareTicket: !0
        }), this.tex = new cc.Texture2D, window.sharedCanvas.width = 1334, window.sharedCanvas.height = 750,
          window.wx.postMessage({
            messageType: 1,
            MAIN_MENU_NUM: i.MAIN_MENU_NUM
          }), this.friendRank.on("touchstart", function () {
            e.worldRankList.active = !1, e.worldRank.children[0].opacity = 26, e.friendRank.children[0].opacity =
              41, e.friendRank.children[1].opacity = 255, e.worldRank.children[1].opacity = 180, e.isHaveClick ||
              (e.friendRankFunc(), e.isHaveClick = !e.isHaveClick)
          }), this.worldRank.on("touchstart", function () {
            e.isHaveClick = !1, e.worldRank.children[0].opacity = 41, e.friendRank.children[0].opacity = 26,
              e.friendRank.children[1].opacity = 180, e.worldRank.children[1].opacity = 255, e.worldRankFunc()
          })
      },
      start: function () { },
      friendRankFunc: function () {
        window.wx.postMessage({
          messageType: 1,
          MAIN_MENU_NUM: i.MAIN_MENU_NUM
        })
      },
      worldRankFunc: function () {
        this.worldRankList.children[0].children[0].removeAllChildren(), window.wx.postMessage({
          messageType: 6,
          MAIN_MENU_NUM: i.MAIN_MENU_NUM
        }), this.worldRankList.active = !0;
        var e = [];
        e.push.apply(e, function (e) {
          if (Array.isArray(e)) {
            for (var t = 0, o = Array(e.length); t < e.length; t++) o[t] = e[t];
            return o
          }
          return Array.from(e)
        }(n));
        e.sort(function (e, t) {
          var o = e.score,
            i = t.score;
          return o < i ? 1 : i < o ? -1 : 0
        });
        for (var t = 0; t < e.length; t++) {
          var o = cc.instantiate(this.worldPrefab);
          t % 2 == 1 && (o.children[0].opacity = 41), o.children[1].children[0].getComponent(cc.Label).string =
            t + 1, o.children[1].children[1].getComponent(cc.Sprite).spriteFrame = this.worldPortraitList[
            t], o.children[1].children[2].getComponent(cc.Label).string = e[t].wxName, o.children[1].children[
              3].getComponent(cc.Label).string = e[t].score, o.getComponent(cc.Widget).top = 100 * t,
            this.worldRankList.children[0].children[0].addChild(o)
        }
      },
      _updateSubDomainCanvas: function () {
        null != window.sharedCanvas && (this.tex.initWithElement(window.sharedCanvas), this.tex.handleLoadedTexture(),
          this.rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex))
      },
      update: function () {
        this._updateSubDomainCanvas()
      }
    }), cc._RF.pop()
  }, {
    Common: "Common",
    GlobalRankList: "GlobalRankList"
  }],
  Score: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "6c38fSoQ15GbJPr8Xk5EGQU", "Score");
    var i = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        restart: cc.Node,
        home: cc.Node,
        scoreLabel: cc.Label,
        scan: cc.Node,
        selfInfo: cc.Sprite
      },
      onLoad: function () {
        var e = cc.sys.localStorage.getItem("score");
        this.scoreLabel.string = e, this.scan.on("touchstart", function () {
          cc.director.loadScene("RankList")
        }), this.restart.on("touchstart", function () {
          cc.director.loadScene("Level0" + i.number)
        }), this.home.on("touchstart", function () {
          cc.director.loadScene("StartScene")
        }), window.wx.showShareMenu({
          withShareTicket: !0
        }), this.tex = new cc.Texture2D, window.sharedCanvas.width = 1334, window.sharedCanvas.height = 750,
          window.wx.postMessage({
            messageType: 4,
            MAIN_MENU_NUM: i.MAIN_MENU_NUM
          })
      },
      _updateSubDomainCanvas: function () {
        this.tex.initWithElement(sharedCanvas), this.tex.handleLoadedTexture(), this.selfInfo.spriteFrame =
          new cc.SpriteFrame(this.tex)
      },
      update: function (e) {
        this._updateSubDomainCanvas()
      }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  Start: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "0bd88L8Z99HS6pRGOzxA6li", "Start");
    var c = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        bgAudio: {
          default: null,
          url: cc.AudioClip
        },
        startBtn: {
          default: null,
          type: cc.Node
        },
        bgAudioBtn: {
          default: null,
          type: cc.Node
        },
        rankBtn: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function () {
        wx.authorize({
          scope: "scope.record",
          fail: function (e) {
            -1 < e.errMsg.indexOf("auth deny") || e.errMsg.indexOf("auth denied")
          }
        });
        var n = this;
        c.score = 0, c.number = 1, cc.audioEngine.playMusic(this.bgAudio, !0), cc.director.preloadScene(
          "Level01");
        var e = cc.scaleTo(.8, .9),
          t = cc.scaleTo(.8, 1),
          o = cc.sequence(e, t),
          i = cc.repeatForever(o);
        this.startBtn.runAction(i), this.startBtn.on(cc.Node.EventType.TOUCH_START, function () {
          cc.find("Canvas/img-kaishiyouxi").getComponent(cc.AudioSource).play(), cc.audioEngine.pauseMusic(),
            cc.director.loadScene("Level01")
        }), this.bgAudioBtn.on(cc.Node.EventType.TOUCH_START, function () {
          cc.loader.loadRes("Texture/ui/startScene/startScene", cc.SpriteAtlas, function (e, t) {
            var o = t.getSpriteFrame("img-jinyingliang");
            if (o === n.bgAudioBtn.getComponent(cc.Sprite).spriteFrame) {
              c.globalAudioPlay = !0, cc.sys.localStorage.setItem("audioPlayBol", !0);
              var i = t.getSpriteFrame("img-yinliang");
              n.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = i, cc.audioEngine.playMusic(n.bgAudio, !
                0)
            } else cc.sys.localStorage.setItem("audioPlayBol", !1), cc.audioEngine.pauseMusic(), c.globalAudioPlay = !
              1, n.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = o
          })
        }), this.rankBtn.on(cc.Node.EventType.TOUCH_START, function () {
          cc.audioEngine.pauseMusic(), c.preScene = "StartScene", cc.director.loadScene("RankList")
        }), c.getLocalAudioPlay() ? (cc.audioEngine.playMusic(n.bgAudio, !0), c.globalAudioPlay = !0, cc.loader
          .loadRes("Texture/ui/startScene/startScene", cc.SpriteAtlas, function (e, t) {
            n.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = t.getSpriteFrame("img-yinliang")
          })) : (cc.audioEngine.pauseMusic(), c.globalAudioPlay = !1, cc.loader.loadRes(
            "Texture/ui/startScene/startScene", cc.SpriteAtlas, function (e, t) {
              n.bgAudioBtn.getComponent(cc.Sprite).spriteFrame = t.getSpriteFrame("img-jinyingliang")
            }))
      }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  WXShare: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "0b72e3z+cFBfrOQTd+xDJr6", "WXShare");
    var i = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function () {
        this.node.on("touchstart", this.onShare, this)
      },
      onShare: function (e) {
        
          o = t[Math.round(Math.random() * (t.length - 1))];
        cc.loader.loadRes(o.imgUrl, function (e, t) {
          wx.shareAppMessage({
            title: o.title,
            imageUrl: t.url
          })
        })
      },
      start: function () { }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  barrierMove: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "a2418E6iy9LFpXh1OhNeRR6", "barrierMove");
    var i = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {
        dir: 0,
        speed: 10,
        disMinX: 0,
        disMinY: 0,
        disMaxX: 0,
        disMaxY: 0,
        waterAudio: {
          default: null,
          type: cc.AudioSource
        }
      },
      onLoad: function () { },
      start: function () {
        this.startY = this.node.y - this.disMinY, this.startX = this.node.x - this.disMinX, this.endY =
          this.node.y + this.disMaxY, this.endX = this.node.x + this.disMaxX
      },
      onCollisionEnter: function (e, t) {
        "waterFlower" === e.node.group && (e.node.getComponent(cc.Animation).play(), i.getLocalAudioPlay() ?
          this.waterAudio.play() : this.waterAudio.pause())
      },
      update: function (e) {
        switch (this.dir) {
          case 0:
            this.node.x += this.speed * e, this.node.x >= this.endX && (this.dir = 1);
            break;
          case 1:
            this.node.x -= this.speed * e, this.node.x <= this.startX && (this.dir = 0);
            break;
          case 2:
            this.node.y -= this.speed * e, this.node.y <= this.startY && (this.dir = 3);
            break;
          case 3:
            this.node.y += this.speed * e, this.node.y >= this.endY && (this.dir = 2)
        }
      }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  sprayAudioControl: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "3eccd8g5QJFM5QNC6qz6+vD", "sprayAudioControl");
    var i = e("Common");
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function () {
        i.getLocalAudioPlay() ? (this.node.getComponent(cc.AudioSource).loop = !0, this.node.getComponent(
          cc.AudioSource).play()) : this.node.getComponent(cc.AudioSource).pause()
      },
      start: function () { }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }],
  victory: [function (e, t, o) {
    "use strict";
    cc._RF.push(t, "4a3ferGd6pOsags5qyiZodR", "victory");
    var i = e("Common");
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
      onLoad: function () {
        this.nextLevel.getComponent(cc.Label).string = i.number, i.getLocalAudioPlay() && cc.audioEngine.play(
          this.victoryAudio, 1, 2), this.toNextLevel.on("touchstart", function () {
            cc.director.loadScene("Level0" + i.number)
          })
      },
      start: function () { }
    }), cc._RF.pop()
  }, {
    Common: "Common"
  }]
}, {}, ["Main", "NewRecord", "Over", "PlayerControl", "RankList", "RankingView", "Score", "Start", "WXShare",
    "barrierMove", "sprayAudioControl", "victory", "Common", "GlobalRankList"]);