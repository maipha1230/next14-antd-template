"use client";
import React from 'react'
import './loader.css';
import { useLoaderStore } from '../../stores/loaderStore'
function Loader() {
    const { isShowLoading } = useLoaderStore()

    if (!isShowLoading) return null;
    return (
        <div
            className="fixed inset-0 h-auto min-h-screen w-full flex justify-center items-center flex-col gap-2 z-[100]">
            <div className="fixed inset-0 bg-[#45e0ff] opacity-25 transition-opacity"></div>
            <div className="spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader