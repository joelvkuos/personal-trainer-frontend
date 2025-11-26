import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import type { View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import type { Training } from '../types';
import { fetchTrainings } from '../services/api';

const locales = {
    'en-US': enUS
};

const formats = {
    dateFormat: 'dd',
    dayFormat: 'EEE dd.MM',
    weekdayFormat: 'EEEE',
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
        return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
    },
    agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
        return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
    },
    dayHeaderFormat: (date: Date) => format(date, 'EEEE dd.MM.yyyy'),
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
        return `${format(start, 'dd.MM.yyyy')} - ${format(end, 'dd.MM.yyyy')}`;
    },
    monthHeaderFormat: (date: Date) => format(date, 'MMMM yyyy'),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    resource?: Training;
}

function CalendarPage() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [view, setView] = useState<View>('week');

    useEffect(() => {
        fetchTrainings()
            .then(trainings => {
                const calendarEvents = trainings.map(training => {
                    const startDate = new Date(training.date);
                    const endDate = new Date(startDate.getTime() + training.duration * 60000);

                    return {
                        title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
                        start: startDate,
                        end: endDate,
                        resource: training,
                    };
                });
                setEvents(calendarEvents);
            })
            .catch(error => console.error('Error fetching trainings:', error));
    }, []);
    return (
        <div style={{ height: '80vh', padding: '1rem' }}>
            <h1>Training Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor='start'
                endAccessor='end'
                style={{ height: '100%' }}
                views={['month', 'week', 'day']}
                view={view}
                onView={(newView) => setView(newView)}
                formats={formats}
            />
        </div>
    );
}

export default CalendarPage;