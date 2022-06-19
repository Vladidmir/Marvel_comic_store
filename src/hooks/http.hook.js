import { useState } from "react";

export const useHttp = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = async (url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}) => {

        setLoading(true)

        try {

            const response = await fetch(url, {method, body, headers})

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`)
    
            }

            const data = await response.json()

            setLoading(false)
            return data

        } catch (error) {
            setLoading(false)   
            setError(error.message) 
            throw error
        }

    }

    const clearError = () => setError(null)

    return {
        loading,
        request,
        error,
        clearError,
    }

}