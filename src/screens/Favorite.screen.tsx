import { FC } from 'react'
import { FavoriteList } from '../components/FavoriteList.component'

import Layout from '../layouts/Main.layout'

const FavoriteScreen: FC = () => (
  <Layout>
    <FavoriteList />
  </Layout>
)

export default FavoriteScreen
