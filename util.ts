namespace miniMenu {
    export function unpackMargin(margin: number, direction: MoveDirection) {
        if (margin < 0xff) {
            return margin;
        }

        switch (direction) {
            case MoveDirection.Up:
                return (margin & 0xff) - 1
            case MoveDirection.Right:
                return ((margin >> 8) & 0xff) - 1
            case MoveDirection.Down:
                return ((margin >> 16) & 0xff) - 1
            case MoveDirection.Left:
                return ((margin >> 24) & 0xff) - 1
        }

        return margin;
    }

    export function packMargin(left: number, top: number, right: number, bottom: number) {
        return ((top + 1) & 0xff) | (((right + 1) & 0xff) << 8) | (((bottom + 1) & 0xff) << 16) | (((left + 1) & 0xff) << 24)
    }
}