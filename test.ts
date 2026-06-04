// tests go here; this will not be compiled when this package is used as an extension.
game.stats = true;
// let selection = 0
// let myMenu = miniMenu.createMenu(
//     miniMenu.createMenuItem("Hello my name is not lucas", ), /* img`
//         . . . . . . . 6 . . . . . . . .
//         . . . . . . 8 6 6 . . . 6 8 . .
//         . . . e e e 8 8 6 6 . 6 7 8 . .
//         . . e 2 2 2 2 e 8 6 6 7 6 . . .
//         . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
//         . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
//         e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
//         e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
//         e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
//         e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
//         e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
//         e 2 2 2 2 2 2 2 4 e 2 e e c . .
//         e e 2 e 2 2 4 2 2 e e e c . . .
//         e e e e 2 e 2 2 e e e c . . . .
//         e e e 2 e e c e c c c . . . . .
//         . c c c c c c c . . . . . . . .
//     `),*/
//     miniMenu.createMenuItem("It's richard! did you forget that?", img`
//         . . . . . . . . . . . 6 6 6 6 6
//         . . . . . . . . . 6 6 7 7 7 7 8
//         . . . . . . 8 8 8 7 7 8 8 6 8 8
//         . . e e e e c 6 6 8 8 . 8 7 8 .
//         . e 2 5 4 2 e c 8 . . . 6 7 8 .
//         e 2 4 2 2 2 2 2 c . . . 6 7 8 .
//         e 2 2 2 2 2 2 2 c . . . 8 6 8 .
//         e 2 e e 2 2 2 2 e e e e c 6 8 .
//         c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
//         . c 2 e e e 2 e 2 4 2 2 2 2 c .
//         . . c 2 2 2 e e 2 2 2 2 2 2 2 e
//         . . . e c c e c 2 2 2 2 2 2 2 e
//         . . . . . . . c 2 e e 2 2 e 2 c
//         . . . . . . . c e e e e e e 2 c
//         . . . . . . . . c e 2 2 2 2 c .
//         . . . . . . . . . c c c c c . .
//     `),
//     miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream"),
//     miniMenu.createMenuItem("pay attention please")
// )
// scene.setBackgroundColor(6)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 80)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 20)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
// myMenu.setPosition(36, 10)
// myMenu.onButtonPressed(miniMenu.Button.A, function (selection) {
//     myMenu.sayText(selection)
// })
// // myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderColor, 9)
// // myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.BorderWidth, 4)

// myMenu = miniMenu.createMenu(
//     miniMenu.createMenuItem("Hello my name is not lucas", img`
//         . . . . . . . 6 . . . . . . . .
//         . . . . . . 8 6 6 . . . 6 8 . .
//         . . . e e e 8 8 6 6 . 6 7 8 . .
//         . . e 2 2 2 2 e 8 6 6 7 6 . . .
//         . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
//         . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
//         e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
//         e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
//         e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
//         e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
//         e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
//         e 2 2 2 2 2 2 2 4 e 2 e e c . .
//         e e 2 e 2 2 4 2 2 e e e c . . .
//         e e e e 2 e 2 2 e e e c . . . .
//         e e e 2 e e c e c c c . . . . .
//         . c c c c c c c . . . . . . . .
//     `),
//     miniMenu.createMenuItem("It's richard! did you forget that?", img`
//         . . . . . . . . . . . 6 6 6 6 6
//         . . . . . . . . . 6 6 7 7 7 7 8
//         . . . . . . 8 8 8 7 7 8 8 6 8 8
//         . . e e e e c 6 6 8 8 . 8 7 8 .
//         . e 2 5 4 2 e c 8 . . . 6 7 8 .
//         e 2 4 2 2 2 2 2 c . . . 6 7 8 .
//         e 2 2 2 2 2 2 2 c . . . 8 6 8 .
//         e 2 e e 2 2 2 2 e e e e c 6 8 .
//         c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
//         . c 2 e e e 2 e 2 4 2 2 2 2 c .
//         . . c 2 2 2 e e 2 2 2 2 2 2 2 e
//         . . . e c c e c 2 2 2 2 2 2 2 e
//         . . . . . . . c 2 e e 2 2 e 2 c
//         . . . . . . . c e e e e e e 2 c
//         . . . . . . . . c e 2 2 2 2 c .
//         . . . . . . . . . c c c c c . .
//     `),
//     miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream"),
//     miniMenu.createMenuItem("pay attention please")
// )
// scene.setBackgroundColor(6)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 80)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 40)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
// myMenu.setPosition(36, 32)
// myMenu.onButtonPressed(miniMenu.Button.A, function (selection) {
//     myMenu.sayText(selection)
// })

