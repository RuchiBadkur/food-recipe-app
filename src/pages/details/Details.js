import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";

const Details = () => {

    // const params = useParams(); // ({params.id})
    // console.log(params);

    const navigate = useNavigate()
    const {id}  = useParams();
    const {recipeDetailsData, setRecipeDetailsData, 
        favoriteList,
        handleAddToFavorite} = useContext(GlobalContext);

    useEffect(()=>{
        async function getRecipeDetails(){
            try {
                const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    
                if(!response.ok){
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
    
                console.log(data);
                console.log(data.data.recipe);
    
                if(data?.data?.recipe){
                    setRecipeDetailsData(data.data.recipe);
    
                }else{
                    console.error("Recipe not found in response data.");
                }

            } catch (error) {
                console.error("Failed to fetch recipe details:", error);
            }
        }

        getRecipeDetails()
    }, [id])

    return (
        <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {recipeDetailsData ? (
                <>
                    <div className="row-start-2 lg:row-start-auto">
                        <div className="h-96 overflow-hidden rounded-xl group">
                            <img src={recipeDetailsData?.image_url} alt={recipeDetailsData?.title}
                            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <span className="text-sm text-cyan-700 font-medium">{recipeDetailsData?.publisher}</span>
                        <h3 className="font-bold text-2xl truncate text-black">{recipeDetailsData?.title}</h3>
                        <div>
                            <button 
                            onClick={()=>handleAddToFavorite(recipeDetailsData)}
                            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white">
                                { 
                                    favoriteList && favoriteList.length >= 0 &&
                                    favoriteList.findIndex(item=>item.id === recipeDetailsData?.id ) !== -1 ?
                                    "Remove from favorites"
                                    :
                                "Save as favorites"
                                }
                            </button>
                        </div>
                        <div>
                            <span className="text-2xl font-semibold text-black">
                                Ingredients: 
                            </span>
                            <ul className="flex flex-col gap-3">
                                {
                                    recipeDetailsData?.ingredients.map(ingredient=> <li>
                                        <span className="text-2xl font-semibold text-black">
                                            {ingredient.quantity} {ingredient.unit}
                                        </span>
                                        <span className="text-2xl font-semibold text-black">
                                            {ingredient.description}
                                        </span>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </>
            ): (
                <p>Loading recipe details...</p>
            )
                
            }

        </div>
    )
}

export default Details;