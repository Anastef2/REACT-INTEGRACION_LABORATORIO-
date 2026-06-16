import { useState } from "react";
import usePosts from "../hooks/usePosts";

function GestorPosts() {
  const {
    posts,
    cargando,
    error,
    agregarPost,
    eliminarPost
  } = usePosts();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [autor, setAutor] = useState("");
  const [busqueda, setBusqueda] = useState("");

  async function manejarEnvio(evento) {
    evento.preventDefault();

    if (titulo.trim().length < 5) {
      alert("El título debe tener al menos 5 caracteres.");
      return;
    }
    if (contenido.trim().length < 10) {
      alert("El contenido debe tener al menos 10 caracteres.");
      return;
    }
    if (autor.trim() === "") {
      alert("Debe ingresar el nombre del autor.");
      return;
    }

    await agregarPost(titulo, contenido, autor);
    setTitulo("");
    setContenido("");
    setAutor("");
  }

  const postsFiltrados = posts.filter((post) =>
    post.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <section className="card">
        <p>Cargando publicaciones...</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Gestor de publicaciones</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={manejarEnvio} className="formulario">
        <label htmlFor="titulo">Título: <span className="hint">(mínimo 5 caracteres)</span></label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ingrese el título"
        />

        <label htmlFor="contenido">Contenido: <span className="hint">(mínimo 10 caracteres)</span></label>
        <textarea
          id="contenido"
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Ingrese el contenido"
          rows="4"
        />

        <label htmlFor="autor">Autor:</label>
        <input
          id="autor"
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          placeholder="Ingrese el nombre del autor"
        />

        <button type="submit">Crear publicación</button>
      </form>

      <hr />

      <div className="lista-encabezado">
        <h3>Publicaciones registradas</h3>
        <p className="total">Total de publicaciones: {posts.length}</p>
      </div>

      <div className="buscador-wrapper">
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar publicación por título..."
          className="buscador"
        />
      </div>

      {postsFiltrados.length === 0 ? (
        <p>No existen publicaciones{busqueda ? " que coincidan con la búsqueda" : ""}.</p>
      ) : (
        <div className="lista-posts">
          {postsFiltrados.map((post) => (
            <article className="post" key={post.id}>
              <h4>{post.title}</h4>
              {post.author && <p className="autor">Autor: {post.author}</p>}
              <p>{post.body}</p>
              <button
                className="btn-eliminar"
                onClick={() => eliminarPost(post.id)}
              >
                Eliminar
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default GestorPosts;
