import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        
        baseUrl: `${process.env.NEXT_PUBLIC_MOVIE_HOST}`,

        

        prepareHeaders: (headers, { getState }) => {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2FhNjAyMmM0YWZiOTY1ODRjYzJhNjEyNWFjMWMxNiIsIm5iZiI6MTcyOTcxMTg2OS4xNDc0ODgsInN1YiI6IjY3MTk0ZDYzZTgzM2Q5MmVmMDVmYmZiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0h6iVBLJ1iuihvuUQgsWeOwDstRhazrlFaGzsHqmWuw"
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: [
        "RestaurantSpecificUserData",
        
    ],
    endpoints: () => ({})
});
