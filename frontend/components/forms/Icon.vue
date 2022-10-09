<script>
import {h} from 'vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Icon",
    props: {
        icon: {
            type: String,
            required: true,
        },
        classes: {
            type: String,
            default: '',
        }
    },
    setup(props) {
        return () => h('i', {
                class:  props.icon + ' ' + props.classes,
            }
        );
    },
}
</script>

<style scoped>

</style>
