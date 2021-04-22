import { useState, useEffect } from 'react'

import {
    CDataTable
  } from '@coreui/react'
import Action from './Action'

const Table = ({items, fields, scopedSlots, editRoute, delURL}) => {
    const customFields =  [
                        { key: '#', label: '', _style: { width: '50px'}, filter: false },
                        ...fields,
                        { key: 'action',  _style: { width: '100px'}, filter: false}
                    ];
    const [statedItems, setStatedItems] = useState(items);

    const removeRow = (item) => {
        const delApiURL = delURL(item);
        fetch(process.env.REACT_APP_API_HOST + ( delApiURL.startsWith('/')?delApiURL:'/'+delApiURL ), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then( () => {
            setStatedItems(statedItems.filter(i=>i!==item))
        } )
        .catch( console.log )
    }

    useEffect(() => {
        setStatedItems(items)
    }, [items])

    return (
        <CDataTable
            items={statedItems}
            fields={customFields}
            columnFilter
            tableFilter
            footer
            itemsPerPageSelect
            hover
            sorter
            striped
            bordered
            size="md"
            itemsPerPage={10}
            pagination
            scopedSlots={{
                '#':
                    (i, id) => (
                        <td>
                        {id+1}
                        </td>
                    ),
                'action':
                (item) => (
                        <td>
                            <Action
                                item={item}
                                editRoute={editRoute}
                                delURL={delURL}
                                removeRow={removeRow}
                            />
                        </td>
                    ),
                ...scopedSlots
            }}
        />
    );
}
 
export default Table;