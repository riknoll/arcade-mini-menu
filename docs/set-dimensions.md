# set dimensions

Sets the width and height of the menu sprite. This is the same as setting the width and height using the `set menu style property` function.

Setting the width or height to 0 will result in the menu growing to fit its content.

```sig
miniMenu.createMenuFromArray([]).setDimensions(100, 100)
```

## Parameters

* **width** - the desired width of the menu or 0 for content width
* **height** - the desired height of the menu or 0 for content height

## Example #example

This example creates a menu and sets the dimensions. Notice how this causes the menu to scroll in the y-direction since the height is less than the content height.

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


```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```