import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getRiskColor(score) {
  if (score >= 7) return 'destructive';
  if (score >= 4) return 'accent';
  return 'success';
}

export function getRiskLabel(score) {
  if (score >= 7) return 'High Risk';
  if (score >= 4) return 'Medium Risk';
  return 'Low Risk';
}

export function getStatusColor(status) {
  const colors = {
    'open': 'destructive',
    'in_progress': 'accent',
    'completed': 'success',
    'closed': 'muted',
    'pending': 'accent',
    'approved': 'success',
    'rejected': 'destructive',
    'active': 'success',
    'inactive': 'muted'
  };
  return colors[status] || 'muted';
}

export function calculateSLAStatus(dueDate) {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due - now;
  const hours = diff / (1000 * 60 * 60);
  
  if (hours < 0) return { status: 'overdue', color: 'destructive', label: 'Overdue' };
  if (hours < 24) return { status: 'urgent', color: 'accent', label: 'Due Soon' };
  return { status: 'ontrack', color: 'success', label: 'On Track' };
}