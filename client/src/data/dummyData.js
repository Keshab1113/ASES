// Comprehensive dummy data for ASES platform

export const users = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@ases.com',
    role: 'super_admin',
    group_id: null,
    team_id: null,
    status: 'active',
    created_at: '2024-01-01'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@acmecorp.com',
    role: 'group_admin',
    group_id: '1',
    team_id: null,
    status: 'active',
    created_at: '2024-01-15'
  },
  {
    id: '3',
    name: 'Mike Williams',
    email: 'mike.williams@acmecorp.com',
    role: 'team_admin',
    group_id: '1',
    team_id: '1',
    status: 'active',
    created_at: '2024-02-01'
  },
  {
    id: '4',
    name: 'Emma Davis',
    email: 'emma.davis@acmecorp.com',
    role: 'employee',
    group_id: '1',
    team_id: '1',
    status: 'active',
    created_at: '2024-02-10'
  },
  {
    id: '5',
    name: 'James Brown',
    email: 'james.brown@acmecorp.com',
    role: 'employee',
    group_id: '1',
    team_id: '1',
    status: 'pending',
    created_at: '2024-03-01'
  }
];

export const groups = [
  {
    id: '1',
    name: 'Acme Corporation',
    code: 'ACME2024',
    status: 'active',
    created_by: '2',
    created_at: '2024-01-15',
    employee_count: 250,
    team_count: 5
  },
  {
    id: '2',
    name: 'Industrial Solutions Inc',
    code: 'ISI2024',
    status: 'active',
    created_by: '6',
    created_at: '2024-02-01',
    employee_count: 180,
    team_count: 4
  }
];

export const teams = [
  {
    id: '1',
    group_id: '1',
    name: 'Manufacturing Plant A',
    code: 'MPA001',
    status: 'active',
    created_by: '3',
    created_at: '2024-02-01',
    employee_count: 45
  },
  {
    id: '2',
    group_id: '1',
    name: 'Warehouse Operations',
    code: 'WHO001',
    status: 'active',
    created_by: '3',
    created_at: '2024-02-05',
    employee_count: 32
  },
  {
    id: '3',
    group_id: '1',
    name: 'Construction Site B',
    code: 'CSB001',
    status: 'active',
    created_by: '3',
    created_at: '2024-02-10',
    employee_count: 28
  }
];

export const incidents = [
  {
    id: 'INC-001',
    title: 'Slip and Fall in Warehouse',
    description: 'Employee slipped on wet floor near loading dock',
    type: 'injury',
    severity: 'medium',
    risk_score: 6.5,
    ai_confidence: 0.92,
    status: 'in_progress',
    reported_by: '4',
    group_id: '1',
    team_id: '2',
    location: 'Warehouse B, Loading Dock 3',
    date_occurred: '2025-01-05T14:30:00',
    reported_at: '2025-01-05T14:45:00',
    leading_indicator: false,
    lagging_indicator: true,
    evidence_urls: ['https://example.com/evidence1.jpg'],
    root_cause: 'Floor was wet from recent cleaning, no warning sign posted'
  },
  {
    id: 'INC-002',
    title: 'Near Miss - Forklift Collision',
    description: 'Forklift nearly collided with pedestrian in blind corner',
    type: 'near_miss',
    severity: 'high',
    risk_score: 8.2,
    ai_confidence: 0.88,
    status: 'open',
    reported_by: '4',
    group_id: '1',
    team_id: '1',
    location: 'Manufacturing Floor, Aisle 7',
    date_occurred: '2025-01-10T09:15:00',
    reported_at: '2025-01-10T09:30:00',
    leading_indicator: true,
    lagging_indicator: false,
    evidence_urls: [],
    root_cause: null
  },
  {
    id: 'INC-003',
    title: 'Chemical Spill Contained',
    description: 'Small chemical spill quickly contained by team',
    type: 'environmental',
    severity: 'low',
    risk_score: 3.5,
    ai_confidence: 0.95,
    status: 'closed',
    reported_by: '4',
    group_id: '1',
    team_id: '1',
    location: 'Chemical Storage Room',
    date_occurred: '2025-01-08T11:00:00',
    reported_at: '2025-01-08T11:15:00',
    leading_indicator: false,
    lagging_indicator: true,
    evidence_urls: ['https://example.com/evidence2.jpg', 'https://example.com/evidence3.pdf'],
    root_cause: 'Container valve not properly sealed'
  }
];

