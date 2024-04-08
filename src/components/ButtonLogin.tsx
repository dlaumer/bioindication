/*
--------------
Button.tsx
--------------

Functionality for most of the basic buttons like disable, active, hover, etc.

*/

import React, { FC, useEffect, useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectIsLoggedIn,
    selectLoginClicked,
    selectUserInfos,
} from '@store/selectors';
import { setLogInAttempt } from '@store/reducer';

type ButtonProps = {
    title?: string;
    titleKey?: string;
    isDisabled?: boolean;
    isActive?: boolean;
    hoverTitle?: string;
    hoverStyle?: React.CSSProperties;
    icon?: any;
    isVisible?: boolean;
    username?: string;
};
const Button: FC<ButtonProps & React.ComponentProps<'button'>> = ({
    title = 'Default',
    titleKey,
    isDisabled,
    isActive = false,
    hoverTitle = title,
    icon = null,
    isVisible = true,
    username = '',
    ...props
}) => {
    const dispatch = useDispatch();

    const loginClicked = useSelector(selectLoginClicked);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const userInfo = useSelector(selectUserInfos);

    const [isHover, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    useEffect(() => {
        if (loginClicked) {
            if (!isLoggedIn) {
                dispatch(setLogInAttempt(true));
            }
        }
    }, [loginClicked]);

    if (username != '') {
        titleKey = username[0];
    }
    title = titleKey != null ? getTranslation(titleKey) : title;

    hoverTitle = title;

    let content: any = isHover ? hoverTitle : title;

    if (icon != null) {
        content = (
            <div className="h-full flex items-center">
                <img src={icon} className="h-[80%] px-[5px]"></img>
                <div>{isHover ? hoverTitle : title}</div>
            </div>
        );
    }

    return (
        <div>
            <button
                className={`!bg-projectgreen text-white h-full rounded-xl transition-opacity ease-in-out duration-200 font-noigrotesk p-2 h-fit w-fit text-lg font-medium text-neutral-600 whitespace-nowrap ${
                    isDisabled
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                }
        ${
            username != ''
                ? '!w-[56px] !h-[56px] !border-[8px] !border-whiteTransparent !border-solid !rounded-full !font-bold '
                : ''
        }
        ${
            isActive
                ? 'bg-headergreen shadow-sm text-black'
                : 'bg-white hover:bg-backgroundgray'
        }
        ${isVisible ? '' : 'hidden'}
        `}
                onMouseEnter={handleHover}
                onMouseLeave={handleMouseLeave}
                disabled={isDisabled}
                {...props}
            >
                {content}
            </button>
            <div
                className={`absolute  ${
                    loginClicked && isLoggedIn ? '' : 'hidden'
                } drop-shadow-xl rounded-lg top-[65px] right-[5px] w-[250px] h-[150px] bg-white`}
            >
                <div className="font-bold h-1/4 w-full flex items-center justify-start p-2">
                    {getTranslation('account')}
                </div>
                <div className="h-1/2 w-full flex items-center">
                    <button
                        className={`!bg-projectgreen text-white cursor-default h-full rounded-xl transition-opacity ease-in-out duration-200 font-noigrotesk p-2 h-fit w-fit text-lg font-medium text-neutral-600 whitespace-nowrap
        ${
            username != ''
                ? '!w-[56px] !h-[56px] !border-[8px] !border-whiteTransparent !border-solid !rounded-full !font-bold '
                : ''
        }
        ${isActive ? 'bg-headergreen shadow-sm text-black' : 'bg-white'}
        ${isVisible ? '' : 'hidden'}
        `}
                        disabled={isDisabled}
                        {...props}
                    >
                        {content}
                    </button>
                    <div>
                        <div>{userInfo.fullName}</div>
                        <div>{userInfo.email}</div>
                    </div>
                </div>

                <button
                    id="test"
                    className=" h-1/4 w-full font-noigrotesk w-full whitespace-nowrap hover:bg-backgroundgray"
                    onClick={() => {
                        dispatch(setLogInAttempt(true));
                    }}
                >
                    {getTranslation('logout')}
                </button>
            </div>
        </div>
    );
};
export default Button;
