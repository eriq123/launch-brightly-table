<template>
  <div>
    <table class="table w-full table-fixed border">
      <thead class="table-header-group">
        <tr class="table-row">
          <th class="table-cell border text-left" @click="sortTable('name')">
            Name
          </th>
          <th
            class="table-cell border text-left"
            @click="sortTable('description')"
          >
            Description
          </th>
          <th class="table-cell border text-left" @click="sortTable('edition')">
            Edition(s)
          </th>
          <th
            class="table-cell border text-left"
            @click="sortTable('timeOfCapture')"
          >
            Time of Screenshot
          </th>
        </tr>
      </thead>
      <tbody class="table-row-group">
        <tr v-for="item in sortedData" :key="item.id" class="table-row">
          <td class="table-cell border">{{ item.name }}</td>
          <td class="table-cell border">{{ item.description }}</td>
          <td class="table-cell border">{{ item.edition }}</td>
          <td class="table-cell border">
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
    if (sortKey.value === "timeOfCapture") {
      const timeA = new Date(a[sortKey.value]);
      const timeB = new Date(b[sortKey.value]);

      return sortDirection.value === "asc" ? timeA - timeB : timeB - timeA;
    } else {
      const nameA = a[sortKey.value]?.toUpperCase();
      const nameB = b[sortKey.value]?.toUpperCase();
      return sortDirection.value === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
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

<style scoped>
.table-body {
  background-color: #fff;
}

.table-cell {
  padding: 12px 16px;
}

.table-row:nth-child(odd) {
  background-color: #fafafa;
}

.table-row-group .table-row:hover {
  background-color: #f3f3f3;
}

.table-header-group .table-row {
  background-color: #f0f0f0;
}
</style>
