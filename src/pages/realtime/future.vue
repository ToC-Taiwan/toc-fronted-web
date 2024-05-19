<script setup lang="ts">
import { GetNearestMXF } from "@/apis/basic/search";
import {
  TradeIndex,
  WSMessage
} from "@chindada/toc-trade-protobuf/src/ts/app/app";
import type { FutureDetailMessage } from "@chindada/toc-trade-protobuf/src/ts/forwarder/basic";
import { FutureRealTimeTickMessage } from "@chindada/toc-trade-protobuf/src/ts/forwarder/mq";
import {
  CandleSeries,
  Category,
  ColumnSeries,
  Crosshair,
  DateTime,
  Logarithmic,
  StripLine,
  Tooltip,
  Zoom
} from "@syncfusion/ej2-vue-charts";
import { onMounted, onUnmounted, provide, ref } from "vue";

let socket: WebSocket | null = null;

const futureCode = ref("");
const futureDetail = ref<FutureDetailMessage>();
const tradeIndex = ref<TradeIndex | null>(null);
const tick = ref<FutureRealTimeTickMessage | null>(null);
const tickArr = ref<TimelineItem[]>([]);
const seriesData = ref<Kbar[]>([]);

onMounted(async () => {
  await GetNearestMXF().then((res) => {
    futureCode.value = res.code;
  });

  if (futureCode.value === "") {
    return;
  }

  const prototol = window.location.protocol === "https:" ? "wss" : "ws";
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  const url = `${prototol}://${window.location.host}/tmt/v1/stream/ws/pick-future/${futureCode.value}?token=${token}`;
  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
  socket.addEventListener("message", (event) => {
    const data = WSMessage.deserializeBinary(new Uint8Array(event.data));
    if (tick.value && data.has_future_tick) {
      tick.value = data.future_tick;
      tickArr.value.unshift({
        status: `${data.future_tick.close.toString()} x ${data.future_tick.volume}`,
        date: data.future_tick.date_time,
        icon: "pi pi-bars",
        color: data.future_tick.tick_type === 1 ? "red" : "green"
      });
      if (tickArr.value.length > 6) {
        tickArr.value.splice(-1);
      }
    } else if (data.has_history_kbar) {
      seriesData.value = [];
      data.history_kbar.data.forEach((kbar) => {
        const kbarTime = new Date(kbar.ts / 1000 / 1000);
        kbarTime.setHours(kbarTime.getHours() - 8);
        seriesData.value.push({
          period: kbarTime,
          open: kbar.open,
          high: kbar.high,
          low: kbar.low,
          close: kbar.close,
          volume: kbar.volume
        });
      });
    } else if (data.has_future_detail) {
      futureDetail.value = data.future_detail;
    } else if (!tick.value && data.has_snapshot) {
      tick.value = new FutureRealTimeTickMessage({
        code: data.snapshot.code,
        date_time: new Date(data.snapshot.ts / 1000 / 1000).toISOString(),
        close: data.snapshot.close,
        price_chg: data.snapshot.change_price,
        volume: data.snapshot.volume
      });
      tickArr.value.push({
        status: `${data.snapshot.close.toString()} x ${data.snapshot.volume}`,
        date: new Date(data.snapshot.ts / 1000 / 1000).toISOString(),
        icon: "pi pi-bars",
        color: "grey"
      });
    } else if (data.has_trade_index) {
      tradeIndex.value = data.trade_index;
    }
  });
});

onUnmounted(() => {
  socket?.close();
});

