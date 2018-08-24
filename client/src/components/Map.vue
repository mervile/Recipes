<template>
    <div class="map">
        <div id="map"></div>
        <div class="controls">
            <toggle-buttons
                v-on:value-changed="setActiveMarker"
                label="marker.setIngredient"
                v-bind:buttons="markers"></toggle-buttons>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'ol/ol.css';
import ToggleButtons from './ToggleButtons.vue';
import {MarkerType} from '../../../common/models';
import {mapService} from '../services/MapService';

export default Vue.extend({
    components: {
        ToggleButtons
    },
    mounted () {
        const map = mapService.initMap();

        mapService.navigateToUser();

        map.on('click', (e: any) => {
            mapService.addMarker(e, this.marker);
        });
    },
    data: function() {
        return {
            marker: MarkerType.BLUEBERRY,
            markers: mapService.getMarkers()
        }
    },
    methods: {
        setActiveMarker (value: MarkerType) {
            this.marker = value;
        }
    }
});
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}

#map {
  background-color: rgb(248, 244, 240);
  height: 100%;
}

.controls {
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: aliceblue;
    border: 1px solid darkgray;
    padding: 1em;
}
</style>
