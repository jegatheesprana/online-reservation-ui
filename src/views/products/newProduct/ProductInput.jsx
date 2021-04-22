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

const ProductInput = ({inputField, id, handleInputChange, handleAddField, handleRemoveField, handleStatusChange}) => {
    return ( 
        <CRow>
            <CCol xs="12" sm="2">
                <CLabel>Title</CLabel>
                <CInput
                    placeholder="Flavor"
                    value={inputField.title||''}
                    name="title"
                    onChange={e => handleInputChange(e, id)}
                    />
            </CCol>
            <CCol xs="12" sm="2">
                <CLabel>Weight/ Volume</CLabel>
                <CInput
                    placeholder="180g"
                    value={inputField.weight||''}
                    name="weight"
                    onChange={e => handleInputChange(e, id)}
                    required
                    />
            </CCol>
            <CCol xs="12" sm="1">
                <CLabel>UPC</CLabel>
                <CInput
                    title="Unit Per Case"
                    placeholder="10"
                    value={inputField.upc||'0'}
                    name="upc"
                    onChange={e => handleInputChange(e, id)}
                    />
            </CCol>
            <CCol xs="12" sm="2">
                <CLabel htmlFor="vat">MRP</CLabel>
                <CInput
                    id="vat" 
                    placeholder="200.00" 
                    value={inputField.mrp||''}
                    name="mrp"
                    onChange={e => handleInputChange(e, id)}
                />
            </CCol>
            <CCol xs="12" sm="1">
                <CLabel htmlFor="vat">Pur Price</CLabel>
                <CInput
                    id="vat" 
                    placeholder="200.00" 
                    value={inputField.p_price||''}
                    name="p_price"
                    onChange={e => handleInputChange(e, id)}
                />
            </CCol>
            <CCol xs="12" sm="1">
                <CLabel htmlFor="vat">Sel Price</CLabel>
                <CInput
                    id="vat" 
                    placeholder="200.00" 
                    value={inputField.s_price||''}
                    name="s_price"
                    onChange={e => handleInputChange(e, id)}
                />
            </CCol>
            <CCol xs="12" sm="1">
                <CLabel htmlFor="active">Status</CLabel>
                <div>
                    <CSwitch
                        name="status"
                        value={inputField.status||true}
                        onChange={e => handleStatusChange(e, id)}
                        id="active"
                        className="mr-1"
                        color="dark"
                        shape="pill"
                        variant="opposite"
                        defaultChecked
                    />
                </div>
            </CCol>
            <CCol xs="12" sm="2">
                <div className="align-middle" style={{height: '100%'}}>
                <CButton style={{height: '100%'}}>
                    <CIcon content={freeSet.cilMinus} onClick={e=>handleRemoveField(id)} />
                </CButton>
                <CButton style={{height: '100%'}}>
                    <CIcon content={freeSet.cilPlus} onClick={e=>handleAddField(id)} />
                </CButton>
                </div>
            </CCol>
        </CRow>
     );
}
 
export default ProductInput;