<script setup>
import { cn } from "@/lib/utils";
import { defineProps } from "vue";

const props = defineProps({
  class: { type: String, required: false },
});
</script>

<template>
  <thead :class="cn('[&_tr]:border-b', props.class)">
    <slot />
  </thead>
</template>
