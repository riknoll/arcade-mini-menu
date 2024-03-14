namespace SpriteKind {
    //% isKind
    export const MiniMenu = SpriteKind.create();
}

namespace miniMenu {
    const SCROLL_INDICATOR_WIDTH = 7;

    let stateStack: MiniMenuState[];
    let printCanvas: Image;
    let frameCanvas: Image;

    class MiniMenuState {
        menuStyle: MenuStyle;
        defaultStyle: Style;
        selectedStyle: Style;
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

            this.titleStyle = this.defaultStyle.clone();
            this.titleStyle._background = 0;


            for (const button of [controller.up, controller.right, controller.down, controller.menu, controller.left, controller.A, controller.B]) {
                button.addEventListener(ControllerButtonEvent.Pressed, () => {
                    for (const sprite of this.sprites.filter(buttonEventsEnabled)) {
                        sprite.fireButtonEvent(button);
                    }
                });
            }
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

    export enum Alignment {
        Left,
        Center,
        Right
    }

    export enum StyleProperty {
        //% block="padding"
        Padding,
        //% block="foreground"
        Foreground,
        //% block="background"
        Background,
        //% block="border color"
        BorderColor,
        //% block="border"
        Border,
        //% block="margin"
        Margin,
        //% block="icon-text spacing"
        IconTextSpacing,
        //% block="alignment"
        Alignment,
        //% block="icon only"
        IconOnly
    }

    export enum MenuStyleProperty {
        //% block="width"
        Width,
        //% block="height"
        Height,
        //% block="border"
        Border,
        //% block="border color"
        BorderColor,
        //% block="padding"
        Padding,
        //% block="background color"
        BackgroundColor,
        //% block="scroll speed"
        ScrollSpeed,
        //% block="rows"
        Rows,
        //% block="columns"
        Columns,
        //% block="scroll indicator"
        ScrollIndicatorColor,
        //% block="use as template"
        UseAsTemplate
    }

    export enum StyleKind {
        //% block="default"
        Default,
        //% block="selected"
        Selected,
        //% block="title"
        Title,
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

    export class MenuStyle {
        _customWidth: number;
        _customHeight: number;
        _scrollSpeed: number;
        _columns: number;
        _rows: number;
        _border: number;
        _borderColor: number;
        _padding: number;
        _backgroundColor: number;
        _scrollColor: number;

        constructor(public parent?: MenuStyle) {
            if (!parent) {
                this._scrollSpeed = 150;
                this._columns = 0;
                this._rows = 0;
                this._backgroundColor = 0;
                this._border = 0;
                this._padding = 0;
                this._borderColor = 0;
            }
        }

        get customWidth(): number {
            if (this.parent && this._customWidth === undefined) {
                return this.parent.customWidth;
            }
            return this._customWidth;
        }

        set customWidth(value: number) {
            this._customWidth = value;
            _state().onMenuStyleChange(this);
        }

        get customHeight(): number {
            if (this.parent && this._customHeight === undefined) {
                return this.parent.customHeight;
            }
            return this._customHeight;
        }

        set customHeight(value: number) {
            this._customHeight = value;
            _state().onMenuStyleChange(this);
        }

        get scrollSpeed(): number {
            if (this.parent && this._scrollSpeed === undefined) {
                return this.parent.scrollSpeed;
            }
            return this._scrollSpeed;
        }

        set scrollSpeed(value: number) {
            this._scrollSpeed = value;
        }

        get columns(): number {
            if (this.parent && this._columns === undefined) {
                return this.parent.columns;
            }
            return this._columns;
        }

        set columns(value: number) {
            this._columns = value;
            _state().onMenuStyleChange(this);
        }

        get rows(): number {
            if (this.parent && this._rows === undefined) {
                return this.parent.rows;
            }
            return this._rows;
        }

        set rows(value: number) {
            this._rows = value;
            _state().onMenuStyleChange(this);
        }

        get border(): number {
            if (this.parent && this._border === undefined) {
                return this.parent.border;
            }
            return this._border;
        }

        set border(value: number) {
            this._border = value;
            _state().onMenuStyleChange(this);
        }

        get borderColor(): number {
            if (this.parent && this._borderColor === undefined) {
                return this.parent.borderColor;
            }
            return this._borderColor;
        }

        set borderColor(value: number) {
            this._borderColor = value;
        }

        get padding(): number {
            if (this.parent && this._padding === undefined) {
                return this.parent.padding;
            }
            return this._padding;
        }

        set padding(value: number) {
            this._padding = value;
            _state().onMenuStyleChange(this);
        }

        get backgroundColor(): number {
            if (this.parent && this._backgroundColor === undefined) {
                return this.parent.backgroundColor;
            }
            return this._backgroundColor;
        }

        set backgroundColor(value: number) {
            this._backgroundColor = value;
        }

        get scrollColor(): number {
            if (this.parent && this._scrollColor === undefined) {
                return this.parent.scrollColor;
            }
            return this._scrollColor;
        }

        set scrollColor(value: number) {
            this._scrollColor = value;
        }

        setMenuStyleProperty(property: MenuStyleProperty, value: number) {
            switch (property) {
                case MenuStyleProperty.Width:
                    this.customWidth = value;
                    break;
                case MenuStyleProperty.Height:
                    this.customHeight = value;
                    break;
                case MenuStyleProperty.ScrollSpeed:
                    this.scrollSpeed = value;
                    break;
                case MenuStyleProperty.Columns:
                    this.columns = Math.max(value | 0, 0);
                    break;
                case MenuStyleProperty.Rows:
                    this.rows = Math.max(value | 0, 0);
                    break;
                case MenuStyleProperty.Border:
                    this.border = value | 0;
                    break;
                case MenuStyleProperty.Padding:
                    this.padding = value | 0;
                    break;
                case MenuStyleProperty.BorderColor:
                    this.borderColor = value | 0;
                    break;
                case MenuStyleProperty.BackgroundColor:
                    this.backgroundColor = value | 0;
                    break;
                case MenuStyleProperty.ScrollIndicatorColor:
                    this.scrollColor = value | 0;
                    break;
            }
        }

        copyTo(target: MenuStyle) {
            target.customWidth = this.customWidth;
            target.customHeight = this.customHeight;
            target.scrollSpeed = this.scrollSpeed;
            target.columns = this.columns;
            target.rows = this.rows;
            target.border = this.border;
            target.borderColor = this.borderColor;
            target.padding = this.padding;
            target.backgroundColor = this.backgroundColor;
            target.scrollColor = this.scrollColor;
        }
    }

    export class Style {
        _padding: number;
        _foreground: number;
        _background: number;
        _borderColor: number;
        _border: number;
        _margin: number;
        _iconTextSpacing: number;
        _iconOnly: number;
        _alignment: Alignment;

        get padding(): number {
            if (this._padding === undefined) {
                return this.parent.padding;
            }
            return this._padding
        }

        set padding(value: number) {
            this._padding = value;
            _state().onStyleChange(this);
        }

        get foreground(): number {
            if (this._foreground === undefined) {
                return this.parent.foreground;
            }
            return this._foreground
        }

        set foreground(value: number) {
            this._foreground = value;
        }

        get background(): number {
            if (this._background === undefined) {
                return this.parent.background;
            }
            return this._background
        }

        set background(value: number) {
            this._background = value;
        }

        get borderColor(): number {
            if (this._borderColor === undefined) {
                return this.parent.borderColor;
            }
            return this._borderColor
        }

