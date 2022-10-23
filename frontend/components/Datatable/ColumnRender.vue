<script lang="ts">
import { h } from "vue"
import { get } from "lodash"

export default {
    name: "ColumnRender",
    props: ["row", "column", "index"],
    setup(props) {
        function getColumnData(row, prop) {
            return get(row, `${prop}`, "")
        }

        if (props.column.$slots.default) {
            const renderedScopedSlot = props.column.$slots.default({
                row: props.row,
                index: props.index,
            })

            return h("div", { attrs: { class: "cell" } }, [renderedScopedSlot])
        }
        return h("span", [getColumnData(props.row, props.column.prop)])
    },
}
</script>
