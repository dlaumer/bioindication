/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useDispatch } from 'react-redux';

import React, { FC } from 'react';
import { getTranslation } from '../services/languageHelper';

type PanelProcessProps = {
    title?: string;
    active?: boolean;
};
const PanelProcess: FC<PanelProcessProps & React.ComponentProps<'div'>> = ({
    title = 'Default',
    active = false,
}) => {
    const dispatch = useDispatch();
    //let title = getTranslation(titleId);

    // UI part
    return (
        <div
            id={title}
            className={`flex flex-col flex-none justify-between z-30 w-full  h-full bg-white p-[5px]`}
        ></div>
    );
};

export default PanelProcess;
