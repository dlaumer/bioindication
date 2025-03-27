/*
--------------
Button.tsx
--------------

Functionality for most of the basic buttons like disable, active, hover, etc.

*/

import React, { FC, useEffect, useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import { useSelector } from 'react-redux';

type ButtonProps = {
    title?: string;
    titleKey?: string;
    isDisabled?: boolean;
    isActive?: boolean;
    activeType?: string;
    hoverTitle?: string;
    hoverStyle?: React.CSSProperties;
    icon?: any;
    isVisible?: boolean;
    tooltip?: string;
};
const Button: FC<ButtonProps & React.ComponentProps<'button'>> = ({
    title = 'Default',
    titleKey,
    isDisabled,
    isActive = false,
    activeType = 'background',
    hoverTitle = title,
    icon = null,
    isVisible = true,
    tooltip = "",
    ...props
}) => {
    const [isHover, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    title = titleKey != null ? getTranslation(titleKey) : title;
    tooltip = tooltip != null ? getTranslation(tooltip) : tooltip;

    hoverTitle = title;

    let content: any = isHover ? hoverTitle : title;

    if (icon != null) {
        content = (
            <div className="h-full flex items-center">
                <img src={icon} className="h-[20px] px-[5px]"></img>
                <div>{isHover ? hoverTitle : title}</div>
            </div>
        );
    }

    return (
        <button
            title={tooltip}
            className={`bg-white hover:bg-hovergrey h-full transition-opacity font-noigrotesk p-2  w-fit text-lg font-medium text-neutral-600 whitespace-nowrap ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }
            ${activeType == 'side'
                    ? 'border-l-8 !h-fit !w-full text-start'
                    : 'rounded-xl'
                }


            ${isActive && activeType == 'background' ? '!bg-activecolor' : ''}
            ${isActive && activeType == 'side'
                    ? 'border-projectcolor'
                    : 'border-white'
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
    );
};
export default Button;
