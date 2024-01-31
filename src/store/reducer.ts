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
    filterSpace?: string;
};

export const initialAppState: AppState = {
    language: 'en',
    webmapId: '67372ff42cd145319639a99152b15bc3',
    sidePanelContent: 'charts',
    filterTimeActive: false,
    filterSpaceActive: false,
    category: 'waterQuality',

    filterTimeStart: null,
    filterTimeEnd: null,
    filterSpace: null,
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
        setFilterSpace: (state, action: PayloadAction<string>) => {
            state.filterSpace = action.payload;
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
    setFilterTimeStart,
    setFilterTimeEnd,
    setFilterSpace,
} = slice.actions;

export default reducer;
