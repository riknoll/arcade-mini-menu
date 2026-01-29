namespace miniMenu {
    export class ButtonHandlers {
        protected handlers: HandlerBinding[];;

        constructor(public controller: controller.Controller) {
            this.handlers = [];
        }

        onEvent(button: Button, event: ControllerButtonEvent, handler: () => void) {
            const existing = this.getBinding(button, event);
            if (existing) {
                this.unregisterHandlerBinding(existing);
                this.handlers = this.handlers.filter(b => b !== existing);
            }

            const binding = new HandlerBinding(button, event, handler);
            this.handlers.push(binding);
            this.registerHandlerBinding(binding);
        }

        dispose() {
            this.unregisterButtonEvents();
            this.handlers = [];
        }

        setController(ctrl: controller.Controller) {
            this.unregisterButtonEvents();
            this.controller = ctrl;
            this.reRegisterButtonEvents();
        }

        protected unregisterButtonEvents() {
            for (const binding of this.handlers) {
                this.unregisterHandlerBinding(binding);
            }
        }

        protected reRegisterButtonEvents() {
            for (const binding of this.handlers) {
                this.registerHandlerBinding(binding);
            }
        }

        protected registerHandlerBinding(binding: HandlerBinding) {
            const buttonImpl = this.getButtonImpl(binding.button);
            buttonImpl.addEventListener(binding.event, binding.handler);
        }

        protected unregisterHandlerBinding(binding: HandlerBinding) {
            const buttonImpl = this.getButtonImpl(binding.button);
            buttonImpl.removeEventListener(binding.event, binding.handler);
        }

        protected getBinding(button: Button, event: ControllerButtonEvent): HandlerBinding {
            for (const binding of this.handlers) {
                if (binding.button === button && binding.event === event) {
                    return binding;
                }
            }
            return null;
        }

        getButtonImpl(button: Button) {
            return getButton(this.controller, button);
        }
    }

    class HandlerBinding {
        constructor(public button: Button, public event: ControllerButtonEvent, public handler: () => void) {
        }
    }
}