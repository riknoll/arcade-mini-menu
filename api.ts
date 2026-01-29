
//% icon="\uf0c9"
//% color="#36b58b"
//% block="Mini Menu"
//% groups='["Create","Controls","Styling"]'
namespace miniMenu {
    export enum Button {
        //% block=A
        A,
        //% block=B
        B,
        //% block=up
        Up,
        //% block=down
        Down,
        //% block=left
        Left,
        //% block=right
        Right
    }

    /**
     * Creates a MenuItem with some text and an optional icon
     *
     * @param text The text for the MenuItem
     * @param image An optional icon for the MenuItem
     * @returns A MenuItem
     */
    //% blockId=mini_menu_create_menu_item
    //% block="menu item $text||$image"
    //% text.defl="abc"
    //% text.shadow=text
    //% image.shadow=screen_image_picker
    //% group="Create"
    //% weight=90
    //% help=github:arcade-mini-menu/docs/create-menu-item
    export function createMenuItem(text: string, image?: Image) {
        _init()
        return new MenuItem(text, image);
    }

    /**
     * Creates a MenuSprite with up to 12 MenuItems. If you need more than 12 items, use `create menu from array` instead.
     *
     * @param item1 a MenuItem to include in the array
     * @param item2 a MenuItem to include in the array
     * @param item3 a MenuItem to include in the array
     * @param item4 a MenuItem to include in the array
     * @param item5 a MenuItem to include in the array
     * @param item6 a MenuItem to include in the array
     * @param item7 a MenuItem to include in the array
     * @param item8 a MenuItem to include in the array
     * @param item9 a MenuItem to include in the array
     * @param item10 a MenuItem to include in the array
     * @param item11 a MenuItem to include in the array
     * @param item12 a MenuItem to include in the array
     * @returns A MenuSprite
     */
    //% blockId=mini_menu_show_menu
    //% block="create menu sprite|$item1||$item2 $item3 $item4 $item5 $item6 $item7 $item8 $item9 $item10 $item11 $item12"
    //% blockSetVariable=myMenu
    //% item1.shadow=mini_menu_create_menu_item
    //% item2.shadow=mini_menu_create_menu_item
    //% item3.shadow=mini_menu_create_menu_item
    //% item4.shadow=mini_menu_create_menu_item
    //% item5.shadow=mini_menu_create_menu_item
    //% item6.shadow=mini_menu_create_menu_item
    //% item7.shadow=mini_menu_create_menu_item
    //% item8.shadow=mini_menu_create_menu_item
    //% item9.shadow=mini_menu_create_menu_item
    //% item10.shadow=mini_menu_create_menu_item
    //% item11.shadow=mini_menu_create_menu_item
    //% item12.shadow=mini_menu_create_menu_item
    //% group="Create"
    //% weight=100
    //% help=github:arcade-mini-menu/docs/create-menu
    export function createMenu(
        item1: MenuItem,
        item2?: MenuItem,
        item3?: MenuItem,
        item4?: MenuItem,
        item5?: MenuItem,
        item6?: MenuItem,
        item7?: MenuItem,
        item8?: MenuItem,
        item9?: MenuItem,
        item10?: MenuItem,
        item11?: MenuItem,
        item12?: MenuItem,
    ): Sprite {
        _init();

        const m = new MenuSprite();
        m.setMenuItems([
            item1,
            item2,
            item3,
            item4,
            item5,
            item6,
            item7,
            item8,
            item9,
            item10,
            item11,
            item12,
        ].filter(i => !!i));
        m.setButtonEventsEnabled(true);

        m.x = 80;
        m.y = 60;

        return m;
    }

    /**
     * Creates a MenuSprite from an array of MenuItems
     *
     * @param items An array of MenuItems to use in the MenuSprite
     * @returns A MenuSprite
     */
    //% blockId=mini_menu_create_menu_from_array
    //% block="create menu sprite from $items"
    //% blockSetVariable=myMenu
    //% items.shadow=lists_create_with
    //% items.defl=mini_menu_create_menu_item
    //% group="Create"
    //% weight=99
    //% help=github:arcade-mini-menu/docs/create-menu-from-array
    export function createMenuFromArray(
        items: MenuItem[]
    ): Sprite {
        _init();

        const m = new MenuSprite();
        // FIXME: slice here?
        m.setMenuItems(items);
        m.setButtonEventsEnabled(true);

        m.x = 80;
        m.y = 60;

        return m;
    }

