import type MealLog from "../../../types/mealLogTypes";

const getFormattedPastDate = (daysAgo: number, timeStr: string): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}. ${timeStr}`;
};

export const mockMealLogs: MealLog[] = [
  {
    id: 1,
    foodName: 'Oatmeal with bananas and berries',
    calories: 550,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(1, '08:30'),
    servingSize: '400g'
  },
  {
    id: 2,
    foodName: 'Grilled chicken salad',
    calories: 750,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(1, '13:15'),
    servingSize: '450g'
  },
  {
    id: 3,
    foodName: 'Greek yogurt',
    calories: 350,
    mealType: 'snack',
    createdAt: getFormattedPastDate(1, '17:00'),
    servingSize: '250g'
  },
  {
    id: 4,
    foodName: 'Baked salmon and brown rice',
    calories: 750,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(1, '20:45'),
    servingSize: '400g'
  },

  {
    id: 5,
    foodName: 'Oatmeal with bananas and berries',
    calories: 600,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(2, '08:15'),
    servingSize: '450g'
  },
  {
    id: 6,
    foodName: 'Beef burrito bowl',
    calories: 850,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(2, '13:30'),
    servingSize: '500g'
  },
  {
    id: 7,
    foodName: 'Apple and almonds',
    calories: 350,
    mealType: 'snack',
    createdAt: getFormattedPastDate(2, '16:45'),
    servingSize: '1pcs'
  },
  {
    id: 8,
    foodName: 'Chicken breast and sweet potato',
    calories: 700,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(2, '19:30'),
    servingSize: '450g'
  },

  {
    id: 9,
    foodName: 'Oatmeal with bananas and berries',
    calories: 650,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(3, '09:00'),
    servingSize: '450g'
  },
  {
    id: 10,
    foodName: 'Tuna pasta salad',
    calories: 800,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(3, '14:00'),
    servingSize: '400g'
  },
  {
    id: 11,
    foodName: 'Protein shake with peanut butter',
    calories: 450,
    mealType: 'snack',
    createdAt: getFormattedPastDate(3, '17:30'),
    servingSize: '500ml'
  },
  {
    id: 12,
    foodName: 'Ribeye steak and mashed potatoes',
    calories: 850,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(3, '20:30'),
    servingSize: '450g'
  },

  {
    id: 13,
    foodName: 'Scrambled eggs with toast and bacon',
    calories: 650,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(4, '08:00'),
    servingSize: '4pcs'
  },
  {
    id: 14,
    foodName: 'Turkey sandwich with avocado',
    calories: 700,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(4, '13:00'),
    servingSize: '2pcs'
  },
  {
    id: 15,
    foodName: 'Protein bar and banana',
    calories: 350,
    mealType: 'snack',
    createdAt: getFormattedPastDate(4, '16:30'),
    servingSize: '1pcs'
  },
  {
    id: 16,
    foodName: 'Grilled steak and asparagus',
    calories: 800,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(4, '20:15'),
    servingSize: '14oz'
  },

  {
    id: 17,
    foodName: 'Oatmeal with bananas and berries',
    calories: 600,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(5, '08:45'),
    servingSize: '450g'
  },
  {
    id: 18,
    foodName: 'Grilled chicken salad with quinoa',
    calories: 750,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(5, '13:30'),
    servingSize: '450g'
  },
  {
    id: 19,
    foodName: 'Rice cakes with peanut butter',
    calories: 400,
    mealType: 'snack',
    createdAt: getFormattedPastDate(5, '16:15'),
    servingSize: '4pcs'
  },
  {
    id: 20,
    foodName: 'Pasta Bolognese',
    calories: 800,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(5, '20:00'),
    servingSize: '400g'
  },

  {
    id: 21,
    foodName: 'Oatmeal with bananas and berries',
    calories: 650,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(6, '08:30'),
    servingSize: '450g'
  },
  {
    id: 22,
    foodName: 'Double cheeseburger and fries',
    calories: 1050,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(6, '13:30'),
    servingSize: '1pcs'
  },
  {
    id: 23,
    foodName: 'Baked salmon and brown rice',
    calories: 750,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(6, '19:45'),
    servingSize: '400g'
  },

  {
    id: 24,
    foodName: 'Oatmeal with bananas and berries',
    calories: 600,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(7, '09:15'),
    servingSize: '450g'
  },
  {
    id: 25,
    foodName: 'Chicken wrap with fries',
    calories: 850,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(7, '13:00'),
    servingSize: '1pcs'
  },
  {
    id: 26,
    foodName: 'Greek yogurt with honey and walnuts',
    calories: 400,
    mealType: 'snack',
    createdAt: getFormattedPastDate(7, '17:15'),
    servingSize: '250g'
  },
  {
    id: 27,
    foodName: 'Pork chops with roasted potatoes',
    calories: 750,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(7, '20:30'),
    servingSize: '450g'
  },

  {
    id: 28,
    foodName: 'Oatmeal with bananas and berries',
    calories: 650,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(8, '08:30'),
    servingSize: '450g'
  },
  {
    id: 29,
    foodName: 'Chicken Alfredo pasta',
    calories: 900,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(8, '13:30'),
    servingSize: '450g'
  },
  {
    id: 30,
    foodName: 'Beef stir-fry with noodles',
    calories: 850,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(8, '20:30'),
    servingSize: '450g'
  },

  {
    id: 31,
    foodName: 'Protein pancakes with maple syrup',
    calories: 650,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(9, '09:00'),
    servingSize: '4pcs'
  },
  {
    id: 32,
    foodName: 'Grilled chicken salad',
    calories: 750,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(9, '13:45'),
    servingSize: '400g'
  },
  {
    id: 33,
    foodName: 'Mixed nuts and dried fruit',
    calories: 350,
    mealType: 'snack',
    createdAt: getFormattedPastDate(9, '17:00'),
    servingSize: '100g'
  },
  {
    id: 34,
    foodName: 'BBQ chicken bowl',
    calories: 750,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(9, '20:00'),
    servingSize: '450g'
  },

  {
    id: 35,
    foodName: 'Oatmeal with bananas and berries',
    calories: 600,
    mealType: 'breakfast',
    createdAt: getFormattedPastDate(10, '08:30'),
    servingSize: '450g'
  },
  {
    id: 36,
    foodName: 'Beef rice bowl',
    calories: 800,
    mealType: 'lunch',
    createdAt: getFormattedPastDate(10, '13:15'),
    servingSize: '450g'
  },
  {
    id: 37,
    foodName: 'Omelette with spinach, feta and toast',
    calories: 600,
    mealType: 'dinner',
    createdAt: getFormattedPastDate(10, '19:15'),
    servingSize: '3pcs'
  },
  {
    id: 38,
    foodName: 'Casein protein shake',
    calories: 300,
    mealType: 'snack',
    createdAt: getFormattedPastDate(10, '22:00'),
    servingSize: '400ml'
  }
];