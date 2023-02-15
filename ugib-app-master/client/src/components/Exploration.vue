<template>
  <div class="wrapper-content wrapper-content--fixed">
    <v-overlay :value="overlay" z-index="99">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <section class="map-container">
      <l-map
        ref="map"
        style="height: 91vh"
        :zoom="zoom"
        :minZoom="minZoom"
        :center="center"
        :options="{ attributionControl: false }"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
      >
        <l-control-layers position="topright" :collapsed="false" />
        <l-tile-layer :name="pane.name" :url="pane.url" layer-type="base" />
        <l-tile-layer
          v-for="baseProvider in baseProviders"
          :key="baseProvider.name"
          :name="baseProvider.name"
          :visible="baseProvider.visible"
          :url="baseProvider.url"
          :attribution="baseProvider.attribution"
        />
        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base"
        />
        <l-geo-json
          :visible="true"
          :geojson="geom"
          :options="features"
          :options-style="geoStyle"
        />
        <l-geo-json
          name="Сопровождаемые объекты ГРР"
          :visible="true"
          :geojson="accompany"
          :options="features"
          :options-style="styleFunction"
          layer-type="overlay"
        />
        <l-geo-json
          name="Предлагаемые объекты ГРР"
          :visible="true"
          :geojson="stage"
          :options="features"
          :options-style="styleFunctionStage"
          layer-type="overlay"
        />
        <l-wms-tile-layer
          v-for="layer in layers"
          :key="layer.name"
          :base-url="firstUrl"
          :layers="layer.layers"
          :visible="layer.visible"
          :name="layer.name"
          :format="layer.format"
          :transparent="layer.transparent"
          layer-type="overlay"
        />
        <l-wms-tile-layer
          v-for="customLayer in customLayers"
          :key="customLayer.name"
          :base-url="secondUrl"
          :layers="customLayer.customLayers"
          :visible="customLayer.visible"
          :name="customLayer.name"
          :format="customLayer.format"
          :transparent="customLayer.transparent"
          layer-type="overlay"
        />
        <l-wms-tile-layer
          v-for="baseLayer in baseLayers"
          :key="baseLayer.name"
          :base-url="thirdUrl"
          :layers="baseLayer.baseLayers"
          :visible="baseLayer.visible"
          :name="baseLayer.name"
          :format="baseLayer.format"
          :transparent="baseLayer.transparent"
          layer-type="overlay"
        />
        <l-control-fullscreen
          position="topleft"
          :options="{ title: { false: 'На весь экран', true: 'Свернуть' } }"
        />
        <v-geosearch :options="geosearchOptions" />
        <l-control-polyline-measure
          :options="{ showUnitControl: true }"
          position="topleft"
        />
        <l-control-attribution
          position="bottomright"
          :prefix="
            `<span>CRS:WGS-84&nbsp;EPSG:3857&nbsp;Коорд.&nbsp;центра: ` +
              center.lat +
              `&nbsp;С.Ш.&nbsp;` +
              center.lng +
              `&nbsp;В.Д.&nbsp;Zoom: ` +
              zoom +
              `&nbsp;&nbsp;Leaflet</span>`
          "
        ></l-control-attribution>
        <l-control position="bottomright">
          <v-btn
            class="aim-map-event-el"
            dark
            href="Blank.docx"
            @click="addEventsOnMap"
          >
            Скачать форму заявки
          </v-btn>
        </l-control>
        <l-control-scale position="bottomleft" :imperial="false" />
        <l-control :position="'bottomright'">
          <img src="@/img/tsnigri_horizontal.png" class="vertical-logo-img" />
        </l-control>
      </l-map>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { CRS, latlng, latLngBounds } from "leaflet";
import "../assets/css/leaflet.css";
import "../assets/css/geosearch.css";
import VGeosearch from "vue2-leaflet-geosearch";
import LControlFullscreen from "vue2-leaflet-fullscreen";
import VueLeafletMinimap from "vue-leaflet-minimap";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LControlPolylineMeasure from "vue2-leaflet-polyline-measure";
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControlScale,
  LWMSTileLayer,
  LMarker,
  LGeoJson,
  LControl,
  LControlAttribution,
} from "vue2-leaflet";

