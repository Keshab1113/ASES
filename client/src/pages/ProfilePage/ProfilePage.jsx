import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield, 
  Lock, 
  Bell, 
  Globe, 
  Award,
  Activity,
  FileText,
  Download,
  Eye,
  EyeOff,
  Key,
  Smartphone,
  CheckCircle,
  Edit2,
  Save,
  X,
  Camera,
  Briefcase,
  Building,
  Users,
  Clock,
  TrendingUp,
  BarChart3,
  Target
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfilePage({ user: initialUser }) {
  const [user, setUser] = useState({
    ...initialUser,
    name: "Alex Johnson",
    email: "alex.johnson@company.com",
    phone: "+1 (555) 123-4567",
    position: "Senior Safety Officer",
    department: "Safety & Compliance",
    location: "San Francisco, CA",
    employeeId: "EMP-02345",
    joinDate: "2022-03-15",
    role: "team_admin",
    avatar: null,
    bio: "Dedicated safety professional with 8+ years of experience in manufacturing safety management. Passionate about creating safer workplaces through technology and training.",
    emergencyContact: {
      name: "Sarah Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 987-6543"
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: true,
    weeklyReports: true,
    securityAlerts: true,
    teamUpdates: false,
    systemMaintenance: true
  });

  // Activity logs
  const activityLogs = [
    { id: 1, action: "Login", description: "Logged in from Chrome on Windows", timestamp: "2 hours ago", ip: "192.168.1.100" },
    { id: 2, action: "Password Changed", description: "Password updated successfully", timestamp: "1 day ago", ip: "192.168.1.100" },
    { id: 3, action: "Report Created", description: "Created Monthly Safety Report", timestamp: "2 days ago", ip: "192.168.1.101" },
    { id: 4, action: "Training Completed", description: "Completed Fire Safety Training", timestamp: "1 week ago", ip: "192.168.1.102" },
    { id: 5, action: "Mobile Login", description: "Logged in from ASES Mobile App", timestamp: "2 weeks ago", ip: "192.168.1.103" }
  ];

  // Safety metrics
  const safetyMetrics = [
    { label: "Safety Score", value: 87, target: 90, trend: "up" },
    { label: "Training Completion", value: 92, target: 95, trend: "up" },
    { label: "Incidents Reported", value: 5, target: 3, trend: "down" },
    { label: "Compliance Rate", value: 94, target: 95, trend: "up" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // In real app: API call to save user data
    console.log("Saving user data:", user);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role) => {
    const roles = {
      employee: { label: "Employee", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300" },
      team_admin: { label: "Team Admin", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" },
      group_admin: { label: "Group Admin", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300" },
      super_admin: { label: "Super Admin", color: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300" }
    };
    
    const roleInfo = roles[role] || roles.employee;
    return (
      <Badge className={`${roleInfo.color} font-medium`}>
        {roleInfo.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 ">
        <div className="container mx-auto px-0 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white dark:border-slate-800 shadow-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-sky-500 to-emerald-500 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-md">
                  <Camera className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {user.name}
                  </h1>
                  {getRoleBadge(user.role)}
                </div>
                <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {user.position} • {user.department}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {user.employeeId}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Joined {new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <Button onClick={handleCancel} variant="outline" className="gap-2">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gap-2 bg-gradient-to-r from-sky-600 to-emerald-600">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-0 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Overview & Stats */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-600" />
                  Profile Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500">Phone</p>
                      {isEditing ? (
                        <Input 
                          value={user.phone} 
                          onChange={(e) => setUser({...user, phone: e.target.value})}
                          className="h-8"
                        />
                      ) : (
                        <p className="font-medium">{user.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      {isEditing ? (
                        <Input 
                          value={user.location} 
                          onChange={(e) => setUser({...user, location: e.target.value})}
                          className="h-8"
                        />
                      ) : (
                        <p className="font-medium">{user.location}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Emergency Contact */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    Emergency Contact
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Name</span>
                      <span className="font-medium">{user.emergencyContact.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Relationship</span>
                      <span>{user.emergencyContact.relationship}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">Phone</span>
                      <span className="font-medium">{user.emergencyContact.phone}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Performance */}
            <Card className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  Safety Performance
                </CardTitle>
                <CardDescription>Your personal safety metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {safetyMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {metric.value}
                          {metric.label.includes('Score') || metric.label.includes('Completion') || metric.label.includes('Rate') ? '%' : ''}
                        </span>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Progress value={metric.value} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Current</span>
                        <span>Target: {metric.target}{metric.label.includes('Score') || metric.label.includes('Completion') || metric.label.includes('Rate') ? '%' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full gap-2">
                  <BarChart3 className="w-4 h-4" />
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>

            {/* Security Status */}
            <Card className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border-sky-200 dark:border-sky-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-sky-600" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Two-Factor Authentication</span>
                    <Badge variant="success" className="gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Password Strength</span>
                    <Badge variant="success">Strong</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Last Password Change</span>
                    <span className="text-sm text-slate-500">14 days ago</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Key className="w-4 h-4" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle & Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6 ">
              <TabsList className="grid grid-cols-4 w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                <TabsTrigger value="personal" className="gap-2">
                  <User className="w-4 h-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="security" className="gap-2">
                  <Lock className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <Activity className="w-4 h-4" />
                  Activity
                </TabsTrigger>
              </TabsList>

              {/* Personal Tab */}
              <TabsContent value="personal" className="space-y-6">
                <Card className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-purple-600" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal details and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        {isEditing ? (
                          <Input 
                            id="fullName"
                            value={user.name}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{user.name}</div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        {isEditing ? (
                          <Input 
                            id="position"
                            value={user.position}
                            onChange={(e) => setUser({...user, position: e.target.value})}
                          />
                        ) : (
                          <div className="p-2 border rounded-md">{user.position}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        {isEditing ? (
                          <Select 
                            value={user.department}
                            onValueChange={(value) => setUser({...user, department: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Safety & Compliance">Safety & Compliance</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="HR">Human Resources</SelectItem>
                              <SelectItem value="Management">Management</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="p-2 border rounded-md">{user.department}</div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <div className="p-2 border rounded-md">{user.employeeId}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      {isEditing ? (
                        <Textarea 
                          id="bio"
                          value={user.bio}
                          onChange={(e) => setUser({...user, bio: e.target.value})}
                          rows={4}
                          placeholder="Tell us about yourself..."
                        />
                      ) : (
                        <div className="p-3 border rounded-md bg-slate-50 dark:bg-slate-900">
                          {user.bio}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select defaultValue="pst">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                            <SelectItem value="est">Eastern Time (EST)</SelectItem>
                            <SelectItem value="cst">Central Time (CST)</SelectItem>
                            <SelectItem value="gmt">GMT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-red-600" />
                      Account Security
                    </CardTitle>
                    <CardDescription>
                      Manage your password and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Change Password
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="relative">
                            <Input 
                              id="currentPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter current password"
                            />
                            <button 
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                          />
                        </div>
                        <Button className="gap-2">
                          <Save className="w-4 h-4" />
                          Update Password
                        </Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        Two-Factor Authentication
                      </h4>
                      <div className="flex items-center justify-between p-4 rounded-lg border bg-slate-50 dark:bg-slate-900">
                        <div className="space-y-1">
                          <p className="font-medium">Authenticator App</p>
                          <p className="text-sm text-slate-500">Use Google Authenticator or similar app</p>
                        </div>
                        <Badge variant="success" className="gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Enabled
                        </Badge>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Key className="w-4 h-4" />
                        Manage 2FA Settings
                      </Button>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Active Sessions
                      </h4>
                      <div className="space-y-3">
                        {[
                          { device: "Chrome on Windows", location: "San Francisco, CA", lastActive: "Now", current: true },
                          { device: "Safari on iPhone", location: "San Francisco, CA", lastActive: "2 hours ago", current: false },
                          { device: "Firefox on Mac", location: "New York, NY", lastActive: "1 week ago", current: false }
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="space-y-1">
                              <p className="font-medium flex items-center gap-2">
                                {session.device}
                                {session.current && (
                                  <Badge variant="outline" className="text-xs">Current</Badge>
                                )}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-slate-500">
                                <span>{session.location}</span>
                                <span>•</span>
                                <span>Last active: {session.lastActive}</span>
                              </div>
                            </div>
                            {!session.current && (
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                Revoke
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-amber-600" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to be notified
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Email Notifications</h4>
                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <div className="space-y-1">
                              <p className="font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </p>
                              <p className="text-sm text-slate-500">
                                {key === 'emailAlerts' && "Receive immediate email alerts for safety incidents"}
                                {key === 'pushNotifications' && "Push notifications for urgent matters"}
                                {key === 'weeklyReports' && "Weekly safety performance reports"}
                                {key === 'securityAlerts' && "Security and login alerts"}
                                {key === 'teamUpdates' && "Team activity and updates"}
                                {key === 'systemMaintenance' && "System maintenance notifications"}
                              </p>
                            </div>
                            <Switch 
                              checked={value}
                              onCheckedChange={() => handleNotificationChange(key)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h4 className="font-semibold">Notification Schedule</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Quiet Hours Start</Label>
                          <Select defaultValue="21:00">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="20:00">8:00 PM</SelectItem>
                              <SelectItem value="21:00">9:00 PM</SelectItem>
                              <SelectItem value="22:00">10:00 PM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Quiet Hours End</Label>
                          <Select defaultValue="07:00">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="06:00">6:00 AM</SelectItem>
                              <SelectItem value="07:00">7:00 AM</SelectItem>
                              <SelectItem value="08:00">8:00 AM</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Recent Activity
                    </CardTitle>
                    <CardDescription>
                      Your account activity and access logs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityLogs.map((log) => (
                        <div key={log.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium">{log.action}</p>
                              <span className="text-sm text-slate-500">{log.timestamp}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{log.description}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span>IP: {log.ip}</span>
                              <span>•</span>
                              <span>Status: Verified</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <div className="flex items-center justify-between w-full">
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export Activity Logs
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        View Full History
                      </Button>
                    </div>
                    <div className="text-center text-sm text-slate-500 w-full">
                      Activity logs are retained for 90 days for security purposes
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}