export const tasks = [
  {
    id: 'TASK-001',
    title: 'Install warning signs in warehouse',
    description: 'Place wet floor signs near loading docks and cleaning areas',
    type: 'corrective_action',
    priority: 'high',
    status: 'in_progress',
    assigned_to: '3',
    assigned_by: '2',
    related_incident: 'INC-001',
    group_id: '1',
    team_id: '2',
    created_at: '2025-01-05T15:00:00',
    due_date: '2025-01-12T17:00:00',
    completed_at: null,
    evidence_urls: []
  },
  {
    id: 'TASK-002',
    title: 'Conduct forklift safety refresher training',
    description: 'Mandatory training for all forklift operators on blind spot awareness',
    type: 'training',
    priority: 'critical',
    status: 'open',
    assigned_to: '3',
    assigned_by: '2',
    related_incident: 'INC-002',
    group_id: '1',
    team_id: '1',
    created_at: '2025-01-10T10:00:00',
    due_date: '2025-01-15T17:00:00',
    completed_at: null,
    evidence_urls: []
  },
  {
    id: 'TASK-003',
    title: 'Inspect all chemical storage valves',
    description: 'Complete inspection of all containers in chemical storage',
    type: 'inspection',
    priority: 'medium',
    status: 'completed',
    assigned_to: '4',
    assigned_by: '3',
    related_incident: 'INC-003',
    group_id: '1',
    team_id: '1',
    created_at: '2025-01-08T12:00:00',
    due_date: '2025-01-10T17:00:00',
    completed_at: '2025-01-09T16:30:00',
    evidence_urls: ['https://example.com/inspection-report.pdf']
  }
];

export const trainings = [
  {
    id: 'TRN-001',
    title: 'Forklift Operation Safety',
    description: 'Comprehensive forklift safety training including blind spot awareness',
    type: 'certification',
    duration_hours: 8,
    valid_months: 24,
    is_mandatory: true,
    status: 'active',
    created_by: '2',
    created_at: '2024-01-20'
  },
  {
    id: 'TRN-002',
    title: 'Hazardous Material Handling',
    description: 'Safe handling and storage of hazardous materials',
    type: 'certification',
    duration_hours: 6,
    valid_months: 12,
    is_mandatory: true,
    status: 'active',
    created_by: '2',
    created_at: '2024-01-25'
  },
  {
    id: 'TRN-003',
    title: 'Workplace Safety Awareness',
    description: 'General workplace safety principles and practices',
    type: 'awareness',
    duration_hours: 2,
    valid_months: 12,
    is_mandatory: true,
    status: 'active',
    created_by: '2',
    created_at: '2024-02-01'
  }
];

export const trainingAssignments = [
  {
    id: 'TA-001',
    training_id: 'TRN-001',
    user_id: '4',
    assigned_by: '3',
    assigned_at: '2025-01-10',
    due_date: '2025-01-25',
    status: 'in_progress',
    completion_date: null,
    score: null,
    certificate_url: null
  },
  {
    id: 'TA-002',
    training_id: 'TRN-002',
    user_id: '4',
    assigned_by: '3',
    assigned_at: '2024-12-01',
    due_date: '2024-12-20',
    status: 'completed',
    completion_date: '2024-12-18',
    score: 95,
    certificate_url: 'https://example.com/cert-002.pdf'
  },
  {
    id: 'TA-003',
    training_id: 'TRN-003',
    user_id: '5',
    assigned_by: '3',
    assigned_at: '2025-01-05',
    due_date: '2025-01-12',
    status: 'pending',
    completion_date: null,
    score: null,
    certificate_url: null
  }
];

