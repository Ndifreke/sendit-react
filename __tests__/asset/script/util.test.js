import {
  validateEmail,
  validateMobile,
  validatePassword,
  validateName,
  style
} from '@script/util';

describe('utility functons', () => {
  it('should validate email', () => {
    expect(validateEmail('ndifrekebademail')).toBe(false);
    expect(validateEmail('email@domain.com')).toBe(true);
  });
  it('should validate mobile', () => {
    expect(validateMobile('9808888283')).toBe(false);
    expect(validateMobile('12345678909')).toBe(true);
  });
  it('should validate Name input', () => {
    expect(validateName('my name')).toBe(false);
    expect(validateName('my&')).toBe(false);
    expect(validateName('Mathew')).toBe(true);
  });
  it('should validate password input', () => {
    expect(validatePassword('my name')).toBe(false);
    expect(validatePassword('my&')).toBe(false);
    expect(validatePassword('Mathew')).toBe(true);
  });

  it('return valid semantic ui styles', () => {
    expect(style(true).field).toBe("field")
    expect(style(false).field).toBe("field error")
    expect(style(true).display).toBe('');
    expect(style(false).display).toBe('hide');
    expect(style(false).button).toBe('ui orange disabled fluid button aligned center');
    expect(style(true).button).toBe('ui orange fluid button aligned center');
    expect(style(false).display).toBe('hide');
  });
});
