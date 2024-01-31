/*
--------------
Dropdown.tsx
--------------

Functionality for most of a basic dropdown from scratch like the opening and closing of the dropdown and adding the differnt options with hover/active/etc.

*/
import React, { useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../store/reducer';
import { selectLanguage } from '@store/selectors';

type DropdownProps = {
    tag: string;
    options?: string[];
    isDisabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({ tag, options, isDisabled }) => {
    const language = useSelector(selectLanguage);

    const [isExpanded, setIsExpanded] = useState(false);
    // ToDo: Secure in case the language in the url is not existant, check if language is in options!
    const [selectedOption, setSelectedOption] = useState(language);

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

                        // Construct URLSearchParams object instance from current URL querystring.
                        const queryParams = new URLSearchParams(
                            window.location.search
                        );
                        // Set new or modify existing parameter value.
                        queryParams.set('lang', option);
                        // Replace current querystring with the new one.
                        history.replaceState(
                            null,
                            null,
                            '?' + queryParams.toString()
                        );
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
                className={`rounded-xl bg-white p-2 font-noigrotesk font-medium text-lg ${
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
