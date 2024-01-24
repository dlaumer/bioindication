import React from 'react';

import { ErrorBoundary } from '@components/ErrorBoundary';
import MapViewContainer from '@components/MapViewContainer';

export const Map = () => {
    return (
        <>
            <ErrorBoundary>
                <MapViewContainer />
            </ErrorBoundary>
        </>
    );
};

export default Map;
