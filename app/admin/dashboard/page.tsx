'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface License {
  key: string;
  plan: string;
  software?: string;
  maxActivations: number;
  customerName?: string;
  expiresAt?: string;
  activations: Array<{
    hardwareId: string;
    activatedAt: string;
    lastValidated?: string;
  }>;
  createdAt: string;
  revoked: boolean;
}

interface Stats {
  total: number;
  active: number;
  revoked: number;
  totalActivations: number;
  plans: Record<string, number>;
}

export default function AdminDashboard() {
  const [licenses, setLicenses] = useState<Record<string, License>>({});
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  // Form state
  const [newLicense, setNewLicense] = useState({
    plan: 'single',
    software: 'football-scoring',
    customerName: '',
    expiresAt: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/licenses');
      if (response.status === 401) {
        router.push('/admin');
        return;
      }
      const data = await response.json();
      setLicenses(data.licenses);
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to load licenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin');
  };

  const handleCreateLicense = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/create-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLicense),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: `License created: ${data.key}` });
        setShowCreateForm(false);
        setNewLicense({ plan: 'single', software: 'football-scoring', customerName: '', expiresAt: '' });
        loadData();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create license' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create license' });
    } finally {
      setCreateLoading(false);
    }
  };

  const handleRevoke = async (key: string, revoked: boolean) => {
    try {
      const response = await fetch('/api/admin/revoke-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, revoked: !revoked }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: `License ${!revoked ? 'revoked' : 'activated'}` });
        loadData();
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update license' });
    }
  };

  const handleDeactivateDevice = async (licenseKey: string, hardwareId: string) => {
    if (!confirm('Remove this device activation?')) return;

    try {
      const response = await fetch('/api/admin/deactivate-device', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: licenseKey, hardwareId }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Device deactivated' });
        loadData();
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to deactivate device' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Sagitta Admin</h1>
              <p className="text-gray-400 text-sm">License Management Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-500/10 border border-green-500 text-green-500'
                : 'bg-red-500/10 border border-red-500 text-red-500'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-sm mb-2">Total Licenses</div>
              <div className="text-3xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-sm mb-2">Active</div>
              <div className="text-3xl font-bold text-green-500">{stats.active}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-sm mb-2">Revoked</div>
              <div className="text-3xl font-bold text-red-500">{stats.revoked}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="text-gray-400 text-sm mb-2">Total Activations</div>
              <div className="text-3xl font-bold text-blue-500">{stats.totalActivations}</div>
            </div>
          </div>
        )}

        {/* Create License Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            {showCreateForm ? 'Cancel' : '+ Create New License'}
          </button>
        </div>

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-bold mb-4">Create New License</h2>
            <form onSubmit={handleCreateLicense} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Plan
                  </label>
                  <select
                    value={newLicense.plan}
                    onChange={(e) => setNewLicense({ ...newLicense, plan: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="single">Single (2 activations)</option>
                    <option value="pro">Pro (5 activations)</option>
                    <option value="federation">Federation (99 activations)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Software
                  </label>
                  <select
                    value={newLicense.software}
                    onChange={(e) => setNewLicense({ ...newLicense, software: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="football-scoring">Football Scoring</option>
                    <option value="basketball-scoring">Basketball Scoring (future)</option>
                    <option value="multi-sport">Multi-Sport (future)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Customer Name (optional)
                  </label>
                  <input
                    type="text"
                    value={newLicense.customerName}
                    onChange={(e) => setNewLicense({ ...newLicense, customerName: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Expires At (optional)
                  </label>
                  <input
                    type="date"
                    value={newLicense.expiresAt}
                    onChange={(e) => setNewLicense({ ...newLicense, expiresAt: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={createLoading}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800 rounded-lg font-semibold transition-colors"
              >
                {createLoading ? 'Creating...' : 'Create License'}
              </button>
            </form>
          </div>
        )}

        {/* Licenses Table */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">License Key</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Software</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Activations</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {Object.entries(licenses).map(([key, license]) => (
                  <tr key={key} className="hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm">{key}</div>
                      {license.expiresAt && (
                        <div className="text-xs text-gray-400 mt-1">
                          Expires: {new Date(license.expiresAt).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">{license.customerName || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                        {license.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm">
                        {license.software || 'football-scoring'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {license.activations.length} / {license.maxActivations}
                      </div>
                      {license.activations.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {license.activations.map((activation, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                              <span className="font-mono">{activation.hardwareId.substring(0, 12)}...</span>
                              <button
                                onClick={() => handleDeactivateDevice(key, activation.hardwareId)}
                                className="text-red-400 hover:text-red-300"
                                title="Remove this device"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {license.revoked ? (
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                          Revoked
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRevoke(key, license.revoked)}
                        className={`px-3 py-1 rounded text-sm ${
                          license.revoked
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-red-600 hover:bg-red-700'
                        } transition-colors`}
                      >
                        {license.revoked ? 'Activate' : 'Revoke'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
