// components/common/DeleteConfirmationModal.variants.jsx
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Trash2,
  Archive,
  Ban,
  UserX,
  XCircle,
  Loader2,
} from "lucide-react";

const variants = {
  destructive: {
    icon: Trash2,
    iconColor: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    buttonVariant: "destructive",
    buttonText: "Delete",
  },
  archive: {
    icon: Archive,
    iconColor: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-900/20",
    buttonVariant: "default",
    buttonText: "Archive",
  },
  deactivate: {
    icon: Ban,
    iconColor: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-900/20",
    buttonVariant: "default",
    buttonText: "Deactivate",
  },
  remove: {
    icon: UserX,
    iconColor: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/20",
    buttonVariant: "destructive",
    buttonText: "Remove",
  },
  cancel: {
    icon: XCircle,
    iconColor: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800",
    buttonVariant: "outline",
    buttonText: "Cancel",
  },
};

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  itemName,
  itemDetails,
  isLoading = false,
  cancelText = "Cancel",
  variant = "destructive", // destructive, archive, deactivate, remove, cancel
  additionalInfo,
}) {
  const Icon = variants[variant]?.icon || AlertTriangle;
  const iconColor =
    variants[variant]?.iconColor || "text-red-600 dark:text-red-400";
  const bgColor = variants[variant]?.bgColor || "bg-red-100 dark:bg-red-900/20";
  const buttonVariant = variants[variant]?.buttonVariant || "destructive";
  const confirmText = variants[variant]?.buttonText || "Confirm";

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-full ${bgColor}`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <AlertDialogTitle className="text-xl">{title}</AlertDialogTitle>
          </div>

          <AlertDialogDescription className="text-base">
            {description}
          </AlertDialogDescription>

          {itemName && (
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 w-full">
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {itemName}
              </p>
              {itemDetails && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {itemDetails}
                </p>
              )}
            </div>
          )}

          {additionalInfo && (
            <div
              className={`mt-2 text-sm p-3 rounded-lg border ${
                variant === "destructive"
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                  : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
              }`}
            >
              <p className="font-medium">⚠️ Important</p>
              <p className="text-xs mt-1">{additionalInfo}</p>
            </div>
          )}

          {variant === "destructive" && !additionalInfo && (
            <div className="mt-2 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="font-medium">⚠️ Warning</p>
              <p className="text-xs mt-1">
                This action is permanent and cannot be undone. All associated
                data will be permanently removed.
              </p>
            </div>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2 sm:gap-4">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
              className="min-w-[100px]"
            >
              {cancelText}
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              variant={buttonVariant}
              onClick={onConfirm}
              disabled={isLoading}
              className={`min-w-[100px] ${
                buttonVariant === "destructive"
                  ? "bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
                  : buttonVariant === "default" && variant === "archive"
                    ? "bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700"
                    : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
