import { get } from "lodash"

export function useLocalStorage(localStorageKey: string) {
    function getItem(): string | null {
        return localStorage.getItem(localStorageKey)
    }

    function getObjectElement(param: string): any {
        const item = getItem()
        if (!item) return null
        const result = JSON.parse(item)
        if (typeof result !== "object") {
            return null
        }
        return get(result, param, null)
    }

    function setItem(stringValue: string): void {
        localStorage.setItem(localStorageKey, stringValue)
    }

    function removeItem(): void {
        localStorage.removeItem(localStorageKey)
    }

    return {
        getObjectElement,
        setItem,
        getItem,
        removeItem,
    }
}
