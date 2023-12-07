<script setup>
import { DropdownMenuRadioGroup } from "radix-vue";
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: { type: String, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: [String, Object, Function], required: false },
});

const emits = defineEmits(["update:modelValue"]);
</script>

<template>
  <DropdownMenuRadioGroup
    v-bind="props"
    @update:model-value="emits('update:modelValue', $event)"
  >
    <slot />
  </DropdownMenuRadioGroup>
</template>