export const inspections = [
  {
    id: 'INSP-001',
    title: 'Monthly Safety Walk - Manufacturing',
    type: 'safety_walk',
    status: 'completed',
    inspector_id: '3',
    group_id: '1',
    team_id: '1',
    location: 'Manufacturing Plant A',
    scheduled_date: '2025-01-05',
    completed_date: '2025-01-05',
    score: 85,
    findings_count: 3,
    critical_findings: 0,
    findings: [
      { item: 'Fire extinguisher inspection tag expired', severity: 'medium', action_required: true },
      { item: 'Emergency exit partially blocked', severity: 'high', action_required: true },
      { item: 'PPE compliance observed at 95%', severity: 'low', action_required: false }
    ]
  },
  {
    id: 'INSP-002',
    title: 'Equipment Safety Inspection - Warehouse',
    type: 'equipment',
    status: 'in_progress',
    inspector_id: '3',
    group_id: '1',
    team_id: '2',
    location: 'Warehouse Operations',
    scheduled_date: '2025-01-12',
    completed_date: null,
    score: null,
    findings_count: 0,
    critical_findings: 0,
    findings: []
  }
];

export const jsas = [
  {
    id: 'JSA-001',
    job_title: 'Overhead Crane Operation',
    location: 'Manufacturing Plant A',
    prepared_by: '3',
    group_id: '1',
    team_id: '1',
    status: 'approved',
    version: '2.1',
    created_at: '2024-11-15',
    approved_at: '2024-11-20',
    approved_by: '2',
    next_review: '2025-11-15',
    hazards: [
      {
        step: 'Pre-operation inspection',
        hazard: 'Equipment failure',
        risk_level: 'high',
        controls: ['Daily inspection checklist', 'Lockout/tagout procedures']
      },
      {
        step: 'Lifting operations',
        hazard: 'Load drop or swing',
        risk_level: 'critical',
        controls: ['Load calculation', 'Exclusion zone', 'Spotter communication']
      }
    ]
  },
  {
    id: 'JSA-002',
    job_title: 'Confined Space Entry',
    location: 'Warehouse Operations',
    prepared_by: '3',
    group_id: '1',
    team_id: '2',
    status: 'pending_review',
    version: '1.0',
    created_at: '2025-01-08',
    approved_at: null,
    approved_by: null,
    next_review: null,
    hazards: [
      {
        step: 'Atmosphere testing',
        hazard: 'Oxygen deficiency',
        risk_level: 'critical',
        controls: ['Gas monitoring', 'Forced ventilation', 'Rescue plan']
      }
    ]
  }
];

export const equipment = [
  {
    id: 'EQP-001',
    name: 'Overhead Crane #3',
    type: 'crane',
    serial_number: 'CR-2019-0045',
    location: 'Manufacturing Plant A',
    group_id: '1',
    team_id: '1',
    status: 'operational',
    safety_critical: true,
    last_inspection: '2025-01-01',
    next_inspection: '2025-02-01',
    maintenance_due: '2025-01-20'
  },
  {
    id: 'EQP-002',
    name: 'Forklift FL-12',
    type: 'forklift',
    serial_number: 'FL-2020-0112',
    location: 'Warehouse Operations',
    group_id: '1',
    team_id: '2',
    status: 'operational',
    safety_critical: true,
    last_inspection: '2024-12-28',
    next_inspection: '2025-01-28',
    maintenance_due: '2025-02-15'
  },
  {
    id: 'EQP-003',
    name: 'Pressure Vessel PV-08',
    type: 'pressure_vessel',
    serial_number: 'PV-2018-0088',
    location: 'Manufacturing Plant A',
    group_id: '1',
    team_id: '1',
    status: 'maintenance',
    safety_critical: true,
    last_inspection: '2024-11-15',
    next_inspection: '2025-01-15',
    maintenance_due: '2025-01-10'
  }
];

