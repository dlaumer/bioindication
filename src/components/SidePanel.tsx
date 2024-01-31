/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useSelector, useDispatch } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import Charts from './Charts';
import { selectSidePanelContent } from '@store/selectors';
import Measurement from './Measurement';
import Button from './Button';
import { setSidePanelContent } from '@store/reducer';

import settings from './../constants/Settings.svg';
import edit from './../constants/Edit.svg';
import sort from './../constants/Sort.svg';

const SidePanel: FC<React.ComponentProps<'div'>> = () => {
    const dispatch = useDispatch();

    const sidePanelContent = useSelector(selectSidePanelContent);

    const chartTitle = getTranslation('chartTitle');
    const measurementTitle = getTranslation('measurementTitle');
    const layerListTitle = getTranslation('layerListTitle');
    const printTitle = getTranslation('printTitle');
    const editTitle = getTranslation('editTitle');

    const [sidePanelWindow, setSidePanelWindow] = useState(null);

    //const [content, setContent] = useState(null);

    useEffect(() => {
        let content = null;
        let title = null;
        let icon = settings;
        if (sidePanelContent == 'charts') {
            title = chartTitle;
            content = <Charts title="chartTitle"></Charts>;
            icon = sort;
        } else if (sidePanelContent == 'measurement') {
            title = measurementTitle;
            content = <Measurement title="measurementTitle"></Measurement>;
        } else if (sidePanelContent == 'layerList') {
            title = layerListTitle;
            content = <Measurement title="layerListTitle"></Measurement>;
        } else if (sidePanelContent == 'print') {
            title = printTitle;
            content = <Measurement title="printTitle"></Measurement>;
        } else if (sidePanelContent == 'edit') {
            title = editTitle;
            content = <Measurement title="editTitle"></Measurement>;
            icon = edit;
        }

        const sidePanelHeader = (
            <div
                id="sidePanelHeader"
                className="rounded-t-xl w-full flex flex-row justify-between h-fit bg-projectgreen p-[5px] "
            >
                <div className="h-full flex items-center">
                    <img src={icon} className="h-[20px] px-[10px]"></img>
                    <div>{title}</div>
                </div>
                <div className="flex flex-row white">
                    <div className="p-1">v</div>
                    <button
                        className="p-1"
                        onClick={() => dispatch(setSidePanelContent('null'))}
                    >
                        x
                    </button>
                </div>
            </div>
        );

        setSidePanelWindow(
            <div
                id="sidePanel"
                className={`${
                    sidePanelContent == 'null' ? 'hidden' : ''
                } absolute rounded-xl flex flex-col flex-none justify-between z-30 w-[30%]  h-[calc(100%_-_120px)] bg-white top-[70px] left-[10px]`}
            >
                {sidePanelHeader}
                {content}
            </div>
        );
    }, [sidePanelContent]);

    // UI part
    return <div>{sidePanelWindow}</div>;
};

export default SidePanel;
