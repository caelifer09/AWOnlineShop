import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import useProducto from '@/hook/useProducto';
import { useRouter } from 'next/router';

const CardInfo = styled(CardContent)(({theme}) => ({
    '&:last-child': {
        paddingBottom: theme.spacing(2),
      }
  }));

const ProductoCard = ({ producto }) => {
    const { handleModal, handleProductoModal } = useProducto()
    const router = useRouter()

    const handlebtnClick = () => {
        handleProductoModal(producto)
        handleModal()
        router.push('/productos')
    }
    return (
        <Card onClick={() => handlebtnClick()} sx={{ 
            maxWidth:'70%',
            maxHeight:'100%',
            position: "relative", 
            cursor:'pointer' 
            }}>
            <Box sx={{ position: 'relative'}}>
                <CardMedia
                    component="img"
                    height="150"
                    image={producto.image}
                    alt={producto.title}/>
            </Box>
            <CardInfo>
                <Typography variant="h7" gutterBottom component="div" sx={{textDecoration: "none"}}>
                    {producto.title}
                </Typography>
            </CardInfo>
        </Card>
    )
}

export default ProductoCard;