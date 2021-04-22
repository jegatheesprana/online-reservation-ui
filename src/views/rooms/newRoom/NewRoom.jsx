import { useState, useEffect } from 'react'
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

import Form from '../../../components/container/form/Form'

import useFetch from '../../../useFetch'

const NewRoom = ({match: {params: {id}}}) => {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState('standard');
  const [beds, setBeds] = useState(0);
  const [maxOccupancy, setMaxOccupancy] = useState(0);
  const [costPerNight, setCostPerNight] = useState(0);

  const types = [
    'standard',
    'villa',
    'penthouse',
    'studio'
];

  const history = useHistory();

  const handlers = {
    verify : () => {
      
      return true
    },
    formData: () => ({ title, number, type, beds, maxOccupancy, costPerNight }),
    afterSubmit: () => {
      console.log('success')
      history.push('/rooms')
    }
  }

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(process.env.REACT_APP_API_HOST + '/rooms/findOne/' + id, { signal: abortCont.signal })
        .then(res => {
            if (res.status !== 200 && res.status !== 304) {
                throw Error('could not fetch data')
            }
            return res.json()
        })
        .then(data => {
            if( data ) {
              //setTitle(data.title)
              //setCompany(data.company)
              data.items.forEach( item => {
                item._type= 'old'
              })
              //setInputFields(data.items)
            }
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch aborted');
            } else {
                // setIsLoading(false);
                // setError(err.message);
            }
        });
    return () => abortCont.abort();
  }, []);

  return (
    <Form title="New Room" action={id?"/rooms/updateRoom/"+id:"/rooms/newRoom"} handlers = { handlers } method={id?"PUT":"POST"} >
      <CRow>
        <CCol xs="12" sm="6">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="title">Room Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="title" name="text-input" placeholder="Title" value={title} onChange={ ({target: {value}}) => setTitle(value)} />
                    <CFormText>Title of room (optional)</CFormText>
                </CCol>
            </CFormGroup>
        </CCol>

        <CCol xs="12" sm="6">
          <CFormGroup row>
            <CCol md="3">
                <CLabel htmlFor="number">Number</CLabel>
            </CCol>
              <CCol xs="12" md="9">
                <CInput id="number" name="number" placeholder="Number" value={number} onChange={ ({target: {value}}) => setNumber(value)} required />
                <CFormText>Room Number</CFormText>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6">
          <CFormGroup row>
            <CCol md="3">
                <CLabel htmlFor="type">Type</CLabel>
            </CCol>
              <CCol xs="12" md="9">
                <CSelect
                  custom
                  value={type}
                  onChange={ ({target: {value}}) => setType(value)}
                  id="type"
                >
                  {types.map( (type, id) => (
                    <option value={type} key={id}>{type}</option>
                  ) )}
                </CSelect>
                <CFormText>Select the Type</CFormText>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol xs="12" sm="6">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="beds">No of Beds</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="beds" name="beds" placeholder="Numer" value={beds} onChange={ ({target: {value}}) => setBeds(value)} />
                    <CFormText>Number of beds on the room</CFormText>
                </CCol>
            </CFormGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs="12" sm="6">
          <CFormGroup row>
            <CCol md="3">
                <CLabel htmlFor="maxOccupancy">Max Occupancy</CLabel>
            </CCol>
            <CCol xs="12" md="9">
                <CInput id="maxOccupancy" name="maxOccupancy" placeholder="Numer" value={maxOccupancy} onChange={ ({target: {value}}) => setMaxOccupancy(value)} />
                <CFormText>Maximum number of persons</CFormText>
            </CCol>
          </CFormGroup>
        </CCol>
        <CCol xs="12" sm="6">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="costPerNight">Cost per a night</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="costPerNight" name="costPerNight" placeholder="Numer" value={costPerNight} onChange={ ({target: {value}}) => setCostPerNight(value)} />
                    <CFormText>Cost per a night</CFormText>
                </CCol>
            </CFormGroup>
        </CCol>
      </CRow>
    </Form>
  )
}

export default NewRoom