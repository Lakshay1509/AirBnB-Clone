import React from "react";
import { Link, useParams } from "react-router-dom";
import {perks} from "../constants/perks.js";

const PlacesPage = () => {
  const { action } = useParams();
  console.log(action);

  return (
    <div className="mt-8">
      {action !== "new" && (
        <div className="flex items-center justify-center">
          <Link
            to={"/account/places/new"}
            className="inline-flex bg-primary text-white py-2 px-6 rounded-full gap-1 justify-center items-center"
          >
            Add New Place
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">
              Title for your place. Short and catchy.
            </p>
            <input type="text" placeholder="Title" />

            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address For your Place</p>
            <input type="text" placeholder="Address" />
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">More = Better</p>
            <div className="flex gap-2">
              <input type="text" placeholder="{Add using a Link...}" />
              <button className="bg-gray-200 px-4 rounded-2xl ">
                Add&nbsp;Photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="border bg-transparent rounded-2xl p-4 text-xl text-gray-500 flex gap-1 justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15m0-3-3-3m0 0-3 3m3-3V15"
                  />
                </svg>
                Upload{" "}
              </button>
            </div>
            <h2 className="text-2xl mt-4">Description</h2>
            <p className="text-gray-500 text-sm">Description for your place.</p>
            <textarea/>

            <h2 className="text-2xl mt-4">Perks</h2>
            <p className="text-gray-500 text-sm">Select all the perks</p>
            
            <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">

            {perks.map((perk => 
              <label id={perk.id} className="border border-black p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                
                <input type="checkbox" />
                <img src={perk.icon} alt="{perk.name}" className="size-5" />
                <span>{perk.name}</span>
              </label>
            ))}
            </div>
            

          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