interface Kbar {
  period: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface TimelineItem {
  status: string;
  date: string;
  icon: string;
  color: string;
}

provide("chart", [
  CandleSeries,
  StripLine,
  Category,
  Tooltip,
  DateTime,
  Zoom,
  ColumnSeries,
  Logarithmic,
  Crosshair
]);
provide("rangeNavigator", [DateTime]);

const primaryXAxis = {
  valueType: "DateTime",
  crosshairTooltip: { enable: true },
  majorGridLines: { width: 0 }
};

const primaryYAxis = {
  title: "Volume",
  opposedPosition: true,
  labelFormat: "{value}",
  majorGridLines: { width: 1 },
  lineStyle: { width: 0 },
  majorTickLines: { width: 0 }
};

const rows = [
  {
    height: "30%"
  },
  {
    height: "70%"
  }
];

const axes = [
  {
    name: "secondary",
    opposedPosition: true,
    rowIndex: 1,
    majorGridLines: { width: 1 },
    title: "Price",
    plotOffset: 20,
    lineStyle: { width: 0 },
    rangePadding: "None"
  }
];

const tooltip = {
  enable: true,
  shared: true,
  header: "",
  format: "High : <b>${point.high}</b> <br> "
    .concat("Low : <b>${point.low}</b> <br> ")
    .concat("Open : <b>${point.open}</b> <br> ")
    .concat("Close : <b>${point.close}</b> <br> ")
    .concat("Volume : <b>${point.volume}</b>")
};

const enableTooltip = false;

const chartArea = {
  border: { width: 0 }
};

const legendSettings = {
  visible: false
};
</script>

<template>
  <div class="grid">
    <div class="col-12 xl:col-8">
      <div class="grid">
        <div class="col-6 xl:col-3">
          <Card class="card">
            <template #title>NASDAQ</template>
            <template #content>
              <div
                class="text-5xl"
                :class="{
                  'text-green-500': tradeIndex?.nasdaq.price_chg! < 0,
                  'text-red-500': tradeIndex?.nasdaq.price_chg! > 0
                }"
              >
                {{ Math.abs(tradeIndex?.nasdaq.price_chg || 0).toFixed(2) }}
              </div>
            </template>
          </Card>
        </div>
        <div class="col-6 xl:col-3">
          <Card class="card">
            <template #title>NF</template>
            <template #content>
              <div
                class="text-5xl"
                :class="{
                  'text-green-500': tradeIndex?.nf.price_chg! < 0,
                  'text-red-500': tradeIndex?.nf.price_chg! > 0
                }"
              >
                {{ Math.abs(tradeIndex?.nf.price_chg || 0).toFixed(2) }}
              </div>
            </template>
          </Card>
        </div>
        <div class="col-6 xl:col-3">
          <Card class="card">
            <template #title>TSE</template>
            <template #content>
              <div
                class="text-5xl"
                :class="{
                  'text-green-500': tradeIndex?.tse.price_chg! < 0,
                  'text-red-500': tradeIndex?.tse.price_chg! > 0
                }"
              >
                {{ Math.abs(tradeIndex?.tse.price_chg || 0).toFixed(2) }}
              </div>
            </template>
          </Card>
        </div>
        <div class="col-6 xl:col-3">
          <Card class="card">
            <template #title>OTC</template>
            <template #content>
              <div
                class="text-5xl"
                :class="{
                  'text-green-500': tradeIndex?.otc.price_chg! < 0,
                  'text-red-500': tradeIndex?.otc.price_chg! > 0
                }"
              >
                {{ Math.abs(tradeIndex?.otc.price_chg || 0).toFixed(2) }}
              </div>
            </template>
          </Card>
        </div>
        <div class="col-12">
          <Card class="card hidden xl:block">
            <template #content>
              <ejs-chart
                id="chartCandle"
                ref="chart"
                :chart-area="chartArea"
                align="center"
                :title="futureDetail?.name"
                style="display: block"
                :primary-x-axis="primaryXAxis"
                :primary-y-axis="primaryYAxis"
                :tooltip="tooltip"
                :axes="axes"
                :rows="rows"
                :legend-settings="legendSettings"
              >
                <e-series-collection>
                  <e-series
                    :data-source="seriesData"
                    :enable-tooltip="enableTooltip"
                    type="Column"
                    x-name="period"
                    y-name="volume"
                    name="Volume"
                  >
                  </e-series>
                  <e-series
                    :data-source="seriesData"
                    type="Candle"
                    x-name="period"
                    y-axis-name="secondary"
                    high="high"
                    low="low"
                    open="open"
                    close="close"
                    volume="volume"
                    bear-fill-color="red"
                    bull-fill-color="green"
                  >
                  </e-series>
                </e-series-collection>
              </ejs-chart>
            </template>
          </Card>
        </div>
      </div>
    </div>
    <div class="col-12 xl:col-4">
      <Card class="card">
        <template #header></template>
        <template #title>{{ tick?.code }}</template>
        <template #subtitle>
          <div
            class="text-6xl"
            :class="{
              'text-green-500': tick?.price_chg! < 0,
              'text-red-500': tick?.price_chg! > 0
            }"
          >
            {{ tick?.close }}
          </div>
        </template>
        <template #content>
          <div class="text-6xl">
            <span v-if="tick?.price_chg! > 0">+</span>
            <span v-if="tick?.price_chg! < 0">-</span>
            {{ Math.abs(tick?.price_chg!) }}
          </div>
        </template>
        <template #footer>{{ tick?.date_time }}</template>
      </Card>
      <Timeline class="card" :value="tickArr">
        <template #marker="slotProps">
          <span
            class="flex w-2rem h-2rem align-items-center justify-content-center text-white border-circle z-1 shadow-1"
            :style="{ backgroundColor: slotProps.item.color }"
          >
            <i :class="slotProps.item.icon"></i>
          </span>
        </template>
        <template #opposite="slotProps">
          <small class="p-text-secondary">{{ slotProps.item.date }}</small>
        </template>
        <template #content="slotProps">
          {{ slotProps.item.status }}
        </template>
      </Timeline>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "meta": {
    "title": "page_realtime_future"
  }
}
</route>
