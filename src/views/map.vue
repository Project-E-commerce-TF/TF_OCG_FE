<template>
  <div style="width: 100vw; height: 100vh">
    <!-- 100vw và 100vh là chiều rộng và chiều cao của màn hình -->
    <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="center"
      style="width: 100%; height: 100%"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>

      <l-marker :lat-lng="center" :icon="customIcon" @click="openGoogleMap">
      </l-marker>
    </l-map>
  </div>
</template>

<script>
/* global L */

import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      zoom: 40,
      center: [21.0165952, 105.8357328],
    };
  },
  computed: {
    customIcon() {
      return new L.Icon({
        iconUrl:
          "https://png.pngtree.com/png-vector/20220916/ourmid/pngtree-red-location-pin-icon-design-with-white-combination-png-image_6177042.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    },
  },
  methods: {
    openGoogleMap() {
      const [lat, lng] = this.center;
      const url = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(url, "_blank");
    },
  },
};
</script>
