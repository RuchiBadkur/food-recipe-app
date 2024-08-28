import { useState } from "react";
import GlobalContext from "./GlobalContext";
import { useNavigate } from "react-router-dom";

const GlobalProvider = ({children}) => {
    
    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoriteList,  setFavoriteList] = useState([])

    const navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault()
        try {
            const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);

            const data = await response.json();

            if(data?.data?.recipes){
                setRecipeList(data?.data?.recipes)
                
                setLoading(false);
                setSearchParam("");
                navigate('/')
            }

            // console.log(data.data.recipes);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setSearchParam("");
        }
    }

    function handleAddToFavorite(getCurrentItem){
        console.log(getCurrentItem);
        let copyFavoriteList = [...favoriteList];
        const index = copyFavoriteList.findIndex(item => item.id === getCurrentItem.id);

        if(index === -1){
            copyFavoriteList.push(getCurrentItem)
        }else {
            copyFavoriteList.splice(index)
        }

        setFavoriteList(copyFavoriteList);

        console.log("favoriteList", favoriteList);
    }

    return (
        <>
            <GlobalContext.Provider value={
                {
                    searchParam,  setSearchParam,
                    handleSubmit,
                    loading, 
                    recipeList,
                    recipeDetailsData, setRecipeDetailsData,
                    handleAddToFavorite,
                    favoriteList
                }
            }>
                {children}
            </GlobalContext.Provider>
        </>
    )
}

export default GlobalProvider;