import './App.css';
import { useEffect, useState } from 'react';

const App = () => {
  // state to hold carousel data
  const [carouselDataState, setCarouselDataState] = useState({});
  // state to hold the current carousel panel index
  const [currentPanelState, setCurrentPanelState] = useState(0);
  // state to hold all the data (people's names and avatars (images) from two pages )
  const [listOfPeople, setListOfPeople] = useState([]);

  // it may be possible to combine all states - and replace multiple useState variables with useReducer

  let people = []

  useEffect(() => {
    const loadCarouselData = async () => {
      // loads carousel data and uses it to set the carouselState
      // The data is a list of objects that have first_name, last_name, and avatar (image)
      const baseUrl = 'https://reqres.in/api/users?page='
      let page = 1
      
      do { 
        try {
          console.log("fetching carousel data")
          const response = await fetch(`${baseUrl}${page}`)
          const body = await response.json()
          people.push.apply(people, body.data)
          setListOfPeople(people)
          page++ 
        }
        catch(error) {
          console.log("error")
        }
      } while (page <= 2)
    }

    setCarouselDataState(listOfPeople)

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

    // update the current list of people from both pages
    setListOfPeople()
  }, [currentPanelState]) 
  
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
