import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MaterialReactTable from 'material-react-table'
import * as Yup from 'yup'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  InputLabel,
} from '@mui/material'
import {
  CToast,
  CToastClose,
  CToastBody,
  CButton,
  CModalFooter,
  CModalBody,
  CModalTitle,
  CModalHeader,
  CModal,
} from '@coreui/react'
import { Delete, Edit, Visibility, VerticalAlignBottom } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import OCP from 'src/assets/images/OCP_logo.svg.png'
import OCPG from 'src/assets/images/OCPG.png'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Products = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [isSuccessToastOpen, setIsSuccessToastOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  function handleViewDetails(row) {
    const newCondition = row.original.condition
    const Id = row.original.id
    const Name = row.original.name
    const Code = row.original.code
    const Brand = row.original.brand
    const Price = row.original.price
    const InStock = row.original.inStock
    const Warranty = row.original.warranty
    navigate(`/products/productState`, {
      state: {
        condition: newCondition,
        id: Id,
        name: Name,
        code: Code,
        brand: Brand,
        price: Price,
        inStock: InStock,
        warranty: Warranty,
      },
    })
  }
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/products/all', {
        method: 'GET',
      })
      if (response.ok) {
        const data = await response.json()
        setTableData(data)
      } else {
        console.error('Failed to fetch data from the Oracle database')
      }
    } catch (error) {
      console.error('Error occurred while fetching data:', error)
    }
  }, [])
  useEffect(() => {
    fetchData()
  }, [fetchData])
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    code: Yup.string().required('Code is required'),
    brand: Yup.string().required('Brand is required'),
    price: Yup.number().typeError('Price must be a number').required('Price is required'),
    inStock: Yup.number().typeError('Quantity must be a number').required('Quantity is required'),
    warranty: Yup.string().required('Warranty is required'),
    condition: Yup.string().required('Condition is required'),
  })
  const [setHasErrors] = useState(false)
  const handleCreateNewRow = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false })
      const response = await fetch('http://localhost:8080/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      if (response.ok) {
        const text = await response.text()
        const newProduct = text ? JSON.parse(text) : {}
        const newTableData = [...tableData, newProduct]
        setTableData(newTableData)
        setCreateModalOpen(false)
        fetchData()
      } else {
        setHasErrors(true)
      }
    } catch (error) {
      console.error('Error occurred while creating a new row:', error)
      console.log(error)
    }
  }

  const handleSuccessToastClose = () => {
    setIsSuccess(false)
  }
  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        const response = await fetch(`http://localhost:8080/products/update/${row.original.name}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        if (response.ok) {
          tableData[row.index] = values
          setTableData([...tableData])
          exitEditingMode()
          setIsSuccess(true)
        } else {
          console.error('Failed to save row edits')
        }
      } catch (error) {
        console.error('Error occurred while saving row edits:', error)
      }
    }
  }
  const [selectedRow, setSelectedRow] = useState(null)
  const [visible, setVisible] = useState(false)
  const handleDeleteRow = useCallback(async () => {
    if (selectedRow) {
      try {
        const response = await fetch(
          `http://localhost:8080/products/delete/${selectedRow.original.name}`,
          {
            method: 'DELETE',
          },
        )
        if (response.ok) {
          tableData.splice(selectedRow.index, 1)
          setTableData([...tableData])
          showDeleteToast()
          setVisible(false)
        } else {
          console.error('Failed to delete a row')
        }
      } catch (error) {
        console.error('Error occurred while deleting a row:', error)
      }
    }
  }, [selectedRow, tableData])
  const generateCodeData = (product) => {
    const { id, name, code, brand, price, inStock, warranty, condition } = product
    const qrData = [
      { label: 'ID', value: id },
      { label: 'Name', value: name },
      { label: 'Code', value: code },
      { label: 'Brand', value: brand },
      { label: 'Price', value: price },
      { label: 'In Stock', value: inStock },
      { label: 'Warranty', value: warranty },
      { label: 'Condition', value: condition },
    ]
    return qrData
  }
  const downloadQRCode = (product) => {
    const data = generateCodeData(product)
    const pdf = new jsPDF()
    const columns = ['Label', 'Value']
    const rows = data.map((data) => [data.label, data.value])
    const logoLeftWidth = 30
    const logoLeftHeight = 30
    const logoRightWidth = 33
    const logoRightHeight = 33
    pdf.addImage(OCP, 'PNG', 10, 5, logoLeftWidth, logoLeftHeight)
    pdf.addImage(OCPG, 'PNG', 170, 5, logoRightWidth, logoRightHeight)

    pdf.setFont('helvetica', 'bolder')
    const headerText = 'Product Info:'
    const headerFontSize = 20
    const headerX = pdf.internal.pageSize.getWidth() / 2
    const headerY = 50
    pdf.setFontSize(headerFontSize)
    pdf.text(headerText, headerX, headerY, 'center')
    pdf.setFont('helvetica', 'normal')
    pdf.autoTable({
      head: [columns],
      body: rows,
      startY: 60,
    })
    pdf.save(`${product.name}.pdf`)
  }
  const showDeleteToast = () => {
    setIsSuccessToastOpen(true)
  }

  const handleDeleteToastClose = () => {
    setIsSuccessToastOpen(false)
  }
  CreateNewAccountModal.propTypes = {
    open: PropTypes.bool.isRequired,
    columns: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  const handleCancelRowEdits = () => {
    setValidationErrors({})
  }
  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value)
          if (!isValid) {
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            })
          } else {
            delete validationErrors[cell.id]
            setValidationErrors({
              ...validationErrors,
            })
          }
        },
      }
    },
    [validationErrors],
  )
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableColumnOrdering: true,
        enableEditing: false,
        enableSorting: true,
        size: 80,
      },
      {
        accessorKey: 'name',
        header: 'NAME',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
        render: ({ row }) => (
          <a
            href={`/products/productState`}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/products/productState`, { state: row.original })
            }}
          >
            {row.original.name}
          </a>
        ),
      },
      {
        accessorKey: 'code',
        header: 'CODE',
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      {
        accessorKey: 'brand',
        header: 'BRAND',
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      {
        accessorKey: 'price',
        header: 'PRICE(DH)',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'inStock',
        header: 'QUANTITY',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'number',
        }),
      },
      {
        accessorKey: 'warranty',
        header: 'WARRANTY',
        size: 80,
        enableEditing: false,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
      {
        accessorKey: 'condition',
        header: 'CONDITION',
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: 'string',
        }),
      },
    ],
    [getCommonEditTextFieldProps, navigate],
  )
  return (
    <>
      <CToast
        autohide={true}
        visible={isSuccessToastOpen}
        color="success"
        className="text-white align-items-center"
        style={{ position: 'fixed', right: '20px', top: '70px', zIndex: '10000' }}
        onClose={handleDeleteToastClose}
      >
        <div className="d-flex">
          <CToastBody>Row deleted successfully!</CToastBody>
          <CToastClose className="me-2 m-auto" onClick={handleDeleteToastClose} />
        </div>
      </CToast>
      {isSuccess && (
        <CToast
          autohide={true}
          visible={true}
          color="success"
          className="text-white align-items-center"
          style={{ position: 'fixed', right: '20px', top: '70px', zIndex: '10000' }}
          onClose={handleSuccessToastClose}
        >
          <div className="d-flex">
            <CToastBody>Data submitted successfully.</CToastBody>
            <CToastClose className="me-2 m-auto" white />
          </div>
        </CToast>
      )}

      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData}
        editingMode="modal"
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="bottom" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="bottom" title="View Details">
              <IconButton color="primary" onClick={() => handleViewDetails(row)}>
                <Visibility />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="bottom" title="Delete">
              <IconButton
                color="error"
                onClick={() => {
                  setSelectedRow(row)
                  setVisible(true)
                }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="bottom" title="Download Data">
              <IconButton color="info" onClick={() => downloadQRCode(row.original)}>
                <VerticalAlignBottom />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Button color="info" onClick={() => setCreateModalOpen(true)} variant="contained">
            Create New Product
          </Button>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Delete!</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure u want to delete this row?</CModalBody>
        <CModalFooter>
          <CButton color="info" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={handleDeleteRow}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = ''
      return acc
    }, {}),
  )
  const [brands, setBrands] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/brands/all')
      .then((response) => response.json())
      .then((data) => setBrands(data))
      .catch((error) => console.error('Error fetching brands:', error))
  }, [])
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const handleSubmit = async () => {
    const errors = {}
    columns.forEach((column) => {
      if (column.accessorKey !== 'id' && !values[column.accessorKey]) {
        errors[column.accessorKey] = 'Field required'
      } else if (
        ['inStock', 'price'].includes(column.accessorKey) &&
        isNaN(Number(values[column.accessorKey]))
      ) {
        errors[column.accessorKey] = 'Must be a number'
      } else if (
        ['name', 'code', 'brand', 'condition'].includes(column.accessorKey) &&
        !/^[A-Za-z0-9- ]+$/.test(values[column.accessorKey])
      ) {
        errors[column.accessorKey] = 'Must contain only letters and spaces'
      }
    })
    setValidationErrors(errors)
    if (Object.keys(errors).length === 0) {
      await onSubmit(values)
      onClose()
      setIsSuccess(true)
      setValues(
        columns.reduce((acc, column) => {
          acc[column.accessorKey ?? ''] = ''
          return acc
        }, {}),
      )
    } else {
      setHasErrors(true)
    }
  }
  const [validationErrors, setValidationErrors] = useState({})
  const handleSuccessToastClose = () => {
    setIsSuccess(false)
  }
  const handleErrorToastClose = () => {
    setHasErrors(false)
  }
  return (
    <>
      {isSuccess && (
        <CToast
          autohide={true}
          visible={true}
          color="success"
          className="text-white align-items-center"
          style={{ position: 'fixed', right: '20px', top: '70px', zIndex: '10000' }}
          onClose={handleSuccessToastClose}
        >
          <div className="d-flex">
            <CToastBody>Data submitted successfully.</CToastBody>
            <CToastClose className="me-2 m-auto" white />
          </div>
        </CToast>
      )}
      {hasErrors && (
        <CToast
          autohide={true}
          visible={true}
          className="text-white align-items-center"
          style={{ position: 'fixed', right: '20px', top: '70px', zIndex: '10000' }}
          color="danger"
          onClose={handleErrorToastClose}
        >
          <div className="d-flex">
            <CToastBody>Please fix all the errors</CToastBody>
            <CToastClose className="me-2 m-auto" white />
          </div>
        </CToast>
      )}
      <Dialog open={open}>
        <DialogTitle textAlign="center">Create New Product</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {columns
                .filter((column) => column.accessorKey !== 'id')
                .map((column) => (
                  <FormControl
                    key={column.accessorKey}
                    error={!!validationErrors[column.accessorKey]}
                  >
                    {column.accessorKey === 'condition' ? (
                      <FormControl fullWidth>
                        <InputLabel>SELECT CONDITION</InputLabel>
                        <Select
                          value={values[column.accessorKey]}
                          onChange={(e) =>
                            setValues({ ...values, [column.accessorKey]: e.target.value })
                          }
                          fullWidth
                        >
                          <MenuItem value="" style={{ color: 'grey' }}>
                            Select Condition
                          </MenuItem>
                          <MenuItem value="In Stock">In Stock</MenuItem>
                          <MenuItem value="Installation">Installation</MenuItem>
                          <MenuItem value="In Use">In Use</MenuItem>
                          <MenuItem value="Maintenance">Maintenance</MenuItem>
                          <MenuItem value="Recycled">Recycled</MenuItem>
                        </Select>
                      </FormControl>
                    ) : column.accessorKey === 'warranty' ? (
                      <FormControl fullWidth>
                        <InputLabel>SELECT WARRANTY</InputLabel>
                        <Select
                          value={values[column.accessorKey]}
                          onChange={(e) =>
                            setValues({ ...values, [column.accessorKey]: e.target.value })
                          }
                          fullWidth
                        >
                          <MenuItem value="" style={{ color: 'grey' }}>
                            Select Warranty
                          </MenuItem>
                          <MenuItem value={'1 Year'}>1 Year</MenuItem>
                          <MenuItem value={'2 Years'}>2 Years</MenuItem>
                          <MenuItem value={'3 Years'}>3 Years</MenuItem>
                        </Select>
                      </FormControl>
                    ) : column.accessorKey === 'brand' ? (
                      <FormControl fullWidth>
                        <InputLabel>SELECT BRAND</InputLabel>
                        <Select
                          value={values[column.accessorKey]}
                          onChange={(e) =>
                            setValues({ ...values, [column.accessorKey]: e.target.value })
                          }
                          fullWidth
                        >
                          <MenuItem value="" style={{ color: 'grey' }}>
                            Select Brand
                          </MenuItem>
                          {brands.map((brand) => (
                            <MenuItem key={brand.id} value={brand.name}>
                              {brand.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    ) : (
                      <TextField
                        label={column.header}
                        name={column.accessorKey}
                        type={column.type === 'number' ? 'number' : 'text'}
                        value={values[column.accessorKey]}
                        onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                      />
                    )}
                    {validationErrors[column.accessorKey] && (
                      <FormHelperText>{validationErrors[column.accessorKey]}</FormHelperText>
                    )}
                  </FormControl>
                ))}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="info" onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
const validateRequired = (value) => !!value.length
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
const validateAge = (age) => age >= 18 && age <= 50

export default Products
