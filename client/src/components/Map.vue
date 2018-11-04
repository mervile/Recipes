<template>
    <div class="map">
        <div id="map"></div>
        <div class="controls">
            <toggle-buttons
                v-on:value-changed="setActiveMarker"
                v-bind:keep-active="false"
                label="marker.setIngredient"
                v-bind:buttons="markers"></toggle-buttons>

            <div class="selected-actions" v-if="selected.length > 0">
                <toggle-buttons
                    v-on:value-changed="setActiveSelectedAction"
                    v-bind:keep-active="false"
                    label="marker.selectAction"
                    v-bind:buttons="selectedActions"></toggle-buttons>
                <button class="map-action" v-on:click.stop.prevent="removeSelected">{{ $t('remove') }}</button>
            </div>

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
import * as _ from 'lodash';
import Feature from 'ol/Feature.js';

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
            } else if (this.selectedAction === 'move') {
                mapService.moveMarkers(e, this.selected);
                this.clearSelection();
            }
        });

        mapService.source.on('change', () => {
            this.sourceJSON = mapService.getSourceJSON();
        });

        mapService.selectInteraction.on('select', (e) => {
            e.selected.forEach((feature) => {
                mapService.setSelectedStyle(feature);
                this.selected.push(feature);
            });
            e.deselected.forEach((feature) => {
                feature.setStyle(mapService.styleFn);
                this.selected = _.remove(this.selected, (f: Feature) => f.getId() !== feature.getId());
            });
        });
    },
    data: function() {
        return {
            marker: MarkerType.BLUEBERRY,
            markers: mapService.getMarkers(),
            sourceJSON: '',
            selected: <Feature[]>[],
            selectedActions: [
                { id: 'move', label: 'move', active: false, value: 'move' }
            ],
            selectedAction: null
        }
    },
    methods: {
        setActiveMarker(marker) {
            this.marker = marker.active ? marker.value : null;
        },
        setActiveSelectedAction(action) {
            this.selectedAction = action.value;
        },
        clearSelection() {
            this.selected = [];
            this.selectedAction = null;
            this.selectedActions.forEach((action) => {
                action.active = false
            });
        },
        clearMap() {
            mapService.selectInteraction.getFeatures().clear();
            this.clearSelection();
            mapService.clearMap();
        },
        removeSelected() {
            mapService.removeMarkers(this.selected);
            this.selected = [];
        }
    }
});
</script>

<style scoped>
.map {
    width: 100%;
    position: absolute;
    top: 84px;
    bottom: 0px;
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
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

@media screen and (max-width: 500px) {
    .map {
        top: 185px;
    }
}

@media screen and (max-width: 640px) {
    .controls {
        flex-direction: column;
    }
}

.map-actions {
    margin: 1em;
}

.map-action {
    padding: 1em;
    background-color: darkgreen;
    color: white;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    margin: 1em 1px;
}

.selected-actions {
    display: flex;
    align-items: flex-end;
}
</style>
