import Document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends Document {
    render = () => (
        <Html lang="en">
            <Head></Head>
            <body className="relative overflow-hidden bg-grey-50 md:flex">
                <Main />
                <NextScript style={{ display: 'none' }} />
            </body>
        </Html>
    )
}

export default MyDocument
