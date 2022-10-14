import { useAuth } from "@/stores/auth"
import Ability from "@/interfaces/Ability.interface"

export function usePermission() {
    const auth = useAuth()
    const abilities = auth.abilities

    function can(ability: string): boolean {
        const isGod = abilities.find((item) => item.ability === "godmode")

        if (isGod) {
            return true
        }

        const isDenied = abilities.find((item) => item.permission === "deny" && item.ability === ability)

        if (isDenied) {
            return false
        }

        return abilities.find((item) => (item.permission === "allow" || item.permission === "callback") && item.ability === ability) !== undefined
    }

    function cant(ability: string): boolean {
        return !can(ability)
    }

    function cannot(ability: string): boolean {
        return cant(ability)
    }

    return {
        abilities,
        can,
        cant,
        cannot,
    }
}
