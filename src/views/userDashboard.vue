<template>
  <div v-if="table" class="grow items-center py-4 mr-3">
    <input
      type="text"
      v-model="searchValue"
      class="text-black p-2 rounded-lg w-full"
      placeholder="Filter email..."
    />
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
import { onMounted, ref, watch } from "vue";
import { debounce } from "lodash";
import { Button } from "@/components/ui/button";
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

const table = ref(null);
const searchValue = ref("");
const pageIndex = ref(1);
const pageSize = ref(10);
const data = ref([]);
const columnFilters = ref([]);
const columns = [
  {
    accessorKey: "userID",
    header: "Id",
  },
  {
    accessorKey: "userName",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
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
    `${process.env.VUE_APP_URL}/users/filter/search-user?page=${pageIndex.value}&pageSize=${pageSize.value}}&searchText=${search}`
  );
  if (res) {
    data.value = res;
  }
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

function valueUpdater(updaterOrValue, ref) {
  ref.value =
    typeof updaterOrValue === "function"
      ? updaterOrValue(ref.value)
      : updaterOrValue;
}

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
