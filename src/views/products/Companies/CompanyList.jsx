import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { DocsLink } from 'src/reusable'

import Table from '../../../components/table/Table'
import Container from '../../../components/container/Container'

import usersData from '../../users/UsersData'
import useFetch from 'src/useFetch'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields =  [
                  { key: 'name', label: 'Company name' },
                  'address', 'supplier', 'status',
                ]

const CompanyList = () => {
  const { data: companies } = useFetch('/companies') 

  return (
    <>
      <Container title="Company List">
        <Table
          items={companies}
          fields={fields}
          scopedSlots={{
            'status':
              (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>
                    {item.status}
                  </CBadge>
                </td>
              )
          }}
        />
      </Container>
    </>
  )
}

export default CompanyList
