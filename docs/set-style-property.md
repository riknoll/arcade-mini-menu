# set style property

Sets one of the available style options for the meneu items of a MenuSprite.

```sig
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("abc")
)
myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Padding, 0)
```

### Style targets

There are three types of styles that can be changed with this block:

* **default** - changes the style of the menu items that are not selected in the menu
* **selected** - changes the style of the selected menu item
* **title** - changes the style of the title that appears above the menu. This is only visible if the title has been set

### Style properties

The available styles include:

* **padding** - the width of the padding around the content of the menu item. This can either be a single number (in which case it will apply to all sides) or the output of the `createBorderBox` function. Defaults to 2
* **foreground** - sets the color of the menu item text. Defaults to 15 for title/default menu items, and 1 for selected nenu items
* **background** - sets the color of the menu item background. Defaults to 1 for title/default menu items, and 3 for selected menu items
* **border** - the width of the border of the menu item. This can either be a single number (in which case it will apply to all sides) or the output of the `createBorderBox` function. Defaults to 0
* **border color** - sets the color of the menu item border. This will not be visible unless the border property is changed. Defaults to 0
* **margin** - sets the spacing between a menu item and the adjacent menu items. This can either be a single number (in which case it will apply to all sides) or the output of the `createBorderBox` function. Defaults to 0
* **icon-text spacing** - sets the number of pixels between a menu item's icon and its text. If the menu item has no icon, this does nothing. Defaults to 0
* **alignment** - sets the alignment of the text/icon in the menu item. Use 0 for left align, 1 for center align, and 2 for right align. Defaults to 0
* **icon only** - if set to any number other than 0, causes the menu item to be drawn with just the icon and no text. Defaults to 0

## Parameters

* **target**: the part of the menu to set the style on
* **property**: the style option to change
* **value**: a [number](/types/number) to set the style option to

## Example #example

### Styled menu

This example adds margin between the menu items, customizes the menu's colors, and gives each menu item a border on the left side.

```blocks
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("Sunday"),
miniMenu.createMenuItem("Monday"),
miniMenu.createMenuItem("Tuesday"),
miniMenu.createMenuItem("Wednesday"),
miniMenu.createMenuItem("Thursday"),
miniMenu.createMenuItem("Friday"),
miniMenu.createMenuItem("Saturday")
)
myMenu.y = 60
myMenu.x = 80
myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Margin, miniMenu.createBorderBox(
0,
0,
0,
2
))
myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(
4,
0,
0,
0
))
myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.BorderColor, 6)
myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 7)
myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 3)
myMenu.setStyleProperty(miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 1)
myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 1)
myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 15)
```

### Icon only menu

This example creates an inventory-like menu by using the icon only style