    /**
     * A direction to move the selection in
     */
    //% blockId=mini_menu_move_direction
    //% block="$move"
    //% shim=TD_ID
    //% blockHidden
    //% help=github:arcade-mini-menu/docs/move-direction
    export function _moveDirection(move: MoveDirection): number {
        return move;
    }

    /**
     * Creates a border box that can be used with the setStyleProperty or setMenuStyleProperty padding, margin, and border options.
     *
     * @param left The width of the box on the left side
     * @param top The width of the box on the top side
     * @param right The width of the box on the right side
     * @param bottom The width of the box on the bottom side
     * @returns A number in which the left, top, right, and bottom have been encoded
     */
    //% blockId=mini_menu_create_border_box
    //% block="left $left top $top right $right bottom $bottom"
    //% group="Styling"
    //% weight=10
    //% help=github:arcade-mini-menu/docs/create-border-box
    export function createBorderBox(left: number, top: number, right: number, bottom: number) {
        return packMargin(left, top, right, bottom);
    }

    /**
     * Sets whether or not button events on this MenuSprite will be fired.
     *
     *
     * @param enabled If true, button events are enabled. If false, they are disabled
     */
    //% blockId=mini_menu_sprite_set_button_events_enabled_new
    //% block="$menu set button events enabled $enabled"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% enable.shadow=toggleOnOff
    //% group="Controls"
    //% weight=80
    //% blockGap=8
    //% help=github:arcade-mini-menu/docs/set-button-events-enabled
    export function setButtonEventsEnabled(menu: Sprite, enabled: boolean) {
        assertMenuSprite(menu).setButtonEventsEnabled(enabled);
    }

    /**
     * Moves the selection cursor in the MenuSprite in the given direction.
     *
     *
     * @param direction The direction to move the cursor in
     */
    //% blockId=mini_menu_sprite_move_selection_up_new
    //% block="$menu move selection $direction"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% direction.shadow=mini_menu_move_direction
    //% group="Controls"
    //% weight=90
    //% blockGap=8
    //% help=github:arcade-mini-menu/docs/move-selection
    export function moveSelection(menu: Sprite, direction: number) {
        assertMenuSprite(menu).moveSelection(direction);
    }

    /**
     * Sets the controller that will be used to navigate the MenuSprite.
     * Useful for multiplayer games.
     *
     *
     * @param menu  The MenuSprite to set the controller for
     * @param ctrl  The controller to use for navigation
     */
    //% blockId=mini_menu_sprite_set_controller
    //% block="$menu set controller $ctrl"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% group="Controls"
    //% weight=80
    //% help=github:arcade-mini-menu/docs/set-controller
    export function setController(menu: Sprite, ctrl: controller.Controller) {
        assertMenuSprite(menu).setController(ctrl);
    }

    /**
     * Destroys the MenuSprite. This is exactly the same as using the destroy block in the Sprites category
     */
    //% blockId=mini_menu_sprite_close_menu_new
    //% block="close $menu"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% group="Create"
    //% weight=10
    //% help=github:arcade-mini-menu/docs/close
    export function close(menu: Sprite) {
        assertMenuSprite(menu).close();
    }

    /**
     * Runs some code whenever a button is pressed and the given MenuSprite has not been destroyed. Using this with one of the direction buttons will override the default behavior.
     *
     *
     * @param button The button to listen to
     * @param handler The code to run when the button is pressed
     */
    //% blockId=mini_menu_on_button_pressed_new
    //% block="$menu on $button pressed with $selection"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% handlerStatement
    //% draggableParameters=reporter
    //% group="Controls"
    //% weight=100
    //% blockGap=8
    //% help=github:arcade-mini-menu/docs/on-button-pressed
    export function onButtonPressed(menu: Sprite, button: Button, handler: (selection: string, selectedIndex: number) => void) {
        assertMenuSprite(menu).onButtonPressed(button, handler);
    }

