// Real API hooks with proper endpoint configuration
import { useQuery as useCustomQuery, useMutation as useCustomMutation } from "./hooks";

// Deposits - GET /api/admin/deposits
export function useGetDeposits(params: any = {}) {
  const queryString = new URLSearchParams({
    page: params.page || '1',
    limit: params.limit || '50',
    ...params
  }).toString();
  
  const rawQuery = useCustomQuery(
    `/admin/deposits${queryString ? '?' + queryString : ''}`,
    { headerType: 'admin-token' }
  );

  // Transform backend deposits data to frontend format
  const transformedData = rawQuery.data 
    ? (rawQuery.data.deposits && Array.isArray(rawQuery.data.deposits)
        ? rawQuery.data.deposits.map((deposit: any) => ({
            id: deposit._id || deposit.id,
            userId: deposit.userId?._id || deposit.userId,
            userName: deposit.userId?.usernumber || deposit.userId?.name || "Unknown",
            amount: deposit.amount || 0,
            status: deposit.status === 'utr_submitted' ? 'pending' : deposit.status === 'approved' ? 'approved' : deposit.status === 'rejected' ? 'rejected' : 'pending',
            createdAt: deposit.createdAt || new Date().toISOString(),
            paymentMethod: deposit.paymentMethod || deposit.paymentChannel || "UPI",
            orderNumber: deposit.orderNumber || "-",
            utrNumber: deposit.utrNumber || "-",
            screenshotUrl: deposit.barcode ? `data:image/png;base64,${deposit.barcode}` : null,
          }))
        : []
      )
    : [];

  return {
    ...rawQuery,
    data: transformedData
  };
}

export function useApproveDeposit() {
  return useCustomMutation("post", "/pay/admin-approve/:id", { headerType: 'admin-token' });
}

export function useRejectDeposit() {
  return useCustomMutation("post", "/pay/admin-reject/:id", { headerType: 'admin-token' });
}

// Withdrawals - GET /api/admin/withdrawals
export function useGetWithdrawals(params: any = {}) {
  const queryString = new URLSearchParams({
    page: params.page || '1',
    limit: params.limit || '50',
    ...params
  }).toString();
  
  const rawQuery = useCustomQuery(
    `/admin/withdrawals${queryString ? '?' + queryString : ''}`,
    { headerType: 'admin-token' }
  );

  // Transform backend withdrawals data to frontend format
  const transformedData = rawQuery.data 
    ? (rawQuery.data.withdrawals && Array.isArray(rawQuery.data.withdrawals)
        ? rawQuery.data.withdrawals.map((withdrawal: any) => ({
            id: withdrawal._id || withdrawal.id,
            userId: withdrawal.userId?._id || withdrawal.userId,
            userName: withdrawal.userId?.usernumber || withdrawal.userId?.name || "Unknown",
            amount: withdrawal.amount || 0,
            method: withdrawal.method || "upi",
            status: withdrawal.status || "pending",
            createdAt: withdrawal.createdAt || new Date().toISOString(),
            bankName: withdrawal.beneficiaryId?.bankName || "-",
            accountNumber: withdrawal.beneficiaryId?.accountNumber || "-",
            ifscCode: withdrawal.beneficiaryId?.ifscCode || "-",
            upiId: withdrawal.beneficiaryId?.upiId || "-",
          }))
        : []
      )
    : [];

  return {
    ...rawQuery,
    data: transformedData
  };
}

export function useApproveWithdrawal() {
  return useCustomMutation("post", "/pay/admin-withdraw-approve/:id", { headerType: 'admin-token' });
}

export function useRejectWithdrawal() {
  return useCustomMutation("post", "/pay/admin-withdraw-reject/:id", { headerType: 'admin-token' });
}

