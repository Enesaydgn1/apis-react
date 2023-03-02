import {useState , useEffect} from "react"
// import getApis from './apis.json'
import Search from './components/Search'
import ApiItem from './components/ApiItem'
import Alert from "./components/Alert"

function App() {
  const [search ,setSearch] = useState('');
  const [apis,SetApis] = useState([]);
  const bookmarkItems = [4,8]
  useEffect(()=>{
    fetch('https://63ffe8979f84491029863dda.mockapi.io/apis')
    .then(res => res.json())
    .then(data => {
      SetApis(data.map(api => {
        if(bookmarkItems.includes(api.id)){
          api.bookmark = true;
        }
        return api;
      }));
    })
  },[])

  const bookmarks = apis.filter(api => api.bookmark == true);

  const fiteredApis = apis.filter((api) => 
  api.name.toLowerCase().includes(search.toLowerCase()));

  const toggleBookmark = (id) =>{
    SetApis(
      apis.map((api)=>{
        if(api.id == id) {
          api.bookmark = !api.bookmark;
        }
        return api;
      }) 
    )
  }

    return (
    <div className="App">
        <h3>A collective list of free APIs for use in <br/>software and web 
        development.</h3>
      
    <Search search={search}  setSearch={setSearch} placeholder="Find development, games, images APIs"/>
      
      <div className="container">
        <h4>Featured APIs of this week </h4>
        <div className="api-list">
          
          {fiteredApis.map((api) =>(
            <ApiItem key={api.key} api={api} toggleBookmark={toggleBookmark}/>
     
          ))}

          {fiteredApis.length == 0 && <Alert message="API not found."/>}
         

        </div>
      </div>

      <div  className="container">
      <h4>Your Bookmarks</h4>
          <div className="api-list">
            {bookmarks
              .map((api) =>(
                <ApiItem toggleBookmark={toggleBookmark} key={api.key} api={api}/>
        
              ))}
              {bookmarks.length == 0 && (
                <Alert message="There is no item on your bookmarks"/>
              )}
          </div>
      </div>

    </div>
  );
}

export default App;
