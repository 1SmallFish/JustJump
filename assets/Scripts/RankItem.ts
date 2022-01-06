import { assetManager, Component, ImageAsset, Label, Sprite, SpriteFrame, Texture2D, _decorator } from "cc";

const { ccclass, property } = _decorator;

@ccclass
export default class RankItem extends Component {

    @property(Label)
    private rankingLabel: Label = null;

    @property(Sprite)
    private avatarSprite: Sprite = null;

    @property(Label)
    private nicknameLabel: Label = null;

    @property(Label)
    private scoreLabel: Label = null;

    /**
     * 
     * 设置展示的信息
     * @param ranking 排名
     * @param user 用户数据
     */
    public set(ranking: number, user: any) {//yonghu
        //这是微信 中的api
        // this.rankingLabel.string = ranking.toString();
        // this.nicknameLabel.string = user.nickname;
        // this.scoreLabel.string = user.KVDataList[0].value.toString();
        // this.updateAvatar(user.avatarUrl);

        
        
        this.rankingLabel.string = ranking.toString();
        this.nicknameLabel.string = user.name+'';
        // console.log(user.name);
        
        this.scoreLabel.string = user.score.toString();
        // this.updateAvatar(user.touXiang); //没图先屏蔽
    }

    /**
     * 更新头像
     * @param url 头像链接
     */
    private updateAvatar(url: string) {
        let remoteUrl=url;
        let spiritAvatar =this.avatarSprite.spriteFrame ;
        
        assetManager.loadRemote<ImageAsset>(remoteUrl,function(err,imageAsset){
            
            const spiritFrame=new SpriteFrame()
            let texture = new Texture2D();
            
            texture.image=imageAsset;
            
            spiritFrame.texture=texture;
            // this.avatarSprite.spriteFrame = spiritFrame;
            spiritAvatar = spiritFrame;

            
        })
        
        
    }

}