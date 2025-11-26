import { useEffect, useState } from 'react';
import { fetchTrainings } from '../services/api';
import { groupBy, sumBy } from 'lodash';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StatisticData {
    activity: string;
    duration: number;
}

function Statistics() {
    const [chartData, setChartData] = useState<StatisticData[]>([]);


    useEffect(() => {
        fetchTrainings()
            .then(trainings => {
                const grouped = groupBy(trainings, 'activity');
                const processed = Object.entries(grouped).map(([activity, group]) => ({
                    activity: activity,
                    duration: sumBy(group, 'duration')
                }));
                setChartData(processed);
            })
            .catch(error => console.error('Error fetching trainings:', error));
    }, []);

    return (
        <div style={{ padding: '1rem', color: '#D1F0FD' }}>
            <h1>Training Statistics</h1>
            <p>Total duration by activity (minutes)</p>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '1rem' }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#8B8680" />
                    <XAxis dataKey="activity" stroke="#67645E" />
                    <YAxis label={{ value: 'Duration (min)', angle: -90, position: 'insideLeft' }} stroke="#67645E" />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#67645E', border: '1px solid #D1F0FD', color: '#D1F0FD' }}
                        labelStyle={{ color: '#D1F0FD' }}
                    />
                    <Legend wrapperStyle={{ color: '#67645E' }} />
                    <Bar dataKey="duration" fill="#8B8680" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Statistics;
