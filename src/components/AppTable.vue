<template>
  <div>
    <table class="table w-full table-fixed border">
      <thead class="table-header-group">
        <tr class="table-row">
          <TableHeaderCell
            v-for="header in headers"
            :key="header.key"
            :headerKey="header.key"
            :label="header.label"
            @sort="sortTable"
          />
        </tr>
      </thead>
      <tbody class="table-row-group">
        <tr v-for="item in sortedData" :key="item.id" class="table-row">
          <TableDataCell
            v-for="header in headers"
            :key="header.key"
            :content="item[header.key]"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import TableHeaderCell from "./TableHeaderCell.vue";
import TableDataCell from "./TableDataCell.vue";

const data = ref([]);

axios.get("/lbdemo/baremetrics.json").then((response) => {
  data.value = response.data.features.items.map((item) => {
    let newItem = { name: item.name, description: item.description };
    newItem.edition = item.FeatureEditions?.items[0]?.edition?.name;
    newItem.timeOfCapture = item.screenshots?.items?.filter(
      (screenshot) =>
        screenshot.status === "completed" || screenshot.status === "timedOut"
    );
    newItem.timeOfCapture =
      newItem.timeOfCapture?.length > 0
        ? newItem.timeOfCapture[0].timeOfCapture
        : "";
    return newItem;
  });
});

const headers = ref([
  { key: "name", label: "Name" },
  { key: "description", label: "Description" },
  { key: "edition", label: "Edition(s)" },
  { key: "timeOfCapture", label: "Time of Screenshot" },
]);

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
