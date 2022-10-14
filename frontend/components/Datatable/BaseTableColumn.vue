<script lang="ts">
import { h } from "vue"

export default {
    name: "BaseTableColumn",
    inject: ["addColumn", "removeColumn"],
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
    data() {
        return {
            sortDirection: "",
        }
    },
    mounted() {
        this.addColumn(this)
    },
    unmounted() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.removeColumn(this)
    },
    methods: {
        toggleSort() {
            if (this.sortDirection === "asc") {
                this.sortDirection = "desc"
            } else if (this.sortDirection === "desc") {
                this.sortDirection = ""
            } else {
                this.sortDirection = "asc"
            }
        },
        parseStyleProperty(property) {
            let result = ""

            if (typeof property === "number") {
                result = `${property}px`
            } else {
                result = property
            }
            return result
        },
        getStyles() {
            const styles = {}
            if (this.minWidth) {
                styles.minWidth = this.parseStyleProperty(this.minWidth)
            }
            if (this.maxWidth) {
                styles.maxWidth = this.parseStyleProperty(this.maxWidth)
            }
            return styles
        },
    },
    render() {
        return h(null)
    },
}
</script>
