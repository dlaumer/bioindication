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
        if (sidePanelContent == 'charts') {
            title = chartTitle;
            content = <Charts title="chartTitle"></Charts>;
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
        }

        setSidePanelWindow(
            <div
                id="sidePanel"
                className={`${
                    sidePanelContent == 'null' ? 'hidden' : ''
                } absolute flex flex-col flex-none justify-between z-30 w-[30%]  h-[calc(100%_-_80px)] bg-white top-[70px] left-[10px]`}
            >
                <div
                    id="sidePanelHeader"
                    className="w-full flex flex-row justify-between h-fit bg-projectgreen p-[5px] "
                >
                    <div>{title}</div>
                    <div className="flex flex-row white">
                        <div className="p-1">v</div>
                        <button
                            className="p-1"
                            onClick={() =>
                                dispatch(setSidePanelContent('null'))
                            }
                        >
                            x
                        </button>
                    </div>
                </div>

                {content}
            </div>
        );
    }, [sidePanelContent]);

    // UI part
    return <div>{sidePanelWindow}</div>;
};

export default SidePanel;
