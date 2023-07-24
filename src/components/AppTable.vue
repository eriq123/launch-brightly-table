<template>
  <div>
    <table class="table w-full table-fixed">
      <thead class="table-header-group">
        <tr class="table-row">
          <th class="table-cell text-left" @click="sortTable('name')">Name</th>
          <th class="table-cell text-left" @click="sortTable('description')">
            Description
          </th>
          <th class="table-cell text-left" @click="sortTable('edition')">
            Edition(s)
          </th>
          <th class="table-cell text-left">Time of Screenshot</th>
        </tr>
      </thead>
      <tbody class="table-row-group">
        <tr v-for="item in sortedData" :key="item.id" class="table-row">
          <td class="table-cell">{{ item.name }}</td>
          <td class="table-cell">{{ item.description }}</td>
          <td class="table-cell">{{ item.edition }}</td>
          <td class="table-cell">
            {{ formatTime(item.timeOfCapture) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const data = ref([]);

axios.get("/lbdemo/baremetrics.json").then((response) => {
  data.value = response.data.features.items.map((item) => {
    let newItem = { name: item.name, description: item.description };
    newItem.edition = item.FeatureEditions?.items[0]?.edition?.name;
    newItem.timeOfCapture = item.screenshots?.items[0]?.timeOfCapture;
    return newItem;
  });
});

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const sortedData = computed(() => {
  return data.value.slice().sort((a, b) => {
    const nameA = a[sortKey.value]?.toUpperCase();
    const nameB = b[sortKey.value]?.toUpperCase();
    if (sortDirection.value === "asc") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });
});

const sortKey = ref("name");
const sortDirection = ref("asc");

const sortTable = (key) => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortDirection.value = "asc";
  }
};
</script>
