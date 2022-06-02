export default function List({contacts}) {
    return (
        <div>  
            <ul>
            {contacts.map(contact => (
                <li key={contact.id}>
                    Name: <span>{contact.full_name}</span>
                    Phone: <span>{contact.tel}</span>
                </li>   
            ))}
            </ul>
        </div>
    )
}