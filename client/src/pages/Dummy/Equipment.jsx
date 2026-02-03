import React from 'react';
import { equipment } from '@/data/dummyData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wrench, Plus, AlertCircle } from 'lucide-react';
import { formatDate, getStatusColor } from '@/lib/utils';

const DummyEquipment = () => {
  return (
    <div className="space-y-6" data-testid="equipment-page">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase mb-2" data-testid="equipment-title">EQUIPMENT</h1>
          <p className="text-sm text-muted-foreground">Manage equipment and maintenance safety</p>
        </div>
        <Button className="uppercase tracking-wider font-semibold text-xs" data-testid="add-equipment-btn">
          <Plus className="w-4 h-4 mr-2" />
          Add Equipment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {equipment.map(item => (
          <Card key={item.id} className="tactical-shadow" data-testid={`equipment-card-${item.id}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Wrench className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle className="text-lg font-semibold uppercase">{item.name}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">{item.type.replace('_', ' ').toUpperCase()}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(item.status)} className="text-xs uppercase">
                  {item.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Serial Number</p>
                <code className="text-sm font-mono">{item.serial_number}</code>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Location</p>
                <p className="text-sm">{item.location}</p>
              </div>
              {item.safety_critical && (
                <div className="p-2 bg-destructive/10 border border-destructive/20 rounded-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                  <p className="text-xs text-destructive font-semibold uppercase">Safety Critical Equipment</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Last Inspection</p>
                  <p className="text-sm">{formatDate(item.last_inspection)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Next Due</p>
                  <p className="text-sm">{formatDate(item.next_inspection)}</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full mt-2 uppercase text-xs">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DummyEquipment;