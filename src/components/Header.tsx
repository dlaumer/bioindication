/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from './Button';
import Dropdown from './Dropdown';
import {
    selectIsLoggedIn,
    selectSidePanelContent,
    selectSettingsOpen,
    selectUserInfos,
} from '../store/selectors';
import {
    setSidePanelContent,
    setLogInAttempt,
    toggleSettingsOpen,
    setLoginClicked,
    toggleLoginClicked,
} from '@store/reducer';
import { getTranslation } from '@services/languageHelper';

import settings from './../constants/Settings.svg';
import logoGlobe from './../constants/logoGlobe.png';
import ButtonLogin from './ButtonLogin';

const Header = () => {
    const dispatch = useDispatch();
    // UI part

    const sidePanelContent = useSelector(selectSidePanelContent);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userInfos = useSelector(selectUserInfos);
    const settingsOpen = useSelector(selectSettingsOpen);

    const [buttons, setButtons] = useState(null);
    const [loginButton, setLoginButton] = useState(null);

    useEffect(() => {
        setLoginButton(
            <ButtonLogin
                titleKey="login"
                username={userInfos.username}
                onClick={() => {
                    if (isLoggedIn) {
                        dispatch(toggleLoginClicked(true));
                    } else {
                        dispatch(setLoginClicked(true));
                    }
                }}
            />
        );
    }, [userInfos]);

    return (
        <div
            id="header"
            className="absolute flex flex-row flex-none z-30 w-full h-[60px] py-1 bg-headerwhite backdrop-blur-sm px-[15px]"
        >
            <div
                id="header1"
                className="h-full w-[50%] flex flex-row items-center gap-2 mr-4 font-noigrotesk"
            >
                <iframe
                    className="h-[50px] w-[50px]"
                    src="https://lottie.host/embed/1cbfaa25-8306-43b9-91ab-aec97b47e4ae/DiSaFHfqFN.json"
                ></iframe>
                <div id="titleContainer" className="flex items-center">
                    <div
                        id="mainTitle"
                        className="leading-snug text-3xl font-bold mr-4"
                    >
                        {getTranslation('title')}
                    </div>
                    <div
                        id="subTitle"
                        className="leading-snug text-base font-bold"
                    >
                        {getTranslation('subTitle')}
                    </div>
                </div>
            </div>

            <div
                id="header2"
                className="flex flex-row w-[50%] h-full justify-end items-center gap-2 mr-4 font-noigrotesk"
            >
                <div className="flex flex-row h-[80%] items-center gap-2 font-noigrotesk">
                    <Button
                        titleKey=""
                        onClick={() => dispatch(toggleSettingsOpen())}
                        isActive={settingsOpen}
                        icon={settings}
                    ></Button>
                    {loginButton}
                </div>
            </div>
        </div>
    );
};

export default Header;
