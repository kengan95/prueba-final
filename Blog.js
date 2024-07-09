class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listaCategorias: [],
            categoriaSeleccionada: '',
            nombremascotaAgregar: '',
            razaAgregar: '',
            propietarioAgregar: ''
        }
    }

    componentDidMount() {
        this.leerCategorias();
        
    }

    leerCategorias = () => {
        const rutaServicio = "https://phpservicios.000webhostapp.com/categoria.php";
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

    dibujarFormularioAgregar(){
        return(
            <div>
                <button className="btn btn-primary" type="submit" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{background: "white", color: "black", border: "1px solid black", marginBottom: "10px"}}>
                    Nueva Mascota
                </button>
                <div className="collapse" id="collapseExample">
                  <form onSubmit={this.categoriaInsertar}>  
                    <div className="card card-body">
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Nombre" 
                            value={this.state.nombremascotaAgregar}
                            onChange={(e) => this.setState({nombremascotaAgregar: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Raza" 
                            value={this.state.razaAgregar}
                            onChange={(e) => this.setState({razaAgregar: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Propietario" 
                            value={this.state.propietarioAgregar}
                            onChange={(e) => this.setState({propietarioAgregar: e.target.value})}
                            />
                        </div>
                        <div className="mb-3">
                             <button className="btn btn-primary" type="submit" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                             Guardar
                            </button>
                            <button className="btn btn-primary" type="submit" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{background: "black"}}>
                                Cerrar
                            </button>
                        </div>
                    </div>
                  </form>
                </div>
            </div>
        )
    }

    categoriaInsertar = (e) => {
        e.preventDefault();//Evita que se vuelva a cargar la página con el evento onSubmit 
        console.log(this.state.nombremascotaAgregar);
        const rutaServicio = "https://phpservicios.000webhostapp.com/categorias-insertar.php";

        var formData = new FormData();
        formData.append("nombremascota", this.state.nombremascotaAgregar);
        formData.append("raza", this.state.razaAgregar);
        formData.append("propietario", this.state.propietarioAgregar);

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
                        nombreAgregar:'',
                        razaAgregar:'',
                        propietarioAgregar:''
                    })
                }
            )
    }

    dibujarTabla(datosTabla){
        return(
            
            <table className="table" style={{marginTop: "20px"}}>
                <thead>
                    <tr>
                        <th>Cod</th>
                        <th>Nombre</th>
                        <th>Raza</th>
                        <th>Propietario</th>
                    </tr>
                </thead>
                <tbody>
                    {datosTabla.map(itemCategoria =>
                    <tr key={itemCategoria.idmascota}>
                        <td>{itemCategoria.idmascota}</td>
                        <td>{itemCategoria.nombremascota}</td>
                        <td>{itemCategoria.raza}</td>
                        <td>{itemCategoria.propietario}</td>
                    </tr>
                    )}
                </tbody>
            </table>
        )
    }

    render() {
        let contenidoTabla = this.dibujarTabla(this.state.listaCategorias);
        let contenidoFormularioAgregar=this.dibujarFormularioAgregar();
        return (
            <section id="categorias" className="padded">
                <div className="container">
                    <div className="row">
                            <h2>Mascotas</h2>    
                            {contenidoFormularioAgregar}                    
                            {contenidoTabla}                     
                    </div>
                </div>
                
            </section>

        );
    }
}