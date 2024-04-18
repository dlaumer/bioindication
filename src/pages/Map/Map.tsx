import React, { useEffect } from 'react';

import { ErrorBoundary } from '@components/ErrorBoundary';
import MapViewContainer from '@components/MapViewContainer';
import { setCookiesAllowed, setCookiesSet, setLanguage } from '@store/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectCookiesAllowed } from '@store/selectors';

export const Map = () => {
    const dispatch = useDispatch();
    const cookiesAllowed = useSelector(selectCookiesAllowed);

    const setCookie = (cname: string, cvalue: string) => {
        document.cookie =
            cname + '=' + cvalue + '; expires=Fri, 31 Dec 9999 23:59:59 GMT';
        dispatch(setCookiesSet(true));
    };
    const getCookie = (cname: string) => {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    };

    const query = location.search.substr(1);
    const result: any = {};
    query.split('&').forEach(function (part) {
        const item = part.split('=');
        result[item[0]] = decodeURIComponent(item[1]);
    });

    const langCookie = getCookie('lang');

    if (
        langCookie == 'en' ||
        langCookie == 'fr' ||
        langCookie == 'it' ||
        langCookie == 'de'
    ) {
        dispatch(setCookiesSet(true));
        dispatch(setCookiesAllowed(true));
    } else if (langCookie == 'null') {
        dispatch(setCookiesSet(true));
        dispatch(setCookiesAllowed(false));
    }

    if (result['lang'] != null) {
        dispatch(setLanguage(result['lang']));

        if (cookiesAllowed) {
            setCookie('lang', result['lang']);
        }
    } else {
        if (
            langCookie == 'en' ||
            langCookie == 'fr' ||
            langCookie == 'it' ||
            langCookie == 'de'
        ) {
            dispatch(setLanguage(langCookie));
        } else {
            // Construct URLSearchParams object instance from current URL querystring.
            const queryParams = new URLSearchParams(window.location.search);
            // Set new or modify existing parameter value.

            const userLang = navigator.language;
            let langSystem = 'en';
            if (userLang.substring(0, 2) == 'fr') {
                langSystem = 'fr';
            } else if (userLang.substring(0, 2) == 'de') {
                langSystem = 'de';
            } else if (userLang.substring(0, 2) == 'it') {
                langSystem = 'it';
            }
            queryParams.set('lang', langSystem);
            // Replace current querystring with the new one.
            history.replaceState(null, null, '?' + queryParams.toString());
            dispatch(setLanguage(langSystem));
            if (cookiesAllowed) {
                setCookie('lang', langSystem);
            }
        }
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
