import './App.css';
import React, {useState} from 'react';
import axios from 'axios';
import { lightTheme, darkTheme, lightThemeInput, darkThemeInput } from './components/style';
import {SRLWrapper} from 'simple-react-lightbox';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './App.css';

function App() {
  const [image, setImage] = useState("")
  const [result, setResault] = useState([])
  const [theme, setTheme] = useState()

  const ACCESS_KEY="nKnKTDLfF-u8ty8Dvdqqkpg1TIYjQBxp91oG08Cel_k" //unsplash access key

  const getValue=(event)=>{
    setImage(event.target.value)
  }

  const getImages=()=>{
    const urlAPI="https://api.unsplash.com/search/photos?page=1&query="+image+"&client_id="+ACCESS_KEY;
    axios.get(urlAPI).then((response)=>{
      setResault(response.data.results)
      console.log(response)
    })
  }

  const changeTheme=(event)=>{
    const themeType=event.target.checked;
    setTheme(themeType)
  }
  return (
    <SRLWrapper>
      <div className="App" style={theme? darkTheme:lightTheme}>
        <div id="header">
          <h1 className="title">React Image Search App with unsplash API</h1>
          <form className="theme-form">
            <input type="checkbox" id="dark-mode" class="toggle" role="switch" value="theme" onChange={changeTheme}/> 
            <label for="dark-mode" class="sr">Dark Mode</label>
            <div class="curtain"></div>
          </form>
          <div className="form">
            <input  style={theme? darkThemeInput:lightThemeInput} type="text" class="search-input" name="image" placeholder="Search images..." onChange={getValue}/>
            <button type="submit" class="search-btn" onClick={getImages}>Search</button>
          </div>
        </div>
        <div id="content">
          

          <div className="result"> {/* NATIJA CARD KO'RINISHIDA CHIQADI */}
            {result.map((image, id) => (
              <div className="card" key={image.id}>
                <a>
                  {/*RASM LAZY LOAD HOLATIDA CHIQISHI */}
                  <LazyLoadImage
                    className="resultImage"
                    src={image.urls.full}
                    effect="blur"
                    delayTime="200"
                  />
                  {/*RASM MUALLIFI */}
                  <p className="username">Photo by {image.user.name}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <div id="footer">
          <p className="footer">created by khasanDev</p>
        </div>
      </div>
    </SRLWrapper>
  );
}

export default App;
