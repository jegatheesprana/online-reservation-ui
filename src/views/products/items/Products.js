import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

import Table from '../../../components/table/Table'
import Container from '../../../components/container/Container'

import usersData from '../../users/UsersData'
import useFetch from 'src/useFetch'

const getBadge = status => {
  switch (status) {
    case true: return 'success'
    case false: return 'danger'
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['title', 'company', 'mrp', { key: 'status' }]
const pageMenus = [{ label: 'Add New Product', href: '#/products/new' }]

const Products = () => {
  const { data: products } = useFetch('/products')

  return (
    <>
      <Container title="Products List" pageMenus={pageMenus}>
        <Table
          items={products}
          fields={fields}
          editRoute={({ productId, itemId }) => `/products/edit/${productId}/${itemId}`}
          delURL={({ productId, itemId }) => `/products/productItem/${productId}/${itemId}`}
          scopedSlots={{
            'status':
              (item) => (
                <td>
                  <CBadge color={getBadge(item.status)}>
                    {item.status ? 'Active' : 'Inactive'}
                  </CBadge>
                </td>
              )
          }}
        />
      </Container>
    </>
  )
}

export default Products
