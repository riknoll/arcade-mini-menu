namespace SpriteKind {
    //% isKind
    export const MiniMenu = SpriteKind.create();
}

//% icon="\uf0c9"
//% color="#36b58b"
//% block="Mini Menu"
namespace miniMenu {
    let stateStack: MiniMenuState[];
    let printCanvas: Image;

    class MiniMenuState {
        defaultStyle: Style;
        selectedStyle: Style;

        constructor() {
            this.defaultStyle = new Style();

            this.defaultStyle.iconPadding = 8;
            this.defaultStyle.padding = 2;
            this.defaultStyle.foreground = 15;
            this.defaultStyle.background = 1;

            this.selectedStyle = this.defaultStyle.clone();
            this.selectedStyle.foreground = 1;
            this.selectedStyle.background = 3;

            for (const button of [controller.up, controller.right, controller.down, controller.menu, controller.left, controller.A, controller.B]) {
                button.addEventListener(ControllerButtonEvent.Pressed, () => {
                    for (const sprite of sprites.allOfKind(SpriteKind.MiniMenu)) {
                        (sprite as MenuSprite).fireButtonEvent(button);
                    }
                })
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
        //% block="border width"
        BorderWidth,
        //% block="border radius"
        BorderRadius,
        //% block="vertical margin"
        VerticalMargin,
        //% block="horizontal margin"
        HorizontalMargin,
        //% block="icon padding"
        IconPadding,
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
        //% block="border color"
        BorderColor,
        //% block="border width"
        BorderWidth,
        //% block="scroll speed"
        ScrollSpeed,
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
        Down
    }

    export class Style {
        padding: number;
        foreground: number;
        background: number;
        borderColor: number;
        borderWidth: number;
        borderRadius: number;
        verticalMargin: number;
        horizontalMargin: number;
        iconPadding: number;
        iconOnly: number;
        alignment: Alignment;

        constructor() {
            this.padding = 0;
            this.foreground = 1;
            this.background = 15;
            this.borderColor = 1;
            this.borderWidth = 0;
            this.borderRadius = 0;
            this.verticalMargin = 0;
            this.horizontalMargin = 0;
            this.iconPadding = 0;
            this.iconOnly = 0;
            this.alignment = Alignment.Left
        }

        clone() {
            const res = new Style();
            res.padding = this.padding;
            res.foreground = this.foreground;
            res.background = this.background;
            res.borderColor = this.borderColor;
            res.borderWidth = this.borderWidth;
            res.borderRadius = this.borderRadius;
            res.verticalMargin = this.verticalMargin;
            res.horizontalMargin = this.horizontalMargin;
            res.iconPadding = this.iconPadding;
            res.alignment = this.alignment;
            return res;
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
                case StyleProperty.BorderWidth:
                    this.borderWidth = value;
                    break;
                case StyleProperty.BorderRadius:
                    this.borderRadius = value;
                    break;
                case StyleProperty.VerticalMargin:
                    this.verticalMargin = value;
                    break;
                case StyleProperty.HorizontalMargin:
                    this.horizontalMargin = value;
                    break;
                case StyleProperty.IconPadding:
                    this.iconPadding = value;
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
        contentHeight: number;
        contentWidth: number;
        font: image.Font;

        constructor(public text: string, public icon: Image) {
            this.font = image.getFontForText(text);
            this.font.charHeight = image.getFontForText(text).charHeight;
            this.font.charWidth = image.getFontForText(text).charWidth;

            this.contentHeight = Math.max(
                this.font.charHeight,
                icon ? icon.height : 0
            )

            this.contentWidth = image.getFontForText(text).charWidth * text.length;
            if (icon) {
                this.contentWidth += icon.width;
            }
        }

        getHeight(style: Style) {
            return this.contentHeight + (style.padding << 1) + (style.verticalMargin << 1) + (style.borderWidth << 1);
        }

        getWidth(style: Style) {
            if (style.iconOnly) {
                return (this.icon ? this.icon.width : 0) + (style.padding << 1) + (style.horizontalMargin << 1) + (style.borderWidth << 1)
            }
            return this.contentWidth + (style.padding << 1) + (style.horizontalMargin << 1) + (style.borderWidth << 1) + (this.icon ? style.iconPadding : 0);
        }

        drawTo(left: number, top: number, target: Image, style: Style, width: number, height: number, cutTop: boolean, scrollTick: number) {
            if (height <= 0) return;

            const backgroundWidth = width - (style.horizontalMargin << 1) - (style.borderWidth << 1);

            const iconOnly = !!style.iconOnly;

            let textTop: number;
            let availableTextHeight: number;
            let iconTop: number;
            let availableIconHeight: number;

            const maxHeight = this.getHeight(style);

            if (cutTop) {
                const cutoffHeight = this.getHeight(style) - height;

                if (style.borderWidth) {
                    fillVerticalRegion(
                        target,
                        left + style.horizontalMargin,
                        Math.max(top + style.verticalMargin, top + cutoffHeight),
                        width - (style.horizontalMargin << 1),
                        top + style.verticalMargin + maxHeight - (style.verticalMargin << 1),
                        style.borderColor
                    );
                }

                fillVerticalRegion(
                    target,
                    left + style.horizontalMargin + style.borderWidth,
                    Math.max(top + style.verticalMargin + style.borderWidth, top + cutoffHeight),
                    backgroundWidth,
                    top + style.verticalMargin + style.borderWidth + maxHeight - (style.verticalMargin << 1) - (style.borderWidth << 1),
                    style.background
                );

                textTop = Math.max(top + (maxHeight >> 1) - (this.font.charHeight >> 1), top + cutoffHeight);
                const textBottom = Math.max(top + (maxHeight >> 1) + (this.font.charHeight >> 1), top + cutoffHeight)

                availableTextHeight = textBottom - textTop;

                if (this.icon) {
                    iconTop = Math.max(top + (maxHeight >> 1) - (this.icon.height >> 1), top + cutoffHeight);
                    const iconBottom = Math.max(top + (maxHeight >> 1) + (this.icon.height >> 1), top + cutoffHeight)

                    availableIconHeight = iconBottom - iconTop;
                }
            }
            else {
                if (style.borderWidth) {
                    fillVerticalRegion(
                        target,
                        left + style.horizontalMargin,
                        top + style.verticalMargin,
                        width - (style.horizontalMargin << 1),
                        Math.min(top + maxHeight - (style.verticalMargin << 1), top + height),
                        style.borderColor
                    )
                }

                fillVerticalRegion(
                    target,
                    left + style.horizontalMargin + style.borderWidth,
                    top + style.verticalMargin + style.borderWidth,
                    backgroundWidth,
                    Math.min(top - style.verticalMargin - style.borderWidth + maxHeight, top + height),
                    style.background
                )

                textTop = top + (maxHeight >> 1) - (this.font.charHeight >> 1);
                const textBottom = Math.min(top + (maxHeight >> 1) + (this.font.charHeight >> 1), top + height)
                availableTextHeight = textBottom - textTop;

                if (this.icon) {
                    iconTop = top + (maxHeight >> 1) - (this.icon.height >> 1);
                    const iconBottom = Math.min(top + (maxHeight >> 1) + (this.icon.height >> 1), top + height)
                    availableIconHeight = iconBottom - iconTop;
                }
            }

            const widthOfText = this.text.length * this.font.charWidth;
            let availableTextWidth = backgroundWidth - (style.padding << 1);
            let textAreaLeft = left + style.horizontalMargin + style.padding + style.borderWidth;

            if (this.icon) {
                if (iconOnly) {

                    if (style.alignment === Alignment.Left) {
                        this.drawPartialIcon(target, availableIconHeight, textAreaLeft, iconTop, this.icon.width, cutTop)
                    }
                    else if (style.alignment === Alignment.Right) {
                        this.drawPartialIcon(
                            target,
                            availableIconHeight,
                            textAreaLeft + availableTextWidth - this.icon.width,
                            iconTop,
                            this.icon.width,
                            cutTop
                        );
                    }
                    else {
                        this.drawPartialIcon(
                            target,
                            availableIconHeight,
                            textAreaLeft + (availableTextWidth >> 1) - (this.icon.width >> 1),
                            iconTop,
                            this.icon.width,
                            cutTop
                        );
                    }
                }
                else {
                    this.drawPartialIcon(target, availableIconHeight, textAreaLeft, iconTop, this.icon.width, cutTop)
                }

                availableTextWidth -= this.icon.width + style.iconPadding;
                textAreaLeft += this.icon.width + style.iconPadding
            }

            if (iconOnly) return;

            if (style.alignment === Alignment.Left || widthOfText >= availableTextWidth) {
                if (widthOfText <= availableTextWidth) {
                    this.printPartialText(
                        target,
                        availableTextHeight,
                        textAreaLeft,
                        textTop,
                        availableTextWidth,
                        style.foreground,
                        cutTop
                    );
                }
                else {
                    if (scrollTick) {
                        const maxScroll = widthOfText - availableTextWidth + this.font.charWidth;
                        const animationLength = (100 + maxScroll + 100) << 2;

                        scrollTick = scrollTick % animationLength;

                        this.printScrolled(
                            target,
                            Math.min(Math.max((scrollTick - 100) >> 2, 0), maxScroll),
                            textAreaLeft,
                            textTop,
                            availableTextWidth,
                            style.foreground,
                        )
                    }
                    else {
                        this.printPartialText(
                            target,
                            availableTextHeight,
                            textAreaLeft,
                            textTop,
                            availableTextWidth - this.font.charWidth,
                            style.foreground,
                            cutTop
                        );

                        if (availableTextHeight >= this.font.charHeight || (cutTop && availableTextHeight > 1)) {
                            // draw ellipsis
                            target.setPixel(
                                textAreaLeft + availableTextWidth - this.font.charWidth + 1,
                                textTop + availableTextHeight - 2,
                                style.foreground
                            )
                            target.setPixel(
                                textAreaLeft + availableTextWidth - this.font.charWidth + 3,
                                textTop + availableTextHeight - 2,
                                style.foreground
                            )
                            target.setPixel(
                                textAreaLeft + availableTextWidth - this.font.charWidth + 5,
                                textTop + availableTextHeight - 2,
                                style.foreground
                            )
                        }
                    }
                }
            }
            else {
                let drawLeft: number;

                if (style.alignment === Alignment.Right) {
                    drawLeft = textAreaLeft + availableTextWidth - widthOfText
                }
                else {
                    drawLeft = textAreaLeft + (availableTextWidth >> 1) - (widthOfText >> 1)
                }

                if (this.icon) {
                    target.drawTransparentImage(
                        this.icon,
                        drawLeft,
                        textTop + (this.contentHeight >> 1) - (this.icon.height >> 1)
                    )
                    this.printPartialText(
                        target,
                        availableTextHeight,
                        drawLeft,
                        textTop + (this.contentHeight >> 1) - (this.font.charHeight >> 1),
                        backgroundWidth - (style.padding << 1),
                        style.foreground,
                        cutTop
                    );
                }
                else {
                    this.printPartialText(
                        target,
                        availableTextHeight,
                        drawLeft,
                        textTop,
                        backgroundWidth - (style.padding << 1),
                        style.foreground,
                        cutTop
                    );
                }
            }
        }

        protected printScrolled(target: Image, scroll: number, left: number, top: number, width: number, color: number) {
            const startCharacter = Math.idiv(scroll, this.font.charWidth);
            const offset = scroll % this.font.charWidth;
            const lastCharacter = startCharacter + Math.floor(width / this.font.charWidth);

            // Print the non-partial text first
            target.print(
                this.text.substr(startCharacter + 1, lastCharacter - startCharacter - 1),
                left + this.font.charWidth - offset,
                top,
                color,
                this.font
            );

            printCanvas.fill(0);
            printCanvas.print(
                this.text.charAt(startCharacter),
                -offset,
                0,
                color
            )
            target.drawTransparentImage(printCanvas, left, top);

            printCanvas.fill(0);
            printCanvas.print(
                this.text.charAt(lastCharacter),
                printCanvas.width - (this.font.charWidth - ((lastCharacter - startCharacter + 1) * this.font.charWidth - width)) - offset,
                0,
                color,
                this.font
            )
            target.drawTransparentImage(printCanvas, left + width - printCanvas.width, top);
        }

        protected printPartialText(target: Image, height: number, left: number, top: number, width: number, color: number, cutTop: boolean) {
            const printableCharacters = Math.idiv(width, this.font.charWidth);

            if (height <= 0) return
            else if (height >= this.font.charHeight) {
                target.print(this.text.substr(0, printableCharacters), left, top, color, this.font);
                return;
            }

            const canvasCharacters = Math.idiv(printCanvas.width, this.font.charWidth);
            if (cutTop) {
                for (let i = 0; i < printableCharacters; i += canvasCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        this.text.substr(i, Math.min(canvasCharacters, printableCharacters - i)),
                        0,
                        height - this.font.charHeight,
                        color,
                        this.font
                    );
                    target.drawTransparentImage(printCanvas, left + i * this.font.charWidth, top);
                }
            }
            else {
                for (let i = 0; i < printableCharacters; i += canvasCharacters) {
                    printCanvas.fill(0);
                    printCanvas.print(
                        this.text.substr(i, Math.min(canvasCharacters, printableCharacters - i)),
                        0,
                        printCanvas.height - height,
                        color,
                        this.font
                    );
                    target.drawTransparentImage(printCanvas, left + i * this.font.charWidth, top - printCanvas.height + height);
                }
            }
        }

        protected drawPartialIcon(target: Image, height: number, left: number, top: number, width: number, cutTop: boolean) {
            if (height <= 0) return
            else if (height >= this.icon.height) {
                target.drawTransparentImage(this.icon, left, top);
                return;
            }

            if (printCanvas.height < height) {
                printCanvas = image.create(printCanvas.width, height)
            }

            if (cutTop) {
                for (let x = 0; x < this.icon.width; x += printCanvas.width) {
                    printCanvas.fill(0);
                    printCanvas.drawTransparentImage(this.icon, -x, height - this.icon.height)
                    target.drawTransparentImage(printCanvas, left + x, top);
                }
            }
            else {
                for (let x = 0; x < this.icon.width; x += printCanvas.width) {
                    printCanvas.fill(0);
                    printCanvas.drawTransparentImage(this.icon, -x, printCanvas.height - height)
                    target.drawTransparentImage(printCanvas, left + x, top - (printCanvas.height - height));
                }
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

    export class MenuSprite extends sprites.ExtendableSprite {
        items: MenuItem[];

        titleStyle: Style;
        defaultStyle: Style;
        selectedStyle: Style;

        customWidth: number;
        customHeight: number;
        selectedIndex: number;
        buttonEventsEnabled: boolean;

        scroll: number;
        targetScroll: number;

        scrollAnimationTick: number;
        titleAnimationTick: number;

        title: MenuItem;
        scrollSpeed: number;

        protected buttonHandlers: any;

        constructor() {
            super(img`.`, SpriteKind.MiniMenu);
            _init();
            this.titleStyle = _state().defaultStyle.clone()
            this.titleStyle.setProperty(StyleProperty.Background, 0)
            this.defaultStyle = _state().defaultStyle.clone();
            this.selectedStyle = _state().selectedStyle.clone();

            this.selectedIndex = 0;
            this.items = [];

            this.buttonHandlers = {};
            this.buttonEventsEnabled = false;

            this.onButtonEvent(controller.up, () => this.moveSelection(MoveDirection.Up));
            this.onButtonEvent(controller.down, () => this.moveSelection(MoveDirection.Down));
            this.scroll = 0;
            this.scrollAnimationTick = -1;
            this.titleAnimationTick = 0;
            this.scrollSpeed = 150;
        }

        get width(): number {
            return this.getWidth();
        }

        get height(): number {
            return this.getHeight();
        }

        draw(drawLeft: number, drawTop: number) {
            if (!this.items) return;

            const width = this.getWidth();

            let current: MenuItem;
            let currentHeight = 0;
            let style: Style;
            let isSelected: boolean;

            const height = this.getHeight();

            if (this.title) {
                currentHeight = this.title.getHeight(this.titleStyle);
                this.title.drawTo(
                    drawLeft,
                    drawTop,
                    screen,
                    this.titleStyle,
                    width,
                    currentHeight,
                    true,
                    this.titleAnimationTick
                )
            }

            let offset = -(this.scroll | 0);
            const menuTop = drawTop + currentHeight;
            const menuHeight = height - currentHeight;

            for (let i = 0; i < this.items.length; i++) {
                current = this.items[i];
                isSelected = this.selectedIndex === i
                style = isSelected ? this.selectedStyle : this.defaultStyle;
                currentHeight = current.getHeight(style);

                if (isSelected) {
                    if (offset < 0) this.targetScroll = (offset + (this.scroll | 0));
                    else if (offset > menuHeight - currentHeight) this.targetScroll = offset + (this.scroll | 0) + currentHeight - menuHeight;
                    else this.targetScroll = this.scroll
                }


                if (offset < -currentHeight) {
                    offset += currentHeight;
                    continue;
                }

                if (offset < 0) {
                    current.drawTo(
                        drawLeft,
                        menuTop + offset,
                        screen,
                        style,
                        width,
                        currentHeight + offset,
                        true,
                        isSelected ? this.scrollAnimationTick : 0
                    )
                }
                else {
                    current.drawTo(
                        drawLeft,
                        menuTop + offset,
                        screen,
                        style,
                        width,
                        Math.min(currentHeight, menuHeight - offset),
                        false,
                        isSelected ? this.scrollAnimationTick : 0
                    )
                }

                offset += currentHeight;
            }
        }

        update(deltaTimeMillis: number) {
            if (this.scroll < this.targetScroll) this.scroll += 1;
            else if (this.scroll > this.targetScroll) this.scroll -= 1;

            const deltaTick = (deltaTimeMillis / 1000) * this.scrollSpeed;

            if (this.scroll === this.targetScroll) {
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
        }

        //% blockId=mini_menu_sprite_set_button_events_enabled
        //% block="$this set button events enabled $enabled"
        //% this.defl=myMenu
        //% enable.shadow=toggleOnOff
        setButtonEventsEnabled(enabled: boolean) {
            this.buttonEventsEnabled = enabled;
        }

        //% blockId=mini_menu_sprite_move_selection_up
        //% block="$this move selection $direction"
        //% this.defl=myMenu
        //% direction.shadow=mini_menu_move_direction
        moveSelection(direction: number) {
            if (this.items.length === 0) return;
            if (direction === MoveDirection.Up) {
                this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
            }
            else {
                this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
            }
            this.scrollAnimationTick = 0
        }

        //% blockId=mini_menu_sprite_close_menu
        //% block="close $this"
        //% this.defl=myMenu
        close() {
            this.destroy();
        }

        fireButtonEvent(button: controller.Button) {
            if (!this.buttonEventsEnabled) return;

            const handler = this.buttonHandlers[button.id];

            if (handler && this.items.length) {
                handler(this.items[this.selectedIndex].text);
            }
        }

        onButtonEvent(button: controller.Button, handler: (text: string) => void) {
            this.buttonHandlers[button.id] = handler;
        }

        setProperty(style: MenuStyleProperty, value: number) {
            switch (style) {
                case MenuStyleProperty.Width:
                    this.customWidth = value;
                    break;
                case MenuStyleProperty.Height:
                    this.customHeight = value;
                    break;
                case MenuStyleProperty.ScrollSpeed:
                    this.scrollSpeed = value;
                    break;
            }
        }

        protected getWidth() {
            if (this.customWidth !== undefined) return this.customWidth;

            let max = 0;

            let current: MenuItem;
            let style: Style;

            for (let i = 0; i < this.items.length; i++) {
                current = this.items[i];
                style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                max = Math.max(current.getWidth(style), max);
            }

            return max;
        }

        protected getHeight() {
            if (this.customHeight !== undefined) return this.customHeight;

            let sum = 0;

            let current: MenuItem;
            let style: Style;

            for (let i = 0; i < this.items.length; i++) {
                current = this.items[i];
                style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                sum += current.getHeight(style)
            }

            return sum;
        }
    }

    function fillVerticalRegion(target: Image, left: number, top: number, width: number, bottom: number, color: number) {
        if (!color) return;
        target.fillRect(left, top, width, bottom - top, color);
    }
}

// const m = new miniMenu.MenuSprite();
// m.setButtonEventsEnabled(true)

// m.setMenuItems([
//     miniMenu.createMenuItem("Hello", img`
//         . . . . . . . e c 7 . . . . . .
//         . . . . e e e c 7 7 e e . . . .
//         . . c e e e e c 7 e 2 2 e e . .
//         . c e e e e e c 6 e e 2 2 2 e .
//         . c e e e 2 e c c 2 4 5 4 2 e .
//         c e e e 2 2 2 2 2 2 4 5 5 2 2 e
//         c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
//         . e e e 2 2 2 2 2 2 2 2 2 4 e .
//         . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
//         . . 2 e e 2 2 2 2 2 4 4 2 e . .
//         . . . 2 2 e e 4 4 4 2 e e . . .
//         . . . . . 2 2 e e e e . . . . .
//     `),
//     miniMenu.createMenuItem("Goodbye"),
//     miniMenu.createMenuItem("I am well today")
// ])

// m.setFlag(SpriteFlag.StayInScreen, true);
// m.setFlag(SpriteFlag.BounceOnWall, true);
// m.vx = 10;
// m.vy = 10;