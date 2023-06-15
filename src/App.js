import MainPages from "pages"
import { DataProvider } from "GlobalState"
function App() {
 return (
  <div>
   <DataProvider>
    <MainPages />
   </DataProvider>
  </div>
 )
}

export default App
