// pages/Indicators/IndicatorsManagement.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  Search,
  Upload,
  BarChart3,
  Plus,
  Eye,
  Trash2,
  Share2,
  Clock,
  CheckCircle,
} from "lucide-react";
import {
  useIndicators,
  useDeleteIndicator,
  useUploadDocument,
} from "../../hooks/useIndicators";
import DeleteConfirmationModal from "../../components/common/DeleteConfirmationModal";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import { useMyAssignments } from "../../hooks/useIndicators";
import AssignedIndicatorsList from "./AssignedIndicatorsList";
import PermissionChecker from "../../components/SystemAdministration/PermissionChecker";
import { toast } from "@/hooks/use-toast";

export default function IndicatorsManagement({ user }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // React Query hooks
  const {
    data: indicators = { leading: [], lagging: [] },
    isLoading: indicatorsLoading,
  } = useIndicators();

  const {
    data: assignments = { leading: [], lagging: [] },
    isLoading: assignmentsLoading,
  } = useMyAssignments();

  const deleteMutation = useDeleteIndicator();
  const { deleteModal, openDeleteModal, closeDeleteModal } =
    useDeleteConfirmation();
  const uploadMutation = useUploadDocument();

  const canCreateIndicator = [
    "super_admin",
    "group_admin",
    "team_admin",
  ].includes(user.role);
  const canDeleteIndicator = [
    "super_admin",
    "group_admin",
    "team_admin",
  ].includes(user.role);

  const handleDelete = (id, type) => {
    deleteMutation.mutate({ id, type });
    closeDeleteModal();
  };

  const handleDeleteClick = (indicator) => {
    console.log("indicator: ", indicator);
    openDeleteModal(indicator.id, indicator.type, indicator.name);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    await uploadMutation.mutateAsync(file);
    event.target.value = ""; // Reset input
  };

  const filteredLeading = (indicators.leading || []).filter(
    (indicator) =>
      indicator.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredLagging = (indicators.lagging || []).filter(
    (indicator) =>
      indicator.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      indicator.category?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getTabIndicators = () => {
    if (filterType === "leading") return filteredLeading;
    if (filterType === "lagging") return filteredLagging;
    return [...filteredLeading, ...filteredLagging];
  };
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
            Safety Indicators Intelligence
          </h1>
          <p className="text-sm text-muted-foreground">
            {user.role === "employee"
              ? "View and complete assigned safety indicators"
              : "Manage leading and lagging indicators, upload documents for AI analysis"}
          </p>
        </div>
        <PermissionChecker permission="create_indicators">
          <Button
            size="sm"
            className="gap-2"
            onClick={() => navigate("create")}
          >
            <Plus className="w-4 h-4" />
            Create Indicator
          </Button>
        </PermissionChecker>
        
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Leading</p>
                <p className="text-2xl font-bold">
                  {indicatorsLoading ? "..." : indicators.leading?.length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lagging</p>
                <p className="text-2xl font-bold">
                  {indicatorsLoading ? "..." : indicators.lagging?.length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {user.role === "employee" && (
          <>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned</p>
                    <p className="text-2xl font-bold">
                      {assignmentsLoading
                        ? "..."
                        : (assignments.leading?.length || 0) +
                          (assignments.lagging?.length || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/30">
                    <CheckCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {assignmentsLoading
                        ? "..."
                        : (assignments.leading?.filter(
                            (i) => i.status === "completed",
                          ).length || 0) +
                          (assignments.lagging?.filter(
                            (i) => i.status === "completed",
                          ).length || 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-transparent border border-slate-200 dark:border-slate-700 mb-4 w-full">
          <TabsTrigger value="all">All Indicators</TabsTrigger>
          {user.role === "employee" && (
            <TabsTrigger value="assigned">My Assignments</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search indicators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("all")}
              >
                All
              </Button>
              <Button
                variant={filterType === "leading" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("leading")}
                className="gap-1"
              >
                <TrendingUp className="w-3 h-3" />
                Leading
              </Button>
              <Button
                variant={filterType === "lagging" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterType("lagging")}
                className="gap-1"
              >
                <TrendingDown className="w-3 h-3" />
                Lagging
              </Button>
            </div>
          </div>

          {/* Upload Card */}
          {canCreateIndicator && (
            <Card className="bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-900/10 dark:to-sky-900/10 border-blue-200 dark:border-blue-800">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                      <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Upload Safety Documents for AI Analysis
                      </h3>
                      <p className="text-sm text-blue-800/80 dark:text-blue-300/80">
                        Upload incident reports, inspection forms, training
                        records to automatically extract indicators
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          PDF, DOC, DOCX, Images
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          AI Classification
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="gap-2"
                    onClick={() =>
                      document.getElementById("file-upload").click()
                    }
                    disabled={uploadMutation.isPending}
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Upload Document
                      </>
                    )}
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Indicators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indicatorsLoading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                    <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                  </CardContent>
                </Card>
              ))
            ) : (
              <>
                {(filterType === "all" || filterType === "leading") &&
                  filteredLeading.map((indicator) => (
                    <IndicatorCard
                      key={`leading-${indicator.id}`}
                      indicator={{ ...indicator, type: "leading" }}
                      onView={() =>
                        navigate(
                          `/app/indicators-dashboard/${indicator.id}/leading`,
                        )
                      }
                      onDelete={() => handleDeleteClick(indicator)}
                      canDelete={canDeleteIndicator}
                    />
                  ))}

                {(filterType === "all" || filterType === "lagging") &&
                  filteredLagging.map((indicator) => (
                    <IndicatorCard
                      key={`lagging-${indicator.id}`}
                      indicator={{ ...indicator, type: "lagging" }}
                      onView={() =>
                        navigate(
                          `/app/indicators-dashboard/${indicator.id}/lagging`,
                        )
                      }
                      onDelete={() => handleDeleteClick(indicator)}
                      canDelete={canDeleteIndicator}
                    />
                  ))}

                {!indicatorsLoading && getTabIndicators().length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                      No indicators found
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {canCreateIndicator
                        ? "Create your first indicator or upload a document"
                        : "No indicators available yet"}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </TabsContent>

        <TabsContent value="assigned" className="space-y-4">
          <AssignedIndicatorsList />
        </TabsContent>
      </Tabs>

      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={() => handleDelete(deleteModal.id, deleteModal.type)}
        title="Delete Indicator"
        description="Are you sure you want to delete this safety indicator?"
        itemName={deleteModal.name}
        itemDetails={`Type: ${deleteModal.type} • This will remove all associated data`}
        isLoading={deleteMutation.isPending}
        variant="destructive"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}

function IndicatorCard({ indicator, onView, onDelete, canDelete }) {
  const isLeading = indicator.type === "leading";

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/shared-indicator/${indicator.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Share link copied to clipboard!");
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-2 rounded-lg ${
              isLeading
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            }`}
          >
            {isLeading ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )}
          </div>
          <Badge variant={isLeading ? "success" : "destructive"}>
            {indicator.type?.toUpperCase()}
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-2">{indicator.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {indicator.description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Category</span>
            <Badge variant="outline">{indicator.category}</Badge>
          </div>

          {isLeading && indicator.target_value && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Target</span>
              <span className="font-medium">
                {indicator.target_value} {indicator.measurement_unit}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Created</span>
            <span>{new Date(indicator.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onView}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
          {canDelete && (
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
