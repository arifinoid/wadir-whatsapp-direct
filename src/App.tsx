import { ChakraProvider } from '@chakra-ui/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '@fontsource/poppins'

import MainScreen from './screens/Main.screen'
import FavoriteScreen from './screens/Favorite.screen'
import NotFoundScreen from './screens/Notfound.screen'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainScreen />,
    errorElement: <NotFoundScreen />,
  },
  {
    path: '/favorite',
    element: <FavoriteScreen />,
    errorElement: <NotFoundScreen />,
  },
])

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  )
}

export default App
