<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Edition(s)</th>
          <th>Time of Screenshot</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            {{ item.FeatureEditions.items.length }}
          </td>
          <td>
            {{ formatTime(item.screenshots.items[0].timeOfCapture) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const data = ref([]);

axios.get("/lbdemo/baremetrics.json").then((response) => {
  data.value = response.data.features.items;
});

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
</script>
