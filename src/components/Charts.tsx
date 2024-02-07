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
} from '@store/reducer';
import {
    selectFilterTimeActive,
    selectFilterSpaceActive,
} from '@store/selectors';
import Dropdown from './Dropdown';
import Button from './Button';
import ExampleChart from './ExampleChart';

type ChartsProps = {
    title?: string;
};
const Charts: FC<ChartsProps & React.ComponentProps<'div'>> = ({
    title = 'Default',
}) => {
    title = getTranslation(title);

    const dispatch = useDispatch();
    const filterTimeActive = useSelector(selectFilterTimeActive);
    const filterSpaceActive = useSelector(selectFilterSpaceActive);

    // UI part
    return (
        <div
            id="charts"
            className="flex flex-col flex-none justify-between z-30 w-full  h-full bg-white p-[5px]"
        >
            <div
                id="filterTime"
                className={`rounded-xl w-full flex-grow p-[5px] my-[2.5px] ${
                    filterTimeActive
                        ? 'bg-activeBlue cursor-pointer'
                        : 'bg-backgroundgray opacity-50'
                }`}
                onClick={(event) => {
                    dispatch(setFilterTimeActive());
                    event.stopPropagation();
                }}
            >
                <div className="flex items-center justify-between ">
                    <div id="filterTimeTitle">
                        {getTranslation('filterTimeTitle')}
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
                className={`rounded-xl w-full flex-grow p-[5px] my-[2.5px] ${
                    filterSpaceActive
                        ? 'bg-activeBlue cursor-pointer'
                        : 'bg-backgroundgray opacity-50'
                }`}
                onClick={(event) => {
                    dispatch(setFilterSpaceActive());
                    event.stopPropagation();
                }}
            >
                <div className="flex items-center justify-between ">
                    <div id="filterSpaceTitle">
                        {getTranslation('filterSpaceTitle')}
                    </div>
                    <div>
                        <Button
                            titleKey="selectArea"
                            onClick={(event: any) => {
                                event.stopPropagation();
                            }}
                            isActive={true}
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
                className="rounded-xl w-full flex-grow-[4] max-h-[60vh] p-[5px] my-[2.5px] bg-backgroundgray overflow-auto"
            >
                <div className="flex items-center justify-between ">
                    <div id="filterTopicTitle">
                        {getTranslation('filterTopicTitle')}
                    </div>
                    <Dropdown
                        tag="categories"
                        options={[
                            'waterQuality',
                            'bioQuality',
                            'waterQuality',
                            'bioQuality',
                        ]}
                    />
                </div>
                <ExampleChart />
            </div>
        </div>
    );
};

export default Charts;
