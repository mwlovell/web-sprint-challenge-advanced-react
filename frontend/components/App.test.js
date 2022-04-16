// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})
import server from '../../backend/mock-server';
import React from 'react';
import AppClass from './AppClass';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

jest.setTimeout(1000); 
const waitForOptions = { timeout: 100 };
const queryOptions = { exact: false };

let up, down, left, right, reset, submit;
let squares, coordinates, steps, message, email;

const updateStatelessSelectors = (document) => {
    up = document.querySelector('#up');
    down = document.querySelector('#down');
    left = document.querySelector('#left');
    right = document.querySelector('#right');
    reset = document.querySelector('#reset');
    submit = document.querySelector('#submit');
};

const updateStatefulSelectors = (document) => {
    squares = document.querySelectorAll('.square');
    coordinates = document.querySelector('#coordinates');
    steps = document.querySelector('#steps');
    message = document.querySelector('#message');
    email = document.querySelector('#email');
};

describe(`AppClass`, () => {
    beforeAll(() => {
        server.listen();
    });
    afterAll(() => {
        server.close();
    });
    beforeEach(() => {
        render(<AppClass />);
        updateStatelessSelectors(document);
        updateStatefulSelectors(document);
    });
    afterEach(() => {
        server.resetHandlers();
        document.body.innerHTML = '';
    });

    describe(`There is some text rendered on the screen`, () => {
        test(`Steps div should not be empty`,() => {
          fireEvent.change(email, {target: 'test@test.com'})
           screen.findByText('test@test.com', queryOptions, waitForOptions );
        });
      });
      describe(`Submit button text is visible`, () => {
        test(`The submit button should contain the text Submit`, () => {
          screen.getByRole('button', {name: 'Submit'})
            expect(submit).toHaveLength
        });
        test(`The reset button should not be capitalized`, () => {
          screen.getByRole('button', {name: 'reset'})
            expect(reset.textContent).toBe('reset');
        });
        test(`The left button should be in all caps`, () => {
          screen.getByRole('button', {name: 'LEFT'})
            expect(left.textContent).toBe('LEFT');
        });
        test(`The right button should be in all caps`, () => {
          screen.getByRole('button', {name: 'RIGHT'})
          expect(right.textContent).toBe('RIGHT');
        });
    });
});
