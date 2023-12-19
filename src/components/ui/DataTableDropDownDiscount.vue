// DataTableDropDown.vue
<script setup>
import { MoreHorizontal } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { fetchData } from "@/utils/axiosFetchApi";

const router = useRouter();
const props = defineProps({
  discount: Object,
  onDiscountDeleted: Function,
});

function copy(id) {
  navigator.clipboard.writeText(id);
  console.log();
}

function edit(discount) {
  router.push({
    name: "DiscountEdit",
    params: {
      id: discount.discountID,
    },
  });
}
async function remove(discount) {
  await fetchData(
    `${process.env.VUE_APP_URL}/discount/${discount.discountID}`,
    "DELETE"
  );
  props.onDiscountDeleted();
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="bg-[#333] text-white">
      <DropdownMenuLabel class="text-xl mb-2">Actions</DropdownMenuLabel>
      <DropdownMenuItem
        @click="copy(props.discount.discountID)"
        class="cursor-pointer hover:bg-[#444]"
      >
        Copy discount ID
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        class="cursor-pointer hover:bg-[#444]"
        @click="edit(props.discount)"
      >
        Edit</DropdownMenuItem
      >
      <DropdownMenuItem
        class="cursor-pointer hover:bg-[#444]"
        @click="remove(props.discount)"
        >Delete</DropdownMenuItem
      >
    </DropdownMenuContent>
  </DropdownMenu>
</template>
