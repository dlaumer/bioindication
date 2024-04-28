/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useDispatch, useSelector } from 'react-redux';

import React, { FC } from 'react';
import { getTranslation } from '../services/languageHelper';
import {
    setFilterTimeActive,
    setFilterSpaceActive,
    setFilterTimeStart,
    setFilterTimeEnd,
    setFilterSpace,
    setFilterSpaceDrawing,
    setFilterSpaceDrawingType,
} from '@store/reducer';
import {
    selectFilterTimeActive,
    selectFilterSpaceActive,
    selectFilterSpaceDrawing,
    selectCategory,
    selectFilterSpaceDrawingType,
} from '@store/selectors';
import Dropdown from './Dropdown';
import Button from './Button';
import Chart from './Chart';

import polygon from './../constants/polygon-16.svg';
import circle from './../constants/circle-16.svg';
import rectangle from './../constants/rectangle-16.svg';

import clock from './../constants/clock.svg';
import crop from './../constants/crop.svg';
import sliders from './../constants/sliders.svg';
import eyeOpen from './../constants/view-visible-24.svg';
import eyeClosed from './../constants/view-hide-24.svg';
import trash from './../constants/trash.svg';

type PanelAnalyzeProps = {
    title?: string;
    active?: boolean;
};
const PanelAnalyze: FC<PanelAnalyzeProps & React.ComponentProps<'div'>> = ({
    title = 'Default',
    active = false,
}) => {
    title = getTranslation(title);

    const dispatch = useDispatch();
    const filterTimeActive = useSelector(selectFilterTimeActive);
    const filterSpaceActive = useSelector(selectFilterSpaceActive);
    const filterSpaceDrawing = useSelector(selectFilterSpaceDrawing);
    const filterSpaceDrawingType = useSelector(selectFilterSpaceDrawingType);
    const category = useSelector(selectCategory);

    // UI part
    return (
        <div
            id="analyze"
            className={`flex flex-col flex-none z-30 h-full rounded-xl w-full bg-white p-[5px]`}
        >
            <div
                id="filterTime"
                className={`rounded-xl w-full p-[5px] my-[2.5px] bg-backgroundgray  ${
                    filterTimeActive ? '' : 'opacity-50'
                }`}
            >
                <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                        <div className="h-full flex items-center">
                            <img
                                src={clock}
                                className="h-[20px] px-[10px]"
                            ></img>
                            <div id="filterTimeTitle" className="font-bold">
                                {getTranslation('selectPeriod')}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <img
                            src={trash}
                            className="h-[20px] px-[10px] cursor-pointer"
                            id="filterTimeClear"
                            onClick={(event: any) => {
                                dispatch(setFilterTimeStart(null));
                                dispatch(setFilterTimeEnd(null));
                                event.stopPropagation();
                            }}
                        ></img>
                        <img
                            src={filterTimeActive ? eyeOpen : eyeClosed}
                            className="h-[20px] px-[10px] cursor-pointer"
                            id="checkboxTime"
                            onClick={() => {
                                dispatch(setFilterTimeActive());
                            }}
                        ></img>
                    </div>
                </div>
                <div
                    id="filterTimeContainer"
                    className="h-[94px] bg-backgroundgray"
                ></div>
            </div>
            <div
                id="filterSpace"
                className={`rounded-xl w-full p-[5px] my-[2.5px] bg-backgroundgray ${
                    filterSpaceActive ? '' : 'opacity-50'
                }`}
            >
                <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                        <div className="h-full flex items-center">
                            <img
                                src={crop}
                                className="h-[20px] px-[10px]"
                            ></img>
                            <div id="filterSpaceTitle" className="font-bold">
                                {getTranslation('selectArea')}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="pr-2">
                            <Button
                                icon={polygon}
                                title=""
                                onClick={(event: any) => {
                                    dispatch(
                                        setFilterSpaceDrawing(
                                            !filterSpaceDrawing
                                        )
                                    );
                                    dispatch(
                                        setFilterSpaceDrawingType('polygon')
                                    );

                                    event.stopPropagation();
                                }}
                                isActive={
                                    filterSpaceDrawing &&
                                    filterSpaceDrawingType == 'polygon'
                                }
                                isDisabled={!filterSpaceActive}
                            ></Button>
                        </div>

                        <div className="pr-2">
                            <Button
                                icon={circle}
                                title=""
                                onClick={(event: any) => {
                                    dispatch(
                                        setFilterSpaceDrawing(
                                            !filterSpaceDrawing
                                        )
                                    );
                                    dispatch(
                                        setFilterSpaceDrawingType('circle')
                                    );
                                    event.stopPropagation();
                                }}
                                isActive={
                                    filterSpaceDrawing &&
                                    filterSpaceDrawingType == 'circle'
                                }
                                isDisabled={!filterSpaceActive}
                            ></Button>
                        </div>
                        <div className="pr-2">
                            <Button
                                icon={rectangle}
                                title=""
                                onClick={(event: any) => {
                                    dispatch(
                                        setFilterSpaceDrawing(
                                            !filterSpaceDrawing
                                        )
                                    );
                                    dispatch(
                                        setFilterSpaceDrawingType('rectangle')
                                    );
                                    event.stopPropagation();
                                }}
                                isActive={
                                    filterSpaceDrawing &&
                                    filterSpaceDrawingType == 'rectangle'
                                }
                                isDisabled={!filterSpaceActive}
                            ></Button>
                        </div>
                        <img
                            src={trash}
                            className="h-[20px] px-[10px] cursor-pointer"
                            id="filterSpaceClear"
                            onClick={(event: any) => {
                                dispatch(setFilterSpace(null));
                                event.stopPropagation();
                            }}
                        ></img>
                        <img
                            src={filterSpaceActive ? eyeOpen : eyeClosed}
                            className="h-[20px] px-[10px] cursor-pointer"
                            id="checkboxTime"
                            onClick={() => {
                                dispatch(setFilterSpaceActive());
                            }}
                        ></img>
                    </div>
                </div>
            </div>
            <div id="filterChart" className="flex-1 rounded-xl w-full bg-white">
                <div className="flex items-center justify-between rounded-xl w-full p-[5px] my-[2.5px] bg-backgroundgray">
                    <div className="h-full w-[calc(100%-20px)] flex items-center">
                        <img src={sliders} className="h-[20px] px-[10px]"></img>
                        <div id="filterTopicTitle" className="font-bold">
                            {getTranslation(category)}
                        </div>
                    </div>

                    <Dropdown tag="categories" />
                </div>
                <Chart />
            </div>
        </div>
    );
};

export default PanelAnalyze;
