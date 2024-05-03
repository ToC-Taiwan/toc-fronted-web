<script setup lang="ts">
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { locale, availableLocales } = useI18n({ useScope: "global" });
const router = useRouter();
const refLocale = ref(locale);

watch(refLocale, (newVal) => {
  localStorage.setItem("locale", newVal);
  router.go(0);
});
</script>

<template>
  <Dropdown
    :key="`locale-${refLocale}`"
    v-model="refLocale"
    :options="availableLocales"
  >
  </Dropdown>
</template>
