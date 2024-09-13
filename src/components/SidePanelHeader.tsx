/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useSelector, useDispatch } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import { setLoginClicked, setSidePanelContent } from '@store/reducer';
import close from './../constants/chevron-down.svg';
import { selectIsLoggedIn, selectSidePanelContent } from '@store/selectors';

import edit from './../constants/Edit.svg';
import analyze from './../constants/pie-chart.svg';
import process from './../constants/refresh-cw.svg';
import print from './../constants/printer.svg';

const SidePanelHeader: FC<React.ComponentProps<'div'>> = () => {
    const dispatch = useDispatch();

    const sidePanelContent = useSelector(selectSidePanelContent);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    //const [content, setContent] = useState(null);

    const sidePanelHeader = (
        <div
            id="sidePanelHeader"
            className="pointer-events-auto rounded-t-xl w-full flex flex-row justify-between h-[40px] bg-darkgrey text-white px-[5px] "
        >
            <div className="rounded-t-xl flex flex-row h-full bg-darkgrey text-white ">
                <div
                    className={`pr-2 cursor-pointer h-full flex items-center border-b-4 ${
                        sidePanelContent == 'edit'
                            ? 'border-projectcolor'
                            : 'border-darkgrey'
                    } `}
                    onClick={() => {
                        if (isLoggedIn) {
                            dispatch(setSidePanelContent('edit'));
                        } else {
                            dispatch(setLoginClicked(true));
                        }
                    }}
                >
                    <img
                        src={edit}
                        className={`invert h-[20px] px-[10px]`}
                    ></img>
                    <div className="font-bold">
                        {getTranslation('editTitle')}
                    </div>
                </div>
                <div
                    className={`pr-2 cursor-pointer h-full flex items-center border-b-4 ${
                        sidePanelContent == 'analyze'
                            ? 'border-projectcolor'
                            : 'border-darkgrey'
                    } `}
                    onClick={() => dispatch(setSidePanelContent('analyze'))}
                >
                    <img
                        src={analyze}
                        className="invert h-[20px] px-[10px]"
                    ></img>
                    <div className="font-bold">
                        {getTranslation('analyzeTitle')}
                    </div>
                </div>
                <div
                    className={`pr-2 cursor-pointer h-full flex items-center border-b-4 ${
                        sidePanelContent == 'process'
                            ? 'border-projectcolor'
                            : 'border-darkgrey'
                    } `}
                    onClick={() => dispatch(setSidePanelContent('process'))}
                >
                    <img
                        src={process}
                        className="invert h-[20px] px-[10px]"
                    ></img>
                    <div className="font-bold">
                        {getTranslation('processTitle')}
                    </div>
                </div>
                <div
                    className={`pr-2 cursor-pointer h-full flex items-center border-b-4 ${
                        sidePanelContent == 'print'
                            ? 'border-projectcolor'
                            : 'border-darkgrey'
                    } `}
                    onClick={() => dispatch(setSidePanelContent('print'))}
                >
                    <img
                        src={print}
                        className="invert h-[20px] px-[10px]"
                    ></img>
                    <div className="font-bold">
                        {getTranslation('printTitle')}
                    </div>
                </div>
            </div>

            <div className="flex flex-row white">
                <img
                    className={`w-[25px] flex cursor-pointer invert`}
                    onClick={() => {
                        if (sidePanelContent == 'null') {
                            dispatch(setSidePanelContent('analyze'));
                        } else {
                            dispatch(setSidePanelContent('null'));
                        }
                    }}
                    src={close}
                ></img>
            </div>
        </div>
    );

    // UI part
    return sidePanelHeader;
};

export default SidePanelHeader;
