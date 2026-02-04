import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateIndicatorModal({ onClose, onCreate }) {
  const [formData, setFormData] = useState({
    indicator_type: "leading",
    indicator_code: "",
    name: "",
    description: "",
    category: "",
    measurement_unit: "count",
    target_value: 100,
    min_acceptable: 70,
    weight: 1.0,
    severity_weight: 1.0,
    financial_impact_multiplier: 1.0,
  });

  const leadingCategories = [
    "training",
    "inspection",
    "maintenance",
    "safety_meeting",
    "audit",
    "hazard_identification",
    "ppe_compliance",
    "near_miss_reporting",
  ];

  const laggingCategories = [
    "incident",
    "injury",
    "property_damage",
    "near_miss",
    "lost_time_injury",
    "medical_treatment",
    "first_aid",
    "environmental_incident",
  ];

  const measurementUnits = [
    "count",
    "percentage",
    "hours",
    "days",
    "rate",
  ];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  const isLeading = formData.indicator_type === "leading";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Create New Indicator</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Indicator Type */}
          <div className="space-y-2">
            <Label>Indicator Type *</Label>
            <Select
              value={formData.indicator_type}
              onValueChange={(value) => handleChange("indicator_type", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="leading">Leading (Proactive)</SelectItem>
                <SelectItem value="lagging">Lagging (Reactive)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {isLeading
                ? "Leading indicators are proactive measures (e.g., training, inspections)"
                : "Lagging indicators are reactive outcomes (e.g., incidents, injuries)"}
            </p>
          </div>

          {/* Indicator Code */}
          <div className="space-y-2">
            <Label htmlFor="indicator_code">Indicator Code *</Label>
            <Input
              id="indicator_code"
              value={formData.indicator_code}
              onChange={(e) => handleChange("indicator_code", e.target.value)}
              placeholder="e.g., TRAIN_001, INC_001"
              required
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g., Safety Training Completion"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe what this indicator measures..."
              rows={3}
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {(isLeading ? leadingCategories : laggingCategories).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Leading-specific fields */}
          {isLeading && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Measurement Unit</Label>
                  <Select
                    value={formData.measurement_unit}
                    onValueChange={(value) => handleChange("measurement_unit", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {measurementUnits.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                          {unit.replace(/\b\w/g, (l) => l.toUpperCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target_value">Target Value</Label>
                  <Input
                    id="target_value"
                    type="number"
                    min="0"
                    value={formData.target_value}
                    onChange={(e) => handleChange("target_value", parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min_acceptable">Minimum Acceptable</Label>
                  <Input
                    id="min_acceptable"
                    type="number"
                    min="0"
                    value={formData.min_acceptable}
                    onChange={(e) => handleChange("min_acceptable", parseInt(e.target.value))}
                  />
                </div>
              </div>
            </>
          )}

          {/* Lagging-specific fields */}
          {!isLeading && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="severity_weight">Severity Weight</Label>
                <Input
                  id="severity_weight"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.severity_weight}
                  onChange={(e) => handleChange("severity_weight", parseFloat(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Higher values indicate more severe incidents
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="financial_impact">Financial Impact Multiplier</Label>
                <Input
                  id="financial_impact"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.financial_impact_multiplier}
                  onChange={(e) =>
                    handleChange("financial_impact_multiplier", parseFloat(e.target.value))
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Impact on financial calculations
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Indicator
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}