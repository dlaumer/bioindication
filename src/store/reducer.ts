import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import { setLocale } from '@arcgis/core/intl';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type userInfos = {
    username?: string;
    fullName?: string;
    email?: string;
};

export type AppState = {
    language?: string;
    webmapId?: string;
    sidePanelContent?: string;
    filterTimeActive?: boolean;
    filterSpaceActive?: boolean;
    category?: string;

    filterTime?: string;
    filterTimeStart?: Date;
    filterTimeEnd?: Date;

    filterSpace?: any;
    filterSpaceDrawing?: boolean;

    features?: any;
    attribute?: string;
    hoverFeatures?: any;

    isLoggedIn?: boolean;
    logInAttempt?: boolean;
    userInfos?: userInfos;

    settingsContent?: string;
    settingsOpen?: boolean;
};

export const initialAppState: AppState = {
    language: 'en',
    webmapId: '67372ff42cd145319639a99152b15bc3',
    sidePanelContent: 'analyze',
    filterTimeActive: true,
    filterSpaceActive: true,
    category: 'bioQuality',

    filterTime: null,
    filterTimeStart: null,
    filterTimeEnd: null,

    filterSpace: null,
    filterSpaceDrawing: false,

    features: null,
    attribute: null,
    hoverFeatures: null,

    isLoggedIn: false,
    logInAttempt: false,
    userInfos: {},

    settingsContent: 'languages',
    settingsOpen: false,
};

const slice = createSlice({
    name: 'App',
    initialState: initialAppState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            setLocale(action.payload);
            state.language = action.payload;
        },
        setSidePanelContent: (state, action: PayloadAction<string>) => {
            state.sidePanelContent = action.payload;
        },
        webmapIdChanged: (state, action: PayloadAction<string>) => {
            state.webmapId = action.payload;
        },
        setFilterTimeActive: (state) => {
            state.filterTimeActive = !state.filterTimeActive;
        },
        setFilterSpaceActive: (state) => {
            state.filterSpaceActive = !state.filterSpaceActive;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setFilterTime: (state, action: PayloadAction<string>) => {
            state.filterTime = action.payload;
        },
        setFilterTimeStart: (state, action: PayloadAction<Date>) => {
            state.filterTimeStart = action.payload;
        },
        setFilterTimeEnd: (state, action: PayloadAction<Date>) => {
            state.filterTimeEnd = action.payload;
        },
        setFilterSpace: (state, action: PayloadAction<any>) => {
            state.filterSpace = action.payload;
        },
        setFilterSpaceDrawing: (state, action: PayloadAction<boolean>) => {
            state.filterSpaceDrawing = action.payload;
        },
        setFeatures: (state, action: PayloadAction<any>) => {
            state.features = action.payload;
        },
        setAttribute: (state, action: PayloadAction<string>) => {
            state.attribute = action.payload;
        },
        setHoverFeatures: (state, action: PayloadAction<any>) => {
            state.hoverFeatures = action.payload;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setLogInAttempt: (state, action: PayloadAction<boolean>) => {
            state.logInAttempt = action.payload;
        },
        setUserInfos: (state, action: PayloadAction<userInfos>) => {
            state.userInfos = action.payload;
        },
        setSettingsContent: (state, action: PayloadAction<string>) => {
            state.settingsContent = action.payload;
        },
        toggleSettingsOpen: (state) => {
            state.settingsOpen = !state.settingsOpen;
        },
    },
});

const { reducer } = slice;

export const {
    webmapIdChanged,
    setSidePanelContent,
    setLanguage,
    setFilterTimeActive,
    setFilterSpaceActive,
    setCategory,
    setFilterTime,
    setFilterTimeStart,
    setFilterTimeEnd,
    setFilterSpace,
    setFilterSpaceDrawing,
    setFeatures,
    setAttribute,
    setHoverFeatures,
    setIsLoggedIn,
    setLogInAttempt,
    setUserInfos,
    setSettingsContent,
    toggleSettingsOpen,
} = slice.actions;

export default reducer;
