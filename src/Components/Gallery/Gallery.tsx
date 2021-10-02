import * as React from 'react';
import {useTypedSelector} from "../../store";
import {IPhoto} from "../../store/photosReducer";
import PhotosList from "../PhotosList/PhotosList";

const Gallery = () => {
    const photos = useTypedSelector(state => state.photos.photos)

    return (
        <PhotosList photos={photos}/>
    );
};

export default Gallery;