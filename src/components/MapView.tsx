import React, { useEffect, useState, useRef } from 'react';
import ReactDOMServer, { renderToString } from 'react-dom/server';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@store/configureStore';

import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import PopupTemplate from '@arcgis/core/PopupTemplate';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
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
import Sketch from '@arcgis/core/widgets/Sketch';
import Query from '@arcgis/core/rest/support/Query';
import Color from '@arcgis/core/Color';
import SimpleRenderer from '@arcgis/core/renderers/SimpleRenderer';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol';
import TimeExtent from '@arcgis/core/TimeExtent';
import FeatureEffect from '@arcgis/core/layers/support/FeatureEffect';
import FeatureFilter from '@arcgis/core/layers/support/FeatureFilter';
import Print from '@arcgis/core/widgets/Print';
import FeatureTemplate from '@arcgis/core/layers/support/FeatureTemplate';
import Graphic from '@arcgis/core/Graphic';
import Basemap from '@arcgis/core/Basemap';
import BasemapStyle from '@arcgis/core/support/BasemapStyle';
import LocalBasemapsSource from '@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource';

import {
    selectAttribute,
    selectCategory,
    selectCookiesAllowed,
    selectFilterSpace,
    selectFilterSpaceActive,
    selectFilterSpaceDrawing,
    selectFilterSpaceDrawingType,
    selectFilterTime,
    selectFilterTimeActive,
    selectFilterTimeEnd,
    selectFilterTimeStart,
    selectHoverFeatures,
    selectDownloadButtonClicked,
    selectIsLoggedIn,
    selectLanguage,
    selectLogInAttempt,
    selectSidePanelContent,
} from '@store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
    setAttribute,
    setCookiesSet,
    setdownloadButtonClicked,
    setFeatures,
    setFilterSpace,
    setFilterSpaceDrawing,
    setFilterTime,
    setFilterTimeEnd,
    setFilterTimeStart,
    setIsLoggedIn,
    setLanguage,
    setLogInAttempt,
    setUserInfos,
} from '@store/reducer';
import { getTranslation, getTranslationStatic } from '@services/languageHelper';
import Popup from './Popup';
import { createRoot } from 'react-dom/client';

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
    const [print, setPrint] = useState<Print>(null);

    const filterTimeActive = useSelector(selectFilterTimeActive);
    const filterSpaceActive = useSelector(selectFilterSpaceActive);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const sidePanelContent = useSelector(selectSidePanelContent);
    const logInAttempt = useSelector(selectLogInAttempt);
    const filterSpaceDrawing = useSelector(selectFilterSpaceDrawing);
    const filterSpaceDrawingType = useSelector(selectFilterSpaceDrawingType);
    const filterSpace = useSelector(selectFilterSpace);
    const filterTime = useSelector(selectFilterTime);
    const filterTimeStart = useSelector(selectFilterTimeStart);
    const filterTimeEnd = useSelector(selectFilterTimeEnd);
    const category = useSelector(selectCategory);
    const hoverFeatures = useSelector(selectHoverFeatures);
    const attribute = useSelector(selectAttribute);
    const language = useSelector(selectLanguage);
    const cookiesAllowed = useSelector(selectCookiesAllowed);
    const downloadButtonClicked = useSelector(selectDownloadButtonClicked);

    const [dataLayer, setDataLayer] = useState<FeatureLayer>(null);
    const [dataLayerView, setDataLayerView] = useState<FeatureLayer>(null);
    const [waterLayer, setWaterLayer] = useState<FeatureLayer>(null);
    const [riverLayer, setRiverLayer] = useState<FeatureLayer>(null);

    const [filterGraphic, setFilterGraphic] = useState<GraphicsLayer>(null);
    const [currentLayer, setCurrentLayer] = useState<FeatureLayer>(null);
    const [filterSpaceEffect, setFilterSpaceEffect] =
        useState<FeatureEffect>(null);

    const [sketchWidget, setSketchWidget] = useState<Sketch>(null);
    const [layerListWidget, setLayerListWidget] = useState<LayerList>(null);
    const [basemapGalleryWidget, setBasemapGalleryWidget] =
        useState<BasemapGallery>(null);

    const [measureWidget, setMeasureWidget] =
        useState<DistanceMeasurement2D>(null);
    const [measureAreaWidget, setMeasureAreaWidget] =
        useState<AreaMeasurement2D>(null);
    const [elevationProfileWidget, setElevationProfileWidget] =
        useState<ElevationProfile>(null);

    const dataLayerId = '665046b6489f4feaa1e25b379cb3f70c';
    const dataLayerViewId = '014ebd4120354d9bb3795be9276b40b9';

    const actualDate = new Date();
    const fullTimeExtent = new TimeExtent({
        start: new Date(2000, 0, 1),
        end: actualDate,
    });

    let isInitalizing = false;

    esriConfig.portalUrl = 'https://globe-swiss.maps.arcgis.com/';

    const info = new OAuthInfo({
        appId: 'yfPKXnYPgQwSEDyK',
        popup: false, // the default
    });

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

            //basemap: 'topo-vector',
            ground: 'world-elevation',
        });

        const template = new PopupTemplate({
            title: '{rivername}',
            content: setContentInfo,
        });

        // The view instance is the most important instance for ArcGIS, from here you can access almost all elements like layers, ui elements, widget, etc
        const view = new MapView({
            popupEnabled: true,
            container: mapDivRef.current,
            map: map,
            center: [8.831, 46.946],
            zoom: 8,
            highlightOptions: {
                color: new Color([0, 0, 0, 0]),
                fillOpacity: 0,
            },
            padding: {
                top: 70,
                left: mapDivRef.current.clientWidth * 0.32,
            },
        });

        const riverData = new FeatureLayer({
            portalItem: {
                id: 'a58f33bc922a4451932383e620d910dd',
            },
            outFields: ['Name'],
            popupEnabled: false,
            title: getTranslationStatic('riverData'),
            editingEnabled: false,
        });

        // Features in the layerview will be highlighted with bright
        // yellow colors in the map.
        view.whenLayerView(riverData).then(function (layerView: any) {
            layerView.highlightOptions = {
                color: [0, 0, 255, 0.5],
                haloOpacity: 0.9,
                fillOpacity: 0.2,
            };
        });

        view.map.add(riverData);
        setRiverLayer(riverData);

        // Filter by space
        const graphicsLayer = new GraphicsLayer({
            listMode: 'hide',
        });

        view.map.add(graphicsLayer);

        setFilterGraphic(graphicsLayer);

        const rendererLandscape: any = {
            type: 'unique-value', // autocasts as new UniqueValueRenderer()
            field: 'LandscapeEcology',
            defaultLabel: getTranslationStatic('others'),
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
                    label: getTranslationStatic('natural (1.0 - 1.4)'),
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
                    label: getTranslationStatic('obstructed (1.5 - 1.9)'),
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
                    label: getTranslationStatic(
                        'strongly obstructed (2.0 - 2.4)'
                    ),
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
                    label: getTranslationStatic('artificial (2.5 - 3.0)'),
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
        };

        const rendererWater: any = {
            type: 'unique-value', // autocasts as new UniqueValueRenderer()
            field: 'BioWaterQuality',
            defaultLabel: getTranslationStatic('others'),
            defaultSymbol: {
                type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                style: 'diamond',
                size: 6, // pixels
                outline: {
                    // autocasts as new SimpleLineSymbol()
                    color: [153, 153, 153, 64],
                    width: 0.5, // points
                },
                color: [225, 225, 225, 255],
            }, // autocasts as new SimpleFillSymbol()
            uniqueValueInfos: [
                {
                    // All features with value of "North" will be blue
                    value: 'unpolluted - I',
                    label: getTranslationStatic('unpolluted - I'),
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'diamond',
                        size: 12, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.5, // points
                        },
                        color: [115, 178, 255, 255],
                    },
                },
                {
                    // All features with value of "East" will be green
                    value: 'slightly polluted - I-II',
                    label: getTranslationStatic('slightly polluted - I-II'),
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'diamond',
                        size: 12, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.5, // points
                        },
                        color: [1, 254, 197, 255],
                    },
                },
                {
                    // All features with value of "South" will be red
                    value: 'moderately polluted - II',
                    label: getTranslationStatic('moderately polluted - II'),
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'diamond',
                        size: 12, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.5, // points
                        },
                        color: [85, 255, 0, 255],
                    },
                },
                {
                    // All features with value of "West" will be yellow
                    value: 'seriously polluted - II-III',
                    label: getTranslationStatic('seriously polluted - II-III'),
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'diamond',
                        size: 12, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.5, // points
                        },
                        color: [255, 255, 0, 255],
                    },
                },
                {
                    // All features with value of "West" will be yellow
                    value: 'heavily polluted - III',
                    label: getTranslationStatic('heavily polluted - III'),
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'diamond',
                        size: 12, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.5, // points
                        },
                        color: [255, 170, 0, 255],
                    },
                },
                {
                    // All features with value of "West" will be yellow
                    value: 'very heavily polluted - III-IV',
                    label: getTranslationStatic(
                        'very heavily polluted - III-IV'
                    ),
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'diamond',
                        size: 12, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.5, // points
                        },
                        color: [255, 0, 0, 255],
                    },
                },
                {
                    // All features with value of "West" will be yellow
                    value: 'excessively polluted - IV',
                    label: getTranslationStatic('excessively polluted - IV'),
                    symbol: {
                        type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                        style: 'diamond',
                        size: 12, // pixels
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [153, 153, 153, 64],
                            width: 0.5, // points
                        },
                        color: [168, 56, 0, 255],
                    },
                },
            ],
        };

        const dataLay = new FeatureLayer({
            portalItem: {
                id: dataLayerId,
            },
            title: getTranslationStatic('landscapeEcology'),
            renderer: rendererLandscape,
            outFields: ['*'],
            formTemplate: getFormTemplate(),
        });

        const dataLayView = new FeatureLayer({
            portalItem: {
                id: dataLayerViewId,
            },
            title: getTranslationStatic('landscapeEcology'),
            renderer: rendererLandscape,
            outFields: ['*'],
        });

        const dataLayViewWater = new FeatureLayer({
            portalItem: {
                id: dataLayerViewId,
            },
            title: getTranslationStatic('bioWaterQuality'),
            renderer: rendererWater,
            editingEnabled: false,
            popupEnabled: false,
        });

        esriId.registerOAuthInfos([info]);
        esriId
            .checkSignInStatus(info.portalUrl + '/sharing')
            .then(() => {
                handleSignedIn().then(() => {
                    view.map.add(dataLay, 1);
                    setCurrentLayer(dataLay);
                    map.basemap = new Basemap({
                        style: new BasemapStyle({
                            id: 'arcgis/topographic',
                            language: language,
                        }),
                    });
                    basemapGal.source = getCustomBasemaps();
                });
            })
            .catch(() => {
                view.map.add(dataLayView, 1);
                setCurrentLayer(dataLayView);
                esriConfig.apiKey =
                    'AAPKde4b596d996b4e698a1ca95b198e65651iQdxxwyc71nKOrzghuR6H3vBI6lHSHCW6sV5tB7b_ONx3fEztXJs8u9zChxGCsh';
                map.basemap = new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/topographic',
                        language: language,
                    }),
                });
                basemapGal.source = getCustomBasemaps();
            });

        view.map.add(dataLayViewWater, 10);

        setDataLayer(dataLay);
        setDataLayerView(dataLayView);
        setWaterLayer(dataLayViewWater);

        dataLay.popupTemplate = template;
        dataLayView.popupTemplate = template;

        const slider = new TimeSlider({
            view: view,
            mode: 'time-window',
            fullTimeExtent: {
                start: new Date(2000, 0, 1),
                end: actualDate,
            },
            timeExtent: {
                start: new Date(2000, 0, 1),
                end: actualDate,
            },
            stops: {
                interval: new TimeInterval({
                    value: 1,
                    unit: 'days',
                }),
            },
            disabled: !filterTimeActive,
        });

        setTimeSlider(slider);
        //dispatch(setFilterTimeStart(slider.timeExtent.start));
        //dispatch(setFilterTimeEnd(slider.timeExtent.end));

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
            layerInfos: [
                {
                    layer: riverData,
                    enabled: false,
                },
                {
                    layer: dataLayViewWater,
                    enabled: true, // Default is true, set to false to disable editing functionality.
                    addEnabled: false, // Default is true, set to false to disable the ability to add a new feature.
                    updateEnabled: false, // Default is true, set to false to disable the ability to edit an existing feature.
                    deleteEnabled: false, // Default is true, set to false to disable the ability to delete features.
                    attributeUpdatesEnabled: false, // Default is true, set to false to disable the ability to edit attributes in the update workflow.
                    geometryUpdatesEnabled: false, // Default is true, set to false to disable the ability to edit feature geometries in the update workflow.
                    attachmentsOnCreateEnabled: false, //Default is true, set to false to disable the ability to work with attachments while creating features.
                    attachmentsOnUpdateEnabled: false,
                },
            ],
        });

        setEditor(edit);

        const print = new Print({
            view: view,
        });

        setPrint(print);

        const leg = new Legend({
            view: view,
        });
        const legend = new Expand({
            view: view,
            expandTooltip: getTranslationStatic('legend'),
            collapseTooltip: getTranslationStatic('legend'),
            expanded: detectMobile() ? false : true,
            content: leg,
            group: 'top-right',
        });
        view.ui.add(legend, 'top-right');

        const layList = new LayerList({
            view: view,
        });
        const layerList = new Expand({
            view: view,
            expandTooltip: getTranslationStatic('layerList'),
            collapseTooltip: getTranslationStatic('layerList'),
            content: layList,
            group: 'top-right',
        });
        view.ui.add(layerList, 'top-right');
        setLayerListWidget(layList);

        const basemapGal = new BasemapGallery({
            view: view,
        });

        const basemapGallery = new Expand({
            view: view,
            expandTooltip: getTranslationStatic('basemap'),
            collapseTooltip: getTranslationStatic('basemap'),
            content: basemapGal,
            group: 'top-right',
        });
        view.ui.add(basemapGallery, 'top-right');
        setBasemapGalleryWidget(basemapGal);

        const meas = new DistanceMeasurement2D({
            view: view,
        });
        setMeasureWidget(meas);
        const measure = new Expand({
            view: view,
            expandTooltip: getTranslationStatic('measureDistance'),
            collapseTooltip: getTranslationStatic('measureDistance'),
            content: meas,
            group: 'top-right',
        });

        view.ui.add(measure, 'top-right');

        const measArea = new AreaMeasurement2D({
            view: view,
        });
        setMeasureAreaWidget(measArea);

        const measureArea = new Expand({
            view: view,
            expandTooltip: getTranslationStatic('measureArea'),
            collapseTooltip: getTranslationStatic('measureArea'),
            content: measArea,
            group: 'top-right',
        });
        view.ui.add(measureArea, 'top-right');

        const elevProfile = new ElevationProfile({
            view: view,
        });
        const elevatonProfile = new Expand({
            view: view,
            expandTooltip: getTranslationStatic('elevationProfile'),
            collapseTooltip: getTranslationStatic('elevationProfile'),
            content: elevProfile,
            group: 'top-right',
        });

        setElevationProfileWidget(elevProfile);
        setWidgetStrings(meas, measArea, elevProfile, basemapGal);

        view.ui.add(elevatonProfile, 'top-right');

        // Create a Sketch widget without adding it to the view
        const sketch = new Sketch({
            view: view,
            layer: graphicsLayer,
            creationMode: 'single',
        });

        sketch.when(() => {
            sketch.viewModel.polygonSymbol = new SimpleFillSymbol({
                color: new Color([0, 0, 0, 0.2]), // Transparent black filling (RGBA)
                outline: {
                    color: new Color([0, 0, 0, 0]), // No border (RGBA)
                    width: 0,
                },
            });
        });
        setSketchWidget(sketch);

        // Event listener for when the sketch is completed
        sketch.on('create', function (event: any) {
            if (event.state === 'complete') {
                dispatch(setFilterSpaceDrawing(false));

                // Get the polygon geometry
                const lassoPolygon = event.graphic.geometry.clone();
                dispatch(setFilterSpace(lassoPolygon));
                dispatch(setFilterTime('Test'));
            }
        });
        sketch.on('update', function (event: any) {
            if (
                event.toolEventInfo &&
                (event.toolEventInfo.type == 'move-stop' ||
                    event.toolEventInfo.type == 'reshape-stop' ||
                    event.toolEventInfo.type == 'scale-stop' ||
                    event.toolEventInfo.type == 'rotate-stop')
            ) {
                // Get the polygon geometry
                const lassoPolygon = event.graphics[0].geometry.clone();

                dispatch(setFilterSpace(lassoPolygon));
            }
        });

        // Remove all ui elements, so that they can be added manually as tools!
        //view.ui.components = ["attribution"];
        //view.ui.components = [];

        view.when(() => {
            setMapView(view);
            let highlight: any = null;
            let highlightedGraphic: any = null;

            view.on('pointer-move', function (event) {
                // only include graphics from hurricanesLayer in the hitTest
                const opts = {
                    include: riverData,
                };
                const tooltip = document.getElementById('tooltip');
                if (view.zoom > 9) {
                    view.hitTest(event, opts).then(function (response) {
                        if (response.results.length) {
                            const temp = response.results.filter(function (
                                result
                            ) {
                                // check if the graphic belongs to the layer of interest
                                return (
                                    (result as any).graphic.layer === riverData
                                );
                            })[0];
                            if (temp != null) {
                                const graphic = (temp as any).graphic;
                                const x = event.x + 10;
                                const y = event.y + 10;
                                tooltip.innerHTML = graphic.attributes.NAME;
                                tooltip.style.left = x + 'px';
                                tooltip.style.top = y + 'px';
                                tooltip.style.visibility = 'visible';
                                view.whenLayerView(riverData).then(function (
                                    layerView: any
                                ) {
                                    if (highlightedGraphic != graphic) {
                                        if (highlight != null) {
                                            highlight.remove();
                                            highlightedGraphic = null;
                                        }
                                        highlight =
                                            layerView.highlight(graphic);
                                        highlightedGraphic = graphic;
                                    }
                                });
                            }
                        } else {
                            if (highlight != null) {
                                highlight.remove();
                            }
                            tooltip.style.visibility = 'hidden';
                        }
                    });
                } else {
                    tooltip.style.visibility = 'hidden';
                }
            });
        });

        // Function block the UI while the map is loading!

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
        if (mapView != null && dataLayer != null && dataLayerView != null) {
            // Your event handler function
            const handleSliderChange = (value: any) => {
                // Your logic here, e.g., calling the backend
                dispatch(setFilterTimeStart(timeSlider.timeExtent.start));
                dispatch(setFilterTimeEnd(timeSlider.timeExtent.end));
            };

            // Set up a debounced version of your event handler
            const debouncedSliderHandler = debounce(handleSliderChange, 500); // Adjust the delay as needed (500 milliseconds in this example)

            timeSlider.watch('timeExtent', (value: any) => {
                // update layer view filter to reflect current timeExtent
                debouncedSliderHandler(value.start);
                debouncedSliderHandler(value.end);
            });
            queryFeatures(mapView);
        }
    }, [mapView, dataLayer, dataLayerView]);

    useEffect(() => {
        if (mapView != null) {
            if (!filterTimeActive) {
                const timeExtent = timeSlider.timeExtent;
                timeSlider.timeExtent = new TimeExtent({
                    start: new Date(2000, 0, 1),
                    end: new Date(actualDate.valueOf() - 100000),
                });

                setTimeout(function () {
                    dispatch(setFilterTimeStart(timeExtent.start));
                    dispatch(setFilterTimeEnd(timeExtent.end));
                }, 1000);
            } else {
                timeSlider.timeExtent = new TimeExtent({
                    start: new Date(filterTimeStart),
                    end: new Date(filterTimeEnd),
                });
            }
        }
    }, [filterTimeActive]);

    useEffect(() => {
        if (mapView != null && dataLayer != null && dataLayerView != null) {
            queryFeatures(mapView);
        }
    }, [
        filterTimeActive,
        filterSpaceActive,
        category,
        filterTimeStart,
        filterTimeEnd,
    ]);

    useEffect(() => {
        if (mapView != null) {
            if (filterTimeStart == null || filterTimeEnd == null) {
                timeSlider.timeExtent = new TimeExtent({
                    start: new Date(2000, 0, 1),
                    end: new Date(actualDate.valueOf() - 100000),
                });
            }
        }
    }, [filterTimeStart, filterTimeEnd]);

    useEffect(() => {
        if (mapView != null && dataLayer != null && dataLayerView != null) {
            if (cookiesAllowed) {
                document.cookie =
                    'lang=' +
                    language +
                    '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
                dispatch(setCookiesSet(true));
            }
            (mapView.map.basemap as any) = new Basemap({
                style: new BasemapStyle({
                    id: 'arcgis/topographic',
                    language: language,
                }),
            });
            (basemapGalleryWidget.source as any) = getCustomBasemaps();
            dataLayer.title = getTranslationStatic('landscapeEcology');
            dataLayerView.title = getTranslationStatic('landscapeEcology');
            waterLayer.title = getTranslationStatic('bioWaterQuality');
            riverLayer.title = getTranslationStatic('riverData');
            (dataLayer as any).formTemplate = getFormTemplate();
            setWidgetStrings(
                measureWidget,
                measureAreaWidget,
                elevationProfileWidget,
                basemapGalleryWidget
            );
            for (const i in (dataLayer.renderer as any).uniqueValueInfos) {
                (dataLayer.renderer as any).uniqueValueInfos[i].label =
                    getTranslationStatic(
                        (dataLayer.renderer as any).uniqueValueInfos[i].value
                    );
            }
            (dataLayer.renderer as any).defaultLabel =
                getTranslationStatic('others');
            for (const i in (dataLayerView.renderer as any).uniqueValueInfos) {
                (dataLayerView.renderer as any).uniqueValueInfos[i].label =
                    getTranslationStatic(
                        (dataLayerView.renderer as any).uniqueValueInfos[i]
                            .value
                    );
            }
            (dataLayerView.renderer as any).defaultLabel =
                getTranslationStatic('others');
            for (const i in (waterLayer.renderer as any).uniqueValueInfos) {
                (waterLayer.renderer as any).uniqueValueInfos[i].label =
                    getTranslationStatic(
                        (waterLayer.renderer as any).uniqueValueInfos[i].value
                    );
            }
            (waterLayer.renderer as any).defaultLabel =
                getTranslationStatic('others');
        }
    }, [language]);

    useEffect(() => {
        if (mapView != null && dataLayer != null && dataLayerView != null) {
            if (hoverFeatures == null) {
                if (filterSpace != null && filterSpaceActive) {
                    currentLayer.featureEffect = filterSpaceEffect;
                    waterLayer.featureEffect = filterSpaceEffect;
                } else {
                    currentLayer.featureEffect = null;
                    waterLayer.featureEffect = null;
                }
            } else {
                const filter = new FeatureFilter({
                    spatialRelationship: 'intersects',
                });
                if (filterTimeActive && mapView.timeExtent != null) {
                    filter.timeExtent = mapView.timeExtent;
                }
                if (filterSpaceActive && filterSpace != null) {
                    filter.geometry = filterSpace;
                }
                if (hoverFeatures != null) {
                    filter.where = attribute + " = '" + hoverFeatures + "'";
                }

                currentLayer.featureEffect = new FeatureEffect({
                    filter: filter,
                    excludedEffect: 'grayscale(100%) opacity(70%)',
                });
                waterLayer.featureEffect = new FeatureEffect({
                    filter: filter,
                    excludedEffect: 'grayscale(100%) opacity(70%)',
                });
            }
        }
    }, [hoverFeatures]);

    useEffect(() => {
        if (sketchWidget) {
            if (filterSpaceDrawing) {
                filterGraphic.removeAll();
                sketchWidget.create(filterSpaceDrawingType as any);
            } else {
                sketchWidget.cancel();
            }
        }
    }, [filterSpaceDrawing]);

    useEffect(() => {
        if (mapView != null && dataLayer != null && dataLayerView != null) {
            queryFeatures(mapView);
            if (filterSpace == null || !filterSpaceActive) {
                if (filterSpace == null) {
                    filterGraphic.removeAll();
                }
                currentLayer.featureEffect = null;
                waterLayer.featureEffect = null;
            } else {
                const filter = new FeatureFilter({
                    spatialRelationship: 'intersects',
                });
                if (filterTimeActive && mapView.timeExtent != null) {
                    filter.timeExtent = mapView.timeExtent;
                }
                if (filterSpaceActive && filterSpace != null) {
                    filter.geometry = filterSpace;
                }
                currentLayer.featureEffect = new FeatureEffect({
                    filter: filter,
                    excludedEffect: 'grayscale(100%) opacity(70%)',
                });
                waterLayer.featureEffect = new FeatureEffect({
                    filter: filter,
                    excludedEffect: 'grayscale(100%) opacity(70%)',
                });

                setFilterSpaceEffect(currentLayer.featureEffect);
            }
        }
    }, [filterSpace, filterSpaceActive]);

    useEffect(() => {
        if (mapView != null) {
            if (isLoggedIn) {
                mapView.map.remove(dataLayerView);
                mapView.map.add(dataLayer, 1);
                setCurrentLayer(dataLayer);
                updateFinalDate(mapView, dataLayer);
            } else {
                mapView.map.add(dataLayerView, 1);
                setCurrentLayer(dataLayerView);
            }
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (sidePanelContent == 'edit' && editor != null) {
            editor.container = 'editTitle';
        }
        if (sidePanelContent == 'print' && print != null) {
            print.container = 'printTitle';
        }
        if (mapView != null) {
            if (sidePanelContent == 'null') {
                mapView.padding = {
                    top: 120,
                    left: 20,
                };
            } else {
                mapView.padding = {
                    top: 70,
                    left: mapDivRef.current.clientWidth * 0.32,
                };
            }
        }
    }, [sidePanelContent]);

    useEffect(() => {
        if (timeSlider != null) {
            timeSlider.disabled = !filterTimeActive;
        }
    }, [filterTimeActive]);

    useEffect(() => {
        if (logInAttempt) {
            handleSignInOut();
        }
    }, [logInAttempt]);

    useEffect(() => {
        if (downloadButtonClicked) {
            queryAllFeatures(mapView)
                .then(function (result: any) {
                    dispatch(setdownloadButtonClicked(false));
                })
                .catch(function (result: any) {
                    dispatch(setdownloadButtonClicked(false));
                }
                )
        }
    }, [downloadButtonClicked]);

    /*
 
    const filterFeaturesView = () => {
        console.log("filterFeaturesView")
        if (currentLayer != null) {
            if (filterSpace == null) {
                mapView.whenLayerView(currentLayer).then(function (
                    layerView: any
                ) {
                    layerView.featureEffect = null;
 
                })
            }
            else {
                let filter = new FeatureFilter({
                    spatialRelationship: "intersects",
                })
 
                if (filterTimeActive && mapView.timeExtent != null) {
                    filter.timeExtent = mapView.timeExtent;
                }
                if (filterSpaceActive && filterSpace != null) {
                    filter.geometry = filterSpace;
                }
 
                mapView.whenLayerView(currentLayer).then(function (
                    layerView: any
                ) {
                    layerView.featureEffect = new FeatureEffect({
                        filter: filter,
                        excludedEffect: "grayscale(80%) opacity(70%)",
                        includedEffect: "drop-shadow(1px, 1px, 1px) brightness(150%)"
                    });
                })
 
 
 
            }
        }
 
    }
    */

    const getCustomBasemaps = () => {
        return new LocalBasemapsSource({
            basemaps: [
                new Basemap({
                    title: 'Custom Title 1', // Custom title for the basemap
                    style: new BasemapStyle({
                        id: 'arcgis/imagery/standard',
                        language: language,
                    }),
                    thumbnailUrl: '',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/imagery',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/ea3befe305494bb5b2acd77e1b3135dc/info/thumbnail/thumbnail1607389425104.jpeg?f=json',
                }),

                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/topographic',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/dd247558455c4ffab54566901a14f42c/info/thumbnail/thumbnail1607389112065.jpeg?f=json',
                }),

                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/streets',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/e3e6df1d2f6a485d8a70f28fdd3ce19e/info/thumbnail/thumbnail1607389307240.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/streets-relief',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/03daad361e1849bc80cb7b70ed391379/info/thumbnail/thumbnail1607564881281.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/navigation',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/78c096abedb9498380f5db1922f96aa0/info/thumbnail/thumbnail1607388861033.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/navigation-night',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/77073a29526046b89bb5622b6276e933/info/thumbnail/thumbnail1607386977674.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/light-gray',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/0f74af7609054be8a29e0ba5f154f0a8/info/thumbnail/thumbnail1607388219207.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/dark-gray',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/7742cd5abef8497288dc81426266df9b/info/thumbnail/thumbnail1607387673856.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/terrain',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/2ef1306b93c9459ca7c7b4f872c070b9/info/thumbnail/thumbnail1607387869592.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/oceans',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/b1dca7ef7b61466785901c41aed89ba5/info/thumbnail/thumbnail1607387462611.jpeg?f=json',
                }),
                new Basemap({
                    style: new BasemapStyle({
                        id: 'arcgis/outdoor',
                        language: language,
                    }),
                    thumbnailUrl:
                        'https://globe-swiss.maps.arcgis.com/sharing/rest/content/items/c6ec0420be5a4e36b57d1ef0f243b175/info/thumbnail/thumbnail1607563773856.jpeg?f=json',
                }),
                // Add more custom basemaps as needed
            ],
        });
    };

    const setWidgetStrings = (
        meas: DistanceMeasurement2D,
        measArea: AreaMeasurement2D,
        elevProfile: ElevationProfile,
        basemapGal: BasemapGallery
    ) => {
        (meas as any).loadLocale = () => {
            (meas as any).messages = {
                ...(meas as any).messages,
                newMeasurement: getTranslationStatic('newMeasurement'),
            };
        };

        (measArea as any).loadLocale = () => {
            (measArea as any).messages = {
                ...(measArea as any).messages,
                newMeasurement: getTranslationStatic('newAreaMeasurement'),
            };
        };

        (elevProfile as any).loadLocale = () => {
            (elevProfile as any).messages.profiles = {
                ...(elevProfile as any).messages.profiles,
                ground: getTranslationStatic('statistics'),
            };
        };
    };

    const getFormTemplate = () => {
        const formTemplate = {
            // Autocasts to new FormTemplate
            title: getTranslationStatic('measurements'),
            elements: [
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'BioWaterQuality',
                    label: getTranslationStatic('bioWaterQuality'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'LandscapeEcology',
                    label: getTranslationStatic('landscapeEcology'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'landscape_eco_number',
                    label: getTranslationStatic('landscape_eco_number'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'water_temp',
                    label: getTranslationStatic('waterTemperature'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'water_O2',
                    label: getTranslationStatic('oxygen'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'water_nitr',
                    label: getTranslationStatic('nitrate'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'water_cond',
                    label: getTranslationStatic('conductivity'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'water_ph',
                    label: getTranslationStatic('ph'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'water_alka',
                    label: getTranslationStatic('alkalinity'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'water_turb',
                    label: getTranslationStatic('transparency'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'comments',
                    label: getTranslationStatic('remarks'),
                },
                {
                    // Autocasts to new FieldElement
                    type: 'field',
                    fieldName: 'finalDate',
                    label: getTranslationStatic('finalDate'),
                },
            ],
        }; // end of form template elements

        return formTemplate;
    };

    const setContentInfo = (feature: any) => {
        // Create a container element for React to render into
        const container = document.createElement('div');
        const root = createRoot(container); // createRoot(container!) if you use TypeScript
        // Render your React component into the container
        root.render(
            <ReduxProvider store={store}>
                <Popup data={feature}></Popup>
            </ReduxProvider>
        );

        // Return the container element
        return container;
    };

    const updateFinalDate = (view: MapView, dataLay: FeatureLayer) => {
        const myPromise: Promise<string> = new Promise((resolve, reject) => {
            dataLay
                .queryFeatures({
                    where: "finalDate IS NULL OR finalDate = ''",
                    outFields: ['*'],
                    returnGeometry: false,
                })
                // then take re existing entry and edit it
                .then((results) => {
                    if (results.features.length > 0) {
                        const updateFeatures = [];
                        for (const i in results.features) {
                            const editFeature = results.features[0];
                            const { first_date, last_date, CreationDate } =
                                editFeature.attributes;
                            const finalDate =
                                first_date || last_date || CreationDate;
                            const update = new Graphic({
                                attributes: {
                                    OBJECTID: editFeature.attributes.OBJECTID, // Assuming OBJECTID is the unique identifier field
                                    // Update only the attribute you want to change
                                    finalDate: finalDate,
                                },
                            });
                            updateFeatures.push(update);
                        }

                        // finally, upload the new data to ArcGIS Online
                        dataLay
                            .applyEdits({
                                updateFeatures: updateFeatures,
                            })
                            .then((value) => {
                                // ToDo: Check for errors!
                                if (
                                    (value.updateFeatureResults as any).error ==
                                    null
                                ) {
                                    resolve('Resolved');
                                } else {
                                    reject(
                                        (value.updateFeatureResults as any)
                                            .error
                                    );
                                }
                            })
                            .catch((reason) => {
                                reject(reason);
                            });
                    }
                });
        });

        return myPromise;
    };

    const queryAllFeatures = (view: MapView) => {
        return new Promise((resolve, reject) => {

            if (view != null) {
                // Get the correct layer

                const query: any = {
                    //where: `EXTRACT(MONTH FROM ${layer.timeInfo.startField}) = ${month}`,
                    where: `1=1`,
                    returnGeometry: false,
                    outFields: ['*'],
                    maxRecordCountFactor: 2,
                };

                if (filterTimeActive && view.timeExtent != null) {
                    query.timeExtent = view.timeExtent;
                }
                if (filterSpaceActive && filterSpace != null) {
                    query.geometry = filterSpace;
                }

                // Perform the query on the feature layer
                currentLayer
                    .queryFeatures(query)
                    .then(function (result: any) {
                        if (result.features.length > 0) {
                            let csv = convertToCsv(result)
                            if (!csv.match(/^data:text\/csv/i)) {
                                csv = 'data:text/csv;charset=utf-8,' + csv;
                            }
                            var encodedUri = encodeURI(csv);
                            var link = document.createElement("a");

                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", "data.csv");
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            resolve("Resolve");
                        } else {
                            console.log(`No data found`);
                            reject("Reject")
                        }
                    })
                    .catch(function (error: any) {
                        console.error(`Query failed: `, error);
                        reject("Reject")
                    });
            }
        })
    };

    const convertToCsv = (results: any) => {

        let data = results.features;

        if (data == null || !data.length) {
            return null;
        }

        let columnDelimiter = ';';
        let lineDelimiter = '\n';

        let fields = results.fields;
        let fieldDict:any = {}
        fields.forEach(function (field: any) {
            fieldDict[field.name] = field.alias;
        });

        let keys = Object.keys(data[0].attributes);
        let result = '';
        keys.forEach(function (key: any) {
            result += fieldDict[key] + columnDelimiter
        });
        result += lineDelimiter;

        data.forEach(function (item: any) {
            let ctr = 0;
            keys.forEach(function (key) {
                if (ctr > 0) result += columnDelimiter;

                result += item.attributes[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    const queryFeatures = (view: MapView) => {
        if (view != null) {
            // Get the correct layer

            const query: any = {
                //where: `EXTRACT(MONTH FROM ${layer.timeInfo.startField}) = ${month}`,
                where: `1=1`,
                returnGeometry: false,
                outFields: ['*'],
                maxRecordCountFactor: 2,
            };

            if (filterTimeActive && view.timeExtent != null) {
                query.timeExtent = view.timeExtent;
            }
            if (filterSpaceActive && filterSpace != null) {
                query.geometry = filterSpace;
            }
            switch (category) {
                case 'bioQuality':
                    query.outStatistics = [
                        {
                            statisticType: 'count',
                            onStatisticField: 'LandscapeEcology',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['LandscapeEcology'];
                    dispatch(setAttribute('LandscapeEcology'));
                    break;
                case 'waterQuality':
                    query.outStatistics = [
                        {
                            statisticType: 'count',
                            onStatisticField: 'BioWaterQuality',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['BioWaterQuality'];
                    dispatch(setAttribute('BioWaterQuality'));
                    break;
                case 'temperatureDistribution':
                    query.outStatistics = [
                        {
                            statisticType: 'count',
                            onStatisticField: 'water_temp',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['water_temp'];
                    dispatch(setAttribute('water_temp'));
                    break;
                case 'waterToBio':
                    query.outStatistics = [
                        {
                            statisticType: 'avg',
                            onStatisticField: 'landscape_eco_number',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['BioWaterQuality'];
                    dispatch(setAttribute('BioWaterQuality'));
                    break;
                case 'waterToOxygen':
                    query.outStatistics = [
                        {
                            statisticType: 'avg',
                            onStatisticField: 'water_O2',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['BioWaterQuality'];
                    dispatch(setAttribute('BioWaterQuality'));
                    break;
                case 'waterToNitrate':
                    query.outStatistics = [
                        {
                            statisticType: 'avg',
                            onStatisticField: 'water_nitr',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['BioWaterQuality'];
                    dispatch(setAttribute('BioWaterQuality'));
                    break;
                case 'bioToOxygen':
                    query.outStatistics = [
                        {
                            statisticType: 'avg',
                            onStatisticField: 'water_O2',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['LandscapeEcology'];
                    dispatch(setAttribute('LandscapeEcology'));
                    break;
                case 'bioToNitrate':
                    query.outStatistics = [
                        {
                            statisticType: 'avg',
                            onStatisticField: 'water_nitr',
                            outStatisticFieldName: 'count_Attribute',
                        },
                    ];
                    query.groupByFieldsForStatistics = ['LandscapeEcology'];
                    dispatch(setAttribute('LandscapeEcology'));
                    break;
                case 'oxygenToTemp':
                    query.outFields = ['water_O2', 'water_temp'];
                    query.where =
                        '(water_O2 IS NOT NULL) AND (water_O2 <> 0) AND (water_temp IS NOT NULL) AND (water_temp <> 0)';
                    dispatch(setAttribute('waterTemperature'));
                    break;
            }

            // Perform the query on the feature layer
            currentLayer
                .queryFeatures(query)
                .then(function (result: any) {
                    if (result.features.length > 0) {
                        dispatch(setFeatures(result.features));
                    } else {
                        console.log(`No data found`);
                    }
                })
                .catch(function (error: any) {
                    console.error(`Query failed: `, error);
                });
        }
    };

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
        return new Promise((resolve, reject) => {
            const portal = new Portal();
            portal
                .load()
                .then(() => {
                    dispatch(setIsLoggedIn(true));
                    dispatch(
                        setUserInfos({
                            username: portal.user.username,
                            fullName: portal.user.fullName,
                            email: portal.user.email,
                        })
                    );
                    resolve('Resolved');
                })
                .catch(() => {
                    esriId.destroyCredentials();
                    dispatch(setIsLoggedIn(false));
                    window.location.reload();
                    reject('Reject');
                    //alert(strings.get("notAllowed"))
                });
        });
    };

    const detectMobile = () => {
        return window.innerWidth <= 600;
    };

    const debounce = (func: any, delay: any) => {
        let timeoutId: any;

        return function (...args: any) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };
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
            <div
                id="tooltip"
                className="absolute cursor-default bg-black bg-opacity-40 rounded-lg p-[5px] text-white text-sm"
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
