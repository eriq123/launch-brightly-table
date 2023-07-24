<template>
  <svg
    class="w-4 h-4 text-gray-800 dark:text-white inline-block"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 14"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      :d="props.content"
    />
  </svg>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["content"]);
</script>
