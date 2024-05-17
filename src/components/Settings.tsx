/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useSelector, useDispatch } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import {
    selectLanguage,
    selectSettingsContent,
    selectSettingsOpen,
    selectSidePanelContent,
} from '@store/selectors';
import {
    setLanguage,
    setSettingsContent,
    setSidePanelContent,
    toggleSettingsOpen,
} from '@store/reducer';
import Button from './Button';
import { getTranslation, getTranslationStatic } from '@services/languageHelper';
import close from './../constants/x_black.svg';
import logoGlobe from './../constants/logoGlobe.png';
import logoSmartTrip from './../constants/logo_smarttrip_edu.png';
import logoDaniel from './../constants/logoDaniel.png';
import externalLink from './../constants/external-link.svg';
import file from './../constants/file-text.svg';
import edit from './../constants/Edit.svg';
import analyze from './../constants/pie-chart.svg';
import process from './../constants/refresh-cw.svg';
import print from './../constants/printer.svg';

import polygon from './../constants/polygon-16.svg';
import circle from './../constants/circle-16.svg';
import rectangle from './../constants/rectangle-16.svg';

import clock from './../constants/clock.svg';
import crop from './../constants/crop.svg';
import sliders from './../constants/sliders.svg';
import eyeOpen from './../constants/view-visible-24.svg';
import eyeClosed from './../constants/view-hide-24.svg';
import trash from './../constants/trash.svg';
import menu from './../constants/menu.svg';

