"use client"
import { InputHTMLAttributes } from "react";

interface InputElements extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

export function Input({error, ...props}:InputElements){
    return (
        <>
            <input
                className="w-full border-1 rounded-md h-11 px-2"
                {...props}
            />
            {error && <p className="text-red-500 my-1">{error}</p>}
        </>
    )
}