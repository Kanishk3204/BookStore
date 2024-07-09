import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Add() {
    // const location = useLocation();
    // const navigate = useNavigate();
    // const from = location.state?.from?.pathname || "/";
    const {
        register,
        formState: { errors },
    } = useForm();

    // const onSubmit = async (data) => {
    //     const bookInfo = {
    //         name: data.name,
    //         price: data.price,
    //         category: data.category,
    //         image: data.image,
    //         title: data.title,
    //     };
    //     await axios
    //         .post("http://localhost:4001/book/addBook", bookInfo)
    //         .then((res) => {
    //             console.log(res.data);
    //             if (res.data) {
    //                 toast.success("Added Book successfully");
    //                 navigate(from, { replace: true });
    //             }
    //             localStorage.setItem("Books", JSON.stringify(res.data.book));
    //         })
    //         .catch((err) => {
    //             if (err.response) {
    //                 console.log(err);
    //                 toast.error("Error: " + err.response.data.message);
    //             }
    //         });
    // };
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', Number(price));
        formData.append('title', title);
        formData.append('category', category);
        formData.append('image', image);


        try {
            const response = await axios.post('http://localhost:4001/book/addBook', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setName(''); setImage(null);
                setPrice(''); setTitle(''); setCategory('');
                // alert("Book is added");
                toast.success("Added Book successfully");
                document.getElementById('file-upload').value = '';
            }

        } catch (error) {
            toast.error("Error: " + err.response.data.message);
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <div className=" w-[600px] ">
                    <div className="modal-box dark:bg-slate-900 dark:text-white">
                        <form onSubmit={handleSubmit} method="dialog">

                            <h3 className="font-bold text-lg">Add Book</h3>
                            <div className="mt-4 space-y-2">
                                <span>Name</span>
                                <br />
                                <input
                                    type="text"
                                    placeholder="Enter name of book"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
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
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                // {...register("price", { required: true })}
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
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                // {...register("title", { required: true })}
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
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="w-80 px-3 py-1 border rounded-md outline-none dark:bg-slate-900 dark:text-white"
                                // {...register("category", { required: true })}
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
                                    id="file-upload"
                                    accept='image/*'
                                    required
                                    onChange={handleFileChange}
                                    className="file-input file-input-bordered file-input-warning w-full max-w-xs dark:bg-slate-900 dark:text-white" />
                                <br />
                                {errors.image && (
                                    <span className="text-sm text-red-500">
                                        This field is required
                                    </span>
                                )}
                            </div>
                            {/* Button */}
                            <div className="flex justify-around mt-4">
                                <button className="bg-yellow-400 text-white rounded-xl mt-2 px-7 py-3 hover:bg-yellow-600 duration-200">
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
