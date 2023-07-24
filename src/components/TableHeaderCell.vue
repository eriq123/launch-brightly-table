<template>
  <th class="table-cell border text-left" @click="sortTable">
    <span class="mr-2">{{ label }}</span>
    <ArrowUp v-if="isSorted && isAscending" />
    <ArrowDown v-else-if="isSorted && !isAscending" />
  </th>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import ArrowUp from "./icons/ArrowUp.vue";
import ArrowDown from "./icons/ArrowDown.vue";

const props = defineProps(["label", "headerKey", "isSorted", "isAscending"]);
const emit = defineEmits(["sort"]);

const sortTable = () => {
  emit("sort", props.headerKey);
};
</script>
