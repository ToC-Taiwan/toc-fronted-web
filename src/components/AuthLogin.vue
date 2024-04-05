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
  <v-row class="bg-containerBg position-relative" no-gutters>
    <v-col cols="12" lg="12" class="d-flex align-center">
      <v-container>
        <div
          class="d-flex align-center justify-center"
          style="min-height: calc(100vh - 148px)"
        >
          <v-row justify="center">
            <v-col cols="12" md="12">
              <v-card elevation="0" class="loginBox">
                <v-card elevation="24">
                  <v-card-text class="pa-sm-10 pa-6"> </v-card-text>
                </v-card>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
  </v-row>
</template>

<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
