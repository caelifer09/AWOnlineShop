import SimpleSlider from "@/components/SimpleSlider"

export default function Home({categorias, error }) {

  return (
    <>
     <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}

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
  );

  try {
    const respuesta = await fetch('https://fakestoreapi.com/products/categories');

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const categorias = await respuesta.json();

    return {
      props: { categorias }
    };
  } catch (error) {
    console.error('Error al obtener categorías:', error.message);

    return {
      props: {
        categorias: [],
        error: 'No se pudieron cargar las categorías'
      }
    };
  }
}
