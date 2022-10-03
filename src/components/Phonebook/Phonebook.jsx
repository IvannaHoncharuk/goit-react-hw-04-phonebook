import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { Error, Label, FormBox } from './Phonebook.styled';


export const Phonebook = ({ handleNewContact }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    resetField,
  } = useForm({
    defaultValues: { name: '', number: '' },
  });

  const nameValue = watch('name');
  const numberValue = watch('number');


  const onFormSubmit = evt => {
    const newContact = {
      id: nanoid(),
      name: nameValue,
      number: numberValue,
    };

    handleNewContact(newContact);
    resetField('name');
    resetField('number');
  };

    return (
        <FormBox onSubmit={handleSubmit(onFormSubmit)} autoComplete="off">
          <Label>
            <span>Name</span>
            <input
              value={nameValue}
              type="text"
              {...register('name', {
                required: { value: true, message: 'This field is required' },
                pattern: {
                  value:
                    /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/g,
                  message:
                    "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan",
                },
              })}
            />
            {errors.name?.message && <Error>{errors.name?.message}</Error>}
          </Label>
          <Label>
            <span>Number</span>
            <input
              value={numberValue}
              type="tel"
              {...register('number', {
              required: { value: true, message: 'This field is required' },
              pattern: {
                value:
                  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g,
                message:
                  'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +',
              },
            })}
          />
          {errors.number?.message && <Error>{errors.number?.message}</Error>}
          </Label>
          <button type="submit">Add contact</button>
        </FormBox>
    );
}

Phonebook.propTypes = {
  handleNewContact: PropTypes.func.isRequired,
};