import React from 'react';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';

import SideBar from './SideBar';
Enzyme.configure({ adapter: new Adapter() });

describe("<SideBar />", () => {
  it("Renders <SideBar /> correctly", () => {
    const wrapper = mount(<SideBar />);
    expect(wrapper.type()).toEqual(SideBar);
    expect(wrapper.text()).toContain("Anno");
    expect(wrapper.text()).toContain("Twitter");
    expect(wrapper.text()).toContain("YouTube");
    expect(wrapper.find('nav')).toHaveLength(1);
    expect(wrapper.find('li')).toHaveLength(1);
    expect(wrapper.find('hr')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(10);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
