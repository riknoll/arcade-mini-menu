# create menu from array

Creates a MenuSprite from an array of MenuItems

```sig
miniMenu.createMenuFromArray([])
```

After you create the MenuSprite, any changes to the array passed into this function will affect the MenuSprite.
That makes this function great to use for something like a player inventory which may gain or lose items over time.

## Parameters

* **items** - an array of MenuItems to populate the menu with

## Example #example

This example creates a menu from an array of the days of the week

```blocks
let myMenu = miniMenu.createMenuFromArray([
miniMenu.createMenuItem("Sunday"),
miniMenu.createMenuItem("Monday"),
miniMenu.createMenuItem("Tuesday"),
miniMenu.createMenuItem("Wednesday"),
miniMenu.createMenuItem("Thursday"),
miniMenu.createMenuItem("Friday"),
miniMenu.createMenuItem("Saturday")
])
```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```