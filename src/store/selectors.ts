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

export const selectCategory = createSelector(
    (state: RootState) => state.App.category,
    (category) => category
);

export const selectFilterSpaceActive = createSelector(
    (state: RootState) => state.App.filterSpaceActive,
    (filterSpaceActive) => filterSpaceActive
);

export const selectFilterTime = createSelector(
    (state: RootState) => state.App.filterTime,
    (filterTime) => filterTime
);
export const selectFilterTimeStart = createSelector(
    (state: RootState) => state.App.filterTimeStart,
    (filterTimeStart) => filterTimeStart
);

export const selectFilterTimeEnd = createSelector(
    (state: RootState) => state.App.filterTimeEnd,
    (filterTimeStart) => filterTimeStart
);

export const selectFilterSpace = createSelector(
    (state: RootState) => state.App.filterSpace,
    (filterSpace) => filterSpace
);

export const selectFilterSpaceDrawing = createSelector(
    (state: RootState) => state.App.filterSpaceDrawing,
    (filterSpaceDrawing) => filterSpaceDrawing
);

export const selectFilterSpaceDrawingType = createSelector(
    (state: RootState) => state.App.filterSpaceDrawingType,
    (filterSpaceDrawingType) => filterSpaceDrawingType
);
export const selectFeatures = createSelector(
    (state: RootState) => state.App.features,
    (features) => features
);

export const selectAttribute = createSelector(
    (state: RootState) => state.App.attribute,
    (attribute) => attribute
);

export const selectHoverFeatures = createSelector(
    (state: RootState) => state.App.hoverFeatures,
    (hoverFeatures) => hoverFeatures
);

export const selectDownloadButtonClicked = createSelector(
    (state: RootState) => state.App.downloadButtonClicked,
    (downloadButtonClicked) => downloadButtonClicked
);
export const selectLoginClicked = createSelector(
    (state: RootState) => state.App.loginClicked,
    (loginClicked) => loginClicked
);
export const selectIsLoggedIn = createSelector(
    (state: RootState) => state.App.isLoggedIn,
    (isLoggedIn) => isLoggedIn
);

export const selectLogInAttempt = createSelector(
    (state: RootState) => state.App.logInAttempt,
    (logInAttempt) => logInAttempt
);

export const selectUserInfos = createSelector(
    (state: RootState) => state.App.userInfos,
    (userInfos) => userInfos
);

export const selectSettingsContent = createSelector(
    (state: RootState) => state.App.settingsContent,
    (settingsContent) => settingsContent
);

export const selectSettingsOpen = createSelector(
    (state: RootState) => state.App.settingsOpen,
    (settingsOpen) => settingsOpen
);

export const selectCookiesSet = createSelector(
    (state: RootState) => state.App.cookiesSet,
    (cookiesSet) => cookiesSet
);

export const selectCookiesAllowed = createSelector(
    (state: RootState) => state.App.cookiesAllowed,
    (cookiesAllowed) => cookiesAllowed
);