export default {
  name: "Resources",
  components: {
    LMap,
    LTileLayer,
    LControlLayers,
    LControlScale,
    LControlFullscreen,
    VueLeafletMinimap,
    VGeosearch,
    LMarker,
    LGeoJson,
    LControl,
    latlng,
    latLngBounds,
    CRS,
    LControlAttribution,
    LControlPolylineMeasure,
    "l-wms-tile-layer": LWMSTileLayer,
  },
  data() {
    return {
      zoom: 4,
      minZoom: 3,
      center: [64.7556, 96.7766],
      show: true,
      overlay: true,
      geom: null,
      geojson: null,
      accompany: null,
      stage: null,
      fillColor: "orange",
      baseProviders: [
        {
          name: "ЕЭКО",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/BaseMap/MapServer/tile/{z}/{y}/{x}",
          attribution:
            '&copy; <a target="_blank" href="https://rosreestr.ru/site/">Росреестр</a> 2010, ЕЭКО',
        },
        {
          name: "ЕЭКО Аннотации",
          visible: true,
          url:
            "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/Anno/MapServer/tile/{z}/{y}/{x}",
        },
      ],
      tileProviders: [
        {
          name: "OpenStreetMap",
          visible: false,
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution:
            '&copy; Участники <a href="http://osm.org/copyright">OpenStreetMap</a> ',
        },
        {
          name: "OpenTopoMap",
          visible: false,
          url: "https://tile-a.opentopomap.ru/{z}/{x}/{y}.png",
          attribution:
            'Map data: &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a target="_blank" href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        },
        {
          name: "Mapbox Спутник",
          visible: false,
          url:
            "https://a.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
          attribution:
            '&copy; <a target="_blank" href="https://www.mapbox.com/about/maps/">Mapbox </a>&copy; <a target="_blank" href="https://www.maxar.com/">Maxar</a>',
        },
      ],
      firstUrl: "http://wms.vsegei.ru/VSEGEI_Bedrock_geology/wms?",
      secondUrl: "http://wms.vsegei.ru/VSEGEI_Bedrock_geology2/wms?",
      thirdUrl: "http://kastor.tsnigri.ru:8585/geoserver/NET2/wms?",
      pane: {
        name: "ЕЭКО",
        visible: true,
        url:
          "https://pkk.rosreestr.ru/arcgis/rest/services/BaseMaps/Anno/MapServer/tile/{z}/{y}/{x}",
      },
      layers: [
        {
          name: "ГГК ВСЕГЕИ 1:1 000 000",
          visible: false,
          format: "image/png",
          layers: "RUSSIA_VSEGEI_1M_BLS",
          transparent: false,
        },
      ],
      customLayers: [
        {
          name: "ГГК ВСЕГЕИ 1:200 000",
          visible: false,
          format: "image/png",
          customLayers: "CIS_VSEGEI_200K_BLS",
          transparent: false,
        },
      ],
      baseLayers: [
        {
          name: "Границы субъектов",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:ne_10m_adm_regions_line",
          transparent: true,
        },
        {
          name: "Государственная граница",
          format: "image/png",
          baseLayers: "NET2:ne_10m_admrf_line",
          transparent: true,
        },
        {
          name: "Граница АЗРФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:azrf",
          transparent: true,
        },
        {
          name: "Действующие ООПТ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:oopt_active",
          transparent: true,
        },
        {
          name: "Автодороги федеральные",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:roads_main_RU",
          transparent: true,
        },
        {
          name: "Железные дороги",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:rails_main_RU",
          transparent: true,
        },
        {
          name: "Аэропорты",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:dor_airports_RF",
          transparent: true,
        },
        {
          name: "Морские и речные порты",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:hyd_seaport",
          transparent: true,
        },
        {
          name: "ГОК и ЗИФ",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:obr_gokzif",
          transparent: true,
        },
        {
          name: "Электростанции",
          visible: true,
          format: "image/png",
          baseLayers: "NET2:eng_powerstation",
          transparent: true,
        },
        {
          name: "Электроподстанции",
          visible: false,
          format: "image/png",
          baseLayers: "NET2:eng_powersub",
          transparent: true,
        },
      ],
      geosearchOptions: {
        provider: new OpenStreetMapProvider(),
        style: "button",
        animateZoom: true,
        autoClose: true,
        searchLabel: "Поиск",
      },
    };
  },
  computed: {
    features() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    getColor() {
      return (f13) => {
        if (f13 == "Сопровождение ГРР") {
          return "#FF0000";
        } else if (f13 == "Постановка ГРР") {
          return "#8b1196";
        }
      };
    },
    styleFunction() {
      return () => {
        return {
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.07,
          color: "#FF0000",
          fillColor: "#FF0000",
        };
      };
    },
    styleFunctionStage() {
      return () => {
        return {
          weight: 1.5,
          opacity: 1,
          fillOpacity: 0.07,
          color: "#8b1196",
          fillColor: "#8b1196",
        };
      };
    },
    geoStyle() {
      return () => {
        return {
          weight: 5,
          opacity: 1,
          fillOpacity: 0,
          color: "#333",
          dashArray: "20, 20",
          dashOffset: "20",
        };
      };
    },
    onEachFeatureFunction() {
      return (feature, layer) => {
        let userRole = localStorage.getItem("role");
        let popupText = "";
        let popupSubText = "";
        let ArraySub = [];
        let uniqueArraySub = [];
        let uniqueArray = [...new Set(feature.properties.f1)];
        feature.properties.f1.forEach(function(item, i, arr) {
          ArraySub[i] = feature.properties.f5[i];
          if (feature.properties.f4[i] === null) {
            ArraySub[i] = ArraySub[i] + "";
          } else {
            ArraySub[i] = ArraySub[i] + ", " + feature.properties.f4[i];
          }
        }),
          (uniqueArraySub = [...new Set(ArraySub)]);
        uniqueArray.forEach(function(item1, i1, arr1, item2) {
          if (userRole === "chief" || userRole === "admin") {
            popupText =
              popupText +
              "<h4 style='font-style: italic; color: gray;'>" +
              feature.properties.f13 +
              "</h4></br>" +
              "<div><h3 style='width: 470px'>" +
              item1.replace(/\-/g, "&#8209;") +
              "</h3></div>";
            uniqueArraySub.forEach(function(item2, i2, arr2) {
              uniqueArray.forEach(function(item, i, arr) {
                popupSubText = feature.properties.f5[i];
                if (feature.properties.f4[i] === null) {
                  popupSubText = popupSubText + "";
                } else {
                  popupSubText = popupSubText + ", " + feature.properties.f4[i];
                }
                if (
                  item1 === feature.properties.f1[i] &&
                  item2 === popupSubText
                ) {
                  popupText =
                    popupText +
                    "<h4 style='width: 450px'>" +
                    item2 +
                    "</h4><br/>";
                  popupText =
                    popupText +
                    "<table class='table'><tbody>" +
                    '<tr style="height: 18px;">';
                }
              });
              feature.properties.f1.forEach(function(item, i, arr) {
                popupSubText = feature.properties.f5[i];
                if (feature.properties.f4[i] === null) {
                  popupSubText = popupSubText + "";
                } else {
                  popupSubText = popupSubText + ", " + feature.properties.f4[i];
                }
                if (
                  item1 === feature.properties.f1[i] &&
                  item2 === popupSubText
                ) {
                  popupText =
                    popupText +
                    '<td style="width: 50%; height: 19px;  text-align: left;">' +
                    feature.properties.f11[i] +
                    "</td>" +
                    '<td style="width: 20%; height: 19px;"><a href="' +
                    feature.properties.f2[i] +
                    '" target ="_blank"><span style="background-color: #333333; color: #fff; display: inline-block; padding: 2px 8px; font-weight: bold; border-radius: 3px;">Материалы</span></td>' +
                    '<td style="width: 20%; height: 19px;"><button value="' +
                    feature.properties.f12[i] +
                    '"class="aim-map-event-el"><span style="background-color: #333333; color: #fff; display: inline-block; padding: 2px 8px; font-weight: bold; border-radius: 3px;">Реестр</span></button></td>' +
                    "</tr>";
                }
              }),
                (popupText = popupText + "</tbody></table>");
            });
          } else {
            popupText =
              popupText +
              "<h4 style='font-style: italic; color: gray;'>" +
              feature.properties.f13 +
              "</h4></br>" +
              "<div><h3 style='width: 470px'>" +
              item1.replace(/\-/g, "&#8209;") +
              "</h3></div>";
            uniqueArraySub.forEach(function(item2, i2, arr2) {
              uniqueArray.forEach(function(item, i, arr) {
                popupSubText = feature.properties.f5[i];
                if (feature.properties.f4[i] === null) {
                  popupSubText = popupSubText + "";
                } else {
                  popupSubText = popupSubText + ", " + feature.properties.f4[i];
                }
                if (
                  item1 === feature.properties.f1[i] &&
                  item2 === popupSubText
                ) {
                  popupText =
                    popupText +
                    "<h4 style='width: 450px'>" +
                    item2 +
                    "</h4><br/>";
                  popupText =
                    popupText +
                    "<table class='table'><tbody>" +
                    '<tr style="height: 18px;">';
                }
              });
              feature.properties.f1.forEach(function(item, i, arr) {
                popupSubText = feature.properties.f5[i];
                if (feature.properties.f4[i] === null) {
                  popupSubText = popupSubText + "";
                } else {
                  popupSubText = popupSubText + ", " + feature.properties.f4[i];
                }
                if (
                  item1 === feature.properties.f1[i] &&
                  item2 === popupSubText
                ) {
                  popupText =
                    popupText +
                    '<td style="width: 50%; height: 19px;  text-align: left;">' +
                    feature.properties.f11[i] +
                    "</td>" +
                    '<td style="width: 20%; height: 19px;"><button value="' +
                    feature.properties.f12[i] +
                    '"class="aim-map-event-el"><span style="background-color: #333333; color: #fff; display: inline-block; padding: 2px 8px; font-weight: bold; border-radius: 3px;">Реестр</span></button></td>' +
                    "</tr>";
                }
              }),
                (popupText = popupText + "</tbody></table>");
            });
          }
        }),
          layer.bindPopup(popupText, { permanent: false, sticky: true });
        layer.bindTooltip(
          "<p><b>Объект: </b>" + feature.properties.f1[0] + "</p>",
          {
            permanent: false,
            sticky: true,
            offset: [10, 0],
          }
        );
        layer.on({
          mouseover: this.highlightFeature,
          mouseout: this.resetHighlight,
        });
      };
    },
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
    const domain = localStorage.getItem("domain");
    axios
      .all([
        axios.get(`http://${domain}:3000/api/accomgeojson`),
        axios.get(`http://${domain}:3000/api/stagegeojson`),
      ])
      .then((resArr) => {
        this.error = null;
        this.overlay = false;
        this.geojson = [];
        this.accompany = resArr[0].data;
        this.stage = resArr[1].data;
        this.showGeometry(this.accompany);
        this.showGeometry(this.stage);
      })
      .catch((err) => {
        console.log(err);
        this.protocols = null;
        this.error = "Can`t find this Json";
      });
  },
  methods: {
    showGeometry(list) {
      const object = localStorage.getItem("grrValue");
      if (!object) return;
      const geo = list.features.find(
        (item) =>
          item.geometry &&
          item.properties &&
          Array.isArray(item.properties.f10) &&
          item.properties.f10.indexOf(object) + 1
      );
      this.geom = geo;
      if (!geo) return;
      const group = L.geoJson(geo);
      this.$refs.map.mapObject.fitBounds(group.getBounds());
      this.show = false;
    },
    highlightFeature(e) {
      let layer = e.target;

      layer.setStyle({
        weight: 4,
        color: "#666",
      });
    },
    resetHighlight(e) {
      let layer = e.target;
      let feature = e.target.feature.properties.f13;

      layer.setStyle({
        weight: 1.5,
        color: this.getColor(feature),
        fillColor: this.getColor(feature),
        opacity: 1,
        fillOpacity: 0.07,
      });
    },
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
  },
};
</script>

<style lang="scss">
@import "~leaflet-minimap/dist/Control.MiniMap.min.css";

span {
  font-size: 12px;
}

input[type="checkbox"],
input[type="radio"] {
  padding: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  margin: 3px 0.5ex;
  border-radius: 0px;
}

table,
th,
td {
  width: 480px;
  border-collapse: collapse;
  text-align: center;
  padding: 7px;
  td {
    text-align: center;
  }
}
.table tr:nth-child(odd) {
  background: #f3f3f3;
}
.table tr:nth-child(even) {
  background: #fff;
}

label {
  text-align: left !important;
}
.leaflet-container {
  font: 12px/1.5 "Montserrat", Arial, Helvetica, sans-serif;
}
.map-container {
  padding: 0px;
  margin-top: 23px !important;
  z-index: 0;
}
.leaflet-control-layers {
  max-height: 820px;
  overflow-y: auto;
}
.leaflet-control-layers-list {
  padding: 0px;
}
.leaflet-control-layers-selector {
  margin: 0px;
}
.leaflet-control-layers-expanded {
  height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.vertical-logo-img {
  width: 150px;
  margin-left: 50px;
}
.example-custom-control {
  background: #fff;
  padding: 0 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
}
.custom-control-watermark {
  font-size: 200%;
  font-weight: bolder;
  color: #aaa;
  text-shadow: #555;
}
.btn__default {
  margin: 0px !important;
}

.leaflet-popup-content-wrapper {
  width: 520px;
}

.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  background-clip: padding-box;
}

.leaflet-touch .leaflet-control-layers,
.leaflet-touch .leaflet-bar {
  -webkit-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 0px 7px 4px rgba(34, 60, 80, 0.2);
}
</style>
