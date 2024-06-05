import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Trip {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
}

export function Trips() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destination, setDestination] = useState('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [nextId, setNextId] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  const resetForm = () => {
    setStartDate('');
    setEndDate('');
    setDestination('');
    setIsEditing(false);
    setEditingTrip(null);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleDestinationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!destination || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }
    if (isEditing && editingTrip) {
      const updatedTrip: Trip = { ...editingTrip, destination, startDate, endDate };
      handleUpdate(updatedTrip);
    } else {
      const newTrip: Trip = { id: nextId, destination, startDate, endDate };
      setTrips([...trips, newTrip]);
      setNextId(nextId + 1);
    }
    resetForm();
  };

  const handleEditTrip = (trip: Trip) => {
    setIsEditing(true);
    setEditingTrip(trip);
    setDestination(trip.destination);
    setStartDate(trip.startDate);
    setEndDate(trip.endDate);

  };

  const handleUpdate = (updatedTrip: Trip) => {
    setTrips(trips.map(trip => (trip.id === updatedTrip.id ? updatedTrip : trip)));
    resetForm();
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = (id: number) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Trip</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>My Upcoming Trips</DialogTitle>
          <DialogDescription>
            Specify the destination and the dates for your trip.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              Destination
              <Input
                id="destination"
                value={destination}
                onChange={handleDestinationChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              Start Date
              <Input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              End Date
              <Input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
          
            <Button type="submit">{isEditing ? 'Update Trip' : 'Add Trip'}</Button>
  
          <DialogClose asChild>
          { <Button onClick={handleCancelEdit}>Cancel</Button>}
          </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
      {trips.length > 0 && (
        <div className="px-4">
          <table className="w-full">
            <thead>
              <tr>
                <th className="py-2">Destination</th>
                <th className="py-2">Start Date</th>
                <th className="py-2">End Date</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="py-2">{trip.destination}</td>
                  <td className="py-2">{trip.startDate}</td>
                  <td className="py-2">{trip.endDate}</td>
                  <td className="py-2">
                  <DialogTrigger asChild>
                    <Button onClick={() => handleEditTrip(trip)}>Edit</Button>
                   </DialogTrigger>
                    <Button onClick={() => handleDelete(trip.id)}>Delete</Button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Dialog>
  );
}
export default Trips;