        set borderColor(value: number) {
            this._borderColor = value;
        }

        get border(): number {
            if (this._border === undefined) {
                return this.parent.border;
            }
            return this._border
        }

        set border(value: number) {
            this._border = value;
            _state().onStyleChange(this);
        }

        get margin(): number {
            if (this._margin === undefined) {
                return this.parent.margin;
            }
            return this._margin
        }

        set margin(value: number) {
            this._margin = value;
            _state().onStyleChange(this);
        }

        get iconTextSpacing(): number {
            if (this._iconTextSpacing === undefined) {
                return this.parent.iconTextSpacing;
            }
            return this._iconTextSpacing
        }

        set iconTextSpacing(value: number) {
            this._iconTextSpacing = value;
            _state().onStyleChange(this);
        }

        get iconOnly(): number {
            if (this._iconOnly === undefined) {
                return this.parent.iconOnly;
            }
            return this._iconOnly
        }

        set iconOnly(value: number) {
            this._iconOnly = value;
            _state().onStyleChange(this);
        }

        get alignment(): Alignment {
            if (this._alignment === undefined) {
                return this.parent.alignment;
            }
            return this._alignment
        }

        set alignment(value: Alignment) {
            this._alignment = value;
            _state().onStyleChange(this);
        }

        constructor(public parent?: Style) {
            if (!parent) {
                this._padding = 0;
                this._foreground = 1;
                this._background = 15;
                this._borderColor = 1;
                this._border = 0;
                this._margin = 0;
                this._iconTextSpacing = 0;
                this._iconOnly = 0;
                this._alignment = Alignment.Left
            }
        }

        clone(flattenInheritance = false) {
            const res = new Style();
            if (flattenInheritance) {
                res.padding = this.padding;
                res.foreground = this.foreground;
                res.background = this.background;
                res.borderColor = this.borderColor;
                res.border = this.border;
                res.margin = this.margin;
                res.iconOnly = this.iconOnly;
                res.iconTextSpacing = this.iconTextSpacing;
                res.alignment = this.alignment;
            }
            else {
                res._padding = this._padding;
                res._foreground = this._foreground;
                res._background = this._background;
                res._borderColor = this._borderColor;
                res._border = this._border;
                res._margin = this._margin;
                res._iconOnly = this._iconOnly;
                res._iconTextSpacing = this._iconTextSpacing;
                res._alignment = this._alignment;
                res.parent = this.parent;
            }

            return res;
        }

        copyTo(target: Style) {
            target.padding = this.padding;
            target.foreground = this.foreground;
            target.background = this.background;
            target.borderColor = this.borderColor;
            target.border = this.border;
            target.margin = this.margin;
            target.iconOnly = this.iconOnly;
            target.iconTextSpacing = this.iconTextSpacing;
            target.alignment = this.alignment;
        }

        setProperty(prop: StyleProperty, value: number) {
            switch (prop) {
                case StyleProperty.Padding:
                    this.padding = value;
                    break;
                case StyleProperty.Foreground:
                    this.foreground = value;
                    break;
                case StyleProperty.Background:
                    this.background = value;
                    break;
                case StyleProperty.BorderColor:
                    this.borderColor = value;
                    break;
                case StyleProperty.Border:
                    this.border = value;
                    break;
                case StyleProperty.Margin:
                    this.margin = value;
                    break;
                case StyleProperty.IconTextSpacing:
                    this.iconTextSpacing = value;
                    break;
                case StyleProperty.Alignment:
                    this.alignment = value;
                    break;
                case StyleProperty.IconOnly:
                    this.iconOnly = value;
                    break;
            }
        }
    }

    export class MenuItem {
        font: image.Font;

        constructor(public text: string, public icon: Image) {
            this.font = image.getFontForText(text);
        }

        getHeight(style: Style) {
            const allPadding =
                unpackMargin(style.padding, MoveDirection.Up) +
                unpackMargin(style.padding, MoveDirection.Down) +
                unpackMargin(style.margin, MoveDirection.Up) +
                unpackMargin(style.margin, MoveDirection.Down) +
                unpackMargin(style.border, MoveDirection.Up) +
                unpackMargin(style.border, MoveDirection.Down);

            if (style.iconOnly && this.icon) {
                return this.icon.height + allPadding
            }
            else if (this.icon) {
                return Math.max(this.icon.height, this.font.charHeight) + allPadding;
            }
            else {
                return this.font.charHeight + allPadding
            }
        }

        getWidth(style: Style) {
            const allPadding =
                unpackMargin(style.padding, MoveDirection.Left) +
                unpackMargin(style.padding, MoveDirection.Right) +
                unpackMargin(style.margin, MoveDirection.Left) +
                unpackMargin(style.margin, MoveDirection.Right) +
                unpackMargin(style.border, MoveDirection.Left) +
                unpackMargin(style.border, MoveDirection.Right);

            if (style.iconOnly && this.icon) {
                return this.icon.width + allPadding
            }
            else if (this.icon) {
                return this.icon.width + style.iconTextSpacing + this.text.length * this.font.charWidth + allPadding;
            }
            else {
                return this.text.length * this.font.charWidth + allPadding
            }
        }

