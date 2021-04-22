import React, { useState, useEffect, useRef } from 'react'
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
import dateFormat from "dateformat";
import Autocomplete from 'react-autocomplete';
import InvoiceItem from './InvoiceItem'
import InvoiceHeader from './InvoiceHeader'
import useFetch from 'src/useFetch'

const Invoice = ({title, children}) => {
    var id=0
    const thStyle = {verticalAlign: "middle", overflow: "hidden"}
    const [items, setItems] = useState([]);
    const [details, setDetails] = useState({customer: '', date: dateFormat(new Date(), "yyyy-mm-dd")});
    const [value, setValue] = useState('');
    const [isPending, setIsPending] = useState(false);
    const { data: products } = useFetch('/invoice/products')
    const [currentFocus, setCurrentFocus] = useState(0);
    const productInputRef = useRef(null);

    const handleItemInputChange = (e, id) => {
        const values = [...items];
        values[id][e.target.name] = e.target.value;
        setItems(values)
    }
    const handleRemoveItem = (id) => {
        setItems(items.filter( (item, _id) => id!==_id))
    }
    const handleDetailsChange = ({target}) => {
        const values = {...details};
        values[target.name] = target.value;
        setDetails(values)
    }
    const handleSubmit = () => {
        setIsPending(true);
        const data = {...details, items};
        console.log(data)
        // fetch(process.env.REACT_APP_API_HOST + '/sales/new', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // }).then( () => {
        //     setIsPending(false)
        //     afterSubmit()
        // } )
        // .catch( console.log )
    }

    useEffect( () => {
        console.log(productInputRef);
        (currentFocus===-1) && productInputRef.current?.focus();
    }, [currentFocus])
    return ( 
        <CCard>
            <CCardHeader>
                { title }
            </CCardHeader>
            <CCardBody>
                <InvoiceHeader details={details} handleDetailsChange={handleDetailsChange} />
                <div className="position-relative table-responsive">
                    <table className="table table-md table-striped table-hover border">
                        <thead>
                            <tr>
                                <th className="position-relative pr-4" style={{...thStyle, width: "50px"}}>
                                    <div className="d-inline"></div>
                                </th>
                                <th className="position-relative pr-4" style={thStyle}>
                                    <div className="d-inline">Product</div>
                                </th>
                                <th className="position-relative pr-4" style={thStyle}>
                                    <div className="d-inline">Qty</div>
                                </th>
                                <th className="position-relative pr-4 float-right" style={thStyle}>
                                    <div className="d-inline">Price</div>
                                </th>
                                <th className="position-relative pr-4" style={{...thStyle,  width: "100px"}}>
                                    <div className="d-inline">Action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            { items.length===0?
                                <tr>
                                    <td colSpan="5"><span> &nbsp; </span></td>
                                </tr>
                                :
                                items.map( (item, id) => (
                                    <InvoiceItem
                                        key={id}
                                        item={item}
                                        id={id}
                                        handleItemInputChange={handleItemInputChange}
                                        handleRemoveItem={handleRemoveItem}
                                        isFocused={currentFocus===id}
                                        setCurrentFocus={setCurrentFocus}
                                    />
                                ) )
                             }
                        </tbody>
                        <tbody>
                            <tr>
                                <td></td>
                                <td colSpan="">
                                    <Autocomplete
                                        items={products}
                                        shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                        getItemValue={item => item}
                                        renderItem={(item, highlighted) =>
                                            <div
                                                key={id++}
                                                style={{ 
                                                    backgroundColor: highlighted ? '#eee' : 'transparent',
                                                    padding: '0.75rem 1.25rem',
                                                    border: '1px solid transparent',
                                                    borderRadius: '0.25rem',
                                                    color: '#6b6d7a',
                                                    borderColor: '#f1f2f4',
                                                    userSelect: "none"
                                                }}
                                            >
                                                {item.title}
                                            </div>
                                        }
                                        value={value}
                                        onChange={e => setValue(e.target.value)}
                                        onSelect={value => {
                                            const item = {productTitle: value.title, qty: 0, ...value}
                                            setItems([...items, item])
                                            setValue('')
                                            setCurrentFocus(items.length)
                                        }}
                                        inputProps={{
                                            className: "form-control",
                                            ref: productInputRef
                                        }}
                                        ref={productInputRef}
                                        menuStyle={{
                                            borderRadius: '3px',
                                            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                            background: 'rgba(255, 255, 255, 0.9)',
                                            padding: '2px 0',
                                            fontSize: '90%',
                                            position: 'fixed',
                                            overflow: 'auto',
                                            maxHeight: '50%',
                                            marginBottom: '1rem',
                                            border: '2px solid transparent',
                                            color: '#6b6d7a',
                                            backgroundSolor: '#f5f6f7',
                                            borderColor: '#f1f2f4',
                                        }}
                                        wrapperProps={{
                                            style: {
                                                display: 'block',
                                                position: "relative"
                                            }
                                        }}
                                    />
                                </td>
                                <td colSpan="3"></td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th></th>
                                <th>
                                    <div className="d-inline">Total</div>
                                </th>
                                <th></th>
                                <th className="float-right">
                                    <div className="d-inline">{items.reduce((accumulator, item)=>accumulator + item.qty*item.item.mrp, 0) +' Rs' }</div>
                                </th>
                                <th></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="form-actions">
                    { !isPending && <CButton type="submit" color="primary" onClick={handleSubmit}>Save changes</CButton> }
                    { isPending && <CButton color="primary" disabled>Saving</CButton> }
                    <CButton color="secondary">Cancel</CButton>
                </div>
            </CCardBody>
            <CCardFooter >
                <CButton >Go to main menu</CButton>
            </CCardFooter>
        </CCard>
     );
}
 
export default Invoice;