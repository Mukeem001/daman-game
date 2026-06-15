import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useGetBetControlLatest, useGetGameHistory } from "@/lib/api-hooks";
import { del, put } from "@/lib/api";
import { Trash2, Edit, Trash } from "lucide-react";

export default function Results() {
  const [currentTab, setCurrentTab] = useState("30sec");
  const [historyPage, setHistoryPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [editFormData, setEditFormData] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Fetch betting control data for current tab
  const { data: currentTabData, isLoading, error } = useGetBetControlLatest(currentTab);
  const { data: historyData, isLoading: historyLoading, pagination: historyPagination, error: historyError } = useGetGameHistory(currentTab, historyPage, 10);

  // Mock data as fallback
  const mockTabsData = [
    {
      id: "30sec",
      name: "30sec",
      period: "496565678",
      results: {
        special: { label: "Special", value: 798955 },
        small: { label: "Small", value: 798955 },
        big: { label: "Big", value: 78898 },
        digits: {
          "0": 65656,
          "1": 65632,
          "2": 46565,
          "3": 454514,
          "4": 454545,
          "5": 484545,
          "6": 45454,
          "7": 4542,
          "8": 4515,
          "9": 45451,
        },
        colors: {
          red: 7845,
          green: 45112,
          violet: 454656,
        }
      }
    },
    {
      id: "1min",
      name: "1min",
      period: "123456789",
      results: {
        special: { label: "Special", value: 654321 },
        small: { label: "Small", value: 654321 },
        big: { label: "Big", value: 98765 },
        digits: {
          "0": 55555,
          "1": 66666,
          "2": 77777,
          "3": 88888,
          "4": 99999,
          "5": 111111,
          "6": 222222,
          "7": 333333,
          "8": 444444,
          "9": 555555,
        },
        colors: {
          red: 12345,
          green: 56789,
          violet: 135792,
        }
      }
    },
    {
      id: "3min",
      name: "3min",
      period: "987654321",
      results: {
        special: { label: "Special", value: 456789 },
        small: { label: "Small", value: 456789 },
        big: { label: "Big", value: 123456 },
        digits: {
          "0": 75432,
          "1": 86543,
          "2": 97654,
          "3": 108765,
          "4": 119876,
          "5": 220987,
          "6": 331098,
          "7": 442109,
          "8": 553210,
          "9": 664321,
        },
        colors: {
          red: 24680,
          green: 13579,
          violet: 246813,
        }
      }
    },
    {
      id: "5min",
      name: "5min",
      period: "444555666",
      results: {
        special: { label: "Special", value: 789012 },
        small: { label: "Small", value: 789012 },
        big: { label: "Big", value: 345678 },
        digits: {
          "0": 99999,
          "1": 111111,
          "2": 222222,
          "3": 333333,
          "4": 444444,
          "5": 555555,
          "6": 666666,
          "7": 777777,
          "8": 888888,
          "9": 999999,
        },
        colors: {
          red: 555555,
          green: 666666,
          violet: 777777,
        }
      }
    }
  ];

  // Use API data if available, otherwise use mock data
  const tabsData = [
    { 
      id: "30sec", 
      name: "30sec", 
      ...(currentTab === "30sec" && currentTabData ? currentTabData : mockTabsData[0]) 
    },
    { 
      id: "1min", 
      name: "1min", 
      ...(currentTab === "1min" && currentTabData ? currentTabData : mockTabsData[1]) 
    },
    { 
      id: "3min", 
      name: "3min", 
      ...(currentTab === "3min" && currentTabData ? currentTabData : mockTabsData[2]) 
    },
    { 
      id: "5min", 
      name: "5min", 
      ...(currentTab === "5min" && currentTabData ? currentTabData : mockTabsData[3]) 
    }
  ];

  const [timeRemaining, setTimeRemaining] = useState(30);

  // Timer durations in seconds for each tab
  const timerDurations: { [key: string]: number } = {
    "30sec": 30,
    "1min": 60,
    "3min": 180,
    "5min": 300
  };

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setCurrentTab(tabId);
    setHistoryPage(1); // Reset to page 1 when switching tabs
  };

  // Handle delete result
  const handleDeleteResult = async () => {
    if (!selectedRecord) return;
    
    setIsDeleting(true);
    try {
      await del(`/admin/history/${currentTab}/${selectedRecord.id}`);
      setDeleteModalOpen(false);
      setSelectedRecord(null);
      setRefreshKey(prev => prev + 1);
      // Reset to first page to see changes
      setHistoryPage(1);
    } catch (error) {
      console.error("Error deleting result:", error);
      alert("Failed to delete result. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle delete all results
  const handleDeleteAll = async () => {
    setIsDeletingAll(true);
    try {
      // Delete all records for current game type
      await del(`/admin/history/${currentTab}/all`);
      setDeleteAllModalOpen(false);
      setRefreshKey(prev => prev + 1);
      setHistoryPage(1);
    } catch (error) {
      console.error("Error deleting all results:", error);
      alert("Failed to delete all results. Please try again.");
    } finally {
      setIsDeletingAll(false);
    }
  };

  // Handle edit result
  const handleEditOpen = (record: any) => {
    setSelectedRecord(record);
    setEditFormData({ ...record });
    setEditModalOpen(true);
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!selectedRecord || !editFormData) return;
    
    setIsEditing(true);
    try {
      // Update the record with edited data via centralized API client
      await put(
        `/admin/history/${currentTab}/${selectedRecord.id}`,
        {
          betnumbers: editFormData.digit,
          bigsmall: editFormData.bigSmall,
          color: editFormData.color
        },
        'admin-token'
      );
      setEditModalOpen(false);
      setSelectedRecord(null);
      setEditFormData(null);
      setRefreshKey(prev => prev + 1);
      setHistoryPage(1);
    } catch (error) {
      console.error("Error updating result:", error);
      alert("Failed to update result. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  // Countdown timer effect based on current time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const totalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      const duration = timerDurations[currentTab];
      const elapsedInCycle = totalSeconds % duration;
      const remaining = duration - elapsedInCycle;
      
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTab]);

  const getMaxValue = (results: any) => {
    const allValues = [
      results.special.value,
      results.small.value,
      results.big.value,
      ...Object.values(results.digits),
      ...Object.values(results.colors)
    ];
    return Math.max(...allValues);
  };

  const renderTab = (data: any, timer: number) => {
    const maxValue = getMaxValue(data.results);

    return (
      <div className="space-y-1.5 md:space-y-2">
        {/* Period Number - Minimal Design */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-2 md:p-3 text-center text-white shadow-md">
          <p className="text-xs font-semibold opacity-90 mb-0.5">Period</p>
          <p className="text-2xl md:text-3xl font-bold font-mono tracking-wider">{data.period}</p>
        </div>

        {/* Special, Small, Big - Compact Cards */}
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-2 md:p-2.5 border border-yellow-200 text-center">
            <p className="text-xs font-bold text-yellow-600 uppercase mb-1">{data.results.special.label}</p>
            <p className="text-xl md:text-2xl font-bold text-yellow-700 font-mono">
              {Math.floor(timer / 60) > 0 
                ? `${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}` 
                : `${timer}s`}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-2 md:p-2.5 border border-blue-200 text-center">
            <p className="text-xs font-bold text-blue-600 uppercase mb-1">{data.results.small.label}</p>
            <p className="text-lg md:text-xl font-bold text-blue-700">{data.results.small.value.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-2 md:p-2.5 border border-red-200 text-center">
            <p className="text-xs font-bold text-red-600 uppercase mb-1">{data.results.big.label}</p>
            <p className="text-lg md:text-xl font-bold text-red-700">{data.results.big.value.toLocaleString()}</p>
          </div>
        </div>

        {/* Digits Section - Compact Grid */}
        <div className="bg-white rounded-lg border border-slate-200 p-2 md:p-2.5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-700 uppercase mb-2">Digits (0-9)</h3>
          <div className="grid grid-cols-5 gap-1">
            {Object.entries(data.results.digits).map(([digit, value]: [string, any]) => (
              <div key={digit} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-1.5 md:p-2 border border-slate-200 text-center">
                <p className="text-sm md:text-base font-bold text-indigo-600 mb-0.5">{digit}</p>
                <div className="w-full bg-slate-200 rounded-full h-1 mb-1 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${(value / maxValue) * 100}%` }}
                  />
                </div>
                <p className="text-xs font-semibold text-slate-600">{(value / 1000).toFixed(1)}k</p>
              </div>
            ))}
          </div>
        </div>

        {/* Colors Section - Compact Layout */}
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {/* Red */}
          <div className="bg-white rounded-lg border border-slate-200 p-2 md:p-2.5 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold text-red-600 uppercase">Red</p>
              <span className="text-sm">🔴</span>
            </div>
            <p className="text-base md:text-lg font-bold text-red-700 mb-1.5">{(data.results.colors.red / 1000).toFixed(1)}k</p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="bg-red-500 h-full rounded-full"
                style={{ width: `${(data.results.colors.red / maxValue) * 100}%` }}
              />
            </div>
          </div>

          {/* Green */}
          <div className="bg-white rounded-lg border border-slate-200 p-2 md:p-2.5 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold text-green-600 uppercase">Green</p>
              <span className="text-sm">🟢</span>
            </div>
            <p className="text-base md:text-lg font-bold text-green-700 mb-1.5">{(data.results.colors.green / 1000).toFixed(1)}k</p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 h-full rounded-full"
                style={{ width: `${(data.results.colors.green / maxValue) * 100}%` }}
              />
            </div>
          </div>

          {/* Violet */}
          <div className="bg-white rounded-lg border border-slate-200 p-2 md:p-2.5 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-bold text-purple-600 uppercase">Violet</p>
              <span className="text-sm">🟣</span>
            </div>
            <p className="text-base md:text-lg font-bold text-purple-700 mb-1.5">{(data.results.colors.violet / 1000).toFixed(1)}k</p>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="bg-purple-500 h-full rounded-full"
                style={{ width: `${(data.results.colors.violet / maxValue) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* LEFT SIDE - BETTING CONTROL DATA */}
      <div className="w-full">
        <div className="space-y-2">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-slate-900">Game Results</h1>
            <p className="text-xs text-slate-500 mt-0.5">Real-time results {isLoading && "• Loading..."}</p>
            {error && <p className="text-xs text-red-500 mt-0.5">Error loading results</p>}
          </div>

          <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full" orientation="horizontal">
            <TabsList className="inline-grid grid-cols-4 gap-0.5 p-0.5 bg-white rounded-lg border border-slate-200 w-full">
              {tabsData.map((tab) => (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="px-1 md:px-2 py-1 md:py-1.5 text-xs font-bold transition-all rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=inactive]:text-slate-700 data-[state=inactive]:bg-slate-50 data-[state=inactive]:hover:bg-slate-100 uppercase tracking-wide border-0 whitespace-nowrap text-[10px] md:text-xs"
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabsData.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-2">
                {renderTab(tab, timeRemaining)}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* RIGHT SIDE - GAME HISTORY */}
      <div className="w-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-900">Game History</h1>
              <p className="text-xs text-slate-500 mt-0.5">Recent results {historyLoading && "• Loading..."}</p>
            </div>
            {historyData && historyData.length > 0 && (
              <button
                onClick={() => setDeleteAllModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 text-xs md:text-sm font-semibold rounded hover:bg-red-200 transition-colors"
              >
                <Trash className="w-4 h-4" />
                Delete All
              </button>
            )}
          </div>

          {/* History Table */}
          <Card className="bg-white border border-slate-200 rounded-lg shadow-sm">
            <CardContent className="p-3 md:p-4">
              {historyLoading ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-slate-500">Loading history...</p>
                </div>
              ) : historyError ? (
                <div className="flex items-center justify-center py-8">
                  <p className="text-sm text-red-600">Error loading history: {historyError?.message || 'Unknown error'}</p>
                </div>
              ) : historyData && historyData.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs md:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 px-2 font-bold text-slate-700">Period</th>
                        <th className="text-left py-2 px-2 font-bold text-slate-700">Digit</th>
                        <th className="text-left py-2 px-2 font-bold text-slate-700">B/S</th>
                        <th className="text-left py-2 px-2 font-bold text-slate-700">Color</th>
                        <th className="text-left py-2 px-2 font-bold text-slate-700">Time</th>
                        <th className="text-center py-2 px-2 font-bold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyData.map((record: any, idx: number) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-2 px-2 font-mono text-slate-700">{record.period}</td>
                          <td className="py-2 px-2 font-bold text-indigo-600">{record.digit}</td>
                          <td className="py-2 px-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                              record.bigSmall === 'Big' 
                                ? 'bg-red-100 text-red-700' 
                                : record.bigSmall === 'Small'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              {record.bigSmall || '-'}
                            </span>
                          </td>
                          <td className="py-2 px-2 text-xs">{record.color?.replace('Color', '') || '-'}</td>
                          <td className="py-2 px-2 text-slate-600 text-xs">
                            {new Date(record.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </td>
                          <td className="py-2 px-2 text-center flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditOpen(record)}
                              className="p-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedRecord(record);
                                setDeleteModalOpen(true);
                              }}
                              className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-sm text-slate-500 font-medium">No history available for <span className="text-slate-700 font-bold">{currentTab}</span></p>
                  <p className="text-xs text-slate-400 mt-1">Data will appear once games are played</p>
                </div>
              )}

              {/* Pagination Controls */}
              {historyData && historyData.length > 0 && (
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200">
                  <p className="text-xs text-slate-600">
                    Page <span className="font-bold">{historyPage}</span> of <span className="font-bold">{Math.ceil((historyPagination?.total || 0) / 10)}</span>
                    <span className="ml-2 text-slate-500">({historyData.length} rows)</span>
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setHistoryPage(p => Math.max(1, p - 1))}
                      disabled={historyPage === 1}
                      className="px-3 py-1 text-xs font-semibold bg-slate-100 text-slate-700 rounded hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setHistoryPage(p => p + 1)}
                      disabled={historyData.length < 10}
                      className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Game Result</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this game result? This action cannot be undone.
              <div className="mt-4 p-3 bg-slate-100 rounded-lg text-sm text-slate-700">
                <p><strong>Period:</strong> {selectedRecord?.period}</p>
                <p><strong>Digit:</strong> {selectedRecord?.digit}</p>
                <p><strong>Big/Small:</strong> {selectedRecord?.bigSmall || '-'}</p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteResult}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete All Confirmation Dialog */}
      <AlertDialog open={deleteAllModalOpen} onOpenChange={setDeleteAllModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete All Game Results</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all {historyData?.length || 0} game results on this page? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel disabled={isDeletingAll}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAll}
              disabled={isDeletingAll}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeletingAll ? "Deleting..." : "Delete All"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <AlertDialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Game Result</AlertDialogTitle>
            <AlertDialogDescription>
              Update the game result details below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {editFormData && (
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Period</label>
                <input
                  type="text"
                  value={editFormData.period || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, period: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Digit</label>
                <input
                  type="text"
                  value={editFormData.digit || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, digit: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Big/Small</label>
                <select
                  value={editFormData.bigSmall || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, bigSmall: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="Big">Big</option>
                  <option value="Small">Small</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">Color</label>
                <input
                  type="text"
                  value={editFormData.color || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, color: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <AlertDialogCancel disabled={isEditing}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleSaveEdit}
              disabled={isEditing}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isEditing ? "Saving..." : "Save"}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

