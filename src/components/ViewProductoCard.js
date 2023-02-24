import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {Button} from '@mui/material'
import useProducto from '@/hook/useProducto';

const CardInfo = styled(CardContent)(({theme}) => ({
    '&:last-child': {
        paddingBottom: theme.spacing(2),
      }
  }));

const ViewProductoCard = ({ producto }) => {
    const { handleModal, handleProductoModal } = useProducto()

    const handlebtnClick = () => {
        handleProductoModal(producto)
        handleModal()
    }
    return (
        <Card sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            border: 1,
            borderColor:'black',
            borderRadius: '20px'  
            }}>
            <Box sx={{ position: 'relative'}}>
                <CardMedia
                    component="img"
                    height="250"
                    image={producto.image}
                    alt={producto.title}/>
            </Box>
            <CardInfo>
                <Typography variant="h6" gutterBottom component="div">
                   {producto.title}
                </Typography>
            </CardInfo>
            <Button onClick={() => handlebtnClick()}>Ver Detalle</Button>
        </Card>
    )
}

export default ViewProductoCard;