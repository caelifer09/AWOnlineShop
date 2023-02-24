import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import useAlert from '@/hook/useAlerta'

const ProductoContext = createContext()

const ProductoProvider = ({children}) => {
    const {setAlert} = useAlert()
    const carroLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carro')) ?? [] : null
    const usrLs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('usr')) ?? null : null
    const [productos, setProductos] = useState([])
    const [productoModal, setProductoModal] = useState(false)
    const [productoElegido, setProductoElegido] = useState(null)
    const [mostrarCarro, setMostrarCarro]= useState(false)
    const [carro, setCarro] = useState([])
    const [usuario, setUsuario] = useState(null)
    const [modalUsuario, setModalUsuario] = useState(false)
    const [compra, setCompra] = useState(null)
    const router = useRouter()

    useEffect(() => {
        setCarro(carroLS)
        setUsuario(usrLs)
        buscarProductos()
    },[])

    useEffect(() => {
        localStorage.setItem('carro', JSON.stringify(carro))
    },[carro])

    const buscarProductos = async () => {
        try {
            const {data} = await axios('https://fakestoreapi.com/products')
            setProductos(data)
        } catch (error) {
            console.log(error)
            setAlert('ups, algo salio mal','error')
        }
    }
    const buscarPorCategoria = async categoria => {
        const cate = categoria.replace(' ','%20')
        try {
            const {data} = await axios(`https://fakestoreapi.com/products/category/${cate}`)
            return data
        } catch (error) {
            console.log(error)
            setAlert('ups, algo salio mal','error')
        }
    }    
    const handleModal = () => {
        setProductoModal(!productoModal)
    }
    const handleProductoModal = data => {
        setProductoElegido(data)
    }
    const agregarCarro = datos => {
        if(carro.some( producto => producto.idProducto === datos.idProducto)) {
            const carroActualizado = carro.map( cart => cart.idProducto === datos.idProducto ? datos : cart)
            setCarro(carroActualizado)
        }else{
            setCarro([...carro,datos])
            setAlert('Producto Agregado Correctamente al carro','success')
        }        
    }
    const removerCarrito = datos => {
        const carroActualizado = carro.filter( cart => cart.idProducto !== datos.idProducto)
        setCarro(carroActualizado)
     }
     const handleMostrarCarro = () => {
        setMostrarCarro(!mostrarCarro)
     }
     const buscarProducto = id => {
        const producto = productos.find( producto => producto.id === id)
        return producto
     }
     const calculaTotal = () => {
        let Total
        let totalFinal = 0
       try {
            carro.forEach(cart => {
            const producto = productos.find( elemento => elemento.id === cart.idProducto)
            Total = producto.price * cart.cantidad
            totalFinal = totalFinal + Total
            Total = 0
        });
       } catch (error) {
        
       }
        return totalFinal
     }
     const handleModalUsuario = () => {
        setModalUsuario(!modalUsuario)
     }
     const handleUsuario = datos => {
        setUsuario(datos)
        localStorage.setItem('usr', JSON.stringify(datos))
        setAlert('Usuario guardado correctamente', 'success')
     }
     const handleCerrarSesion = () => {
        setUsuario(null)
        localStorage.removeItem('usr');
        handleModalUsuario()
     }
     const handleCompra = () => {
        if(usuario === null){
            handleMostrarCarro()
            handleModalUsuario()
            return
        }
        let orden
        let productoModificado = []
        let pedido = []
        let subtotal = calculaTotal()
        carro.forEach(item => {
            const producto = buscarProducto(item.idProducto)
            productoModificado = {
                id: producto.id,
                title: producto.title,
                description: producto.description,
                category: producto.category,
                price:producto.price,
                cantidad: item.cantidad,
                image: producto.image
            }
            pedido.push(productoModificado)
            productoModificado = []
        });
        orden = {
            usuario,
            pedido,
            subtotal
        }
        setCompra(orden)
        handleCerrarSesion()
        setCarro([])
        setModalUsuario(false)
        setMostrarCarro(false)
        router.push('/pedido')
     }
    return (
        <ProductoContext.Provider
        value={{
            productos,
            productoModal,
            productoElegido,
            carro,
            mostrarCarro,
            modalUsuario,
            usuario,
            compra,
            buscarPorCategoria,
            handleProductoModal,
            handleModal,
            agregarCarro,
            removerCarrito,
            handleMostrarCarro,
            buscarProducto,
            calculaTotal,
            handleUsuario,
            handleModalUsuario,
            handleCerrarSesion,
            handleCompra
        }}
        >
            {children}
        </ProductoContext.Provider>
    )
}

export{
    ProductoProvider
}

export default ProductoContext