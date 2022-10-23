<template>
    <div class="data-table">
        <div v-if="showAction('search') || showAction('refresh') || hasTitle" class="w-full flex flex-wrap items-center mb-4" :class="{ 'justify-end': !hasTitle, 'justify-between': hasTitle }">
            <div>
                <slot name="header-left">
                    <h3 class="text-xl font-semibold tracking-wider">
                        {{ title }}
                    </h3>
                </slot>
            </div>
            <div class="flex items-center">
                <div>
                    <input v-if="showAction('search')" v-model="filters.search" type="text" :placeholder="'Search...'" prefix-icon="el-icon-search" class="search-input" clearable @change="refresh" />
                </div>
                <div v-if="showAction('refresh')" class="ml-2">
                    <BaseButton variant="white" size="sm" @click="refresh">
                        <i class="ri-refresh-line w-5 h-5 text-blue-500"></i>
                        <!--                        <RefreshCwIcon class="w-5 h-5 text-blue-500"/>-->
                    </BaseButton>
                </div>
                <div v-if="showAction('add')" class="ml-2">
                    <BaseButton variant="primary" size="sm" @click="$emit('add', $event)">
                        <i class="ri-add-line w-5 h-5 text-white"></i>
                        <!--                        <PlusIcon class="w-5 h-5 text-white"/>-->
                    </BaseButton>
                </div>
            </div>
        </div>
        <BaseTable :data="items" :local-sort="url === ''" :loading="loading" v-bind="$attrs" @sort="onSort">
            <BaseTableColumn v-for="(column, index) in columns" :key="column.prop || index" v-bind="column">
                <template #default="{ row }">
                    <slot :name="column.prop" :row="row">
                        <template v-if="column.component">
                            <component :is="column.component" :column="column" :row="row"></component>
                        </template>
                        <div v-else class="truncate">
                            {{ get(row, column.prop) || "- -" }}
                        </div>
                    </slot>
                </template>
            </BaseTableColumn>

            <BaseTableColumn v-if="actions" v-slot="{ row, index }" align="right">
                <BaseButton v-if="showAction('view')" size="sm" variant="gray-link" @click="$emit('view', row, index)"> View </BaseButton>
                <BaseButton v-if="showAction('edit')" variant="primary-link" size="sm" @click="$emit('edit', row, index)"> Edit </BaseButton>
                <BaseButton v-if="showAction('delete')" variant="danger-link" size="sm" @click="onDelete(row, index)"> Delete </BaseButton>
                <slot name="extra-actions"></slot>
            </BaseTableColumn>
        </BaseTable>

        <div class="w-full flex justify-end mt-4 table-pagination">
            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px">
                    <li>
                        <a
                            href="#"
                            class="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >Previous</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >1</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >2</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            aria-current="page"
                            class="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >3</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >4</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >5</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >Next</a
                        >
                    </li>
                </ul>
            </nav>
            <div :perPageOptions="perPageOptions" :perPageChange="perPageChange"></div>
            <!--            <ElPagination-->
            <!--                v-show="tableData.length > 0 && url"-->
            <!--                v-model:current-page="pagination.current_page"-->
            <!--                :page-sizes="perPageOptions"-->
            <!--                :page-size="pagination.per_page"-->
            <!--                :pager-count="5"-->
            <!--                layout="total, slot, prev, pager, next, jumper"-->
            <!--                :total="pagination.total"-->
            <!--                @size-change="perPageChange"-->
            <!--                @current-change="refresh"-->
            <!--            >-->
            <!--                <ElSelect-->
            <!--                    v-model="pagination.per_page"-->
            <!--                    class="select-default"-->
            <!--                    size="mini"-->
            <!--                    @change="refresh"-->
            <!--                >-->
            <!--                    <ElOption-->
            <!--                        v-for="value in perPageOptions"-->
            <!--                        :key="value"-->
            <!--                        class="select-default"-->
            <!--                        :label="value"-->
            <!--                        :value="value"-->
            <!--                    ></ElOption>-->
            <!--                </ElSelect>-->
            <!--            </ElPagination>-->
        </div>
    </div>
</template>

