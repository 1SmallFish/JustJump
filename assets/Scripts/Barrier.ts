
import { _decorator, Component, Node, NodePool } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BlockController
 * DateTime = Wed Dec 22 2021 08:05:12 GMT+0800 (中国标准时间)
 * Author = liukanshan
 * FileBasename = blockController.ts
 * FileBasenameNoExtension = blockController
 * URL = db://assets/Scripts/blockController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass('Barrier')
export class Barrier extends Component {
    // [1]
    // dummy = '';
    public _game: any | null = null;
    public _isRecycled: boolean = false;

    // [2]
    // @property
    // serializableDummy = 0;
    // 让楼梯板自己管理自己的生命
    start() {
        // [3]


    }
    onLoad() {

    }
    init() {
        // console.log("板儿坐标",this.node.position);
        this._isRecycled = false;//初始化为未回收状态,在blockPool.get()后,执行

    }
    // 通过game获取 步数,进行比对
    // 可以用once on/off
    // 可在init中进行初始化 监听事件 ;执行一次后关闭监听



    getPlayerDistance() {
        // console.log("barrier",this._game.playerCtrl.node.position);
        // console.log("barrier",this._game);

        var playerPos = this._game.playerCtrl.node.position;
        var dist = playerPos.y - this.node.position.y;
        return dist;


    }
    onRecycle() {
        // 回收
        // console.log("barrierrecycle");
        
        // 仅有此处pool不一样
        // 可以使用一个脚本
        // 可以把障碍设置成板儿加障碍的prefab

        // console.log(this.node.name)

        this._game.barrierPool.put(this.node)
    }
   

    update(deltaTime: number) {
        //可以设置更新时间

        // 每帧判断block与player的y向距离 只需要执行一次,后面改为**监听跳跃事件**,不必每帧判断
        // 后续加上时间判断,每隔一定时间回收最下部的block:可以设置一个定时器,每隔一定时间.. ==========也可节点生成经过一定时间就回收
        // 后续把同一层的加到同一个节点上,做整体掉落动画,和距离判断,满足条件后回收子节点

        // 加一个状态判断,回收以后,状态变为true,不再回收   
        if (!this._isRecycled&& this.getPlayerDistance() > 95) {

            this.onRecycle();
            this._isRecycled = true;
            return;
        }

    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
