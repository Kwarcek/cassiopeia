<script>
import {h} from 'vue';

export default {
    name: "TInput",
    props: {
        modelValue: {
          type: String,Number,
          required: true,
        },
        errors: {
            type: Array,
            default: () => [],
        },
        dense: {
            type: Boolean,
            default: false,
        },
        outline: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { slots }) {
        const slotPrefix = slots.prefix ? slots.prefix() : [];
        const slotSuffix = slots.suffix ? slots.suffix() : [];
        return () =>
            h(
                'div',
                {
                    class: 'relative z-0'
                },
                [
                    slotPrefix,
                    h(
                        'input',
                        {
                            onChange: () => {},
                            type: 'text',
                            placeholder: '',
                            class: 'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-green-600 appearance-none dark:text-white dark:border-green-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer'
                        }
                    ),
                    slotSuffix,
                    h(
                        'label',
                        {
                            class: 'absolute text-sm text-green-600 dark:text-green-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                        },
                        'Input'
                    ),
                ]
            )
    },
}
</script>

<style scoped>

</style>