export const vehicles = [
  {
    id: 'VEH-001',
    plate_number: 'ACM-1234',
    type: 'truck',
    make: 'Ford',
    model: 'F-350',
    year: 2022,
    status: 'active',
    assigned_driver: '4',
    group_id: '1',
    team_id: '1',
    last_inspection: '2024-12-15',
    next_inspection: '2025-01-15',
    mileage: 45230,
    incidents_count: 0
  },
  {
    id: 'VEH-002',
    plate_number: 'ACM-5678',
    type: 'van',
    make: 'Toyota',
    model: 'Hiace',
    year: 2021,
    status: 'active',
    assigned_driver: '5',
    group_id: '1',
    team_id: '2',
    last_inspection: '2024-12-20',
    next_inspection: '2025-01-20',
    mileage: 38450,
    incidents_count: 1
  }
];

export const workersComp = [
  {
    id: 'WC-001',
    incident_id: 'INC-001',
    employee_id: '4',
    injury_type: 'Sprain/Strain',
    body_part: 'Lower Back',
    claim_status: 'open',
    claim_number: 'WC-2025-00145',
    filed_date: '2025-01-06',
    lost_workdays: 3,
    medical_cost: 1250.00,
    estimated_total_cost: 3500.00,
    return_to_work_date: null,
    restrictions: 'No lifting over 25 lbs'
  }
];

export const managementActivities = [
  {
    id: 'MA-001',
    type: 'safety_walk',
    title: 'Weekly Safety Walk - Plant A',
    conducted_by: '2',
    group_id: '1',
    team_id: '1',
    date: '2025-01-08',
    duration_minutes: 45,
    participants: ['3', '4'],
    observations: 5,
    positive_feedback: 3,
    issues_identified: 2
  },
  {
    id: 'MA-002',
    type: 'toolbox_talk',
    title: 'Ladder Safety Toolbox Talk',
    conducted_by: '3',
    group_id: '1',
    team_id: '1',
    date: '2025-01-09',
    duration_minutes: 15,
    participants: ['4', '5'],
    observations: 0,
    positive_feedback: 0,
    issues_identified: 0
  }
];

export const safetySuggestions = [
  {
    id: 'SS-001',
    title: 'Install convex mirrors at blind corners',
    description: 'Add safety mirrors to prevent forklift-pedestrian near misses',
    submitted_by: '4',
    group_id: '1',
    team_id: '1',
    category: 'hazard_prevention',
    status: 'approved',
    submitted_at: '2025-01-09',
    reviewed_by: '3',
    reviewed_at: '2025-01-10',
    implementation_status: 'in_progress',
    ai_quality_score: 8.5
  },
  {
    id: 'SS-002',
    title: 'Better lighting in storage area',
    description: 'Increase lighting to improve visibility and reduce trip hazards',
    submitted_by: '5',
    group_id: '1',
    team_id: '2',
    category: 'facility_improvement',
    status: 'under_review',
    submitted_at: '2025-01-11',
    reviewed_by: null,
    reviewed_at: null,
    implementation_status: 'pending',
    ai_quality_score: 7.2
  }
];

export const dashboardStats = {
  incidents: {
    total: 156,
    this_month: 12,
    near_miss: 8,
    injuries: 3,
    environmental: 1,
    avg_risk_score: 5.4,
    leading_indicators: 8,
    lagging_indicators: 4
  },
  tasks: {
    total: 48,
    open: 15,
    in_progress: 12,
    overdue: 3,
    completed_this_month: 18
  },
  training: {
    total_courses: 24,
    assignments: 156,
    in_progress: 23,
    completed_this_month: 34,
    compliance_rate: 87
  },
  inspections: {
    scheduled_this_month: 12,
    completed: 8,
    pending: 4,
    avg_score: 82
  },
  safety_score: {
    overall: 78,
    trend: '+5',
    group_rank: 2,
    industry_benchmark: 72
  }
};