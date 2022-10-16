<script lang="ts">
import { PropType, h } from "vue"

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Alert",
    props: {
        message: {
            type: String,
            default: "",
        },
        type: {
            type: String as PropType<"info" | "danger" | "success" | "warning" | "dark">,
            required: true,
        },
        deletable: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        let additionalTypeClasses = ""

        if (props.type === "info") {
            additionalTypeClasses = "text-blue-700 bg-blue-100 dark:text-blue-800"
        } else if (props.type === "danger") {
            additionalTypeClasses = "text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800"
        } else if (props.type === "success") {
            additionalTypeClasses = "text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800"
        } else if (props.type === "warning") {
            additionalTypeClasses = "text-yellow-700 bg-yellow-100 dark:bg-yellow-200 dark:text-yellow-800"
        } else if (props.type === "dark") {
            additionalTypeClasses = "text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
        }

        return h(
            "div",
            {
                role: "alert",
                class: "p-4 mb-4 text-sm rounded-lg dark:bg-blue-200 " + additionalTypeClasses,
            },
            h("span", {}, "")
        )
    },
}
</script>
