import httpMocks from 'node-mocks-http';
import { faker } from '@faker-js/faker';
import { validate } from '../validator.js';
import * as validator from 'express-validator';

jest.mock('express-validator');

describe('Validator Middleware', () => {
  it('calls next if there are no validation errors', async () => {
    // given
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();

    validator.validationResult = jest.fn(() => {
      return { isEmpty: () => true };
    });

    // when
    await validate(request, response, next);

    // then
    expect(response.statusCode).toBe(200);
    expect(next).toHaveBeenCalled();
  });

  it('returns 400 if there are validation errors', async () => {
    // given
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();
    const errorMsg = faker.random.word(3);
    validator.validationResult = jest.fn(() => {
      return { isEmpty: () => false, array: () => [{ msg: errorMsg }] };
    });

    // when
    await validate(request, response, next);

    // then
    expect(response.statusCode).toBe(400);
    expect(next).not.toBeCalled();
    expect(response._getJSONData().message).toBe(errorMsg);
  });
});
