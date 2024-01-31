/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useDispatch, useSelector } from 'react-redux';

import React, { FC } from 'react';
import { getTranslation } from '../services/languageHelper';
import { setFilterTimeActive, setFilterSpaceActive } from '@store/reducer';
import {
    selectFilterTimeActive,
    selectFilterSpaceActive,
} from '@store/selectors';

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
                    filterTimeActive ? 'bg-activeBlue' : 'bg-backgroundgray'
                }`}
                onClick={() => dispatch(setFilterTimeActive())}
            >
                <div id="filterTimeTitle">
                    {getTranslation('filterTimeTitle')}
                </div>
            </div>
            <div
                id="filterSpace"
                className={`rounded-xl w-full flex-grow p-[5px] my-[2.5px] ${
                    filterSpaceActive ? 'bg-activeBlue' : 'bg-backgroundgray'
                }`}
                onClick={() => dispatch(setFilterSpaceActive())}
            >
                <div id="filterSpaceTitle">
                    {getTranslation('filterSpaceTitle')}
                </div>
            </div>
            <div
                id="filterChart"
                className="rounded-xl w-full flex-grow-[4] p-[5px] my-[2.5px] bg-backgroundgray"
            >
                <div id="filterTopicTitle">
                    {getTranslation('filterTopicTitle')}
                </div>
            </div>
        </div>
    );
};

export default Charts;
