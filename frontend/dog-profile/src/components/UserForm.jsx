import React, { useState } from 'react';

export default function UserForm({ onSuccess, backendUrl }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    if (!firstName || !lastName || !dob) {
      setMessage('⚠️ Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, dob })
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Server error');
      } else {
        setMessage('✅ Saved successfully!');
        setFirstName('');
        setLastName('');
        setDob('');
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-6 rounded-xl shadow-inner"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            First Name
          </label>
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter first name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Last Name
          </label>
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter last name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={e => setDob(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
      {message && (
        <div className="mt-3 text-sm font-medium text-gray-600">{message}</div>
      )}
    </form>
  );
}
