import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup,
    CInput,
    CLabel,
    CButton,
    CForm
  } from '@coreui/react'
import { useState } from 'react';

const NewCompany = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [num, setNum] = useState('');
    const [city, setCity] = useState('');
    const [postal, setPostal] = useState('');
    const [supplier, setSupplier] = useState('');
    const [rep, setRep] = useState('');
    const [repNum, setRepNum] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        setIsDisabled(true);
        const data = {name, address, num, city, postal, supplier, rep, repNum};
        fetch(process.env.REACT_APP_API_HOST+'/companies', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then( () => {
            console.log('success')
        }).catch( console.log)
    }

    return ( 
        <CCard>
            <CCardHeader>
              Company
              <small> Form</small>
            </CCardHeader>
            <CCardBody>
                <CForm encType="multipart/form-data" className="form-horizontal" onSubmit={handleSubmit}>
                    <CFormGroup>
                        <CLabel htmlFor="company">Company</CLabel>
                        <CInput id="company" placeholder="Enter company name" value={name} onChange={ ({target: {value}}) => setName(value)} required/>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel htmlFor="street">Office Address</CLabel>
                        <CInput placeholder="Enter address" value={address} onChange={ ({target: {value}}) => setAddress(value) } />
                    </CFormGroup>
                    <CFormGroup row className="my-0">
                        <CCol xs="4">
                            <CFormGroup>
                                <CLabel>Office Number</CLabel>
                                <CInput placeholder="Enter number" value={num} onChange={ ({target: {value}}) => setNum(value) } />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="4">
                            <CFormGroup>
                                <CLabel htmlFor="city">City</CLabel>
                                <CInput id="city" placeholder="Enter city" value={city} onChange={ ({target: {value}}) => setCity(value) } />
                            </CFormGroup>
                        </CCol>
                        <CCol xs="4">
                            <CFormGroup>
                                <CLabel htmlFor="postal-code">Postal Code</CLabel>
                                <CInput id="postal-code" placeholder="Postal Code" value={postal} onChange={ ({target: {value}}) => setPostal(value) } />
                            </CFormGroup>
                        </CCol>
                    </CFormGroup>
                    <CFormGroup>
                        <CLabel>Supplier</CLabel>
                        <CInput placeholder="Supplier name" value={supplier} onChange={ ({target: {value}}) => setSupplier(value) } />
                    </CFormGroup>
                    <CFormGroup row className="mb-2">
                        <CCol xs="8">
                            <CLabel>Rep Name</CLabel>
                            <CInput placeholder="Supplier name" value={rep} onChange={ ({target: {value}}) => setRep(value) } />
                        </CCol>
                        <CCol xs="4">
                            <CLabel>Rep phone num</CLabel>
                            <CInput placeholder="Supplier name" value={repNum} onChange={ ({target: {value}}) => setRepNum(value) } />
                        </CCol>
                    </CFormGroup>

                    <div className="form-actions">
                        <CButton className="mr-2" type="submit" color="info" disabled={isDisabled}>Save changes</CButton>
                        <CButton color="secondary">Cancel</CButton>
                    </div>
                </CForm>
            </CCardBody>
        </CCard>
     );
}
 
export default NewCompany;