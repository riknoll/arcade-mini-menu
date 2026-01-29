namespace miniMenu {
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

        protected buttonHandlers: ButtonHandlers;
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

            this.buttonHandlers = new ButtonHandlers(controller.player1);
            this.buttonEventsEnabled = false;

            this.onButtonEvent(Button.Up, () => this.moveSelection(MoveDirection.Up));
            this.onButtonEvent(Button.Down, () => this.moveSelection(MoveDirection.Down));
            this.onButtonEvent(Button.Left, () => this.moveSelection(MoveDirection.Left));
            this.onButtonEvent(Button.Right, () => this.moveSelection(MoveDirection.Right));
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
                _fillRegion(
                    screen,
                    drawLeft + frameWidth,
                    drawTop + frameWidth,
                    drawLeft + width - frameWidth,
                    drawTop + height - frameWidth,
                    this.menuStyle.borderColor
                )
            }

            if (this.menuStyle.backgroundColor) {
                _fillRegion(
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
        //% blockHidden=1
        setButtonEventsEnabled(enabled: boolean) {
            this.buttonEventsEnabled = enabled;
        }

        /**
         * Moves the selection cursor in the MenuSprite in the given direction.
         *
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
        //% blockHidden=1
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
        //% blockHidden=1
        close() {
            this.destroy();
        }

        /**
         * Runs some code whenever a button is pressed and the given MenuSprite has not been destroyed. Using this with one of the direction buttons will override the default behavior.
         *
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
        //% blockHidden=1
        onButtonPressed(button: Button, handler: (selection: string, selectedIndex: number) => void) {
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
        //% blockHidden=1
        onSelectionChanged(handler: (selection: string, selectedIndex: number) => void) {
            this.itemSelectedHandler = handler;

            // This event is often used to display information about the selected item, so
            // run the handler immediately to prevent the user from having to duplicate code
            // for the first selected item
            if (handler && this.items && this.items.length) handler(this.items[this.selectedIndex].text, this.selectedIndex);
        }

        /**
         * Sets the controller that will be used to control this MenuSprite. Used for
         * multiplayer games.
         *
         *
         * @param controllerImpl The controller of the player that will control this MenuSprite
         */
        setController(controllerImpl: controller.Controller) {
            this.buttonHandlers.setController(controllerImpl);
        }

        /**
         * Sets a style property for the specified part of the MenuSprite. See the help page for more info on what these properties mean.
         *
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
        //% blockHidden=1
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
        //% blockHidden=1
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
        //% blockHidden=1
        setTitle(title: string) {
            this.title = new miniMenu.MenuItem(title, undefined);
            this.updateDimensions();
        }

        /**
         * Sets the width and height of the MenuSprite. If the width or height is too small to fit the menu's content, the menu will scroll.
         *
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
        //% blockHidden=1
        setDimensions(width: number, height: number) {
            this.setMenuStyleProperty(MenuStyleProperty.Width, width);
            this.setMenuStyleProperty(MenuStyleProperty.Height, height);
        }

        /**
         * Sets the frame for the MenuSprite. The image must be square and have a width and height that are divisible by 3
         *
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
        //% blockHidden=1
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

        onButtonEvent(button: Button, handler: (text: string, selectedIndex: number) => void) {
            const buttonImpl = this.buttonHandlers.getButtonImpl(button);
            let hasBeenReleased = !buttonImpl.isPressed();

            const wrappedHandler = () => {
                if (!this.buttonEventsEnabled || !this.items.length || !hasBeenReleased) return;

                handler(this.items[this.selectedIndex].text, this.selectedIndex);
            }

            this.buttonHandlers.onEvent(button, ControllerButtonEvent.Pressed, wrappedHandler);

            if (!hasBeenReleased) {
                this.buttonHandlers.onEvent(button, ControllerButtonEvent.Released, () => {
                    hasBeenReleased = true;
                });
            }
        }

        _destroyCore() {
            super._destroyCore();
            _state().removeSprite(this);
            this.buttonHandlers.dispose();
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
}