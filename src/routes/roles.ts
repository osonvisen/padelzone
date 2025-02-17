export type UserRole = "admin" | "user" | "guest";

export const rolePermissions: Record<UserRole, string[]> = {
    admin: ["/", "/mypage", "/admin"],
    user: ["/", "/mypage"],
    guest: ["/"],
};
