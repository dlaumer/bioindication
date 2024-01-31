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
import { selectSidePanelContent } from '../store/selectors';
import { setSidePanelContent } from '@store/reducer';
import settings from './../constants/Settings.svg';
import edit from './../constants/Edit.svg';
import sort from './../constants/Sort.svg';

const Header = () => {
    const dispatch = useDispatch();
    // UI part

    const sidePanelContent = useSelector(selectSidePanelContent);

    const [buttons, setButtons] = useState(null);

    useEffect(() => {
        setButtons(
            <div className="flex flex-row h-[80%] items-center gap-2 mr-4 font-noigrotesk">
                <Button
                    titleKey="chartTitle"
                    onClick={() => dispatch(setSidePanelContent('charts'))}
                    isActive={sidePanelContent == 'charts'}
                    icon={sort}
                ></Button>
                <Button
                    titleKey="measurementTitle"
                    onClick={() => dispatch(setSidePanelContent('measurement'))}
                    isActive={sidePanelContent == 'measurement'}
                    icon={settings}
                ></Button>
                <Button
                    titleKey="layerListTitle"
                    onClick={() => dispatch(setSidePanelContent('layerList'))}
                    isActive={sidePanelContent == 'layerList'}
                    icon={settings}
                ></Button>
                <Button
                    titleKey="printTitle"
                    onClick={() => dispatch(setSidePanelContent('print'))}
                    isActive={sidePanelContent == 'print'}
                    icon={settings}
                ></Button>
                <Button
                    titleKey="editTitle"
                    onClick={() => dispatch(setSidePanelContent('edit'))}
                    isActive={sidePanelContent == 'edit'}
                    icon={edit}
                ></Button>
            </div>
        );
    }, [sidePanelContent]);

    return (
        <div
            id="header"
            className="absolute flex flex-row flex-none justify-between z-30 w-full h-[60px] py-1 bg-headergreen px-[15px]"
        >
            <div className="h-full flex flex-row items-center gap-2 mr-4 font-noigrotesk">
                <Button
                    className="leading-snug xxl:text-xxl text-navyblue hover:text-hoverblue font-noigrotesk"
                    titleKey="title"
                ></Button>
                {buttons}
            </div>
            <div className="flex flex-row h-full items-center gap-2 mr-4 font-noigrotesk">
                <div className="flex flex-row h-[80%] items-center gap-2 font-noigrotesk">
                    <Dropdown
                        tag="language"
                        options={['en', 'de', 'fr', 'it']}
                    />
                    <Button
                        titleKey="login"
                        //onClick={() => dispatch(setIsLoggedIn())}
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
