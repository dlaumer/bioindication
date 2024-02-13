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
} from '@store/reducer';
import {
    selectFilterTimeActive,
    selectFilterSpaceActive,
    selectFilterSpaceDrawing,
} from '@store/selectors';
import Dropdown from './Dropdown';
import Button from './Button';
import ExampleChart from './ExampleChart';

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

    // UI part
    return (
        <div
            id="analyze"
            className={`flex flex-col flex-none z-30 w-full  h-full bg-white p-[5px]`}
        >
            <div
                id="filterTime"
                className={`rounded-xl w-full p-[5px] my-[2.5px] bg-backgroundgray  ${
                    filterTimeActive ? 'cursor-pointer' : 'opacity-50'
                }`}
            >
                <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="checkboxTime"
                            checked={filterTimeActive ? true : false}
                            className="w-[15px] h-[15px] m-[10px]"
                            onChange={() => {
                                dispatch(setFilterTimeActive());
                            }}
                        />

                        <div id="filterTimeTitle">
                            {getTranslation('filterTimeTitle')}
                        </div>
                    </div>

                    <button
                        id="filterTimeClear"
                        className={`${
                            !filterTimeActive
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer'
                        }`}
                        onClick={(event: any) => {
                            dispatch(setFilterTimeStart(null));
                            dispatch(setFilterTimeEnd(null));
                            event.stopPropagation();
                        }}
                    >
                        {getTranslation('clear')}
                    </button>
                </div>
                <div id="filterTimeContainer"></div>
            </div>
            <div
                id="filterSpace"
                className={`rounded-xl w-full p-[5px] my-[2.5px] bg-backgroundgray ${
                    filterSpaceActive ? 'cursor-pointer' : 'opacity-50'
                }`}
            >
                <div className="flex items-center justify-between ">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="checkboxTime"
                            checked={filterSpaceActive ? true : false}
                            className="w-[15px] h-[15px] m-[10px]"
                            onChange={() => {
                                dispatch(setFilterSpaceActive());
                            }}
                        />
                        <div id="filterSpaceTitle">
                            {getTranslation('filterSpaceTitle')}
                        </div>
                    </div>

                    <div>
                        <Button
                            titleKey="selectArea"
                            onClick={(event: any) => {
                                dispatch(
                                    setFilterSpaceDrawing(!filterSpaceDrawing)
                                );
                                event.stopPropagation();
                            }}
                            isActive={!filterSpaceDrawing}
                            isDisabled={!filterSpaceActive}
                        ></Button>
                        <button
                            id="filterSpaceClear"
                            className={`mx-[10px] ${
                                !filterSpaceActive
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'cursor-pointer'
                            }`}
                            onClick={(event: any) => {
                                dispatch(setFilterSpace(null));
                                event.stopPropagation();
                            }}
                        >
                            {getTranslation('clear')}
                        </button>
                    </div>
                </div>
            </div>
            <div
                id="filterChart"
                className="rounded-xl w-full max-h-[60vh] p-[5px] my-[2.5px] bg-backgroundgray overflow-auto"
            >
                <div className="flex items-center justify-between ">
                    <div id="filterTopicTitle">
                        {getTranslation('filterTopicTitle')}
                    </div>
                    <Dropdown
                        tag="categories"
                        options={['bioQuality', 'waterQuality']}
                    />
                </div>
                <ExampleChart />
            </div>
        </div>
    );
};

export default PanelAnalyze;
