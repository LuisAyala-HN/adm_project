import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {

    btnEliminar.addEventListener('click', e => {
        const urlProyecto = e.target.dataset.proyectoUrl;

        //-console.log(urlProyecto);

        Swal.fire({
            title: '¿Estás Segur@?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Sí, Elimínelo!',
            cancelButtonText: '!No, Cancelar!'
        }).then((result) => {
            if (result.value) {
                //envia peticion a axios
                const url = `${location.origin}/proyectos/${urlProyecto}`;
                axios.delete(url, { params: { urlProyecto } })
                    .then(function(respuesta) {
                        console.log(respuesta);



                        Swal.fire(
                            '¡Eliminado!',
                            respuesta.data,
                            'success'
                        );

                        //redireccionar al inicio
                        setTimeout(() => {
                            window.location.href = '/'
                        }, 2500);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el proyecto'

                        })
                    })


            }
        })
    })
}
export default btnEliminar