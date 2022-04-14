import React from 'react'
import TopNavigation from './TopNavigation'

export default function Page({ topNav = false, children }) {
    return (
        <>
            {topNav && <TopNavigation />}
            <main>{children}</main>
            {/* <style jsx global>{`
                html,
                body {
                    margin: 0;
                    padding: 0;
                    font-family: SFMono-Regular, Consolas, Liberation Mono,
                        Menlo, monospace;
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow-x: hidden;
                    background: mediumblue;
                }

                #__next {
                    height: 100%;
                    overflow: hidden;
                }

                .page-transition-wrapper {
                    height: 100%;
                }

                #page-transition-container {
                    overflow: hidden;
                    max-width: 100%;
                    width: 100%;
                    height: 100%;
                }

                main {
                    align-items: stretch;
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    height: 100%;
                    overflow-scrolling: touch;
                    -webkit-overflow-scrolling: touch;
                    margin: 0;
                }

                .section {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    place-content: center;
                    place-items: center;
                    padding: 0;
                    margin: 0;
                    font-size: 20vmin;
                    text-align: center;
                }

                *,
                *::before,
                *::after {
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    -webkit-font-kerning: auto;
                    font-kerning: auto;
                    word-wrap: break-word;
                }

                h1 {
                    font-size: 10vmin;
                }

                h2 {
                    font-size: 8vmin;
                }

                p {
                    font-size: 1rem;
                }
            `}</style> */}
        </>
    )
}
