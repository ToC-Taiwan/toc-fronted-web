<script setup lang="ts">
import {
  StockVolumeRankMessage,
  StockVolumeRankResponse
} from "@chindada/toc-trade-protobuf/typescript/forwarder/realtime";
import { onMounted, ref } from "vue";

const stocks = ref<StockVolumeRankMessage[]>([]);

onMounted(() => {
  const prototol = window.location.protocol === "https:" ? "wss" : "ws";
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  const url = `${prototol}://${window.location.host}/tmt/v1/targets/ws?token=${token}`;
  const socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
  socket.addEventListener("message", (event) => {
    const data = StockVolumeRankResponse.deserializeBinary(
      new Uint8Array(event.data)
    );
    stocks.value = data.data;
  });
});
</script>

<template>
  <div class="card">
    <DataTable :value="stocks" striped-rows table-style="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="close" header="Close"></Column>
      <Column field="total_volume" header="Total Volume"></Column>
    </DataTable>
  </div>
</template>

<route lang="json">
{
  "meta": {
    "title": "page_home"
  }
}
</route>
