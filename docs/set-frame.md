# set frame

Sets the frame for the MenuSprite.

A frame is a special image that is used to create borders that surround the MenuSprite. It must be a square image where the width and height are both divisible by 3.

```sig
miniMenu.createMenuFromArray([]).setFrame(img`
.
    `)
```

This function is very similar to the `set dialog frame` block in the game category except that it ignores the center of the image.

## Parameters

* **frame** - a square image used for drawing the frame of the menu

## Example #example

This example creates a menu and gives it a frame. Take a look at the frame image and see how the colors map to the MenuSprite: each color only shows up on the side it corresponds to and the pink in the center of the sprite is ignored.

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
myMenu.setDimensions(100, 40)
myMenu.setFrame(img`
    2 2 2 2 2 5 5 5 5 5 8 8 8 8 8
    2 2 2 2 2 5 5 5 5 5 8 8 8 8 8
    2 2 2 2 2 5 5 5 5 5 8 8 8 8 8
    2 2 2 2 2 c b c b c 8 8 8 8 8
    2 2 2 2 2 c b c b c 8 8 8 8 8
    9 9 9 c c 3 3 3 3 3 c c 7 7 7
    9 9 9 b b 3 3 3 3 3 b b 7 7 7
    9 9 9 c c 3 3 3 3 3 c c 7 7 7
    9 9 9 b b 3 3 3 3 3 b b 7 7 7
    9 9 9 c c 3 3 3 3 3 c c 7 7 7
    a a a a a c b c b c 6 6 6 6 6
    a a a a a c b c b c 6 6 6 6 6
    a a a a a 4 4 4 4 4 6 6 6 6 6
    a a a a a 4 4 4 4 4 6 6 6 6 6
    a a a a a 4 4 4 4 4 6 6 6 6 6
    `)

```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```