        drawTo(left: number, top: number, target: Image, style: Style, width: number, height: number, cutTop: boolean, cutLeft: boolean, scrollTick: number, maxWidth = 0, maxHeight = 0) {
            if (height <= 0 || width <= 0) return;

            if (!maxWidth) {
                maxWidth = this.getWidth(style);
            }

            if (!maxHeight) {
                maxHeight = this.getHeight(style);
            }

            const widthOfText = this.font.charWidth * this.text.length;

            let borderLeft = left + unpackMargin(style.margin, MoveDirection.Left);
            let borderTop = top + unpackMargin(style.margin, MoveDirection.Up);
            let borderRight = left + maxWidth - unpackMargin(style.margin, MoveDirection.Right);
            let borderBottom = top + maxHeight - unpackMargin(style.margin, MoveDirection.Down);

            let contentLeft = borderLeft + unpackMargin(style.border, MoveDirection.Left) + unpackMargin(style.padding, MoveDirection.Left);
            let contentTop = borderTop + unpackMargin(style.border, MoveDirection.Up) + unpackMargin(style.padding, MoveDirection.Up);
            let contentRight = borderRight - unpackMargin(style.border, MoveDirection.Right) - unpackMargin(style.padding, MoveDirection.Right);
            let contentBottom = borderBottom - unpackMargin(style.border, MoveDirection.Down) - unpackMargin(style.padding, MoveDirection.Down);

            let textLeft: number;
            let textTop = contentTop + ((contentBottom - contentTop) >> 1) - (this.font.charHeight >> 1);
            let textRight: number;
            let textBottom = textTop + this.font.charHeight;

            let iconLeft: number;
            let iconTop: number;
            let iconRight: number;
            let iconBottom: number;

            let cutoffLeft: number;
            let cutoffTop: number;
            let cutoffRight: number;
            let cutoffBottom: number;

            if (cutLeft) {
                cutoffLeft = left + maxWidth - width;
                cutoffRight = left + maxWidth;
            }
            else {
                cutoffLeft = left;
                cutoffRight = left + width;
            }

            if (cutTop) {
                cutoffTop = top + maxHeight - height;
                cutoffBottom = top + maxHeight;
            }
            else {
                cutoffTop = top;
                cutoffBottom = top + height;
            }

            if (this.icon) {
                iconTop = contentTop + ((contentBottom - contentTop) >> 1) - (this.icon.height >> 1);
                iconBottom = iconTop + this.icon.height

                if (style.iconOnly) {
                    if (style.alignment === Alignment.Left) {
                        iconLeft = contentLeft;
                    }
                    else if (style.alignment === Alignment.Right) {
                        iconLeft = contentRight - this.icon.width;
                    }
                    else {
                        iconLeft = contentLeft + ((contentRight - contentLeft) >> 1) - (this.icon.width >> 1);
                    }
                }
                else if (style.alignment !== Alignment.Left && this.icon.width + widthOfText + style.iconTextSpacing < contentRight - contentLeft) {
                    if (style.alignment === Alignment.Right) {
                        iconLeft = contentRight - widthOfText - style.iconTextSpacing - this.icon.width;
                    }
                    else {
                        iconLeft = contentLeft + ((contentRight - contentLeft) >> 1) - ((this.icon.width + widthOfText + style.iconTextSpacing) >> 1);
                    }
                }
                else {
                    iconLeft = contentLeft;
                }

                iconRight = iconLeft + this.icon.width;
                textLeft = iconRight + style.iconTextSpacing;
            }
            else if (style.alignment !== Alignment.Left && widthOfText < (contentRight - contentLeft)) {
                if (style.alignment === Alignment.Right) {
                    textLeft = contentRight - widthOfText;
                }
                else {
                    textLeft = contentLeft + ((contentRight - contentLeft) >> 1) - (widthOfText >> 1)
                }
            }
            else {
                textLeft = contentLeft;
            }

            textRight = Math.min(textLeft + widthOfText, contentRight);

            if (style.borderColor) {
                fillRegion(
                    target,
                    Math.max(borderLeft, cutoffLeft),
                    Math.max(borderTop, cutoffTop),
                    Math.min(borderRight, cutoffRight),
                    Math.min(borderBottom, cutoffBottom),
                    style.borderColor
                );
            }

            if (style.background) {
                fillRegion(
                    target,
                    Math.max(borderLeft + unpackMargin(style.border, MoveDirection.Left), cutoffLeft),
                    Math.max(borderTop + unpackMargin(style.border, MoveDirection.Up), cutoffTop),
                    Math.min(borderRight - unpackMargin(style.border, MoveDirection.Right), cutoffRight),
                    Math.min(borderBottom - unpackMargin(style.border, MoveDirection.Down), cutoffBottom),
                    style.background
                );
            }

            if (this.icon) {
                drawImageInRect(
                    target,
                    this.icon,
                    Math.max(iconLeft, cutoffLeft),
                    Math.max(iconTop, cutoffTop),
                    Math.min(iconRight, cutoffRight),
                    Math.min(iconBottom, cutoffBottom),
                    cutLeft,
                    cutTop
                )

                if (style.iconOnly) return;
            }

            if (scrollTick) {
                const maxScroll = widthOfText - (Math.min(textRight, cutoffRight) - Math.max(textLeft, cutoffLeft));
                const animationLength = (100 + maxScroll + 100) << 2;

                scrollTick = scrollTick % animationLength;

                printScrolledText(
                    target,
                    this.text,
                    Math.max(textLeft, cutoffLeft),
                    textTop,
                    Math.min(textRight, cutoffRight),
                    textBottom,
                    style.foreground,
                    Math.min(Math.max((scrollTick - 100) >> 2, 0), maxScroll),
                    this.font
                )
            }
            else {
                const printableCharacters = Math.ceil((textRight - textLeft) / this.font.charWidth)
                printTextInRect(
                    target,
                    this.text.substr(0, printableCharacters),
                    Math.max(textLeft, cutoffLeft),
                    Math.max(textTop, cutoffTop),
                    Math.min(textRight, cutoffRight),
                    Math.min(textBottom, cutoffBottom),
                    style.foreground,
                    cutLeft,
                    cutTop,
                    this.font
                )
            }
        }
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

        printCanvas = image.create(12, 12);

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

    class ButtonHandler {
        enabled: boolean
        constructor(
            public button: controller.Button,
            public handler: (text: string, selectedIndex: number) => void
        ) {

            // Button handlers are often registered inside a button event (e.g. closing
            // one menu and opening another when an option is selected). We don't want
            // this event to fire immediately, so disable the handler until the button
            // is released.
            if (button.isPressed()) {
                this.enabled = false;

                const enableHandler = () => {
                    this.enabled = true;
                    button.removeEventListener(ControllerButtonEvent.Released, enableHandler);
                };
                button.addEventListener(ControllerButtonEvent.Released, enableHandler);
            }
            else {
                this.enabled = true;
            }
        }

        fire(text: string, selectedIndex: number) {
            if (!this.enabled) return;
            this.handler(text, selectedIndex);
        }
    }

    export class MenuSprite extends sprites.ExtendableSprite {
        items: MenuItem[];

        menuStyle: MenuStyle;
        titleStyle: Style;
        defaultStyle: Style;
        selectedStyle: Style;

        selectedIndex: number;
        buttonEventsEnabled: boolean;

        yScroll: number;
        targetYScroll: number;
        xScroll: number;
        targetXScroll: number;

        scrollAnimationTick: number;
        titleAnimationTick: number;

        title: MenuItem;

        maxScroll: number;
        frame: Image;

        protected buttonHandlers: ButtonHandler[];
        protected itemSelectedHandler: (value: string, selectedIndex: number) => void;

        constructor() {
            super(img`.`, SpriteKind.MiniMenu);
            _init();
            this.menuStyle = new MenuStyle(_state().menuStyle)
            this.titleStyle = new Style(_state().titleStyle)
            this.defaultStyle = new Style(_state().defaultStyle)
            this.selectedStyle = new Style(_state().selectedStyle)

            this.selectedIndex = 0;
            this.items = [];

            this.buttonHandlers = [];
            this.buttonEventsEnabled = false;

            this.onButtonEvent(controller.up, () => this.moveSelection(MoveDirection.Up));
            this.onButtonEvent(controller.down, () => this.moveSelection(MoveDirection.Down));
            this.onButtonEvent(controller.left, () => this.moveSelection(MoveDirection.Left));
            this.onButtonEvent(controller.right, () => this.moveSelection(MoveDirection.Right));
            this.yScroll = 0;
            this.targetYScroll = 0;
            this.xScroll = 0;
            this.targetXScroll = 0;
            this.scrollAnimationTick = -1;
            this.titleAnimationTick = 0;

            _state().addSprite(this);
        }

