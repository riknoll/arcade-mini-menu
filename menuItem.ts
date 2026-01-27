namespace miniMenu {
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

}