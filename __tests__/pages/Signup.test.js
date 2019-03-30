import Signup from '@pages/Signup';
let wrapper;

beforeEach(() => {
  wrapper = shallow(<Signup />);
});

describe('Signup page', () => {
  it('should not show email validation error when component mounts', () => {
    const { errorMessages, isEmail } = wrapper.state();
    expect(isEmail).toBe(true);
    expect(errorMessages.email).toBe(null);
  });

  it('should not show password validation error when component mounts', () => {
    const { errorMessages, isPassword } = wrapper.state();
    expect(isPassword).toBe(true);
    expect(errorMessages.password).toBe(null);
  });

  describe('Password field Interaction', () => {
    it('should show error if password is less than 3 characters', () => {
      const value = 'ab';
      const password = wrapper.find(`input[type='password']`).first();
      password.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isPassword } = wrapper.state();
      expect(isPassword).toBe(false);
      expect(errorMessages.password).toBe('Password length is not valid');
      expect(wrapper.state().password).toBe(value);
    });

    it('should clear password error if password is greater than 2 characters', () => {
      const value = 'abm';
      const password = wrapper.find(`input[type='password']`).first();
      password.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isPassword } = wrapper.state();
      expect(isPassword).toBe(true);
      expect(errorMessages.password).toBe(null);
      expect(wrapper.state().password).toBe(value);
    });

    it('should bring back error when password field is manually cleared ', () => {
      const value = '';
      const password = wrapper.find(`input[type='password']`).first();
      password.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isPassword } = wrapper.state();
      expect(isPassword).toBe(false);
      expect(errorMessages.password).toBe('Password length is not valid');
      expect(wrapper.state().password).toBe(value);
    });
  });

  describe('Email field Interaction', () => {
    it('should show error if email is invalid', () => {
      const value = 'myemail@person';
      const password = wrapper.find(`input[type='email']`).first();
      password.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(false);
      expect(errorMessages.email).toBe('Email should be in inform of user@domain.com');
      expect(wrapper.state().email).toBe(value);
    });

    it('should clear error on valid email', () => {
      const value = 'abm@gmail.com';
      const email = wrapper.find(`input[type='email']`).first();
      email.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(true);
      expect(errorMessages.email).toBe(null);
      expect(wrapper.state().email).toBe(value);
    });

    it('should bring back error when email field is manually cleared ', () => {
      const value = '';
      const email = wrapper.find(`input[type='email']`).first();
      email.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(false);
      expect(errorMessages.email).toBe('Email should be in inform of user@domain.com');
      expect(wrapper.state().email).toBe(value);
    });
  });

  describe('First name field Interaction', () => {
    it('should show error if email is invalid', () => {
      const value = 'myemail@person';
      const password = wrapper.find(`input[type='email']`).first();
      password.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(false);
      expect(errorMessages.email).toBe('Email should be in inform of user@domain.com');
      expect(wrapper.state().email).toBe(value);
    });

    it('should clear error on valid email', () => {
      const value = 'abm@gmail.com';
      const email = wrapper.find(`input[type='email']`).first();
      email.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(true);
      expect(errorMessages.email).toBe(null);
      expect(wrapper.state().email).toBe(value);
    });

    it('should bring back error when email field is manually cleared ', () => {
      const value = '';
      const email = wrapper.find(`input[type='email']`).first();
      email.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(false);
      expect(errorMessages.email).toBe('Email should be in inform of user@domain.com');
      expect(wrapper.state().email).toBe(value);
    });
  });

  describe('Surname field Interaction', () => {
    it('should show error if email is invalid', () => {
      const value = 'myemail@person';
      const password = wrapper.find(`input[type='email']`).first();
      password.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(false);
      expect(errorMessages.email).toBe('Email should be in inform of user@domain.com');
      expect(wrapper.state().email).toBe(value);
    });

    it('should clear error on valid email', () => {
      const value = 'abm@gmail.com';
      const email = wrapper.find(`input[type='email']`).first();
      email.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(true);
      expect(errorMessages.email).toBe(null);
      expect(wrapper.state().email).toBe(value);
    });

    it('should bring back error when email field is manually cleared ', () => {
      const value = '';
      const email = wrapper.find(`input[type='email']`).first();
      email.simulate('change', global.customEvent(value));
      wrapper.update();
      const { errorMessages, isEmail } = wrapper.state();
      expect(isEmail).toBe(false);
      expect(errorMessages.email).toBe('Email should be in inform of user@domain.com');
      expect(wrapper.state().email).toBe(value);
    });
  });
  /**
   * TODO : TEST LOADER
   */
});
