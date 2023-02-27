import React,{useState} from 'react'
import useProducto from '@/hook/useProducto'
import { Drawer, Button, IconButton, Badge, Box, TextField } from '@mui/material'
import Person2Icon from '@mui/icons-material/Person2';
import DetalleCarro from './DetalleCarro';
import Navbar from '@/components/Navbar';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const iniciasState = {
    email: "",
    nombre: "",
    direccion: ""
}

const Header = () => {
  const { carro, mostrarCarro, usuario, handleMostrarCarro, calculaTotal, handleUsuario, handleModalUsuario, modalUsuario, handleCerrarSesion, handleCompra } = useProducto()
  const [user, setUser] = useState(iniciasState)
  const [error, setError ] = useState(null)
  const handleChange = e => {
    setUser({
        ...user,
        [e.target.name] : e.target.value
    })
  }
  const handleSubmit = () => {
    if(user.nombre === "" || user.email === "" || user.direccion === "") {
      setError('Todos los Datos son obligatorios')
      setTimeout(() => {
        setError(null)
      }, 3000);
      return
    }
    handleUsuario(user)
    handleModalUsuario()
    if(carro.length !== 0){
      handleMostrarCarro()
    }
  }
  return (
   <>
     <header className='Header'>
      <Navbar />
      <IconButton sx={{
        position: 'fixed',
        top:'20%',
        left:'5px',
      }} onClick={() => handleModalUsuario()}>
        <Badge badgeContent={0} color="error">
          <Person2Icon fontSize='large' color={`${usuario ? 'success' : 'error'}`} />
        </Badge>
      </IconButton>
    </header>
    <Drawer anchor="right" open={mostrarCarro} onClose={() => handleMostrarCarro()}>
    <div>
     <div className='carro-contenedor'>
     <h2>Tus productos</h2>
       {carro.length === 0 ? <p>No hay productos en el carro.</p> : null}
       {carro.map((item) => (
         <DetalleCarro 
         key={item.idProducto}
         datos={item}
         />
       ))}
       <h2>Total: $ {calculaTotal().toFixed(2)}</h2>
       {carro.length === 0 ? <p></p> : <Button onClick={() => handleCompra()} variant="contained">Comprar</Button> }
     </div>        
    </div>
   </Drawer>
   <Drawer anchor="left" open={modalUsuario} onClose={() => handleModalUsuario()}>
    {usuario ? (
      <Box sx={{
        margin: '5px',
        p:'30px'
      }}>
        <CheckCircleOutlineIcon color='success' fontSize='large' sx={{ margin: 'auto', width: '30%', height: '30%'}} />
        <h1>{usuario.nombre}</h1>
        <br/>
        <p>ya tenemos tus datos<br /> sigue comprando tranquil@</p>
        <br />
        <br />
        <p>no eres {usuario.nombre} ?</p>
        <Button onClick={() => handleCerrarSesion()}>Cerrar Sesion</Button>
      </Box>
    ):(
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        p: '20px'
      }}>
        <h1>Tus Datos</h1>
          <Box sx={{
            margin:'auto',
            display: 'flex',
            flexDirection: 'column',
            border: 1,
            borderColor: 'black',
            p:'10px',
            borderRadius: 2,
            mt: '1'
          }}>
            <TextField sx={{ margin: 2 }} value={user.email} onChange={e => handleChange(e)} name="email" id="email" label="Email" variant="standard" />
            <TextField sx={{ margin: 2 }} value={user.nombre} onChange={e => handleChange(e)} name="nombre" id="nombre" label="Nombre" variant="standard" />
            <TextField sx={{ margin: 2 }} value={user.direccion} onChange={e => handleChange(e)} name="direccion" id="direccion" label="Direccion" variant="standard" />
          </Box>
          <Button sx={{ mt: 2 }} variant='contained' onClick={() => handleSubmit()}>Ingresar</Button>
            {error && (
              <Box sx={{ mt: '20px', color:'red'}}>
              {error}
            </Box>
            )}
      </Box>
    )}    
   </Drawer>
   </>
  )
}

export default Header