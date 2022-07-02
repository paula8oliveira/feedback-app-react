import PropTypes from 'prop-types'
import { isDisabled } from "@testing-library/user-event/dist/utils"

function Button({ children, version, type, isDesabled }) {
  return (
      <button type={type} disabled={isDesabled} className={`btn btn-${version}`}>{children}</button>
    
  )
}

Button.defaultProps = {
    version: 'primary',
    type: 'button',
    isDisabled: false,
}

Button.propTypes = {
    childre: PropTypes.node.isRequired,
    version: PropTypes.string,
    type: PropTypes.string,
    isDesabled: PropTypes.bool,
}

export default Button