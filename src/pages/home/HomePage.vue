<script setup lang="ts">
// import { StockDetailMessage } from "@/pb/forwarder/basic";

// const stock = new StockDetailMessage();
// stock.code = "000001";

// const bytesData: Uint8Array = stock.serialize();

// console.log(bytesData);
// console.log(StockDetailMessage.deserialize(bytesData).code);
</script>

<template>
  <div>
    <h1>Home</h1>
    <p>Home page content</p>
  </div>
</template>

<route lang="json">
{
  "path": "/",
  "name": "HomePage"
}
</route>