// myMenu = miniMenu.createMenu(
//     miniMenu.createMenuItem("Hello my name is not lucas", img`
//         . . . . . . . 6 . . . . . . . .
//         . . . . . . 8 6 6 . . . 6 8 . .
//         . . . e e e 8 8 6 6 . 6 7 8 . .
//         . . e 2 2 2 2 e 8 6 6 7 6 . . .
//         . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
//         . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
//         e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
//         e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
//         e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
//         e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
//         e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
//         e 2 2 2 2 2 2 2 4 e 2 e e c . .
//         e e 2 e 2 2 4 2 2 e e e c . . .
//         e e e e 2 e 2 2 e e e c . . . .
//         e e e 2 e e c e c c c . . . . .
//         . c c c c c c c . . . . . . . .
//     `),
//     miniMenu.createMenuItem("It's richard! did you forget that?", img`
//         . . . . . . . . . . . 6 6 6 6 6
//         . . . . . . . . . 6 6 7 7 7 7 8
//         . . . . . . 8 8 8 7 7 8 8 6 8 8
//         . . e e e e c 6 6 8 8 . 8 7 8 .
//         . e 2 5 4 2 e c 8 . . . 6 7 8 .
//         e 2 4 2 2 2 2 2 c . . . 6 7 8 .
//         e 2 2 2 2 2 2 2 c . . . 8 6 8 .
//         e 2 e e 2 2 2 2 e e e e c 6 8 .
//         c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
//         . c 2 e e e 2 e 2 4 2 2 2 2 c .
//         . . c 2 2 2 e e 2 2 2 2 2 2 2 e
//         . . . e c c e c 2 2 2 2 2 2 2 e
//         . . . . . . . c 2 e e 2 2 e 2 c
//         . . . . . . . c e e e e e e 2 c
//         . . . . . . . . c e 2 2 2 2 c .
//         . . . . . . . . . c c c c c . .
//     `),
//     miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream", img`
//         . . . . . . . e c 7 . . . . . .
//         . . . . e e e c 7 7 e e . . . .
//         . . c e e e e c 7 e 2 2 e e . .
//         . c e e e e e c 6 e e 2 2 2 e .
//         . c e e e 2 e c c 2 4 5 4 2 e .
//         c e e e 2 2 2 2 2 2 4 5 5 2 2 e
//         c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
//         . e e e 2 2 2 2 2 2 2 2 2 4 e .
//         . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
//         . . 2 e e 2 2 2 2 2 4 4 2 e . .
//         . . . 2 2 e e 4 4 4 2 e e . . .
//         . . . . . 2 2 e e e e . . . . .
//     `),
//     miniMenu.createMenuItem("pay attention please", img`
//         4 4 4 . . 4 4 4 4 4 . . . . . .
//         4 5 5 4 4 5 5 5 5 5 4 4 . . . .
//         b 4 5 5 1 5 1 1 1 5 5 5 4 . . .
//         . b 5 5 5 5 1 1 5 5 1 1 5 4 . .
//         . b d 5 5 5 5 5 5 5 5 1 1 5 4 .
//         b 4 5 5 5 5 5 5 5 5 5 5 1 5 4 .
//         c d 5 5 5 5 5 5 5 5 5 5 5 5 5 4
//         c d 4 5 5 5 5 5 5 5 5 5 5 1 5 4
//         c 4 5 5 5 d 5 5 5 5 5 5 5 5 5 4
//         c 4 d 5 4 5 d 5 5 5 5 5 5 5 5 4
//         . c 4 5 5 5 5 d d d 5 5 5 5 5 b
//         . c 4 d 5 4 5 d 4 4 d 5 5 5 4 c
//         . . c 4 4 d 4 4 4 4 4 d d 5 d c
//         . . . c 4 4 4 4 4 4 4 4 5 5 5 4
//         . . . . c c b 4 4 4 b b 4 5 4 4
//         . . . . . . c c c c c c b b 4 .
//     `)
// )
// scene.setBackgroundColor(6)
// myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.IconOnly, 1)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 20)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 20)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
// myMenu.setPosition(140, 60)
// myMenu.onButtonPressed(miniMenu.Button.A, function (selection) {
//     myMenu.sayText(selection)
// })

