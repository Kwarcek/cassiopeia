import { useAuth } from "@/stores/auth.js";

export function usePermission() {
    const auth = useAuth();
    const abilities = auth.abilities;

    /**
     * @param {string} ability
     * @return boolean
     */
    function can(ability) {
        const isGod = abilities.find(item => item.ability === 'godmode');

        if (isGod) {
            return true;
        }

        const isDenied = abilities.find(item => item.permission === 'deny' && item.ability === ability);

        if (isDenied) {
            return false;
        }

        return abilities.find(item => (item.permission === 'allow' || item.permission === 'callback') && item.ability === ability) !== undefined;
    }

    /**
     * @param {string} ability
     * @return boolean
     */
    function cant(ability) {
        return !can(ability);
    }

    /**
     * @param {string} ability
     * @return boolean
     */
    function cannot(ability) {
        return cant(ability);
    }

    return {
        abilities,
        can,
        cant,
        cannot,
    };
}
