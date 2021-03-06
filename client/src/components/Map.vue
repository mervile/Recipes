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
                <a class="map-action action-button" v-on:click.stop.prevent="clearMap">{{ $t('clearMap') }}</a>
                <a class="map-action action-button" v-bind:href="sourceJSON" download="features.json">{{ $t('downloadMap') }}</a>
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
    height: 100%;
}

#map {
  background-color: rgb(248, 244, 240);
  height: 100%;
}

.controls {
    position: sticky;
    bottom: 0px;
    left: 0px;
    background-color: aliceblue;
    border: 1px solid darkgray;
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.map-actions {
    margin: 1em;
}

.map-action {
    padding: 1em;
    margin: 1em 1px;
    cursor: pointer;
}

.selected-actions {
    display: flex;
    align-items: flex-end;
}

@media screen and (min-width: 640px) {
    .controls {
        flex-direction: row;
        flex-wrap: wrap;
    }
}
</style>
