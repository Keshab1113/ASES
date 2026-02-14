// pages/Indicators/IndicatorDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Share2, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Activity, 
  Calendar,
  Edit,
  Download,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "../../api/axios";

export default function IndicatorDetailsPage({ user }) {
  const { id, type } = useParams();
  const navigate = useNavigate();
  const [indicator, setIndicator] = useState(null);
  const [details, setDetails] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState(null);

  useEffect(() => {
    if (id && type) {
      fetchIndicator();
      fetchDetails();
      fetchResults();
    }
  }, [id, type]);

  const fetchIndicator = async () => {
    try {
      const response = await api.get(`/indicators/${id}?type=${type}`);
      if (response.status === 200 && response.data?.success) {
        setIndicator(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching indicator:", error);
    }
  };

  const fetchDetails = async () => {
    try {
      const response = await api.get(`/indicators/${id}/details?type=${type}`);
      if (response.status === 200 && response.data?.success) {
        setDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await api.get(
        `/indicators/results/${id}?type=${type}`
      );
      if (response.status === 200 && response.data?.success) {
        setResults(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const handleShareResult = async (resultId) => {
    try {
      const response = await api.post(`/indicators/results/${resultId}/share`);
      if (response.status === 200 && response.data?.success) {
        const shareUrl = response.data.share_url;
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        alert("Share link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing result:", error);
      alert("Failed to generate share link");
    }
  };

  const handleExportData = () => {
    // Create CSV content
    const headers = ["Date", "Value", "Recorded By", "Group", "Team"];
    const csvContent = [
      headers.join(","),
      ...results.map(r => [
        new Date(r.measurement_date).toLocaleDateString(),
        r.measured_value,
        r.recorded_by_name || "",
        r.group_name || "",
        r.team_name || ""
      ].join(","))
    ].join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `indicator-${id}-results.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-sky-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-lg text-slate-600">Loading indicator details...</p>
        </div>
      </div>
    );
  }

  if (!indicator) {
    return (
      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="text-center py-12">
          <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Indicator Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The indicator you're looking for doesn't exist or you don't have access to it.
          </p>
        </div>
      </div>
    );
  }

  const isLeading = type === "leading";

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Indicators
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Indicator
          </Button>
        </div>
      </div>

      {/* Hero Section - Indicator Overview */}
      <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex items-start gap-6">
          <div
            className={`p-4 rounded-xl ${
              isLeading
                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                : "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
            }`}
          >
            {isLeading ? (
              <TrendingUp className="w-8 h-8" />
            ) : (
              <TrendingDown className="w-8 h-8" />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {indicator.name}
              </h1>
              <Badge variant={isLeading ? "success" : "destructive"} size="lg">
                {type?.toUpperCase()}
              </Badge>
            </div>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4">
              {indicator.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="outline" className="px-3 py-1">
                Code: {indicator.indicator_code}
              </Badge>
              <Badge variant="outline" className="px-3 py-1">
                Category: {indicator.category}
              </Badge>
              {indicator.frequency && (
                <Badge variant="outline" className="px-3 py-1">
                  Frequency: {indicator.frequency}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {isLeading ? (
          <>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Target Value</p>
                <p className="text-3xl font-bold">
                  {indicator.target_value} {indicator.measurement_unit}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Minimum Acceptable</p>
                <p className="text-3xl font-bold">
                  {indicator.min_acceptable} {indicator.measurement_unit}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Weight</p>
                <p className="text-3xl font-bold">{indicator.weight}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {details?.current_value || "N/A"} {indicator.measurement_unit}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Severity Weight</p>
                <p className="text-3xl font-bold">{indicator.severity_weight}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Financial Impact</p>
                <p className="text-3xl font-bold">
                  {indicator.financial_impact_multiplier}x
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Total Incidents</p>
                <p className="text-3xl font-bold text-red-600">
                  {results.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-1">Avg. Severity</p>
                <p className="text-3xl font-bold">
                  {details?.avg_severity || "N/A"}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assignments">
            Assignments ({details?.assignments?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="results">
            Results ({results.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Performance Chart Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
                  <p className="text-muted-foreground">
                    Chart visualization would go here
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-muted-foreground">No data available for chart</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Measurements */}
          {details?.recent_measurements && details.recent_measurements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Measurements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {details.recent_measurements.map((measurement, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Activity className="w-5 h-5 text-slate-500" />
                        <div>
                          <p className="font-semibold text-lg">
                            {measurement.measured_value} {indicator.measurement_unit}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(measurement.measurement_date).toLocaleDateString(undefined, {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      {measurement.group_name && (
                        <Badge variant="outline">{measurement.group_name}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Indicator Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-muted-foreground">Created By</dt>
                  <dd className="font-medium">{indicator.created_by_name || "System"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Created At</dt>
                  <dd className="font-medium">
                    {new Date(indicator.created_at).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Last Updated</dt>
                  <dd className="font-medium">
                    {new Date(indicator.updated_at).toLocaleDateString()}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-muted-foreground">Measurement Unit</dt>
                  <dd className="font-medium">{indicator.measurement_unit}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          {!details?.assignments || details.assignments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Assignments Yet</h3>
                <p className="text-muted-foreground mb-4">
                  This indicator hasn't been assigned to anyone yet.
                </p>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Assign Now
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {details.assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {assignment.assignee_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {assignment.assignee_email}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Badge
                            variant={
                              assignment.status === "completed"
                                ? "success"
                                : assignment.status === "in_progress"
                                  ? "default"
                                  : "secondary"
                            }
                            className="capitalize"
                          >
                            {assignment.status}
                          </Badge>

                          {assignment.due_date && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(assignment.due_date).toLocaleDateString()}
                            </div>
                          )}
                        </div>

                        {assignment.notes && (
                          <p className="text-sm p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                            {assignment.notes}
                          </p>
                        )}

                        <p className="text-xs text-muted-foreground">
                          Assigned by {assignment.assigned_by_name} on{" "}
                          {new Date(assignment.assigned_at).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Activity className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Results Recorded</h3>
                <p className="text-muted-foreground mb-4">
                  This indicator hasn't been measured yet.
                </p>
                <Button>
                  <Activity className="w-4 h-4 mr-2" />
                  Record First Result
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {results.map((result) => (
                <Card key={result.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <p className="text-3xl font-bold">{result.measured_value}</p>
                          {isLeading && indicator.measurement_unit && (
                            <span className="text-lg text-muted-foreground">
                              {indicator.measurement_unit}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(result.measurement_date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>

                          {result.recorded_by_name && (
                            <Badge variant="outline">
                              Recorded by: {result.recorded_by_name}
                            </Badge>
                          )}
                        </div>

                        {(result.group_name || result.team_name) && (
                          <div className="flex items-center gap-2">
                            {result.group_name && (
                              <Badge variant="secondary">{result.group_name}</Badge>
                            )}
                            {result.team_name && (
                              <Badge variant="secondary">{result.team_name}</Badge>
                            )}
                          </div>
                        )}
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleShareResult(result.id)}
                        className="gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Share Result
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}