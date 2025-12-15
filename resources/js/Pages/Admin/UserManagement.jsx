import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function UserManagement({
    users,
    filters = {},
    roles = {},
}) {
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const { data, setData, get, processing } = useForm({
        search: filters.search || "",
        role: filters.role || "all",
        status: filters.status || "all",
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("admin.users"), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const updateUserStatus = (user, status) => {
        router.patch(
            route("admin.users.status", user.id),
            {
                status: status,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const updateUserRole = (user, role) => {
        router.patch(
            route("admin.users.role", user.id),
            {
                role: role,
            },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const deleteUser = () => {
        if (userToDelete) {
            router.delete(route("admin.users.delete", userToDelete.id), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    👥 User Management
                </h2>
            }
        >
            <Head title="User Management" />

            <div className="py-12 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            👥 Manage Users
                        </h1>
                        <p className="text-gray-600">View and manage all platform users</p>
                    </div>

                    <div className="bg-white overflow-hidden shadow-xl rounded-2xl border-2 border-blue-100">
                        {/* Search and Filters */}
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                            <form
                                onSubmit={handleSearch}
                                className="flex flex-wrap gap-4"
                            >
                                <div className="flex-1 min-w-64">
                                    <input
                                        type="text"
                                        placeholder="🔍 Search users..."
                                        value={data.search}
                                        onChange={(e) =>
                                            setData("search", e.target.value)
                                        }
                                        className="w-full rounded-xl border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={data.role}
                                        onChange={(e) =>
                                            setData("role", e.target.value)
                                        }
                                        className="rounded-xl border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-semibold"
                                    >
                                        {Object.entries(roles).map(
                                            ([value, label]) => (
                                                <option
                                                    key={value}
                                                    value={value}
                                                >
                                                    {label}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="rounded-xl border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 font-semibold"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">✅ Active</option>
                                        <option value="inactive">
                                            ❌ Inactive
                                        </option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 font-bold shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    🔍 Search
                                </button>
                            </form>
                        </div>

                        {/* Users Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Joined
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users?.data?.map((user) => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.email}
                                                    </div>
                                                    {user.grade_level && (
                                                        <div className="text-xs text-gray-400">
                                                            Grade{" "}
                                                            {user.grade_level}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <select
                                                    value={user.role}
                                                    onChange={(e) =>
                                                        updateUserRole(
                                                            user,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="text-sm rounded border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                                >
                                                    <option value="student">
                                                        Student
                                                    </option>
                                                    <option value="teacher">
                                                        Teacher
                                                    </option>
                                                    <option value="admin">
                                                        Admin
                                                    </option>
                                                </select>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() =>
                                                        updateUserStatus(
                                                            user,
                                                            user.email_verified_at
                                                                ? "inactive"
                                                                : "active"
                                                        )
                                                    }
                                                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                        user.email_verified_at
                                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                            : "bg-red-100 text-red-800 hover:bg-red-200"
                                                    }`}
                                                >
                                                    {user.email_verified_at
                                                        ? "Active"
                                                        : "Inactive"}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(
                                                    user.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() =>
                                                        confirmDelete(user)
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {users?.links && users.links.length > 3 && (
                            <div className="px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Showing {users.from || 0} to{" "}
                                        {users.to || 0} of {users.total || 0}{" "}
                                        results
                                    </div>
                                    <div className="flex space-x-1">
                                        {users.links.map((link, index) =>
                                            link.url ? (
                                                <Link
                                                    key={index}
                                                    href={link.url}
                                                    className={`px-3 py-2 text-sm rounded ${
                                                        link.active
                                                            ? "bg-indigo-600 text-white"
                                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    key={index}
                                                    className="px-3 py-2 text-sm rounded bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">
                            <h3 className="text-lg font-medium text-gray-900">
                                Delete User
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete{" "}
                                    {userToDelete?.name}? This action cannot be
                                    undone.
                                </p>
                            </div>
                            <div className="flex justify-center space-x-4 mt-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={deleteUser}
                                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
