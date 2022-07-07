# move selection

Moves the selection of the menu in the given direction. This is useful for implementing your own custom menu controls.

```sig
miniMenu.createMenuFromArray([]).moveSelection(miniMenu.MoveDirection.Up)
```

For some menu layouts, some movement directions will have no effect:

* Single column menu - can only move up and down
* Single row menu - can only move left and right
* Grid menu - can move in all directions

For more on menu layouts, see the `set menu style property` function.

## Parameters

* **direction** - the direction to move the selection in

## Example #example

This example uses the move selection block with the controller repeat events so that holding a button causes the selection to move quickly.

```blocks
controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    myMenu.moveSelection(miniMenu.MoveDirection.Up)
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    myMenu.moveSelection(miniMenu.MoveDirection.Down)
})
let myMenu: miniMenu.MenuSprite = null
myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("Sunday"),
miniMenu.createMenuItem("Monday"),
miniMenu.createMenuItem("Tuesday"),
miniMenu.createMenuItem("Wednesday"),
miniMenu.createMenuItem("Thursday"),
miniMenu.createMenuItem("Friday"),
miniMenu.createMenuItem("Saturday")
)

```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```