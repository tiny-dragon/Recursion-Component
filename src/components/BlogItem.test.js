import React from 'react';
import renderer from 'react-test-renderer';
import BlogItem from './BlogItem';

describe('BlogItem', () => {
  let component = null;

  it('renders correctly', () => {
    component = renderer.create(<BlogItem />);
  });

  it('matches snapshot', () => {
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});