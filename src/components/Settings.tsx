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
                    <img className="w-[80%]" src={logoDaniel}></img>
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
                <Button
                    titleKey="ressources"
                    onClick={() =>
                        window.open(
                            'https://globe-swiss.ch/de/Angebote/Bioindikation_im_Fliessgewaesser/',
                            '_blank'
                        )
                    }
                    isActive={language == 'it'}
                ></Button>
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

        // Set the URL Parameter for the language

        // Construct URLSearchParams object instance from current URL querystring.
        const queryParams = new URLSearchParams(window.location.search);
        // Set new or modify existing parameter value.
        queryParams.set('lang', language);
        // Replace current querystring with the new one.
        history.replaceState(null, null, '?' + queryParams.toString());
    }, [settingsContent, settingsOpen, language]);

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
