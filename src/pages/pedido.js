import React from 'react'
import useProducto from '@/hook/useProducto'
import CssBaseline from '@mui/material/CssBaseline';
import { Card, Box,Typography, Container, Grid, CardMedia, CardContent  } from '@mui/material'

const pedido = () => {
    const {compra} = useProducto()

  return (
    <>
        {compra ? (
            <Container sx={{mt:'20px'}} >
                <CssBaseline />
                <Box sx={{ bgcolor: 'white', height: '100vh' }}> 
                    <Grid container spacing={2} direction={{ xs:'column', md: 'row'}}>
                        <Grid item xs={8}>
                            <Box>
                                {compra.pedido.map(producto => (
                                    <Card sx={{ display: 'flex', m:1, p:'2',border:1, borderColor: 'black' }}>
                                         <CardMedia
                                            component="img"
                                            sx={{ width: 151 }}
                                            alt={producto.title}
                                            src={producto.image}
                                            />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>                                        
                                      <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h5">
                                          {producto.title}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary" component="div">
                                          {producto.category}
                                        </Typography>
                                      </CardContent>
                                      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, width:'full' }}>
                                            <Typography sx={{ mt: '2', mb:'1'}}>Cantidad: {producto.cantidad}</Typography>
                                            <Typography sx={{margin: 'auto'}}>{producto.cantidad * producto.price}</Typography>  
                                      </Box>
                                    </Box>
                                  </Card>
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{ display: 'flex', flexDirection:'column', justifyContent:'space-evenly',border:1, borderColor: 'black', m:1,p:1 }}>
                                <Typography variant='h3' sx={{ mt:1, mb:2}}>Detalle Orden</Typography>
                                <Box component='div' sx={{ m:1}}>
                                    <Typography sx={{ color: 'text.primary', fontSize: 34}}>Direccion despacho</Typography>
                                    <Typography>{compra.usuario.direccion}</Typography>
                                    <Box component='div' sx={{mt:1}}>
                                        <Typography sx={{ color: 'text.primary', fontSize: 20}}>Datos Cliente</Typography>
                                        <Typography>Correo: {compra.usuario.email}</Typography>
                                        <Typography>Nombre: {compra.usuario.nombre}</Typography>
                                    </Box>
                                </Box>                              
                                <Box component='div' sx={{mt:4, display:'flex', justifyContent:'space-between', borderTop:1,borderColor: 'black'}}>
                                    <Typography>Subtotal</Typography>
                                    <Typography>$ {compra.subtotal.toFixed(2)}</Typography>
                                </Box>
                                <Box component='div' sx={{display:'flex', justifyContent:'space-between'}}>
                                    <Typography>I.V.A</Typography>
                                    <Typography>$ {(compra.subtotal * 19 / 100).toFixed(2)}</Typography>
                                </Box>
                                <Box component='div' sx={{display:'flex', justifyContent:'space-between'}}>
                                    <Typography>Total</Typography>
                                    <Typography>$ {(compra.subtotal * 1.19).toFixed(2)}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        ):(
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', display: 'flex' }} >
                    <Typography  variant="h3" sx={{
                        m:'auto'
                    }} >
                        No hay productos
                    </Typography>
                </Box>
            </Container>
        )}
    </>
  )
}

export default pedido