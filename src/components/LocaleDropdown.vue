<script setup lang="ts"></script>

<template>
  <Dropdown
    :key="`locale-${$i18n.locale}`"
    v-model="$i18n.locale"
    :options="$i18n.availableLocales"
  >
  </Dropdown>
</template>
