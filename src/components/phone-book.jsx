import { useState,useEffect,useRef} from "react"
import { ContactList  } from "./person-list/Person-list"
import { nanoid } from 'nanoid'
import { Filter } from "./Filter"
import { Form } from "./Forma"
export const PhoneBook = () => {
    const [contacts, setContacts] = useState([]);
    const [filter, setFilter] = useState('');
    const firstRender = useRef(true);

    useEffect(() => {
        const contactsInLs = JSON.parse(localStorage.getItem("contacts"));
        if (contactsInLs) {
            setContacts(contactsInLs)
        }
    }, [])

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
            localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts])
    
    const hendelChangeInputFilter = (event) => {
        setFilter(event.currentTarget.value);
    }
    const formSubmit = ({name,number}) => {
        const arr=[...contacts]
        let objContact = {
            name: name,
            id: nanoid(),
            number:number
        }
        let foo = contacts.some(contact =>  contact.name.toLocaleLowerCase() === name.toLocaleLowerCase() );
        if (foo) {
            alert(`${name} is anlready in contacts npm run build`);
            return
        }
        arr.push(objContact);
        setContacts(arr);
    }
    const filterArr = ()=> {
        return contacts.filter(contact=>contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
    }
    const deleteContact = (id) => {
        return () => {
            const newArr=contacts.filter(contact => {
                if (contact.id !== id) {
                    return contact
                }
            })
            setContacts(newArr)
        }
    }
    
        return <div>
            <h1>Phonebook</h1>
            <Form onSubmit={formSubmit }/>
            
            <h2>Contacts</h2>
            <Filter value={filter} func={hendelChangeInputFilter} />
            <ContactList  persons={filterArr()} deleteContact={ deleteContact}/></div>
        
        
        
}
