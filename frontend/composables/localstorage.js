import { get } from 'lodash';

export function useLocalStorage(localStorageKey) {

    /** @return string|null*/
    function getItem() {
        return localStorage.getItem(localStorageKey);
    }

    /**
     * @param {string} param
     * @return any
     */
    function getObjectElement(param) {
        const result = JSON.parse(getItem());
        if(typeof result !== 'object') {
            return null;
        }
        return get(result, param, null);
    }

    /**
     * @param {string} stringValue
     * @return void
     */
    function setItem(stringValue) {
        localStorage.setItem(localStorageKey, stringValue)
    }

    /** @return void */
    function removeItem() {
        localStorage.removeItem(localStorageKey);
    }

    return {
        getObjectElement,
        setItem,
        getItem,
        removeItem,
    };
}
