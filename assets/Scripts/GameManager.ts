
import { _decorator, Component, Node, instantiate, Label, Prefab, v2, v3, Sprite, NodePool, Vec3, find } from 'cc';
import { PlayerController } from './PlayerController';
import { BlockController } from './BlockController';
import { Barrier } from './Barrier';

const { ccclass, property } = _decorator;


/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Sun Dec 19 2021 11:12:21 GMT+0800 (中国标准时间)
 * Author = liukanshan
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/Scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
enum GameState {
    GS_INIT,
    GS_PLAYING,
    GS_END,
};
@ccclass('GameManager')
export class GameManager extends Component {
    // [1]
    // dummy = '';
    @property({ type: PlayerController })
    public playerCtrl: PlayerController | null = null


    public roadLength: Number = 9;
    public _road: Array<any> = null;
    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: Prefab })
    public blockBluePrefab: Prefab | null = null;
    @property({ type: Prefab })
    blockBlueDarkPrefab: Prefab | null = null;
    @property({ type: Prefab })
    blockBlueLightPrefab: Prefab | null = null;
    @property({ type: Prefab })
    blockGreenPrefab: Prefab | null = null;
    @property({ type: Prefab })
    blockPurplePrefab: Prefab | null = null;
    @property({ type: Prefab })
    barrierPrefab: Prefab | null = null;

    public blockPool: NodePool | null = null;
    public barrierPool: NodePool | null = null;

    //起始坐标
    private startLoc:Vec3 = v3(-50,-150)



    private _curState: GameState = GameState.GS_INIT;
    @property({ type: Node })
    public startMenu: Node = null;
    @property({ type: Label })
    public score: Label = null;


    start() {
        // [3]
        // this.curState = GameState.GS_INIT;
        this.playerCtrl.node.on('JumpEnd', this.onPlayerJumpEnd, this);

    }
    onLoad() {
        // console.log();
        
        
        this.init()
        find('ScrollView',this.startMenu).active=false


    }
    init() {
        // 重新初始化要回收所有对象或者重新生成对象池

        console.log('init...');
        // console.log(this.curState);
        // console.log(this.playerCtrl);
        
        // console.log(this.startMenu.children);
        // this.startMenu.children[2].on('click',this.onStartButtonClicked)
        
        
        

        // this.recycleAllBlock()//回收所有 回收不完全,,========
        // 移除所有子节点,
        this.node.removeAllChildren()

        this.playerCtrl.reset();
        this.createPool()
        this.startMenu.active = true;
        this.generateRoad();
        
        this.playerCtrl.setInputActive(false);
        this.playerCtrl.node.setPosition(this.startLoc);// 为何要设置这个位置??=======>这个位置就是palyer的初始位置
        
        
    }
    onPlayerJumpEnd(moveIndex: number) {

        this.addBlock()
        this.checkResult(moveIndex);
    }
    set curState(value: GameState) {
        switch (value) {
            case GameState.GS_INIT:
                this.init();
                break;
            case GameState.GS_PLAYING:
                this.startMenu.active = false;
                this.score.string = '0';   // 将步数重置为0

                setTimeout(() => {      //直接设置active会直接开始监听鼠标事件，做了一下延迟处理
                    this.playerCtrl.setInputActive(true);
                }, 0.1);
                break;
            case GameState.GS_END:
                break;
        }
        this._curState = value;
    }
    onStartButtonClicked() {
        // console.log('clicked');
        
        this.curState = GameState.GS_PLAYING;

    }

    generateRoad() {

        // this.node.removeAllChildren(); 回收入对象池了,不必remove了

        this._road = [];
        // // startPos
        // // 都从对象池取了,不必多此一举
        // let block: Node = this.blockPool.get();
        // // let block = instantiate(this.blockGreenPrefab)
        // // 在block脚本组件保存GAme的引用
        // this.node.addChild(block);
        // block.getComponent(BlockController)._game = this;
        // block.getComponent(BlockController)._isRecycled = false;//也可调用init方法,考虑到以后可能有其他属性需要初始化,建议调用init



        //存板儿节点
        this._road.push(this.startLoc)//起始坐标
        // block.setPosition(0, 0);

        //1.实例化 prefab,2.设置位置
        for (let i = 0; i < this.roadLength; i++) {
            // let block:Node=instantiate(this.cubePrefab);
            // this.node.addChild(block)

            // // console.log(this._road[i]===0);
            // let rand =Math.floor(Math.random() * 2);

            // let loc=this._road[i-1]

            // if(rand===0){
            //     //得知道上一个坐标,最好把这些坐标都计下来
            //     //0 x坐标减1....1 z坐标减1

            //     this._road.push(v2(loc.x-75,loc.y+95))
            //     block.setPosition(loc.x-75,loc.y+95)
            //     // this._road.push(block)//存板儿节点,用于交集验证
            // }else if(rand===1){
            //     this._road.push(v2(loc.x+75,loc.y+95))
            //     block.setPosition(loc.x+75,loc.y+95)
            //     // this._road.push(block)
            // }
            this.addBlock()

        }
    }
    //加楼梯
    addBlock() {

        let rand = this.generateRandom(2)
        let isAdd = this.generateRandom(3)
        // let loc = this._road[this._road.length - 1]//上一个坐标
        let loc = this._road[this._road.length - 1]//当前坐标


        let block: Node | null = null;
        let blockOther: Node | null = null;
        let barrier: Node | null = null;



        //生成路
        if (this.blockPool.size() > 0) {
            block = this.blockPool.get()





            // 障碍不一定生成,所以这个代码放到后面
            // barrier = this.barrierPool.get()
            // this.node.addChild(barrier)
            // barrier.getComponent(Barrier)._game=this
            // barrier.getComponent(Barrier).init()

        } else {//pool里没有,就生成
            console.log("block用完了");

            block = instantiate(this.blockGreenPrefab)//应设置为随机
        }

        // 生成下一个坐标,设置位置
        if (rand) {
            //向左
            this._road.push(v2(loc.x - 38, loc.y + 48))
            // block.setPosition(loc.x - 75, loc.y + 95);//这是根据上一个坐标生成当前位置的逻辑
            block.setPosition(loc.x, loc.y);//这是根据当前坐标生成当前位置的逻辑

        } else {
            //向右
            this._road.push(v2(loc.x + 38, loc.y + 48))
            // block.setPosition(loc.x + 75, loc.y + 95)
            block.setPosition(loc.x, loc.y)


        }

        this.node.addChild(block)
        // 在block脚本组件保存GAme的引用
        block.getComponent(BlockController).init();
        block.getComponent(BlockController)._game = this;
        //*******添加进父节点并初始化 */


        //生成障碍  ,把障碍和板儿设置成一个整体
        // 1.先判断是否要添加障碍
        if (isAdd) {
            //2. 到此确定要添加
            // 3.判断是否有barrie
            if (this.barrierPool.size() > 0) {
                barrier = this.barrierPool.get()
            } else {
                console.log("barrier用完了");

                barrier = instantiate(this.barrierPrefab)
            }
            // 4.同样判断是否有block

            if (this.blockPool.size() > 0) {
                blockOther = this.blockPool.get()
            } else {
                console.log("block用完了");

                blockOther = instantiate(this.blockBluePrefab)//应设置为随机
            }

            // 这里是添加逻辑
            // 1.添加

            this.node.addChild(blockOther)
            this.node.addChild(barrier)


            //根据 _road[],当前节点,路的位置决定障碍的位置


            // 2.设置位置
            let lastLoc = this._road[this._road.length - 1]//最后一个板坐标
            //障碍生成在板儿的相反方向
            if (lastLoc.x > loc.x) {//新板向右,障碍向左
                blockOther.setPosition(loc.x - 38, loc.y + 48)//位置需要设置,==>x坐标
                barrier.setPosition(loc.x - 38, loc.y + 48)//位置需要设置


            } else {//新板向左,障碍向右
                blockOther.setPosition(loc.x + 38, loc.y + 48)//位置需要设置,==>x坐标
                barrier.setPosition(loc.x + 38, loc.y + 48)//位置需要设置
            }


            // 随机在路的左右两板范围内生成障碍



            // 挂载game和初始化
            blockOther.getComponent(BlockController)._game = this;
            blockOther.getComponent(BlockController).init();

            barrier.getComponent(Barrier)._game = this;
            barrier.getComponent(Barrier).init();

        }

// 



        // 障碍块

        // ==============旧
        // if (rand) {
        //     //得知道上一个坐标,最好把这些坐标都计下来
        //     //0 x坐标减1....1 z坐标减1

        //     this._road.push(v2(loc.x - 75, loc.y + 95))
        //     block.setPosition(loc.x - 75, loc.y + 95)
        //     //相对方向加红块

        //     if (isAdd) {
        //         // 把这一坨添加障碍的代码提取成一个函数(参数为坐标)
        //         blockOther = this.blockPool.get()
        //         this.node.addChild(blockOther)
        //         blockOther.setPosition(loc.x + 75, loc.y + 95)
        //         blockOther.getComponent(BlockController)._game = this;

        //         blockOther.getComponent(BlockController).init();


        //         barrier = this.barrierPool.get()
        //         this.node.addChild(barrier)
        //         barrier.setPosition(loc.x + 75, loc.y + 95)
        //         barrier.getComponent(Barrier)._game = this
        //         barrier.getComponent(Barrier).init()


        //     }


        // } else {
        //     this._road.push(v2(loc.x + 75, loc.y + 95))
        //     block.setPosition(loc.x + 75, loc.y + 95)

        //     if (isAdd) {
        //         blockOther = this.blockPool.get()
        //         this.node.addChild(blockOther)
        //         blockOther.setPosition(loc.x - 75, loc.y + 95)
        //         blockOther.getComponent(BlockController)._game = this;
        //         blockOther.getComponent(BlockController).init();



        //         barrier = this.barrierPool.get()
        //         this.node.addChild(barrier)
        //         barrier.setPosition(loc.x - 75, loc.y + 95)
        //         barrier.getComponent(Barrier)._game = this
        //         barrier.getComponent(Barrier).init()

        //     }
        // }
        // ==================旧

    }

    // 生成板儿实例,存入Pool
    createPool() {

        this.blockPool = new NodePool();
        let initCount = 29;
        for (let i = 0; i < initCount; i++) {
            let rand = this.generateRandom(5)
            let prefab: Prefab | null = null;
            switch (rand) {
                case 1:
                    prefab = this.blockBlueDarkPrefab
                    break;
                case 2:
                    prefab = this.blockBlueLightPrefab
                    break;
                case 3:
                    prefab = this.blockBluePrefab
                    break;
                case 4:
                    prefab=this.blockPurplePrefab;
                    break;
                default:
                    prefab = this.blockGreenPrefab
            }
            let block = instantiate(prefab);
            // let block = instantiate(this.blockGreenPrefab);


            this.blockPool.put(block)

        }

        this.barrierPool = new NodePool();
        let barrierCount = 26;
        for (let i = 0; i < barrierCount; i++) {
            let barrierInstance = instantiate(this.barrierPrefab)
            this.barrierPool.put(barrierInstance)
        }
    }
    generateRandom(r: number) {
        return Math.floor(Math.random() * r);
    }
    checkResult(moveIndex: number) {
        // console.log(this._road);

        // if (moveIndex < this.roadLength) {//无尽模式不必判断路长

        let playerV3 = this.playerCtrl.node.getPosition();

        let roadV2 = this._road[moveIndex]
        // console.log(playerV3,roadV2);
        
        // 
        if (roadV2.x != playerV3.x || roadV2.y != playerV3.y) {   //跳到了空方块上
            this.curState = GameState.GS_INIT;


            console.log('124', '跳空了');

        } else {


            this.score.string = '' + moveIndex;//没跳空才加分
            // 每跳一步,最后加一级楼梯(每跳10步加十级也可以),加到最后,回收最下面的楼梯


        }
        // } 
        //无尽版本,没有最大长度
        // else {    // 跳过了最大长度
        //     this.curState = GameState.GS_INIT;
        // }
    }

    openRank(){
        console.log("tst button clicked");
        //生成排行榜 :一个scrollview 包含多个view;//在scrollview中完成,
        
        find('ScrollView',this.startMenu).active=true
        
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
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
