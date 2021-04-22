import { useState, useEffect } from 'react'

import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CDataTable,
    CRow,
    CButton,
    CCollapse,
    CFormText,
    CInput,
    CForm,
    CFormGroup,
    CLabel,
    CSwitch,
    CCardFooter,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import { DocsLink } from 'src/reusable'
  
  import Table from '../../../components/table/Table'
  import Container from '../../../components/container/Container'
  
  import useFetch from 'src/useFetch'
  
  const fields = ['from', 'to', 'name', 'nic', 'status']
  const pageMenus = [{ label: 'Add New Room', href: '#/rooms/new' }]
  
  const Reserves = ({match: {params: {id}}}) => {
    const { data: room } = useFetch('/rooms/findOne/'+id)

    const [accordion, setAccordion] = useState(false)
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [name, setName] = useState('');
    const [nic, setNic] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState(false);

    useEffect(()=>{
        console.log({room})
    }, [room])
  
    return (
      <>
        <Container title={ `Reserves of ${room[0]?.title}` } pageMenus={pageMenus}>
            <table className="table">
                <tr>
                    <td>Room</td><td>{room[0]?.title}</td>
                </tr>
                <tr>
                    <td>Room Number</td><td>{room[0]?.number}</td>
                </tr>
            </table>
            <hr />
            <h3>Reservations</h3>
            <CDataTable
                items={room[0]?.reserved}
                fields={fields}
                hover
                sorter
                striped
                bordered
                size="md"
                itemsPerPage={10}
                scopedSlots={{
                'status':
                    (item) => (
                    <td>
                        <CButton block variant="outline" color="info" href={"#/rooms/reserves/"+item._id}>Reserves</CButton>
                    </td>
                    )
                }}
            />
            
            <CCard className="mb-0">
                <CCardHeader id="headingOne">
                  <CButton 
                    block 
                    className="text-left m-0 p-0" 
                    onClick={() => setAccordion(!accordion)}
                  >
                    <h3 className="m-0 p-0">Reserve</h3>
                  </CButton>
                </CCardHeader>
                <CCollapse show={accordion}>
                  <CCardBody>
                    <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="from">From</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="date" id="from" name="from" placeholder="From date" value={from} onChange={ ({target: {value}}) => setFrom(value)} />
                                <CFormText className="help-block">Reseavation from</CFormText>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="to">To</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput type="date" id="to" name="to" placeholder="To date" value={to} onChange={ ({target: {value}}) => setTo(value)} />
                                <CFormText className="help-block">Reseavation to</CFormText>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="name">Name</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="name" name="name" placeholder="Name" value={name} onChange={ ({target: {value}}) => setName(value)} />
                                <CFormText>Name of the applier</CFormText>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="nic">NIC</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="nic" name="nic" placeholder="NIC" value={nic} onChange={ ({target: {value}}) => setNic(value)} />
                                <CFormText>Name of the applier</CFormText>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="phone">Phone number</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CInput id="phone" name="phone" placeholder="Number" value={phone} onChange={ ({target: {value}}) => setPhone(value)} />
                                <CFormText>Name of the applier</CFormText>
                            </CCol>
                        </CFormGroup>
                        <CFormGroup row>
                            <CCol md="3">
                                <CLabel htmlFor="status">Status</CLabel>
                            </CCol>
                            <CCol xs="12" md="9">
                                <CSwitch
                                    className="mr-1"
                                    color="success"
                                    defaultChecked
                                    variant="outline"
                                />
                                <CFormText>Approved or not</CFormText>
                            </CCol>
                        </CFormGroup>
                    </CForm>
                  </CCardBody>
                    <CCardFooter>
                        <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
                        <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
                    </CCardFooter>
                </CCollapse>
              </CCard>
            </Container>
      </>
    )
  }
  
  export default Reserves
  