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

import ProductInput from './ProductInput'
import Form from '../../../components/container/form/Form'

import useFetch from '../../../useFetch'

const NewProduct = ({match: {params: {id}}}) => {
  const defaultVarient = { title: '', weight: '', upc: 0, mrp: '', p_price:0, s_price:0, status: true, _type:'new'}

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('')
  const [inputFields, setInputFields] = useState([ defaultVarient ])
  const [deletedItems, setDeletedItems] = useState([])

  const { data: companies } = useFetch('/companies')

  const history = useHistory();

  const handleInputChange = (e, id) => {
    const values = [...inputFields];
    values[id][e.target.name] = e.target.value;
    setInputFields(values)
  }

  const handleAddField = (id) => {
    setInputFields([...inputFields, defaultVarient])
  }

  const handleRemoveField = (id) => {
    if(inputFields[id]._type==='old')setDeletedItems([...deletedItems, inputFields[id]._id])
    setInputFields(inputFields.filter( (item, _id) => id!==_id))
    if(inputFields.length===0){
      setInputFields(defaultVarient)
    }
  }

  const handleStatusChange = (e, id) => {
    const values = [...inputFields];
    values[id].status = e.target.checked;
    setInputFields(values)
  }

  const handlers = {
    verify : () => {
      if (inputFields.filter(item => item.weight!=='' ).length===0) {
        alert('Please add any products')
        return false
      }
      return true
    },
    formData: () => ({title, company, products: inputFields.filter(item => item.weight!=='' ), deletedItems}),
    afterSubmit: () => {
      console.log('success')
      history.push('/products')
    }
  }

  useEffect(() => {
    companies[0] && setCompany(companies[0]?._id);
  }, [companies])

  useEffect(() => {
    const abortCont = new AbortController();
    fetch(process.env.REACT_APP_API_HOST + '/products/findOne/' + id, { signal: abortCont.signal })
        .then(res => {
            if (res.status !== 200 && res.status !== 304) {
                throw Error('could not fetch data')
            }
            return res.json()
        })
        .then(data => {
            if( data ) {
              setTitle(data.title)
              setCompany(data.company)
              data.items.forEach( item => {
                item._type= 'old'
              })
              setInputFields(data.items)
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
    <Form title="New Product" action={id?"/products/"+id:"/products"} handlers = { handlers } method={id?"PUT":"POST"} >
      <CRow>
        <CCol xs="12" sm="6">
            <CFormGroup row>
                <CCol md="3">
                    <CLabel htmlFor="text-input">Product Title</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                    <CInput id="text-input" name="text-input" placeholder="Title" value={title} onChange={ ({target: {value}}) => setTitle(value)} required />
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
                <CSelect
                  custom
                  value={company}
                  onChange={ ({target: {value}}) => setCompany(value)}
                  id="company"
                >
                  {companies.map( (company, id) => (
                    <option value={company._id} key={id}>{company.name}</option>
                  ) )}
                </CSelect>
                <CFormText>This is a help text</CFormText>
            </CCol>
          </CFormGroup>
        </CCol>
      </CRow>
      <CFormGroup>
        {inputFields.map((inputField, id) => (
          <ProductInput
            key={id}
            inputField={inputField}
            id={id}
            handleInputChange={handleInputChange}
            handleAddField={handleAddField}
            handleRemoveField={handleRemoveField}
            handleStatusChange={handleStatusChange}
          />
        ))}
      </CFormGroup>
    </Form>
  )
}

export default NewProduct