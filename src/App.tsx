import { FilterBar, Loading, MapView, MyLocationBtn, NoLocation } from './components';
import { useUserLocation } from './hooks';

const App = () => {

  const { existLocation, loading } = useUserLocation()

  if (loading) return <Loading/>

  if (!existLocation) return <NoLocation/>

  return (
    <>
      <MapView />
      <MyLocationBtn />
      <FilterBar/>
    </>
  )
}
export default App