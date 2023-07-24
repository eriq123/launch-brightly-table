<template>
  <th class="table-cell border text-left" @click="sortTable">
    {{ label }}
  </th>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps(["label", "headerKey"]);
const emit = defineEmits(["sort"]);

const sortTable = () => {
  emit("sort", props.headerKey);
};
</script>
