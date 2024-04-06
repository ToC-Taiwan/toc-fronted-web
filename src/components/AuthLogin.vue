<script setup lang="ts">
import { Login, Refresh } from "@/apis/auth";
import { onBeforeMount, ref } from "vue";

const authorized = ref(false);
const username = ref("");
const password = ref("");
const rememberMeCheck = defineModel({
  default: false,
  type: Boolean
});

onBeforeMount(() => {
  Refresh()
    .then(() => {
      authorized.value = true;
    })
    .catch(() => {
      authorized.value = false;
      const storeUserName = localStorage.getItem("username") ?? "";
      if (storeUserName !== "") {
        username.value = storeUserName;
        rememberMeCheck.value = true;
      }
    });
});

function login() {
  Login(username.value, password.value)
    .then((res) => {
      authorized.value = true;
      localStorage.setItem("token", res.token);
      if (rememberMeCheck.value) {
        localStorage.setItem("username", username.value);
      } else {
        localStorage.removeItem("username");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
</script>

<template>
  <span>Hi</span>
</template>

<style lang="scss"></style>
