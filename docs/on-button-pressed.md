# on button pressed

Runs some code when a button is pressed while this MenuSprite is not destroyed or closed.
Each MenuSprite can only have one event handler for each button.
Using this function with one of the direction buttons will override the default behavior for that direction.
The `set button events enabled` block can also be used to control if these events run or not.

```sig
miniMenu.createMenuFromArray([]).onButtonPressed(controller.A, function (selection, selectedIndex) {

})
```

## Parameters

* **button** - the button that, when pressed, will cause the code to run
* **selection** the text of the currently selected menu item. This can be dragged out of the block and used within the event handler
* **selectionIndex** the index of the currently selected menu item. This can be dragged out of the block and used within the event handler

## Example #example

### Selecting an item

This example creates a menu and uses a button event to close it and splash the selected value to the screen.

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
myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
    myMenu.close()
    game.splash(selection)
})

```

### Overriding default behavior

This example overrides the default behavior for the up button. Notice how pressing up no longer moves the selection for the menu, but pressing down still works.

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
myMenu.onButtonPressed(controller.up, function (selection, selectedIndex) {

})

```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```