        draw(drawLeft: number, drawTop: number) {
            if (!this.items) return;

            const width = this.getWidth();
            const height = this.getHeight();
            let titleHeight = 0
            let frameWidth = this.frame ? Math.idiv(this.frame.width, 3) : 0;

            const scrollWidth = (this.menuStyle.scrollColor ? (this.isVerticalScroll() ? SCROLL_INDICATOR_WIDTH + 1 : 0) : 0);
            const scrollHeight = (this.menuStyle.scrollColor ? (this.isVerticalScroll() ? 0 : SCROLL_INDICATOR_WIDTH + 1) : 0);

            if (this.frame) {
                drawFrame(
                    screen,
                    this.frame,
                    drawLeft,
                    drawTop,
                    drawLeft + width - scrollWidth,
                    drawTop + height - scrollHeight
                );
            }

            if (this.menuStyle.borderColor) {
                fillRegion(
                    screen,
                    drawLeft + frameWidth,
                    drawTop + frameWidth,
                    drawLeft + width - frameWidth,
                    drawTop + height - frameWidth,
                    this.menuStyle.borderColor
                )
            }

            if (this.menuStyle.backgroundColor) {
                fillRegion(
                    screen,
                    drawLeft + unpackMargin(this.menuStyle.border, MoveDirection.Left) + frameWidth,
                    drawTop + unpackMargin(this.menuStyle.border, MoveDirection.Up) + frameWidth,
                    drawLeft + width - unpackMargin(this.menuStyle.border, MoveDirection.Right) - frameWidth,
                    drawTop + height - unpackMargin(this.menuStyle.border, MoveDirection.Down) - frameWidth,
                    this.menuStyle.backgroundColor
                )
            }

            const contentWidth = width -
                unpackMargin(this.menuStyle.border, MoveDirection.Left) -
                unpackMargin(this.menuStyle.border, MoveDirection.Right) -
                unpackMargin(this.menuStyle.padding, MoveDirection.Left) -
                unpackMargin(this.menuStyle.padding, MoveDirection.Right) -
                (frameWidth << 1) -
                scrollWidth;
            const contentHeight = height -
                unpackMargin(this.menuStyle.border, MoveDirection.Up) -
                unpackMargin(this.menuStyle.border, MoveDirection.Down) -
                unpackMargin(this.menuStyle.padding, MoveDirection.Up) -
                unpackMargin(this.menuStyle.padding, MoveDirection.Down) -
                (frameWidth << 1) -
                scrollHeight;


            if (this.title) {
                titleHeight = this.title.getHeight(this.titleStyle);
                this.title.drawTo(
                    drawLeft + unpackMargin(this.menuStyle.border, MoveDirection.Left) + unpackMargin(this.menuStyle.padding, MoveDirection.Left) + frameWidth,
                    drawTop + unpackMargin(this.menuStyle.border, MoveDirection.Up) + unpackMargin(this.menuStyle.padding, MoveDirection.Up) + frameWidth,
                    screen,
                    this.titleStyle,
                    contentWidth,
                    Math.min(titleHeight, contentHeight),
                    false,
                    false,
                    this.titleAnimationTick,
                    contentWidth,
                    titleHeight
                )
            }

            if (this.menuStyle.columns <= 1 && this.menuStyle.rows === 0) {
                this.drawSingleColumn(
                    drawLeft + unpackMargin(this.menuStyle.border, MoveDirection.Left) + unpackMargin(this.menuStyle.padding, MoveDirection.Left) + frameWidth,
                    drawTop + titleHeight + unpackMargin(this.menuStyle.border, MoveDirection.Up) + unpackMargin(this.menuStyle.padding, MoveDirection.Up) + frameWidth,
                    contentWidth,
                    contentHeight - titleHeight
                );
            }
            else if (this.menuStyle.columns === 0 && this.menuStyle.rows === 1) {
                this.drawSingleRow(
                    drawLeft + unpackMargin(this.menuStyle.border, MoveDirection.Left) + unpackMargin(this.menuStyle.padding, MoveDirection.Left) + frameWidth,
                    drawTop + titleHeight + unpackMargin(this.menuStyle.border, MoveDirection.Up) + unpackMargin(this.menuStyle.padding, MoveDirection.Up) + frameWidth,
                    contentWidth,
                    contentHeight - titleHeight
                );
            }
            else {
                this.drawGrid(
                    drawLeft + unpackMargin(this.menuStyle.border, MoveDirection.Left) + unpackMargin(this.menuStyle.padding, MoveDirection.Left) + frameWidth,
                    drawTop + titleHeight + unpackMargin(this.menuStyle.border, MoveDirection.Up) + unpackMargin(this.menuStyle.padding, MoveDirection.Up) + frameWidth,
                    contentWidth,
                    contentHeight - titleHeight
                );
            }

            if (this.menuStyle.scrollColor) {
                if (this.isVerticalScroll()) {
                    if (this.targetYScroll >= 1) {
                        drawScrollIndicator(
                            screen,
                            drawTop,
                            drawLeft + width - SCROLL_INDICATOR_WIDTH,
                            MoveDirection.Up,
                            this.menuStyle.scrollColor
                        )
                    }

                    if (this.targetYScroll < this.maxScroll - 1) {
                        drawScrollIndicator(
                            screen,
                            drawTop + height - (SCROLL_INDICATOR_WIDTH >> 1) - 1,
                            drawLeft + width - SCROLL_INDICATOR_WIDTH,
                            MoveDirection.Down,
                            this.menuStyle.scrollColor
                        )
                    }
                }
                else {
                    if (this.targetXScroll >= 1) {
                        drawScrollIndicator(
                            screen,
                            drawTop + height - SCROLL_INDICATOR_WIDTH,
                            drawLeft,
                            MoveDirection.Left,
                            this.menuStyle.scrollColor
                        )
                    }

                    if (this.targetXScroll < this.maxScroll - 1) {
                        drawScrollIndicator(
                            screen,
                            drawTop + height - SCROLL_INDICATOR_WIDTH,
                            drawLeft + width - (SCROLL_INDICATOR_WIDTH >> 1) - 1,
                            MoveDirection.Right,
                            this.menuStyle.scrollColor
                        )
                    }
                }
            }
        }

        update(deltaTimeMillis: number) {
            if (Math.abs(this.yScroll - this.targetYScroll) <= 1) {
                this.yScroll = this.targetYScroll
            }
            else {
                this.yScroll += (this.targetYScroll - this.yScroll) / 5;
            }

            if (Math.abs(this.xScroll - this.targetXScroll) <= 1) {
                this.xScroll = this.targetXScroll
            }
            else {
                this.xScroll += (this.targetXScroll - this.xScroll) / 5;
            }

            const deltaTick = (deltaTimeMillis / 1000) * this.menuStyle.scrollSpeed;

            if (this.yScroll === this.targetYScroll && this.xScroll === this.targetXScroll) {
                this.scrollAnimationTick += deltaTick
            }
            else {
                this.scrollAnimationTick = 0
            }

            this.titleAnimationTick += deltaTick

            if (this.scrollAnimationTick < 0) this.scrollAnimationTick = 0
            if (this.titleAnimationTick < 0) this.titleAnimationTick = 0
        }

        setMenuItems(items: MenuItem[]) {
            this.items = items;
            this.updateDimensions();
        }

        /**
         * Sets whether or not button events on this MenuSprite will be fired.
         *
         * @param enabled If true, button events are enabled. If false, they are disabled
         */
        //% blockId=mini_menu_sprite_set_button_events_enabled
        //% block="$this set button events enabled $enabled"
        //% this.defl=myMenu
        //% enable.shadow=toggleOnOff
        //% group="Controls"
        //% weight=80
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/set-button-events-enabled
        setButtonEventsEnabled(enabled: boolean) {
            this.buttonEventsEnabled = enabled;
        }

