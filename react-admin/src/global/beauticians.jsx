import React, { useState, useEffect } from 'react';

function BeauticiansList() {
    const [beauticians, setBeauticians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBeauticians = async () => {
            try {
                const response = await fetch('http://localhost:8081/beautician');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBeauticians(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchBeauticians();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Beauticians List</h1>
            <ul>
                {beauticians.map(beautician => (
                    <li key={beautician.id}>
                        {beautician.beautician_fname} {beautician.beautician_lname} - {beautician.beautician_email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BeauticiansList;
