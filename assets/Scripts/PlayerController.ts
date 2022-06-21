
import { _decorator, Component, Vec3,Node, input, SystemEvent, EventMouse, v3, v2, Vec2, Animation, tween, EventTouch, Input } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = PlayerController
 * DateTime = Sat Dec 18 2021 22:55:48 GMT+0800 (中国标准时间)
 * Author = liukanshan
 * FileBasename = PlayerController.ts
 * FileBasenameNoExtension = PlayerController
 * URL = db://assets/Scripts/PlayerController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('PlayerController')
export class PlayerController extends Component {
    // [1]
    // dummy = '';
   
    // [2]
    // @property
    // serializableDummy = 0;
    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0;
    private _jumpTime: number = 0.1;
    private _curJumpSpeed: number = 0;
    private _curPos: Vec3 = v3();
    private _deltaPos: Vec3 = v3(0, 0, 0);
    private _targetPos: Vec3 = v3();
    private _isMoving = false;
    private _curMoveIndex = 0;
    
    @property({type: Animation})
    public BodyAnim: Animation = null;


    start () {
        // Your initialization goes here.
        // this.node.children[0].setSiblingIndex(-1)
        
    }

    onMouseUp(event: EventMouse) {
        if (event.getButton() === 0) {
            
            this.jumpByStep(1);//x-
        } else if (event.getButton() === 2) {
            this.jumpByStep(2);//z-
        }

    }
    // 响应触摸事件
    onTouchEnd(event:EventTouch){
        // window.innerHeight: 667
//      innerWidth: 375
        
        // console.log(event);
// console.log("device-width:",(window.screen.width));
// console.log("point-x:",event.touch._point.x);
// // console.log(event.touch._point.x>window.screen.width/2);
// console.log(event.targetTouches);
// console.log(event);
// console.log(window);


// console.log(event.getLocationX(),window.innerWidth);



        
        
        if(event.getLocationX()>window.innerWidth){//获取屏幕宽度,设置一半
        // console.log("getLocation",event.EventTouch); //undefined

            this.jumpByStep(2)
            this.BodyAnim.play('leftJump')

        }else{
            this.jumpByStep(1)
            this.BodyAnim.play('leftJump')
        }
        
        
        
    }

//根据左右键决定右还是左
    jumpByStep(step: number) {
        if (this._isMoving) {
            return;
        }
        // this._startJump = true;
        // this._jumpStep = step;
        this._curJumpTime = 0;
        this._curJumpSpeed = this._jumpStep / this._jumpTime;
        this.node.getPosition(this._curPos);
        let that=this
        if(step===1){
            // 在这里设置移动的速度,利用动画实现
            // 按比例缩小2倍
            tween(this.node)
            .by(0.5,{position:v3(-40,50,0)})
            .call(function(){
                Vec2.add(that._targetPos, that._curPos, v3(-38, 48));
                that._startJump = true;//动作执行完再更新检查
                
                
            })
            .start()
            // 要设置一个延时等动画执行完
            
            // setTimeout(function(){
            //     Vec2.add(that._targetPos, that._curPos, v3(-75, 95));
            //     this._startJump = true;

            // },1000)
                
            // console.log(this.node.getPosition());
            
            

        }else if(step===2){
            tween(this.node)
            .by(0.5,{position:v3(38,48,0)})
            .call(function(){
                Vec2.add(that._targetPos, that._curPos, v3(38, 48));
                that._startJump = true;//动作执行完再更新检查
                
                
            })
            .start()
            // Vec2.add(this._targetPos, this._curPos, v3(75, 95,0));
        }
        
        

        this._isMoving = true;
        // this._curMoveIndex += step;
        this._curMoveIndex++;//这个游戏里每次都是跳一步
    }

    onOnceJumpEnd() {
        this._isMoving = false;
        this.node.emit('JumpEnd', this._curMoveIndex);
    }
    
    isOnRoad(){

    }
    
    setInputActive(active: boolean) {
        if (active) {
            
            // systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
            input.on(Input.EventType.TOUCH_END,this.onTouchEnd,this)
        } else {
            // systemEvent.off(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
            input.off(Input.EventType.TOUCH_END,this.onTouchEnd,this)

        }
    }
    reset() {
        this._curMoveIndex = 0;
        this.node.setPosition(v3(-100, -300))
    }
    update (deltaTime: number) {
        if (this._startJump) {
            this._curJumpTime += deltaTime;
            if (this._curJumpTime > this._jumpTime) {
                // end
                this.node.setPosition(this._targetPos);
                this._startJump = false;

                this.onOnceJumpEnd();
            } else {
                // tween 超时 
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * deltaTime;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
        }
    }
}