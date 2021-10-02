import * as React from 'react';
import {useTypedSelector} from "../../store";
import PhotosList from "../PhotosList/PhotosList";

function Favorites() {
    const photos = useTypedSelector(state => state.photos.photos.filter(photo => photo.isFavorite))

    return (
        <PhotosList photos={photos}/>
    );
}

export default Favorites;