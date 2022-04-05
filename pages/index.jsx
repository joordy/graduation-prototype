import { test } from '_utils/test'

const Home = () => {
    test()
    console.log('hi')
    return (
        <main className="flex flex-col items-center justify-center w-full h-screen">
            <h1 className="text-3xl">Hello world</h1>
        </main>
    )
}

export default Home
