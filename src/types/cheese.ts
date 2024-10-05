import { Tables } from "../../schema.gen";

export type GetCheeses = Tables<'cheeses'> & {
    milk_types: Tables<'milk_types'>
    dough_types: Tables<'dough_types'>
    crust_types: Tables<'crust_types'>
    cheeses_to_periods: Tables<'cheeses_to_periods'>
}

export type GetCheeseDetails = Tables<'cheeses'> & {
    milk_types: Tables<'milk_types'>
    dough_types: Tables<'dough_types'>
    crust_types: Tables<'crust_types'>
    cheeses_to_periods: Tables<'cheeses_to_periods'>[]
    reviews: Tables<'reviews'>[]
}

