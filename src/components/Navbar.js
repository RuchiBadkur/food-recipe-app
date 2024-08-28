import { useContext } from "react";
import { NavLink } from "react-router-dom"
import GlobalContext from "../context/GlobalContext";


const Navbar = () => {

    const {searchParam, setSearchParam, handleSubmit} = useContext(GlobalContext);

    console.log(searchParam);

    return (
        <nav className="flex justify-between items-center py-8 container mx-auto flex-row lg-flex-row gap-5 lg:gap-0">
            <NavLink
            to={"/"}>
                <h2 className="text-2xl font-semibold">FoodReciepe</h2>
            </NavLink>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="search"
                value={searchParam}
                onChange={(e)=>setSearchParam(e.target.value)}
                placeholder="Enter Items..."
                className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
                autoComplete="false"
                />
            </form>
            <ul className="flex flex-row gap-2">
                <li>
                    <NavLink 
                    to={"/"}
                    className="text-black hover:text-gray-700 duration-300"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={"/favorites"}
                    className="text-black hover:text-gray-700 duration-300"
                    >
                        Favorites
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                    to={"/recipe-item/:id"}
                    className="text-black hover:text-gray-700 duration-300"
                    >
                        Details
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;