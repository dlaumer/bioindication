import React, { useEffect, useState, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Popup from '@arcgis/core/widgets/Popup';
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

interface Props {
    /**
     * all child element will receive the mapView as one of it's properties
     */
    children?: React.ReactNode;
}

const ArcGISMapView: React.FC<Props> = ({ children }: Props) => {
    const mapDivRef = useRef<HTMLDivElement>();

    const [mapView, setMapView] = useState<MapView>(null);

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

        const popup = new Popup({
            content: '{content}',
            actions: [] as any, // Disable all actions, TODO: Does not work completely yet
        });

        // Restyle the popup to look more realistic, TODO: Also remove dock button
        popup.viewModel.includeDefaultActions = false;

        // The view instance is the most important instance for ArcGIS, from here you can access almost all elements like layers, ui elements, widget, etc
        const view = new MapView({
            popupEnabled: false,
            container: mapDivRef.current,
            map: map,
            center: [8.331, 46.946],
            zoom: 8,

            padding: {
                right: screen.width / 5,
                bottom: 100,
            },
            timeExtent: {
                start: new Date(2022, 1, 24),
                end: new Date(2022, 3, 24),
            },

            popup: popup,
        });

        const dataLayer = new FeatureLayer({
            portalItem: {
                id: '665046b6489f4feaa1e25b379cb3f70c',
            },
        });

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
        });
    };

    useEffect(() => {
        initMapView();
    }, []);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
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
