import Form from './Form/form'
import { nanoid } from 'nanoid'
import { useState, useEffect} from 'react';
import Filter from './Filter/filter'
import Contacts from './Contacts/contacts'

let arrayContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' }];

const useLocalStorage = (key, value) => {
    const [state, setState] = useState(() => {
        return JSON.parse(window.localStorage.getItem(key)) ?? value;
    })
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state]);

    return [state, setState]
}

export function App() {
  const [contacts, setContacts] = useLocalStorage('', arrayContacts);
  const [filter, setFilter] = useState('');

  const takeData = (evt) => {
    const { name, number } = evt;
    console.log(name)
    console.log(number)

    const takeContactName = contacts.find(contact => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase())
    if (takeContactName) {
      alert(`${name} is already in contacts`)
      return
     }
      setContacts(prevState => [{id: nanoid(), name, number }, ...prevState])
  }

  const changeInput = (evt) => { 
    setFilter(evt.currentTarget.value)
  }

  const onDelete = id => {
    setContacts(prevState => prevState.filter(item => item.id !== id));
   };

const onChangeInput = contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div>
         <h1>Phonebook</h1>
      <Form onClick={takeData} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeInput} />
       <Contacts value={onChangeInput}  onDelete={onDelete}/>
      </div>
  );
};
