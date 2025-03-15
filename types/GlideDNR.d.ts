import type { TypeSelected, TypePos, TypeSize, TypeTypeRetisteredList, TypeDirection, TypeTargetType, TypeAlignPosition, TypeReferenceAlignLine, TypeLine } from './types';
type typeProperty = "toolbar" | "measure" | "toolbar-placement" | "actions" | "modify-outside" | "color-primary";
export default class GlideDNR extends HTMLElement {
    private isToolbar;
    private isMeasure;
    private isActions;
    private isModifyOutside;
    private toolbarPlacement;
    private colorPrimary;
    private loadingItems;
    private selected;
    private registered;
    private requestAnimation;
    private elSelectedLines;
    private elSelectedVectors;
    private rDrags;
    private elToolbar;
    private elMeasure;
    private elAligns;
    private elActions;
    private elMeasureOutline;
    private measureTargetId;
    private latestSelected;
    private lastClickTime;
    private isInit;
    private mouseMoveType;
    private hasSelected;
    private hasMoved;
    private isInSelected;
    private mouseTarget;
    private thresholdHorizontal;
    private thresholdVertical;
    private alignVectorsLinesThreshold;
    private elMeasureLines;
    static get observedAttributes(): typeProperty[];
    constructor();
    connectedCallback(): void;
    attributeChangedCallback(property: typeProperty, oldValue: string, newValue: string): void;
    disconnectedCallback(): void;
    adoptedCallback(): void;
    renderHtml(): string;
    /**
     * 一次性绑定元素，后期直接使用
     */
    onceBindings(): void;
    /**
     * 获取 slot 加载元素的数量
     */
    countLoadingItems(): void;
    hideLoading(): void;
    /**
     * 渲染 slot 下元素，为每个元素添加包裹层
     */
    renderItems(): void;
    /**
     * 处理 general 元素
     */
    renderItem(node: any): void;
    /**
     * 处理 image 类型元素
     */
    renderImageItem(node: any): Promise<unknown>;
    initKeyboardEvents(): void;
    /**
     * 监听 slot 改变值后重新渲染 items
     */
    onSlotChange(): void;
    getSelectedParams(): void;
    renderSelectedReference(): void;
    isSelectedItem(item: any, wrapper: TypePos & TypeSize): boolean;
    renderDragSelectReferenceLine(e: any, rootRect: TypePos & TypeSize): void;
    /**
     * 判断某个点是否在矩形范围内
     */
    isPointInRectangle(point: TypePos, rectangle: TypePos & TypeSize): boolean;
    handleClick(): void;
    getTranslatePos(translateString: string): TypePos;
    mouseDownElement(elItem: HTMLDivElement): void;
    mouseUpElement(_registered: TypeTypeRetisteredList): void;
    setToolbarPosition(): void;
    triggerActions(): void;
    /**
     * 移动选中的元素、参考线和顶点
     */
    moveElements(movingPos: TypePos, offsets: TypePos, _registered: TypeTypeRetisteredList): void;
    moveLines(type: TypeTargetType, _registered: TypeTypeRetisteredList, _selected: TypeSelected, mouseStartPos: TypePos, mousePos: TypePos): void;
    moveVectors(type: TypeTargetType, _registered: TypeTypeRetisteredList, _selected: TypeSelected, mouseStartPos: TypePos, mousePos: TypePos, ratio: number): void;
    /**
     * 对齐吸附、参考线和点
     *
     * 思路：
     * 第 1 步：通过对比选中拖拽选中元素组成矩形的 6 条边（左中右 |||、上中下 三），与所有未选中的元素对应的 6 条边，及容器框对应的 6 条边距离，是否小于等于某个阈值（0px，或 3px），获取参与对齐的元素；
     * 第 2 步：根据参与对齐的位置，获取要对齐的边长/宽，及靠近对齐边元素的顶点参数；
     * 第 3 步：渲染对齐边与顶点
     * 第 4 步：根据吸附阈值，移动选中矩形、顶点及内部元素的位置
     *
     */
    referenceAlignLinesVectors(_registered: TypeTypeRetisteredList, _selected: TypeSelected): void;
    /**
     *
     * @param direction
     * @param position 拖拽中，选中项的：左中右或上中下
     * @param _registered
     * @returns
     */
    snap(direction: TypeDirection, gap: TypePos, _registered: TypeTypeRetisteredList): void;
    getElementTranslatePos(el: HTMLDivElement): TypePos;
    generateAlignVector(direction: TypeDirection, position: TypeAlignPosition, pos: TypePos): void;
    triggerAlignVectors(direction: TypeDirection, position: TypeAlignPosition, _registered: TypeTypeRetisteredList): void;
    generateAlignLine(line: TypeReferenceAlignLine): void;
    generateLine(line: TypeLine, classNames: string[]): HTMLDivElement;
    /**
     * 生成对齐线
     *
     * @param direction
     * @param position 拖拽中，选中项的：左中右或上中下
     * @param _registered
     * @returns
     */
    triggerAlignLines(_registered: TypeTypeRetisteredList): void;
    shortcuts(direction: TypeDirection | "", position: TypeAlignPosition | "distribute" | "measure"): void;
    measure(e: any): void;
    measureExecute(): void;
    hideMeasureReferences(): void;
    hideMeasureDeshed(): void;
    triggerSelectedLinesVectors(type: "show" | "hide"): void;
    /**
     * 删除元素
     * 因为元素是外部通过 slot 添加的，所以只能外部来处理，然后自动触发 slotChanged
     */
    delete(): void;
    listenItemEvents(): void;
    init(): void;
}
export {};
