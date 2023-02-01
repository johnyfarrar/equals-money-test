import { FC, useEffect, useMemo } from 'react';
import { Row, Col } from 'react-grid-system';
import { IContact } from '../types/contacts';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ContactForm.css';

type ContactFormProps = {
  contact: IContact;
  onSaveClick: (contact: IContact) => void;
  onDeleteClick: (id: string) => void;
};

export const ContactForm: FC<ContactFormProps> = ({
  contact,
  onSaveClick,
  onDeleteClick,
}) => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      ...contact,
      birthday:
        contact.birthday === '' ? undefined : new Date(contact.birthday),
    },
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    reset({
      ...contact,
      birthday:
        contact.birthday === '' ? undefined : new Date(contact.birthday),
    });
  }, [contact]);

  const onSubmit = (data: any) => {
    onSaveClick(data);
  };

  const onDelete = () => {
    onDeleteClick(contact.id);
  };

  return (
    <>
      <Row>
        <Col>
          <h1 className='title'>Edit Contact</h1>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col sm={4}>
            <label htmlFor='name' className='label'>
              Name:
            </label>
          </Col>

          <Col>
            <input placeholder='Name' {...register('name')} className='input' />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <label htmlFor='email' className='label'>
              Email:
            </label>
          </Col>

          <Col>
            <input
              placeholder='Email'
              {...register('email')}
              className='input'
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <label htmlFor='name' className='label'>
              Avatar:
            </label>
          </Col>

          <Col>
            <input
              placeholder='Avatar'
              {...register('avatar')}
              className='input'
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <label htmlFor='birthday' className='label'>
              Birthday:
            </label>
          </Col>

          <Col>
            <Controller
              control={control}
              name='birthday'
              render={({ field }) => (
                <DatePicker
                  placeholderText='Select date'
                  onChange={(e) => field.onChange(e)}
                  dateFormat='yyyy-MM-dd'
                  selected={field.value}
                  className='input'
                />
              )}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={4}>
            <label htmlFor='phone' className='label'>
              Phone:
            </label>
          </Col>

          <Col>
            <input
              placeholder='Phone'
              {...register('phone')}
              className='input'
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <input className='save' type={'submit'} value='Save Contact' />
          </Col>
          <Col xs={6}>
            <button className='delete' onClick={onDelete}>
              Delete
            </button>
          </Col>
        </Row>
      </form>
    </>
  );
};
