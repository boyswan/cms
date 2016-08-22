import Style from './style.css'
import Actions from 'cms/actions'
import cx from 'classnames'

export default ({
  cmsData,
  status
}) => {

  return (
    <div className={cx(Style.dim, { [Style.noDim]: !status })} onClick={() => Actions.closeForm()}>
      <div className={Style.container}> form </div>
    </div>
  )

}
