<template>
  <td class="table-cell border">
    {{ isDate ? formatTime(props.content) : props.content }}
  </td>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["content"]);

const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const isDate = props.content && !isNaN(Date.parse(props.content));
</script>
