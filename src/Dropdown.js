import React, { useEffect, useContext, useRef } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { ThemeContext } from './context/ThemeContext'
import Transition from './Transition'
import FocusLock from 'react-focus-lock'

function Dropdown({ children, onClose, isOpen, className, ...other }) {
  const {
    theme: { dropdown },
  } = useContext(ThemeContext)

  const baseStyle = dropdown.base

  function handleEsc(e) {
    if (e.key === 'Esc' || e.key === 'Escape') {
      onClose()
    }
  }

  const dropdownRef = useRef()
  function handleClickOutside(e) {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    document.addEventListener('keydown', handleEsc)
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen])

  const cls = classNames(baseStyle, className)

  return (
    <Transition
      show={isOpen}
      leave="transition ease-out duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div>
        <FocusLock returnFocus>
          <ul className={cls} ref={dropdownRef} aria-label="submenu" {...other}>
            {children}
          </ul>
        </FocusLock>
      </div>
    </Transition>
  )
}

Dropdown.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default Dropdown
