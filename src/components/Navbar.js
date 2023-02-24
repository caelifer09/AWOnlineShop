import * as React from 'react';
import { useRouter } from 'next/router';
import useProducto from '@/hook/useProducto';
import { Badge, Button, IconButton,AppBar,Box, CssBaseline, Toolbar,Typography } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Buscar from './Buscar';

const navItems = ['inicio', 'productos'];

function DrawerAppBar() {
  const { carro, handleMostrarCarro } = useProducto()
  const router = useRouter()

  const handleClick = item => {
    let url = "/"
    if(item !== 'inicio'){
      url= url+ item
    }
    router.push(url)
  }
  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: 'secondary.main' }}>
        <Toolbar>
        <Typography
            variant="h6"
            component="a"
            href='/'
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            AW shop
          </Typography>
          <Buscar />
          <Box component='div' sx={{ display: { xs: 'block', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button onClick={() => handleClick(item)} key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
            <IconButton className='' onClick={() => handleMostrarCarro()}>
              <Badge badgeContent={carro?.length} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DrawerAppBar;