<template>
    <div class="data-table">
        <div
            v-if="showAction('search') || showAction('refresh') || hasTitle"
            class="w-full flex flex-wrap items-center mb-4"
            :class="{'justify-end': !hasTitle, 'justify-between': hasTitle}"
        >
            <div>
                <slot name="header-left">
                    <h3 class="text-xl font-semibold tracking-wider">
                        {{title}}
                    </h3>
                </slot>
            </div>
            <div class="flex items-center">
                <div>
                    <input
                        v-if="showAction('search')"
                        v-model="filters.search"
                        type="text"
                        :placeholder="'Search...'"
                        prefix-icon="el-icon-search"
                        class="search-input"
                        clearable
                        @change="refresh"
                    />
                </div>
                <div
                    v-if="showAction('refresh')"
                    class="ml-2"
                >
                    <BaseButton
                        variant="white"
                        size="sm"
                        @click="refresh"
                    >
                        <i class="ri-refresh-line w-5 h-5 text-blue-500"></i>
<!--                        <RefreshCwIcon class="w-5 h-5 text-blue-500"/>-->
                    </BaseButton>
                </div>
                <div
                    v-if="showAction('add')"
                    class="ml-2">
                    <BaseButton
                        variant="primary"
                        size="sm"
                        @click="$emit('add', $event)"
                    >
                        <i class="ri-add-line w-5 h-5 text-white"></i>
<!--                        <PlusIcon class="w-5 h-5 text-white"/>-->
                    </BaseButton>
                </div>
            </div>
        </div>
        <BaseTable
            :data="tableData"
            :local-sort="url === ''"
            :loading="loading"
            v-bind="$attrs"
            @sort="onSort"
        >
            <BaseTableColumn
                v-for="(column, index) in columns"
                :key="column.prop || index"
                v-bind="column"
            >
                <template #default="{row}">
                    <slot
                        :name="column.prop"
                        :row="row"
                    >
                        <template v-if="column.component">
                            <component
                                :is="column.component"
                                :column="column"
                                :row="row"
                            ></component>
                        </template>
                        <div
                            v-else
                            class="truncate">
                            {{get(row, column.prop) || '- -'}}
                        </div>
                    </slot>
                </template>
            </BaseTableColumn>

            <BaseTableColumn
                v-if="actions"
                v-slot="{row, index}"
                align="right"
            >
                <BaseButton
                    v-if="showAction('view')"
                    size="sm"
                    variant="gray-link"
                    @click="$emit('view', row, index)"
                >
                    View
                </BaseButton>
                <BaseButton
                    v-if="showAction('edit')"
                    variant="primary-link"
                    size="sm"
                    @click="$emit('edit', row, index)"
                >
                    Edit
                </BaseButton>
                <BaseButton
                    v-if="showAction('delete')"
                    variant="danger-link"
                    size="sm"
                    @click="onDelete(row, index)"
                >
                    Delete
                </BaseButton>
                <slot name="extra-actions"></slot>
            </BaseTableColumn>
        </BaseTable>

        <div class="w-full flex justify-end mt-4 table-pagination">
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
<script>
import {cloneDeep, get} from "lodash";
import api from "@/plugins/axios/api.js";

// import { RefreshCwIcon, PlusIcon } from "vue-feather-icons";
// import { Select, Option, Pagination, Input } from "element-ui";

// import PhoneLink from "./cells/PhoneLink";
// import EmailLink from "./cells/EmailLink";
// import Salary from "./cells/Salary";
// import GenderBadge from "./cells/GenderBadge";
import BaseButton from "./BaseButton.vue";
import BaseTable from "./BaseTable.vue";
import BaseTableColumn from "./BaseTableColumn.vue";

export default {
    name: 'DataTable',
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
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ""
        },
        actions: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        },
        urlQuery: {
            type: String,
            default: ""
        }
    },
    emits: ['add', 'view', 'delete', 'edit'],
    data() {
        return {
            tableData: cloneDeep(this.data),
            loading: false,
            perPageOptions: [5, 10, 15, 20, 25, 50],
            pagination: {
                current_page: 1,
                per_page: 10,
                total: 5
            },
            filters: {
                search: "",
                sort: ""
            }
        };
    },
    computed: {
        actionsArray() {
            return this.actions.split(",").map(action => action.trim().toLowerCase());
        },
        hasTitle() {
            return this.$slots["header-left"] || this.title;
        }
    },
    created() {
        this.refresh();
    },
    methods: {
        get,
        showAction(action) {
            if (!action) {
                return false;
            }
            return this.actionsArray.includes(action);
        },
        perPageChange(value) {
            this.pagination.per_page = value;
            this.refresh();
        },
        onSort({ prop, direction }) {
            if (direction) {
                this.filters.sort = `${prop}|${direction}`;
            } else {
                this.filters.sort = "";
            }
            this.refresh();
        },
        async refresh() {
            if (!this.url) {
                return;
            }
            setTimeout(async () => {
                try {
                    this.loading = true;
                    // Change the params here based on your own api
                    const params = {
                        page: this.pagination.current_page,
                        per_page: this.pagination.per_page
                    };
                    if (this.filters.search) {
                        params.filter = this.filters.search;
                    }

                    if (this.filters.sort) {
                        params.sort = this.filters.sort;
                    }

                    const fullUrl = this.url + this.urlQuery;
                    const { data } = await api.get(fullUrl, { params });
                    this.pagination = {
                        per_page: data.per_page,
                        total: data.total,
                        current_page: data.current_page
                    };
                    this.tableData = data.data;
                } catch (err) {
                    console.log(err);
                } finally {
                    this.loading = false;
                }
            }, 1500)
        },
        async onDelete(row, index) {
            try {
                const confirmed = await this.$deleteConfirm({
                    title: "Delete row",
                    description: `Are you sure you want to delete this row? The data will be removed on our servers. This action cannot be undone.`
                });

                if (!confirmed) {
                    return;
                }

                this.$emit("delete", {row, index});

            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>
<style scoped>
.search-input {
    min-width: 250px;
}
</style>