const Settings: FC<React.ComponentProps<'div'>> = () => {
    const dispatch = useDispatch();

    const settingsContent = useSelector(selectSettingsContent);
    const settingsOpen = useSelector(selectSettingsOpen);
    const language = useSelector(selectLanguage);

    const [settingsWindow, setSettingsWindow] = useState(null);
    const [settingsSidePanel, setSettingsSidePanel] = useState(null);

    const title = getTranslation('settings');

    //const [content, setContent] = useState(null);

    useEffect(() => {
        const content: any = [];
        content.push(
            <div
                key="languages"
                className={`${settingsContent == 'languages' ? '' : 'hidden'} `}
            >
                <div className="h-[20%] w-full">
                    <Button
                        titleKey="en"
                        onClick={() => dispatch(setLanguage('en'))}
                        isActive={language == 'en'}
                    ></Button>
                </div>
                <div className="h-[20%] w-full">
                    <Button
                        titleKey="de"
                        onClick={() => dispatch(setLanguage('de'))}
                        isActive={language == 'de'}
                    ></Button>
                </div>
                <div className="h-[20%] w-full">
                    <Button
                        titleKey="fr"
                        onClick={() => dispatch(setLanguage('fr'))}
                        isActive={language == 'fr'}
                    ></Button>
                </div>
                <div className="h-[20%] w-full">
                    <Button
                        titleKey="it"
                        onClick={() => dispatch(setLanguage('it'))}
                        isActive={language == 'it'}
                    ></Button>
                </div>
            </div>
        );
        content.push(
            <div
                key="info"
                className={`${settingsContent == 'info' ? '' : 'hidden'} `}
            >
                <div className="p-6">
                    <a
                        href="https://www.globe-swiss.ch"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={logoGlobe}></img>
                    </a>
                </div>
                <div className="p-6">{getTranslationStatic('infoText')}</div>
                <div className="p-6 flex align-center justify-center">
                    <a
                        className="w-1/2"
                        href="http://smarttrip.ch"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img src={logoSmartTrip}></img>
                    </a>
                </div>
                <div className="p-6">
                    {getTranslationStatic('infoTextSmartTrip')}
                </div>
                <div className="p-6 flex align-center justify-center">
                    <a
                        className="w-[80%]"
                        href="mailto:daniel.laumer@gmail.com"
                    >
                        <img src={logoDaniel}></img>
                    </a>
                </div>
                <div className="p-6">
                    {getTranslationStatic('infoTextDaniel')}
                </div>
            </div>
        );
        content.push(
            <div
                key="help"
                className={`${settingsContent == 'help' ? '' : 'hidden'} `}
            >
                <div className="text-lg font-medium text-neutral-600">
                    {getTranslationStatic('mainTopics')}
                </div>
                {getHelpEntry('analyzeTitle', 'analyzeHelp', analyze)}
                {getHelpEntry('processTitle', 'processHelp', process)}
                {getHelpEntry('printTitle', 'printHelp', print)}
                {getHelpEntry('editTitle', 'editHelp', edit)}

                <div className="text-lg font-medium text-neutral-600 pt-4">
                    {getTranslationStatic('analyzeTitle')}
                </div>
                {getHelpEntry('selectPeriod', 'timeFilter', clock)}
                {getHelpEntry('selectArea', 'regionFilter', crop)}
                {getHelpEntry('charts', 'diagrams', sliders)}
                {getHelpEntry('filterTopicTitle', 'changeTopic', menu)}
                {getHelpEntry('hideShow', 'toggleFilters', eyeOpen)}
                {getHelpEntry('reset', 'resetFilters', trash)}

                <div className="text-lg font-medium text-neutral-600 pt-4">
                    {getTranslationStatic('mapElements')}
                </div>
                {getHelpEntry(
                    'legend',
                    'legendHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/list-bullet-16.svg'
                )}

                {getHelpEntry(
                    'layerList',
                    'layerListHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/layers-16.svg'
                )}
                {getHelpEntry(
                    'basemap',
                    'basemapHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/basemap-16.svg'
                )}
                {getHelpEntry(
                    'measureDistance',
                    'measureDistanceHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/measure-line-16.svg'
                )}
                {getHelpEntry(
                    'measureArea',
                    'measureAreaHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/measure-area-16.svg'
                )}
                {getHelpEntry(
                    'elevationProfile',
                    'elevationProfileHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/altitude-16.svg'
                )}
                {getHelpEntry(
                    'home',
                    'homeHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/home-16.svg'
                )}
                {getHelpEntry(
                    'locate',
                    'locateHelp',
                    'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/gps-off-16.svg'
                )}
            </div>
        );

        content.push(
            <div
                key="resources"
                className={`${settingsContent == 'resources' ? '' : 'hidden'} `}
            >
                {getLinkDiv(
                    'infoCollection',
                    language == 'en'
                        ? 'https://bioindication-maps.globe-swiss.ch/Datenerfassung/de'
                        : 'https://bioindication-maps.globe-swiss.ch/Datenerfassung/' +
                              language,
                    'linkToCollection',
                    externalLink
                )}

                {getLinkDiv(
                    'infoGlobe',
                    'https://globe-swiss.ch/de/Angebote/Bioindikation_im_Fliessgewaesser/',
                    'linkToGlobe',
                    externalLink
                )}
                {getLinkDiv(
                    'atAGlance',
                    'https://globe-swiss.ch/files/Downloads/1622/Download/Bioindikation%20im%20Fliessgewaesser%20auf%20einen%20Blick.pdf',
                    'linkToPdf',
                    file
                )}
            </div>
        );

        setSettingsSidePanel(
            <div id="settingsSidePanel" className="w-[20%] h-full py-3">
                <div className="w-full">
                    <Button
                        titleKey="languages"
                        onClick={() =>
                            dispatch(setSettingsContent('languages'))
                        }
                        isActive={settingsContent == 'languages'}
                        activeType="side"
                    ></Button>
                </div>
                <div className="w-full">
                    <Button
                        titleKey="info"
                        onClick={() => dispatch(setSettingsContent('info'))}
                        isActive={settingsContent == 'info'}
                        activeType="side"
                    ></Button>
                </div>
                <div className="w-full">
                    <Button
                        titleKey="resources"
                        onClick={() =>
                            dispatch(setSettingsContent('resources'))
                        }
                        isActive={settingsContent == 'resources'}
                        activeType="side"
                    ></Button>
                </div>
                <div className="w-full">
                    <Button
                        titleKey="help"
                        onClick={() => dispatch(setSettingsContent('help'))}
                        isActive={settingsContent == 'help'}
                        activeType="side"
                    ></Button>
                </div>
            </div>
        );

        setSettingsWindow(
            <div
                key="settings"
                id="settings"
                className={`flex flex-col flex-none justify-between`}
            >
                {content}
            </div>
        );

        if (language != null && language != '') {
            // Set the URL Parameter for the language
            // Construct URLSearchParams object instance from current URL querystring.
            const queryParams = new URLSearchParams(window.location.search);
            // Set new or modify existing parameter value.
            queryParams.set('lang', language);
            // Replace current querystring with the new one.
            history.replaceState(null, null, '?' + queryParams.toString());
        }
    }, [settingsContent, settingsOpen, language]);

    const getLinkDiv = (
        title: string,
        link: string,
        linkText: string,
        icon: any
    ) => {
        return (
            <a href={link} target="_blank" rel="noreferrer">
                <div className="flex w-full hover:bg-hovergrey py-2">
                    <img className="px-4" src={icon}></img>
                    <div>
                        <div>{getTranslationStatic(title)}</div>
                        <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            {getTranslationStatic(linkText)}
                        </div>
                    </div>
                </div>
            </a>
        );
    };

    const getHelpEntry = (title: string, text: string, icon: any) => {
        return (
            <div className="flex w-full py-2">
                <div className="w-[50px] pr-6">
                    <img className=" " src={icon}></img>
                </div>

                <div className="w-[calc(100%-50px)]">
                    <div className="font-bold">
                        {getTranslationStatic(title)}
                    </div>
                    <div>{getTranslationStatic(text)}</div>
                </div>
            </div>
        );
    };
    // UI part
    return (
        <div
            id={'settingsWindow'}
            className={`${
                settingsOpen ? '' : 'hidden'
            } absolute top-0 w-full bg-black bg-opacity-50 h-full z-[100]`}
        >
            <div
                id="settings"
                className="divide-y-2 absolute left-[calc(50%-300px)] top-[calc(50%-200px)] h-[400px] w-[600px] bg-white pointer-events-auto"
            >
                <div
                    id="settingsHeader"
                    className=" flex flex-row justify-center w-full h-[10%]"
                >
                    <div className="flex align-center justify-center flex-col font-bold">
                        <div>{title}</div>
                    </div>
                    <button
                        className="absolute top-2 right-2"
                        onClick={() => {
                            dispatch(toggleSettingsOpen());
                        }}
                    >
                        <img className={`w-[25px] flex`} src={close}></img>
                    </button>
                </div>
                <div className="divide-x-2 flex w-full h-[90%]">
                    {settingsSidePanel}
                    <div
                        id="settingsContent"
                        className="text-justify h-full w-[80%] overflow-auto p-5"
                    >
                        {settingsWindow}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
