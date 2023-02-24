import React from 'react'
import useProducto from '@/hook/useProducto';
import Box from '@mui/material/Box';
import {Button} from '@mui/material'

const DetalleCarro = ({datos}) => {
    const {cantidad} = datos
    const {buscarProducto, agregarCarro, removerCarrito} = useProducto()
    const item = buscarProducto(datos.idProducto)
    let nuevaCantidad = cantidad

    const handleCantidad = operacion => {
        switch (operacion) {
            case 0:
                nuevaCantidad--
                break;
            case 1:
                nuevaCantidad++
                break;
            default:
                break;
        }
       if(nuevaCantidad <= 0){
        removerCarrito({
            idProducto: datos.idProducto,
            cantidad: +nuevaCantidad
        })
       }else{
        agregarCarro({
            idProducto: datos.idProducto,
            cantidad: +nuevaCantidad
        })
       }
        nuevaCantidad=0
    }

  return (
         <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1',
            borderColor:'lightblue',
            pb: '20px',
            fontFamily: 'Monospace'
         }}>
            <div className='detalleCarro'>
                <h3>{item.title}</h3>
                <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(cantidad * item.price).toFixed(2)}</p>
                </div>
                <div className="buttons">
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => handleCantidad(0)}
                >
                    -
                </Button>
                <p>{cantidad}</p>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => handleCantidad(1)}
                >
                    +
                </Button>
                </div>
            </div>
            <img id='imgcarro' src={item.image} alt={item.title} />
    </Box>
  )
}

export default DetalleCarro