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
import { selectLanguage } from '../store/selectors';

const Header = () => {
    const dispatch = useDispatch();
    // UI part
    return (
        <div
            id="header"
            className="flex flex-row flex-none justify-between z-30 w-full py-1 bg-backgroundgray px-[15px]"
        >
            <div className="basis-2/5 flex justify-start items-baseline gap-3 align-baseline flex">
                <Button
                    className="leading-snug xl:text-xxl text-navyblue hover:text-hoverblue font-noigrotesk"
                    titleKey="title"
                />
                <div className="flex flex-row items-center gap-2 mr-4 font-noigrotesk">
                    <Dropdown
                        tag="language"
                        options={['en', 'de', 'fr', 'it']}
                    />
                </div>
                <Button
                    titleKey="login"
                    //onClick={() => dispatch(setIsLoggedIn())}
                />
            </div>
        </div>
    );
};

export default Header;
