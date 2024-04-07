/*
--------------
Dropdown.tsx
--------------

Functionality for most of a basic dropdown from scratch like the opening and closing of the dropdown and adding the differnt options with hover/active/etc.

*/
import React, { useState } from 'react';
import { getTranslation } from '../services/languageHelper';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setLanguage } from '../store/reducer';
import { selectCategory, selectLanguage } from '@store/selectors';
import icon from './../constants/menu.svg';

type DropdownProps = {
    tag: string;
    isDisabled?: boolean;
};
type Options = {
    [key: string]: string[];
};

const Dropdown: React.FC<DropdownProps> = ({ tag, isDisabled }) => {
    const language = useSelector(selectLanguage);
    const category = useSelector(selectCategory);

    const options: Options = {
        category1: ['bioQuality', 'waterQuality', 'waterToBio'],
        category2: ['waterToOxygen', 'waterToNitrate'],
        category3: ['bioToOxygen', 'bioToNitrate'],
        category4: ['oxygenToTemp'],
    };

    const [isExpanded, setIsExpanded] = useState(false);
    // ToDo: Secure in case the language in the url is not existant, check if language is in options!
    let selectedOpt = null;
    if (tag == 'categories') {
        selectedOpt = category;
    }

    const [selectedOption, setSelectedOption] = useState(selectedOpt);

    const dispatch = useDispatch();

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const title = getTranslation(selectedOption);

    const categoriesElements: any[] = [];
    for (const category of Object.keys(options)) {
        const categoryLabel = getTranslation(category);

        const optionsElements: any[] = [];
        for (const option of options[category]) {
            const optionLabel = getTranslation(option);
            optionsElements.push(
                <div
                    className="flex font-bold hover:text-projectgreen cursor-pointer"
                    key={option}
                    onClick={() => {
                        if (tag == 'categories') {
                            dispatch(setCategory(option));
                        }
                        setSelectedOption(option);
                        setIsExpanded(!isExpanded);
                    }}
                >
                    {optionLabel}
                </div>
            );
        }
        categoriesElements.push(
            <div className="pt-2">
                <div className="text-evendarkergrey">{categoryLabel}</div>
                {optionsElements}
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
                <div className="h-full flex items-center">
                    <img src={icon} className="h-[80%] px-[5px]"></img>
                </div>
            </button>
            {isExpanded && (
                <div>
                    <div className="absolute w-[27vw] h-[40vh] overflow-y-scroll overflow-x-hidden bg-white flex shadow-lg flex-col px-4 rounded-xl py-2 rounded-sm top-[50px] right-[5px] border border-black/40 z-[200]">
                        {categoriesElements}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
