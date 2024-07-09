import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Add() {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const bookInfo = {
            name: data.name,
            price: data.price,
            category: data.category,
            image: data.image,
            title: data.title,
        };
        await axios
            .post("http://localhost:4001/book/addBook", bookInfo)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    toast.success("Added Book successfully");
                    navigate(from, { replace: true });
                }
                localStorage.setItem("Books", JSON.stringify(res.data.book));
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err);
                    toast.error("Error: " + err.response.data.message);
                }
            });
    };
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <div className=" w-[600px] ">
                    <div className="modal-box dark:bg-slate-900 dark:text-white">
                        <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            {/* <Link
                                to="/"
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            >
                                ✕
                            </Link> */}

                            <h3 className="font-bold text-lg">Add Book</h3>
                            <div className="mt-4 space-y-2">
                                <span>Name</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter name of book"
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                    {...register("name", { required: true })}
                                />
                                <br />
                                {errors.name && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            {/* Price */}
                            <div className="mt-4 space-y-2">
                                <span>Price</span>
                                <br />
                                <input
                                    type="number"
                                    placeholder="Enter Price"
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                    {...register("price", { required: true })}
                                />
                                <br />
                                {errors.price && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            {/* title */}
                            <div className="mt-4 space-y-2">
                                <span>Title</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter Title"
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                    {...register("title", { required: true })}
                                />
                                <br />
                                {errors.title && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mt-4 space-y-2">
                                <span>Category</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter Category"
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                    {...register("category", { required: true })}
                                />
                                <br />
                                {errors.category && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            <div className="mt-4 space-y-2">
                                <span>Image</span>
                                <br />
                                <input
                                    type="file"
                                    className="file-input file-input-bordered file-input-secondary w-full max-w-xs dark:bg-slate-900 dark:text-white"
                                    {...register("image", { required: true })} 
                                />
                                <br />
                                {errors.image && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            {/* Button */}
                            <div className="flex justify-around mt-4">
                                <button className="bg-pink-500 text-white rounded-xl mt-2 px-7 py-3 hover:bg-pink-700 duration-200">
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Add
