/*
--------------
Header.tsx
--------------

UI for the Header, different buttons, dropdowns and titles

*/
import { useSelector, useDispatch } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';

import { getTranslation } from '@services/languageHelper';
import close from './../constants/x_black.svg';
import { selectCookiesSet } from '@store/selectors';
import { setCookiesAllowed, setCookiesSet } from '@store/reducer';

const CookieInfo: FC<React.ComponentProps<'div'>> = () => {
    const dispatch = useDispatch();

    const cookiesSet = useSelector(selectCookiesSet);

    const [cookieInfoOpen, setCookieInfoOpen] = useState(true);
    const cookieInfo = getTranslation('cookieInfo');

    // UI part
    return (
        <div
            id={'cookieInfo'}
            className={`${
                cookiesSet ? 'hidden' : ''
            } absolute top-0 w-full bg-black bg-opacity-50 h-full z-[100]`}
        >
            <div className="absolute left-[calc(50%-175px)] top-[calc(50%-175px)] h-[350px] w-[350px] bg-backgroundgray p-3 overflow-auto pointer-events-auto">
                <div className="flex flex-col justify-around w-full h-[90%] py-3">
                    <div>{cookieInfo}</div>
                    <div className="flex justify-around">
                        <button
                            className="w-[40%] bg-projectcolor top-2 right-2"
                            onClick={() => {
                                dispatch(setCookiesAllowed(true));
                            }}
                        >
                            {getTranslation('yes')}
                        </button>
                        <button
                            className="w-[40%] bg-projectcolor project top-2 right-2"
                            onClick={() => {
                                dispatch(setCookiesAllowed(false));
                                document.cookie =
                                    'lang=null; expires=Fri, 31 Dec 9999 23:59:59 GMT';
                                dispatch(setCookiesSet(true));
                            }}
                        >
                            {getTranslation('no')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieInfo;
