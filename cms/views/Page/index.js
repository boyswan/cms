import Styles from './style.css'
import { Input } from 'cms/components'
import Posts from 'cms/components/Posts/index_motion'
import Actions from '../../actions'

export default ({
  api: { cmsData: { pages = [] }},
  params: { page }
}) =>
  <main className={Styles.container}>
    {
      pages.map(({ name, content }, pageIndex) => name === page
        ? Object.entries(content).map(([ title, value ]) => title === 'posts'
          ? <Posts {...{ pageIndex, title, value }}/>
          : <Input action={Actions.setField} {...{ pageIndex, title, value }}/>)
        : false
      )
    }
  </main>
