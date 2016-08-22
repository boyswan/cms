import Styles from './style.css'
import { Input, Gallery } from 'cms/components'


export default ({ api, api: { cmsData: { pages = [] }}, params }) =>
  <main className={Styles.container}>
    <ul>
      {pages.map(({ name, content }, index) => {
        if (name === params.page) {
          return Object.entries(content).map(([ title, value ]) => {
            switch(title) {
              case 'images': return <Gallery {...{ name, index, title, value }}/>
              case 'vidoes': return <Gallery {...{ name, index, title, value }}/>
              default: <Input {...{ name, index, title, value }}/>
            }
          })
        }
      })}
    </ul>
  </main>