// myMenu = miniMenu.createMenu(
//     miniMenu.createMenuItem("Hello my name is not lucas", img`
//         . . . . . . . 6 . . . . . . . .
//         . . . . . . 8 6 6 . . . 6 8 . .
//         . . . e e e 8 8 6 6 . 6 7 8 . .
//         . . e 2 2 2 2 e 8 6 6 7 6 . . .
//         . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
//         . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
//         e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
//         e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
//         e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
//         e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
//         e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
//         e 2 2 2 2 2 2 2 4 e 2 e e c . .
//         e e 2 e 2 2 4 2 2 e e e c . . .
//         e e e e 2 e 2 2 e e e c . . . .
//         e e e 2 e e c e c c c . . . . .
//         . c c c c c c c . . . . . . . .
//     `),
//     miniMenu.createMenuItem("It's richard! did you forget that?", img`
//         . . . . . . . . . . . 6 6 6 6 6
//         . . . . . . . . . 6 6 7 7 7 7 8
//         . . . . . . 8 8 8 7 7 8 8 6 8 8
//         . . e e e e c 6 6 8 8 . 8 7 8 .
//         . e 2 5 4 2 e c 8 . . . 6 7 8 .
//         e 2 4 2 2 2 2 2 c . . . 6 7 8 .
//         e 2 2 2 2 2 2 2 c . . . 8 6 8 .
//         e 2 e e 2 2 2 2 e e e e c 6 8 .
//         c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
//         . c 2 e e e 2 e 2 4 2 2 2 2 c .
//         . . c 2 2 2 e e 2 2 2 2 2 2 2 e
//         . . . e c c e c 2 2 2 2 2 2 2 e
//         . . . . . . . c 2 e e 2 2 e 2 c
//         . . . . . . . c e e e e e e 2 c
//         . . . . . . . . c e 2 2 2 2 c .
//         . . . . . . . . . c c c c c . .
//     `),
//     miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream", img`
//         . . . . . . . e c 7 . . . . . .
//         . . . . e e e c 7 7 e e . . . .
//         . . c e e e e c 7 e 2 2 e e . .
//         . c e e e e e c 6 e e 2 2 2 e .
//         . c e e e 2 e c c 2 4 5 4 2 e .
//         c e e e 2 2 2 2 2 2 4 5 5 2 2 e
//         c e e 2 2 2 2 2 2 2 2 4 4 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 2 2 e
//         c e e 2 2 2 2 2 2 2 2 2 2 4 2 e
//         . e e e 2 2 2 2 2 2 2 2 2 4 e .
//         . 2 e e 2 2 2 2 2 2 2 2 4 2 e .
//         . . 2 e e 2 2 2 2 2 4 4 2 e . .
//         . . . 2 2 e e 4 4 4 2 e e . . .
//         . . . . . 2 2 e e e e . . . . .
//     `),
//     miniMenu.createMenuItem("pay attention please", img`
//         4 4 4 . . 4 4 4 4 4 . . . . . .
//         4 5 5 4 4 5 5 5 5 5 4 4 . . . .
//         b 4 5 5 1 5 1 1 1 5 5 5 4 . . .
//         . b 5 5 5 5 1 1 5 5 1 1 5 4 . .
//         . b d 5 5 5 5 5 5 5 5 1 1 5 4 .
//         b 4 5 5 5 5 5 5 5 5 5 5 1 5 4 .
//         c d 5 5 5 5 5 5 5 5 5 5 5 5 5 4
//         c d 4 5 5 5 5 5 5 5 5 5 5 1 5 4
//         c 4 5 5 5 d 5 5 5 5 5 5 5 5 5 4
//         c 4 d 5 4 5 d 5 5 5 5 5 5 5 5 4
//         . c 4 5 5 5 5 d d d 5 5 5 5 5 b
//         . c 4 d 5 4 5 d 4 4 d 5 5 5 4 c
//         . . c 4 4 d 4 4 4 4 4 d d 5 d c
//         . . . c 4 4 4 4 4 4 4 4 5 5 5 4
//         . . . . c c b 4 4 4 b b 4 5 4 4
//         . . . . . . c c c c c c b b 4 .
//     `)
// )
// scene.setBackgroundColor(6)
// myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.IconOnly, 1)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 20)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 20)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
// myMenu.setPosition(140, 90)
// myMenu.onButtonPressed(miniMenu.Button.A, function (selection) {
//     myMenu.sayText(selection)
// })

