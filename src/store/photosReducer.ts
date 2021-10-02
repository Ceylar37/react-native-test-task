import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {call, put, takeEvery} from '@redux-saga/core/effects'

const APIKEY = '563492ad6f917000010000011c0e8e53b5824d29bf5444918c0c6caa'

const fetchPhotos = () => {
    debugger
    const data = fetch('https://api.pexels.com/v1/curated?page=2&per_page=50', {
        headers: {
            authorization: APIKEY
        }
    })
    debugger
    return data
}

const fetchPhotosFromApi = async () => {
    const response = await fetch('https://api.pexels.com/v1/curated?page=2&per_page=50', {
        headers: {
            authorization: APIKEY
        }
    })

    const data = await response.json()

    return data
}

export interface IPhoto {
    id: number,
    src: string,
    isFavorite: boolean
}

const photosSlice = createSlice({
    initialState: {
        photos: [] as IPhoto[],
        curPhoto: null as null | IPhoto
    },
    name: 'photos',
    reducers: {
        setPhotos: (state, action: PayloadAction<{ photos: IPhoto[] }>) => {
            state.photos = action.payload.photos
        },
        changeCurPhoto: (state, action: PayloadAction<{ photo: IPhoto }>) => {
            state.curPhoto = action.payload.photo
        },
        toggleIsFavourite: state => {
            const toggledPhoto = state.photos.find(photo => photo.id === state.curPhoto.id)
            toggledPhoto.isFavorite = !toggledPhoto.isFavorite
            state.curPhoto.isFavorite = !state.curPhoto.isFavorite
        },
        deletePhoto: state => {
            state.photos = state.photos.filter(photo => photo.id !== state.curPhoto.id)
            state.curPhoto = null
        },
        fetchUsers: state => {
        },

    }
})

export const photosReducer = photosSlice.reducer
export const photosActions = photosSlice.actions

function* fetchPhotosWorker() {
    const data: { photos: Array<{ id: number, src: { tiny: string } }> } = yield fetchPhotosFromApi()
    const photos: IPhoto[] = data.photos.map(photo => ({isFavorite: false, id: photo.id, src: photo.src.tiny}))
    yield put(photosActions.setPhotos({photos}))
}

export function* photosWatcher() {
    yield takeEvery("photos/fetchUsers", fetchPhotosWorker)
}