const gv = require('../../const/global');

export function showDashboard(){
    return{
        type:"SWITCH_PAGE",
        page:gv.focusablePages.DASHBOARD
    }
}

export function showHaiveSelectionPage(){
    return{
        type:"SWITCH_PAGE",
        page:gv.focusablePages.HAIVE_SELECT
    }
}

export function showAssetStore(){
    return{
        type:"SWITCH_PAGE",
        page:gv.focusablePages.ASSET_STORE
    }
}

