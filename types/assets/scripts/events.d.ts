type Listener<T> = (data: T) => void;
interface eventBusInterface<T> {
    events: Record<string, Listener<T>[]>;
    on(event: string, listener: Listener<T>): void;
    emit(event: string, data: T): void;
    off(event: string, listener: Listener<T>): void;
}
declare class EventBus<T> implements eventBusInterface<T> {
    events: Record<string, Listener<T>[]>;
    on(event: string, listener: Listener<T>): void;
    emit(event: string, data: T): void;
    off(event: string, listener: Listener<T>): void;
}
declare const eventBus: EventBus<any>;
export default eventBus;
