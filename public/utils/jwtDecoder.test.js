import jwtDecoder from './jwtDecoder';

const VALID_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjI0OTAxODM1MTF9.V_4AGTAxhj_CDb6fFp1DVkRbz8ETWZt73b2UmlVckJo';
const EXPIRED_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJleHAiOjF9.WfFMCEy91hJvSOYgzj90FuV-Cn-YMFPh80en6HWkB7c';
const NO_EXPIRY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UifQ.xuEv8qrfXu424LZk8bVgr9MQJUIrp1rHcPyZw_KSsds';

describe('jwtDecoder', () => {
  it('should return null if the token is null', () => {
    expect(jwtDecoder(null)).toBe(null);
  });

  it('should return null if the token does not have an expiry date', () => {
    expect(jwtDecoder(NO_EXPIRY_TOKEN)).toBe(null);
  });

  it('should return null if the token is expired', () => {
    expect(jwtDecoder(EXPIRED_TOKEN)).toBe(null);
  });

  it('should return the decoded token if it is valid', () => {
    const expected = {
      exp: 2490183511,
      name: 'John Doe',
    };

    expect(jwtDecoder(VALID_TOKEN)).toEqual(expected);
  });
});
