// tests go here; this will not be compiled when this package is used as an extension.
let selection = 0
let myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Hello my name is not lucas"),
    miniMenu.createMenuItem("It's richard! did you forget that?"),
    miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream"),
    miniMenu.createMenuItem("pay attention please")
)
scene.setBackgroundColor(6)
miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.Width, 100)
miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.Height, 40)
myMenu.setPosition(36, 49)
miniMenu.onItemSelected(myMenu, controller.A, function (selection) {
    myMenu.sayText(selection)
})
miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 9)
miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderWidth, 4)
