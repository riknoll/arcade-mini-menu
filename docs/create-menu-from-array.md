# create menu from array

Creates a MenuSprite from an array of MenuItems

```sig
miniMenu.createMenuFromArray([])
```

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