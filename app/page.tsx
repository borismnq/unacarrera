"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Navigation, Clock, User, History, CreditCard, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type RideHistory = {
  id: number;
  from: string;
  to: string;
  date: string;
};

const driverOptions = [
  { id: 1, name: "John Doe", rating: 4.8 },
  { id: 2, name: "Jane Smith", rating: 4.9 },
  { id: 3, "Mike Johnson": 4.7 },
];

const paymentMethods = [
  { id: 'card', name: 'Credit Card' },
  { id: 'cash', name: 'Cash' },
  { id: 'paypal', name: 'PayPal' },
];

export default function Home() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [rideHistory, setRideHistory] = useState<RideHistory[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [showMap, setShowMap] = useState(false);
  const { toast } = useToast()

  useEffect(() => {
    // Simulating ride history fetch
    setRideHistory([
      { id: 1, from: "Home", to: "Office", date: "2023-05-01" },
      { id: 2, from: "Office", to: "Gym", date: "2023-05-03" },
      { id: 3, from: "Gym", to: "Home", date: "2023-05-03" },
    ]);
  }, []);

  const handleRequestRide = () => {
    if (pickup && destination && selectedDriver) {
      toast({
        title: "Ride Requested",
        description: `From ${pickup} to ${destination}. Driver ${selectedDriver} will arrive shortly.`,
      })
      // Add to ride history
      setRideHistory(prev => [...prev, { id: Date.now(), from: pickup, to: destination, date: new Date().toISOString().split('T')[0] }]);
    } else {
      toast({
        title: "Error",
        description: "Please enter pickup, destination, and select a driver.",
        variant: "destructive",
      })
    }
  };

  const estimateRide = () => {
    if (pickup && destination) {
      // This is a mock estimation. In a real app, you'd call an API for this.
      setEstimatedTime(Math.floor(Math.random() * 30 + 10) + " minutes");
      setEstimatedCost("$" + (Math.random() * 20 + 10).toFixed(2));
      setShowMap(true);
    }
  };

  const handleScheduleRide = () => {
    if (scheduleDate && scheduleTime) {
      toast({
        title: "Ride Scheduled",
        description: `Your ride has been scheduled for ${scheduleDate} at ${scheduleTime}.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please select a date and time for your scheduled ride.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">InDrive Clone</h1>
      <Tabs defaultValue="request" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="request">Request Ride</TabsTrigger>
          <TabsTrigger value="schedule">Schedule Ride</TabsTrigger>
          <TabsTrigger value="history">Ride History</TabsTrigger>
        </TabsList>
        <TabsContent value="request">
          <Card>
            <CardHeader>
              <CardTitle>Request a Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-400" />
                  <Input
                    placeholder="Pickup Location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="text-gray-400" />
                  <Input
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={estimateRide}>Estimate Ride</Button>
                {estimatedTime && estimatedCost && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center"><Clock className="mr-2" /> {estimatedTime}</span>
                    <span>{estimatedCost}</span>
                  </div>
                )}
                {showMap && (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <p>Map View (Integration Placeholder)</p>
                  </div>
                )}
                <Select onValueChange={setSelectedDriver}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {driverOptions.map(driver => (
                      <SelectItem key={driver.id} value={driver.name}>
                        {driver.name} ({driver.rating})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <RadioGroup defaultValue="card" onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal">PayPal</Label>
                  </div>
                </RadioGroup>
                <Button className="w-full" onClick={handleRequestRide}>Request Ride</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule a Ride</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="text-gray-400" />
                  <Input
                    placeholder="Pickup Location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Navigation className="text-gray-400" />
                  <Input
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="text-gray-400" />
                  <Input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="text-gray-400" />
                  <Input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleScheduleRide}>Schedule Ride</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Ride History</CardTitle>
            </CardHeader>
            <CardContent>
              {rideHistory.map(ride => (
                <div key={ride.id} className="flex justify-between items-center border-b py-2">
                  <div>
                    <p className="font-semibold">{ride.from} to {ride.to}</p>
                    <p className="text-sm text-gray-500">{ride.date}</p>
                  </div>
                  <History className="text-gray-400" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="mt-4">View Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              Your account details and preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="John Doe" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" value="john@example.com" className="col-span-3" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}