<script lang="ts">
import { cloneDeep, get } from "lodash"
import api from "@/plugins/axios/api"

// import { RefreshCwIcon, PlusIcon } from "vue-feather-icons";
// import { Select, Option, Pagination, Input } from "element-ui";
// import PhoneLink from "./cells/PhoneLink";
// import EmailLink from "./cells/EmailLink";
// import Salary from "./cells/Salary";
// import GenderBadge from "./cells/GenderBadge";
import BaseButton from "@/components/Datatable/BaseButton.vue"
import BaseTable from "@/components/Datatable/BaseTable.vue"
import BaseTableColumn from "@/components/Datatable/BaseTableColumn.vue"
import { computed, onBeforeMount, PropType, reactive, ref, toRaw, toRefs } from "vue"

interface Column {
    label?: string
    prop?: string
    filterable?: boolean
    component?: null
    minWidth?: number
    maxWidth?: number
    sortable?: boolean
}

export default {
    name: "DataTable",
    components: {
        // PhoneLink,
        // EmailLink,
        // Salary,
        // GenderBadge,
        // PlusIcon,
        // RefreshCwIcon,
        BaseButton,
        BaseTable,
        BaseTableColumn,
        // [Input.name]: Input,
        // [Select.name]: Select,
        // [Option.name]: Option,
        // [Pagination.name]: Pagination
    },
    inheritAttrs: false,
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        columns: {
            type: Array as PropType<Array<Column>>,
            default: () => [],
        },
        title: {
            type: String,
            default: "",
        },
        actions: {
            type: String as PropType<"view" | "edit" | "delete">,
            default: "",
        },
        url: {
            type: String,
            default: "",
        },
        urlQuery: {
            type: String,
            default: "",
        },
    },
    emits: ["add", "view", "delete", "edit"],
    setup(props, { emit, slots }) {
        const items = ref(cloneDeep(props.data))
        const loading = ref(false)
        const perPageOptions = [5, 10, 15, 20, 25, 50]
        let pagination = reactive({
            current_page: 1,
            per_page: 10,
            total: 5,
        })

        const filters = reactive({
            search: "",
            sort: "",
        })

        const actionsArray = computed(() => {
            return props.actions.split(",").map((action) => action.trim().toLowerCase())
        })

        const hasTitle = computed(() => {
            return slots["header-left"] || props.title
        })

        onBeforeMount(async () => {
            await refresh()
        })

        function showAction(action: string) {
            if (!action) {
                return false
            }
            return actionsArray.value.includes(action)
        }

        async function perPageChange(value) {
            pagination.per_page = value
            await refresh()
        }

        async function onSort({ prop, direction }) {
            if (direction) {
                filters.sort = `${prop}|${direction}`
            } else {
                filters.sort = ""
            }
            await refresh()
        }

        async function onDelete(row, index) {
            try {
                const confirmed = await this.$deleteConfirm({
                    title: "Delete row",
                    description: `Are you sure you want to delete this row? The data will be removed on our servers. This action cannot be undone.`,
                })

                if (!confirmed) {
                    return
                }

                emit("delete", { row, index })
            } catch (err) {
                console.log(err)
            }
        }

        async function refresh() {
            if (!props.url) return

            try {
                loading.value = true
                const params = {
                    page: pagination.current_page,
                    per_page: pagination.per_page,
                    filter: null as string | null,
                    sort: null as string | null,
                }
                if (filters.search) {
                    params.filter = filters.search
                }

                if (filters.sort) {
                    params.sort = filters.sort
                }

                const fullUrl = props.url + props.urlQuery
                const { data } = await api.get(fullUrl, { params })
                pagination = {
                    per_page: data.per_page,
                    total: data.total,
                    current_page: data.current_page,
                }
                items.value = data.data
            } catch (err) {
                console.log(err)
            } finally {
                loading.value = false
            }
        }

        toRefs(items.value)

        return {
            filters,
            loading,
            hasTitle,
            items,
            perPageOptions,
            refresh,
            onDelete,
            onSort,
            perPageChange,
            showAction,
            get,
        }
    },
}
</script>

<style scoped>
.search-input {
    min-width: 250px;
}
</style>
