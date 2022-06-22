namespace SpriteKind {
    //% isKind
    export const MiniMenu = SpriteKind.create();
}

namespace miniMenu {
    let stateStack: MiniMenuState[];
    let printCanvas: Image;
    let frameCanvas: Image;

    class MiniMenuState {
        defaultStyle: Style;
        selectedStyle: Style;

        constructor() {
            this.defaultStyle = new Style();

            this.defaultStyle.iconTextSpacing = 8;
            this.defaultStyle.padding = 2;
            this.defaultStyle.foreground = 15;
            this.defaultStyle.background = 1;

            this.selectedStyle = this.defaultStyle.clone();
            this.selectedStyle.foreground = 1;
            this.selectedStyle.background = 3;

            for (const button of [controller.up, controller.right, controller.down, controller.menu, controller.left, controller.A, controller.B]) {
                button.addEventListener(ControllerButtonEvent.Pressed, () => {
                    for (const sprite of sprites.allOfKind(SpriteKind.MiniMenu).filter(buttonEventsEnabled)) {
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
        Columns
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

    export class Style {
        padding: number;
        foreground: number;
        background: number;
        borderColor: number;
        border: number;
        margin: number;
        iconTextSpacing: number;
        iconOnly: number;
        alignment: Alignment;

        constructor() {
            this.padding = 0;
            this.foreground = 1;
            this.background = 15;
            this.borderColor = 1;
            this.border = 0;
            this.margin = 0;
            this.iconTextSpacing = 0;
            this.iconOnly = 0;
            this.alignment = Alignment.Left
        }

        clone() {
            const res = new Style();
            res.padding = this.padding;
            res.foreground = this.foreground;
            res.background = this.background;
            res.borderColor = this.borderColor;
            res.border = this.border;
            res.margin = this.margin;
            res.margin = this.margin;
            res.iconTextSpacing = this.iconTextSpacing;
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

            if (style.iconOnly) {
                return (this.icon ? this.icon.height : 0) + allPadding
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
            
            if (style.iconOnly) {
                return (this.icon ? this.icon.width : 0) + allPadding
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
                const maxScroll = widthOfText - (textRight - textLeft);
                const animationLength = (100 + maxScroll + 100) << 2;

                scrollTick = scrollTick % animationLength;

                printScrolledText(
                    target,
                    this.text,
                    textLeft,
                    textTop,
                    textRight,
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

    export class MenuSprite extends sprites.ExtendableSprite {
        items: MenuItem[];

        titleStyle: Style;
        defaultStyle: Style;
        selectedStyle: Style;

        customWidth: number;
        customHeight: number;
        selectedIndex: number;
        buttonEventsEnabled: boolean;

        yScroll: number;
        targetYScroll: number;
        xScroll: number;
        targetXScroll: number;

        scrollAnimationTick: number;
        titleAnimationTick: number;

        title: MenuItem;
        scrollSpeed: number;
        columns: number;
        rows: number;

        border: number;
        borderColor: number;
        padding: number;
        backgroundColor: number;

        infiniteScroll: boolean;
        frame: Image;

        protected buttonHandlers: any;
        protected itemSelectedHandler: (value: string, selectedIndex: number) => void;

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
            this.onButtonEvent(controller.left, () => this.moveSelection(MoveDirection.Left));
            this.onButtonEvent(controller.right, () => this.moveSelection(MoveDirection.Right));
            this.yScroll = 0;
            this.targetYScroll = 0;
            this.xScroll = 0;
            this.targetXScroll = 0;
            this.scrollAnimationTick = -1;
            this.titleAnimationTick = 0;
            this.scrollSpeed = 150;
            this.columns = 0;
            this.rows = 0;
            this.backgroundColor = 0;
            this.border = 0;
            this.padding = 0;
            this.borderColor = 0;
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
            const height = this.getHeight();
            let titleHeight = 0
            let frameWidth = this.frame ? (this.frame.width / 3) | 0 : 0;

            if (this.frame) {
                drawFrame(
                    screen,
                    this.frame,
                    drawLeft,
                    drawTop,
                    drawLeft + width,
                    drawTop + height
                );
            }

            if (this.borderColor) {
                fillRegion(
                    screen,
                    drawLeft + frameWidth,
                    drawTop + frameWidth,
                    drawLeft + width - frameWidth ,
                    drawTop + height - frameWidth,
                    this.borderColor
                )
            }

            if (this.backgroundColor) {
                fillRegion(
                    screen,
                    drawLeft + unpackMargin(this.border, MoveDirection.Left) + frameWidth,
                    drawTop + unpackMargin(this.border, MoveDirection.Up) + frameWidth,
                    drawLeft + width - unpackMargin(this.border, MoveDirection.Right) - frameWidth,
                    drawTop + height - unpackMargin(this.border, MoveDirection.Down) - frameWidth,
                    this.backgroundColor
                )
            }

            const contentWidth = width - 
                unpackMargin(this.border, MoveDirection.Left) -
                unpackMargin(this.border, MoveDirection.Right) -
                unpackMargin(this.padding, MoveDirection.Left) -
                unpackMargin(this.padding, MoveDirection.Right) -
                (frameWidth << 1);
            const contentHeight = height -
                unpackMargin(this.border, MoveDirection.Up) -
                unpackMargin(this.border, MoveDirection.Down) -
                unpackMargin(this.padding, MoveDirection.Up) -
                unpackMargin(this.padding, MoveDirection.Down) -
                (frameWidth << 1);


            if (this.title) {
                titleHeight = this.title.getHeight(this.titleStyle);
                this.title.drawTo(
                    drawLeft + unpackMargin(this.border, MoveDirection.Left) + unpackMargin(this.padding, MoveDirection.Left) + frameWidth,
                    drawTop + unpackMargin(this.border, MoveDirection.Up) + unpackMargin(this.padding, MoveDirection.Up) + frameWidth,
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

            if (this.columns <= 1 && this.rows === 0) {
                this.drawSingleColumn(
                    drawLeft + unpackMargin(this.border, MoveDirection.Left) + unpackMargin(this.padding, MoveDirection.Left) + frameWidth,
                    drawTop + titleHeight + unpackMargin(this.border, MoveDirection.Up) + unpackMargin(this.padding, MoveDirection.Up) + frameWidth,
                    contentWidth,
                    contentHeight - titleHeight
                );
            }
            else if (this.columns === 0 && this.rows === 1) {
                this.drawSingleRow(
                    drawLeft + unpackMargin(this.border, MoveDirection.Left) + unpackMargin(this.padding, MoveDirection.Left) + frameWidth,
                    drawTop + titleHeight + unpackMargin(this.border, MoveDirection.Up) + unpackMargin(this.padding, MoveDirection.Up) + frameWidth,
                    contentWidth,
                    contentHeight - titleHeight
                );
            }
            else {
                this.drawGrid(
                    drawLeft + unpackMargin(this.border, MoveDirection.Left) + unpackMargin(this.padding, MoveDirection.Left) + frameWidth,
                    drawTop + titleHeight + unpackMargin(this.border, MoveDirection.Up) + unpackMargin(this.padding, MoveDirection.Up) + frameWidth,
                    contentWidth,
                    contentHeight - titleHeight
                );
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

            const deltaTick = (deltaTimeMillis / 1000) * this.scrollSpeed;

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
        }

        //% blockId=mini_menu_sprite_set_button_events_enabled
        //% block="$this set button events enabled $enabled"
        //% this.defl=myMenu
        //% enable.shadow=toggleOnOff
        //% group="Controls"
        //% weight=80
        //% blockGap=8
        setButtonEventsEnabled(enabled: boolean) {
            this.buttonEventsEnabled = enabled;
        }

        //% blockId=mini_menu_sprite_move_selection_up
        //% block="$this move selection $direction"
        //% this.defl=myMenu
        //% direction.shadow=mini_menu_move_direction
        //% group="Controls"
        //% weight=90
        //% blockGap=8
        moveSelection(direction: number) {
            if (this.items.length === 0) return;

            let oldSelection = this.selectedIndex;

            if (this.columns <= 1 && this.rows === 0) {
                if (direction === MoveDirection.Up) {
                    this.selectedIndex = (this.selectedIndex + this.items.length - 1) % this.items.length;
                }
                else if (direction === MoveDirection.Down) {
                    this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
                }
                else {
                    return
                }
                this.scrollAnimationTick = 0;
            }
            else if (this.columns === 0 && this.rows === 1) {
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
                let column = this.selectedIndex % this.columns;
                let row = Math.idiv(this.selectedIndex, this.columns);

                const maxRows = Math.ceil(this.items.length / this.columns);

                if (direction === MoveDirection.Up) {
                    row = (row + maxRows - 1) % maxRows;
                    
                    if (column + row * this.columns >= this.items.length) {
                        row = maxRows - 2;
                    }
                }
                else if (direction === MoveDirection.Down) {
                    row = (row + 1) % maxRows;
                    if (column + row * this.columns >= this.items.length) {
                        row = 0
                    }
                }
                else if (direction === MoveDirection.Left) {
                    column = (column + this.columns - 1) % this.columns
                    if (column + row * this.columns >= this.items.length) {
                        column = (this.items.length - 1) % this.columns
                    }
                }
                else if (direction === MoveDirection.Right) {
                    column = (column + 1) % this.columns
                    if (column + row * this.columns >= this.items.length) {
                        column = 0;
                    }
                }

                this.selectedIndex = column + row * this.columns
                this.scrollAnimationTick = 0
            }

            if (this.itemSelectedHandler && oldSelection !== this.selectedIndex) {
                this.itemSelectedHandler(this.items[this.selectedIndex].text, this.selectedIndex);
            }
        }

        //% blockId=mini_menu_sprite_close_menu
        //% block="close $this"
        //% this.defl=myMenu
        //% group="Create"
        //% weight=10
        close() {
            this.destroy();
        }

        //% blockId=mini_menu_on_button_pressed
        //% block="$this on $button pressed with $selection"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% handlerStatement
        //% draggableParameters=reporter
        //% group="Controls"
        //% weight=100
        //% blockGap=8
        onButtonPressed(button: controller.Button, handler: (selection: string, selectedIndex: number) => void) {
            this.onButtonEvent(button, handler);
        }

        //% blockId=mini_menu_on_selection_changed
        //% block="$this on selection changed $selection $selectedIndex"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% handlerStatement
        //% draggableParameters=reporter
        //% group="Controls"
        //% weight=90
        onSelectionChanged(handler: (selection: string, selectedIndex: number) => void) {
            this.itemSelectedHandler = handler;

            // This event is often used to display information about the selected item, so
            // run the handler immediately to prevent the user from having to duplicate code
            // for the first selected item
            if (handler && this.items && this.items.length) handler(this.items[this.selectedIndex].text, this.selectedIndex);
        }

        //% blockId=mini_menu_set_style_property
        //% block="set $kind item style for $this $property to $value"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% inlineInputMode=inline
        //% group="Styling"
        //% weight=50
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
        }

        //% blockId=mini_menu_set_menu_style_property
        //% block="set menu style for $this $property to $value"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% inlineInputMode=inline
        //% group="Styling"
        //% weight=100
        //% blockGap=8
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
            }
        }

        //% blockId=mini_menu_set_menu_title
        //% block="set $this title to $title"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% title.defl="title"
        //% inlineInputMode=inline
        //% group="Create"
        //% weight=20
        setTitle(title: string) {
            this.title = new miniMenu.MenuItem(title, undefined);
        }

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
        setDimensions(width: number, height: number) {
            this.setMenuStyleProperty(MenuStyleProperty.Width, width);
            this.setMenuStyleProperty(MenuStyleProperty.Height, height);
        }


        //% blockId=mini_menu_set_menu_frame
        //% block="set $this frame to $frame"
        //% this.shadow=variables_get
        //% this.defl=myMenu
        //% frame.shadow=dialog_image_picker
        //% inlineInputMode=inline
        //% group="Styling"
        //% weight=100
        //% blockGap=8
        setFrame(frame: Image) {
            if (!frame) {
                this.frame = frame;
                return;
            }

            // For performance reasons, the frame image needs to be at least 12x12
            if (frame.width !== frame.height || Math.idiv(frame.width, 3) * 3 !== frame.width || frame.width < 12) {
                const newFrame = image.create(Math.max(frame.width, 12), Math.max(frame.width, 12));
                newFrame.drawTransparentImage(frame, 0, 0);
                frame = newFrame;
            }

            this.frame = frame;
        }

        fireButtonEvent(button: controller.Button) {
            if (!this.buttonEventsEnabled) return;

            const handler = this.buttonHandlers[button.id];

            if (handler && this.items.length) {
                handler(this.items[this.selectedIndex].text, this.selectedIndex);
            }
        }

        onButtonEvent(button: controller.Button, handler: (text: string, selectedIndex: number) => void) {
            this.buttonHandlers[button.id] = handler;
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
        }

        drawGrid(drawLeft: number, drawTop: number, menuWidth: number, menuHeight: number) {
            if (!this.items) return;

            const menuTop = drawTop;
            const widthPerColumn = (menuWidth / Math.max(this.columns, 1)) | 0;
            const heightPerRow = (menuHeight / Math.max(this.rows, 1)) | 0;

            let index = 0;
            let current: MenuItem;
            let style: Style;
            let isSelected: boolean;

            let xOffset = -(this.xScroll | 0);
            let yOffset = -(this.yScroll | 0);

            const totalRows = Math.ceil(this.items.length / this.columns)

            for (let row = 0; row < totalRows; row++) {
                for (let col = 0; col < this.columns; col++) {
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
        }

        protected getWidth() {
            if (this.customWidth !== undefined) return this.customWidth;

            let contentWidth = 0;
            let current: MenuItem;
            let style: Style;

            if (this.columns <= 1 && this.rows === 0) {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentWidth = Math.max(current.getWidth(style), contentWidth);
                }

            }
            else if (this.columns === 0 && this.rows === 1) {
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
                contentWidth *= this.columns;
            }

            return contentWidth +
                unpackMargin(this.border, MoveDirection.Left) +
                unpackMargin(this.border, MoveDirection.Right) +
                unpackMargin(this.padding, MoveDirection.Left) +
                unpackMargin(this.padding, MoveDirection.Right) +
                (this.frame ? (((this.frame.width / 3) | 0) << 1) : 0)
        }

        protected getHeight() {
            if (this.customHeight !== undefined) return this.customHeight;

            let contentHeight = 0;
            let current: MenuItem;
            let style: Style;

            if (this.columns <= 1 && this.rows === 0) {
                for (let i = 0; i < this.items.length; i++) {
                    current = this.items[i];
                    style = this.selectedIndex === i ? this.selectedStyle : this.defaultStyle;
                    contentHeight += current.getHeight(style)
                }

            }
            else if (this.columns === 0 && this.rows === 1) {
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
                contentHeight *= this.rows;
            }

            return contentHeight +
                unpackMargin(this.border, MoveDirection.Up) +
                unpackMargin(this.border, MoveDirection.Down) +
                unpackMargin(this.padding, MoveDirection.Up) +
                unpackMargin(this.padding, MoveDirection.Down) +
                (this.frame ? (((this.frame.width / 3) | 0) << 1) : 0)
        }
    }

    function fillVerticalRegion(target: Image, left: number, top: number, width: number, bottom: number, color: number) {
        if (!color) return;
        target.fillRect(left, top, width, bottom - top, color);
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

        if (visibleCharacters <= 1) return;
        
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
        const frameWidth = (frame.width / 3) | 0;

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

    function buttonEventsEnabled(sprite: Sprite) {
        return !!((sprite as MenuSprite).buttonEventsEnabled)
    }
}
