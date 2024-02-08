/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useSelector, useDispatch } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import PanelAnalyze from './PanelAnalyze';
import { selectSidePanelContent } from '@store/selectors';
import Measurement from './PanelEditor';
import Button from './Button';
import { setSidePanelContent } from '@store/reducer';

import settings from './../constants/Settings.svg';
import edit from './../constants/Edit.svg';
import sort from './../constants/Sort.svg';
import PanelProcess from './PanelProcess';
import PanelPrint from './PanelPrint';
import PanelEditor from './PanelEditor';

const SidePanel: FC<React.ComponentProps<'div'>> = () => {
    const dispatch = useDispatch();

    const sidePanelContent = useSelector(selectSidePanelContent);

    const analyzeTitle = getTranslation('analyzeTitle');
    const processTitle = getTranslation('processTitle');
    const printTitle = getTranslation('printTitle');
    const editTitle = getTranslation('editTitle');

    const [sidePanelWindow, setSidePanelWindow] = useState(null);

    //const [content, setContent] = useState(null);

    useEffect(() => {
        let content = null;
        let title = null;
        let icon = settings;
        if (sidePanelContent == 'charts') {
            title = analyzeTitle;
            content = <PanelAnalyze title="analyzeTitle"></PanelAnalyze>;
            icon = sort;
        } else if (sidePanelContent == 'process') {
            title = processTitle;
            content = <PanelProcess title="processTitle"></PanelProcess>;
        } else if (sidePanelContent == 'print') {
            title = printTitle;
            content = <PanelPrint title="printTitle"></PanelPrint>;
        } else if (sidePanelContent == 'edit') {
            title = editTitle;
            content = <PanelEditor title="editTitle"></PanelEditor>;
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
