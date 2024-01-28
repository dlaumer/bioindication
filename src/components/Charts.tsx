/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useDispatch } from 'react-redux';

import React, { FC } from 'react';
import { getTranslation } from '../services/languageHelper';

type ChartsProps = {
    title?: string;
};
const Charts: FC<ChartsProps & React.ComponentProps<'div'>> = ({
    title = 'Default',
}) => {
    title = getTranslation(title);

    // UI part
    return (
        <div
            id="charts"
            className="flex flex-col flex-none justify-between z-30 w-full  h-full bg-white p-[5px]"
        >
            <div id="filterTime" className="w-full h-[20%] bg-backgroundgray">
                <div id="filterTimeTitle">
                    {getTranslation('filterTimeTitle')}
                </div>
            </div>
            <div id="filterSpace" className="w-full h-[10%] bg-backgroundgray">
                <div id="filterSpaceTitle">
                    {getTranslation('filterSpaceTitle')}
                </div>
            </div>
            <div id="filterChart" className="w-full h-[60%] bg-backgroundgray">
                <div id="filterTopicTitle">
                    {getTranslation('filterTopicTitle')}
                </div>
            </div>
        </div>
    );
};

export default Charts;
