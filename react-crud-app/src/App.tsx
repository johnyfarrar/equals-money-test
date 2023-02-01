import './App.css';
import useAxios from './hooks/useAxios';
import { Container, Row, Col } from 'react-grid-system';
import { useEffect, useState } from 'react';
import { IContact } from './types/contacts';
import { ContactCard } from './components/ContactCard';
import { ContactForm } from './components/ContactForm';

function App() {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<IContact>();
  const [updatedContact, setUpdatedContact] = useState<IContact>();

  const {
    response: getContactsData,
    loading: getContactsLoading,
    error: getContactsError,
    sendData: getContacts,
  } = useAxios({
    method: 'GET',
    url: `/contacts`,
    headers: {
      accept: '*/*',
    },
  });

  const {
    response: setContactData,
    loading: setContactLoading,
    error: setContactsError,
    sendData: setContact,
  } = useAxios({
    method: 'PUT',
    url: `/contacts/${updatedContact?.id}`,
    headers: {
      accept: '*/*',
    },
    data: {
      name: updatedContact?.name,
      avatar: updatedContact?.avatar,
      email: updatedContact?.email,
      phone: updatedContact?.phone,
      birthday: updatedContact?.birthday,
    },
  });

  const { sendData: deleteContact } = useAxios({
    method: 'DELETE',
    url: `/contacts/${selectedContact?.id}`,
    headers: {
      accept: '*/*',
    },
  });

  useEffect(() => {
    getContacts();
  }, []);

  useEffect(() => {
    if (!getContactsData?.data) return;
    setContacts(getContactsData.data);
  }, [getContactsData]);

  const onRowClick = (id: string) => {
    const contact = contacts.find((contact) => contact.id === id);
    setSelectedContact(contact);
  };

  const onSave = (contact: IContact) => {
    setUpdatedContact(contact);
    setContact();
    getContacts();
  };

  const onDelete = (id: string) => {
    deleteContact();
    setSelectedContact(undefined);
    getContacts();
  };

  return (
    <>
      <div className='header'>
        <Container>
          <Row>
            <img />
          </Row>
        </Container>
      </div>
      <Container>
        <Row>
          <Col sm={12}>
            <h1 className='contacts_title'>Contacts</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            {contacts.map((contact, index) => (
              <ContactCard
                name={contact.name}
                id={contact.id}
                avatar={contact.avatar}
                key={index}
                index={index}
                onRowClick={onRowClick}
              />
            ))}
          </Col>
          <Col sm={12} md={6}>
            {selectedContact && (
              <ContactForm
                contact={selectedContact}
                onDeleteClick={onDelete}
                onSaveClick={onSave}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
