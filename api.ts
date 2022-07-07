
//% icon="\uf0c9"
//% color="#36b58b"
//% block="Mini Menu"
//% groups='["Create","Controls","Styling"]'
namespace miniMenu {
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
    ) {
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
    ) {
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
}
