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
import ElevationProfile from '@arcgis/core/widgets/ElevationProfile';
import Editor from '@arcgis/core/widgets/Editor';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils.js';
import esriId from '@arcgis/core/identity/IdentityManager';
import OAuthInfo from '@arcgis/core/identity/OAuthInfo';
import ServerInfo from '@arcgis/core/identity/ServerInfo';
import PortalItem from '@arcgis/core/portal/PortalItem';
import esriConfig from '@arcgis/core/config';
import Portal from '@arcgis/core/portal/Portal';
import {
    selectFilterTimeActive,
    selectIsLoggedIn,
    selectLogInAttempt,
    selectSidePanelContent,
} from '@store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
    setIsLoggedIn,
    setLogInAttempt,
    setUsernameEsri,
} from '@store/reducer';

interface Props {
    /**
     * all child element will receive the mapView as one of it's properties
     */
    children?: React.ReactNode;
}

const ArcGISMapView: React.FC<Props> = ({ children }: Props) => {
    const dispatch = useDispatch();

    const mapDivRef = useRef<HTMLDivElement>();

    const [mapView, setMapView] = useState<MapView>(null);
    const [timeSlider, setTimeSlider] = useState<TimeSlider>(null);
    const [editor, setEditor] = useState<Editor>(null);

    const filterTimeActive = useSelector(selectFilterTimeActive);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const sidePanelContent = useSelector(selectSidePanelContent);
    const logInAttempt = useSelector(selectLogInAttempt);

    const [dataLayer, setDataLayer] = useState<FeatureLayer>(null);
    const [dataLayerView, setDataLayerView] = useState<FeatureLayer>(null);

    const dataLayerId = '665046b6489f4feaa1e25b379cb3f70c';
    const dataLayerViewId = '014ebd4120354d9bb3795be9276b40b9';

    let isInitalizing = false;

    esriConfig.portalUrl = 'https://globe-swiss.maps.arcgis.com/';

    const info = new OAuthInfo({
        appId: 'yfPKXnYPgQwSEDyK',
        popup: false, // the default
    });

    const initMapView = () => {
        esriId.registerOAuthInfos([info]);

        esriId
            .checkSignInStatus(info.portalUrl + '/sharing')
            .then(() => {
                handleSignedIn();
            })
            .catch(() => {
                handleSignedOut();
            });

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

        const renderer: any = {
            type: 'unique-value', // autocasts as new UniqueValueRenderer()
            field: 'LandscapeEcology',
            defaultSymbol: {
                type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                style: 'circle',
                size: 6, // pixels
                outline: {
                    // autocasts as new SimpleLineSymbol()
                    color: [153, 153, 153, 64],
                    width: 0.75, // points
                },
                color: [170, 170, 170, 255],
            }, // autocasts as new SimpleFillSymbol()
            uniqueValueInfos: [
                {
                    // All features with value of "North" will be blue
                    value: 'natural (1.0 - 1.4)',
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'circle',
                        size: 15, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.75, // points
                        },
                        color: [0, 197, 255, 255],
                    },
                },
                {
                    // All features with value of "East" will be green
                    value: 'obstructed (1.5 - 1.9)',
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'circle',
                        size: 15, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.75, // points
                        },
                        color: [85, 255, 0, 255],
                    },
                },
                {
                    // All features with value of "South" will be red
                    value: 'strongly obstructed (2.0 - 2.4)',
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'circle',
                        size: 15, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.75, // points
                        },
                        color: [255, 255, 0, 255],
                    },
                },
                {
                    // All features with value of "West" will be yellow
                    value: 'artificial (2.5 - 3.0)',
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'circle',
                        size: 15, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.75, // points
                        },
                        color: [255, 0, 0, 255],
                    },
                },
            ],
            visualVariables: [
                {
                    type: 'size',
                    field: 'landscape_eco_number ',
                    // features with 30 ppl/sq km or below are assigned the first opacity value
                    stops: [
                        { value: 1, size: 5 },
                        { value: 3, size: 10 },
                        { value: 5, size: 15 },
                        { value: 2000, size: 20 },
                    ],
                },
            ],
        };

        const dataLay = new FeatureLayer({
            portalItem: {
                id: dataLayerId,
            },
            renderer: renderer,
        });

        const dataLayView = new FeatureLayer({
            portalItem: {
                id: dataLayerViewId,
            },
            renderer: renderer,
        });

        if (isLoggedIn) {
            view.map.add(dataLay);
        } else {
            view.map.add(dataLayView);
        }

        setDataLayer(dataLay);
        setDataLayerView(dataLayView);

        const riverData = new FeatureLayer({
            portalItem: {
                id: 'a58f33bc922a4451932383e620d910dd',
            },
        });

        view.map.add(riverData);

        const query: any = {
            //where: `EXTRACT(MONTH FROM ${layer.timeInfo.startField}) = ${month}`,
            where: `1=1`,
            returnGeometry: false,
            outFields: ['*'],
        };

        // Perform the query on the feature layer
        dataLayView
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

        dataLay.popupTemplate = template;
        dataLayView.popupTemplate = template;

        const slider = new TimeSlider({
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
            disabled: true,
        });

        setTimeSlider(slider);

        //view.ui.add(timeSlider, 'bottom-left');

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

        const edit = new Editor({
            view: view,
        });

        setEditor(edit);
        //view.ui.add(editor, 'top-right');

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
            expanded: true,
            content: new Legend({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(legend, 'bottom-right');

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

        const elevatonProfile = new Expand({
            view: view,
            content: new ElevationProfile({
                view: view,
            }),
            group: 'top-right',
        });
        view.ui.add(elevatonProfile, 'top-right');

        // Remove all ui elements, so that they can be added manually as tools!
        //view.ui.components = ["attribution"];
        //view.ui.components = [];

        view.when(() => {
            setMapView(view);
        });

        // Function block the UI while the map is loading!
        reactiveUtils
            .whenOnce(() => !view.updating)
            .then(() => {
                slider.container = 'filterTimeContainer';

                slider.when(() => {
                    const timeSliderFooter = document.getElementsByClassName(
                        'esri-time-slider__min'
                    )[0].parentNode;
                    (timeSliderFooter as HTMLElement).style.display = 'none';
                    document.getElementById('filterTimeContainer').onclick =
                        function (event) {
                            event.stopPropagation();
                        };
                });
            });
    };

    useEffect(() => {
        if (mapView != null) {
            if (isLoggedIn) {
                mapView.map.remove(dataLayerView);
                mapView.map.add(dataLayer);
            } else {
                mapView.map.add(dataLayerView);
            }
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (sidePanelContent == 'edit' && editor != null) {
            editor.container = 'editTitle';
        }
    }, [sidePanelContent]);

    useEffect(() => {
        if (timeSlider != null) {
            timeSlider.disabled = !timeSlider.disabled;
        }
    }, [filterTimeActive]);

    const firstTime = true;
    useEffect(() => {
        if (logInAttempt) {
            handleSignInOut();
        }
    }, [logInAttempt]);

    const handleSignInOut = () => {
        if (isLoggedIn) {
            esriId.destroyCredentials();
            dispatch(setIsLoggedIn(false));
            dispatch(setLogInAttempt(false));
            window.location.reload();
        } else {
            esriId.getCredential(info.portalUrl + '/sharing');
        }
    };

    const handleSignedIn = () => {
        const portal = new Portal();
        portal
            .load()
            .then(() => {
                console.log(portal.user.username);
                dispatch(setIsLoggedIn(true));
                dispatch(setUsernameEsri(portal.user.username));
            })
            .catch(() => {
                esriId.destroyCredentials();
                dispatch(setIsLoggedIn(false));
                window.location.reload();
                //alert(strings.get("notAllowed"))
            });
    };

    const handleSignedOut = () => {};

    useEffect(() => {
        // For some reason it always excecuted this twice, so that's a hacky solution to fix this
        if (!isInitalizing) {
            initMapView();
            isInitalizing = true;
        }
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
