<script>
import { h } from "vue"

export default {
    props: ["column"],
    setup(props) {
        if (props.column.$slots.header) {
            return props.column.$slots.header({
                column: props.column,
            })
        }
        return h("span", [props.column.label])
    },
}
</script>
