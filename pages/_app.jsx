import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './../styles/globals.css'
// import '_styles/globals.css'

const ToastMessage = ({ closeToast, props }) => {
    console.log(props)
    return (
        <>
            <a href="/page-two">
                <h1>Mammut.com</h1>
                <p>Contentful stopped working</p>
            </a>
            <div>
                <button>View details</button>
                <button onClick={closeToast}>Close</button>
            </div>
        </>
    )
}
const App = ({ Component, pageProps }) => {
    setTimeout(() => {
        toast(<ToastMessage id={1234567} />, { toastId: 1234567 })
    }, 750000)

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={8500}
                hideProgressBar={false}
                draggable={true}
                progress={undefined}
                closeOnClick
                pauseOnHover
            />
            <Component {...pageProps} />
        </>
    )
}

export default App
