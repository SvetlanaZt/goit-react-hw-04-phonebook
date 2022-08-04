import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid'
import css from './form.module.css'


const useLocalStorage = (key, value) => {
    const [state, setState] = useState(() => {
        return JSON.parse(window.localStorage.getItem(key)) ?? value;
    })
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state]);

    return [state, setState]
}


export default function Form({ onClick }){
    const [name, setName] = useLocalStorage('name', '');
    const [number, setNumber] = useLocalStorage('number', '');

    const onSuubmit = evt => {
        evt.preventDefault();
        onClick({ name, number });
         reset()
    }
    const reset = () => {
        setName('');
        setNumber('');
    }
    
    const onChange = evt => {
        const { name, value } = evt.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            
             case 'number':
                setNumber(value);
                break;
        default: return;
       }
       
    }

    const idName = nanoid();
    const idNumber = nanoid();
    return (
      <form onSubmit={onSuubmit}>
          <label className={css.label}>
      Name <input className={css.input}
        type="text"
            name="name"
            id={idName}
        value={name}
        onChange={onChange}
  pattern= "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
            /> </label>
          <label className={css.label}>Number 
            <input className={css.input}
   onChange={onChange}
  type="tel"
  name="number"
  id={idNumber}
   value={number}
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
/></label>
      <button type='submit'>Add Contact</button>
      </form>
    )
}
