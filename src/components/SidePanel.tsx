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

import PanelProcess from './PanelProcess';
import PanelPrint from './PanelPrint';
import PanelEditor from './PanelEditor';

import settings from './../constants/Settings.svg';
import edit from './../constants/Edit.svg';
import analyze from './../constants/pie-chart.svg';
import process2 from './../constants/refresh-cw.svg';
import print from './../constants/printer.svg';
import SidePanelHeader from './SidePanelHeader';

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
        const content: any = [];
        content.push(
            <div
                key="analyze"
                className={`pointer-events-auto ${
                    sidePanelContent == 'analyze' ? '' : 'hidden'
                } h-full`}
            >
                <PanelAnalyze
                    active={sidePanelContent == 'analyze'}
                    title="analyzeTitle"
                ></PanelAnalyze>
            </div>
        );
        content.push(
            <div
                key="process"
                className={`pointer-events-auto ${
                    sidePanelContent == 'process' ? '' : 'hidden'
                } `}
            >
                <PanelProcess
                    active={sidePanelContent == 'process'}
                    title="processTitle"
                ></PanelProcess>
            </div>
        );
        content.push(
            <div
                key="print"
                className={`pointer-events-auto ${
                    sidePanelContent == 'print' ? '' : 'hidden'
                }  h-full`}
            >
                <PanelPrint title="printTitle"></PanelPrint>
            </div>
        );
        content.push(
            <div
                key="edit"
                className={`pointer-events-auto ${
                    sidePanelContent == 'edit' ? '' : 'hidden'
                }  h-full`}
            >
                <PanelEditor
                    active={sidePanelContent == 'edit'}
                    title="editTitle"
                ></PanelEditor>
            </div>
        );

        setSidePanelWindow(
            <div
                key="sidePanel"
                id="sidePanel"
                className={`absolute rounded-xl flex flex-col flex-none justify-start z-30 w-[30%] rounded-xl h-[calc(100%_-_90px)] pointer-events-none top-[70px] left-[10px]`}
            >
                <SidePanelHeader></SidePanelHeader>

                {content}
            </div>
        );
    }, [sidePanelContent]);

    // UI part
    return <div>{sidePanelWindow}</div>;
};

export default SidePanel;
