import Head from 'next/head'
import React, {useState, useEffect} from "react";
import GoBack from "../../components/buttons/back";


const Registered = () => {
    return (
        <div>
            <Head>
                <title>REGISTERED</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <GoBack />
                <h3>REGISTERED</h3>
                <h4>注册功能需要稍等....</h4>
            </main>
        </div>
    )
}

export default Registered