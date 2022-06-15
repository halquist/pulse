import './PulseStore.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LoadingIcon } from '../Logo';
import TitleBar from '../TitleBar';
import StoreImage from './StoreImage';

const PulseStore = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState([]);
  const searchArr = ['animals', 'cats', 'dogs', 'robots', 'spaceships', 'planets', 'pyramids', 'mythical creatures', 'greek gods', 'aliens']
  const [searchTerm, setSearchTerm] = useState(searchArr[Math.floor(Math.random() * 10)])

  // requests images from the pixabay api with given search terms
  const getImages = (searchTerm) => {
    const apiKey = '23316360-930d50abb4e2b8eeab0661c2f';
    const editSearchTerm = searchTerm.split(' ').join('+');

    // const requestUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=vector&per_page=16`;
    axios
      .get(
        `https://pixabay.com/api/?key=${apiKey}&q=${editSearchTerm}&image_type=vector+illustration&per_page=16`
      )
      .then((res) => setImages(res.data.hits))
      .then(setLoaded(true))
      .catch((err) => console.log(err))
  };

  useEffect(() => {
    getImages(searchTerm)
  },[])

  if (!loaded || !images) {
    return (
        <LoadingIcon />
    )
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getImages(searchTerm);
  }

  return (
    <div className='storeDisplayDiv'>
      <TitleBar title='Store' />
      <div id='searchForm'>
        <form onSubmit={handleSubmit}>
        <label htmlFor='search'>Search Profile Images</label>
          <input
            id='searchInput'
            name='search'
            type='text'
            maxLength="90"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          >
          </input>
          <button type='submit' className='pinkButton'>Search</button> :
        </form>
      </div>
      {images.map((image) => {
        return (
          <StoreImage image={image} key={image.id}/>
        )
      })}
    </div>
  )
};

export default PulseStore;
