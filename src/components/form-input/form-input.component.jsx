import './form-input.styles.scss';

const FormInput = ({ id, handleChange, label, ...otherProps }) => (
  <div className='group'>
    <input id={id} className='form-input' onChange={handleChange} {...otherProps} />
    {
      label ? 
      (<label htmlFor={id} className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
        {label}
      </label>)
      : null
    }
  </div>
);

export default FormInput;