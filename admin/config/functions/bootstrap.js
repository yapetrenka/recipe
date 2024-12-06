'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  const role = await strapi.query('role', 'users-permissions').findOne({ type: 'authenticated' });
  const permissions = await strapi.query('permission', 'users-permissions').find({ role: role.id });

  const updateOrderPermission = permissions.find(permission => permission.action === 'recipes.updateOrder');
  if (!updateOrderPermission) {
    await strapi.query('permission', 'users-permissions').create({
      role: role.id,
      action: 'recipes.updateOrder',
      subject: 'recipes',
      properties: {},
      conditions: [],
      type: 'application', // Добавлено поле type
      controller: 'recipes', // Добавлено поле controller
      enabled: true, // Добавлено поле enabled
    });
  }
};
