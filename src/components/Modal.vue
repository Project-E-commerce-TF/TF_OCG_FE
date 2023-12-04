<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content flex">
      <div v-html="invoiceHTML"></div>
      <span class="close text-3xl font-bold cursor-pointer" @click="closeModal"
        >x</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: Boolean,
    invoiceHTML: String,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
