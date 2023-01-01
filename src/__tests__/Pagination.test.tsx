import React from 'react'
import { mount } from 'enzyme'
import Pagination, { PageButton, NavigationButton, EmptyPageButton } from '../Pagination'

describe('NavigationButton', () => {
  it('should render without crashing', () => {
    const onClick = () => {}
    mount(<NavigationButton directionIcon="prev" onClick={onClick} />)
  })
})
