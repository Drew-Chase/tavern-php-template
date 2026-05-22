import {useEffect, useState} from "react";

export default function Home() {
    const [message, setMessage] = useState("");
    useEffect(() =>
    {
        fetch("/api/test/").then(res => res.json()).then(data => setMessage(data.message));
    }, []);
    return (
        <>
            <h1 className="text-3xl font-bold underline">Home Page</h1>
            <p>{message}</p>
        </>
    );
}