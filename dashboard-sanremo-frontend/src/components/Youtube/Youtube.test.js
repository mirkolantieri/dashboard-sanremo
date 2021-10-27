import React from 'react';
import { Router } from 'react-router-dom';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'history';

import Youtube from './Youtube'
Enzyme.configure({ adapter: new Adapter() });
// import Api from '../../api/api';

// const api = new Api();
const history = createMemoryHistory();
const route = '/2021';
history.push(route);

describe("<Youtube />", () => {
  it("Renders <Youtube /> correctly", () => {
    const wrapper = mount(
      <Router history={history}>
        <Youtube />
      </Router>
    );
    expect(wrapper.type()).toEqual(Router);
    expect(wrapper.find('h4')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(5);
    //expect(wrapper.find('iframe'))
    expect(wrapper.text()).toContain("Video inerenti al Festival di Sanremo");
  });
});