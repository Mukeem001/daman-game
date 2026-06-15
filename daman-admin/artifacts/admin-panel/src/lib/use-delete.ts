import { useMutation } from "./hooks";

export function useDeleteDeposits() {
  return useMutation("delete", "/admin/deposits/:id", { headerType: 'admin-token' });
}

export function useDeleteAllDeposits() {
  return useMutation("delete", "/admin/deposits", { headerType: 'admin-token' });
}

export function useDeleteWithdrawals() {
  return useMutation("delete", "/admin/withdrawals/:id", { headerType: 'admin-token' });
}

export function useDeleteAllWithdrawals() {
  return useMutation("delete", "/admin/withdrawals", { headerType: 'admin-token' });
}

export function useDeleteBids() {
  return useMutation("delete", "/admin/bets/:id", { headerType: 'admin-token' });
}

export function useDeleteAllBids() {
  return useMutation("delete", "/admin/bets", { headerType: 'admin-token' });
}
