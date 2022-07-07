# close

Destroys a menu sprite. This is exactly the same as using the destroy block in the sprites category

```sig
miniMenu.createMenuFromArray([]).close()
```

## Example #example

This example demonstrates how to close a menu when the B button is pressed.

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
myMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
    myMenu.close()
})

```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```