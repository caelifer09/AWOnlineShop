import React from 'react'
import { Drawer, Grid } from "@mui/material";
import useProducto from '@/hook/useProducto'
import ViewProductoCard from '@/components/ViewProductoCard'
import ModalProducto from '@/components/ModalProducto'


const productos = () => {
  const { productos, productoModal, handleModal } = useProducto()

  const handleMostrarModal = () => {
    handleModal()
  }

  return (
    <div className='ViewProducto'>
      <Grid container spacing={2}>
        {productos?.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={4} md={3} justifyContent="center" >
            <ViewProductoCard key={producto.id} producto={producto} />
          </Grid>
        ))}
      </Grid>
      <hr/>
      <Drawer anchor="right" open={productoModal} onClose={() => handleMostrarModal()}>
        <ModalProducto />
      </Drawer>
    </div>
  )
}

export default productos