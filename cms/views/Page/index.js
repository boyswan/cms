import Styles from './style.css'
import { map, filter, reduce } from 'ramda'
import { Input, Posts } from '../../components'
import Actions from '../../actions'



export default ({
  api: { cmsData: { pages }},
  params: { page }
}) => {

  const checkName = (value, key) => {
    if (value.name === page) {
      // console.log(key)
      // console.log(value)
      return value
    }
  }

  const pageData = pages.map((value, key) => {
    if (value.name === page) {
      return Object.assign({}, {pageIndex: key }, value)
    }
  }).filter(x => x !== undefined)[0]

  // console.log(pageData)

  const { pageIndex, hidden, content, posts } = pageData

  const currentContent = Object.entries(content).map(([ title, value ], index) =>
    <Input key={index} action={Actions.setField} {...{ pageIndex, title, value }}/>
  )

  return (
    <main className={Styles.container}>
      {currentContent}
      <Posts pageIndex={pageIndex} posts={posts}/>
    </main>
  )
}
