<script>
import {h} from 'vue';

export default {
    name: "RemixIcon",
    props: {
        icon: {
            type: String,
            required: true,
        },
        classes: {
            type: String,
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
