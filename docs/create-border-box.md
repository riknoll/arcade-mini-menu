# create border box

Creates a border box with different widths on each side for use with the `set menu style property` and `set style property` functions. This function returns a special number in which the border box widths have been encoded.

```sig
miniMenu.createBorderBox(
0,
0,
0,
0
)
```

This function can be used with the following properties of the `set menu style property` block:

* border
* padding

and these properties from the `set style property` block:

* margin
* border
* padding

## Parameters

* **left** - the width of the border box on the left
* **top** - the width of the border box on the top
* **right** - the width of the border box on the right
* **bottom** - the width of the border box on the bottom

## Example #example

This example creates a menu and gives it a red border with different widths on each side

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
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 2)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, miniMenu.createBorderBox(
1,
2,
4,
8
))

```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```