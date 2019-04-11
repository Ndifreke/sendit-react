import Input from '@common/Input';
let wrapper;
let value = '';

const onChangeHandler = (event) => {
  value = event.target.value;
};

beforeEach(() => {
  wrapper = shallow(<Input onChange={onChangeHandler} />);
});

describe('Input', () => {
  it('should set input value on onchange callback', () => {
    const arg = 5;
    const input = wrapper.find('input').first();
    input.simulate('change', global.customEvent(arg));
    wrapper.update();
    expect(value).toBe(arg);
  });

  it('should clear input fields', () => {
    const arg = '';
    const input = wrapper.find('input').first();
    input.simulate('change', global.customEvent(arg));
    wrapper.update();
    expect(value).toBe(arg);
  });

  describe('Controlled Input', () => {
    const placeholder = 'enter text';
    const type = 'text';
    const inputValue = 19;
    beforeEach(() => {
      wrapper.unmount();
      wrapper = shallow(
        <Input
          onChange={onChangeHandler}
          value={inputValue}
          type={type}
          placeholder={placeholder}
        />
      );
    });

    it('should render input with argument props value', () => {
      const input = wrapper.find('input').props().value;
      expect(input).toBe(inputValue);
    });

    it('should render input with appropriate input placeholder', () => {
      const input = wrapper.find('input');
      expect(input.props().placeholder).toBe(placeholder);
    });

    it('should render input with appropriate input type', () => {
      const input = wrapper.find('input');
      expect(input.props().type).toBe(type);
    });
  });
});
