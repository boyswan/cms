import Styles from './style.css'
import { Link } from 'react-router'
import { map } from 'ramda'

const addPage = () => Action.addPage()
const page = ({ name }) => <li key={name}><Link to={`/${name}`}>{name}</Link></li>

const getPages = map(page)

export default ({ pages }) =>
  <nav className={Styles.nav}>
    <ul>
      <li><Link to={`/`}>Home</Link></li>
      { getPages(pages) }
      <li onClick={addPage}>+ add page</li>
    </ul>
  </nav>
