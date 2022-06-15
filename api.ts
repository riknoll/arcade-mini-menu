namespace miniMenu {
    //% blockId=mini_menu_create_menu_item
    //% block="menu item $text||$image"
    //% text.defl="abc"
    //% text.shadow=text
    //% image.shadow=screen_image_picker
    export function createMenuItem(text: string, image?: Image) {
        _init()
        return new MenuItem(text, image);
    }

    //% blockId=mini_menu_show_menu
    //% block="create menu sprite||$item1 $item2 $item3 $item4 $item5 $item6 $item7 $item8 $item9 $item10 $item11 $item12"
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
    export function createMenu(
        item1?: MenuItem,
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

        return m;
    }

    //% blockId=mini_menu_move_direction
    //% block="$move"
    //% shim=TD_ID
    //% blockHidden
    export function _moveDirection(move: MoveDirection): number {
        return move;
    }
}
