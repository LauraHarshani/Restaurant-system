export function getAdminAuthHeaders(includeJsonContentType = false) {
  const token =
    localStorage.getItem("adminToken") ||
    sessionStorage.getItem("adminToken");

  return {
    ...(includeJsonContentType ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}
