<template>
  <div class="relative" ref="dropdown">
    <div class="dropdown">
      <label v-for="edition in distinctEditions" :key="edition.key">
        <input
          class="dropdown-input"
          type="checkbox"
          :value="edition.key"
          v-model="selectedEditions"
          @change="updateEditions"
        />
        {{ edition.label }}
      </label>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  defineProps,
  defineEmits,
  onMounted,
  onBeforeUnmount,
} from "vue";

const props = defineProps(["editions", "filteredEditions"]);
const emit = defineEmits(["updateEditions", "closeDropdown"]);
const selectedEditions = ref(props.filteredEditions);

const distinctEditions = computed(() => {
  const uniqueEditions = new Set(props.editions.map((edition) => edition.key));
  return props.editions.filter((edition) => uniqueEditions.has(edition.key));
});

const updateEditions = () => {
  emit("updateEditions", selectedEditions.value);
};

const dropdown = ref(null);

const handleOutsideClick = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    emit("updateEditions", selectedEditions.value);
    emit("closeDropdown");
  }
};

onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>

<style>
.dropdown {
  position: absolute;
  right: 0;
  top: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 999;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  font-weight: normal;
}

.dropdown label {
  display: block;
  padding: 4px 12px;
}

.dropdown label:hover {
  background-color: #f3f3f3;
}

.dropdown label:last-of-type {
  margin-bottom: 0;
}

.dropdown .dropdown-input {
  margin-right: 8px;
}
</style>
