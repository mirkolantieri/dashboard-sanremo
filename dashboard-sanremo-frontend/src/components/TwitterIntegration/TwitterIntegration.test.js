import React from 'react';
import { Router } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';

import TwitterIntegration from './TwitterIntegration.js'

const history = createMemoryHistory();
const route = '/2021';
history.push(route);

describe("<TwitterIntegration />", () => {
  it("Renders <TwitterIntegration /> correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <TwitterIntegration />
      </Router>
    );
    
    expect(wrapper.type()).toEqual(Router);
    expect(wrapper.find('h4')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(5);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.text()).toContain("Feed Twitter del Festival di Sanremo");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
