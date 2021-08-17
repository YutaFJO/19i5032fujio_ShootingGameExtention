namespace SpriteKind {
    export const Count = SpriteKind.create()
    export const Effect = SpriteKind.create()
    export const Gimmick = SpriteKind.create()
    export const Info = SpriteKind.create()
    export const Back = SpriteKind.create()
    export const Obstruction = SpriteKind.create()
}
// バブル攻撃を生成
function MakeMagic () {
    Bubble = sprites.create(assets.image`Bubble`, SpriteKind.Gimmick)
    Bubble.setPosition(Enemy3.x, Enemy3.y)
    if (Ene3Life <= 100) {
        Bubble.setVelocity(-100, 0)
    } else {
        Bubble.setVelocity(-60, 0)
    }
    animation.runImageAnimation(
    Bubble,
    assets.animation`BubbleAnim`,
    100,
    true
    )
}
// 敵の攻撃（2ndステージの敵）がスキルリストにあたると、敵の攻撃が消える
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Info, function (sprite, otherSprite) {
    if (sprite == Ene2Attack) {
        sprite.destroy()
    }
})
// 1stステージの敵を生成
function CallEnemy1 () {
    Enemy1 = sprites.create(assets.image`Enemy1`, SpriteKind.Enemy)
    Enemy1.setPosition(150, 60)
    Enemy1.setVelocity(0, 50)
    Enemy1.setFlag(SpriteFlag.BounceOnWall, true)
    animation.runImageAnimation(
    Enemy1,
    assets.animation`Ene1Anim`,
    200,
    true
    )
}
// 爆破攻撃を生成
function Explosion () {
    ExplosionSet = sprites.create(assets.image`ExplosionPosi`, SpriteKind.Projectile)
    BombPosition = randint(0, 2)
    if (BombPosition == 0) {
        ExplosionSet.setPosition(30, 60)
    } else if (BombPosition == 1) {
        ExplosionSet.setPosition(30, 16)
    } else {
        ExplosionSet.setPosition(30, 104)
    }
    pause(1000)
    Explosion2 = sprites.create(assets.image`Explosion`, SpriteKind.Gimmick)
    Explosion2.setPosition(30, ExplosionSet.y)
    ExplosionSet.destroy()
    animation.runImageAnimation(
    Explosion2,
    assets.animation`ExplosionAnim`,
    100,
    false
    )
}
// 2ndステージの敵を生成
function CallEnemy2 () {
    Enemy2 = sprites.create(assets.image`Enemy2`, SpriteKind.Enemy)
    Enemy2.setPosition(150, 60)
    pause(500)
    Enemy2.setVelocity(0, 80)
    Enemy2.setFlag(SpriteFlag.BounceOnWall, true)
    animation.runImageAnimation(
    Enemy2,
    assets.animation`Ene2Anim`,
    100,
    true
    )
}
// 3rdステージの敵を生成
function CallEnemy3 () {
    Enemy3 = sprites.create(assets.image`Enemy3`, SpriteKind.Enemy)
    Enemy3.setPosition(150, 60)
    pause(500)
    Enemy3.setVelocity(0, 80)
    Enemy3.setFlag(SpriteFlag.BounceOnWall, true)
    animation.runImageAnimation(
    Enemy3,
    assets.animation`Ene3Anim`,
    100,
    true
    )
}
// ・攻撃が巨大バリアにあたると、耐久値を１減らして攻撃が消える
// ・スキルがバリアにあたると、耐久値を10減らしてスキルが消える
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Obstruction, function (sprite, otherSprite) {
    if (sprite == Skill) {
        HBarrierLife += -10
        sprite.destroy()
    }
    if (sprite != Skill) {
        HBarrierLife += -1
        sprite.destroy()
    }
})
// 自機が敵の攻撃にあたると1ダメージ
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gimmick, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(2000)
})
// ”B”長押しでリスタート
controller.B.onEvent(ControllerButtonEvent.Repeated, function () {
    game.reset()
})
// 自機が敵の攻撃（2ndステージの敵）にあたると1ダメージ
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (otherSprite == Ene2Attack && Ene2Life > 0) {
        info.changeLifeBy(-1)
        pause(2000)
    }
})
// 敵の攻撃がスキルリストにあたると、敵の攻撃が消える
sprites.onOverlap(SpriteKind.Gimmick, SpriteKind.Info, function (sprite, otherSprite) {
    sprite.destroy()
})
// ”B”で一度だけ強攻撃（スキル）を発動
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (SkillCount == 1) {
        animation.runImageAnimation(
        SkillIcon,
        assets.animation`SkillIconAnim`,
        250,
        true
        )
        for (let index = 0; index < 4; index++) {
            Skill = sprites.create(assets.image`Skill`, SpriteKind.Projectile)
            Skill.setPosition(30, 9)
            Skill.setVelocity(100, 0)
            Skill.setFlag(SpriteFlag.DestroyOnWall, false)
            animation.runImageAnimation(
            Skill,
            assets.animation`SkillAnim`,
            50,
            true
            )
            pause(1500)
        }
        SkillIcon.destroy()
        SkillCount = 0
    }
})
// "A"長押しで攻撃
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    if (Ene1Life > 0) {
        Bullet = sprites.createProjectileFromSprite(assets.image`Bullet`, mySprite, 300, 0)
    }
    if (Ene2Life > 0) {
        Bullet = sprites.createProjectileFromSprite(assets.image`Bullet`, mySprite, 300, 0)
    }
    if (Ene3Life > 0) {
        Bullet = sprites.createProjectileFromSprite(assets.image`Bullet`, mySprite, 300, 0)
    }
})
// ・攻撃がバリアにあたると、耐久値を１減らして攻撃が消える
// ・スキルがバリアにあたるとバリアが消える
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Effect, function (sprite, otherSprite) {
    if (sprite == Skill) {
        otherSprite.destroy()
    }
    if (sprite != Skill) {
        BarrierLife += -1
        sprite.destroy()
    }
})
// 敵の攻撃がスキルにあたったら、敵の攻撃が消える
sprites.onOverlap(SpriteKind.Gimmick, SpriteKind.Projectile, function (sprite, otherSprite) {
    if (otherSprite == Skill) {
        sprite.destroy()
    }
})
// 巨大バリアを生成
function MakeBarrier () {
    HBarrierLife = 400
    HugeBarrier = sprites.create(assets.image`HugeBarrier`, SpriteKind.Obstruction)
    if (HBarrierLife <= 0) {
        HugeBarrier.destroy(effects.disintegrate, 100)
    }
}
// カウントダウンの生成
function MakeCountdown () {
    CountDown = sprites.create(assets.image`Countdown1`, SpriteKind.Count)
    music.buzzer.play()
    pause(1000)
    CountDown.destroy()
    CountDown = sprites.create(assets.image`Countdown2`, SpriteKind.Count)
    music.buzzer.play()
    pause(1000)
    CountDown.destroy()
    CountDown = sprites.create(assets.image`Countdown3`, SpriteKind.Count)
    music.buzzer.play()
    pause(1000)
    CountDown.destroy()
    music.magicWand.play()
}
// 背景の生成
function SetBackGround () {
    if (BackGround == 1) {
        scene.setBackgroundImage(assets.image`Back1`)
    } else if (BackGround == 2) {
        scene.setBackgroundImage(assets.image`Back2`)
    } else {
        scene.setBackgroundImage(assets.image`Back3`)
    }
}
// バリアを生成
function EquipBarrier () {
    BarrierLife = 100
    Barrier = sprites.create(assets.image`Barrier`, SpriteKind.Effect)
    Barrier.setPosition(Enemy3.x, Enemy3.y)
    Barrier.follow(Enemy3, 120)
}
// ・攻撃が敵にあたる度に1ダメージ
// ・スキルが敵にあたる度に10ダメージ
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (sprite != (Ene2Attack || Skill)) {
        music.thump.play()
        sprite.destroy()
        otherSprite.startEffect(effects.spray, 50)
    }
    if (sprite == Skill) {
        if (otherSprite == Enemy1) {
            Ene1Life += -10
            otherSprite.startEffect(effects.fire, 500)
            pause(1000)
        } else if (otherSprite == Enemy2) {
            Ene2Life += -10
            otherSprite.startEffect(effects.fire, 500)
            pause(1000)
        } else {
            Ene2Life += -10
            otherSprite.startEffect(effects.fire, 500)
            pause(1000)
        }
    }
    if (otherSprite == Enemy1) {
        Ene1Life += -1
        if (Ene1Life <= 0) {
            _1stStage = 2
            music.bigCrash.play()
            otherSprite.startEffect(effects.ashes, 500)
            otherSprite.destroy(effects.disintegrate, 1000)
        }
    }
    if (otherSprite == Enemy2) {
        Ene2Life += -1
        if (Ene2Life <= 0) {
            _2ndStage = 2
            music.bigCrash.play()
            otherSprite.startEffect(effects.ashes, 500)
            otherSprite.destroy(effects.disintegrate, 1000)
        }
    }
    if (otherSprite == Enemy3) {
        Ene3Life += -1
        if (Ene3Life <= 0) {
            _3rdStage = 2
            music.bigCrash.play()
            otherSprite.startEffect(effects.ashes, 500)
            otherSprite.destroy(effects.disintegrate, 1000)
        }
    }
})
// 自機の生成
function CallPlayer () {
    mySprite = sprites.create(assets.image`Player`, SpriteKind.Player)
    animation.runImageAnimation(
    mySprite,
    assets.animation`PlayerAnim`,
    100,
    true
    )
    controller.moveSprite(mySprite, 0, 65)
    mySprite.setFlag(SpriteFlag.StayInScreen, true)
    mySprite.setPosition(30, 60)
}
// ・開始までの３カウントダウン
// ・1stステージの準備
// ・左端にスキルアイコンを表示
// ・その他諸々を定義
let Ene2Flag = 0
let Ene1Attack2: Sprite = null
let Ene1Attack1: Sprite = null
let AttackTime1 = 0
let Text: Sprite = null
let HBarrierSet = 0
let BarrierSet = 0
let Ene3Flag = 0
let Blackout: Sprite = null
let PlayerFlag = 0
let ExplosionTime = 0
let AttackTime3 = 0
let _3rdStage = 0
let _2ndStage = 0
let Barrier: Sprite = null
let CountDown: Sprite = null
let HugeBarrier: Sprite = null
let BarrierLife = 0
let mySprite: Sprite = null
let Bullet: Sprite = null
let Ene2Life = 0
let HBarrierLife = 0
let Skill: Sprite = null
let Enemy2: Sprite = null
let Explosion2: Sprite = null
let BombPosition = 0
let ExplosionSet: Sprite = null
let Enemy1: Sprite = null
let Ene2Attack: Sprite = null
let Ene3Life = 0
let Enemy3: Sprite = null
let Bubble: Sprite = null
let _1stStage = 0
let Ene1Life = 0
let SkillCount = 0
let SkillIcon: Sprite = null
let BackGround = 0
music.setVolume(20)
MakeCountdown()
BackGround = 1
SetBackGround()
let ItemList = sprites.create(assets.image`ItemList`, SpriteKind.Info)
ItemList.setPosition(10, 60)
SkillIcon = sprites.create(assets.image`SkillIcon`, SpriteKind.Info)
SkillIcon.setPosition(10, 60)
SkillCount = 1
CallPlayer()
info.setLife(5)
let BulleteSpeed = 100
Ene1Life = 500
CallEnemy1()
_1stStage = 1
// 3rdステージ（HP:1500）
// ・不規則な速度で動く敵
// ・5秒間隔で、上下に動きながら飛んでくるバブルで攻撃
// ・8秒間隔で時期の移動範囲の一点を爆破攻撃
// ・HPが750になると敵を追従するバリアを展開
// ・HPが100になると自機の攻撃を完全に防ぐ巨大バリアを展開
// ・HP200以下で攻撃の速度/間隔が変化する
forever(function () {
    if (_3rdStage == 1) {
        AttackTime3 += 1
        ExplosionTime += 1
        pause(1000)
        if (PlayerFlag == 1) {
            CallPlayer()
            Blackout.destroy()
            Blackout = sprites.create(assets.image`Blackout`, SpriteKind.Info)
            animation.runImageAnimation(
            Blackout,
            assets.animation`BlackoutAnim2`,
            50,
            false
            )
            PlayerFlag = 2
        }
        if (Ene3Flag == 0) {
            pause(600)
            CallEnemy3()
            Ene3Life = 1500
            Ene3Flag = 1
        }
        if (AttackTime3 == 5) {
            MakeMagic()
            AttackTime3 = 0
        }
        if (Ene3Life <= 200) {
            if (ExplosionTime == 5) {
                Explosion()
                pause(1100)
                Explosion2.destroy()
                ExplosionTime = 0
            }
        } else {
            if (ExplosionTime == 8) {
                Explosion()
                pause(1100)
                Explosion2.destroy()
                ExplosionTime = 0
            }
        }
        if (Ene3Life <= 750) {
            if (BarrierSet == 0) {
                EquipBarrier()
                BarrierSet = 1
            }
            if (BarrierLife <= 0) {
                Barrier.destroy(effects.disintegrate, 500)
            }
        }
        if (Ene3Life <= 100) {
            if (HBarrierSet == 0) {
                MakeBarrier()
                HBarrierSet = 1
            }
            if (HBarrierLife <= 0) {
                HugeBarrier.destroy(effects.disintegrate, 500)
            }
        }
    }
    if (_3rdStage == 2) {
        Bubble.destroy()
        pause(2000)
        Text = sprites.create(assets.image`Clear3`, SpriteKind.Info)
        animation.runImageAnimation(
        Text,
        assets.animation`Clea3Anim`,
        50,
        false
        )
        pause(2500)
        game.showLongText("Push \"Menu\" To Restart", DialogLayout.Bottom)
    }
})
// 1stステージ（HP:500）
// ・縦方向にゆっくり動く敵
// ・5秒間隔で、ゆっくり迫る毒リンゴをY軸ランダム設置
forever(function () {
    if (_1stStage == 1) {
        AttackTime1 += 1
        pause(1000)
        if (AttackTime1 == 5) {
            Enemy1.startEffect(effects.coolRadial, 500)
            pause(1000)
            Ene1Attack1 = sprites.create(assets.image`Ene1Attack`, SpriteKind.Gimmick)
            Ene1Attack2 = sprites.create(assets.image`Ene1Attack`, SpriteKind.Gimmick)
            Ene1Attack1.setPosition(110, randint(20, 100))
            Ene1Attack2.setPosition(110, randint(20, 100))
            Ene1Attack1.setVelocity(-30, 0)
            Ene1Attack2.setVelocity(-30, 0)
            AttackTime1 = 0
        }
    }
    if (_1stStage == 2) {
        Ene1Attack1.destroy()
        Ene1Attack2.destroy()
        pause(2000)
        Text = sprites.create(assets.image`Clear1`, SpriteKind.Info)
        animation.runImageAnimation(
        Text,
        assets.animation`Clea1Anim`,
        50,
        false
        )
        pause(2500)
        Blackout = sprites.create(assets.image`Blackout`, SpriteKind.Info)
        animation.runImageAnimation(
        Blackout,
        assets.animation`BlackoutAnim`,
        50,
        false
        )
        pause(1500)
        Text.destroy()
        BackGround = 2
        SetBackGround()
        _1stStage = 0
        _2ndStage = 1
        mySprite.destroy()
    }
})
// 2ndステージ（HP:1000）
// ・縦方向に高速で動く敵
// ・1～4秒間隔でアメフトボールをランダムな場所に飛ばしてくる
forever(function () {
    if (_2ndStage == 1) {
        if (PlayerFlag == 0) {
            CallPlayer()
            Blackout.destroy()
            Blackout = sprites.create(assets.image`Blackout`, SpriteKind.Info)
            animation.runImageAnimation(
            Blackout,
            assets.animation`BlackoutAnim2`,
            50,
            false
            )
            PlayerFlag = 1
        }
        if (Ene2Flag == 0) {
            pause(600)
            CallEnemy2()
            Ene2Life = 1000
            Ene2Flag = 1
        }
        pause(randint(0, 3000))
        Enemy2.startEffect(effects.coolRadial, 500)
        pause(1000)
        Ene2Attack = sprites.createProjectileFromSprite(assets.image`Ene3Attack`, Enemy2, randint(-150, -200), randint(-100, 100))
        Ene2Attack.setFlag(SpriteFlag.BounceOnWall, true)
    }
    if (_2ndStage == 2) {
        Ene2Attack.destroy()
        pause(2000)
        Text = sprites.create(assets.image`Clear2`, SpriteKind.Info)
        animation.runImageAnimation(
        Text,
        assets.animation`Clea2Anim`,
        50,
        false
        )
        pause(2500)
        Blackout = sprites.create(assets.image`Blackout`, SpriteKind.Info)
        animation.runImageAnimation(
        Blackout,
        assets.animation`BlackoutAnim`,
        50,
        false
        )
        pause(1500)
        Text.destroy()
        BackGround = 3
        SetBackGround()
        _2ndStage = 0
        _3rdStage = 1
        mySprite.destroy()
    }
})
// 3rdステージの敵の動き方をランダムなものに制御
forever(function () {
    if (Ene3Flag == 1) {
        Enemy3.setVelocity(randint(-20, 50), randint(-120, 120))
        pause(500)
    }
})
