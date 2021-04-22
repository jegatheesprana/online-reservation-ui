import {useRef, useEffect} from 'react'
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

const InvoiceItem = ({item, id, handleItemInputChange, handleRemoveItem, isFocused, setCurrentFocus}) => {
    const inputRef = useRef(null);

    useEffect(() => {
        isFocused && inputRef.current?.focus();
    }, [isFocused])

    return ( 
        <tr
            style={isFocused?{border: '3px solid orange'}:null}
            onBlur={() => setCurrentFocus(-1)}
            onFocus={() => setCurrentFocus(id)}
        >
            <td>{id+1}</td>
            <td>{item.productTitle}</td>
            <td>
                <CInput
                    style={{width: "100px"}}
                    value={item.qty}
                    name="qty"
                    onChange={e => handleItemInputChange(e, id)}
                    onFocus={({target})=> target.select()}
                    innerRef={inputRef}
                />
            </td>
            <td className="float-right">{(item.qty * item.item?.mrp)+' Rs'}</td>
            <td>
                <CIcon name="cil-pencil" />
                <CIcon name="cil-trash"
                    onClick={()=>handleRemoveItem(id)}
                />
            </td>
        </tr>
     );
}
 
export default InvoiceItem;