# on selection changed

Runs some code when the selected item of a MenuSprite changes. The code will also run immediately when this function is called.

```sig
miniMenu.createMenuFromArray([]).onButtonPressed(controller.A, function (selection, selectedIndex) {

})
```

## Parameters

* **selection** the text of the currently selected menu item. This can be dragged out of the block and used within the event handler
* **selectionIndex** the index of the currently selected menu item. This can be dragged out of the block and used within the event handler

## Example #example

This example creates a menu and has a sprite say information about the selected item each time the selection changes.

```blocks
scene.setBackgroundColor(9)
let mySprite = sprites.create(img`
    . . . . . . . . . . b 5 b . . .
    . . . . . . . . . b 5 b . . . .
    . . . . . . . . . b c . . . . .
    . . . . . . b b b b b b . . . .
    . . . . . b b 5 5 5 5 5 b . . .
    . . . . b b 5 d 1 f 5 5 d f . .
    . . . . b 5 5 1 f f 5 d 4 c . .
    . . . . b 5 5 d f b d d 4 4 . .
    b d d d b b d 5 5 5 4 4 4 4 4 b
    b b d 5 5 5 b 5 5 4 4 4 4 4 b .
    b d c 5 5 5 5 d 5 5 5 5 5 b . .
    c d d c d 5 5 b 5 5 5 5 5 5 b .
    c b d d c c b 5 5 5 5 5 5 5 b .
    . c d d d d d d 5 5 5 5 5 d b .
    . . c b d d d d d 5 5 5 b b . .
    . . . c c c c c c c c b b . . .
    `, SpriteKind.Player)
mySprite.bottom = 118
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
    `)
)
myMenu.top = 2
myMenu.x = 80
myMenu.onSelectionChanged(function (selection, selectedIndex) {
    if (selectedIndex == 0) {
        mySprite.sayText("Meh, apples are okay")
    } else if (selectedIndex == 1) {
        mySprite.sayText("Too sour for me")
    } else {
        mySprite.sayText("I love strawberries!")
    }
})

```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```