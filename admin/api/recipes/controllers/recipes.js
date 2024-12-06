'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async updateOrder(ctx) {
    const { recipes } = ctx.request.body;

    for (let i = 0; i < recipes.length; i++) {
      await strapi.query('recipe').update({ id: recipes[i].id }, { order: i });
    }

    ctx.send({ message: 'Order updated' });
  },
};
