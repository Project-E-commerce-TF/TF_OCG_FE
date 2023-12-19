<template>
  <div class="flex mb-2 text-white items-center">
    <div v-if="table" class="grow items-center py-4 mr-3">
      <input
        type="text"
        v-model="searchValue"
        class="text-black p-2 rounded-lg w-full"
        placeholder="Filter code..."
      />
    </div>
    <router-link :to="{ name: 'AddDiscount' }">
      <Button>Add discount</Button>
    </router-link>
  </div>
  <div v-if="table" class="border rounded-md">
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
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
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
import { h, onMounted, ref, watch } from "vue";
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
import DropdownAction from "@/components/ui/DataTableDropDownDiscount.vue";
import { ArrowUpDown } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";

const data = ref([]);
const sorting = ref([]);
const searchValue = ref("");
const pageIndex = ref(1);
const pageSize = ref(10);
const table = ref(null);

function valueUpdater(updaterOrValue, ref) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}
const columns = [
  {
    accessorKey: "discountID",
    header: "Id",
  },
  {
    accessorKey: "discountCode",
    header: "Code",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "discountType",
    header: "Type",
  },
  {
    accessorKey: "availableQuantity",
    header: "Amount",
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Start At", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      const formattedDate = date.toLocaleDateString();
      return h("div", { class: "lowercase" }, formattedDate);
    },
  },
  {
    accessorKey: "endDate",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["End At", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      const formattedDate = date.toLocaleDateString();
      return h("div", { class: "lowercase" }, formattedDate);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const discount = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          discount,
          onDiscountDeleted: () => fetchDataAndUpdateTable(),
        })
      );
    },
  },
];

onMounted(async () => {
  await fetchDataAndUpdateTable();
});

const debouncedSearch = debounce(async (newValue) => {
  pageIndex.value = 1;
  await fetchDataAndUpdateTable(newValue);
}, 1000); // 300ms delay
watch(searchValue, debouncedSearch);

const fetchDataAndUpdateTable = async (search = "") => {
  const res = await fetchData(
    `${process.env.VUE_APP_URL}/discount?page=${pageIndex.value}&pageSize=${pageSize.value}&searchText=${search}`
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