```blocks
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("Apple", img`
    . . . . . . . e c 7 . . . . . .
    . . . . e e e c 7 7 e e . . . .
    . . c e e e e c 7 e 2 2 e e . .
    . c e e e e e c 6 e e 2 2 2 e .
    . c e e e 2 e c c 2 4 5 4 2 e .
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
    . e e e 2 2 2 2 2 2 2 2 2 4 e .
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
    . . 2 e e 2 2 2 2 2 4 4 2 e . .
    . . . 2 2 e e 4 4 4 2 e e . . .
    . . . . . 2 2 e e e e . . . . .
    `),
miniMenu.createMenuItem("Burger", img`
    . . . . c c c b b b b b . . . .
    . . c c b 4 4 4 4 4 4 b b b . .
    . c c 4 4 4 4 4 5 4 4 4 4 b c .
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e .
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e
    . e b 4 4 4 4 4 5 4 4 4 4 b e .
    8 7 e e b 4 4 4 4 4 4 b e e 6 8
    8 7 2 e e e e e e e e e e 2 7 8
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e
    e b e 8 8 c c 8 8 c c c 8 e b e
    e e b e c c e e e e e c e b e e
    . e e b b 4 4 4 4 4 4 4 4 e e .
    . . . c c c c c e e e e e . . .
    `),
miniMenu.createMenuItem("Lemon", img`
    4 4 4 . . 4 4 4 4 4 . . . . . .
    4 5 5 4 4 5 5 5 5 5 4 4 . . . .
    b 4 5 5 1 5 1 1 1 5 5 5 4 . . .
    . b 5 5 5 5 1 1 5 5 1 1 5 4 . .
    . b d 5 5 5 5 5 5 5 5 1 1 5 4 .
    b 4 5 5 5 5 5 5 5 5 5 5 1 5 4 .
    c d 5 5 5 5 5 5 5 5 5 5 5 5 5 4
    c d 4 5 5 5 5 5 5 5 5 5 5 1 5 4
    c 4 5 5 5 d 5 5 5 5 5 5 5 5 5 4
    c 4 d 5 4 5 d 5 5 5 5 5 5 5 5 4
    . c 4 5 5 5 5 d d d 5 5 5 5 5 b
    . c 4 d 5 4 5 d 4 4 d 5 5 5 4 c
    . . c 4 4 d 4 4 4 4 4 d d 5 d c
    . . . c 4 4 4 4 4 4 4 4 5 5 5 4
    . . . . c c b 4 4 4 b b 4 5 4 4
    . . . . . . c c c c c c b b 4 .
    `),
miniMenu.createMenuItem("Chicken", img`
    . . 2 2 b b b b b . . . . . . .
    . 2 b 4 4 4 4 4 4 b . . . . . .
    2 2 4 4 4 4 d d 4 4 b . . . . .
    2 b 4 4 4 4 4 4 d 4 b . . . . .
    2 b 4 4 4 4 4 4 4 d 4 b . . . .
    2 b 4 4 4 4 4 4 4 4 4 b . . . .
    2 b 4 4 4 4 4 4 4 4 4 e . . . .
    2 2 b 4 4 4 4 4 4 4 b e . . . .
    . 2 b b b 4 4 4 b b b e . . . .
    . . e b b b b b b b e e . . . .
    . . . e e b 4 4 b e e e b . . .
    . . . . . e e e e e e b d b b .
    . . . . . . . . . . . b 1 1 1 b
    . . . . . . . . . . . c 1 d d b
    . . . . . . . . . . . c 1 b c .
    . . . . . . . . . . . . c c . .
    `),
miniMenu.createMenuItem("Ham", img`
    . . . . . . 2 2 2 2 . . . . . .
    . . . . 2 2 3 3 3 3 2 e . . . .
    . . . 2 3 d 1 1 d d 3 2 e . . .
    . . 2 3 1 d 3 3 3 d d 3 e . . .
    . 2 3 1 3 3 3 3 3 d 1 3 b e . .
    . 2 1 d 3 3 3 3 d 3 3 1 3 b b .
    2 3 1 d 3 3 1 1 3 3 3 1 3 4 b b
    2 d 3 3 d 1 3 1 3 3 3 1 3 4 4 b
    2 d 3 3 3 1 3 1 3 3 3 1 b 4 4 e
    2 d 3 3 3 1 1 3 3 3 3 1 b 4 4 e
    e d 3 3 3 3 d 3 3 3 d d b 4 4 e
    e d d 3 3 3 d 3 3 3 1 3 b 4 b e
    e 3 d 3 3 1 d d 3 d 1 b b e e .
    . e 3 1 1 d d 1 1 1 b b e e e .
    . . e 3 3 3 3 3 3 b e e e e . .
    . . . e e e e e e e e e e . . .
    `),
miniMenu.createMenuItem("Pizza", img`
    . . . . . . b b b b . . . . . .
    . . . . . . b 4 4 4 b . . . . .
    . . . . . . b b 4 4 4 b . . . .
    . . . . . b 4 b b b 4 4 b . . .
    . . . . b d 5 5 5 4 b 4 4 b . .
    . . . . b 3 2 3 5 5 4 e 4 4 b .
    . . . b d 2 2 2 5 7 5 4 e 4 4 e
    . . . b 5 3 2 3 5 5 5 5 e e e e
    . . b d 7 5 5 5 3 2 3 5 5 e e e
    . . b 5 5 5 5 5 2 2 2 5 5 d e e
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4
    . b 2 2 2 5 5 5 5 5 5 d d e 4 .
    b d 3 2 d 5 5 5 d d d 4 4 . . .
    b 5 5 5 5 d d 4 4 4 4 . . . . .
    4 d d d 4 4 4 . . . . . . . . .
    4 4 4 4 . . . . . . . . . . . .
    `),
miniMenu.createMenuItem("Donut", img`
    . . . . . . b b b b a a . . . .
    . . . . b b d d d 3 3 3 a a . .
    . . . b d d d 3 3 3 3 3 3 a a .
    . . b d d 3 3 3 3 3 3 3 3 3 a .
    . b 3 d 3 3 3 3 3 b 3 3 3 3 a b
    . b 3 3 3 3 3 a a 3 3 3 3 3 a b
    b 3 3 3 3 3 a a 3 3 3 3 d a 4 b
    b 3 3 3 3 b a 3 3 3 3 3 d a 4 b
    b 3 3 3 3 3 3 3 3 3 3 d a 4 4 e
    a 3 3 3 3 3 3 3 3 3 d a 4 4 4 e
    a 3 3 3 3 3 3 3 d d a 4 4 4 e .
    a a 3 3 3 d d d a a 4 4 4 e e .
    . e a a a a a a 4 4 4 4 e e . .
    . . e e b b 4 4 4 4 b e e . . .
    . . . e e e e e e e e . . . . .
    . . . . . . . . . . . . . . . .
    `),
miniMenu.createMenuItem("Cake", img`
    . . . . . . . . . . b b b . . .
    . . . . . . . . b e e 3 3 b . .
    . . . . . . b b e 3 2 e 3 a . .
    . . . . b b 3 3 e 2 2 e 3 3 a .
    . . b b 3 3 3 3 3 e e 3 3 3 a .
    b b 3 3 3 3 3 3 3 3 3 3 3 3 3 a
    b 3 3 3 d d d d 3 3 3 3 3 d d a
    b b b b b b b 3 d d d d d d 3 a
    b d 5 5 5 5 d b b b a a a a a a
    b 3 d d 5 5 5 5 5 5 5 d d d d a
    b 3 3 3 3 3 3 d 5 5 5 d d d d a
    b 3 d 5 5 5 3 3 3 3 3 3 b b b a
    b b b 3 d 5 5 5 5 5 5 5 d d b a
    . . . b b b 3 d 5 5 5 5 d d 3 a
    . . . . . . b b b b 3 d d d b a
    . . . . . . . . . . b b b a a .
    `),
miniMenu.createMenuItem("Ice Cream", img`
    . . . . . 3 3 b 3 3 d d 3 3 . .
    . . . . 3 1 1 d 3 d 1 1 1 1 3 .
    . . . 3 d 1 1 1 d 1 1 1 d 3 1 3
    . . 3 d d 1 1 1 d d 1 1 1 3 3 3
    . 3 1 1 d 1 1 1 1 d d 1 1 b . .
    . 3 1 1 1 d 1 1 1 1 1 d 1 1 3 .
    . b d 1 1 1 d 1 1 1 1 1 1 1 3 .
    . 4 b 1 1 1 1 d d 1 1 1 1 d 3 .
    . 4 4 d 1 1 1 1 1 1 d d d b b .
    . 4 d b d 1 1 1 1 1 1 1 1 3 . .
    4 d d 5 b d 1 1 1 1 1 1 1 3 . .
    4 5 d 5 5 b b d 1 1 1 1 d 3 . .
    4 5 5 d 5 5 d b b b d d 3 . . .
    4 5 5 5 d d d d 4 4 b 3 . . . .
    . 4 5 5 5 4 4 4 . . . . . . . .
    . . 4 4 4 . . . . . . . . . . .
    `),
miniMenu.createMenuItem("Strawberry", img`
    . . . . . . . 6 . . . . . . . .
    . . . . . . 8 6 6 . . . 6 8 . .
    . . . e e e 8 8 6 6 . 6 7 8 . .
    . . e 2 2 2 2 e 8 6 6 7 6 . . .
    . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
    . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
    e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
    e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
    e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
    e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
    e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
    e 2 2 2 2 2 2 2 4 e 2 e e c . .
    e e 2 e 2 2 4 2 2 e e e c . . .
    e e e e 2 e 2 2 e e e c . . . .
    e e e 2 e e c e c c c . . . . .
    . c c c c c c c . . . . . . . .
    `),
miniMenu.createMenuItem("Cherry", img`
    . . . . . . . . . . . 6 6 6 6 6
    . . . . . . . . . 6 6 7 7 7 7 8
    . . . . . . 8 8 8 7 7 8 8 6 8 8
    . . e e e e c 6 6 8 8 . 8 7 8 .
    . e 2 5 4 2 e c 8 . . . 6 7 8 .
    e 2 4 2 2 2 2 2 c . . . 6 7 8 .
    e 2 2 2 2 2 2 2 c . . . 8 6 8 .
    e 2 e e 2 2 2 2 e e e e c 6 8 .
    c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
    . c 2 e e e 2 e 2 4 2 2 2 2 c .
    . . c 2 2 2 e e 2 2 2 2 2 2 2 e
    . . . e c c e c 2 2 2 2 2 2 2 e
    . . . . . . . c 2 e e 2 2 e 2 c
    . . . . . . . c e e e e e e 2 c
    . . . . . . . . c e 2 2 2 2 c .
    . . . . . . . . . c c c c c . .
    `),
miniMenu.createMenuItem("Taco", img`
    . . . . . . . e e e e . . . . .
    . . . . . e e 4 5 5 5 e e . . .
    . . . . e 4 5 6 2 2 7 6 6 e . .
    . . . e 5 6 6 7 2 2 6 4 4 4 e .
    . . e 5 2 2 7 6 6 4 5 5 5 5 4 .
    . e 5 6 2 2 8 8 5 5 5 5 5 4 5 4
    . e 5 6 7 7 8 5 4 5 4 5 5 5 5 4
    e 4 5 8 6 6 5 5 5 5 5 5 4 5 5 4
    e 5 c e 8 5 5 5 4 5 5 5 5 5 5 4
    e 5 c c e 5 4 5 5 5 4 5 5 5 e .
    e 5 c c 5 5 5 5 5 5 5 5 4 e . .
    e 5 e c 5 4 5 4 5 5 5 e e . . .
    e 5 e e 5 5 5 5 5 4 e . . . . .
    4 5 4 e 5 5 5 5 e e . . . . . .
    . 4 5 4 5 5 4 e . . . . . . . .
    . . 4 4 e e e . . . . . . . . .
    `)
)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 3)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 5)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 1)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, 1)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 11)
myMenu.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected, miniMenu.StyleProperty.IconOnly, 1)
myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 9)
myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 15)
myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Border, miniMenu.createBorderBox(
0,
0,
0,
2
))
myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 1)
myMenu.setStyleProperty(miniMenu.StyleKind.Title, miniMenu.StyleProperty.BorderColor, 11)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 102)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 73)
myMenu.bottom = 100
myMenu.left = 30
myMenu.setTitle("Apple")
myMenu.onSelectionChanged(function (selection, selectedIndex) {
    myMenu.setTitle(selection)
})


```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```