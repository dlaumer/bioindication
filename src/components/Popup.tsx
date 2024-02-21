/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useDispatch } from 'react-redux';

import React, { FC } from 'react';
import { getTranslation } from '../services/languageHelper';

type PopupProps = {
    data: any;
};
const Popup: FC<PopupProps & React.ComponentProps<'div'>> = ({
    data = null,
}) => {
    const title = getTranslation('bioQuality');
    if (Object.keys(data).length != 0) {
        // UI part
        return (
            <div
                id="bioQuality"
                className={`flex flex-col flex-none justify-between z-30 w-full  h-full bg-white p-[5px]`}
            >
                {title + ': ' + data.graphic.attributes['BioWaterQuality']}
            </div>
        );
    }
};

export default Popup;