        /**
         * Moves the selection cursor in the MenuSprite in the given direction.
         *
         * @param direction The direction to move the cursor in
         */
        //% blockId=mini_menu_sprite_move_selection_up
        //% block="$this move selection $direction"
        //% this.defl=myMenu
        //% direction.shadow=mini_menu_move_direction
        //% group="Controls"
        //% weight=90
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/move-selection
        moveSelection(direction: number) {
            if (this.items.length === 0) return;

            let oldSelection = this.selectedIndex;

            if (this.menuStyle.columns <= 1 && this.menuStyle.rows === 0) {
                if (direction === MoveDirection.Up) {
                    this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
                }
                else if (direction === MoveDirection.Down) {
                    this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
                }
                else {
                    return;
                }
                this.scrollAnimationTick = 0;
            }
            else if (this.menuStyle.columns === 0 && this.menuStyle.rows === 1) {
                if (direction === MoveDirection.Left) {
                    this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
                }
                else if (direction === MoveDirection.Right) {
                    this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
                }
                else {
                    return;
                }
                this.scrollAnimationTick = 0;
            }
            else {
                let column = this.selectedIndex % this.menuStyle.columns;
                let row = Math.idiv(this.selectedIndex, this.menuStyle.columns);

                const maxRows = Math.ceil(this.items.length / this.menuStyle.columns);

                if (direction === MoveDirection.Up) {
                    row = (row + maxRows - 1) % maxRows;

                    if (column + row * this.menuStyle.columns >= this.items.length) {
                        row = maxRows - 2;
                    }
                }
                else if (direction === MoveDirection.Down) {
                    row = (row + 1) % maxRows;
                    if (column + row * this.menuStyle.columns >= this.items.length) {
                        row = 0
                    }
                }
                else if (direction === MoveDirection.Left) {
                    column = (column + this.menuStyle.columns - 1) % this.menuStyle.columns
                    if (column + row * this.menuStyle.columns >= this.items.length) {
                        column = (this.items.length - 1) % this.menuStyle.columns
                    }
                }
                else if (direction === MoveDirection.Right) {
                    column = (column + 1) % this.menuStyle.columns
                    if (column + row * this.menuStyle.columns >= this.items.length) {
                        column = 0;
                    }
                }

                this.selectedIndex = column + row * this.menuStyle.columns
                this.scrollAnimationTick = 0
            }

            this.updateDimensions();

            if (this.itemSelectedHandler && oldSelection !== this.selectedIndex) {
                this.itemSelectedHandler(this.items[this.selectedIndex].text, this.selectedIndex);
            }
        }

        /**
         * Destroys the MenuSprite. This is exactly the same as using the destroy block in the Sprites category
         */
        //% blockId=mini_menu_sprite_close_menu
        //% block="close $this"
        //% this.defl=myMenu
        //% group="Create"
        //% weight=10
        //% help=github:arcade-mini-menu/docs/close
        close() {
            this.destroy();
        }

        /**
         * Runs some code whenever a button is pressed and the given MenuSprite has not been destroyed. Using this with one of the direction buttons will override the default behavior.
         *
         * @param button The button to listen to
         * @param handler The code to run when the button is pressed
         */
        //% blockId=mini_menu_on_button_pressed
        //% block="$this on $button pressed with $selection"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% handlerStatement
        //% draggableParameters=reporter
        //% group="Controls"
        //% weight=100
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/on-button-pressed
        onButtonPressed(button: controller.Button, handler: (selection: string, selectedIndex: number) => void) {
            this.onButtonEvent(button, handler);
        }

        /**
         * Runs some code whenever the selection cursor in the specified MenuSprite moves. This will also fire once immediately when this function is called
         *
         * @param handler The code to run when the selection changes
         */
        //% blockId=mini_menu_on_selection_changed
        //% block="$this on selection changed $selection $selectedIndex"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% handlerStatement
        //% draggableParameters=reporter
        //% group="Controls"
        //% weight=90
        //% help=github:arcade-mini-menu/docs/on-selection-changed
        onSelectionChanged(handler: (selection: string, selectedIndex: number) => void) {
            this.itemSelectedHandler = handler;

            // This event is often used to display information about the selected item, so
            // run the handler immediately to prevent the user from having to duplicate code
            // for the first selected item
            if (handler && this.items && this.items.length) handler(this.items[this.selectedIndex].text, this.selectedIndex);
        }

        /**
         * Sets a style property for the specified part of the MenuSprite. See the help page for more info on what these properties mean.
         *
         * @param kind The part of the MenuSprite to style
         * @param property The property to set the value of
         * @param value The value to set the property to
         */
        //% blockId=mini_menu_set_style_property
        //% block="set $kind item style for $this $property to $value"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% inlineInputMode=inline
        //% group="Styling"
        //% weight=50
        //% help=github:arcade-mini-menu/docs/set-style-property
        setStyleProperty(kind: StyleKind, property: StyleProperty, value: number) {
            switch (kind) {
                case StyleKind.Default:
                    this.defaultStyle.setProperty(property, value);
                    break;
                case StyleKind.Selected:
                    this.selectedStyle.setProperty(property, value);
                    break;
                case StyleKind.Title:
                    this.titleStyle.setProperty(property, value);
                    break;
                case StyleKind.DefaultAndSelected:
                    this.defaultStyle.setProperty(property, value);
                    this.selectedStyle.setProperty(property, value);
                    break;
                case StyleKind.All:
                    this.defaultStyle.setProperty(property, value);
                    this.selectedStyle.setProperty(property, value);
                    this.titleStyle.setProperty(property, value);
                    break;
            }

            this.updateDimensions();
        }

        /**
         * Sets a style property on a MenuSprite. See the help page for more info on what these properties mean.
         *
         * @param property The property to set the value of
         * @param value The value to set the property to
         */
        //% blockId=mini_menu_set_menu_style_property
        //% block="set menu style for $this $property to $value"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% inlineInputMode=inline
        //% group="Styling"
        //% weight=100
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/set-menu-style-property
        setMenuStyleProperty(property: MenuStyleProperty, value: number) {
            this.menuStyle.setMenuStyleProperty(property, value);

            if (property === MenuStyleProperty.UseAsTemplate) {
                if (value) {
                    this.menuStyle.copyTo(_state().menuStyle);
                    this.menuStyle = _state().menuStyle

                    this.defaultStyle.copyTo(_state().defaultStyle);
                    this.defaultStyle = _state().defaultStyle;

                    this.titleStyle.copyTo(_state().titleStyle);
                    this.titleStyle = _state().titleStyle;

                    this.selectedStyle.copyTo(_state().selectedStyle);
                    this.selectedStyle = _state().selectedStyle;
                }
                else {
                    this.defaultStyle = new Style(_state().defaultStyle)
                    this.titleStyle = new Style(_state().titleStyle)
                    this.selectedStyle = new Style(_state().selectedStyle)
                }
            }

            this.updateDimensions();
        }

        /**
         * Sets the title of the MenuSprite. The title is displayed above the menu can can be customized using the setStyleProperty function.
         *
         * @param title The title to set for the MenuSprite
         */
        //% blockId=mini_menu_set_menu_title
        //% block="set $this title to $title"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% title.defl="title"
        //% inlineInputMode=inline
        //% group="Create"
        //% weight=20
        //% help=github:arcade-mini-menu/docs/set-title
        setTitle(title: string) {
            this.title = new miniMenu.MenuItem(title, undefined);
            this.updateDimensions();
        }

