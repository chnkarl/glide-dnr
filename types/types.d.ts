export type TypeObj = {
    [key: string]: any;
};
export type TypePos = {
    x: number;
    y: number;
};
export type TypeSize = {
    width: number;
    height: number;
};
export type TypeRetisteredItem = {
    id: string;
    el: HTMLDivElement;
    type: "general" | "image" | "main";
} & TypePos & TypeSize;
export type TypeTypeRetisteredList = {
    [key: string]: TypeRetisteredItem;
};
export type TypeNode = {
    id: string;
    type: "node" | "group";
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    zIndex?: number;
    element: Element;
};
export type TypeNodes = {
    [key: string]: TypeNode;
};
export type TypeNodeType = "node" | "vector" | "group" | "line" | "";
export type TypeReferenceLine = "top" | "bottom" | "left" | "right" | "";
export type TypeReferenceDot = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "";
export type TypeMouseEventParams = {
    trigger?: any;
    triggerPos?: TypePos;
    selectedNode?: any;
    selectedNodePos?: TypePos & TypeSize;
    selectedNodeRatio?: number;
    mousePos?: TypePos;
    offsetPos?: TypePos;
    followed?: any;
    type?: "top" | "bottom" | "left" | "right" | "top_left" | "top_right" | "bottom_left" | "bottom_right" | "";
};
export type TypeSelectedElements = {
    [key: string]: {
        el: HTMLDivElement;
    } & TypePos & TypeSize;
};
export type TypeSelected = {
    ids: string[];
} & TypePos & TypeSize;
export type TypeObjDiv = {
    [key: string]: HTMLDivElement | null;
};
export type TypeTargetType = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br" | "";
export type TypeDirection = "vertical" | "horizontal";
export type TypeReferenceAlignLine = {
    direction: TypeDirection;
    position: TypeAlignPosition;
    begin: TypePos;
    end: TypePos;
};
export type TypeAlignPosition = "begin" | "middle" | "end";
export type TypeLine = {
    direction: TypeDirection;
    begin: TypePos;
    end: TypePos;
};
export type TypeLoadingItems = {
    general: {
        total: number;
        loaded: number;
    };
    image: {
        total: number;
        loaded: number;
    };
};
export type TypeDnrItem = "" | "image";
