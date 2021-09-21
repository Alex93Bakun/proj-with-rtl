import React, { useEffect, useState } from 'react';

import './App.css';

const getUser = () => Promise.resolve({ id: 1, name: 'Alex' });

const Search = ({ value, onChange, children }) => (
    <div>
        <label htmlFor="search">{children}</label>
        <input
            id="search"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="search text..."
        />
    </div>
);

const App = () => {
    const [search, setSearch] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUser();
            setUser(user.name);
        };
        loadUser();
    }, []);

    const handleChange = ({ target }) => {
        setSearch(target.value);
    };

    return (
        <div>
            {user && <h2>Logged in as {user}</h2>}
            <img className="image" src="" alt="search image" />
            <Search value={search} onChange={handleChange}>
                Search:
            </Search>
            <p>Searches for {search ? search : '...'}</p>
        </div>
    );
};

export default App;
