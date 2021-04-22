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
import { DocsLink } from 'src/reusable'

import Table from '../../../components/table/Table'
import Container from '../../../components/container/Container'

import useFetch from 'src/useFetch'

const fields = ['title', 'number', 'type', 'beds', {key: 'maxOccupancy', label: 'Max Occ'}, {key: 'costPerNight', label: 'Per Night' }, 'options']
const pageMenus = [{ label: 'Add New Room', href: '#/rooms/new' }]

const Rooms = () => {
  const { data: rooms } = useFetch('/rooms')

  return (
    <>
      <Container title="Products List" pageMenus={pageMenus}>
        <Table
          items={rooms}
          fields={fields}
          editRoute={({ productId, itemId }) => `/products/edit/${productId}/${itemId}`}
          delURL={({ productId, itemId }) => `/products/productItem/${productId}/${itemId}`}
          scopedSlots={{
            'options':
              (item) => (
                <td>
                  <CButton block variant="outline" color="info" href={"#/rooms/reserves/"+item._id}>Reserves</CButton>
                </td>
              )
          }}
        />
      </Container>
    </>
  )
}

export default Rooms
