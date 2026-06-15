// FIXED API hooks - direct ID endpoints
import { useQuery, useMutation } from "./hooks";

// Users - FIXED delete by passing ID directly
export function useDeleteUser() {
  return useMutation("delete", `/admin/users/:id`, { headerType: 'admin-token' });
}

// Debug transformation
console.log('useDeleteUser hook created with correct endpoint');


// Update the useGetUsers to ensure proper _id mapping
export function useGetUsers(params: any = {}) {
  const queryString = new URLSearchParams({
    page: params.page || '1',
    limit: params.limit || '50',
    search: params.search || '',
    ...params
  }).toString();
  
const rawQuery = useQuery(`/admin/users${queryString ? '?' + queryString : ''}`, { headerType: 'admin-token' });
console.log('useGetUsers called with endpoint:', `/admin/users${queryString ? '?' + queryString : ''}`);

  // Transform backend data to frontend format - FIXED id mapping
  const transformedData = rawQuery.data 
    ? ((rawQuery.data as any).users && Array.isArray((rawQuery.data as any).users)
        ? (rawQuery.data as any).users.map((user: any) => ({
            _id: user._id, // Ensure _id is preserved
            id: user._id, // Frontend uses 'id'
            name: user.name || '',
            email: user.email || '',
            phone: user.usernumber || user.phone || '',
            walletBalance: user.userbalance || user.walletBalance || 0,
            isBlocked: user.isBlocked || false,
            createdAt: user.createdAt || new Date().toISOString(),
            invitationCode: user.invitationCode,
            referredBy: user.referredBy,
            totalCommission: user.totalCommission || 0,
            pendingCommission: user.pendingCommission || 0,
          }))
        : Array.isArray(rawQuery.data)
        ? rawQuery.data.map((user: any) => ({
            _id: user._id,
            id: user._id,
            name: user.name || '',
            email: user.email || '',
            phone: user.usernumber || user.phone || '',
            walletBalance: user.userbalance || user.walletBalance || 0,
            isBlocked: user.isBlocked || false,
            createdAt: user.createdAt || new Date().toISOString(),
            invitationCode: user.invitationCode,
            referredBy: user.referredBy,
            totalCommission: user.totalCommission || 0,
            pendingCommission: user.pendingCommission || 0,
          }))
        : rawQuery.data)
    : [];


  return {
    ...rawQuery,
    data: transformedData,
    refetch: rawQuery.refetch
  };
}

// Other hooks unchanged...
export * from "./api-hooks";
