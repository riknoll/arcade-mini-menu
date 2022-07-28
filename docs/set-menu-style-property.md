# set menu style property

Sets one of the available style options on a MenuSprite.

```sig
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("abc")
)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 0)
```

The available styles include:

* **width** - the width of the menu in pixels. This will cause the menu to scroll if it is smaller than the default width. Defaults to 0
* **height** - the height of the menu in pixels. This will cause the menu to scroll if it is smaller than the default height. Defaults to 0
* **border** - the width of the border of the menu. This can either be a single number (in which case it will apply to all sides) or the output of the `createBorderBox` function. Defaults to 0
* **border color** - sets the color of the menu border. This will not be visible unless the border property is changed. Defaults to 0
* **padding** - the width of the padding around the content of the menu. This can either be a single number (in which case it will apply to all sides) or the output of the `createBorderBox` function. Defaults to 0
* **background color** - sets the color of the menu background. This will not be visible unless the padding property is changed or the menu item style for this menu allow the background to show through (e.g. with margins or a transparent background). Defaults to 0
* **scroll speed** - sets the speed at which text scrolls for the selected menu item if the selected menu item overflows the menu width. Defaults to 150
* **rows** - if set, limits the number of rows that are displayed in the menu before scrolling. Defaults to 0
* **columns** - if set, limits the number of columns that are displayed in the menu before scrolling. Defaults to 0
* **scroll indicator color** - if set, causes a scroll indicator in the specified color to appear next to the menu when the menu can be scrolled in a given direction. Defaults to 0
* **use as template** - if set to any number other than 0, all other MenuSprites will use this MenuSprite's styles as a template. In other words, all menu style properties and menu item properties will be inherited from this MenuSprite unless explicitly set. Defaults to 0

### Changing the menu layout

The **rows** and **columns** styles can be used to control the layout and navigation of the menu. The following configurations are supported:

* Single column menu, scrolling vertically - `rows = 0` and `columns = 0` or `rows = 0` and `columns = 1`
* Single row menu, scrolling horizontally - `rows = 1` and `columns = 0`
* Grid menu, scrolling vertically - `rows >= 1` and `columns >= 1`

Changing the layout will also change how the default control scheme works for the menu.
Single column menus use the up and down buttons to move, single row menus use the left and right buttons to move, and grid menus use all four directions.

To see these layouts in actions, take a look at the examples below!

## Parameters

* **property**: the style option to change
* **value**: a [number](/types/number) to set the style option to

## Example #example

### Single column menu with styling

This example creates a single column menu and applies some style options to it.

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
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 30)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 2)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, miniMenu.createBorderBox(
0,
4,
0,
4
))
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 2)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, miniMenu.createBorderBox(
0,
4,
0,
4
))
```

### Single row menu

This example creates a single row menu that can be scrolled using the left and right buttons

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
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 60)
myMenu.y = 60
myMenu.x = 80
```

### Grid menu

This example creates a 2x2 grid menu that can be scrolled vertically.

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
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 2)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 120)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 40)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 1)
myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 2)
myMenu.y = 60
myMenu.x = 80
```


```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
```