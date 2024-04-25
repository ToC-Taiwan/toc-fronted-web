<script setup lang="ts">
import { WSMessage } from "@/pb/app/app";
import { FutureRealTimeTickMessage } from "@/pb/forwarder/mq";
import { onMounted, onUnmounted, ref } from "vue";

const tick = ref<FutureRealTimeTickMessage>();
let socket: WebSocket | null = null;

onMounted(() => {
  const prototol = window.location.protocol === "https:" ? "wss" : "ws";
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  const url = `${prototol}://${window.location.host}/tmt/v1/stream/ws/pick-future/MXFE4?token=${token}`;
  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
  socket.addEventListener("message", (event) => {
    const data = WSMessage.deserializeBinary(new Uint8Array(event.data));
    if (data.has_future_tick) {
      tick.value = data.future_tick;
    }
  });
});

onUnmounted(() => {
  socket?.close();
});
</script>

<template>
  <Card v-model="tick" style="width: 25rem; overflow: hidden">
    <template #header></template>
    <template #title>{{ tick?.code }}</template>
    <template #subtitle>{{ tick?.close }}</template>
    <template #content>{{ tick?.price_chg }}</template>
    <template #footer>{{ tick?.date_time }}</template>
  </Card>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "path": "/realtime/future",
  "name": "RealtimeFuture"
}
</route>
