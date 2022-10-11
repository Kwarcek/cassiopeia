<template>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-4 sm:px-4 lg:-mx-4 lg:px-4">
        <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
            <!-- TO DO LOADING -->
            <table v-if="data.length" class="min-w-full">
                <thead>
                    <tr>
                        <th
                            v-for="column in columns"
                            :key="column.prop"
                            class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                            :style="column.getStyles()"
                        >
                            <div
                                class="flex items-center th-cell"
                                :class="{
                                    'cursor-pointer select-none': column.sortable,
                                    'justify-end': column.align === 'right',
                                    'justify-start': column.align === 'left',
                                    'justify-center': column.align === 'center',
                                }"
                                @click="toggleSort(column)"
                            >
                                <ColumnHeaderRenderer :column="column" />
                                <div v-if="column.sortable" class="flex flex-col ml-1">
                                    <i class="ri-arrow-up-s-line -mb-2 text-xl" :class="{ 'text-blue-600 font-bold': column.sortDirection === 'asc' }"></i>
                                    <i class="ri-arrow-down-s-line -mt-2 text-xl" :class="{ 'text-blue-600 font-bold': column.sortDirection === 'desc' }"></i>
                                </div>
                                <!-- TODO-->
                                <div v-if="column.filterable === 12">
                                    <i class="ri-filter-line text-xl"></i>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <slot></slot>
                <tbody v-if="!loading" class="bg-white">
                    <tr v-for="(row, index) in tableData" :key="row[rowKey] || index">
                        <td
                            v-for="column in columns"
                            :key="column.prop"
                            class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-gray-700 td-cell"
                            :class="{
                                'text-right': column.align === 'right',
                                'text-left': column.align === 'left',
                                'text-center': column.align === 'center',
                            }"
                            :style="column.getStyles()"
                        >
                            <ColumnRenderer :row="row" :index="index" :column="column" />
                        </td>
                    </tr>
                    <tr v-if="(data.length === 0 && !loading) || (data.length === 0 && loading)" key="empty">
                        <td :colspan="columns.length" class="text-center py-5 text-gray-500 text-lg td-cell">
                            <slot name="empty">
                                <span v-if="!loading">No Data</span>
                                <span v-else-if="data.length === 0 && loading">
                                    <i class="el-icon el-icon-loading"></i>
                                    Loading...
                                </span>
                            </slot>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="loading" class="flex justify-center">
                <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
</template>
<script>
import { cloneDeep, get, orderBy } from "lodash"
import { h } from "vue"

function getColumnData(row, prop) {
    return get(row, `${prop}`, "")
}

export default {
    components: {
        ColumnRenderer: {
            props: ["row", "column", "index"],
            render() {
                if (this.column.$slots.default) {
                    const renderedScopedSlot = this.column.$slots.default({
                        row: this.row,
                        index: this.index,
                    })

                    return h("div", { attrs: { class: "cell" } }, [renderedScopedSlot])
                }
                return h("span", [getColumnData(this.row, this.column.prop)])
            },
        },
        ColumnHeaderRenderer: {
            props: ["column"],
            render() {
                if (this.column.$slots.header) {
                    return this.column.$slots.header({
                        column: this.column,
                    })
                }
                return h("span", [this.column.label])
            },
        },
    },
    provide() {
        return {
            addColumn: this.addColumn,
            removeColumn: this.removeColumn,
        }
    },
    props: {
        data: {
            type: Array,
            default: () => [],
        },
        rowKey: {
            type: String,
            default: "id",
        },
        localSort: {
            type: Boolean,
            default: true,
        },
        loading: {
            type: Boolean,
            default: true,
        },
    },
    emits: ["sort"],
    data() {
        return {
            columns: [],
            tableData: [],
        }
    },
    watch: {
        data: {
            immediate: true,
            handler(value) {
                this.tableData = cloneDeep(value)
            },
        },
    },
    methods: {
        addColumn(step) {
            const index = this.columns.length
            this.columns.splice(index, 0, step)
        },
        removeColumn(step) {
            const columns = this.columns
            const index = columns.indexOf(step)

            if (index > -1) {
                columns.splice(index, 1)
            }
        },
        resetOtherColumnsSort(exceptionColumn) {
            this.columns.forEach((column) => {
                if (exceptionColumn.prop === column.prop) {
                    return
                }
                column.sortDirection = ""
            })
        },
        toggleSort(column) {
            if (!this.localSort) {
                this.resetOtherColumnsSort(column)
            }

            column.toggleSort()
            this.$emit("sort", {
                prop: column.prop,
                direction: column.sortDirection,
            })

            if (!this.localSort) {
                return
            }

            const columnsToSort = this.columns.filter((c) => c.sortDirection !== "")
            const columnProps = columnsToSort.map((c) => c.prop)
            const columnSortOrders = columnsToSort.map((c) => c.sortDirection)

            if (columnProps.length === 0) {
                this.tableData = cloneDeep(this.data)
            } else {
                this.tableData = orderBy(this.tableData, columnProps, columnSortOrders)
            }
        },
    },
}
</script>
