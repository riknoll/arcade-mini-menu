namespace miniMenu {
    export class MenuItem {
        _font: image.Font;
        _isDirty: boolean;
        _disabled: boolean;

        constructor(public text: string, public icon: Image, disabled?: boolean) {
            this._font = image.getFontForText(text);
            this._disabled = !!disabled;
            this._isDirty = true;
        }

        //% blockId=mini_menu_menu_item_set_text
        //% block="$this set text $text"
        //% this.shadow=variables_get
        //% this.defl=myMenuItem
        //% inlineInputMode=inline
        //% group="Menu Items"
        //% weight=50
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/menu-item-set-text
        setText(text: string) {
            this.text = text;
            this._font = image.getFontForText(text);
            this._isDirty = true;
        }

        //% blockId=mini_menu_menu_item_get_text
        //% block="$this text"
        //% this.shadow=variables_get
        //% this.defl=myMenuItem
        //% inlineInputMode=inline
        //% group="Menu Items"
        //% weight=45
        //% help=github:arcade-mini-menu/docs/menu-item-get-text
        getText(): string {
            return this.text;
        }

        //% blockId=mini_menu_menu_item_set_icon
        //% block="$this set icon $icon"
        //% this.shadow=variables_get
        //% this.defl=myMenuItem
        //% icon.shadow=screen_image_picker
        //% inlineInputMode=inline
        //% group="Menu Items"
        //% weight=40
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/menu-item-set-icon
        setIcon(icon: Image) {
            this.icon = icon;
            this._isDirty = true;
        }

        //% blockId=mini_menu_menu_item_get_icon
        //% block="$this icon"
        //% this.shadow=variables_get
        //% this.defl=myMenuItem
        //% inlineInputMode=inline
        //% group="Menu Items"
        //% weight=35
        //% help=github:arcade-mini-menu/docs/menu-item-get-icon
        getIcon(): Image {
            return this.icon;
        }

        //% blockId=mini_menu_menu_item_set_disabled
        //% block="$this set disabled $disabled"
        //% this.shadow=variables_get
        //% this.defl=myMenuItem
        //% inlineInputMode=inline
        //% group="Menu Items"
        //% weight=30
        //% blockGap=8
        //% help=github:arcade-mini-menu/docs/menu-item-set-disabled
        setDisabled(disabled: boolean) {
            this._disabled = disabled;
            this._isDirty = true;
        }

        //% blockId=mini_menu_menu_item_is_disabled
        //% block="$this is disabled"
        //% this.shadow=variables_get
        //% this.defl=myMenuItem
        //% inlineInputMode=inline
        //% group="Menu Items"
        //% weight=25
        //% help=github:arcade-mini-menu/docs/menu-item-is-disabled
        isDisabled(): boolean {
            return this._disabled;
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
                return Math.max(this.icon.height, this._font.charHeight) + allPadding;
            }
            else {
                return this._font.charHeight + allPadding
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
                return this.icon.width + style.iconTextSpacing + this.text.length * this._font.charWidth + allPadding;
            }
            else {
                return this.text.length * this._font.charWidth + allPadding
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

            const widthOfText = this._font.charWidth * this.text.length;

            let borderLeft = left + unpackMargin(style.margin, MoveDirection.Left);
            let borderTop = top + unpackMargin(style.margin, MoveDirection.Up);
            let borderRight = left + maxWidth - unpackMargin(style.margin, MoveDirection.Right);
            let borderBottom = top + maxHeight - unpackMargin(style.margin, MoveDirection.Down);

            let contentLeft = borderLeft + unpackMargin(style.border, MoveDirection.Left) + unpackMargin(style.padding, MoveDirection.Left);
            let contentTop = borderTop + unpackMargin(style.border, MoveDirection.Up) + unpackMargin(style.padding, MoveDirection.Up);
            let contentRight = borderRight - unpackMargin(style.border, MoveDirection.Right) - unpackMargin(style.padding, MoveDirection.Right);
            let contentBottom = borderBottom - unpackMargin(style.border, MoveDirection.Down) - unpackMargin(style.padding, MoveDirection.Down);

            let textLeft: number;
            let textTop = contentTop + ((contentBottom - contentTop) >> 1) - (this._font.charHeight >> 1);
            let textRight: number;
            let textBottom = textTop + this._font.charHeight;

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
                _fillRegion(
                    target,
                    Math.max(borderLeft, cutoffLeft),
                    Math.max(borderTop, cutoffTop),
                    Math.min(borderRight, cutoffRight),
                    Math.min(borderBottom, cutoffBottom),
                    style.borderColor
                );
            }

            if (style.background) {
                _fillRegion(
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
                    this._font
                )
            }
            else {
                const printableCharacters = Math.ceil((textRight - textLeft) / this._font.charWidth)
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
                    this._font
                )
            }
        }
    }

}