        /**
         * Sets the width and height of the MenuSprite. If the width or height is too small to fit the menu's content, the menu will scroll.
         *
         * @param width The desired width of the MenuSprite or 0 for the content width
         * @param height The desired height of the MenuSprite or 0 for the content height
         */
        //% blockId=mini_menu_set_menu_dimensions
        //% block="set $this width $width height $height"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% width.defl=100
        //% height.defl=100
        //% inlineInputMode=inline
        //% group="Create"
        //% weight=30
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/set-dimensions
        setDimensions(width: number, height: number) {
            this.setMenuStyleProperty(MenuStyleProperty.Width, width);
            this.setMenuStyleProperty(MenuStyleProperty.Height, height);
        }

        /**
         * Sets the frame for the MenuSprite. The image must be square and have a width and height that are divisible by 3
         *
         * @param frame An image to use as the template for drawing the MenuSprite's frame
         */
        //% blockId=mini_menu_set_menu_frame
        //% block="set $this frame to $frame"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% frame.shadow=dialog_image_picker
        //% inlineInputMode=inline
        //% group="Styling"
        //% weight=100
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/set-frame
        setFrame(frame: Image) {
            if (!frame) {
                this.frame = frame;
                this.updateDimensions();
                return;
            }

            // For performance reasons, the frame image needs to be at least 12x12
            if (frame.width !== frame.height || Math.idiv(frame.width, 3) * 3 !== frame.width || frame.width < 12) {
                const newFrame = image.create(Math.max(frame.width, 12), Math.max(frame.width, 12));
                newFrame.drawTransparentImage(frame, 0, 0);
                frame = newFrame;
            }

            this.frame = frame;
            this.updateDimensions();
        }

        fireButtonEvent(button: controller.Button) {
            if (!this.buttonEventsEnabled || !this.items.length) return;

            for (const buttonHandler of this.buttonHandlers) {
                if (buttonHandler.button === button) {
                    buttonHandler.fire(this.items[this.selectedIndex].text, this.selectedIndex);
                    break;
                }
            }
        }

        onButtonEvent(button: controller.Button, handler: (text: string, selectedIndex: number) => void) {
            for (const buttonHandler of this.buttonHandlers) {
                if (buttonHandler.button === button) {
                    buttonHandler.handler = handler;
                    return;
                }
            }
            this.buttonHandlers.push(new ButtonHandler(button, handler));
        }

        _destroyCore() {
            super._destroyCore();
            _state().removeSprite(this);
        }

        updateDimensions() {
            super.setDimensions(this.getWidth(), this.getHeight());
        }

        protected drawSingleColumn(drawLeft: number, drawTop: number, menuWidth: number, menuHeight: number) {
            if (!this.items) return;

            let current: MenuItem;
            let currentHeight = 0;
            let style: Style;
            let isSelected: boolean;

            let offset = -(this.yScroll | 0);

            for (let i = 0; i < this.items.length; i++) {
                current = this.items[i];
                isSelected = this.selectedIndex === i
                style = isSelected ? this.selectedStyle : this.defaultStyle;
                currentHeight = current.getHeight(style);

                if (isSelected) {
                    if (offset < 0) this.targetYScroll = (offset + (this.yScroll | 0));
                    else if (offset > menuHeight - currentHeight) this.targetYScroll = offset + (this.yScroll | 0) + currentHeight - menuHeight;
                    else this.targetYScroll = this.yScroll

                    if (this.targetYScroll !== this.yScroll) {
                        this.scrollAnimationTick = 0;
                    }
                }


                if (offset < -currentHeight) {
                    offset += currentHeight;
                    continue;
                }

                if (offset < 0) {
                    current.drawTo(
                        drawLeft,
                        drawTop + offset,
                        screen,
                        style,
                        menuWidth,
                        currentHeight + offset,
                        true,
                        false,
                        isSelected ? this.scrollAnimationTick : 0,
                        this.width
                    )
                }
                else {
                    current.drawTo(
                        drawLeft,
                        drawTop + offset,
                        screen,
                        style,
                        menuWidth,
                        Math.min(currentHeight, menuHeight - offset),
                        false,
                        false,
                        isSelected ? this.scrollAnimationTick : 0,
                        this.width
                    )
                }

                offset += currentHeight;
            }

            this.maxScroll = offset + (this.yScroll | 0) - menuHeight;
        }

        protected drawSingleRow(drawLeft: number, drawTop: number, menuWidth: number, menuHeight: number) {
            if (!this.items) return;

            let current: MenuItem;
            let currentWidth = 0;
            let style: Style;
            let isSelected: boolean;

            let offset = -(this.xScroll | 0);

            for (let i = 0; i < this.items.length; i++) {
                current = this.items[i];
                isSelected = this.selectedIndex === i
                style = isSelected ? this.selectedStyle : this.defaultStyle;
                currentWidth = Math.min(current.getWidth(style), menuWidth);

                if (isSelected) {
                    if (offset < 0) this.targetXScroll = (offset + (this.xScroll | 0));
                    else if (offset > menuWidth - currentWidth) this.targetXScroll = offset + (this.xScroll | 0) + currentWidth - menuWidth;
                    else this.targetXScroll = this.xScroll

                    if (this.targetXScroll !== this.xScroll) {
                        this.scrollAnimationTick = 0;
                    }
                }

                if (offset < -currentWidth || offset >= menuWidth) {
                    offset += currentWidth;
                    continue;
                }

                if (offset < 0) {
                    current.drawTo(
                        drawLeft + offset,
                        drawTop,
                        screen,
                        style,
                        currentWidth + offset,
                        menuHeight,
                        false,
                        true,
                        isSelected ? this.scrollAnimationTick : 0,
                        currentWidth,
                        menuHeight
                    )
                }
                else {
                    current.drawTo(
                        drawLeft + offset,
                        drawTop,
                        screen,
                        style,
                        Math.min(currentWidth, menuWidth - offset),
                        menuHeight,
                        false,
                        false,
                        isSelected ? this.scrollAnimationTick : 0,
                        currentWidth,
                        menuHeight
                    )
                }

                offset += currentWidth;
            }

            this.maxScroll = offset + (this.xScroll | 0) - menuWidth;
        }

        drawGrid(drawLeft: number, drawTop: number, menuWidth: number, menuHeight: number) {
            if (!this.items) return;

            const menuTop = drawTop;
            const widthPerColumn = (menuWidth / Math.max(this.menuStyle.columns, 1)) | 0;
            const heightPerRow = (menuHeight / Math.max(this.menuStyle.rows, 1)) | 0;

            let index = 0;
            let current: MenuItem;
            let style: Style;
            let isSelected: boolean;

            let xOffset = -(this.xScroll | 0);
            let yOffset = -(this.yScroll | 0);

            const totalRows = Math.ceil(this.items.length / this.menuStyle.columns)

            for (let row = 0; row < totalRows; row++) {
                for (let col = 0; col < this.menuStyle.columns; col++) {
                    isSelected = index === this.selectedIndex;
                    style = isSelected ? this.selectedStyle : this.defaultStyle;
                    current = this.items[index];

                    if (!current) return;

                    if (isSelected) {
                        if (yOffset < 0) this.targetYScroll = (yOffset + (this.yScroll | 0));
                        else if (yOffset > menuHeight - heightPerRow) this.targetYScroll = yOffset + (this.yScroll | 0) + heightPerRow - menuHeight;
                        else this.targetYScroll = this.yScroll

                        if (xOffset < 0) this.targetXScroll = (xOffset + (this.xScroll | 0));
                        else if (xOffset > menuWidth - widthPerColumn) this.targetXScroll = xOffset + (this.xScroll | 0) + menuWidth - widthPerColumn;
                        else this.targetXScroll = this.xScroll
                    }

                    if (yOffset < 0) {
                        current.drawTo(
                            drawLeft + xOffset,
                            menuTop + yOffset,
                            screen,
                            style,
                            widthPerColumn,
                            heightPerRow + yOffset,
                            true,
                            false,
                            isSelected ? this.scrollAnimationTick : 0,
                            widthPerColumn,
                            heightPerRow
                        )
                    }
                    else {
                        current.drawTo(
                            drawLeft + xOffset,
                            menuTop + yOffset,
                            screen,
                            style,
                            widthPerColumn,
                            Math.min(heightPerRow, menuHeight - yOffset),
                            false,
                            false,
                            isSelected ? this.scrollAnimationTick : 0,
                            widthPerColumn,
                            heightPerRow
                        )
                    }

                    xOffset += widthPerColumn;
                    index++;
                }
                xOffset = -this.xScroll
                yOffset += heightPerRow;
            }

            this.maxScroll = yOffset + (this.yScroll | 0) - menuHeight;
        }

