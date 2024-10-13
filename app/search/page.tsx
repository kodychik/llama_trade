"use client";
import { useRef } from 'react';

export default function Page(){
    const inputRef = useRef(null);


    const handleSearch = async () => {
        if (inputRef.current?.value) {
            setLoading(true);
            setError(null);
            try {
                const companySymbol = inputRef.current.value;
                const data = await fetchCompanyData(companySymbol);
                // Pass data as a query param or via state to the analysis page
                router.push({
                    pathname: '/analysis',
                    query: { symbol: companySymbol, data: JSON.stringify(data) }, // You can use local storage or a global state manager for larger data
                });
            } catch (err) {
                setError('Failed to fetch data from the API.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-xl font-medium">Which Company do you want to research?</h1>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search..."
                    className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={handleSearch}>
                    Search
                </button>
            </div>
        </div>
    );
}
