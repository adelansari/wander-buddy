import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AddTrip from '../custom/trips/AddTrip';
import DisplayTrip from '../custom/trips/DisplayTrip';

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
    setIsDialogOpen(false);
  };

  const handleEditTrip = (trip: Trip) => {
    setIsEditing(true);
    setEditingTrip(trip);
    setDestination(trip.destination);
    setStartDate(trip.startDate);
    setEndDate(trip.endDate);
    setIsDialogOpen(true);
  };

  const handleUpdate = (updatedTrip: Trip) => {
    setTrips(trips.map(trip => (trip.id === updatedTrip.id ? updatedTrip : trip)));
    resetForm();
    setIsDialogOpen(false);
  };

  const handleCancelEdit = () => {
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    setTrips(trips.filter(trip => trip.id !== id));
  };

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsDialogOpen(open);
  };

  return (
    <>
      <AddTrip />
      <DisplayTrip />
      <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Trip</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Trip' : 'Add New Trip'}</DialogTitle>
            <DialogDescription>
              Specify the destination and the dates for your trip.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="destination" className="col-span-1">Destination</label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={handleDestinationChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="startDate" className="col-span-1">Start Date</label>
                <Input
                  type="date"
                  id="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="endDate" className="col-span-1">End Date</label>
                <Input
                  type="date"
                  id="endDate"
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
                <Button type="button" onClick={handleCancelEdit}>Cancel</Button>
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
    </>
  );
}

export default Trips;
