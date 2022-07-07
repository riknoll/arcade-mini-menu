# set button events enabled

Controls whether or not button events are enabled on this menu sprite. Setting this to false will also disable the default button behavior of changing the menu selection when a button is pressed.

```sig
miniMenu.createMenuFromArray([]).setButtonEventsEnabled(false)
```

## Parameters

* **enabled** - if true, button events will work as normal. If false, they will be disabled

## Example #example

This example toggles whether button events are enabled whenever the menu button is pressed. It also changes the selected style of the menu to indicate that controls are disabled.

```blocks
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    enabled = !(enabled)
    myMenu.setButtonEventsEnabled(enabled)
    if (enabled) {
        myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 3)
    } else {
        myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 11)
    }
})
let enabled = false
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
enabled = true


```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```