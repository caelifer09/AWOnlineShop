import React, {useState, useEffect} from 'react'
import Slider from "react-slick";
import useProducto from '@/hook/useProducto'
import ProductoCard from '@/components/ProductoCard'

const SimpleSlider = ({categoria}) => {
    const [productos, setProductos] = useState([])
    const {buscarPorCategoria} = useProducto()

    useEffect(() => {
        const buscar = async () => {
            const data = await buscarPorCategoria(categoria)
            setProductos(data)
        }
        buscar()
    },[])

    var settings = {
        arrows: true,
        autoplay: true,
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        responsive:[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true
            }
          }
        ],
        responsive: [           
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      };
  return (
    <div className='contenedor-slide'>
        <h1>{categoria}</h1>
         <Slider {...settings}>
         {productos?.map( producto => <ProductoCard key={producto.id} producto={producto} />)}
        </Slider>
    </div>
  )
}

export default SimpleSlider