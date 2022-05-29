
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { ContentModal } from '../components'



export const showAlert = () => {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        html: <ContentModal/>,
        confirmButtonText: 'Try Again'
    })
}