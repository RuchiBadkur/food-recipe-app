import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import RecipeItem from "../../components/RecipeItem";

const Favorites = () => {
    const {favoriteList} = useContext(GlobalContext);

    

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {
                favoriteList && favoriteList.length > 0
                ? favoriteList.map(item => <RecipeItem item={item}/>)
                : (<div>
                    <p
                    className="lg:text-4xl text-xl text-center text-black font-extrabold"
                    >Nothing is added in favorites. </p>
                </div>)
            }
        </div>
    )
}

export default Favorites;