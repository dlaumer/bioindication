import React, { useEffect, useState, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import TimeInterval from '@arcgis/core/TimeInterval';
import Home from '@arcgis/core/widgets/Home';
import AreaMeasurement2D from '@arcgis/core/widgets/AreaMeasurement2D';
import Compass from '@arcgis/core/widgets/Compass';
import DistanceMeasurement2D from '@arcgis/core/widgets/DistanceMeasurement2D';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import Expand from '@arcgis/core/widgets/Expand';
import Locate from '@arcgis/core/widgets/Locate';
import Legend from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';
import Editor from '@arcgis/core/widgets/Editor';

interface Props {
    /**
     * all child element will receive the mapView as one of it's properties
     */
    children?: React.ReactNode;
}

const ArcGISMapView: React.FC<Props> = ({ children }: Props) => {
    const mapDivRef = useRef<HTMLDivElement>();

    const [mapView, setMapView] = useState<MapView>(null);

    const dataLayerId = '665046b6489f4feaa1e25b379cb3f70c';
    //const dataLayerViewId = '014ebd4120354d9bb3795be9276b40b9';

    const initMapView = () => {
        /////// BASIC MAP ELEMENTS /////////////////////////////////////////////////////////
        // Map instance, holds the layers and the basemap definition
        const map = new Map({
            /* basemap:new Basemap({
                 portalItem: {
                     id: "0560e29930dc4d5ebeb58c635c0909c9"
                 }
             }),
             */
            basemap: 'topo-vector',
            ground: 'world-elevation',
        });

        const template = new PopupTemplate({
            title: '{rivername}',
            content: [
                {
                    type: 'fields',
                    fieldInfos: [
                        {
                            fieldName: 'landscape_eco_number ',
                            label: 'Landscape Ecology as Number',
                        },
                    ],
                },
            ],
        });

        // The view instance is the most important instance for ArcGIS, from here you can access almost all elements like layers, ui elements, widget, etc
        const view = new MapView({
            popupEnabled: true,
            container: mapDivRef.current,
            map: map,
            center: [8.331, 46.946],
            zoom: 8,

            padding: {
                left: screen.width / 3,
                right: screen.width / 5,
                bottom: 100,
            },
            timeExtent: {
                start: new Date(2022, 1, 24),
                end: new Date(2022, 3, 24),
            },
        });

        const dataLayer = new FeatureLayer({
            portalItem: {
                id: dataLayerId,
            },
        });

        const query: any = {
            //where: `EXTRACT(MONTH FROM ${layer.timeInfo.startField}) = ${month}`,
            where: `1=1`,
            returnGeometry: false,
            outFields: ['*'],
        };

        // Perform the query on the feature layer
        dataLayer
            .queryFeatures(query)
            .then(function (result: any) {
                if (result.features.length > 0) {
                    console.log(result);
                } else {
                    console.log(`No data found`);
                }
            })
            .catch(function (error: any) {
                console.error(`Query failed: `, error);
            });

        dataLayer.popupTemplate = template;

        view.map.add(dataLayer);

        const timeSlider = new TimeSlider({
            view: view,
            mode: 'time-window',
            fullTimeExtent: {
                start: new Date(2000, 1, 1),
                end: new Date(),
            },
            timeExtent: {
                start: new Date(2000, 1, 1),
                end: new Date(),
            },
            stops: {
                interval: new TimeInterval({
                    value: 1,
                    unit: 'days',
                }),
            },
        });

        view.ui.add(timeSlider, 'bottom-left');

        const compass = new Compass({
            view: view,
        });
        view.ui.add(compass, 'top-left');

        const home = new Home({
            view: view,
        });
        view.ui.add(home, 'top-left');

        const locate = new Locate({
            view: view,
        });
        view.ui.add(locate, 'top-left');

        const editor = new Expand({
            view: view,
            content: new Editor({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(editor, 'top-right');

        const layerList = new Expand({
            view: view,
            content: new LayerList({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(layerList, 'top-right');

        const legend = new Expand({
            view: view,
            content: new Legend({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(legend, 'top-right');

        const basemapGallery = new Expand({
            view: view,
            content: new BasemapGallery({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(basemapGallery, 'top-right');

        const measure = new Expand({
            view: view,
            content: new DistanceMeasurement2D({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(measure, 'top-right');

        const measureArea = new Expand({
            view: view,
            content: new AreaMeasurement2D({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(measureArea, 'top-right');

        // Remove all ui elements, so that they can be added manually as tools!
        //view.ui.components = ["attribution"];
        //view.ui.components = [];

        view.when(() => {
            setMapView(view);
            //timeSlider.container = 'filterTime';
        });
    };

    useEffect(() => {
        initMapView();
    }, []);

    return (
        <>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'grey',
                }}
                ref={mapDivRef}
            ></div>
            {mapView
                ? React.Children.map(children, (child) => {
                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                          }
                      );
                  })
                : null}
        </>
    );
};

export default ArcGISMapView;
