import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

import { setLocale } from '@arcgis/core/intl';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type AppState = {
    language?: string;
    webmapId?: string;
    sidePanelContent?: string;
    filterTimeActive?: boolean;
    filterSpaceActive?: boolean;
    category?: string;

    filterTimeStart?: Date;
    filterTimeEnd?: Date;

    filterSpace?: Array<any>;
    filterSpaceDrawing?: boolean;

    isLoggedIn?: boolean;
    logInAttempt?: boolean;
    usernameEsri?: string;

    settingsContent?: string;
    settingsOpen?: boolean;
};

export const initialAppState: AppState = {
    language: 'en',
    webmapId: '67372ff42cd145319639a99152b15bc3',
    sidePanelContent: 'analyze',
    filterTimeActive: true,
    filterSpaceActive: true,
    category: 'waterQuality',

    filterTimeStart: null,
    filterTimeEnd: null,

    filterSpace: [],
    filterSpaceDrawing: false,

    isLoggedIn: false,
    logInAttempt: false,
    usernameEsri: 'login',

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
        setFilterTimeStart: (state, action: PayloadAction<Date>) => {
            state.filterTimeStart = action.payload;
        },
        setFilterTimeEnd: (state, action: PayloadAction<Date>) => {
            state.filterTimeEnd = action.payload;
        },
        addFilterSpace: (state, action: PayloadAction<any>) => {
            state.filterSpace.push(action.payload);
        },
        setFilterSpace: (state, action: PayloadAction<Array<any>>) => {
            state.filterSpace = action.payload;
        },
        setFilterSpaceDrawing: (state, action: PayloadAction<boolean>) => {
            state.filterSpaceDrawing = action.payload;
        },
        setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setLogInAttempt: (state, action: PayloadAction<boolean>) => {
            state.logInAttempt = action.payload;
        },
        setUsernameEsri: (state, action: PayloadAction<string>) => {
            state.usernameEsri = action.payload;
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
    setFilterTimeStart,
    setFilterTimeEnd,
    addFilterSpace,
    setFilterSpace,
    setFilterSpaceDrawing,
    setIsLoggedIn,
    setLogInAttempt,
    setUsernameEsri,
    setSettingsContent,
    toggleSettingsOpen,
} = slice.actions;

export default reducer;
