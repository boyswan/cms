import Styles from './style.css'
import { Input, Posts } from 'cms/components'

export default ({ api, api: { cmsData: { pages = [] }}, params }) =>
  <main className={Styles.container}>
    {pages.map(({ name, content }, index) => name === params.page
      ? Object.entries(content).map(([ title, value ]) => title === 'posts'
        ? <Posts {...{ pages, name, index, title, value }}/>
        : <Input {...{ name, index, title, value }}/>)
      : false
    )}
  </main>
