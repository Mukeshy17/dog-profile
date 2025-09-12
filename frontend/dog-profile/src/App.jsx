import React, { useEffect, useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const res = await fetch(`${BACKEND}/user`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users', err);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          🐶 Dog Profile Creator
        </h1>
        <UserForm onSuccess={fetchUsers} backendUrl={BACKEND} />
        <hr className="my-8 border-gray-300" />
        <UserList users={users}/>
      </div>
    </div>
  );
}

export default App;
