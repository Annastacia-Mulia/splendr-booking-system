import React, { useState, useEffect } from 'react';

function ClientsList() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await fetch('http://localhost:8081/client');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setClients(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Clients</h1>
            <p></p>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>
                        {client.client_fname} {client.client_lname} - {client.client_email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientsList;
