type EventName = keyof DocumentEventMap;
export const addListeners = <T extends EventName>(
	l: Record<T, (ev: DocumentEventMap[T]) => void>,
) => {
	Object.entries(l).forEach(([event, listener]) => {
		document.addEventListener(event, listener as EventListener);
	});
};

