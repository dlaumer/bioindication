import React from 'react';

import { ErrorBoundary } from '@components/ErrorBoundary';
import MapViewContainer from '@components/MapView/MapViewContainer';
import WebMapSelector from '@components/WebMapSelector/WebMapSelector';

export const Map = () => {
    return (
        <>
            <ErrorBoundary>
                <MapViewContainer />
                <WebMapSelector />
            </ErrorBoundary>
        </>
    );
};

export default Map;