    /**
     * Runs some code whenever the selection cursor in the specified MenuSprite moves. This will also fire once immediately when this function is called
     *
     * @param handler The code to run when the selection changes
     */
    //% blockId=mini_menu_on_selection_changed_new
    //% block="$menu on selection changed $selection $selectedIndex"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% handlerStatement
    //% draggableParameters=reporter
    //% group="Controls"
    //% weight=90
    //% help=github:arcade-mini-menu/docs/on-selection-changed
    export function onSelectionChanged(menu: Sprite, handler: (selection: string, selectedIndex: number) => void) {
        assertMenuSprite(menu).onSelectionChanged(handler);
    }

    /**
     * Sets a style property for the specified part of the MenuSprite. See the help page for more info on what these properties mean.
     *
     *
     * @param kind The part of the MenuSprite to style
     * @param property The property to set the value of
     * @param value The value to set the property to
     */
    //% blockId=mini_menu_set_style_property_new
    //% block="set $kind item style for $menu $property to $value"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% inlineInputMode=inline
    //% group="Styling"
    //% weight=50
    //% help=github:arcade-mini-menu/docs/set-style-property
    export function setStyleProperty(menu: Sprite, kind: StyleKind, property: StyleProperty, value: number) {
        assertMenuSprite(menu).setStyleProperty(kind, property, value);
    }

    /**
     * Sets a style property on a MenuSprite. See the help page for more info on what these properties mean.
     *
     *
     * @param property The property to set the value of
     * @param value The value to set the property to
     */
    //% blockId=mini_menu_set_menu_style_property_new
    //% block="set menu style for $menu $property to $value"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% inlineInputMode=inline
    //% group="Styling"
    //% weight=100
    //% blockGap=8
    //% help=github:arcade-mini-menu/docs/set-menu-style-property
    export function setMenuStyleProperty(menu: Sprite, property: MenuStyleProperty, value: number) {
        assertMenuSprite(menu).setMenuStyleProperty(property, value);
    }

    /**
     * Sets the title of the MenuSprite. The title is displayed above the menu can can be customized using the setStyleProperty function.
     *
     *
     * @param title The title to set for the MenuSprite
     */
    //% blockId=mini_menu_set_menu_title_new
    //% block="set $menu title to $title"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% title.defl="title"
    //% inlineInputMode=inline
    //% group="Create"
    //% weight=20
    //% help=github:arcade-mini-menu/docs/set-title
    export function setTitle(menu: Sprite, title: string) {
        assertMenuSprite(menu).setTitle(title);
    }

    /**
     * Sets the width and height of the MenuSprite. If the width or height is too small to fit the menu's content, the menu will scroll.
     *
     *
     * @param width The desired width of the MenuSprite or 0 for the content width
     * @param height The desired height of the MenuSprite or 0 for the content height
     */
    //% blockId=mini_menu_set_menu_dimensions_new
    //% block="set $menu width $width height $height"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% width.defl=100
    //% height.defl=100
    //% inlineInputMode=inline
    //% group="Create"
    //% weight=30
    //% blockGap=8
    //% help=github:arcade-mini-menu/docs/set-dimensions
    export function setDimensions(menu: Sprite, width: number, height: number) {
        assertMenuSprite(menu).setDimensions(width, height);
    }

    /**
     * Sets the frame for the MenuSprite. The image must be square and have a width and height that are divisible by 3
     *
     *
     * @param frame An image to use as the template for drawing the MenuSprite's frame
     */
    //% blockId=mini_menu_set_menu_frame_new
    //% block="set $menu frame to $frame"
    //% menu.shadow=variables_get
    //% menu.defl=myMenu
    //% frame.shadow=dialog_image_picker
    //% inlineInputMode=inline
    //% group="Styling"
    //% weight=100
    //% blockGap=8
    //% help=github:arcade-mini-menu/docs/set-frame
    export function setFrame(menu: Sprite, frame: Image) {
        assertMenuSprite(menu).setFrame(frame);
    }

    function assertMenuSprite(menu: Sprite): MenuSprite {
        if (!(menu instanceof MenuSprite)) {
            throw "Mini menu functions can only be called on MenuSprites";
        }
        return menu;
    }
}
