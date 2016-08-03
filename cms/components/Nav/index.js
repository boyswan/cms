import Styles from './style.css'
import { Link } from 'react-router'

export default ({ pages }) =>
  <nav className={Styles.nav}>
    <ul>
      <li><Link to={`/`}>Home</Link></li>
      {pages.map(({ name }) => <li key={name}><Link to={`/${name}`}>{name}</Link></li>)}
    </ul>
  </nav>
