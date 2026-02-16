// components/SystemAdministration/PermissionChecker.jsx
import { useEffect } from "react";
import { useCheckPermission } from "../../hooks/useRBAC";
import { Loader2 } from "lucide-react";

/**
 * Permission Checker Component
 * Conditionally renders children based on user permissions
 * 
 * Usage:
 * <PermissionChecker permission="create_indicators">
 *   <Button>Create Indicator</Button>
 * </PermissionChecker>
 * 
 * Multiple permissions (any):
 * <PermissionChecker permissions={["create_indicators", "edit_indicators"]}>
 *   <Button>Manage Indicators</Button>
 * </PermissionChecker>
 * 
 * Multiple permissions (all required):
 * <PermissionChecker permissions={["create_indicators", "edit_indicators"]} requireAll={true}>
 *   <Button>Full Management</Button>
 * </PermissionChecker>
 */
export default function PermissionChecker({ 
  permission, 
  permissions = [], 
  requireAll = false, 
  children,
  fallback = null,
  showLoading = false
}) {
  // Get user from token
  const token = localStorage.getItem("token");
  let userId = null;
  
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Build list of permissions to check
  const permsToCheck = permission ? [permission] : permissions;

  // Check each permission
  const results = permsToCheck.map(perm => 
    useCheckPermission(userId, perm)
  );

  const isLoading = results.some(r => r.isLoading);
  const hasPermission = requireAll
    ? results.every(r => r.data === true)
    : results.some(r => r.data === true);

  if (isLoading && showLoading) {
    return (
      <div className="flex items-center justify-center h-8">
        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
      </div>
    );
  }

  if (isLoading && !showLoading) {
    return fallback;
  }

  return hasPermission ? children : fallback;
}