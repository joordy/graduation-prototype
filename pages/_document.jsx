import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

class MyDocument extends Document {
    render = () => (
        <Html lang="en">
            <Head>
                <Script id="custom-js" src="js/myscript.js" />
                <Script
                    id="onesignal-js"
                    src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
                />
            </Head>
            <body className="overflow-hidden bg-white ">
                <Main />
                <NextScript style={{ display: 'none' }} />
            </body>
        </Html>
    )
}

export default MyDocument