// Bids - GET /api/admin/bets
export function useGetBids(params: any = {}) {
  const queryString = new URLSearchParams({
    page: params.page || '1',
    limit: params.limit || '50',
    ...params
  }).toString();
  
  const rawQuery = useCustomQuery(
    `/admin/bets${queryString ? '?' + queryString : ''}`,
    { headerType: 'admin-token' }
  );

  // Also fetch users to get phone numbers
  const usersQuery = useCustomQuery(
    '/admin/users?page=1&limit=500',
    { headerType: 'admin-token' }
  );

  // Create a map of userId to phone number
  const userPhoneMap: any = {};
  if (usersQuery.data) {
    const usersList = usersQuery.data.users || usersQuery.data || [];
    if (Array.isArray(usersList)) {
      usersList.forEach((user: any) => {
        userPhoneMap[user._id] = user.usernumber || user.phone || '';
      });
    }
  }

  // Transform backend bets data to frontend format
  const transformedData = rawQuery.data 
    ? (rawQuery.data.bets && Array.isArray(rawQuery.data.bets)
        ? rawQuery.data.bets.map((bet: any) => ({
            id: bet._id || bet.id,
            userId: bet.userId,
            userName: userPhoneMap[bet.userId] || (bet.userId?.substring(0, 5) || "Unknown"),
            marketName: bet.priodno || "Market",
            gameType: bet.gameType || "1min",
            number: bet.select || "-",
            amount: bet.pamount || 0,
            status: bet.status === 'win' ? 'won' : bet.status === 'loss' ? 'lost' : 'pending',
            createdAt: new Date(bet.ordertime * 1000).toISOString(),
            openTime: new Date(bet.ordertime * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            closeTime: new Date((bet.ordertime + 60) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            winloss: bet.winloss,
            resultnumber: bet.resultnumber,
          }))
        : Array.isArray(rawQuery.data)
        ? rawQuery.data.map((bet: any) => ({
            id: bet._id || bet.id,
            userId: bet.userId,
            userName: userPhoneMap[bet.userId] || (bet.userId?.substring(0, 5) || "Unknown"),
            marketName: bet.priodno || "Market",
            gameType: bet.gameType || "1min",
            number: bet.select || "-",
            amount: bet.pamount || 0,
            status: bet.status === 'win' ? 'won' : bet.status === 'loss' ? 'lost' : 'pending',
            createdAt: new Date(bet.ordertime * 1000).toISOString(),
            openTime: new Date(bet.ordertime * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            closeTime: new Date((bet.ordertime + 60) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            winloss: bet.winloss,
            resultnumber: bet.resultnumber,
          }))
        : []
      )
    : [];

  return {
    ...rawQuery,
    data: transformedData
  };
}

export function useUpdateBid() {
  return { mutate: () => {}, isPending: false };
}

// Markets - Mock data (no endpoint)
export function useGetMarkets() {
  return { data: [], isLoading: false, error: null, refetch: () => {} };
}

export function useCreateMarket() {
  return { mutate: () => {}, isPending: false };
}

export function useUpdateMarket() {
  return { mutate: () => {}, isPending: false };
}

export function useDeleteMarket() {
  return { mutate: () => {}, isPending: false };
}

// Results - Mock data (no endpoint)
export function useGetResults(params: any) {
  return { data: [], isLoading: false, error: null };
}

export function useCreateResult() {
  return { mutate: () => {}, isPending: false };
}

export function useUpdateResult() {
  return { mutate: () => {}, isPending: false };
}

// Notices - Real API endpoints
export function useGetNotices() {
  const rawQuery = useCustomQuery('/notices', { headerType: 'admin-token' });

  const transformedData = rawQuery.data?.notices && Array.isArray(rawQuery.data.notices)
    ? rawQuery.data.notices.map((notice: any) => ({
        id: notice._id || notice.id,
        title: notice.title || '',
        content: notice.content || '',
        isActive: notice.isActive !== false,
        recipientType: notice.recipientType || 'broadcast',
        userId: notice.userId || null,
        userName: notice.userName || null,
        createdAt: notice.createdAt || new Date().toISOString(),
      }))
    : [];

  return {
    ...rawQuery,
    data: transformedData,
  };
}

export function useCreateNotice() {
  return useCustomMutation("post", "/notices/broadcast", { headerType: 'admin-token' });
}

export function useDeleteNotice() {
  return useCustomMutation("delete", "/notices/:id", { headerType: 'admin-token' });
}

// Users - GET /api/admin/users
export function useGetUsers(params: any = {}) {
  const queryString = new URLSearchParams({
    page: params.page || '1',
    limit: params.limit || '50',
    search: params.search || '',
    ...params
  }).toString();
  
  const rawQuery = useCustomQuery(
    `/admin/users${queryString ? '?' + queryString : ''}`,
    { headerType: 'admin-token' }
  );

  // Transform backend data to frontend format
  const transformedData = rawQuery.data 
    ? (rawQuery.data.users && Array.isArray(rawQuery.data.users)
        ? rawQuery.data.users.map((user: any) => ({
            id: user._id || user.id,
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
            id: user._id || user.id,
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
    data: transformedData
  };
}

export function useUpdateUser() {
  return useCustomMutation("put", "/admin/users/:id");
}

export function useBlockUser() {
  return useCustomMutation("put", "/admin/users/:id/block");
}

export function useDeleteUser() {
  return useCustomMutation("delete", "/admin/users/:id");
}

export function useDeleteUserById(id: string) {
  return useCustomMutation("delete", `/admin/users/${id}`);
}



// Dashboard Stats - GET /api/admin/dashboard/stats
export function useGetDashboardStats() {
  const rawQuery = useCustomQuery(
    '/admin/dashboard/stats',
    { headerType: 'admin-token' }
  );

  const transformedData = rawQuery.data
    ? {
        totalUsers: rawQuery.data.totalUsers || 0,
        totalBidsToday: rawQuery.data.totalBidsToday || 0,
        totalProfit: rawQuery.data.totalProfit || 0,
        activeMarkets: rawQuery.data.activeMarkets || 0,
        depositsToday: rawQuery.data.depositsToday || 0,
        withdrawalsToday: rawQuery.data.withdrawalsToday || 0,
        recentBids: rawQuery.data.recentBids || [],
      }
    : null;

  return {
    ...rawQuery,
    data: transformedData,
  };
}

// Settings - GET/PUT /api/admin/settings
export function useGetSettings() {
  const query = useCustomQuery(
    `/admin/settings`,
    { headerType: 'admin-token' }
  );

  return {
    ...query,
    data: query.data?.data || query.data || {}
  };
}

export function useUpdateSettings() {
  return useCustomMutation("put", "/admin/settings");
}

// Bet Control Latest - GET /api/admin/betcontrol/{gameType}/latest (Individual endpoints)
export function useGetBetControlLatest(gameType: string = "30sec") {
  const gameTypeMap: any = {
    "30sec": "30sec",
    "1min": "1min",
    "3min": "3min",
    "5min": "5min"
  };

  const mappedGameType = gameTypeMap[gameType] || gameType;

  const rawQuery = useCustomQuery(
    `/admin/betcontrol/${mappedGameType}/latest`,
    { headerType: 'admin-token' }
  );

  // Transform backend data to match component expected format
  const transformedData = rawQuery.data
    ? {
        period: rawQuery.data?.periodno || "0",
        results: {
          special: { label: "Special", value: rawQuery.data?.grandTotal || 0 },
          small: { label: "Small", value: rawQuery.data?.bigSmall?.small || 0 },
          big: { label: "Big", value: rawQuery.data?.bigSmall?.big || 0 },
          digits: {
            "0": rawQuery.data?.numbers?.["0"] || 0,
            "1": rawQuery.data?.numbers?.["1"] || 0,
            "2": rawQuery.data?.numbers?.["2"] || 0,
            "3": rawQuery.data?.numbers?.["3"] || 0,
            "4": rawQuery.data?.numbers?.["4"] || 0,
            "5": rawQuery.data?.numbers?.["5"] || 0,
            "6": rawQuery.data?.numbers?.["6"] || 0,
            "7": rawQuery.data?.numbers?.["7"] || 0,
            "8": rawQuery.data?.numbers?.["8"] || 0,
            "9": rawQuery.data?.numbers?.["9"] || 0,
          },
          colors: {
            red: rawQuery.data?.colors?.red || 0,
            green: rawQuery.data?.colors?.green || 0,
            violet: rawQuery.data?.colors?.violet || 0,
          }
        }
      }
    : null;

  return {
    ...rawQuery,
    data: transformedData
  };
}

// Game History - GET /api/admin/history/{gameType}/all
export function useGetGameHistory(gameType: string, page: number = 1, limit: number = 10) {
  const gameTypeMap: any = {
    "30sec": "30sec",
    "1min": "1min",
    "3min": "3min",
    "5min": "5min"
  };

  const mappedGameType = gameTypeMap[gameType] || gameType;

  const rawQuery = useCustomQuery(
    `/admin/history/${mappedGameType}/all?page=${page}&limit=${limit}`,
    { headerType: 'admin-token' }
  );

  // Transform backend data to match component expected format
  const transformedData = rawQuery.data?.records && Array.isArray(rawQuery.data.records)
    ? rawQuery.data.records.map((record: any) => ({
        id: record._id || record.id,
        period: record.periodno || "-",
        digit: record.betnumbers || "-",
        bigSmall: record.bigsmall || "-",
        color: record.color || "-",
        createdAt: record.createdAt || new Date().toISOString(),
      }))
    : [];

  return {
    ...rawQuery,
    data: transformedData,
    pagination: rawQuery.data?.pagination || { page: 1, limit: 10, total: 0 }
  };
}
