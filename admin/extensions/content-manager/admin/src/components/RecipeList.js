import React, { useState, useEffect } from 'react';
import { request } from 'strapi-helper-plugin';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await request('/recipes', { method: 'GET' });
    setRecipes(response);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(recipes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setRecipes(items);

    await request('/recipes/updateOrder', {
      method: 'POST',
      body: { recipes: items },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="recipes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {recipes.map((recipe, index) => (
              <Draggable key={recipe.id} draggableId={recipe.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <span>{recipe.title}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default RecipeList;
