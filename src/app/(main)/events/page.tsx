'use client'
import { useEffect, useState } from 'react';
import  EventCard  from '../../../components/EventCard'
import { IEventRead } from '@/types/IEvents';
import { useFirebase } from '@/contexts/FirebaseContext';

function EventsPage() {
    
        const { getEvents } = useFirebase();
        const [events, setEvents] = useState<IEventRead[]>([]);
    
        useEffect(() => {
            getEvents().then((events) => {
                setEvents(events);
                console.log(events);
            });
        }, [getEvents]);
    
        return (
            <div>
                <h1>Events</h1>
                <ul>
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </ul>
            </div>
        );
};

export default EventsPage;