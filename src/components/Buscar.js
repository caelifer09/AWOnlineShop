import React, {useState} from 'react'
import Router from 'next/router'
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Buscar = () => {
  const [busqueda, setBusqueda] = useState(' ')

  const handleBusqueda = e => {
    e.preventDefault()

    if(busqueda.trim() === '') {
        setBusqueda(' ')
    }
    Router.push({
      pathname: '/buscar',
      query: { q: busqueda}
    })
  }

  return (
       <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mx:5 }}
      onSubmit={handleBusqueda}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Busca un producto"
        inputProps={{ 'aria-label': 'Busca un producto' }}
        onChange={e => setBusqueda(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Buscar