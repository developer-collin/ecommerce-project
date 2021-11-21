import * as S from './form-input.styles';

const FormInput = ({ id, handleChange, label, ...props }) => (
  <S.GroupContainer>
    <S.FormInputContainer id={id} onChange={handleChange} {...props} />
    {
      label ? (
        <S.FormInputLabel htmlFor={id} className={props.value.length ? 'shrink' : ''}>
          {label}
        </S.FormInputLabel>
      ) : null
    }
  </S.GroupContainer>
);

export default FormInput;