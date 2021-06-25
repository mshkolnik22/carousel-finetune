import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  // state to hold carousel data
  const [carouselDataState, setCarouselDataState] = useState({});
  // state to hold the current carousel panel index
  const [currentPanelState, setCurrentPanelState] = useState(0);

  useEffect(() => {
    const loadCarouselData = async () => {
      // loads carousel data and uses it to set the carouselState
      // The data is a list of objects that have first_name, last_name, and avatar (image)
      const baseUrl = 'https://reqres.in/api/users?page='
      let page = 1
      // let people = []
      
      //do { // trying Pagination with do while loop
      try {
        console.log("fetching carousel data")
        const response = await fetch(`${baseUrl}${page}`)
        const body = await response.json()

        // people.push.apply(people, body.data); 
        // page++ 
        
        setCarouselDataState(body.data)
      }
      catch(error) {
        console.log("error")
      }
    // } while (page <= 2) // hardcoded 2 to try Pagination
    }

    const setCurrentPanel = () => {
      // Figure out the next panel index to show. 
      // When reached the end, select the first one.
      // Because carousel data is being loaded asyncronously make sure it's there
      // before setting the current panel index.
      if (carouselDataState && carouselDataState.length > 0) {
        const next = (currentPanelState + 1) % carouselDataState.length;

        // schedule update to show the next panel in 3 seconds
        // once current panel state changes it'll trigger running UseEffect
        setTimeout(() => setCurrentPanelState(next), 3000)
      }
    }
 
    // load the data and use to set carouselData state
    loadCarouselData()

    // update the current carousel panel
    setCurrentPanel()
  }, 
  // make sure that useEffect gets fired again when the current panel index changes
  [ carouselDataState ]) 
  
  // carousel data is loaded asyncronously
  // so check whether the data has been loaded before generating JSX
  let carouselImage = null
  if (carouselDataState && carouselDataState.length > 0 ) {
    carouselImage = 
        <img src={carouselDataState[currentPanelState].avatar} 
                alt={carouselDataState[currentPanelState].first_name}></img>
  }

  return carouselImage
}


export default App;
