import { Tables } from "../../schema.gen";

export type Cheese = Tables<'cheeses'> & {
    milk_types: Tables<'milk_types'>
    dough_types: Tables<'dough_types'>
    crust_types: Tables<'crust_types'>
    cheeses_to_periods: Tables<'cheeses_to_periods'>
}

