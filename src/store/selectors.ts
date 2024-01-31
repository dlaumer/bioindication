import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './configureStore';

export const selectWebmapId = createSelector(
    (state: RootState) => state.App.webmapId,
    (webmapId) => webmapId
);

export const selectLanguage = createSelector(
    (state: RootState) => state.App.language,
    (language) => language
);

export const selectSidePanelContent = createSelector(
    (state: RootState) => state.App.sidePanelContent,
    (sidePanelContent) => sidePanelContent
);

export const selectFilterTimeActive = createSelector(
    (state: RootState) => state.App.filterTimeActive,
    (filterTimeActive) => filterTimeActive
);

export const selectFilterSpaceActive = createSelector(
    (state: RootState) => state.App.filterSpaceActive,
    (filterSpaceActive) => filterSpaceActive
);
