import Table from '../../../components/table/Table'
import Container from '../../../components/container/Container'
import useFetch from 'src/useFetch'
import { CBadge } from '@coreui/react'

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

const Sales = () => {
    const { data: products } = useFetch('/products')

    return (
        <Container title="Products List">
            <Table
                items={products}
                fields={fields}
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
    );
}

export default Sales;