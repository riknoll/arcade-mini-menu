namespace miniMenu {
    export const SCROLL_INDICATOR_WIDTH = 7;

    let printCanvas: Image;
    let frameCanvas: Image;

    export function _initPrintCanvas() {
        if (!printCanvas) printCanvas = image.create(12, 12);
    }

    export function _fillRegion(target: Image, left: number, top: number, right: number, bottom: number, color: number) {
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

    //% whenUsed
    const _fancyContrastMap = img` . f c c e 4 8 6 c 8 c c f e f 1`;
    function _fancyContrastingColor(color: number) {
        return _fancyContrastMap.getPixel(color, 0);
    }

    export function printFancyTextInRect(target: Image, text: string, left: number, top: number, right: number, bottom: number, color: number, cutLeft: boolean, cutTop: boolean, font: fancyText.BaseFont) {
        const width = right - left;
        const height = bottom - top;
        if (width <= 0 || height <= 0) return;

        const textWidth = fancyText.getTextWidth(font, text);
        const textHeight = font.lineHeight;

        let textX: number;
        if (textWidth <= width || !cutLeft) {
            textX = left;
        }
        else {
            textX = right - textWidth;
        }

        let textY: number;
        if (textHeight <= height || !cutTop) {
            textY = top;
        }
        else {
            textY = bottom - textHeight;
        }

        _drawFancyTextClipped(target, text, font, color, textX, textY, left, top, right, bottom);
    }

    export function printFancyScrolledText(target: Image, text: string, left: number, top: number, right: number, bottom: number, color: number, scroll: number, font: fancyText.BaseFont) {
        if (right - left <= 0 || bottom - top <= 0) return;

        _drawFancyTextClipped(target, text, font, color, left - scroll, top, left, top, right, bottom);
    }

    function _drawFancyTextClipped(target: Image, text: string, font: fancyText.BaseFont, color: number, startX: number, startY: number, boxLeft: number, boxTop: number, boxRight: number, boxBottom: number) {
        const imgBuf = control.createBuffer(font.bufferSize());
        imgBuf[0] = 0x87;
        imgBuf[1] = 1;

        let x = startX;
        const baselineY = startY + font.baselineOffset;

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i);

            if (charCode === 32) {
                x += font.wordSpacing;
                continue;
            }
            if (!font.isInFont(charCode)) {
                x += font.wordSpacing;
                continue;
            }

            const charW = font.charWidth(charCode);
            if (charW === 0) continue;

            const rawX = (x + font.charXOffset(charCode)) | 0;
            const rawY = (baselineY + font.charYOffset(charCode)) | 0;

            if (rawX < boxRight && rawX + charW > boxLeft) {
                const charBuf = font.writeCharacterBytes(imgBuf, charCode);
                const charImg = image.ofBuffer(charBuf);

                if (rawY < boxBottom && rawY + charImg.height > boxTop) {
                    _blitFancyChar(target, charImg, rawX, rawY, color & 0xf, boxLeft, boxTop, boxRight, boxBottom);

                    if (font.isDualTone) {
                        const charBuf2 = font.writeCharacterBytes(imgBuf, charCode, true);
                        const charImg2 = image.ofBuffer(charBuf2);
                        const secondColor = ((color >> 4) & 0xf) || _fancyContrastingColor(color & 0xf);
                        _blitFancyChar(target, charImg2, rawX, rawY, secondColor, boxLeft, boxTop, boxRight, boxBottom);
                    }
                }
            }

            x += charW + font.letterSpacing;

            if (i < text.length - 1) {
                x += font.getKernOffset(charCode, text.charCodeAt(i + 1));
            }
        }
    }

    function _blitFancyChar(target: Image, charImg: Image, rawX: number, rawY: number, color: number, boxLeft: number, boxTop: number, boxRight: number, boxBottom: number) {
        if (printCanvas.width < charImg.width || printCanvas.height < charImg.height) {
            printCanvas = image.create(Math.max(printCanvas.width, charImg.width), Math.max(printCanvas.height, charImg.height));
        }
        printCanvas.fill(0);
        printCanvas.drawTransparentImage(charImg, 0, 0);
        printCanvas.replace(1, color);

        const xDst = Math.max(rawX, boxLeft);
        const yDst = Math.max(rawY, boxTop);
        const wDst = Math.min(rawX + charImg.width, boxRight) - xDst;
        const hDst = Math.min(rawY + charImg.height, boxBottom) - yDst;

        if (wDst <= 0 || hDst <= 0) return;

        target.blit(
            xDst,
            yDst,
            wDst,
            hDst,
            printCanvas,
            xDst - rawX,
            yDst - rawY,
            wDst,
            hDst,
            true,
            false
        );
    }

}