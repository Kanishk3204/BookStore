import React from "react";

function Cards({ item }) {
  return (
    <>
      <div>
                <div className="card card-side bg-base-100 shadow-xl mx-3 mt-10 py-3 mb-3 hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                    <figure>
                        <img
                            src={item.image}
                            alt="Movie" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{item.name}</h2>
                        <div className="badge badge-secondary">{item.category}</div>
                        <p>{item.title}</p>
                        <p className=' text-slate-900'>Genre: {item.genre}</p>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400"
                                defaultChecked />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <div className="card-actions justify-end flex-row">
                            <button className="btn">
                                Price: {item.price}
                            </button>
                            <button className="btn bg-yellow-400 btn-primary text-white hover:bg-yellow-600">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  );
}

export default Cards;

