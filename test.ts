// tests go here; this will not be compiled when this package is used as an extension.
let selection = 0
let myMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("Hello my name is not lucas", img`
        . . . . . . . 6 . . . . . . . .
        . . . . . . 8 6 6 . . . 6 8 . .
        . . . e e e 8 8 6 6 . 6 7 8 . .
        . . e 2 2 2 2 e 8 6 6 7 6 . . .
        . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
        . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
        e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
        e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
        e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
        e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
        e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
        e 2 2 2 2 2 2 2 4 e 2 e e c . .
        e e 2 e 2 2 4 2 2 e e e c . . .
        e e e e 2 e 2 2 e e e c . . . .
        e e e 2 e e c e c c c . . . . .
        . c c c c c c c . . . . . . . .
    `),
    miniMenu.createMenuItem("It's richard! did you forget that?", img`
        . . . . . . . . . . . 6 6 6 6 6
        . . . . . . . . . 6 6 7 7 7 7 8
        . . . . . . 8 8 8 7 7 8 8 6 8 8
        . . e e e e c 6 6 8 8 . 8 7 8 .
        . e 2 5 4 2 e c 8 . . . 6 7 8 .
        e 2 4 2 2 2 2 2 c . . . 6 7 8 .
        e 2 2 2 2 2 2 2 c . . . 8 6 8 .
        e 2 e e 2 2 2 2 e e e e c 6 8 .
        c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
        . c 2 e e e 2 e 2 4 2 2 2 2 c .
        . . c 2 2 2 e e 2 2 2 2 2 2 2 e
        . . . e c c e c 2 2 2 2 2 2 2 e
        . . . . . . . c 2 e e 2 2 e 2 c
        . . . . . . . c e e e e e e 2 c
        . . . . . . . . c e 2 2 2 2 c .
        . . . . . . . . . c c c c c . .
    `),
    miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream"),
    miniMenu.createMenuItem("pay attention please")
)
scene.setBackgroundColor(6)
miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.Width, 40)
miniMenu.setMenuStyleProperty(myMenu, miniMenu.MenuStyleProperty.Height, 40)
myMenu.setPosition(36, 49)
miniMenu.onItemSelected(myMenu, controller.A, function (selection) {
    myMenu.sayText(selection)
})
// miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 9)
// miniMenu.setStyleProperty(myMenu, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderWidth, 4)
