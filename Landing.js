class Landing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listaCategorias: [],
            categoriaSeleccionada: '',
            nombreAgregar: '',
            descripcionAgregar: '',
            idcategoriaActualizar: '',
            nombreActualizar: '',
            descripcionActualizar: ''
        }
    }

    componentDidMount() {
        this.leerCategorias();
    }

    leerCategorias = () => {
        const rutaServicio = "https://servicios.campus.pe/serviciocategorias.php";
        fetch(rutaServicio)
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        listaCategorias: result
                    })
                }
            )
    }


    dibujarFormularioAgregar() {
        return (
            <div>
                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{marginBottom: "15px"}}>
                    Nueva categoría
                </button>
                <div className="collapse" id="collapseExample">
                    <form onSubmit={this.categoriasInsertar}>
                        <div className="card card-body">
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Nombre"
                                    value={this.state.nombreAgregar}
                                    onChange={(e) => this.setState({ nombreAgregar: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder="Descripción"
                                    value={this.state.descripcionAgregar}
                                    onChange={(e) => this.setState({ descripcionAgregar: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" type="submit" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Guardar
                                </button>
                                <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    categoriasInsertar = (e) => {
        e.preventDefault();//Evitar que se vuelva a cargar la página con el evento onSubmit
        console.log(this.state.nombreAgregar);
        const rutaServicio = "https://servicios.campus.pe/registrarcategorias.php";

        var formData = new FormData();
        formData.append("nombre", this.state.nombreAgregar);
        formData.append("descripcion", this.state.descripcionAgregar);

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(
                res => res.text()
            )
            .then(
                (result) => {
                    console.log(result);
                    this.leerCategorias();
                    this.setState({
                        nombreAgregar: '',
                        descripcionAgregar: ''
                    })
                }
            )
    }

    dibujarTabla(datosTabla) {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemCategoria =>
                        <tr key={itemCategoria.idcategoria}>
                            <td>{itemCategoria.idcategoria}</td>
                            <td>{itemCategoria.nombre}</td>
                            <td>{itemCategoria.descripcion}</td>
                            <td><button
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                                onClick={() => this.mostrarActualizar(itemCategoria)} /></td>
                            <td><button 
                                onClick={() => this.mostrarEliminar(itemCategoria)} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }

    mostrarEliminar = (itemCategoria) => {
        var respuesta = window.confirm("Está seguro que desea eliminar la categoría " + itemCategoria.nombre + "?");
        if(respuesta === true){           
        const rutaServicio = "https://servicios.campus.pe/categoriaseliminar.php";

        var formData = new FormData();
        formData.append("idcategoria", itemCategoria.idcategoria);      
        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(
                (result) => {
                    this.leerCategorias();
                }
            )
        }
    }

    mostrarActualizar = (itemCategoria) => {
        console.log(itemCategoria)
        this.setState({
            idcategoriaActualizar: itemCategoria.idcategoria,
            nombreActualizar: itemCategoria.nombre,
            descripcionActualizar: itemCategoria.descripcion
        })
    }

    dibujarFormularioActualizar() {
        return (
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={this.categoriasActualizar}>

                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre"
                                        value={this.state.idcategoriaActualizar}
                                        readOnly
                                        onChange={(e) => this.setState({ idcategoriaActualizar: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nombre"
                                        value={this.state.nombreActualizar}
                                        onChange={(e) => this.setState({ nombreActualizar: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Descripción"
                                        value={this.state.descripcionActualizar}
                                        onChange={(e) => this.setState({ descripcionActualizar: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Actualizar</button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        )
    }

    categoriasActualizar = (e) => {
        e.preventDefault();
        console.log(this.state.descripcionActualizar)
        const rutaServicio = "https://servicios.campus.pe/categoriasactualizar.php";

        var formData = new FormData();
        formData.append("idcategoria", this.state.idcategoriaActualizar);
        formData.append("nombre", this.state.nombreActualizar);
        formData.append("descripcion", this.state.descripcionActualizar);

        fetch(rutaServicio, {
            method: 'POST',
            body: formData
        })
            .then(
                (result) => {
                    this.leerCategorias();
                }
            )
    }


    render() {
        let contenidoTabla = this.dibujarTabla(this.state.listaCategorias);
        let contenidoFormularioAgregar = this.dibujarFormularioAgregar();
        let contenidoFormularioActualizar = this.dibujarFormularioActualizar();
        return (
            <section id="categorias" className="padded">
                <div className="container">
                    <div className="row">
                        <h2>Categorias</h2>
                        {contenidoFormularioAgregar}
                        {contenidoTabla}
                        {contenidoFormularioActualizar}
                    </div>
                </div>
            </section>
        );
    }

}