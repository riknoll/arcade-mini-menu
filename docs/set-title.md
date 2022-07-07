# set title

Sets the title for the MenuSprite.

```sig
miniMenu.createMenuFromArray([]).setTitle("abc")
```

The title styling can be customized using the `set style property` function.

## Parameters

* **title** - a title to show at the top of the menu

## Example #example

This example creates an icon-only menu and uses the title to display the name of the selected item.

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