namespace miniMenu {
    export enum MenuStyleProperty {
        //% block="width"
        Width,
        //% block="height"
        Height,
        //% block="border"
        Border,
        //% block="border color"
        BorderColor,
        //% block="padding"
        Padding,
        //% block="background color"
        BackgroundColor,
        //% block="scroll speed"
        ScrollSpeed,
        //% block="rows"
        Rows,
        //% block="columns"
        Columns,
        //% block="scroll indicator"
        ScrollIndicatorColor,
        //% block="use as template"
        UseAsTemplate,
        //% block="allow selecting disabled items"
        DisabledItemsSelectable
    }


    export class MenuStyle {
        _customWidth: number;
        _customHeight: number;
        _scrollSpeed: number;
        _columns: number;
        _rows: number;
        _border: number;
        _borderColor: number;
        _padding: number;
        _backgroundColor: number;
        _scrollColor: number;
        _disabledItemsSelectable: boolean;

        constructor(public parent?: MenuStyle) {
            if (!parent) {
                this._scrollSpeed = 150;
                this._columns = 0;
                this._rows = 0;
                this._backgroundColor = 0;
                this._border = 0;
                this._padding = 0;
                this._borderColor = 0;
                this._disabledItemsSelectable = false;
            }
        }

        get customWidth(): number {
            if (this.parent && this._customWidth === undefined) {
                return this.parent.customWidth;
            }
            return this._customWidth;
        }

        set customWidth(value: number) {
            this._customWidth = value;
            _state().onMenuStyleChange(this);
        }

        get customHeight(): number {
            if (this.parent && this._customHeight === undefined) {
                return this.parent.customHeight;
            }
            return this._customHeight;
        }

        set customHeight(value: number) {
            this._customHeight = value;
            _state().onMenuStyleChange(this);
        }

        get scrollSpeed(): number {
            if (this.parent && this._scrollSpeed === undefined) {
                return this.parent.scrollSpeed;
            }
            return this._scrollSpeed;
        }

        set scrollSpeed(value: number) {
            this._scrollSpeed = value;
        }

        get columns(): number {
            if (this.parent && this._columns === undefined) {
                return this.parent.columns;
            }
            return this._columns;
        }

        set columns(value: number) {
            this._columns = value;
            _state().onMenuStyleChange(this);
        }

        get rows(): number {
            if (this.parent && this._rows === undefined) {
                return this.parent.rows;
            }
            return this._rows;
        }

        set rows(value: number) {
            this._rows = value;
            _state().onMenuStyleChange(this);
        }

        get border(): number {
            if (this.parent && this._border === undefined) {
                return this.parent.border;
            }
            return this._border;
        }

        set border(value: number) {
            this._border = value;
            _state().onMenuStyleChange(this);
        }

        get borderColor(): number {
            if (this.parent && this._borderColor === undefined) {
                return this.parent.borderColor;
            }
            return this._borderColor;
        }

        set borderColor(value: number) {
            this._borderColor = value;
        }

        get padding(): number {
            if (this.parent && this._padding === undefined) {
                return this.parent.padding;
            }
            return this._padding;
        }

        set padding(value: number) {
            this._padding = value;
            _state().onMenuStyleChange(this);
        }

        get backgroundColor(): number {
            if (this.parent && this._backgroundColor === undefined) {
                return this.parent.backgroundColor;
            }
            return this._backgroundColor;
        }

        set backgroundColor(value: number) {
            this._backgroundColor = value;
        }

        get scrollColor(): number {
            if (this.parent && this._scrollColor === undefined) {
                return this.parent.scrollColor;
            }
            return this._scrollColor;
        }

        set scrollColor(value: number) {
            this._scrollColor = value;
        }

        get disabledItemsSelectable(): boolean {
            if (this.parent && this._disabledItemsSelectable === undefined) {
                return this.parent.disabledItemsSelectable;
            }
            return this._disabledItemsSelectable;
        }

        set disabledItemsSelectable(value: boolean) {
            this._disabledItemsSelectable = value;
        }

        setMenuStyleProperty(property: MenuStyleProperty, value: number) {
            switch (property) {
                case MenuStyleProperty.Width:
                    this.customWidth = value;
                    break;
                case MenuStyleProperty.Height:
                    this.customHeight = value;
                    break;
                case MenuStyleProperty.ScrollSpeed:
                    this.scrollSpeed = value;
                    break;
                case MenuStyleProperty.Columns:
                    this.columns = Math.max(value | 0, 0);
                    break;
                case MenuStyleProperty.Rows:
                    this.rows = Math.max(value | 0, 0);
                    break;
                case MenuStyleProperty.Border:
                    this.border = value | 0;
                    break;
                case MenuStyleProperty.Padding:
                    this.padding = value | 0;
                    break;
                case MenuStyleProperty.BorderColor:
                    this.borderColor = value | 0;
                    break;
                case MenuStyleProperty.BackgroundColor:
                    this.backgroundColor = value | 0;
                    break;
                case MenuStyleProperty.ScrollIndicatorColor:
                    this.scrollColor = value | 0;
                    break;
                case MenuStyleProperty.DisabledItemsSelectable:
                    this.disabledItemsSelectable = !!value;
                    break;
            }
        }

        copyTo(target: MenuStyle) {
            target.customWidth = this.customWidth;
            target.customHeight = this.customHeight;
            target.scrollSpeed = this.scrollSpeed;
            target.columns = this.columns;
            target.rows = this.rows;
            target.border = this.border;
            target.borderColor = this.borderColor;
            target.padding = this.padding;
            target.backgroundColor = this.backgroundColor;
            target.scrollColor = this.scrollColor;
            target.disabledItemsSelectable = this.disabledItemsSelectable;
        }
    }

}