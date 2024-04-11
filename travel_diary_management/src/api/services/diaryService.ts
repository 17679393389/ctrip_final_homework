import apiClient from '../apiClient';

export interface DiaryReq {
    id: string;
    checked_status: string;
    photo: string;
    title: string;
    content: string;
    create_by: string;
    checked_by: string;
    checked_at: string;
    checked_opinion: string;
    is_deleted: number;
    label?:string;
    update_time?: string;
}

export interface DiaryList {
    page: number;
    pageSize: number;
    category:string;
    user_id:number;
}

export interface DiarySearchList {
    page: number;
    pageSize: number;
    keyword: string;
    title?: string;
    content?: string;
    create_by?: string;
    user_id:number;

}

export enum DairyApi {
    getAll = '/diary/getDiariesList',
    search = '/diary/searchDiaries',
    update = '/diary/updateDiaryStatus',
    delete = '/diary/delete',
    getDiaryByStatus = '/diary/getDiaryByStatus',
    getDeleted = '/diary/getDeletedDiaries',
    searchDeleted = '/diary/searchDeletedDiaries',
    getDiaryById = '/diary/:id',
    getTotalDiary = '/diary/getTotalDiary',
    getToBeCheckedDiary = '/diary/getToBeCheckedDiary',
    getDiaryVerify = "/diary/getDiaryVerify"
}

interface StatusReq{
    page: number;
    pageSize: number;
    status: string;
    recycle?: number;
}



export const getAllDiary = (data: DiaryList) => apiClient.get({ url: `${DairyApi.getAll}?page=${data.page}&pageSize=${data.pageSize}&category=${data.category}&user_id=${data.user_id}`});
export const getDiaryById = (id: string) => apiClient.get<DiaryReq>({ url: `${DairyApi.getDiaryById}/${id}`});
export const searchDiary = (data: DiarySearchList) => apiClient.get({ url: `${DairyApi.search}?page=${data.page}&pageSize=${data.pageSize}&keyword=${data.keyword}&user_id=${data.user_id}`});
export const updateDiary = (data: DiaryReq[]) => apiClient.post({ url: DairyApi.update, data });
export const getDiaryByStatus = (status:StatusReq) => apiClient.get({ url: `${DairyApi.getDiaryByStatus}?status=${status.status}&page=${status.page}&pageSize=${status.pageSize}&recycle=${status.recycle}`});
export const getDeletedDiary = (data: DiaryList) => apiClient.get({ url: `${DairyApi.getDeleted}?page=${data.page}&pageSize=${data.pageSize}`});
export const searchDeletedDiary = (data: DiarySearchList) => apiClient.get({ url: `${DairyApi.searchDeleted}?page=${data.page}&pageSize=${data.pageSize}&keyword=${data.keyword}`});
export const getTotalDiary = () => apiClient.get({url: DairyApi.getTotalDiary});
export const getToBeCheckedDiary = () => apiClient.get({url: DairyApi.getToBeCheckedDiary});
export const getDiaryVerify = () => apiClient.get({ url: `${DairyApi.getDiaryVerify}`});
