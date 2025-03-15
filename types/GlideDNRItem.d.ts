type typeProperty = "left" | "top" | "width" | "height";
export default class GlideDNRItem extends HTMLElement {
    private els;
    static get observedAttributes(): typeProperty[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(prop: typeProperty, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    renderHtml(): string;
    /**
     * 一次性绑定元素，后期直接使用
     */
    init(): void;
    /**
     * 一次性绑定元素，后期直接使用
     */
    onceBindings(): void;
}
export {};
