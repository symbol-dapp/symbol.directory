export default {
    storeProject(state: any, project: any) {
        state.basicInfo = project.basicInfo;
        state.mosaicInfo = project.mosaicInfo;
        state.socialMedia = project.socialMedia;
    }
}