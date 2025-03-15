export declare function Wait(delay?: number): Promise<unknown>;
/**
 * 判断对象是否有属性
 *
 * @param obj 对象
 * @param property 属性名
 * @returns
 */
export declare const HasOwn: (obj: any, property: string) => boolean;
export declare const GenerateRandomString: (mode?: string, length?: number) => string;
export declare const GenerateUid: () => string;
