import Styles from './style.css'
import { Input } from 'cms/components'
import Posts from 'cms/components/Posts/index_motion'
import Actions from '../../actions'

export default ({ api, api: { cmsData: { pages = [] }}, params }) =>
  <main className={Styles.container}>
    {pages.map(({ name, content }, index) => name === params.page
      ? Object.entries(content).map(([ title, value ]) => title === 'posts'
        ? <Posts {...{ pages, name, index, title, value }}/>
        : <Input action={Actions.setField} {...{ name, index, title, value }}/>)
      : false
    )}
  </main>
