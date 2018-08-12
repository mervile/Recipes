<template>
    <div id="map" class="map">
    </div>
</template>

<script>
    import Vue from 'vue';
    import 'ol/ol.css';
    import {Map, View} from 'ol';
    import TileLayer from 'ol/layer/Tile';
    import XYZSource from 'ol/source/XYZ';

    export default Vue.extend({
        mounted () {
            const map = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new XYZSource({
                            url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
                        })
                    })
                ],
                view: new View({
                    center: [0, 0],
                    zoom: 4
                })
            });
        }
    });
</script>

<style>
.map {
    width: 100%;
    height: 100%;
}
</style>
