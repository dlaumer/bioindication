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

const SidePanel: FC<React.ComponentProps<'div'>> = () => {
    const sidePanelContent = useSelector(selectSidePanelContent);

    const chartTitle = getTranslation('chartTitle');
    const measurementTitle = getTranslation('measurementTitle');
    const layerListTitle = getTranslation('layerListTitle');
    const printTitle = getTranslation('printTitle');
    const editTitle = getTranslation('editTitle');

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    useEffect(() => {
        if (sidePanelContent == 'charts') {
            setTitle(chartTitle);
            setContent(<Charts title="chartTitle"></Charts>);
        } else if (sidePanelContent == 'measurement') {
            setTitle(measurementTitle);
            setContent(<Measurement title="measurementTitle"></Measurement>);
        } else if (sidePanelContent == 'layerList') {
            setTitle(layerListTitle);
            setContent(<Measurement title="layerListTitle"></Measurement>);
        } else if (sidePanelContent == 'print') {
            setTitle(printTitle);
            setContent(<Measurement title="printTitle"></Measurement>);
        } else if (sidePanelContent == 'edit') {
            setTitle(editTitle);
            setContent(<Measurement title="editTitle"></Measurement>);
        }
    }, [sidePanelContent]);

    // UI part
    return (
        <div
            id="sidePanel"
            className="absolute flex flex-col flex-none justify-between z-30 w-[30%]  h-[calc(100%_-_80px)] bg-white top-[70px] left-[10px]"
        >
            <div
                id="sidePanelHeader"
                className="w-full flex flex-row justify-between h-fit bg-projectgreen p-[5px] "
            >
                <div>{title}</div>
                <div className="flex flex-row white">
                    <div className="p-1">v</div>
                    <div className="p-1">x</div>
                </div>
            </div>

            {content}
        </div>
    );
};

export default SidePanel;
