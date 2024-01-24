/*
--------------
Dropdown.tsx
--------------

Functionality for most of a basic dropdown from scratch like the opening and closing of the dropdown and adding the differnt options with hover/active/etc.

*/
import React, { useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import { useDispatch } from 'react-redux';
import { setLanguage } from '../store/reducer';
type DropdownProps = {
    tag: string;
    options?: string[];
    isDisabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({ tag, options, isDisabled }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const dispatch = useDispatch();

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const title = getTranslation(selectedOption);

    const optionsElements: any[] = [];
    for (const option of options) {
        const optionLabel = getTranslation(option);
        optionsElements.push(
            <div
                className="flex px-2 py-2 text-lg text-neutral-600 font-medium hover:text-blue-600 cursor-pointer font-noigrotesk"
                key={option}
                onClick={() => {
                    if (tag == 'language') {
                        dispatch(setLanguage(option));
                    }
                    setSelectedOption(option);
                    setIsExpanded(!isExpanded);
                }}
            >
                {optionLabel}
            </div>
        );
    }
    return (
        <div className="flex items-center relative px-1 py-1 h-fit w-fit">
            <button
                className={`font-noigrotesk font-medium text-lg ${
                    isDisabled
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer'
                }
                    ${
                        tag == 'workspace'
                            ? 'text-navyblue hover:text-hoverblue'
                            : 'text-neutral-600'
                    }`}
                onClick={handleToggle}
            >
                {title}
            </button>
            {isExpanded && (
                <div>
                    <div className="absolute bg-white flex shadow-lg flex-col px-2 py-2 z-30 rounded-sm top-[35px] left-[5px] border border-black/40 z-[200]">
                        {optionsElements}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
