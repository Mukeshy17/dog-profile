import React from 'react';

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No users yet. Fill the form to create one.
      </div>
    );
  }

 

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Stored Users</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {users.map(u => (
          <div
            key={u.id}
            className="bg-white border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={u.profilePicture}
              alt={`${u.firstName} ${u.lastName}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="font-bold text-lg text-gray-700">
                {u.firstName} {u.lastName}
              </div>
              <div className="text-sm text-gray-600">
                <strong>DOB:</strong> {u.dob}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Age:</strong> {u.age !== null ? u.age : '—'}
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
