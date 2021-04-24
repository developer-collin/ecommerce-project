import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles';

const FormInput = ({ id, handleChange, label, ...props }) => (
  <GroupContainer>
    <FormInputContainer id={id} onChange={handleChange} {...props} />
    {
      label ? (
        <FormInputLabel htmlFor={id} className={props.value.length ? 'shrink' : ''}>
          {label}
        </FormInputLabel>
      ) : null
    }
  </GroupContainer>
);

export default FormInput;