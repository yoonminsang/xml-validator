// TODO: Add tests that you find necessary.

const { isValidXML } = require('../src');

describe('advanced validator test', () => {
  it('should return false for an xml with not start <', () => {
    expect(isValidXML('abc<a></a>')).toBeFalsy();
  });

  it('should return true for an xml with start space', () => {
    expect(isValidXML(' <a></a>')).toBeTruthy();
  });

  it('should return true for an xml with end space', () => {
    expect(isValidXML('<a></a> ')).toBeTruthy();
  });

  it('should return true for an xml with space', () => {
    expect(isValidXML('  <a></a>  ')).toBeTruthy();
  });

  it('should return false for an xml with tag name is empty', () => {
    expect(isValidXML('</>')).toBeFalsy();
  });

  it('should return false for an xml with wrong tag', () => {
    expect(isValidXML('</a/>')).toBeFalsy();
  });
});
