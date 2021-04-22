import {
  CButton
} from '@coreui/react'

const Actions = ({isPending}) => {
    return ( 
        <div className="form-actions">
            { !isPending && <CButton type="submit" color="primary">Save changes</CButton> }
            { isPending && <CButton color="primary" disabled>Saving</CButton> }
            <CButton color="secondary">Cancel</CButton>
        </div>
     );
}
 
export default Actions;