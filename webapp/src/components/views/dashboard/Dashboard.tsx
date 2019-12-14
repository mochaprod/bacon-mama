import React, { useState, useEffect, useCallback } from "react";

import { APIManyRecipeResponse, APIRecipeList } from "../../../models/API";

import useAPI from "../../hooks/useAPI";
import useUser from "../../hooks/useUser";

import Responsive from "../../shared/Responsive";
import NavBar from "../../controls/NavBar";
import Card from "./Card";
import CreateRecipeModal from "../home/CreateRecipeModal";

import styles from "./Dashboard.module.scss";

const Dashboard: React.FC = () => {
    const { name, role } = useUser();
    const [recipes, setRecipes] = useState<APIRecipeList[] | null>(null);
    const [create, setCreate] = useState<boolean>(false);

    const request = useAPI();

    const getRecipes = useCallback(async () => {
        const { data: {
            status,
            message,
            recipes: responseRecipes
        } } = await request<APIManyRecipeResponse>(
            "/getRecipes",
            {
                method: "POST",
                data: {
                    username: name
                }
            }
        );

        if (status === "error") {
            throw new Error(message);
        } else {
            return responseRecipes;
        }
    }, [request, name]);

    const update = async () => {
        try {
            const responseRecipes = await getRecipes();
            setRecipes(responseRecipes.sort((a, b) => {
                return a.id - b.id;
            }));
        } catch (e) {
            // Error
        }
    };

    useEffect(() => {
        const updateRecipes = async () => {
            try {
                if (!recipes) {
                    const responseRecipes = await getRecipes();

                    setRecipes(responseRecipes.sort((a, b) => {
                        return a.id - b.id;
                    }));
                }
            } catch (e) {
                // Error
            }
        };

        updateRecipes();
    }, [getRecipes, recipes]);

    const createRecipe = () => {
        if (!create) {
            return;
        }

        return (
            <CreateRecipeModal
                control={ setCreate }
                update={ update }
            />
        );
    };

    

    const setC = () => setCreate(true);

    const removeRecipe = useCallback(async (id: string) => {
        const { data: {
            status,
            message,
            recipes: responseRecipes
        } } = await request<APIManyRecipeResponse>(
            "/deleteRecipe",
            {
                method: "POST",
                data: {
                    recipe: {id:parseInt(id)}
                }
            }
        );

        if (status === "error") {
            throw new Error(message);
        } else {
            update();
        }
    }, [request, name]);

    return (
        <div>
            <NavBar
                click={ setC }
                userName={ name || "User" }
                role={role}
            />
            <Responsive>
                <div
                    className={ styles.title }
                >
                    Your Recipes
                </div>
                <div
                    className={ styles["card-container"] }
                >
                    { recipes && recipes.length === 0 && (
                        <div>
                            No recipes found!
                        </div>
                    ) }
                    { recipes && recipes.map((each) => (
                        <Card
                            key={ each.id }
                            id={ `${each.id}` }
                            name={ each.recipeName }
                            description={ each.description }
                            role={role}
                            remove={removeRecipe}
                        />
                    )) }
                </div>
            </Responsive>
            { createRecipe() }
        </div>
    );
};

export default Dashboard;
