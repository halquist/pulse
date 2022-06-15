import './PulseStore.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoadingIcon } from '../Logo';



const PulseStore = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState([]);

  const getImages = (e) => {
    const searchTerms = 'cartoon+dogs';
    const apiKey = '23316360-930d50abb4e2b8eeab0661c2f';
    const requestUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerms}&image_type=vector&per_page=16`;

    axios
      .get(
        `https://pixabay.com/api/?key=${apiKey}&q=${searchTerms}&image_type=vector+illustration&per_page=16`
      )
      .then((res) => setImages(res.data.hits))
      .then(setLoaded(true))
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    getImages()
  },[])

  if (!loaded || !images) {
    return (
        <LoadingIcon />
    )
  };

  return (
    <div className='storeDisplayDiv'>
      {images.map((image) => {
        return (
          <img src={image.largeImageURL} width="200" height="200" key={image.id}/>
        )
      })}
    </div>
  )
};

export default PulseStore;
