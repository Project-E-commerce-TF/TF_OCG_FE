<template>
  <div class="flex items-center">
    <div v-if="table" class="grow items-center py-4 mr-3">
      <input
        type="text"
        v-model="searchValue"
        class="text-black p-2 rounded-lg w-full"
        placeholder="Filter title..."
      />
    </div>
    <div class="text-white">
      <router-link :to="{ name: 'AddProduct' }">
        <Button class="bg-gray-400">Add product</Button>
      </router-link>
    </div>
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
        :disabled="Math.ceil(totalItems / 10) == pageIndex"
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
            class="h-[95px] max-h-[95px] overflow-hidden"
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
import { Button } from "@/components/ui/button";
import { debounce } from "lodash";

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
  useVueTable,
  getFilteredRowModel,
} from "@tanstack/vue-table";
import DropdownAction from "@/components/ui/DataTableDropDown.vue";
import { numberToCurrencyVND } from "@/utils/currencyVND";

const data = ref([]);
const totalItems = ref(0);
const table = ref(null);
const pageIndex = ref(1);
const pageSize = ref(10);
const columnFilters = ref([]);
const columns = [
  {
    accessorKey: "productId",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const formattedPrice = numberToCurrencyVND(row.getValue("price"));
      return h("div", { class: "lowercase" }, formattedPrice);
    },
  },
  {
    accessorKey: "image",
    header: "Image",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          product,
          onProductDeleted: () => fetchDataAndUpdateTable(),
        })
      );
    },
  },
];
const searchValue = ref("");

const debouncedSearch = debounce(async (newValue) => {
  pageIndex.value = 1;
  await fetchDataAndUpdateTable(newValue);
}, 1000); // 300ms delay
watch(searchValue, debouncedSearch);

onMounted(async () => {
  await fetchDataAndUpdateTable();
});

function valueUpdater(updaterOrValue, ref) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

const updateTable = (res) => {
  data.value = res.products;
  totalItems.value = res.totalItems;
  table.value = useVueTable({
    data: data.value,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: (updaterOrValue) =>
      valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      get columnFilters() {
        return columnFilters.value;
      },
    },
  });
};

const fetchDataAndUpdateTable = async (search = "") => {
  let res = await fetchData(
    `${process.env.VUE_APP_URL}/product/search/list?page=${pageIndex.value}&pageSize=${pageSize.value}&searchText=${search}`
  );
  if (res && res.products) {
    updateTable(res);
  } else {
    res = await fetchData(
      `${process.env.VUE_APP_URL}/product/search/list?page=1&pageSize=${pageSize.value}&searchText=${search}`
    );
    if (res && res.products) {
      updateTable(res);
    }
  }
};

const handlePreviousPage = () => {
  pageIndex.value--;
  fetchDataAndUpdateTable();
};
const handleNextPage = () => {
  pageIndex.value++;
  console.log(Math.ceil(totalItems.value / 10));
  console.log(pageIndex.value);
  console.log(Math.ceil(totalItems.value / 10) == pageIndex.value);
  fetchDataAndUpdateTable();
};
</script>

<style scoped></style>
