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
import GeoJSON from 'ol/format/GeoJSON';
import {DragAndDrop, Select} from 'ol/interaction';
import {click} from 'ol/events/condition.js';

const blueberriesImg = require('../images/blueberries.png');
const lingonberriesImg = require('../images/lingonberries.png');
const mushroomsImg = require('../images/mushrooms.png');

export class MapService {
    _map: Map;
    collection: Collection;
    _source: VectorSource;
    format: GeoJSON;
    _dragAndDropInteraction: DragAndDrop;
    _selectInteraction: Select;

    constructor() {
        this.format = new GeoJSON({featureProjection: 'EPSG:3857'});
        this.collection = new Collection([], {});
        this._source = new VectorSource({features: this.collection});
        this._dragAndDropInteraction = new DragAndDrop({
            source: this._source,
            formatConstructors: [GeoJSON]
        });

        this._selectInteraction = new Select({
            condition: click
        });
    
        this.styleFn = this.styleFn.bind(this);
    }

    get selectInteraction() {
        return this._selectInteraction;
    }

    get source(): VectorSource {
        return this._source;
    }

    initMap() {
        this._map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                new VectorLayer({
                    style: this.styleFn,
                    source: this._source
                })
            ],
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });

        this._map.addInteraction(this._dragAndDropInteraction);
        this._map.addInteraction(this._selectInteraction);

        return this._map;
    }

    clearMap() {
        this._source.clear();
    }

    addMarker(e, marker) {
        const iconFeature = new Feature({
            geometry: new Point(e.coordinate),
            name: marker,
        });
        iconFeature.setId('marker-' + Date.now());
        this.collection.push(iconFeature);
    }

    removeMarkers(markers: Feature[]) {
        this.selectInteraction.getFeatures().clear();
        markers.forEach((feature) => {this.collection.remove(feature)});
    }

    moveMarkers(event: any, markers: Feature[]) {
        markers.forEach((marker: Feature) => {
            marker.getGeometry().setCoordinates(event.coordinate)
        });
    }

    getSourceJSON() {
        const features = this._source.getFeatures();
        const json = this.format.writeFeatures(features);
        return 'data:text/json;charset=utf-8,' + json;
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

    setSelectedStyle(feature: Feature) {
        const shadowStyle = new Style({
            image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
                src: this.getImageSource(feature.get('name')),
                color: "black",
                scale: 1.25
            }))
        });
        feature.setStyle([shadowStyle, this.styleFn(feature)])
    }

    styleFn(feature: Feature) {
        return new Style({
            image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
                src: this.getImageSource(feature.get('name'))
            }))
        });
    }

    navigateToUser() {
        navigator.geolocation.getCurrentPosition((pos: any) => {
            const coords = fromLonLat([pos.coords.longitude, pos.coords.latitude]);
            this._map.getView().animate({center: coords, zoom: 12});
        });
    }
}

export const mapService = new MapService();