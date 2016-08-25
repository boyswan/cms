import Style from './style.css'
import Actions from 'cms/actions'

export default ({
  src
}) =>
  <div className={Style.container}>
    <div onClick={() => Actions.toggleGallery()} className={Style.edit}></div>
    <img src={src} className={Style.item}/>
  </div>
