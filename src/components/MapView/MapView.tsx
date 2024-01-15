import React, { useEffect, useState, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import Popup from '@arcgis/core/widgets/Popup';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

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
