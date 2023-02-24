import SimpleSlider from "@/components/SimpleSlider"

export default function Home({categorias}) {

  return (
    <>
     <div>
      {categorias?.map(categoria => (
        <SimpleSlider key={categoria} categoria={categoria} />
      ))}
     </div>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  const respuesta = await fetch('https://fakestoreapi.com/products/categories')    
  const categorias  = await respuesta.json()

  return {
    props: { 
      categorias
      }
  }
}