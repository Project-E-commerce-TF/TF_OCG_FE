<template>
  <div v-if="table" class="border rounded-md">
    <div class="flex justify-between ml-4">
      <div class="flex items-center justify-end py-4 space-x-2 mr-2">
        <label>Status</label>
        <select
          v-model="status"
          @change="onChangeStatus"
          class="text-black p-2 rounded-lg text-sm font-bold"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="onBeingDelivered">On Being Delivered</option>
          <option value="completeTheOrder">Complete</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <!-- ...other code... -->
      </div>
      <div class="flex items-center justify-end py-4 space-x-2 mr-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="pageIndex == 1"
          @click="handlePreviousPage"
        >
          Previous
        </Button>
        <div class="w-20px px-5">{{ pageIndex }}</div>
        <Button
          variant="outline"
          size="sm"
          :disabled="data.length < pageSize"
          @click="handleNextPage"
        >
          Next
        </Button>
      </div>
    </div>
    <Table>
      <TableHeader>
        <TableRow
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <TableHead v-for="header in headerGroup.headers" :key="header.id">
            <FlexRender
              v-if="!header.isPlaceholder"
              :render="header.column.columnDef.header"
              :props="header.getContext()"
            />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <template v-if="table.getRowModel().rows?.length">
          <TableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <router-link
                :to="{
                  name: 'OrderEdit',
                  params: { id: row.original.orderId },
                }"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </router-link>
            </TableCell>
          </TableRow>
        </template>
        <template v-else>
          <TableRow>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </template>
      </TableBody>
    </Table>
  </div>
</template>

<script setup>
import { fetchData } from "@/utils/axiosFetchApi";
import { h, onMounted, ref } from "vue";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FlexRender,
  getCoreRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const data = ref([]);
const sorting = ref([]);
const pageIndex = ref(1);
const pageSize = ref(10);
const table = ref(null);
const status = ref("");
function valueUpdater(updaterOrValue, ref) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}
const columns = [
  {
    accessorKey: "orderId",
    header: "Id",
  },
  {
    accessorKey: "shippingAddress",
    header: "Address",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "grandTotal",
    header: "Total",
    cell: ({ row }) => {
      const formattedPrice = numberToCurrencyVND(row.getValue("grandTotal"));
      return h("div", { class: "lowercase" }, formattedPrice);
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Created At", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formattedDate = date.toLocaleDateString();
      return h("div", { class: "lowercase" }, formattedDate);
    },
  },
];

onMounted(async () => {
  await fetchDataAndUpdateTable();
});

const onChangeStatus = async () => {
  pageIndex.value = 1;
  await fetchDataAndUpdateTable();
};
const fetchDataAndUpdateTable = async () => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/order?page=${pageIndex.value}&pageSize=${pageSize.value}&status=${status.value}`
  );
  if (res) {
    data.value = res;
  }
  table.value = useVueTable({
    data: data.value,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    state: {
      get sorting() {
        return sorting.value;
      },
    },
  });
};

const handlePreviousPage = () => {
  pageIndex.value--;
  fetchDataAndUpdateTable();
};
const handleNextPage = () => {
  pageIndex.value++;
  fetchDataAndUpdateTable();
};
</script>

<style scoped></style>
