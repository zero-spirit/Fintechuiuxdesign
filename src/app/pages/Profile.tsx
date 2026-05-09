import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { User, Mail, Phone, Shield, Bell, CreditCard, LogOut } from "lucide-react";

export function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-white">JD</span>
                </div>
                <h3 className="text-xl font-bold mb-1">John Doe</h3>
                <p className="text-sm text-muted-foreground mb-3">john.doe@example.com</p>
                <Badge variant="success">Pro Member</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Member Since</span>
                    <span className="text-sm font-medium">Jan 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Portfolio Value</span>
                    <span className="text-sm font-medium">₹2.1L</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Returns</span>
                    <span className="text-sm font-medium text-success">+16.7%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      defaultValue="John"
                    />
                    <Input
                      label="Last Name"
                      defaultValue="Doe"
                    />
                  </div>
                  <Input
                    label="Email"
                    type="email"
                    defaultValue="john.doe@example.com"
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    defaultValue="+91 98765 43210"
                  />
                  <Button variant="primary">Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Change Password</label>
                    <div className="space-y-3">
                      <Input
                        type="password"
                        placeholder="Current password"
                      />
                      <Input
                        type="password"
                        placeholder="New password"
                      />
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <Button variant="primary">Update Security</Button>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: "Price Alerts", description: "Get notified when stock prices change" },
                    { label: "IPO Notifications", description: "Alerts for new and upcoming IPOs" },
                    { label: "Market News", description: "Daily market news and insights" },
                    { label: "Portfolio Updates", description: "Updates about your portfolio performance" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked={index < 2}
                        className="w-5 h-5 rounded border-border"
                      />
                    </div>
                  ))}
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Subscription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                    <p className="text-2xl font-bold">Pro Plan</p>
                    <p className="text-sm text-muted-foreground">₹999/month</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">Change Plan</Button>
                  <Button variant="destructive" className="flex-1">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>

            {/* Logout */}
            <Card>
              <CardContent className="pt-6">
                <Button variant="destructive" className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
