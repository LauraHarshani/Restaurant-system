export function getAdminAuthHeaders(includeJson = false) {
  const token =
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken");

  return {
    ...(includeJson ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
