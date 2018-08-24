import {MarkerType} from '../../../common/models';
import {Icon, Style} from 'ol/style.js';
import {fromLonLat} from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import VectorSource from 'ol/source/Vector.js';
import Collection from 'ol/Collection.js';

const blueberriesImg = require('../images/blueberries.png');
const lingonberriesImg = require('../images/lingonberries.png');
const mushroomsImg = require('../images/mushrooms.png');

export class MapService {
    map: Map;
    collection: Collection;

    constructor() {
    }

    initMap() {
        this.collection = new Collection([], {});
        this.map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new VectorLayer({
                    style: function(feature: Feature) {
                        return feature.get('style');
                    },
                    source: new VectorSource({features: this.collection})
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
        return this.map;
    }

    addMarker(e, marker) {
        const iconFeature = new Feature(new Point(e.coordinate));
        iconFeature.set('style', this.createStyle(marker, undefined));
        this.collection.push(iconFeature);
    }

    getMarkers() {
        return [
            { id: 0, value: MarkerType.BLUEBERRY, label: 'marker.blueberry', active: true },
            { id: 1, value: MarkerType.LINGONBERRY, label: 'marker.lingonberry', active: false },
            { id: 2, value: MarkerType.MUSHROOM, label: 'marker.mushroom', active: false },
        ]
    }

    getImageSource(marker: MarkerType) {
        switch (marker) {
            case MarkerType.BLUEBERRY:
                return blueberriesImg;
            case MarkerType.LINGONBERRY:
                return lingonberriesImg;
            case MarkerType.MUSHROOM:
                return mushroomsImg;
        }
    }

    createStyle(marker: MarkerType, img: any) {
        return new Style({
            image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
                anchor: [0.5, 0.96],
                crossOrigin: 'anonymous',
                src: this.getImageSource(marker),
                img,
                imgSize: img ? [img.width, img.height] : undefined
            }))
        });
    }

    navigateToUser() {
        navigator.geolocation.getCurrentPosition((pos: any) => {
            const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
            this.map.getView().animate({center: coords, zoom: 12});
        });
    }
}

export const mapService = new MapService();