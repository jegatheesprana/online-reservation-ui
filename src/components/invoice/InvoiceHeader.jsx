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
  CSwitch,
  CDataTable
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'

const InvoiceHeader = ({details, handleDetailsChange}) => {
    const [customer, setCustomer] = useState()
    return (
        <CCard>
            <CCardBody >
                <CRow>
                    <CCol xs="12" sm="6">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="customer">Customer</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="customer" name="customer" placeholder="Customer" value={details.customer} onChange={ handleDetailsChange } required />
                                <CFormText>This is a help text</CFormText>
                            </CCol>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" sm="6">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="date">Date</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="date" id="date" name="date" placeholder="date" value={ details.date } onChange={ handleDetailsChange } />
                            </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol xs="12" sm="6">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="text-input">Product Title</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="text-input" name="text-input" placeholder="Customer" value={customer} onChange={ ({target: {value}}) => setCustomer(value)} required />
                                <CFormText>This is a help text</CFormText>
                            </CCol>
                        </CFormGroup>
                    </CCol>

                    <CCol xs="12" sm="6">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="company">Company</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                
                                <CFormText>This is a help text</CFormText>
                            </CCol>
                        </CFormGroup>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
     );
}
 
export default InvoiceHeader;