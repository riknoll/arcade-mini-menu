namespace miniMenu {
    export enum Alignment {
        Left,
        Center,
        Right
    }

    export enum StyleProperty {
        //% block="padding"
        Padding,
        //% block="foreground"
        Foreground,
        //% block="background"
        Background,
        //% block="border color"
        BorderColor,
        //% block="border"
        Border,
        //% block="margin"
        Margin,
        //% block="icon-text spacing"
        IconTextSpacing,
        //% block="alignment"
        Alignment,
        //% block="icon only"
        IconOnly
    }


    export class Style {
        _padding: number;
        _foreground: number;
        _background: number;
        _borderColor: number;
        _border: number;
        _margin: number;
        _iconTextSpacing: number;
        _iconOnly: number;
        _alignment: Alignment;

        get padding(): number {
            if (this._padding === undefined) {
                return this.parent.padding;
            }
            return this._padding
        }

        set padding(value: number) {
            this._padding = value;
            _state().onStyleChange(this);
        }

        get foreground(): number {
            if (this._foreground === undefined) {
                return this.parent.foreground;
            }
            return this._foreground
        }

        set foreground(value: number) {
            this._foreground = value;
        }

        get background(): number {
            if (this._background === undefined) {
                return this.parent.background;
            }
            return this._background
        }

        set background(value: number) {
            this._background = value;
        }

        get borderColor(): number {
            if (this._borderColor === undefined) {
                return this.parent.borderColor;
            }
            return this._borderColor
        }

        set borderColor(value: number) {
            this._borderColor = value;
        }

        get border(): number {
            if (this._border === undefined) {
                return this.parent.border;
            }
            return this._border
        }

        set border(value: number) {
            this._border = value;
            _state().onStyleChange(this);
        }

        get margin(): number {
            if (this._margin === undefined) {
                return this.parent.margin;
            }
            return this._margin
        }

        set margin(value: number) {
            this._margin = value;
            _state().onStyleChange(this);
        }

        get iconTextSpacing(): number {
            if (this._iconTextSpacing === undefined) {
                return this.parent.iconTextSpacing;
            }
            return this._iconTextSpacing
        }

        set iconTextSpacing(value: number) {
            this._iconTextSpacing = value;
            _state().onStyleChange(this);
        }

        get iconOnly(): number {
            if (this._iconOnly === undefined) {
                return this.parent.iconOnly;
            }
            return this._iconOnly
        }

        set iconOnly(value: number) {
            this._iconOnly = value;
            _state().onStyleChange(this);
        }

        get alignment(): Alignment {
            if (this._alignment === undefined) {
                return this.parent.alignment;
            }
            return this._alignment
        }

        set alignment(value: Alignment) {
            this._alignment = value;
            _state().onStyleChange(this);
        }

        constructor(public parent?: Style) {
            if (!parent) {
                this._padding = 0;
                this._foreground = 1;
                this._background = 15;
                this._borderColor = 1;
                this._border = 0;
                this._margin = 0;
                this._iconTextSpacing = 0;
                this._iconOnly = 0;
                this._alignment = Alignment.Left
            }
        }

        clone(flattenInheritance = false) {
            const res = new Style();
            if (flattenInheritance) {
                res.padding = this.padding;
                res.foreground = this.foreground;
                res.background = this.background;
                res.borderColor = this.borderColor;
                res.border = this.border;
                res.margin = this.margin;
                res.iconOnly = this.iconOnly;
                res.iconTextSpacing = this.iconTextSpacing;
                res.alignment = this.alignment;
            }
            else {
                res._padding = this._padding;
                res._foreground = this._foreground;
                res._background = this._background;
                res._borderColor = this._borderColor;
                res._border = this._border;
                res._margin = this._margin;
                res._iconOnly = this._iconOnly;
                res._iconTextSpacing = this._iconTextSpacing;
                res._alignment = this._alignment;
                res.parent = this.parent;
            }

            return res;
        }

        copyTo(target: Style) {
            target.padding = this.padding;
            target.foreground = this.foreground;
            target.background = this.background;
            target.borderColor = this.borderColor;
            target.border = this.border;
            target.margin = this.margin;
            target.iconOnly = this.iconOnly;
            target.iconTextSpacing = this.iconTextSpacing;
            target.alignment = this.alignment;
        }

        setProperty(prop: StyleProperty, value: number) {
            switch (prop) {
                case StyleProperty.Padding:
                    this.padding = value;
                    break;
                case StyleProperty.Foreground:
                    this.foreground = value;
                    break;
                case StyleProperty.Background:
                    this.background = value;
                    break;
                case StyleProperty.BorderColor:
                    this.borderColor = value;
                    break;
                case StyleProperty.Border:
                    this.border = value;
                    break;
                case StyleProperty.Margin:
                    this.margin = value;
                    break;
                case StyleProperty.IconTextSpacing:
                    this.iconTextSpacing = value;
                    break;
                case StyleProperty.Alignment:
                    this.alignment = value;
                    break;
                case StyleProperty.IconOnly:
                    this.iconOnly = value;
                    break;
            }
        }
    }

}