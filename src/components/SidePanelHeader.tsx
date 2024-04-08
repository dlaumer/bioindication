/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useSelector, useDispatch } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import { setSidePanelContent } from '@store/reducer';
import close from './../constants/x_white.svg';
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
            className="rounded-t-xl w-full flex flex-row justify-between h-[40px] bg-evendarkergrey text-white px-[5px] "
        >
            <div className="rounded-t-xl flex flex-row h-full bg-evendarkergrey text-white ">
                <div
                    className={`pr-2 cursor-pointer h-full flex items-center border-b-4 ${
                        sidePanelContent == 'analyze'
                            ? 'border-projectgreen'
                            : 'border-evendarkergrey'
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
                            ? 'border-projectgreen'
                            : 'border-evendarkergrey'
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
                            ? 'border-projectgreen'
                            : 'border-evendarkergrey'
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
                <div
                    className={`pr-2 ${
                        isLoggedIn ? '' : 'hidden'
                    } cursor-pointer h-full flex items-center border-b-4 ${
                        sidePanelContent == 'edit'
                            ? 'border-projectgreen'
                            : 'border-evendarkergrey'
                    } `}
                    onClick={() => dispatch(setSidePanelContent('edit'))}
                >
                    <img src={edit} className="invert h-[20px] px-[10px]"></img>
                    <div className="font-bold">
                        {getTranslation('editTitle')}
                    </div>
                </div>
            </div>

            <div className="flex flex-row white">
                <img
                    className={`w-[25px] flex cursor-pointer`}
                    onClick={() => dispatch(setSidePanelContent('null'))}
                    src={close}
                ></img>
            </div>
        </div>
    );

    // UI part
    return sidePanelHeader;
};

export default SidePanelHeader;
