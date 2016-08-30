import Styles from './style.css'
import { map, filter, compose, addIndex, head, merge } from 'ramda'
import { Input, Posts } from '../../components'
import { mapIndex, noUndefined } from '../../helpers/utils'
import Actions from '../../actions'

const selectPage = (value, key, pageID) => { if (value.name === pageID) return merge({ pageIndex: key }, value) }
const input = ([ title, value ], pageIndex) => <Input key={title} action={Actions.setContentField} {...{ title, value, pageIndex }} />
const post = (posts, pageIndex) => <Posts {...{ posts, pageIndex }}/>

const getInputs = compose(map(input), Object.entries)
const getPosts = compose(post)
const getPage = compose(head, filter(noUndefined), mapIndex(selectPage))

export default ({
  api: { cmsData: { pages }},
  params: { pageID }
}) => {
  const { pageIndex, hidden, content, posts } = getPage(pages, pageID)
  return (
    <main className={Styles.container}>
      { getInputs(content, pageIndex) }
      { getPosts(posts, pageIndex) }
    </main>
  )
}
