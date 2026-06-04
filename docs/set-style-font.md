# set style font

Sets the font used to draw the text for a part of a MenuSprite. The font can be any font from the [arcade-fancy-text](https://github.com/riknoll/arcade-fancy-text) extension. Pass `null` to clear the font and use the default arcade font instead.

```sig
let myMenu = miniMenu.createMenu(
miniMenu.createMenuItem("abc")
)
miniMenu.setStyleFont(myMenu, miniMenu.StyleKind.Default, fancyText.defaultArcade)
```

### Style targets

There are four types of styles that the font can be set on:

* **default** - the font for menu items that are not selected
* **selected** - the font for the currently selected menu item
* **title** - the font for the title that appears above the menu (only visible if a title is set)
* **disabled** - the font for menu items that have been disabled

You can also use **default and selected** to set the font on both at once, or **all** to set the font on every style.

## Parameters

* **menu**: the MenuSprite to set the font on
* **kind**: the part of the MenuSprite to set the font for
* **font**: the [fancyText](https://github.com/riknoll/arcade-fancy-text) font to use, or `null` to use the default arcade font

## Example #example

### Custom menu font

This example uses one of the fonts from the arcade-fancy-text extension for all of the menu text.

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
miniMenu.setStyleFont(myMenu, miniMenu.StyleKind.All, fancyText.geometric_sans_7)
```

```package
arcade-mini-menu=github:riknoll/arcade-mini-menu
arcade-fancy-text=github:riknoll/arcade-fancy-text
```
