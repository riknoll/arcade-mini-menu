# create menu item

Creates a MenuItem with some text and an optional icon

```sig
miniMenu.createMenu(
miniMenu.createMenuItem("Sunday"), img`
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
    `)
)
```

## Parameters

* **text** - The text for the MenuItem
* **icon** - An optional icon for the MenuItem

## Example #example

This example creates a menu where some of the items have icons and some do not.

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
miniMenu.createMenuItem("No Icon")
)

```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```