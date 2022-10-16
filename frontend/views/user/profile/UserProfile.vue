<template>
    <div class="pt-6 px-4">
        <div class="mt-4 w-full">
            <DataTable :columns="columns" actions="view,edit,delete,search,refresh" title="Users list" url="/users/paginate" @edit="onRowEdit" @view="onRowView" />
        </div>
    </div>
</template>

<script lang="ts">
import DataTable from "@/components/Datatable/DataTable.vue"

export default {
    name: "UserProfile",
    components: { DataTable },
    setup() {
        const columns = [
            {
                label: "Name",
                prop: "name",
                filterable: true,
                maxWidth: 220,
                sortable: true,
            },
            {
                label: "Email",
                prop: "email",
                // component: "EmailLink",
                maxWidth: 240,
                sortable: true,
            },
            // {
            //   label: "Gender",
            //   prop: "gender",
            //   component: "GenderBadge",
            //   maxWidth: 100,
            //   sortable: true,
            // },
            {
                label: "Email verified at",
                prop: "email_verified_at",
                // component: "Salary",
                minWidth: 150,
                maxWidth: 180,
                sortable: true,
            },
            // {
            //   label: "Custom Slot",
            //   prop: "customSlot",
            //   minWidth: 150,
            //   maxWidth: 180,
            // },
        ]

        function onRowEdit(): void {
            console.log("onRowEdit")
        }

        function onRowView(): void {
            console.log("onRowView")
        }

        return {
            onRowEdit,
            onRowView,
            columns,
        }
    },
}
</script>
