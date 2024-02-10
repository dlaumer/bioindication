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

const Settings: FC<React.ComponentProps<'div'>> = () => {
    const dispatch = useDispatch();

    const settingsContent = useSelector(selectSettingsContent);
    const settingsOpen = useSelector(selectSettingsOpen);
    const language = useSelector(selectLanguage);

    const [settingsWindow, setSettingsWindow] = useState(null);
    const [settingsSidePanel, setSettingsSidePanel] = useState(null);

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
                key="infp"
                className={`${settingsContent == 'info' ? '' : 'hidden'} `}
            ></div>
        );
        content.push(
            <div
                key="help"
                className={`${settingsContent == 'help' ? '' : 'hidden'} `}
            ></div>
        );

        setSettingsSidePanel(
            <div id="settingsSidePanel" className="w-[30%] h-full">
                <div className="h-[20%] w-full">
                    <Button
                        titleKey="languages"
                        onClick={() =>
                            dispatch(setSettingsContent('languages'))
                        }
                        isActive={settingsContent == 'languages'}
                    ></Button>
                </div>
                <div className="h-[20%] w-full">
                    <Button
                        titleKey="info"
                        onClick={() => dispatch(setSettingsContent('info'))}
                        isActive={settingsContent == 'info'}
                    ></Button>
                </div>

                <div className="h-[20%] w-full">
                    <Button
                        titleKey="help"
                        onClick={() => dispatch(setSettingsContent('help'))}
                        isActive={settingsContent == 'help'}
                    ></Button>
                </div>
            </div>
        );

        setSettingsWindow(
            <div
                key="settings"
                id="settings"
                className={`absolute rounded-xl flex flex-col flex-none justify-between z-30 w-[30%]  h-[30%] bg-white`}
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
            } absolute top-0 w-full bg-black bg-opacity-50 h-full z-[100] p-64`}
        >
            <div className="w-full h-full bg-white p-3 overflow-auto">
                <div
                    id="settingsHeader"
                    className="flex flex-row justify-end w-full h-[10%]"
                >
                    <button
                        className="relative top-2 right-2"
                        onClick={() => {
                            dispatch(toggleSettingsOpen());
                        }}
                    >
                        <img
                            className={`w-[25px] px-[5px] flex`}
                            src={
                                'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/x-24.svg'
                            }
                        ></img>
                    </button>
                </div>
                <div className="flex w-full h-[90%]">
                    {settingsSidePanel}
                    <div id="settingsContent" className="h-full w-[70%]">
                        {settingsWindow}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
