import React from 'react';
import { vehicles, users } from '@/data/dummyData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Truck, Plus } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';

const DummyVehicles = () => {
  const getUserName = (userId) => {
    return users.find(u => u.id === userId)?.name || 'Unassigned';
  };

  return (
    <div className="space-y-6" data-testid="vehicles-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="vehicles-title">VEHICLES</h1>
          <p className="text-sm text-muted-foreground">Manage fleet safety and vehicle incidents</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="add-vehicle-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Vehicle
        </Button>
      </div>

      <Card className="tactical-shadow">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="vehicles-table">
              <thead className="border-b-2 border-border">
                <tr>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Vehicle</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Plate Number</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Assigned Driver</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Mileage</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Last Inspection</th>
                  <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Incidents</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle, index) => (
                  <tr
                    key={vehicle.id}
                    className={`border-b border-border hover:bg-muted/30 transition-colors ${index % 2 === 0 ? 'bg-muted/10' : ''}`}
                    data-testid={`vehicle-row-${vehicle.id}`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold text-sm">{vehicle.make} {vehicle.model}</p>
                          <p className="text-xs text-muted-foreground">{vehicle.year} • {vehicle.type.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <code className="px-2 py-1 bg-muted rounded text-xs font-mono font-semibold">{vehicle.plate_number}</code>
                    </td>
                    <td className="py-3 px-4 text-sm">{getUserName(vehicle.assigned_driver)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(vehicle.status)} className="text-xs uppercase">
                        {vehicle.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{vehicle.mileage.toLocaleString()} km</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{formatDate(vehicle.last_inspection)}</td>
                    <td className="py-3 px-4">
                      <Badge variant={vehicle.incidents_count > 0 ? 'destructive' : 'success'} className="text-xs">
                        {vehicle.incidents_count}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DummyVehicles;