        protected getWidth() {
            if (this.menuStyle.customWidth !== undefined) return this.menuStyle.customWidth;

            let contentWidth = 0;
            let current: MenuItem;
            let style: Style;

            if (this.menuStyle.columns <= 1 && this.menuStyle.rows === 0) {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentWidth = Math.max(current.getWidth(style), contentWidth);
                }

            }
            else if (this.menuStyle.columns === 0 && this.menuStyle.rows === 1) {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentWidth += current.getWidth(style)
                }
            }
            else {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentWidth = Math.max(current.getWidth(style), contentWidth);
                }
                contentWidth *= this.menuStyle.columns;
            }

            return contentWidth +
                unpackMargin(this.menuStyle.border, MoveDirection.Left) +
                unpackMargin(this.menuStyle.border, MoveDirection.Right) +
                unpackMargin(this.menuStyle.padding, MoveDirection.Left) +
                unpackMargin(this.menuStyle.padding, MoveDirection.Right) +
                (this.frame ? (Math.idiv(this.frame.width, 3) << 1) : 0) +
                (this.menuStyle.scrollColor ? (this.isVerticalScroll() ? SCROLL_INDICATOR_WIDTH + 1 : 0) : 0)
        }

        protected getHeight() {
            if (this.menuStyle.customHeight !== undefined) return this.menuStyle.customHeight;

            let contentHeight = 0;
            let current: MenuItem;
            let style: Style;

            if (this.menuStyle.columns <= 1 && this.menuStyle.rows === 0) {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentHeight += current.getHeight(style)
                }

            }
            else if (this.menuStyle.columns === 0 && this.menuStyle.rows === 1) {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentHeight = Math.max(current.getHeight(style), contentHeight)
                }
            }
            else {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentHeight = Math.max(current.getHeight(style), contentHeight)
                }
                contentHeight *= this.menuStyle.rows;
            }

            return contentHeight +
                unpackMargin(this.menuStyle.border, MoveDirection.Up) +
                unpackMargin(this.menuStyle.border, MoveDirection.Down) +
                unpackMargin(this.menuStyle.padding, MoveDirection.Up) +
                unpackMargin(this.menuStyle.padding, MoveDirection.Down) +
                (this.frame ? (Math.idiv(this.frame.width, 3) << 1) : 0) +
                (this.menuStyle.scrollColor ? (this.isVerticalScroll() ? 0 : SCROLL_INDICATOR_WIDTH + 1) : 0)
        }

        protected isVerticalScroll() {
            return !(this.menuStyle.columns === 0 && this.menuStyle.rows === 1);
        }
    }


    function fillRegion(target: Image, left: number, top: number, right: number, bottom: number, color: number) {
        if (!color) return;
        target.fillRect(left, top, right - left, bottom - top, color);
    }

    export function drawImageInRect(target: Image, src: Image, left: number, top: number, right: number, bottom: number, cutLeft: boolean, cutTop: boolean) {
        const width = Math.min(right - left, src.width);
        const height = Math.min(bottom - top, src.height);

        if (width <= 0 || height <= 0) return;

        if (printCanvas.width < src.width || printCanvas.height < src.height) {
            printCanvas = image.create(Math.max(printCanvas.width, src.width), Math.max(printCanvas.height, src.height));
        }
        else {
            printCanvas.fill(0);
        }

        if (cutLeft) {
            if (cutTop) {
                printCanvas.drawTransparentImage(
                    src,
                    width - src.width,
                    height - src.height,
                );
                target.drawTransparentImage(
                    printCanvas,
                    left,
                    top
                );
            }
            else {
                printCanvas.drawTransparentImage(
                    src,
                    width - src.width,
                    printCanvas.height - height,
                );
                target.drawTransparentImage(
                    printCanvas,
                    left,
                    top + height - printCanvas.height
                );
            }
        }
        else {
            if (cutTop) {
                printCanvas.drawTransparentImage(
                    src,
                    printCanvas.width - width,
                    height - src.height,
                );
                target.drawTransparentImage(
                    printCanvas,
                    left + width - printCanvas.width,
                    top
                );
            }
            else {
                printCanvas.drawTransparentImage(
                    src,
                    printCanvas.width - width,
                    printCanvas.height - height,
                );
                target.drawTransparentImage(
                    printCanvas,
                    left + width - printCanvas.width,
                    top + height - printCanvas.height
                );
            }
        }
    }

    export function printTextInRect(target: Image, text: string, left: number, top: number, right: number, bottom: number, color: number, cutLeft: boolean, cutTop: boolean, font: image.Font) {
        const width = right - left;
        const height = bottom - top;

        const textWidth = text.length * font.charWidth;

        if (textWidth <= width && font.charHeight <= height) {
            target.print(text, left, top, color, font);
            return;
        }

        const printableCharacters = Math.idiv(width, font.charWidth)

        // Optimize to print as many of the characters in one go as possible
        if (font.charHeight <= height) {
            const offset = width - printableCharacters * font.charWidth;

            printCanvas.fill(0)
            if (cutLeft) {
                target.print(text.substr(text.length - printableCharacters), right - printableCharacters * font.charWidth, top, color, font);
                printCanvas.print(text.charAt(text.length - printableCharacters - 1), -(font.charWidth - offset), 0, color, font);
                target.drawTransparentImage(printCanvas, left, top);
            }
            else {
                target.print(text.substr(0, printableCharacters), left, top, color, font)
                printCanvas.print(text.charAt(printableCharacters), printCanvas.width - offset, 0, color, font);
                target.drawTransparentImage(printCanvas, left + width - printCanvas.width, top);
            }

            return;
        }

        const offset = width - printableCharacters * font.charWidth;

        printCanvas.fill(0)
        const canvasCharacters = Math.idiv(printCanvas.width, font.charWidth);

        if (cutLeft) {
            if (cutTop) {
                for (let i = 0; i < printableCharacters; i += canvasCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.substr(text.length - printableCharacters + i, Math.min(canvasCharacters, printableCharacters - i)),
                        0,
                        height - font.charHeight,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left + i * font.charWidth + offset, top);
                }

                if (text.length > printableCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.charAt(text.length - printableCharacters - 1),
                        -(font.charWidth - offset),
                        height - font.charHeight,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left, top)
                }
            }
            else {
                for (let i = 0; i < printableCharacters; i += canvasCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.substr(text.length - printableCharacters + i, Math.min(canvasCharacters, printableCharacters - i)),
                        0,
                        printCanvas.height - height,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left + i * font.charWidth + offset, top - printCanvas.height + height);
                }

                if (text.length > printableCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.charAt(text.length - printableCharacters - 1),
                        -(font.charWidth - offset),
                        printCanvas.height - height,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left, top - printCanvas.height + height)
                }
            }
        }
        else {
            if (cutTop) {
                for (let i = 0; i < printableCharacters; i += canvasCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.substr(i, Math.min(canvasCharacters, printableCharacters - i)),
                        0,
                        height - font.charHeight,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left + i * font.charWidth, top);
                }

                if (text.length > printableCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.charAt(printableCharacters),
                        printCanvas.width - offset,
                        height - font.charHeight,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left + width - printCanvas.width, top)
                }
            }
            else {
                for (let i = 0; i < printableCharacters; i += canvasCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.substr(i, Math.min(canvasCharacters, printableCharacters - i)),
                        0,
                        printCanvas.height - height,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left + i * font.charWidth, top - printCanvas.height + height);
                }

                if (text.length > printableCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        text.charAt(printableCharacters),
                        printCanvas.width - offset,
                        printCanvas.height - height,
                        color,
                        font
                    );
                    target.drawTransparentImage(printCanvas, left + width - printCanvas.width, top - printCanvas.height + height)
                }
            }
        }
    }

    export function printScrolledText(target: Image, text: string, left: number, top: number, right: number, bottom: number, color: number, scroll: number, font: image.Font) {
        const startCharacter = Math.idiv(scroll, font.charWidth);
        const visibleCharacters = Math.ceil((right - left) / font.charWidth);

        if (visibleCharacters < 1) return;

        printCanvas.fill(0);
        printCanvas.print(
            text.charAt(startCharacter),
            -(scroll % font.charWidth),
            0,
            color,
            font
        );
        target.drawTransparentImage(printCanvas, left, top);

        target.print(
            text.substr(startCharacter + 1, visibleCharacters - 2),
            left + font.charWidth - (scroll % font.charWidth),
            top,
            color,
            font
        );

        const charLeft = left - scroll + (startCharacter + visibleCharacters - 1) * font.charWidth;

        printCanvas.fill(0);
        printCanvas.print(
            text.charAt(startCharacter + visibleCharacters - 1),
            printCanvas.width - (right - charLeft),
            0,
            color,
            font
        );
        target.drawTransparentImage(
            printCanvas,
            right - printCanvas.width,
            top
        )
    }

    export function drawFrame(target: Image, frame: Image, left: number, top: number, right: number, bottom: number) {
        const frameWidth = Math.idiv(frame.width, 3);

        if (!frameCanvas || frameCanvas.width !== frameWidth) frameCanvas = image.create(frameWidth, frameWidth);

        // top left
        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, 0, 0);
        target.drawTransparentImage(frameCanvas, left, top);

        // top right
        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, -(frameWidth << 1), 0);
        target.drawTransparentImage(frameCanvas, right - frameWidth, top);

        // bottom left
        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, 0, -(frameWidth << 1));
        target.drawTransparentImage(frameCanvas, left, bottom - frameWidth);

        // bottom right
        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, -(frameWidth << 1), -(frameWidth << 1));
        target.drawTransparentImage(frameCanvas, right - frameWidth, bottom - frameWidth);

        // left side
        let visibleSegments = Math.ceil(((bottom - frameWidth) - (top + frameWidth)) / frameWidth);
        let cutoff = visibleSegments * frameWidth - ((bottom - frameWidth) - (top + frameWidth));

        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, 0, -frameWidth);

        for (let i = 0; i < visibleSegments - 1; i++) {
            target.drawTransparentImage(frameCanvas, left, top + frameWidth + (frameWidth * i));
        }

        frameCanvas.fillRect(0, frameWidth - cutoff, frameWidth, frameWidth, 0);
        target.drawTransparentImage(frameCanvas, left, top + frameWidth * visibleSegments);

        // right side
        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, -(frameWidth << 1), -frameWidth);

        for (let i = 0; i < visibleSegments - 1; i++) {
            target.drawTransparentImage(frameCanvas, right - frameWidth, top + frameWidth + (frameWidth * i));
        }

        frameCanvas.fillRect(0, frameWidth - cutoff, frameWidth, frameWidth, 0);
        target.drawTransparentImage(frameCanvas, right - frameWidth, top + frameWidth * visibleSegments);

        // top side
        visibleSegments = Math.ceil(((right - frameWidth) - (left + frameWidth)) / frameWidth);
        cutoff = visibleSegments * frameWidth - ((right - frameWidth) - (left + frameWidth));

        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, -frameWidth, 0);

        for (let i = 0; i < visibleSegments - 1; i++) {
            target.drawTransparentImage(frameCanvas, left + frameWidth + (frameWidth * i), top);
        }

        frameCanvas.fillRect(frameWidth - cutoff, 0, frameWidth, frameWidth, 0);
        target.drawTransparentImage(frameCanvas, left + frameWidth * visibleSegments, top);

        // bottom side
        frameCanvas.fill(0);
        frameCanvas.drawTransparentImage(frame, -frameWidth, -(frameWidth << 1));

        for (let i = 0; i < visibleSegments - 1; i++) {
            target.drawTransparentImage(frameCanvas, left + frameWidth + (frameWidth * i), bottom - frameWidth);
        }

        frameCanvas.fillRect(frameWidth - cutoff, 0, frameWidth, frameWidth, 0);
        target.drawTransparentImage(frameCanvas, left + frameWidth * visibleSegments, bottom - frameWidth);

    }

    export function unpackMargin(margin: number, direction: MoveDirection) {
        if (margin < 0xff) {
            return margin;
        }

        switch (direction) {
            case MoveDirection.Up:
                return (margin & 0xff) - 1
            case MoveDirection.Right:
                return ((margin >> 8) & 0xff) - 1
            case MoveDirection.Down:
                return ((margin >> 16) & 0xff) - 1
            case MoveDirection.Left:
                return ((margin >> 24) & 0xff) - 1
        }

        return margin;
    }

    export function packMargin(left: number, top: number, right: number, bottom: number) {
        return ((top + 1) & 0xff) | (((right + 1) & 0xff) << 8) | (((bottom + 1) & 0xff) << 16) | (((left + 1) & 0xff) << 24)
    }

    export function drawScrollIndicator(target: Image, top: number, left: number, direction: MoveDirection, color: number) {
        const offset = 4 - Math.idiv(game.runtime() % 1000, 250);

        for (let i = 0; i < 4; i++) {
            if (direction === MoveDirection.Up) {
                target.fillRect(left + (3 - i), top + i + offset, 1 + (i << 1), 1, color)
            }
            else if (direction === MoveDirection.Down) {
                target.fillRect(left + i, top + i - offset, 7 - (i << 1), 1, color)
            }
            else if (direction === MoveDirection.Left) {
                target.fillRect(left + i + offset, top + (3 - i), 1, 1 + (i << 1), color)
            }
            else {
                target.fillRect(left + i - offset, top + i, 1, 7 - (i << 1), color)
            }
        }
    }

    function buttonEventsEnabled(sprite: Sprite) {
        return !!((sprite as MenuSprite).buttonEventsEnabled)
    }
}
