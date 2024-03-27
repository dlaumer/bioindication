import React from 'react';

import { ErrorBoundary } from '@components/ErrorBoundary';
import MapViewContainer from '@components/MapViewContainer';
import { setLanguage } from '@store/reducer';
import { useDispatch } from 'react-redux';

export const Map = () => {
    const dispatch = useDispatch();

    const query = location.search.substr(1);
    const result: any = {};
    query.split('&').forEach(function (part) {
        const item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });

    if (result['lang'] != null) {
        dispatch(setLanguage(result['lang']));
    } else {
        // Construct URLSearchParams object instance from current URL querystring.
        const queryParams = new URLSearchParams(window.location.search);
        // Set new or modify existing parameter value.

        const userLang = navigator.language;
        console.log(userLang);
        let lang = 'en';
        if (userLang.substring(0, 2) == 'fr') {
            lang = 'fr';
        } else if (userLang.substring(0, 2) == 'de') {
            lang = 'de';
        } else if (userLang.substring(0, 2) == 'it') {
            lang = 'it';
        }
        queryParams.set('lang', lang);
        // Replace current querystring with the new one.
        history.replaceState(null, null, '?' + queryParams.toString());
    }

    return (
        <>
            <ErrorBoundary>
                <MapViewContainer />
            </ErrorBoundary>
        </>
    );
};

export default Map;
