<template>
  <th class="table-cell border text-left cursor-pointer" @click="sortTable">
    <span class="mr-2">{{ label }}</span>
    <ArrowUp v-if="isSorted && isAscending" />
    <ArrowDown v-else-if="isSorted && !isAscending" />
    <button
      v-if="isEdition"
      @click.stop="toggleDropdown"
      class="trigger-button float-right p-1"
    >
      <Ellipsis />
    </button>
    <FilterDropdown
      v-if="isEdition && showDropdown"
      :editions="editions"
      :filteredEditions="filteredEditions"
      @updateEditions="updateEditions"
      @closeDropdown="closeDropdown"
    />
  </th>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onBeforeUnmount } from "vue";
import ArrowUp from "./icons/ArrowUp.vue";
import ArrowDown from "./icons/ArrowDown.vue";
import Ellipsis from "./icons/IconEllipsis.vue";
import FilterDropdown from "./FilterDropdown.vue";

const props = defineProps([
  "metrics",
  "label",
  "headerKey",
  "isSorted",
  "isAscending",
  "filteredEditions",
]);
const isEdition = props.headerKey === "edition";
const showDropdown = ref(false);
const emit = defineEmits(["sort", "updateEditions"]);

const sortTable = () => {
  emit("sort", props.headerKey);
};

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};
const closeDropdown = () => {
  showDropdown.value = false;
};

const editions = computed(() => {
  const distinctEditions = new Set(props.metrics?.map((item) => item.edition));
  const arrDistinctEditions = Array.from(distinctEditions).map((edition) => {
    return { key: edition, label: edition };
  });

  return arrDistinctEditions.sort((a, b) => a.label.localeCompare(b.label));
});

const updateEditions = (value) => {
  emit("updateEditions", value);
};

onBeforeUnmount(() => {
  closeDropdown();
});
</script>
<style scoped>
.trigger-button:hover {
  background-color: #eee;
}
</style>
