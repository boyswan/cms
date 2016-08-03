import Styles from './style.css'
import { TextEdit } from 'cms/components'


export default ({ api, api: { cmsData: { pages = [] }}, params }) =>
  <main className={Styles.container}>
    <ul>
      {pages.map(({ name, content }, index) => {
        if (name === params.page) {
          return Object.entries(content).map(([ title, value ]) =>
            <TextEdit {...{ name, index, title, value }}/>
          )
        }

      })}
    </ul>
  </main>
