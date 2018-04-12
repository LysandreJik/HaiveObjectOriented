const gv = require('../../const/global');

export function showDashboard(){
    return{
        type:gv.reducers.focused.SWITCH_PAGE,
        page:gv.focusablePages.DASHBOARD
    }
}

export function showHaiveSelectionPage(){
    return{
        type:gv.reducers.focused.SWITCH_PAGE,
        page:gv.focusablePages.HAIVE_SELECT
    }
}

export function showAssetStore(){
    return{
        type:gv.reducers.focused.SWITCH_PAGE,
        page:gv.focusablePages.ASSET_STORE,
        subpage:gv.focusablePages.subpages.HAIVE_SELECT
    }
}

export function showContainerSelect(){
    return{
        type:gv.reducers.focused.SWITCH_PAGE,
        page:gv.focusablePages.ASSET_STORE,
        subpage:gv.focusablePages.subpages.CONTAINER_SELECT
    }
}