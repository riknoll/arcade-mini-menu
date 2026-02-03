namespace SpriteKind {
    //% isKind
    export const MiniMenu = SpriteKind.create();
}

namespace miniMenu {
    let stateStack: MiniMenuState[];

    class MiniMenuState {
        menuStyle: MenuStyle;
        defaultStyle: Style;
        selectedStyle: Style;
        disabledStyle: Style;
        titleStyle: Style;

        sprites: MenuSprite[];

        constructor() {
            this.sprites = [];
            this.menuStyle = new MenuStyle();
            this.defaultStyle = new Style();

            this.defaultStyle._iconTextSpacing = 8;
            this.defaultStyle._padding = 2;
            this.defaultStyle._foreground = 15;
            this.defaultStyle._background = 1;

            this.selectedStyle = this.defaultStyle.clone();
            this.selectedStyle._foreground = 1;
            this.selectedStyle._background = 3;

            this.disabledStyle = this.defaultStyle.clone();
            this.disabledStyle._foreground = 11;

            this.titleStyle = this.defaultStyle.clone();
            this.titleStyle._background = 0;
        }

        addSprite(sprite: MenuSprite) {
            this.sprites.push(sprite);
        }

        removeSprite(sprite: MenuSprite) {
            this.sprites = this.sprites.filter(s => s !== sprite);
        }

        onStyleChange(style: Style) {
            if (style === this.defaultStyle || style === this.titleStyle || style === this.selectedStyle) {
                this.updateDimensions();
            }
        }

        onMenuStyleChange(style: MenuStyle) {
            if (style === this.menuStyle) {
                this.updateDimensions();
            }
        }

        protected updateDimensions() {
            for (const sprite of this.sprites) {
                sprite.updateDimensions();
            }
        }
    }

    export enum StyleKind {
        //% block="default"
        Default,
        //% block="selected"
        Selected,
        //% block="title"
        Title,
        //% block="disabled"
        Disabled,
        //% block="default and selected"
        DefaultAndSelected,
        //% block="all"
        All
    }

    export enum MoveDirection {
        //% block=up
        Up,
        //% block=down
        Down,
        //% block=left
        Left,
        //% block=right
        Right
    }

    export function _state() {
        _init();
        return stateStack[stateStack.length - 1];
    }

    export function _init() {
        if (stateStack) return;

        stateStack = [
            new MiniMenuState()
        ];

        _initPrintCanvas();

        game.addScenePushHandler(() => {
            stateStack.push(new MiniMenuState())
        })

        game.addScenePopHandler(() => {
            stateStack.pop();

            if (stateStack.length === 0) {
                stateStack.push(new MiniMenuState());
            }
        })
    }
}
