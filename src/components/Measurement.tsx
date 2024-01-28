/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useDispatch } from 'react-redux';

import React, { FC } from 'react';
import { getTranslation } from '../services/languageHelper';

type MeasurementProps = {
    title?: string;
};
const Measurement: FC<MeasurementProps & React.ComponentProps<'div'>> = ({
    title = 'Default',
}) => {
    const dispatch = useDispatch();
    title = getTranslation(title);

    // UI part
    return (
        <div
            id="measurement"
            className="flex flex-col flex-none justify-between z-30 w-full  h-full bg-white p-[5px]"
        ></div>
    );
};

export default Measurement;
