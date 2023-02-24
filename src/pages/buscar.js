import React, {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import { Drawer, Grid } from "@mui/material";
import useProducto from '@/hook/useProducto'
import ViewProductoCard from '@/components/ViewProductoCard'
import ModalProducto from '@/components/ModalProducto'

const buscar = () => {
  const router = useRouter()
  const { query: {q}} = router
  const { productos, productoModal, handleModal } = useProducto()
  const [resultado, setResultado] = useState([])

  const handleMostrarModal = () => {
    handleModal()
  }

  useEffect(() => {
    if(q) {
      const busqueda = q.toLowerCase();
    const filtro =  productos.filter(producto => {
      return (
        producto.title.toLowerCase().includes(busqueda) || 
        producto.description.toLowerCase().includes(busqueda) ||
        producto.category.toLowerCase().includes(busqueda)
      )
    });
    setResultado(filtro);    
    }
  }, [ q, productos ]);


  return (
    <div className='ViewProducto'>
      <Grid container spacing={2}>
        {resultado?.map((producto) => (
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

export default buscar