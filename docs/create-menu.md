# create menu

Creates a MenuSprite with up to 12 MenuItems. If you need more than 12 items, use `create menu from array` instead.

```sig
miniMenu.createMenu(
miniMenu.createMenuItem("Sunday")
)
```

## Parameters

* **item1** - a MenuItem to include in the array
* **item2** - a MenuItem to include in the array
* **item3** - a MenuItem to include in the array
* **item4** - a MenuItem to include in the array
* **item5** - a MenuItem to include in the array
* **item6** - a MenuItem to include in the array
* **item7** - a MenuItem to include in the array
* **item8** - a MenuItem to include in the array
* **item9** - a MenuItem to include in the array
* **item10** - a MenuItem to include in the array
* **item11** - a MenuItem to include in the array
* **item12** - a MenuItem to include in the array

## Example #example

This example creates a menu with the days of the week

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
```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```