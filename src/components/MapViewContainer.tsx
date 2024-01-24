import React from 'react';
import { useSelector } from 'react-redux';
import MapView from './MapView';
import { selectWebmapId } from '@store/selectors';
import { getTranslation } from '../services/languageHelper';
import Header from './Header';

const MapViewContainer = () => {
    const webmapId = useSelector(selectWebmapId);

    const title = getTranslation('title');

    return (
        <div className={'fixed top-0 left-0 w-full h-full'}>
            <Header></Header>
            <MapView />
            <div id="timeSlider"></div>
        </div>
    );
};

export default MapViewContainer;