// myMenu = miniMenu.createMenu(
//     miniMenu.createMenuItem("Hello my name is not lucas", img`
//         . . . . . . . 6 . . . . . . . .
//         . . . . . . 8 6 6 . . . 6 8 . .
//         . . . e e e 8 8 6 6 . 6 7 8 . .
//         . . e 2 2 2 2 e 8 6 6 7 6 . . .
//         . e 2 2 4 4 2 7 7 7 7 7 8 6 . .
//         . e 2 4 4 2 6 7 7 7 6 7 6 8 8 .
//         e 2 4 5 2 2 6 7 7 6 2 7 7 6 . .
//         e 2 4 4 2 2 6 7 6 2 2 6 7 7 6 .
//         e 2 4 2 2 2 6 6 2 2 2 e 7 7 6 .
//         e 2 4 2 2 4 2 2 2 4 2 2 e 7 6 .
//         e 2 4 2 2 2 2 2 2 2 2 2 e c 6 .
//         e 2 2 2 2 2 2 2 4 e 2 e e c . .
//         e e 2 e 2 2 4 2 2 e e e c . . .
//         e e e e 2 e 2 2 e e e c . . . .
//         e e e 2 e e c e c c c . . . . .
//         . c c c c c c c . . . . . . . .
//     `),
//     miniMenu.createMenuItem("It's richard! did you forget that?", img`
//         . . . . . . . . . . . 6 6 6 6 6
//         . . . . . . . . . 6 6 7 7 7 7 8
//         . . . . . . 8 8 8 7 7 8 8 6 8 8
//         . . e e e e c 6 6 8 8 . 8 7 8 .
//         . e 2 5 4 2 e c 8 . . . 6 7 8 .
//         e 2 4 2 2 2 2 2 c . . . 6 7 8 .
//         e 2 2 2 2 2 2 2 c . . . 8 6 8 .
//         e 2 e e 2 2 2 2 e e e e c 6 8 .
//         c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
//         . c 2 e e e 2 e 2 4 2 2 2 2 c .
//         . . c 2 2 2 e e 2 2 2 2 2 2 2 e
//         . . . e c c e c 2 2 2 2 2 2 2 e
//         . . . . . . . c 2 e e 2 2 e 2 c
//         . . . . . . . c e e e e e e 2 c
//         . . . . . . . . c e 2 2 2 2 c .
//         . . . . . . . . . c c c c c . .
//     `),
//     miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream"),
//     miniMenu.createMenuItem("pay attention please"),
//     miniMenu.createMenuItem("I mean... I say it at the beginning and end of every stream"),
//     // miniMenu.createMenuItem("hi")
// )
// scene.setBackgroundColor(6)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 80)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 40)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns, 2)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 2)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 2)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, miniMenu.packMargin(1, 2, 3, 4))
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Padding, miniMenu.packMargin(1, 2, 3, 4))
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 3)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 2)
// // myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Padding, 1)
// // myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.BorderColor, 15)
// // myMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Border, miniMenu.packMargin(0, 1, 2, 3))
// myMenu.setPosition(36, 74)
// myMenu.onButtonPressed(miniMenu.Button.A, function (selection) {
//     myMenu.sayText(selection)
// })

// // myMenu.setMenuTitle("title")

// let testMargin = miniMenu.packMargin(0, 1, 2, 3);


// myMenu = miniMenu.createMenu(
//     miniMenu.createMenuItem("Sunday"),
//     miniMenu.createMenuItem("Monday"),
//     miniMenu.createMenuItem("Tuesday"),
//     miniMenu.createMenuItem("Wednesday"),
//     miniMenu.createMenuItem("Thursday"),
//     miniMenu.createMenuItem("Friday"),
//     miniMenu.createMenuItem("Saturday")
// )
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 1)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Height, 40)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 60)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.ScrollIndicatorColor, 2)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 100)

// myMenu.setFrame(img`
//     . . . a a a a a a a a a . . .
//     . . a a a a a a a a a a a . .
//     . a a a a a a a a a a a a a .
//     a a a a a c c c c c a a a a c
//     a a a a c 1 1 1 1 1 c a a a c
//     a a a c 1 1 1 1 1 1 1 a a a c
//     a a a c 1 1 1 1 1 1 1 a a a c
//     a a a c 1 1 1 1 1 1 1 a a a c
//     a a a c 1 1 1 1 1 1 1 a a a c
//     a a a c 1 1 1 1 1 1 1 a a a c
//     a a a a a 1 1 1 1 1 a a a a c
//     a a a a a a a a a a a a a a c
//     . a a a a a a a a a a a a c .
//     . . c a a a a a a a a a c . .
//     . . . c c c c c c c c c . . .
// `)



