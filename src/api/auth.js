export async function verifyToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/keep-live`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.ok;
  } catch (err) {
    console.error("Verify token error:", err);
    return false;
  }
}
