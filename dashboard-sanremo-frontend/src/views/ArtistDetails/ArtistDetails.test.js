import React from 'react';
import ArtistDetails from './ArtistDetails';
import * as enzyme from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Api from '../../api/api';
Enzyme.configure({ adapter: new Adapter() });
const api = new Api();

const location = { pathname: '/2021/artistDetails/Madame/8' };


describe("<ArtistDetails />", () => {
  it("Renders <ArtistDetails /> component correctly", () => {
    const wrapper = enzyme.shallow(<ArtistDetails location={ location } loading={true}/>);
    expect(wrapper.state('artist')).toBe("Madame");
    expect(wrapper.state('year')).toBe("2021");
    expect(wrapper.state('position')).toBe("8");
    expect(wrapper.state('loading')).toBe(true);
    expect(wrapper.state('description')).toBe("Errore durante il recupero dei dati relativa all'artista...");
    expect(wrapper.find('h3')).toHaveLength(0);
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(0);
    expect(wrapper.exists('Link')).toEqual(false);
    expect(wrapper.exists('Divider')).toEqual(false);
  });
});

describe("<Api />", () => {
  it("api call testing", () => {
  const fakeUser= [['autori', 'Voce', 'testo di Voce', 'short description', 'img']];
    jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  api.get()
    .then((response) => {
      expect(response).toEqual(fakeUser);
    })

  global.fetch.mockRestore();
  });
});