
import { _decorator, Component, Node, ScrollView, Label, find, Prefab, instantiate, UITransform } from 'cc';
import RankItem from './RankItem';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = ScrollViewBounceBack
 * DateTime = Sat Oct 30 2021 16:20:55 GMT+0800 (中国标准时间)
 * Author = zmzczy
 * FileBasename = scroll-view-bounce-back.ts
 * FileBasenameNoExtension = scroll-view-bounce-back
 * URL = db://assets/cases/ui/06.scrollview/scroll-view-bounce-back.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('ScrollViewBounceBack')
export class ScrollViewBounceBack extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    setHeight=true;
    content:Node=null;
    logLabel:Label = null!;
    @property({type:Prefab})
    itemPrefab:Prefab|null=null;

    
    scrollingCounter: number = 0;

    start () {
        // [3]
        let arr_infor = [
            {name:'2504549300',touXiang:0,score:1003},
            {name:'cocoscreator_666',touXiang:1,score:1002},
            {name:'小白程序猿',touXiang:2,score:1001},
            {name:'褪了色旳回憶',touXiang:3,score:Math.round(Math.random() * 1000)},
            {name:'为爱控',touXiang:4,score:Math.round(Math.random() * 1000)},
            {name:'等尽歌悲欢',touXiang:5,score:Math.round(Math.random() * 1000)},
            {name:'妖媚＠',touXiang:6,score:Math.round(Math.random() * 1000)},
            {name:'时光あ瘦了~',touXiang:7,score:Math.round(Math.random() * 1000)},
            {name:'别格式化',touXiang:8,score:Math.round(Math.random() * 1000)},
            {name:'同餐伴枕',touXiang:9,score:Math.round(Math.random() * 1000)},
            {name:'曾有↘几人',touXiang:10,score:Math.round(Math.random() * 1000)},
            {name:'柠檬味的鱼',touXiang:11,score:Math.round(Math.random() * 1000)},
            {name:'没有范儿',touXiang:12,score:Math.round(Math.random() * 1000)},
            {name:'自然而然',touXiang:13,score:Math.round(Math.random() * 1000)},
            {name:'亲，我没跑',touXiang:14,score:Math.round(Math.random() * 1000)},
            {name:'主音King',touXiang:15,score:Math.round(Math.random() * 1000)},
            {name:'名钻',touXiang:16,score:Math.round(Math.random() * 1000)},
            {name:'莫再执迷不悟。',touXiang:17,score:Math.round(Math.random() * 1000)},
            {name:'多啦呮諟個夢',touXiang:18,score:Math.round(Math.random() * 1000)},
            {name:'大哥大@',touXiang:19,score:Math.round(Math.random() * 1000)},

            {name:'女人本该霸气',touXiang:20,score:Math.round(Math.random() * 1000)},
            {name:'喓浭喓姒氺溫柔',touXiang:21,score:Math.round(Math.random() * 1000)},
            {name:'回忆刺穿心脏╮',touXiang:22,score:Math.round(Math.random() * 1000)},
            {name:'爷丶有特点',touXiang:23,score:Math.round(Math.random() * 1000)},
            {name:'感谢经历。',touXiang:24,score:Math.round(Math.random() * 1000)},
            {name:'疾风魔影',touXiang:25,score:Math.round(Math.random() * 1000)},
            {name:'坚强的爱恋',touXiang:26,score:Math.round(Math.random() * 1000)},
            {name:'路还长别猖狂',touXiang:27,score:Math.round(Math.random() * 1000)},
            {name:'余生梦断',touXiang:28,score:Math.round(Math.random() * 1000)},
            {name:'笑话太过',touXiang:29,score:Math.round(Math.random() * 1000)},
            {name:'白龙吟',touXiang:30,score:Math.round(Math.random() * 1000)},
            {name:'心底青苔',touXiang:31,score:Math.round(Math.random() * 1000)},
            {name:'独立于世',touXiang:32,score:Math.round(Math.random() * 1000)},
            {name:'mo_虚冇',touXiang:33,score:Math.round(Math.random() * 1000)},
            {name:'无所谓的结局',touXiang:34,score:Math.round(Math.random() * 1000)},
            {name:'半夜成仙',touXiang:35,score:Math.round(Math.random() * 1000)},
            {name:'完了丶然后@',touXiang:36,score:Math.round(Math.random() * 1000)},

            {name:'没爱没恨-',touXiang:37,score:Math.round(Math.random() * 1000)},
            {name:'凉纪之城',touXiang:38,score:Math.round(Math.random() * 1000)},
            {name:'梦如南筏〞',touXiang:39,score:Math.round(Math.random() * 1000)},
            {name:'-夲亼光锟',touXiang:40,score:Math.round(Math.random() * 1000)},
            {name:'褐色眼眸~',touXiang:41,score:Math.round(Math.random() * 1000)},
            {name:'太坚强是软弱',touXiang:42,score:Math.round(Math.random() * 1000)},
            {name:'暮色伊人',touXiang:43,score:Math.round(Math.random() * 1000)},
            {name:'不必谁懂我',touXiang:44,score:Math.round(Math.random() * 1000)},
            {name:'嫩HEI炮@!',touXiang:45,score:Math.round(Math.random() * 1000)},
            {name:'奈河桥等你',touXiang:46,score:Math.round(Math.random() * 1000)},
            {name:'一舞驚鴻',touXiang:47,score:Math.round(Math.random() * 1000)},
            {name:'三五七年',touXiang:48,score:Math.round(Math.random() * 1000)},
            {name:'冰落風嘯',touXiang:49,score:Math.round(Math.random() * 1000)},
        ];
        
        let com=this.getComponent(ScrollViewBounceBack)
        // this.logLabel = find('view/content/item',this.node)?.getComponent<Label>(Label)!;
        this.content = find('view/content',this.node);

        // console.log(this.logLabel);
        
        // this.logLabel.string = '拖动以查看log打印次数';

        // 从数据生成item 加到content
        for(let i =0;i<arr_infor.length-1;i++){
            let item=instantiate(this.itemPrefab)

            this.content.addChild(item)
            item.setPosition(0,-52*i-25)
            item.getComponent(RankItem).set(i,arr_infor[i]);
            
            
            
            // console.log(i)
            
            
            
            
        }
        // this.logLabel.string=labelString

        if(this.setHeight){//设置content高度,展示全部数据
            this.content.getComponent(UITransform).setContentSize(360,this.content.children.length*50)
            this.setHeight=false;
        }

        com?.node.on('scrolling', this.onScrollingCallback, this);
        com?.node.on(Node.EventType.TOUCH_START, this.onTouchStartCallback, this, true);
    }

    // update (deltaTime: number) {
    //     // [4]
    // }


    protected onScrollingCallback() {
        // console.log('scrolling')
        this.scrollingCounter++;
        // this.logLabel.string = `scrolling * ${this.scrollingCounter}`;
        // console.log(this);
        
        
    }

    protected onTouchStartCallback () {
        // this.scrollingCounter = 0;
        // this.logLabel.string = '';
    }
    protected closeRank(){
        this.node.active=false;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
