import React from 'react';
import { Router } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';

import FinalRanking from './FinalRanking.js'
Enzyme.configure({ adapter: new Adapter() });

const history = createMemoryHistory();
const route = '/2021';
history.push(route);

describe("<FinalRanking />", () => {
  it("Renders <FinalRanking /> correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <FinalRanking />
      </Router>
    );
    expect(wrapper.type()).toEqual(Router);
    expect(wrapper.find('h5')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);
    expect(wrapper.find('svg')).toHaveLength(2);
    expect(wrapper.find('hr')).toHaveLength(1);
    expect(wrapper.text()).toContain("Classifica finale");
    expect(wrapper.html()).toMatchSnapshot();
  });
});
