import apiClient from '../apiClient';


export enum DairyApi {
    getAll = '/diary/getDiariesList',
    search = '/diary/searchDiaries',
    update = '/diary/updateDiaryStatus',
    delete = '/diary/delete',
    getDiaryByStatus = '/diary/getDiaryByStatus',
    getDiaryById = '/diary/:id',
    getTotalDiary = '/diary/getTotalDiary',
    getToBeCheckedDiary = '/diary/getToBeCheckedDiary',
}

export const getTotalDiary = () => apiClient.get({url: DairyApi.getTotalDiary});
export const getToBeCheckedDiary = () => apiClient.get({url: DairyApi.getToBeCheckedDiary});
