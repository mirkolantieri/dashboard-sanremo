import React from 'react';
import { Router } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';

import SanremoInfo from './SanremoInfo.js'
Enzyme.configure({ adapter: new Adapter() });

const history = createMemoryHistory();
const route = '/2021';
history.push(route);

describe("<SanremoInfo />", () => {
  it("Renders <SanremoInfo /> correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <SanremoInfo />
      </Router>
    );
    expect(wrapper.type()).toEqual(Router);
    expect(wrapper.find('h4')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(3);
    expect(wrapper.text()).toContain("Festival di Sanremo - anno");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
