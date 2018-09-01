import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { configure } from 'enzyme';
configure({ adapter: new Adapter() });
import { MemoryRouter } from 'react-router';
import outfits from '../../src/database/outfit_data.js';
import unwornItems from '../../src/database/unworn_data.js';

jest.doMock('../../src/client/components/ClosetBoard/Weather.jsx', () => {
  const Weather = () => <div />;
  return Weather;
});

const ComponentToTest = require('../../src/client/components/ClosetBoard/ClosetBoard.jsx').default;

describe('ClosetBoard', () => {
  let wrapper;
  beforeAll(() => {
    const initialState = {
      closetBoard: {
        weather: {},
        recentlyAddedOutfits: outfits,
        recommendedOutfit: outfits,
        unwornItems: unwornItems
      }
    };
    const mockStore = configureStore([]);
    let store = mockStore(initialState);
    wrapper = mount (
      <Provider store={store}>
        <MemoryRouter>
          <ComponentToTest />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders Weather component', () => {
    expect(wrapper.find('#weather').exists()).to.equal(true);
  });

  it('renders RecommendedOutfit component', () => {
    expect(wrapper.find('#recommendedOutfits').exists()).to.equal(true);
  });

  // it('renders RecentlyAddedOutfits component', () => {
  //   expect(wrapper.find('#recentlyAddedOutfits').exists()).to.equal(true);
  // });
  //
  // it('renders UnwornItems component', () => {
  //   expect(wrapper.find('#unwornItems').exists()).to.equal(true);
  // });
});
