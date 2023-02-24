import React from 'react'
import useProducto from '@/hook/useProducto'
import CloseIcon from '@mui/icons-material/Close';


const ModalProducto = () => {
    const {productoElegido, handleProductoModal, handleModal, agregarCarro } = useProducto()
    const {category, description, id, image, price, title } = productoElegido

    const handleMostrarModal = () => {
        handleModal()
      }
    const handleAgregar = async () => {
        let cantidad = 1
        agregarCarro({
            idProducto: id,
            cantidad: +cantidad
        })
        handleMostrarModal()
    }
  return (
    <div className='ModalProducto'>
         <div className='closed'>
            <button onClick={() => handleMostrarModal()}><CloseIcon fontSize={'small'} /></button>
         </div>
        <div className="containerCard">
            <div className="imgBx">
                <img src={image} alt={title} />
            </div>
            <div className="details">
                <div className="content">
                    <h2>{title} <br/>
                        <span>{category}</span>
                    </h2>
                    <p>
                       {description}
                    </p>
                    <h3>$ {price}</h3>
                    <button
                    onClick={() => handleAgregar()}
                    >Agregar al Carro</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ModalProducto