// myMenu.y = 60
// myMenu.x = 80


// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.UseAsTemplate, 1)
// // myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Width, 40)
// // myMenu.say(`x: ${myMenu.x} l: ${myMenu.left} w: ${myMenu.width}`)


// myMenu = miniMenu.createMenu(
//     miniMenu.createMenuItem("+"),
//     miniMenu.createMenuItem("-"),
//     miniMenu.createMenuItem("x"),
//     miniMenu.createMenuItem(":"),
//     miniMenu.createMenuItem("?")
// )
// myMenu.setController(controller.player2)

// myMenu.onButtonPressed(miniMenu.Button.A, function (selection, selectedIndex) {
//     myMenu.close()
// })
// myMenu.x = 150
// myMenu.y = 30
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border, 1)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor, 1)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.Padding, 1)
// myMenu.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor, 5)
// myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
// myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 3)


let mm = miniMenu.createMenu(
miniMenu.createMenuItem("Item"),
miniMenu.createMenuItem("Fight"),
miniMenu.createMenuItem("Run"),
miniMenu.createMenuItem("Pray"),
miniMenu.createMenuItem("Wish"),
miniMenu.createMenuItem("Eat")
)
miniMenu.getMenuItem(mm, 2).setDisabled(true)
// miniMenu.setMenuStyleProperty(mm, miniMenu.MenuStyleProperty.DisabledItemsSelectable, 1)
miniMenu.onButtonPressed(mm, miniMenu.Button.B, function (selection, selectedIndex) {
    miniMenu.removeMenuItem(mm, selectedIndex)
})
miniMenu.setDimensions(mm, 60, 80)
mm.left = 4
mm.top = 4

// Demonstrate fancy-text fonts on a menu. The title uses one font, the
// menu items use another, and the disabled item inherits the default font
// while the selected item gets a third, bolder font.
let fancyMenu = miniMenu.createMenu(
miniMenu.createMenuItem("New Game"),
miniMenu.createMenuItem("Continue"),
miniMenu.createMenuItem("Load Save", null, true),
miniMenu.createMenuItem("Options"),
miniMenu.createMenuItem("Credits"),
miniMenu.createMenuItem("This is a long entry that scrolls")
)
miniMenu.setTitle(fancyMenu, "Main Menu")
miniMenu.setStyleFont(fancyMenu, miniMenu.StyleKind.Title, fancyText.gothic_large)
miniMenu.setStyleFont(fancyMenu, miniMenu.StyleKind.DefaultAndSelected, fancyText.geometric_sans_7)
miniMenu.setStyleFont(fancyMenu, miniMenu.StyleKind.Selected, fancyText.bold_sans_7)
miniMenu.setStyleFont(fancyMenu, miniMenu.StyleKind.Disabled, fancyText.italic_small)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.Title, miniMenu.StyleProperty.Foreground, 5)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.Title, miniMenu.StyleProperty.Background, 1)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.Default, miniMenu.StyleProperty.Foreground, 15)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.Default, miniMenu.StyleProperty.Background, 1)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Foreground, 1)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 5)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.Disabled, miniMenu.StyleProperty.Foreground, 11)
miniMenu.setStyleProperty(fancyMenu, miniMenu.StyleKind.All, miniMenu.StyleProperty.Padding, 1)
miniMenu.setMenuStyleProperty(fancyMenu, miniMenu.MenuStyleProperty.BackgroundColor, 1)
miniMenu.setMenuStyleProperty(fancyMenu, miniMenu.MenuStyleProperty.Border, 1)
miniMenu.setMenuStyleProperty(fancyMenu, miniMenu.MenuStyleProperty.BorderColor, 5)
miniMenu.setMenuStyleProperty(fancyMenu, miniMenu.MenuStyleProperty.Padding, 2)
miniMenu.setMenuStyleProperty(fancyMenu, miniMenu.MenuStyleProperty.ScrollIndicatorColor, 5)
miniMenu.setDimensions(fancyMenu, 86, 80)
fancyMenu.right = 156
fancyMenu.top = 4
miniMenu.setButtonEventsEnabled(mm, false)
miniMenu.onButtonPressed(fancyMenu, miniMenu.Button.A, function (selection, selectedIndex) {
    game.splash(selection)
})
