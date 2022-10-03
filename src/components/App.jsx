import { useState } from "react";
import { Phonebook } from "./Phonebook/Phonebook";
import { GlobalStyle } from './GlobalStyle';
import { Section } from './Section/Section';
import { ContactsList } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { useLocalStorage } from '../hooks/useLocalStorage';


export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState(() => '');


   const handleNewContact = newContact => {
    if (!hasDuplicates(newContact.name)) {
      setContacts([...contacts, newContact]);
    } else {
      alert(`${newContact.name} is already in contacts.`);
    }
  };

   const hasDuplicates= duplicate => {
    return contacts.find(({ name }) => name === duplicate);
  }

    const getFilteredContacts = () => {
    const filterValue = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterValue)
    );
  };

  const onInputChange = evt => {
    setFilter(evt.target.value);
  };

  const deleteContact = contactIdToDelete => {
    setContacts(contacts.filter(({ id }) => id !== contactIdToDelete));
  };

    return (
      <>
        <GlobalStyle />
        <Section title="Phonebook">
          <Phonebook handleNewContact={handleNewContact} />
        </Section>
        <Section title="Contacts">
          <Filter onInputChange={onInputChange} />
          <ContactsList
            contacts={getFilteredContacts()}
            deleteContact={deleteContact}
          />
        </Section>
      </>
    );
};
