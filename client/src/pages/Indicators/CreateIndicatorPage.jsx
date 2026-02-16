// pages/Indicators/CreateIndicatorPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCreateIndicator } from '../../hooks/useIndicators';

export default function CreateIndicatorPage({ user }) {
  const navigate = useNavigate();
  const createMutation = useCreateIndicator();
  const [formData, setFormData] = useState({
    indicator_type: 'leading',
    indicator_code: '',
    name: '',
    description: '',
    category: '',
    measurement_unit: 'count',
    target_value: 100,
    min_acceptable: 70,
    weight: 1.0,
    severity_weight: 1.0,
    financial_impact_multiplier: 1.0,
  });

  const leadingCategories = [
    'training',
    'inspection',
    'maintenance',
    'safety_meeting',
    'audit',
    'hazard_identification',
    'ppe_compliance',
    'near_miss_reporting',
  ];

  const laggingCategories = [
    'incident',
    'injury',
    'property_damage',
    'near_miss',
    'lost_time_injury',
    'medical_treatment',
    'first_aid',
    'environmental_incident',
  ];

  const measurementUnits = ['count', 'percentage', 'hours', 'days', 'rate'];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMutation.mutateAsync(formData);
    navigate('/app/indicators-dashboard');
  };

  const isLeading = formData.indicator_type === 'leading';

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => navigate('/app/indicators-dashboard')} className="gap-2">
        <ArrowLeft className="w-4 h-4" />
        Back to Indicators
      </Button>

      <div>
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-emerald-600 bg-clip-text text-transparent">
          Create New Safety Indicator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Define a new leading or lagging indicator to track safety performance
        </p>
      </div>

      {createMutation.isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {createMutation.error?.response?.data?.message || 'Failed to create indicator'}
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Indicator Details</CardTitle>
            <CardDescription>
              Fill in the information below to create a new safety indicator
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Indicator Type */}
            <div className="space-y-2">
              <Label htmlFor="indicator_type" className="text-base font-semibold">
                Indicator Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.indicator_type}
                onValueChange={(value) => handleChange('indicator_type', value)}
              >
                <SelectTrigger id="indicator_type" className="w-full md:w-1/2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leading">
                    <div className="flex flex-col">
                      <span>Leading (Proactive)</span>
                      <span className="text-xs text-muted-foreground">
                        Measures preventive actions (training, inspections, audits)
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="lagging">
                    <div className="flex flex-col">
                      <span>Lagging (Reactive)</span>
                      <span className="text-xs text-muted-foreground">
                        Measures outcomes (incidents, injuries, near misses)
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Indicator Code */}
              <div className="space-y-2">
                <Label htmlFor="indicator_code" className="text-base font-semibold">
                  Indicator Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="indicator_code"
                  value={formData.indicator_code}
                  onChange={(e) => handleChange('indicator_code', e.target.value)}
                  placeholder="e.g., TRAIN_001, INC_001"
                  required
                />
                <p className="text-xs text-muted-foreground">Unique identifier for this indicator</p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-semibold">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(isLeading ? leadingCategories : laggingCategories).map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Indicator Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="e.g., Safety Training Completion Rate"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Describe what this indicator measures, how it's calculated, and why it's important..."
                rows={4}
                required
              />
            </div>

            {/* Leading-specific fields */}
            {isLeading && (
              <>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <h3 className="text-lg font-semibold mb-4">Leading Indicator Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="measurement_unit">Measurement Unit</Label>
                      <Select
                        value={formData.measurement_unit}
                        onValueChange={(value) => handleChange('measurement_unit', value)}
                      >
                        <SelectTrigger id="measurement_unit">
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
                      <Label htmlFor="weight">Weight (Impact Factor)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={formData.weight}
                        onChange={(e) => handleChange('weight', parseFloat(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        How much this indicator contributes to overall safety score (0-10)
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="target_value">Target Value</Label>
                      <Input
                        id="target_value"
                        type="number"
                        min="0"
                        value={formData.target_value}
                        onChange={(e) => handleChange('target_value', parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">Desired value to achieve</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="min_acceptable">Minimum Acceptable Value</Label>
                      <Input
                        id="min_acceptable"
                        type="number"
                        min="0"
                        value={formData.min_acceptable}
                        onChange={(e) => handleChange('min_acceptable', parseInt(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Threshold that triggers alerts if not met
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Lagging-specific fields */}
            {!isLeading && (
              <>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <h3 className="text-lg font-semibold mb-4">Lagging Indicator Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="severity_weight">Severity Weight</Label>
                      <Input
                        id="severity_weight"
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={formData.severity_weight}
                        onChange={(e) => handleChange('severity_weight', parseFloat(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Higher values indicate more severe incidents (0-10)
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
                          handleChange('financial_impact_multiplier', parseFloat(e.target.value))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Multiplier for cost calculations (e.g., 1.5x for lost time)
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>

          <CardFooter className="flex justify-end gap-3 border-t border-slate-200 dark:border-slate-700 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/app/indicators-dashboard')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending} className="gap-2">
              {createMutation.isPending ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Create Indicator
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}