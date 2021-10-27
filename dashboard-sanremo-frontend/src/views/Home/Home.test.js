import React from 'react';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';

import Home from './Home';
Enzyme.configure({ adapter: new Adapter() });

describe("<Home />", () => {
  it("Renders <Home /> correctly", () => {
    const wrapper = mount(<Home />);
    expect(wrapper.type()).toEqual(Home);
    expect(wrapper.text()).toContain("Benvenuto sulla Dashboard");
    expect(wrapper.text()).toContain("Festival di Sanremo");
    expect(wrapper.text()).toContain("Seleziona un anno per iniziare");
    expect(wrapper.find('div')).toHaveLength(16);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
