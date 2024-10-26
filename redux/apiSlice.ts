import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        
        baseUrl: `${process.env.NEXT_PUBLIC_MOVIE_HOST}`,

        

        // prepareHeaders: (headers, { getState }) => {
        //     const token = process.env.NEXT_PUBLIC_API_KEY
        //     if (token) {
        //         headers.set("Authorization", `Bearer ${token}`);
        //     }
        //     return headers;
        // }

        prepareHeaders: (headers) => {
            const token = process.env.NEXT_PUBLIC_API_KEY;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            } else {
             
                throw new Error("Authorization token is required");
            }
            return headers;
        },
    }),
    tagTypes: [
        "",
        
    ],
    endpoints: () => ({})
});
