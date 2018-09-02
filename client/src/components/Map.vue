<template>
    <div class="map">
        <div id="map"></div>
        <div class="controls">
            <toggle-buttons
                v-on:value-changed="setActiveMarker"
                v-bind:keep-active="false"
                label="marker.setIngredient"
                v-bind:buttons="markers"></toggle-buttons>

            <div class="map-actions">
                <a class="map-action" v-on:click.stop.prevent="clearMap">{{ $t('clearMap') }}</a>
                <a class="map-action" v-bind:href="sourceJSON" download="features.json">{{ $t('downloadMap') }}</a>
            </div>
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
            if (this.marker !== null) {
                mapService.addMarker(e, this.marker);
            }
        });

        mapService.source.on('change', () => {
            this.sourceJSON = mapService.getSourceJSON();
        });

        mapService.selectInteraction.on('select', (e) => {
            e.selected.forEach((feature) => {
                mapService.setSelectedStyle(feature);
            });
            e.deselected.forEach((feature) => {
                feature.setStyle(mapService.styleFn);
            });
        });
    },
    data: function() {
        return {
            marker: MarkerType.BLUEBERRY,
            markers: mapService.getMarkers(),
            sourceJSON: ''
        }
    },
    methods: {
        setActiveMarker (marker) {
            this.marker = marker.active ? marker.value : null;
        },
        clearMap() {
            mapService.clearMap();
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.map-action {
    padding: 1em;
    background-color: darkgreen;
    color: white;
    text-transform: uppercase;
    margin: 5px;
    text-decoration: none;
    cursor: pointer;
}
</style>
