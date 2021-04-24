import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

import Actions from './Actions'

const Form = ({ title, children, action, handlers : {verify, formData, afterSubmit}, method='POST'}) => {

    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const verification = verify();
        if (verification){
            setIsPending(true);
            const data = formData();
            fetch(process.env.REACT_APP_API_HOST + action, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then( data => {
                setIsPending(false)
                afterSubmit(data)
            } )
            .catch( console.log )
        }
    }

    return ( 
        <CCard>
            <CCardHeader>
                { title }
                <div className="card-header-actions">
                    <CButton color="link" className="card-header-action btn-setting">
                        <CIcon name="cil-settings" />
                    </CButton>
                </div>
            </CCardHeader>
            <CCardBody>
                <CForm className="form-horizontal" encType="multipart/form-data" onSubmit={handleSubmit}>
                    { children }
                    <Actions isPending={isPending} />
                </CForm>
            </CCardBody>
            <CCardFooter >
                
            </CCardFooter>
        </CCard>
     );
}
 
export default Form;