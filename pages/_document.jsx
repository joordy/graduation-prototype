import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render = () => (
        <Html lang="en">
            <Head></Head>
            <body>
                <Main />
                <NextScript style={{ display: 'none' }} />
            </body>
        </Html>
    )
}

export default MyDocument
