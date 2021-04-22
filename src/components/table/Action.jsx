import { NavLink } from "react-router-dom";

import { CIcon } from '@coreui/icons-react'

const Action = ({item, editRoute, removeRow}) => {
    const path = editRoute(item)
    return ( 
        <>
            <NavLink style={{color: 'unset'}} to={path}><CIcon name="cil-pencil" /></NavLink>
            <CIcon style={{cursor: 'pointer'}} name="cil-trash" onClick={()=>removeRow(item)} />
        </>
     );
}
 
export default Action;