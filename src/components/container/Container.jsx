import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'

const Container = ({title, pageMenus=[], children}) => {
    return ( 
        <CRow>
            <CCol>
            <CCard>
                <CCardHeader>
                    {title}
                    <div className="card-header-actions">
                        <CDropdown className="m-1" style={{display: 'inline-block'}}>
                            <CDropdownToggle>
                                <CIcon className="m-1" name="cil-settings" />
                            </CDropdownToggle>
                            <CDropdownMenu>
                                <CDropdownItem header>Menus</CDropdownItem>
                                <CDropdownDivider />
                                {pageMenus.map( (item, id) => (
                                    item.href
                                    ?<CDropdownItem key={id} href={item.href}>{item.label}</CDropdownItem>
                                    :<CDropdownDivider key={id}/>
                                ))}
                            </CDropdownMenu>
                        </CDropdown>
                    </div>
                </CCardHeader>
                <CCardBody>
                    {children}
                </CCardBody>
            </CCard>
            </CCol>
        </CRow>
     );
}
 
export default Container;