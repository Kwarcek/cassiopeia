<script lang="ts">
import { onMounted, onUnmounted, ref, inject, h, getCurrentInstance } from "vue"

interface Style {
    minWidth: string | number
    maxWidth: string | number
}

export default {
    name: "BaseTableColumn",
    props: {
        sortable: Boolean,
        filterable: Boolean,
        label: {
            type: String,
            default: "",
        },
        align: {
            type: String,
            default: "",
        },
        prop: {
            type: String,
            default: "",
        },
        minWidth: {
            type: [String, Number],
            default: null,
        },
        maxWidth: {
            type: [String, Number],
            default: null,
        },
    },
    emit: ["addColumn", "removeColumn"],
    setup(props, { emit }) {
        const sortDirection = ref("")

        const addColumn = inject("addColumn")
        const removeColumn = inject("removeColumn")

        onMounted(() => {
            emit("addColumn", this)
            addColumn(this)
        })

        onUnmounted(() => {
            const instance = getCurrentInstance()
            console.log(instance)

            if (instance?.vnode?.el) {
                // todo
                instance.vnode.el.parentNode.removeChild(instance.vnode.el)
            }
            removeColumn(this)
            emit("removeColumn", this)
        })

        function toggleSort(): void {
            if (sortDirection.value === "asc") {
                sortDirection.value = "desc"
            } else if (sortDirection.value === "desc") {
                sortDirection.value = ""
            } else {
                sortDirection.value = "asc"
            }
        }

        function parseStyleProperty(property: number | string): string {
            let result = ""

            if (typeof property === "number") {
                result = `${property}px`
            } else {
                result = property
            }
            return result
        }

        function getStyles(): Style {
            const styles = {
                minWidth: 0 as string | number,
                maxWidth: 0 as string | number,
            }
            if (props.minWidth) {
                styles.minWidth = parseStyleProperty(props.minWidth)
            }
            if (props.maxWidth) {
                styles.maxWidth = parseStyleProperty(props.maxWidth)
            }
            return styles
        }

        return {
            getStyles,
            toggleSort,
        }
    },
    render() {
        return h(null)
    },
}
</script>
