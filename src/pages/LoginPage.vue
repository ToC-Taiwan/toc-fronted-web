<script setup lang="ts">
import AuthLogin from "@/components/AuthLogin.vue";
</script>

<template>
  <AuthLogin />
</template>

<route lang="json">
{
  "path": "/",
  "name": "LoginPage",
  "meta": {
    "layout": "BlankLayout"
  }
}
</route>
